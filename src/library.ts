/**
 * library.ts — Local game library backed by IndexedDB
 *
 * Stores ROM blobs so users can build a persistent library without
 * re-selecting files each session. All data lives on-device; nothing
 * is uploaded anywhere.
 *
 * Schema
 * ------
 * Database : "retrovault"
 * Version  : 1
 * Store    : "games"  (keyPath = "id")
 *   id          string   — UUID v4
 *   name        string   — display name (filename without extension)
 *   fileName    string   — original filename with extension
 *   systemId    string   — EmulatorJS core id, e.g. "psp" / "nes"
 *   size        number   — byte count of the ROM file
 *   addedAt     number   — Unix timestamp (ms) when added
 *   lastPlayedAt number | null
 *   blob        Blob     — the actual ROM file stored in IDB
 */

// ── Types ─────────────────────────────────────────────────────────────────────

export interface GameEntry {
  id: string;
  name: string;
  fileName: string;
  systemId: string;
  size: number;
  addedAt: number;
  lastPlayedAt: number | null;
  blob: Blob;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const DB_NAME    = "retrovault";
const DB_VERSION = 1;
const STORE_NAME = "games";

// ── Database helper ───────────────────────────────────────────────────────────

let _db: IDBDatabase | null = null;

function openDB(): Promise<IDBDatabase> {
  if (_db) return Promise.resolve(_db);

  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onupgradeneeded = () => {
      const db    = req.result;
      const store = db.createObjectStore(STORE_NAME, { keyPath: "id" });
      store.createIndex("systemId",     "systemId",     { unique: false });
      store.createIndex("addedAt",      "addedAt",      { unique: false });
      store.createIndex("lastPlayedAt", "lastPlayedAt", { unique: false });
    };

    req.onsuccess = () => {
      _db = req.result;
      resolve(_db);
    };

    req.onerror = () =>
      reject(new Error(`Failed to open game library database: ${req.error?.message}`));
  });
}

function tx(
  db:   IDBDatabase,
  mode: IDBTransactionMode
): IDBObjectStore {
  return db.transaction(STORE_NAME, mode).objectStore(STORE_NAME);
}

function promisify<T>(req: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    req.onsuccess = () => resolve(req.result);
    req.onerror   = () => reject(req.error);
  });
}

// ── UUID helper ───────────────────────────────────────────────────────────────

function uuid(): string {
  if (crypto.randomUUID) return crypto.randomUUID();
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// ── GameLibrary class ─────────────────────────────────────────────────────────

export class GameLibrary {
  /**
   * Add a game to the library.
   *
   * @param file      The ROM file picked by the user.
   * @param systemId  The EmulatorJS core id determined by the caller.
   * @returns The newly created GameEntry.
   */
  async addGame(file: File, systemId: string): Promise<GameEntry> {
    const db    = await openDB();
    const entry: GameEntry = {
      id:           uuid(),
      name:         file.name.replace(/\.[^.]+$/, ""),
      fileName:     file.name,
      systemId,
      size:         file.size,
      addedAt:      Date.now(),
      lastPlayedAt: null,
      blob:         file,
    };
    await promisify(tx(db, "readwrite").put(entry));
    return entry;
  }

  /**
   * Remove a game by id.
   */
  async removeGame(id: string): Promise<void> {
    const db = await openDB();
    await promisify(tx(db, "readwrite").delete(id));
  }

  /**
   * Get a single game entry (including its blob).
   */
  async getGame(id: string): Promise<GameEntry | null> {
    const db     = await openDB();
    const result = await promisify<GameEntry | undefined>(tx(db, "readonly").get(id));
    return result ?? null;
  }

  /**
   * Get all games, sorted by most recently added first.
   */
  async getAllGames(): Promise<GameEntry[]> {
    const db      = await openDB();
    const results = await promisify<GameEntry[]>(tx(db, "readonly").getAll());
    return results.sort((a, b) => b.addedAt - a.addedAt);
  }

  /**
   * Update the lastPlayedAt timestamp for a game.
   */
  async markPlayed(id: string): Promise<void> {
    const db    = await openDB();
    const store = db.transaction(STORE_NAME, "readwrite").objectStore(STORE_NAME);
    const entry = await promisify<GameEntry | undefined>(store.get(id));
    if (!entry) return;
    entry.lastPlayedAt = Date.now();
    await promisify(store.put(entry));
  }

  /**
   * Total number of games in the library.
   */
  async count(): Promise<number> {
    const db = await openDB();
    return promisify(tx(db, "readonly").count());
  }

  /**
   * Total bytes used by all stored ROMs.
   */
  async totalSize(): Promise<number> {
    const games = await this.getAllGames();
    return games.reduce((sum, g) => sum + g.size, 0);
  }

  /**
   * Delete every game from the library.
   */
  async clearAll(): Promise<void> {
    const db = await openDB();
    await promisify(tx(db, "readwrite").clear());
  }
}

// ── Formatting utilities ──────────────────────────────────────────────────────

/** Format a byte count as "1.2 MB", "890 KB", etc. */
export function formatBytes(bytes: number): string {
  if (bytes >= 1_073_741_824) return `${(bytes / 1_073_741_824).toFixed(1)} GB`;
  if (bytes >= 1_048_576)     return `${(bytes / 1_048_576).toFixed(1)} MB`;
  if (bytes >= 1_024)         return `${(bytes / 1_024).toFixed(0)} KB`;
  return `${bytes} B`;
}

/** Format a timestamp as a relative string ("3 days ago", "just now"). */
export function formatRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins  = Math.floor(diff / 60_000);
  const hours = Math.floor(diff / 3_600_000);
  const days  = Math.floor(diff / 86_400_000);

  if (mins  < 1)   return "just now";
  if (mins  < 60)  return `${mins}m ago`;
  if (hours < 24)  return `${hours}h ago`;
  if (days  < 30)  return `${days}d ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

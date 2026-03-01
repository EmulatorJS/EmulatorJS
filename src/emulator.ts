/**
 * emulator.ts — Thin wrapper around the EmulatorJS global API
 *
 * EmulatorJS is loaded from the CDN at runtime by injecting a <script> tag for
 * "data/loader.js". It exposes its runtime entirely through globals:
 *   - window.EJS_*            config knobs (set BEFORE injecting loader.js)
 *   - window.EJS_emulator     the live EmulatorJS instance (set BY loader.js)
 *   - window.EJS_ready        callback – fires once the emulator UI is built
 *   - window.EJS_onGameStart  callback – fires once the game is actually running
 *
 * The PPSSPP (PSP) core has two hard requirements:
 *   1. SharedArrayBuffer — needs Cross-Origin Isolation (COOP + COEP headers).
 *      The coi-serviceworker in /public/ handles this for static deployments;
 *      the Vite dev server sets the headers directly via vite.config.ts.
 *   2. WebGL 2 — PPSSPP uses OpenGL ES 3-level rendering.
 *
 * All EmulatorJS UI controls (save state, load state, fullscreen, mute, volume
 * slider, touch overlay on mobile, gamepad detection) are handled internally by
 * EmulatorJS itself. This wrapper only manages the *lifecycle* of the emulator.
 */

// ── Types ────────────────────────────────────────────────────────────────────

/**
 * All windows-level EJS globals that loader.js reads.
 * Declaring them here keeps TypeScript happy and documents what each does.
 */
declare global {
  interface Window {
    // Required
    EJS_player: string;           // CSS selector for the mount element
    EJS_core: string;             // System/core name, e.g. "psp"
    EJS_gameUrl: string | File;   // Blob URL or File object for the ROM
    EJS_pathtodata: string;       // Base URL for EmulatorJS data/ (loader.js dir)

    // Optional — we always set them explicitly for predictability
    EJS_gameName: string;
    EJS_startOnLoaded: boolean;
    EJS_threads: boolean;
    EJS_volume: number;
    EJS_DEBUG_XX: boolean;

    // Lifecycle callbacks (set before loading loader.js)
    EJS_ready?: () => void;
    EJS_onGameStart?: () => void;

    // The live instance populated by loader.js
    EJS_emulator?: EJSEmulatorInstance;
  }
}

/**
 * Partial type for the EmulatorJS instance exposed as window.EJS_emulator.
 * Only the subset we actually call is typed here.
 */
interface EJSEmulatorInstance {
  setVolume(volume: number): void;
  gameManager?: {
    restart(): void;
    quickSave(slot: number): boolean;
    quickLoad(slot: number): void;
    supportsStates(): boolean;
  };
}

// ── Constants ────────────────────────────────────────────────────────────────

/**
 * Stable CDN base URL for EmulatorJS data files and cores.
 * Using "stable" ensures we always get a tested, released version.
 * Change to "latest" (beta) or a specific semver if needed.
 */
export const EJS_CDN_BASE = "https://cdn.emulatorjs.org/stable/data/";

/** PSP file extensions recognised by the PPSSPP core. */
export const PSP_EXTENSIONS = ["iso", "cso", "pbp", "chd", "elf", "zip"];

// ── State machine ─────────────────────────────────────────────────────────────

export type EmulatorState = "idle" | "loading" | "running" | "error";

// ── PSPEmulator class ─────────────────────────────────────────────────────────

export interface LaunchOptions {
  file: File;
  /** 0–1. Restored from localStorage by the caller. */
  volume: number;
}

export class PSPEmulator {
  // ── Private state ──────────────────────────────────────────────────────────

  private _state: EmulatorState = "idle";
  private _blobUrl: string | null = null;
  /** The element selector used as the EJS mount point. */
  private readonly _playerId: string;

  // ── Public callbacks — wired by ui.ts ──────────────────────────────────────

  /** Fired whenever the internal state transitions. */
  onStateChange?: (state: EmulatorState) => void;
  /** Fired with a human-readable progress message during loading. */
  onProgress?: (msg: string) => void;
  /** Fired with a human-readable error message when something goes wrong. */
  onError?: (msg: string) => void;
  /** Fired once the game loop is actually running. */
  onGameStart?: () => void;

  // ── Constructor ────────────────────────────────────────────────────────────

  /**
   * @param playerId  The DOM id (without #) of the element EmulatorJS should
   *                  render into, e.g. "ejs-player".
   */
  constructor(playerId: string) {
    this._playerId = playerId;
  }

  // ── Public API ─────────────────────────────────────────────────────────────

  get state(): EmulatorState {
    return this._state;
  }

  /**
   * Validate browser capabilities and launch the emulator with the given ROM.
   *
   * The method is async but only awaits script injection. EmulatorJS performs
   * its own async loading internally; the `onGameStart` callback fires when
   * the game is actually running.
   */
  async launch(opts: LaunchOptions): Promise<void> {
    if (this._state === "loading" || this._state === "running") {
      this._emitError(
        "Emulator is already running. Use Reset to restart the current game, " +
        "or reload the page to load a different game."
      );
      return;
    }

    // ── Pre-flight checks ──────────────────────────────────────────────────
    if (!this._checkSharedArrayBuffer()) return;
    if (!this._checkWebGL2()) return;
    if (!this._validateFile(opts.file)) return;

    this._setState("loading");
    this._emit("onProgress", "Preparing game file…");

    // Revoke any previous blob URL to free memory.
    this._revokeBlobUrl();

    try {
      // Create a same-origin blob URL so EmulatorJS can fetch the ROM.
      // Using a blob URL avoids CORS issues and keeps the file in memory only
      // for the lifetime of this session.
      this._blobUrl = URL.createObjectURL(opts.file);

      const gameName = opts.file.name.replace(/\.[^.]+$/, "");

      this._emit("onProgress", "Initialising EmulatorJS…");

      // ── Set EJS globals (must be done before injecting loader.js) ─────────

      window.EJS_player       = `#${this._playerId}`;
      // "psp" is the EmulatorJS system name for the PPSSPP core.
      // See getCores() in data/src/emulator.js: "psp": ["ppsspp"]
      window.EJS_core         = "psp";
      window.EJS_gameUrl      = this._blobUrl;
      window.EJS_gameName     = gameName;
      window.EJS_pathtodata   = EJS_CDN_BASE;
      window.EJS_startOnLoaded = true;
      // PPSSPP requires worker threads (SharedArrayBuffer); we verified above.
      window.EJS_threads      = true;
      window.EJS_volume       = opts.volume;
      window.EJS_DEBUG_XX     = false;

      // ── Lifecycle callbacks ────────────────────────────────────────────────

      // EJS_ready fires once the EJS UI chrome (toolbar, canvas) is built —
      // before the game ROM has finished downloading and booting.
      window.EJS_ready = () => {
        this._emit("onProgress", "Core loaded — booting game…");
      };

      // EJS_onGameStart fires when the emulation loop is actually running.
      window.EJS_onGameStart = () => {
        this._setState("running");
        this.onGameStart?.();
      };

      // ── Inject loader.js ──────────────────────────────────────────────────
      await this._loadScript(`${EJS_CDN_BASE}loader.js`);

    } catch (err) {
      this._setState("error");
      this._emitError(
        `Failed to start emulator: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  /**
   * Restart the current game (keeps saves in WASM memory).
   * No-op if the emulator hasn't started yet.
   */
  reset(): void {
    const emu = window.EJS_emulator;
    if (emu?.gameManager?.restart) {
      try {
        emu.gameManager.restart();
      } catch (e) {
        this._emitError(`Reset failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  /**
   * Quick-save to slot `slot` (1-indexed).
   * EmulatorJS stores quick saves in IndexedDB automatically.
   */
  quickSave(slot = 1): void {
    const emu = window.EJS_emulator;
    if (!emu?.gameManager?.supportsStates?.()) return;
    emu.gameManager?.quickSave(slot);
  }

  /**
   * Quick-load from slot `slot` (1-indexed).
   */
  quickLoad(slot = 1): void {
    const emu = window.EJS_emulator;
    if (!emu?.gameManager?.supportsStates?.()) return;
    emu.gameManager?.quickLoad(slot);
  }

  /**
   * Adjust volume on the live EmulatorJS instance (0–1).
   * Also used when restoring persisted volume after launch.
   */
  setVolume(volume: number): void {
    window.EJS_emulator?.setVolume(Math.max(0, Math.min(1, volume)));
  }

  /**
   * Tear down: revoke blob URL and reset state.
   * Does NOT stop the emulation loop — the user should reload the page for
   * a clean shutdown (EmulatorJS doesn't expose a destroy() method).
   */
  dispose(): void {
    this._revokeBlobUrl();
    this._setState("idle");
  }

  // ── Private helpers ────────────────────────────────────────────────────────

  private _setState(s: EmulatorState): void {
    this._state = s;
    this.onStateChange?.(s);
  }

  private _emit(cb: "onProgress", msg: string): void;
  private _emit(cb: "onError",    msg: string): void;
  private _emit(cb: "onProgress" | "onError", msg: string): void {
    if (cb === "onProgress") this.onProgress?.(msg);
    else                     this.onError?.(msg);
  }

  private _emitError(msg: string): void {
    this._setState("error");
    this.onError?.(msg);
  }

  private _validateFile(file: File): boolean {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!PSP_EXTENSIONS.includes(ext)) {
      this._emitError(
        `Unsupported file type ".${ext}".\n` +
        `The PPSSPP core accepts: ${PSP_EXTENSIONS.map(e => `.${e}`).join(", ")}`
      );
      return false;
    }
    return true;
  }

  private _checkSharedArrayBuffer(): boolean {
    if (typeof SharedArrayBuffer !== "undefined") return true;
    this._emitError(
      "SharedArrayBuffer is not available.\n\n" +
      "The PPSSPP core requires worker threads, which need Cross-Origin " +
      "Isolation (COOP + COEP headers).\n\n" +
      "• In dev: make sure you're running `npm run dev` (Vite sets the headers).\n" +
      "• In production: the coi-serviceworker.js should activate automatically.\n" +
      "• Try Chrome or Firefox on desktop for best compatibility."
    );
    return false;
  }

  private _checkWebGL2(): boolean {
    const canvas = document.createElement("canvas");
    if (canvas.getContext("webgl2")) return true;
    this._emitError(
      "WebGL 2 is not available in your browser.\n\n" +
      "PPSSPP requires WebGL 2 for rendering. Please:\n" +
      "• Use Chrome 58+ or Firefox 51+ on desktop.\n" +
      "• Make sure hardware acceleration is enabled in browser settings.\n" +
      "• Update your GPU drivers."
    );
    return false;
  }

  private _revokeBlobUrl(): void {
    if (this._blobUrl) {
      URL.revokeObjectURL(this._blobUrl);
      this._blobUrl = null;
    }
  }

  /**
   * Inject a <script> tag and return a promise that resolves on load or
   * rejects on error (e.g. CDN unreachable).
   *
   * We tag the element with `data-ejs-loader` so we can identify it later,
   * though EmulatorJS itself doesn't need us to remove it.
   */
  private _loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Avoid double-injecting if called more than once.
      if (document.querySelector(`script[data-ejs-loader]`)) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = src;
      script.setAttribute("data-ejs-loader", "true");
      script.onload = () => resolve();
      script.onerror = () =>
        reject(
          new Error(
            `Could not load EmulatorJS from CDN.\n` +
            `URL attempted: ${src}\n\n` +
            `Check your internet connection. If the CDN is down, try again later.`
          )
        );
      document.body.appendChild(script);
    });
  }
}

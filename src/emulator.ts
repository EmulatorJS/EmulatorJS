/**
 * emulator.ts — Multi-system EmulatorJS wrapper
 *
 * EmulatorJS is loaded from the CDN at runtime by injecting a <script> tag for
 * "data/loader.js". It exposes its runtime entirely through globals:
 *   - window.EJS_*            config knobs (set BEFORE injecting loader.js)
 *   - window.EJS_emulator     the live EmulatorJS instance (set BY loader.js)
 *   - window.EJS_ready        callback – fires once the emulator UI is built
 *   - window.EJS_onGameStart  callback – fires once the game is actually running
 *
 * Supported systems are defined in systems.ts. Each system declares:
 *   - needsThreads  → whether SharedArrayBuffer is required
 *   - needsWebGL2   → whether a WebGL 2 context is required
 *   - perfSettings  → RetroArch core-option overrides for low-spec devices
 *   - qualitySettings → overrides for quality mode
 */

import { getSystemById, type SystemInfo } from "./systems.js";
import { resolveMode, type PerformanceMode, type DeviceCapabilities } from "./performance.js";

// ── EJS global type declarations ─────────────────────────────────────────────

declare global {
  interface Window {
    EJS_player:        string;
    EJS_core:          string;
    EJS_gameUrl:       string | File;
    EJS_pathtodata:    string;
    EJS_gameName:      string;
    EJS_startOnLoaded: boolean;
    EJS_threads:       boolean;
    EJS_volume:        number;
    EJS_DEBUG_XX:      boolean;
    EJS_Settings?:     Record<string, string>;
    EJS_ready?:        () => void;
    EJS_onGameStart?:  () => void;
    EJS_emulator?:     EJSEmulatorInstance;
  }
}

interface EJSEmulatorInstance {
  setVolume(volume: number): void;
  pause?(): void;
  resume?(): void;
  gameManager?: {
    restart(): void;
    quickSave(slot: number): boolean;
    quickLoad(slot: number): void;
    supportsStates(): boolean;
  };
}

// ── Constants ─────────────────────────────────────────────────────────────────

export const EJS_CDN_BASE = "https://cdn.emulatorjs.org/stable/data/";

// ── State machine ─────────────────────────────────────────────────────────────

export type EmulatorState = "idle" | "loading" | "running" | "paused" | "error";

// ── Public types ──────────────────────────────────────────────────────────────

export interface LaunchOptions {
  file: File;
  /** Volume 0–1. */
  volume: number;
  /** EmulatorJS core/system id, e.g. "psp", "nes", "gba". */
  systemId: string;
  /** Performance mode controlling EJS_Settings overrides. */
  performanceMode: PerformanceMode;
  /** Device capabilities result from detectCapabilities(). */
  deviceCaps: DeviceCapabilities;
}

// ── PSPEmulator → MultiEmulator ───────────────────────────────────────────────

export class PSPEmulator {
  private _state: EmulatorState = "idle";
  private _blobUrl: string | null = null;
  private readonly _playerId: string;
  private _currentSystem: SystemInfo | null = null;

  onStateChange?: (state: EmulatorState) => void;
  onProgress?:    (msg:   string)        => void;
  onError?:       (msg:   string)        => void;
  onGameStart?:   ()                     => void;

  constructor(playerId: string) {
    this._playerId = playerId;
  }

  get state(): EmulatorState { return this._state; }
  get currentSystem(): SystemInfo | null { return this._currentSystem; }

  // ── launch ──────────────────────────────────────────────────────────────────

  async launch(opts: LaunchOptions): Promise<void> {
    if (this._state === "loading") {
      this._emitError("Emulator is already loading. Please wait.");
      return;
    }

    // Tear down the previous session so a new game can be launched from the library.
    if (this._state === "running" || this._state === "paused") {
      this._teardown();
    }

    const system = getSystemById(opts.systemId);
    if (!system) {
      this._emitError(`Unknown system "${opts.systemId}".`);
      return;
    }

    this._currentSystem = system;

    // ── Pre-flight checks (conditional per system) ──────────────────────────
    if (system.needsThreads  && !this._checkSharedArrayBuffer()) return;
    if (system.needsWebGL2   && !this._checkWebGL2())            return;
    if (!this._validateFile(opts.file, system))                  return;

    this._setState("loading");
    this._emit("onProgress", "Preparing game file…");

    this._revokeBlobUrl();

    try {
      this._blobUrl = URL.createObjectURL(opts.file);
      const gameName = opts.file.name.replace(/\.[^.]+$/, "");

      this._emit("onProgress", "Initialising EmulatorJS…");

      // ── Resolve performance settings ──────────────────────────────────────
      const mode        = resolveMode(opts.performanceMode, opts.deviceCaps);
      const ejsSettings = mode === "performance"
        ? system.perfSettings
        : system.qualitySettings;

      // ── Set EJS globals ───────────────────────────────────────────────────
      window.EJS_player        = `#${this._playerId}`;
      window.EJS_core          = system.id;
      window.EJS_gameUrl       = this._blobUrl;
      window.EJS_gameName      = gameName;
      window.EJS_pathtodata    = EJS_CDN_BASE;
      window.EJS_startOnLoaded = true;
      window.EJS_threads       = system.needsThreads;
      window.EJS_volume        = opts.volume;
      window.EJS_DEBUG_XX      = false;

      if (Object.keys(ejsSettings).length > 0) {
        window.EJS_Settings = ejsSettings;
      } else {
        delete window.EJS_Settings;
      }

      // ── Lifecycle callbacks ───────────────────────────────────────────────
      window.EJS_ready = () => {
        this._emit("onProgress", "Core loaded — booting game…");
      };

      window.EJS_onGameStart = () => {
        this._setState("running");
        this.onGameStart?.();
      };

      // ── Inject / reuse loader.js ──────────────────────────────────────────
      await this._loadScript(`${EJS_CDN_BASE}loader.js`);

    } catch (err) {
      this._setState("error");
      this._emitError(
        `Failed to start emulator: ${err instanceof Error ? err.message : String(err)}`
      );
    }
  }

  // ── Controls ────────────────────────────────────────────────────────────────

  reset(): void {
    const emu = window.EJS_emulator;
    if (emu?.gameManager?.restart) {
      try { emu.gameManager.restart(); }
      catch (e) {
        this._emitError(`Reset failed: ${e instanceof Error ? e.message : String(e)}`);
      }
    }
  }

  quickSave(slot = 1): void {
    const emu = window.EJS_emulator;
    if (!emu?.gameManager?.supportsStates?.()) return;
    emu.gameManager?.quickSave(slot);
  }

  quickLoad(slot = 1): void {
    const emu = window.EJS_emulator;
    if (!emu?.gameManager?.supportsStates?.()) return;
    emu.gameManager?.quickLoad(slot);
  }

  setVolume(volume: number): void {
    window.EJS_emulator?.setVolume(Math.max(0, Math.min(1, volume)));
  }

  pause(): void {
    if (this._state !== "running") return;
    window.EJS_emulator?.pause?.();
    this._setState("paused");
  }

  resume(): void {
    if (this._state !== "paused") return;
    window.EJS_emulator?.resume?.();
    this._setState("running");
  }

  dispose(): void {
    this._teardown();
  }

  // ── Private ─────────────────────────────────────────────────────────────────

  private _setState(s: EmulatorState): void {
    this._state = s;
    this.onStateChange?.(s);
  }

  private _emit(cb: "onProgress" | "onError", msg: string): void {
    if (cb === "onProgress") this.onProgress?.(msg);
    else                     this.onError?.(msg);
  }

  private _emitError(msg: string): void {
    this._setState("error");
    this.onError?.(msg);
  }

  private _validateFile(file: File, system: SystemInfo): boolean {
    const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
    if (!system.extensions.includes(ext)) {
      this._emitError(
        `Unsupported file type ".${ext}" for ${system.name}.\n` +
        `Accepted formats: ${system.extensions.map(e => `.${e}`).join(", ")}`
      );
      return false;
    }
    return true;
  }

  private _checkSharedArrayBuffer(): boolean {
    if (typeof SharedArrayBuffer !== "undefined") return true;
    this._emitError(
      "SharedArrayBuffer is not available.\n\n" +
      "This system requires worker threads, which need Cross-Origin Isolation " +
      "(COOP + COEP headers).\n\n" +
      "• In dev: make sure you are running `npm run dev`.\n" +
      "• In production: coi-serviceworker.js should activate automatically.\n" +
      "• Try reloading the page once the service worker is registered."
    );
    return false;
  }

  private _checkWebGL2(): boolean {
    const canvas = document.createElement("canvas");
    if (canvas.getContext("webgl2")) return true;
    this._emitError(
      "WebGL 2 is not available in your browser.\n\n" +
      "This system requires WebGL 2 for rendering. Please:\n" +
      "• Use Chrome 58+ or Firefox 51+.\n" +
      "• Enable hardware acceleration in browser settings.\n" +
      "• Update your GPU drivers."
    );
    return false;
  }

  /**
   * Tear down the current EJS session so a new game can be launched.
   * Removes the injected loader script, clears the player element, and
   * resets all EJS globals so the loader re-initialises cleanly.
   */
  private _teardown(): void {
    this._revokeBlobUrl();
    document.querySelector("script[data-ejs-loader]")?.remove();
    const playerEl = document.getElementById(this._playerId);
    if (playerEl) playerEl.innerHTML = "";
    delete window.EJS_emulator;
    delete window.EJS_ready;
    delete window.EJS_onGameStart;
    this._currentSystem = null;
    this._setState("idle");
  }

  private _revokeBlobUrl(): void {
    if (this._blobUrl) {
      URL.revokeObjectURL(this._blobUrl);
      this._blobUrl = null;
    }
  }

  /**
   * Inject the EmulatorJS loader script.
   * If it was already injected from a previous game session (same page load)
   * we can't hot-swap systems — the page must be reloaded.
   */
  private _loadScript(src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      if (document.querySelector("script[data-ejs-loader]")) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.setAttribute("data-ejs-loader", "true");
      script.onload  = () => resolve();
      script.onerror = () =>
        reject(new Error(
          `Could not load EmulatorJS from CDN.\n` +
          `URL: ${src}\n\n` +
          `Check your internet connection. If the CDN is down, try again later.`
        ));
      document.body.appendChild(script);
    });
  }
}

/**
 * main.ts — Application entry point
 *
 * Responsibilities:
 *   1. Import CSS (Vite injects it as a <style> tag at build time)
 *   2. Build the DOM shell into #app
 *   3. Load persisted settings from localStorage
 *   4. Instantiate PSPEmulator
 *   5. Wire the UI via initUI()
 *   6. Handle the "user chose a file" event:
 *       a. Show loading overlay
 *       b. Persist game name
 *       c. Call emulator.launch()
 *   7. Persist settings changes as they happen
 *
 * Persistence notes
 * -----------------
 * We deliberately use localStorage for settings (small, synchronous, enough).
 * EmulatorJS itself uses IndexedDB internally for save-state data and ROM
 * caching; we don't need to duplicate that.
 *
 * Settings persisted:
 *   - volume        (number, 0–1)
 *   - lastGameName  (string, display only — the ROM itself is never stored)
 */

import "./style.css";
import { PSPEmulator }             from "./emulator.js";
import { buildDOM, initUI } from "./ui.js";

// ── Settings schema ───────────────────────────────────────────────────────────

export interface Settings {
  /** Audio volume, 0–1. Default 0.7 */
  volume: number;
  /** Display name of the last loaded game (not the file path). */
  lastGameName: string | null;
}

const STORAGE_KEY = "web-psp-emulator-settings";

const DEFAULT_SETTINGS: Settings = {
  volume:       0.7,
  lastGameName: null,
};

// ── Persistence ───────────────────────────────────────────────────────────────

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return {
      volume:       typeof parsed.volume === "number"
                      ? Math.max(0, Math.min(1, parsed.volume))
                      : DEFAULT_SETTINGS.volume,
      lastGameName: typeof parsed.lastGameName === "string"
                      ? parsed.lastGameName
                      : null,
    };
  } catch {
    // Corrupt or inaccessible storage — fall back to defaults.
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(settings: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  } catch {
    // Storage quota exceeded or private-browsing restriction — non-fatal.
    console.warn("[settings] Could not persist settings to localStorage.");
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

function main(): void {
  // 1. Build DOM
  const app = document.getElementById("app");
  if (!app) throw new Error("Root element #app not found");
  buildDOM(app);

  // 2. Load settings
  const settings = loadSettings();

  // 3. Instantiate emulator
  // "ejs-player" matches the <div id="ejs-player"> rendered by buildDOM().
  const emulator = new PSPEmulator("ejs-player");

  // 4. Wire UI
  initUI({
    emulator,
    settings,

    onFileSelected: async (file: File) => {
      // Persist game name for display in status bar (never the file itself).
      const gameName = file.name.replace(/\.[^.]+$/, "");
      settings.lastGameName = gameName;
      saveSettings(settings);

      // Launch — emulator callbacks drive the rest of the UI transitions.
      await emulator.launch({ file, volume: settings.volume });
    },

    onSettingsChange: (patch: Partial<Settings>) => {
      Object.assign(settings, patch);
      saveSettings(settings);
    },
  });

  // 5. Development helpers — expose emulator instance for console inspection
  if (import.meta.env.DEV) {
    // @ts-expect-error — intentional debug exposure
    window.__pspEmulator = emulator;
    console.info(
      "[Web PSP Emulator] Dev mode: access `window.__pspEmulator` in the console.\n" +
      "Loaded settings:", settings
    );
  }

  // 6. Warn if the page is not cross-origin isolated
  //    (the SW may still be loading on first visit — warn only after a delay)
  setTimeout(() => {
    if (!self.crossOriginIsolated) {
      console.warn(
        "[Web PSP Emulator] Page is NOT cross-origin isolated.\n" +
        "SharedArrayBuffer will be unavailable. The PPSSPP core requires it.\n" +
        "Ensure COOP + COEP headers are set, or that coi-serviceworker.js " +
        "is registered and the page has been reloaded."
      );
    }
  }, 2000);
}

// Run after the DOM is ready.  With Vite's <script type="module">, the script
// is deferred by default, so DOMContentLoaded has typically already fired.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

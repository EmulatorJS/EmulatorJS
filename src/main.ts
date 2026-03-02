/**
 * main.ts — Application entry point
 *
 * Responsibilities:
 *   1. Build the DOM
 *   2. Detect device capabilities (once, at startup)
 *   3. Load settings from localStorage
 *   4. Instantiate PSPEmulator and GameLibrary
 *   5. Wire the UI via initUI()
 *   6. Handle game launch requests (from library cards or file drop)
 *   7. Handle "return to library" (page is NOT reloaded — EJS is hidden)
 *   8. Persist settings changes
 *
 * Persistence:
 *   - Settings (volume, performanceMode, etc.) → localStorage (small, sync)
 *   - ROM blobs → IndexedDB via GameLibrary (large, async)
 *   - Save states → IndexedDB managed by EmulatorJS internally
 */

import "./style.css";
import { PSPEmulator }   from "./emulator.js";
import { GameLibrary }   from "./library.js";
import { detectCapabilities } from "./performance.js";
import { buildDOM, initUI, showLanding,
         hideEjsContainer, renderLibrary, openSettingsPanel } from "./ui.js";
import type { PerformanceMode } from "./performance.js";

// ── Settings schema ───────────────────────────────────────────────────────────

export interface Settings {
  volume:          number;
  lastGameName:    string | null;
  performanceMode: PerformanceMode;
}

const STORAGE_KEY = "retrovault-settings";

const DEFAULT_SETTINGS: Settings = {
  volume:          0.7,
  lastGameName:    null,
  performanceMode: "auto",
};

// ── Persistence ───────────────────────────────────────────────────────────────

function loadSettings(): Settings {
  try {
    const raw    = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_SETTINGS };
    const parsed = JSON.parse(raw) as Partial<Settings>;
    const validModes: PerformanceMode[] = ["auto", "performance", "quality"];
    return {
      volume: typeof parsed.volume === "number"
        ? Math.max(0, Math.min(1, parsed.volume))
        : DEFAULT_SETTINGS.volume,
      lastGameName: typeof parsed.lastGameName === "string"
        ? parsed.lastGameName
        : null,
      performanceMode: validModes.includes(parsed.performanceMode as PerformanceMode)
        ? (parsed.performanceMode as PerformanceMode)
        : DEFAULT_SETTINGS.performanceMode,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

function saveSettings(s: Settings): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {
    console.warn("[retrovault] Could not persist settings to localStorage.");
  }
}

// ── Bootstrap ─────────────────────────────────────────────────────────────────

function main(): void {
  // 1. Build DOM
  const app = document.getElementById("app");
  if (!app) throw new Error("Root element #app not found");
  buildDOM(app);

  // 2. Detect hardware
  const deviceCaps = detectCapabilities();

  // 3. Load settings
  const settings = loadSettings();

  // 4. Instantiate services
  const emulator = new PSPEmulator("ejs-player");
  const library  = new GameLibrary();

  // 5. Wire launch callback
  const onLaunchGame = async (file: File, systemId: string): Promise<void> => {
    const gameName = file.name.replace(/\.[^.]+$/, "");
    settings.lastGameName = gameName;
    saveSettings(settings);

    await emulator.launch({
      file,
      volume:          settings.volume,
      systemId,
      performanceMode: settings.performanceMode,
      deviceCaps,
    });
  };

  // Expose for settings panel's "Clear Library" button
  (window as any).__onLaunchGame = onLaunchGame;

  // 6a. Resume a paused game — shows the emulator, hides library
  const onResumeGame = (): void => {
    if (emulator.state !== "paused") return;
    emulator.resume();
    document.dispatchEvent(new CustomEvent("retrovault:resumeGame"));
  };

  // 6b. Wire "return to library" — pauses and hides the emulator, shows library
  const onReturnToLibrary = (): void => {
    if (emulator.state !== "running") return;
    emulator.pause();
    hideEjsContainer();
    showLanding();
    document.title = "RetroVault";

    void renderLibrary(library, settings, onLaunchGame);
    const headerActions = document.getElementById("header-actions");
    if (headerActions) {
      document.dispatchEvent(new CustomEvent("retrovault:returnToLibrary"));
    }
  };

  // 7. Wire UI
  initUI({
    emulator,
    library,
    settings,
    deviceCaps,
    onLaunchGame,
    onSettingsChange: (patch) => {
      Object.assign(settings, patch);
      saveSettings(settings);
    },
    onReturnToLibrary,
  });

  // 8. If user returns to landing, rebuild landing header controls
  document.addEventListener("retrovault:returnToLibrary", () => {
    const container = document.getElementById("header-actions");
    if (!container) return;
    container.innerHTML = "";

    // Resume button — only shown while a game is paused
    const btnResume = document.createElement("button");
    btnResume.className = "btn btn--primary";
    btnResume.textContent = "▶ Resume";
    btnResume.title = "Return to the paused game";
    btnResume.addEventListener("click", onResumeGame);
    container.appendChild(btnResume);

    const btnSettings = document.createElement("button");
    btnSettings.className = "btn";
    btnSettings.textContent = "⚙ Settings";
    btnSettings.addEventListener("click", () => {
      document.dispatchEvent(new CustomEvent("retrovault:openSettings"));
    });
    if (deviceCaps.isLowSpec) {
      const chip = document.createElement("span");
      chip.className = "perf-chip perf-chip--warn";
      chip.textContent = "⚡ Low-spec";
      chip.title = "Performance mode recommended for this device";
      container.appendChild(chip);
    }
    container.appendChild(btnSettings);
  });

  document.addEventListener("retrovault:openSettings", () => {
    openSettingsPanel(settings, deviceCaps, library, (patch) => {
      Object.assign(settings, patch);
      saveSettings(settings);
    });
  });

  // 9. Dev helpers
  if (import.meta.env.DEV) {
    // @ts-expect-error dev debug
    window.__retrovault = { emulator, library, settings, deviceCaps };
    console.info("[RetroVault] Dev mode. Access `window.__retrovault` in the console.");
    console.info("Device capabilities:", deviceCaps);
    console.info("Settings:", settings);
  }

  // 10. Cross-origin isolation warning
  setTimeout(() => {
    if (!self.crossOriginIsolated) {
      console.warn(
        "[RetroVault] Page is NOT cross-origin isolated.\n" +
        "SharedArrayBuffer is unavailable — PSP (PPSSPP) games will fail.\n" +
        "Other systems (NES, SNES, GBA, etc.) are not affected.\n" +
        "Ensure coi-serviceworker.js is registered and the page has been reloaded."
      );
    }
  }, 2000);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", main);
} else {
  main();
}

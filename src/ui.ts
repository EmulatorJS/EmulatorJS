/**
 * ui.ts — Build and wire the full application UI
 *
 * Views:
 *   landing    — game library grid + "Add Game" drop zone (shown on startup)
 *   emulator   — EmulatorJS fills the screen (shown while a game runs)
 *
 * Panels (overlays over the current view):
 *   settings   — performance mode, device info, library stats
 *   systemPicker — shown when a file extension maps to multiple systems
 *   loading    — spinner during emulator boot
 *   error      — dismissible error banner
 *
 * Keyboard shortcuts (global, while emulator is running):
 *   F5  → Quick Save slot 1
 *   F7  → Quick Load slot 1
 *   F1  → Reset
 *   Esc → Return to library
 */

import {
  PSPEmulator,
  type EmulatorState,
} from "./emulator.js";
import {
  SYSTEMS,
  ALL_EXTENSIONS,
  detectSystem,
  getSystemById,
  type SystemInfo,
} from "./systems.js";
import {
  GameLibrary,
  formatBytes,
  formatRelativeTime,
  type GameEntry,
} from "./library.js";
import {
  type DeviceCapabilities,
  type PerformanceMode,
  formatCapabilitiesSummary,
} from "./performance.js";
import type { Settings } from "./main.js";

// ── DOM helpers ───────────────────────────────────────────────────────────────

function el<T extends HTMLElement = HTMLElement>(sel: string): T {
  const node = document.querySelector<T>(sel);
  if (!node) throw new Error(`UI: element not found: "${sel}"`);
  return node;
}

function make<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs: Record<string, string> = {},
  ...children: (string | Node)[]
): HTMLElementTagNameMap[K] {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) {
    node.append(typeof child === "string" ? document.createTextNode(child) : child);
  }
  return node;
}

// ── Build DOM ─────────────────────────────────────────────────────────────────

/** Render the full page shell into `#app`. Called once on startup. */
export function buildDOM(app: HTMLElement): void {
  const acceptList = ALL_EXTENSIONS.map(e => `.${e}`).join(",");

  app.innerHTML = `
    <!-- ── Header ── -->
    <header class="app-header">
      <div class="app-header__brand">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2"
             stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <circle cx="8"  cy="12" r="1.5"/>
          <circle cx="16" cy="12" r="1.5"/>
          <line x1="12" y1="9"  x2="12" y2="15"/>
          <line x1="9"  y1="12" x2="15" y2="12"/>
        </svg>
        <span class="brand-long">RetroVault</span>
        <span class="brand-short" aria-hidden="true">RV</span>
      </div>

      <div class="app-header__actions" id="header-actions">
        <!-- Populated by buildLandingControls() / buildInGameControls() -->
      </div>
    </header>

    <!-- ── Main content area ── -->
    <main class="app-main">

      <!-- Library / landing view -->
      <section id="landing" aria-label="Game Library">

        <!-- Library grid -->
        <div id="library-section">
          <div class="library-header">
            <h2 class="library-title">My Library</h2>
            <span class="library-count" id="library-count"></span>
          </div>
          <div class="library-grid" id="library-grid">
            <!-- Cards populated by renderLibrary() -->
          </div>
        </div>

        <!-- Drop zone (always active for drag-and-drop) -->
        <div class="drop-zone" id="drop-zone">
          <input type="file"
                 id="file-input"
                 accept="${acceptList}"
                 aria-label="Select game ROM file" />
          <div class="drop-zone__icon" aria-hidden="true">+</div>
          <p class="drop-zone__label">Drop a game file to add it</p>
          <p class="drop-zone__sub">or <span class="drop-zone__browse">browse files</span></p>
        </div>

        <p class="landing__legal">
          Bring your own legally obtained ROM files. This app does not provide ROMs or BIOS files.
          <a href="https://emulatorjs.org" target="_blank" rel="noopener">Powered by EmulatorJS</a>
        </p>
      </section>

      <!-- EmulatorJS mount point (hidden until a game launches) -->
      <div id="ejs-container">
        <div id="ejs-player"></div>
      </div>

      <!-- Loading overlay -->
      <div id="loading-overlay" role="status" aria-live="polite">
        <div class="loading-spinner" aria-hidden="true"></div>
        <p id="loading-message">Initialising…</p>
      </div>

      <!-- Error banner -->
      <div id="error-banner" role="alert" aria-live="assertive">
        <button class="error-close" id="error-close" title="Dismiss" aria-label="Dismiss error">✕</button>
        <span id="error-message"></span>
      </div>

      <!-- System picker modal -->
      <div id="system-picker" role="dialog" aria-modal="true" aria-label="Choose System" hidden>
        <div class="modal-backdrop" id="system-picker-backdrop"></div>
        <div class="modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Choose System</h3>
            <button class="modal-close" id="system-picker-close" aria-label="Cancel">✕</button>
          </div>
          <p class="modal-subtitle" id="system-picker-subtitle">
            This file extension is compatible with multiple systems.
          </p>
          <div class="system-picker-list" id="system-picker-list">
            <!-- Populated dynamically -->
          </div>
        </div>
      </div>

      <!-- Settings panel -->
      <div id="settings-panel" role="dialog" aria-modal="true" aria-label="Settings" hidden>
        <div class="modal-backdrop" id="settings-backdrop"></div>
        <div class="modal-box settings-modal-box">
          <div class="modal-header">
            <h3 class="modal-title">Settings</h3>
            <button class="modal-close" id="settings-close" aria-label="Close settings">✕</button>
          </div>
          <div id="settings-content">
            <!-- Populated by buildSettingsContent() -->
          </div>
        </div>
      </div>

    </main>

    <!-- ── Footer ── -->
    <footer class="app-footer">
      <div class="status-item">
        <div class="status-dot idle" id="status-dot"></div>
        <span class="status-item__label">State:</span>
        <span class="status-item__value" id="status-state">Idle</span>
      </div>
      <div class="status-item hide-mobile">
        <span class="status-item__label">System:</span>
        <span class="status-item__value" id="status-system">—</span>
      </div>
      <div class="status-item hide-mobile">
        <span class="status-item__label">Game:</span>
        <span class="status-item__value" id="status-game">—</span>
      </div>
    </footer>
  `;
}

// ── Public init ───────────────────────────────────────────────────────────────

export interface UIOptions {
  emulator:         PSPEmulator;
  library:          GameLibrary;
  settings:         Settings;
  deviceCaps:       DeviceCapabilities;
  onLaunchGame:     (file: File, systemId: string) => Promise<void>;
  onSettingsChange: (patch: Partial<Settings>) => void;
  onReturnToLibrary: () => void;
}

/** Wire all DOM events, emulator callbacks, and render the initial library. */
export function initUI(opts: UIOptions): void {
  const { emulator, library, settings, deviceCaps,
          onLaunchGame, onSettingsChange, onReturnToLibrary } = opts;

  // ── File drop / pick ──────────────────────────────────────────────────────
  const fileInput = el<HTMLInputElement>("#file-input");
  const dropZone  = el("#drop-zone");

  const handleFileChosen = (file: File) => {
    resolveSystemAndAdd(file, library, settings, onLaunchGame);
  };

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) handleFileChosen(file);
    fileInput.value = ""; // reset so the same file can be re-picked
  });

  // Global drag-and-drop (whole page)
  document.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });
  document.addEventListener("dragleave", (e) => {
    if (!(e.relatedTarget as Element | null)?.closest) return;
    dropZone.classList.remove("drag-over");
  });
  document.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    const file = e.dataTransfer?.files[0];
    if (file && emulator.state !== "running" && emulator.state !== "paused") handleFileChosen(file);
  });

  // ── Error banner ──────────────────────────────────────────────────────────
  el("#error-close").addEventListener("click", hideError);

  // ── Emulator lifecycle → DOM ──────────────────────────────────────────────
  emulator.onStateChange = (state) => updateStatusDot(state);
  emulator.onProgress    = (msg)   => setLoadingMessage(msg);
  emulator.onError       = (msg)   => {
    hideLoadingOverlay();
    showError(msg);
  };
  emulator.onGameStart = () => {
    hideLoadingOverlay();
    showEjsContainer();
    hideLanding();
    const sys  = emulator.currentSystem;
    const name = settings.lastGameName ?? "Unknown";
    setStatusSystem(sys ? sys.shortName : "—");
    setStatusGame(name);
    document.title = `${name} — RetroVault`;
    buildInGameControls(emulator, settings, onSettingsChange, onReturnToLibrary);
  };

  // ── Resume game (triggered by "▶ Resume" button via retrovault:resumeGame) ─
  document.addEventListener("retrovault:resumeGame", () => {
    showEjsContainer();
    hideLanding();
    const sys  = emulator.currentSystem;
    const name = settings.lastGameName ?? "Unknown";
    document.title = `${name} — RetroVault`;
    setStatusSystem(sys ? sys.shortName : "—");
    setStatusGame(name);
    buildInGameControls(emulator, settings, onSettingsChange, onReturnToLibrary);
  });

  // ── Keyboard shortcuts ────────────────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (emulator.state !== "running") return;
    switch (e.key) {
      case "F5":  e.preventDefault(); emulator.quickSave(1);   break;
      case "F7":  e.preventDefault(); emulator.quickLoad(1);   break;
      case "F1":  e.preventDefault(); emulator.reset();        break;
      case "Escape": onReturnToLibrary();                       break;
    }
  });

  // ── Landing header controls ───────────────────────────────────────────────
  buildLandingControls(settings, deviceCaps, library, onSettingsChange);

  // ── Initial library render ────────────────────────────────────────────────
  renderLibrary(library, settings, onLaunchGame);
}

// ── Library rendering ─────────────────────────────────────────────────────────

export async function renderLibrary(
  library:      GameLibrary,
  settings:     Settings,
  onLaunchGame: (file: File, systemId: string) => Promise<void>
): Promise<void> {
  const grid         = document.getElementById("library-grid");
  const countEl      = document.getElementById("library-count");
  const dropZoneEl   = document.getElementById("drop-zone");
  const libSection   = document.getElementById("library-section");
  if (!grid || !countEl || !dropZoneEl || !libSection) return;

  let games: GameEntry[];
  try {
    games = await library.getAllGames();
  } catch {
    games = [];
  }

  countEl.textContent = games.length > 0 ? `${games.length} game${games.length !== 1 ? "s" : ""}` : "";

  // Toggle layout: if no games, show just the drop zone front and centre
  libSection.classList.toggle("hidden-section", games.length === 0);
  dropZoneEl.classList.toggle("drop-zone--prominent", games.length === 0);
  dropZoneEl.classList.toggle("drop-zone--compact", games.length > 0);

  // Build game cards
  grid.innerHTML = "";
  for (const game of games) {
    grid.appendChild(buildGameCard(game, library, settings, onLaunchGame));
  }
}

function buildGameCard(
  game:         GameEntry,
  library:      GameLibrary,
  settings:     Settings,
  onLaunchGame: (file: File, systemId: string) => Promise<void>
): HTMLElement {
  const system = getSystemById(game.systemId);

  const card = make("div", { class: "game-card", role: "button", tabindex: "0", "aria-label": `Play ${game.name}` });

  // System badge colour
  card.style.setProperty("--sys-color", system?.color ?? "#555");

  const icon = make("div", { class: "game-card__icon" });
  icon.setAttribute("aria-hidden", "true");
  icon.style.background = `linear-gradient(135deg, ${system?.color ?? "#555"}33, ${system?.color ?? "#555"}11)`;
  icon.textContent = systemIcon(game.systemId);

  const info = make("div", { class: "game-card__info" });

  const name = make("div", { class: "game-card__name" }, game.name);

  const meta = make("div", { class: "game-card__meta" });
  const badge = make("span", { class: "sys-badge" }, system?.shortName ?? game.systemId);
  badge.style.background = system?.color ?? "#555";
  const size = make("span", { class: "game-card__size" }, formatBytes(game.size));
  meta.append(badge, size);

  const played = make("div", { class: "game-card__played" },
    game.lastPlayedAt
      ? `Played ${formatRelativeTime(game.lastPlayedAt)}`
      : `Added ${formatRelativeTime(game.addedAt)}`
  );

  info.append(name, meta, played);

  // Remove button (visible on hover)
  const btnRemove = make("button", {
    class: "game-card__remove",
    title: "Remove from library",
    "aria-label": `Remove ${game.name}`,
  }, "✕");
  btnRemove.addEventListener("click", async (e) => {
    e.stopPropagation();
    if (!confirm(`Remove "${game.name}" from your library?\n\nThe file will not be deleted from your device.`)) return;
    await library.removeGame(game.id);
    renderLibrary(library, settings, onLaunchGame);
  });

  // Play overlay (visible on hover)
  const playOverlay = make("div", { class: "game-card__play-overlay", "aria-hidden": "true" });
  const playBtn     = make("div", { class: "game-card__play-btn" }, "▶");
  playOverlay.appendChild(playBtn);

  card.append(icon, info, btnRemove, playOverlay);

  // Launch on click or Enter
  const launch = async () => {
    try {
      const entry = await library.getGame(game.id);
      if (!entry) { showError(`Game "${game.name}" not found in library.`); return; }
      const file = new File([entry.blob], entry.fileName, { type: entry.blob.type });
      await library.markPlayed(game.id);
      await onLaunchGame(file, entry.systemId);
    } catch (err) {
      showError(`Failed to load game: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  card.addEventListener("click", launch);
  card.addEventListener("keydown", (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); launch(); } });

  return card;
}

/** System emoji/icon for game cards. */
function systemIcon(systemId: string): string {
  const icons: Record<string, string> = {
    psp:       "🎮",
    nes:       "🕹",
    snes:      "🕹",
    gba:       "🎯",
    gbc:       "🟢",
    gb:        "⬜",
    n64:       "🎮",
    psx:       "🔵",
    segaMD:    "⚡",
    segaGG:    "🔶",
    segaMS:    "📺",
    atari2600: "👾",
    arcade:    "🕹",
  };
  return icons[systemId] ?? "🎮";
}

// ── System picker modal ───────────────────────────────────────────────────────

/**
 * Show the system picker when a file extension is ambiguous.
 * Resolves with the chosen system or null if dismissed.
 */
function pickSystem(
  fileName:   string,
  candidates: SystemInfo[]
): Promise<SystemInfo | null> {
  return new Promise((resolve) => {
    const panel    = document.getElementById("system-picker")!;
    const list     = document.getElementById("system-picker-list")!;
    const subtitle = document.getElementById("system-picker-subtitle")!;
    const closeBtn = document.getElementById("system-picker-close")!;
    const backdrop = document.getElementById("system-picker-backdrop")!;

    subtitle.textContent =
      `The file "${fileName}" could belong to several systems. Choose one:`;

    list.innerHTML = "";
    for (const sys of candidates) {
      const btn = make("button", { class: "system-pick-btn" });
      const badge = make("span", { class: "sys-badge" }, sys.shortName);
      badge.style.background = sys.color;
      btn.append(badge, document.createTextNode(sys.name));
      btn.addEventListener("click", () => { close(sys); });
      list.appendChild(btn);
    }

    panel.hidden = false;

    const close = (result: SystemInfo | null) => {
      panel.hidden = true;
      resolve(result);
    };

    const onClose = () => close(null);
    closeBtn.addEventListener("click",   onClose, { once: true });
    backdrop.addEventListener("click",   onClose, { once: true });
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") close(null); }, { once: true });
  });
}

// ── Resolve system then add to library and launch ─────────────────────────────

async function resolveSystemAndAdd(
  file:         File,
  library:      GameLibrary,
  settings:     Settings,
  onLaunchGame: (file: File, systemId: string) => Promise<void>
): Promise<void> {
  const detected = detectSystem(file.name);

  let system: SystemInfo | null = null;

  if (detected === null) {
    showError(
      `Unrecognised file type: "${file.name}".\n` +
      `Supported extensions: ${ALL_EXTENSIONS.map(e => `.${e}`).join("  ·  ")}`
    );
    return;
  } else if (Array.isArray(detected)) {
    system = await pickSystem(file.name, detected);
    if (!system) return; // user cancelled
  } else {
    system = detected;
  }

  showLoadingOverlay();
  setLoadingMessage("Adding game to library…");

  try {
    const entry = await library.addGame(file, system.id);
    settings.lastGameName = entry.name;
    // Re-render library in the background — we'll show it when the game ends
    renderLibrary(library, settings, onLaunchGame);
    await onLaunchGame(file, system.id);
  } catch (err) {
    hideLoadingOverlay();
    showError(`Could not add game: ${err instanceof Error ? err.message : String(err)}`);
  }
}

// ── Header controls ───────────────────────────────────────────────────────────

function buildLandingControls(
  settings:         Settings,
  deviceCaps:       DeviceCapabilities,
  library:          GameLibrary,
  onSettingsChange: (patch: Partial<Settings>) => void
): void {
  const container = el("#header-actions");
  container.innerHTML = "";

  const btnSettings = make("button", { class: "btn", title: "Settings", "aria-label": "Open settings" });
  btnSettings.innerHTML = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65
             0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9
             19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0
             0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65
             1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65
             1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0
             1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0
             0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg> Settings`;

  btnSettings.addEventListener("click", () => {
    openSettingsPanel(settings, deviceCaps, library, onSettingsChange);
  });

  // Low-spec indicator
  if (deviceCaps.isLowSpec) {
    const chip = make("span", { class: "perf-chip perf-chip--warn", title: "Performance mode recommended for this device" }, "⚡ Low-spec");
    container.appendChild(chip);
  }

  container.appendChild(btnSettings);
}

function buildInGameControls(
  emulator:          PSPEmulator,
  settings:          Settings,
  onSettingsChange:  (patch: Partial<Settings>) => void,
  onReturnToLibrary: () => void
): void {
  const container = el("#header-actions");
  container.innerHTML = "";

  const btnLibrary = make("button", { class: "btn", title: "Back to library (Esc)" }, "← Library");
  btnLibrary.addEventListener("click", onReturnToLibrary);

  const btnSave = make("button", { class: "btn", title: "Quick Save (F5)" }, "💾 Save");
  btnSave.addEventListener("click", () => emulator.quickSave(1));

  const btnLoad = make("button", { class: "btn", title: "Quick Load (F7)" }, "📂 Load");
  btnLoad.addEventListener("click", () => emulator.quickLoad(1));

  const btnReset = make("button", { class: "btn btn--danger", title: "Reset game (F1)" }, "↺ Reset");
  btnReset.addEventListener("click", () => {
    if (confirm("Reset the game? Unsaved progress will be lost.")) emulator.reset();
  });

  // Volume control
  const volWrap  = make("label", { class: "btn vol-control", style: "cursor:default" });
  const volIcon  = make("span", {}, settings.volume === 0 ? "🔇" : "🔊");
  const volSlider = make("input", {
    type: "range", min: "0", max: "1", step: "0.05",
    value: String(settings.volume),
    "aria-label": "Volume",
  }) as HTMLInputElement;

  volSlider.addEventListener("input", () => {
    const v = Number(volSlider.value);
    emulator.setVolume(v);
    onSettingsChange({ volume: v });
    volIcon.textContent = v === 0 ? "🔇" : v < 0.5 ? "🔉" : "🔊";
  });

  volWrap.append(volIcon, volSlider);
  container.append(btnLibrary, btnSave, btnLoad, btnReset, volWrap);
}

// ── Settings panel ────────────────────────────────────────────────────────────

export function openSettingsPanel(
  settings:         Settings,
  deviceCaps:       DeviceCapabilities,
  library:          GameLibrary,
  onSettingsChange: (patch: Partial<Settings>) => void
): void {
  const panel   = document.getElementById("settings-panel")!;
  const content = document.getElementById("settings-content")!;
  buildSettingsContent(content, settings, deviceCaps, library, onSettingsChange);
  panel.hidden = false;

  const close = () => { panel.hidden = true; };
  document.getElementById("settings-close")!.onclick = close;
  document.getElementById("settings-backdrop")!.onclick = close;
}

function buildSettingsContent(
  container:        HTMLElement,
  settings:         Settings,
  deviceCaps:       DeviceCapabilities,
  library:          GameLibrary,
  onSettingsChange: (patch: Partial<Settings>) => void
): void {
  container.innerHTML = "";

  // ── Performance Mode ──────────────────────────────────────────────────────
  const perfSection = make("div", { class: "settings-section" });
  perfSection.appendChild(make("h4", { class: "settings-section__title" }, "Performance Mode"));
  perfSection.appendChild(make("p", { class: "settings-help" },
    "Controls rendering resolution and frameskip for demanding systems (PSP, N64)."
  ));

  const modes: Array<{ value: PerformanceMode; label: string; desc: string }> = [
    { value: "auto",        label: "Auto (recommended)", desc: "Detected: " + (deviceCaps.isLowSpec ? "Performance" : "Quality") },
    { value: "performance", label: "Performance",        desc: "1× resolution, auto frameskip — best for low-spec devices" },
    { value: "quality",     label: "Quality",            desc: "Higher resolution, no frameskip" },
  ];

  for (const m of modes) {
    const row   = make("label", { class: "radio-row" });
    const radio = make("input", { type: "radio", name: "perf-mode", value: m.value }) as HTMLInputElement;
    if (settings.performanceMode === m.value) radio.checked = true;
    radio.addEventListener("change", () => {
      if (radio.checked) onSettingsChange({ performanceMode: m.value });
    });
    const txt = make("span", { class: "radio-row__text" });
    txt.append(
      make("span", { class: "radio-row__label" }, m.label),
      make("span", { class: "radio-row__desc"  }, m.desc)
    );
    row.append(radio, txt);
    perfSection.appendChild(row);
  }

  // ── Device Info ───────────────────────────────────────────────────────────
  const deviceSection = make("div", { class: "settings-section" });
  deviceSection.appendChild(make("h4", { class: "settings-section__title" }, "Device Info"));

  const capText = formatCapabilitiesSummary(deviceCaps);
  deviceSection.appendChild(make("p", { class: "device-info" }, capText));

  const tierBadge = make("span", {
    class: deviceCaps.isLowSpec ? "tier-badge tier-badge--warn" : "tier-badge tier-badge--ok",
  }, deviceCaps.isLowSpec ? "⚡ Low-spec — Performance mode recommended" : "✓ Good hardware for emulation");
  deviceSection.appendChild(tierBadge);

  const webglRow = make("p", { class: "device-info" },
    `WebGL 2: ${document.createElement("canvas").getContext("webgl2") ? "✓ Available" : "✗ Not available"}`
  );
  deviceSection.appendChild(webglRow);

  const sabRow = make("p", { class: "device-info" },
    `SharedArrayBuffer: ${typeof SharedArrayBuffer !== "undefined" ? "✓ Available (PSP supported)" : "✗ Not available (PSP requires reload with service worker)"}`
  );
  deviceSection.appendChild(sabRow);

  // ── Library Stats ─────────────────────────────────────────────────────────
  const libSection = make("div", { class: "settings-section" });
  libSection.appendChild(make("h4", { class: "settings-section__title" }, "Library Storage"));

  const statsEl = make("p", { class: "device-info" }, "Calculating…");
  libSection.appendChild(statsEl);

  library.getAllGames().then(games => {
    const total = games.reduce((s, g) => s + g.size, 0);
    statsEl.textContent = `${games.length} game${games.length !== 1 ? "s" : ""} · ${formatBytes(total)} stored locally`;
  }).catch(() => { statsEl.textContent = "Could not load library stats."; });

  const btnClear = make("button", { class: "btn btn--danger", style: "margin-top:10px" }, "Clear Library");
  btnClear.addEventListener("click", async () => {
    if (!confirm("Remove all games from your library?\n\nThis will delete all stored ROM data. This cannot be undone.")) return;
    await library.clearAll();
    document.getElementById("settings-panel")!.hidden = true;
    document.title = "RetroVault";
    // Re-render
    const onLaunchGame = (window as any).__onLaunchGame as (f: File, s: string) => Promise<void>;
    if (onLaunchGame) renderLibrary(library, settings, onLaunchGame);
  });
  libSection.appendChild(btnClear);

  // ── Supported Systems ─────────────────────────────────────────────────────
  const sysSection = make("div", { class: "settings-section" });
  sysSection.appendChild(make("h4", { class: "settings-section__title" }, "Supported Systems"));
  const sysList = make("div", { class: "sys-list" });
  for (const sys of SYSTEMS) {
    const chip = make("span", { class: "sys-chip" }, sys.shortName);
    chip.style.background = sys.color;
    chip.title = sys.name;
    sysList.appendChild(chip);
  }
  sysSection.appendChild(sysList);

  container.append(perfSection, deviceSection, libSection, sysSection);
}

// ── State-driven DOM updates ──────────────────────────────────────────────────

function updateStatusDot(state: EmulatorState): void {
  const dot   = document.getElementById("status-dot");
  const label = document.getElementById("status-state");
  if (!dot || !label) return;

  const labels: Record<EmulatorState, string> = {
    idle: "Idle", loading: "Loading", running: "Running", paused: "Paused", error: "Error",
  };
  dot.className     = `status-dot ${state}`;
  label.textContent = labels[state];

  if (state === "loading") showLoadingOverlay();
}

// ── Visibility helpers ────────────────────────────────────────────────────────

export function hideLanding(): void      { el("#landing").classList.add("hidden"); }
export function showLanding(): void      { el("#landing").classList.remove("hidden"); }
export function showLoadingOverlay(): void {
  const o = document.getElementById("loading-overlay");
  if (o) { o.classList.add("visible"); }
}
export function hideLoadingOverlay(): void {
  const o = document.getElementById("loading-overlay");
  if (o) { o.classList.remove("visible"); }
}
export function showEjsContainer(): void {
  const c = document.getElementById("ejs-container");
  if (c) c.classList.add("visible");
}
export function hideEjsContainer(): void {
  const c = document.getElementById("ejs-container");
  if (c) c.classList.remove("visible");
}
export function setLoadingMessage(msg: string): void {
  const el2 = document.getElementById("loading-message");
  if (el2) el2.textContent = msg;
}
export function setStatusGame(name: string): void {
  const el2 = document.getElementById("status-game");
  if (el2) el2.textContent = name;
}
export function setStatusSystem(name: string): void {
  const el2 = document.getElementById("status-system");
  if (el2) el2.textContent = name;
}
export function showError(msg: string): void {
  const banner = document.getElementById("error-banner");
  const msgEl  = document.getElementById("error-message");
  if (!banner || !msgEl) return;
  msgEl.textContent = msg;
  banner.classList.add("visible");
}
export function hideError(): void {
  document.getElementById("error-banner")?.classList.remove("visible");
}

/**
 * ui.ts — Build and wire the application UI
 *
 * Responsibilities:
 *   • Render the static HTML structure into #app
 *   • Wire the file-picker / drag-and-drop zone
 *   • Connect emulator lifecycle callbacks to DOM updates
 *   • Expose controls (Reset, Quick Save/Load) that call back into PSPEmulator
 *   • Show/hide the landing screen vs. the EmulatorJS container
 *   • Display progress and error messages
 *
 * EmulatorJS provides its own internal controls toolbar (fullscreen, mute,
 * volume slider, save/load state, touch overlay on mobile, gamepad detection).
 * We therefore keep our own controls minimal: just Reset and Quick Save/Load
 * in the header so they're always accessible above the EJS chrome.
 *
 * Keyboard shortcuts (global):
 *   F5        → Quick Save slot 1
 *   F7        → Quick Load slot 1
 *   F1        → Reset
 */

import { PSPEmulator, PSP_EXTENSIONS, type EmulatorState } from "./emulator.js";
import type { Settings } from "./main.js";

// ── DOM helper ────────────────────────────────────────────────────────────────

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

/**
 * Render the full page shell into `#app`.
 * Called once on startup.
 */
export function buildDOM(app: HTMLElement): void {
  app.innerHTML = `
    <header class="app-header">
      <div class="app-header__title">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
             stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <rect x="2" y="6" width="20" height="12" rx="2"/>
          <circle cx="8" cy="12" r="1.5"/>
          <circle cx="16" cy="12" r="1.5"/>
          <line x1="12" y1="9" x2="12" y2="15"/>
          <line x1="9"  y1="12" x2="15" y2="12"/>
        </svg>
        <span class="title-long">Web PSP Emulator</span>
        <span class="title-short" style="display:none">PSP</span>
      </div>
      <div class="app-header__actions" id="header-actions">
        <!-- Populated by initControls() after emulator starts -->
      </div>
    </header>

    <main class="app-main">
      <!-- ── Landing: file-picker ── -->
      <section id="landing">
        <div class="landing__drop-zone" id="drop-zone">
          <input type="file"
                 id="file-input"
                 accept=".iso,.cso,.pbp,.chd,.elf,.zip"
                 aria-label="Select PSP game file" />
          <div class="landing__drop-icon" aria-hidden="true">🎮</div>
          <p class="landing__drop-label">Drop your PSP game here</p>
          <p class="landing__drop-sub">
            Accepts: ${PSP_EXTENSIONS.map(e => `.${e}`).join("  ·  ")}
          </p>
          <button class="landing__drop-browse" tabindex="-1" aria-hidden="true">
            Browse files
          </button>
        </div>
        <p class="landing__legal">
          ⚠ Bring your own legally obtained game files.<br>
          This site does not provide ROMs or BIOS files.<br>
          <a href="https://emulatorjs.org" target="_blank" rel="noopener">
            Powered by EmulatorJS (PPSSPP core)
          </a>
        </p>
      </section>

      <!-- ── EmulatorJS mount point ── -->
      <div id="ejs-container">
        <div id="ejs-player"></div>
      </div>

      <!-- ── Loading overlay ── -->
      <div id="loading-overlay" role="status" aria-live="polite">
        <div class="loading-spinner" aria-hidden="true"></div>
        <p id="loading-message">Initialising…</p>
      </div>

      <!-- ── Error banner ── -->
      <div id="error-banner" role="alert" aria-live="assertive">
        <span class="error-close" id="error-close" title="Dismiss">✕</span>
        <span id="error-message"></span>
      </div>
    </main>

    <footer class="app-footer">
      <div class="status-item">
        <div class="status-dot idle" id="status-dot"></div>
        <span class="status-item__label">State:</span>
        <span class="status-item__value" id="status-state">Idle</span>
      </div>
      <div class="status-item hide-mobile">
        <span class="status-item__label">Core:</span>
        <span class="status-item__value">PPSSPP (PSP)</span>
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
  emulator: PSPEmulator;
  settings: Settings;
  /** Called when the user picks a file. */
  onFileSelected: (file: File) => void;
  /** Called when a setting changes (so main.ts can persist it). */
  onSettingsChange: (patch: Partial<Settings>) => void;
}

/**
 * Wire all DOM events and emulator callbacks.
 * Must be called after `buildDOM()`.
 */
export function initUI(opts: UIOptions): void {
  const { emulator, settings, onFileSelected, onSettingsChange } = opts;

  // ── File picker ──────────────────────────────────────────────────────────
  const fileInput = el<HTMLInputElement>("#file-input");
  const dropZone  = el("#drop-zone");

  fileInput.addEventListener("change", () => {
    const file = fileInput.files?.[0];
    if (file) onFileSelected(file);
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("drag-over");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("drag-over");
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropZone.classList.remove("drag-over");
    const file = e.dataTransfer?.files[0];
    if (file) onFileSelected(file);
  });

  // ── Error banner dismiss ────────────────────────────────────────────────
  el("#error-close").addEventListener("click", () => hideError());

  // ── Emulator callbacks ──────────────────────────────────────────────────
  emulator.onStateChange = (state) => updateState(state);
  emulator.onProgress    = (msg)   => setLoadingMessage(msg);
  emulator.onError       = (msg)   => showError(msg);
  emulator.onGameStart   = ()      => {
    hideLanding();
    hideLoadingOverlay();
    showEjsContainer();
    setStatusGame(settings.lastGameName ?? "Unknown");
    buildInGameControls(emulator, settings, onSettingsChange);
  };

  // ── Keyboard shortcuts ──────────────────────────────────────────────────
  document.addEventListener("keydown", (e) => {
    if (emulator.state !== "running") return;
    switch (e.key) {
      case "F5": e.preventDefault(); emulator.quickSave(1); break;
      case "F7": e.preventDefault(); emulator.quickLoad(1); break;
      case "F1": e.preventDefault(); emulator.reset();      break;
    }
  });
}

// ── In-game header controls ───────────────────────────────────────────────────

/**
 * Populate the header action area once a game is running.
 * These complement (not replace) EmulatorJS's own built-in bottom bar.
 */
function buildInGameControls(
  emulator: PSPEmulator,
  settings: Settings,
  onSettingsChange: (patch: Partial<Settings>) => void
): void {
  const container = el("#header-actions");
  container.innerHTML = ""; // clear any previous controls

  // Quick Save (F5)
  const btnSave = make("button", { class: "btn", title: "Quick Save (F5)" }, "💾 Save");
  btnSave.addEventListener("click", () => emulator.quickSave(1));

  // Quick Load (F7)
  const btnLoad = make("button", { class: "btn", title: "Quick Load (F7)" }, "📂 Load");
  btnLoad.addEventListener("click", () => emulator.quickLoad(1));

  // Reset (F1)
  const btnReset = make(
    "button",
    { class: "btn btn--danger", title: "Reset game (F1)" },
    "↺ Reset"
  );
  btnReset.addEventListener("click", () => {
    if (confirm("Reset the game? Unsaved progress will be lost.")) {
      emulator.reset();
    }
  });

  // Load New Game — requires a page reload since EJS doesn't support hot swap
  const btnNew = make("button", { class: "btn", title: "Load a different game" }, "📁 New Game");
  btnNew.addEventListener("click", () => {
    if (
      confirm(
        "Loading a new game requires a page reload.\n\n" +
        "Quick-save your progress first (💾 Save), then click OK."
      )
    ) {
      window.location.reload();
    }
  });

  // Volume control
  const volumeWrap = make("label", { class: "btn", style: "gap:6px;cursor:default" });
  volumeWrap.title = "Volume";
  const volIcon = make("span", {}, "🔊");
  const volSlider = make("input", {
    type:  "range",
    min:   "0",
    max:   "1",
    step:  "0.05",
    value: String(settings.volume),
    style: "width:72px;cursor:pointer;accent-color:var(--c-accent)",
  }) as HTMLInputElement;

  volSlider.addEventListener("input", () => {
    const v = Number(volSlider.value);
    emulator.setVolume(v);
    onSettingsChange({ volume: v });
    volIcon.textContent = v === 0 ? "🔇" : v < 0.5 ? "🔉" : "🔊";
  });

  volumeWrap.append(volIcon, volSlider);
  container.append(btnSave, btnLoad, btnReset, btnNew, volumeWrap);
}

// ── State-driven DOM updates ─────────────────────────────────────────────────

function updateState(state: EmulatorState): void {
  const dot   = el("#status-dot");
  const label = el("#status-state");

  const labels: Record<EmulatorState, string> = {
    idle:    "Idle",
    loading: "Loading",
    running: "Running",
    error:   "Error",
  };

  dot.className   = `status-dot ${state}`;
  label.textContent = labels[state];

  if (state === "loading") showLoadingOverlay();
  if (state === "error")   hideLoadingOverlay();
  // "running" is handled in emulator.onGameStart
  // "idle" is the default starting state — no special action needed
}

// ── Individual visibility toggles ────────────────────────────────────────────

export function hideLanding(): void {
  el("#landing").classList.add("hidden");
}

export function showLanding(): void {
  el("#landing").classList.remove("hidden");
}

export function showLoadingOverlay(): void {
  el("#loading-overlay").classList.add("visible");
}

export function hideLoadingOverlay(): void {
  el("#loading-overlay").classList.remove("visible");
}

export function showEjsContainer(): void {
  el("#ejs-container").classList.add("visible");
}

export function setLoadingMessage(msg: string): void {
  const msgEl = document.querySelector("#loading-message");
  if (msgEl) msgEl.textContent = msg;
}

export function setStatusGame(name: string): void {
  const el2 = document.querySelector("#status-game");
  if (el2) el2.textContent = name;
}

export function showError(msg: string): void {
  const banner = document.querySelector("#error-banner");
  const msgEl  = document.querySelector("#error-message");
  if (!banner || !msgEl) return;
  msgEl.textContent = msg;
  banner.classList.add("visible");
}

export function hideError(): void {
  document.querySelector("#error-banner")?.classList.remove("visible");
}

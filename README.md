# Web PSP Emulator

A minimal, single-page web application that runs PSP games in the browser using
[EmulatorJS](https://emulatorjs.org) and the PPSSPP core.
No server required — everything runs client-side. You supply the ROM.

---

## Quick Start

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in Chrome or Firefox.

> **First visit on a static host:** the service worker (`coi-serviceworker.js`)
> will register and immediately reload the page once — that's normal and needed
> for SharedArrayBuffer support.

---

## Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with hot-reload on port 5173 |
| `npm run build` | Type-check + produce optimised static output in `dist/` |
| `npm run preview` | Serve the `dist/` build locally on port 4173 |

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Build | [Vite 5](https://vitejs.dev) |
| Language | TypeScript 5 |
| Emulation | [EmulatorJS](https://emulatorjs.org) — PPSSPP core via CDN |
| Persistence | `localStorage` (settings); IndexedDB (save states, managed by EmulatorJS) |

### EmulatorJS CDN URL

```
https://cdn.emulatorjs.org/stable/data/
```

The `stable` channel is pinned to the latest tested release.
All EmulatorJS assets (JavaScript, WebAssembly cores, assets) are fetched
on-demand from this CDN when a game is launched — nothing is bundled.

---

## Project Structure

```
index.html                  HTML shell (one <div id="app">)
vite.config.ts              Dev server with COOP/COEP headers + build config
tsconfig.json               TypeScript config
public/
  coi-serviceworker.js      Injects COOP/COEP headers via SW (static hosting)
src/
  main.ts                   Entry point — bootstraps UI, loads settings
  emulator.ts               PSPEmulator class (EmulatorJS lifecycle wrapper)
  ui.ts                     DOM construction and event wiring
  style.css                 Minimal dark-theme styles
```

---

## Usage

1. Click the drop zone (or drag a file onto it) and pick a PSP game file.
2. Supported formats: `.iso`, `.cso`, `.pbp`, `.chd`, `.elf`, `.zip`
3. EmulatorJS downloads the PPSSPP core from the CDN (≈ 5–15 MB, cached).
4. The game boots automatically.

### Controls

**Keyboard defaults** (configured inside EmulatorJS settings ⚙):

| PSP Button | Default Key |
|-----------|-------------|
| D-pad | Arrow keys |
| ✕ / ○ / □ / △ | Z / X / A / S |
| L / R | Q / E |
| Start / Select | Enter / Backspace |
| Analog stick | WASD |

**Gamepad:** plug in a USB/Bluetooth gamepad — EmulatorJS detects it
automatically via the Web Gamepad API.

**Mobile:** touch controls (virtual D-pad + buttons) appear automatically on
touch-screen devices.

### Application controls

| Control | Action |
|---------|--------|
| 💾 Save (header) | Quick-save to slot 1 |
| 📂 Load (header) | Quick-load from slot 1 |
| ↺ Reset (header) | Restart the current game |
| 📁 New Game (header) | Reload page to pick a different game |
| Volume slider (header) | Adjust volume (persisted) |
| **F5** | Quick-save slot 1 |
| **F7** | Quick-load slot 1 |
| **F1** | Reset |
| EmulatorJS ⚙ icon | Full settings: key remap, shaders, state slots, … |

### Persisted settings (localStorage)

- **Volume** — restored on next visit.
- **Last game name** — shown in the status bar (the ROM file itself is never stored).

---

## Cross-Origin Isolation

The PPSSPP core uses WebAssembly threads, which require `SharedArrayBuffer`.
`SharedArrayBuffer` is only available in [Cross-Origin Isolated](https://web.dev/cross-origin-isolation-guide/) contexts:

```
Cross-Origin-Opener-Policy:  same-origin
Cross-Origin-Embedder-Policy: require-corp
```

**Development:** Vite sets these headers directly (`vite.config.ts`).

**Production (static hosts):** `public/coi-serviceworker.js` intercepts all
fetch responses and injects the headers. The page reloads once on first visit
to activate the service worker — this is expected behaviour.

---

## Known Limitations

### PPSSPP core on the web

| Limitation | Details |
|-----------|---------|
| Requires SharedArrayBuffer | Needs COOP + COEP isolation. See above. |
| Requires WebGL 2 | PPSSPP uses OpenGL ES 3-level rendering. Most desktop browsers support this; some older mobile browsers do not. |
| Performance | Running a PSP (originally ~333 MHz MIPS + custom GPU) in a browser tab is demanding. Expect 20–60 fps depending on game and hardware. CPU-heavy titles may run at half speed. |
| Audio latency | Web Audio introduces several frames of latency compared with native; audio may stutter on slow machines. |
| No networking | PSP ad-hoc / infrastructure multiplayer is not implemented in this MVP. |
| Save-data path | EmulatorJS stores saves in IndexedDB under the game name. Renaming the ROM file before loading can cause saves to be unlinked. |
| Large ISOs | A 1 GB ISO creates a 1 GB Blob in browser memory. This is fine on desktop with 8 GB+ RAM; it may OOM on mobile. |
| iOS Safari | Cross-Origin Isolation via service worker is unreliable on iOS WebKit. Use Chrome or Firefox on desktop for best results. |
| One game per session | EmulatorJS does not expose a clean `destroy()` API. Loading a different game requires a page reload (the "New Game" button handles this). |

### Tips

- **Start with simpler games** (2D, action, puzzle) before trying CPU-heavy 3D titles.
- **Use Chrome or Firefox on desktop** — they have the most complete WebAssembly and WebGL 2 implementations.
- **Enable hardware acceleration** in your browser settings for better performance.
- **Chrome flags** — if SharedArrayBuffer is still unavailable, try enabling `chrome://flags/#enable-experimental-web-platform-features`.
- **CSO format** — compressed ISOs (`.cso`) are smaller downloads; PPSSPP decompresses them transparently.

---

## Legal

This application does **not** include or distribute any ROM files, BIOS images,
or proprietary Sony assets.
You must supply your own legally obtained game files.

EmulatorJS is licensed under [GPL-3.0](https://github.com/EmulatorJS/EmulatorJS/blob/main/LICENSE).

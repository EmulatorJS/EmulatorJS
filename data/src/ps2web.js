/**
 * PS2 webplay backend — static recompilation core ("ps2web").
 *
 * Unlike every other EmulatorJS core, ps2web is NOT a RetroArch libretro core.
 * It runs a per-game WebAssembly build produced ahead of time by the
 * ps2-web-recomp toolchain (https://github.com/ps2-web-recomp — MIT licensed):
 * the game's Emotion Engine machine code is translated to C++ and compiled to
 * WASM, the rest of the console (IOP, SPU2, IPU, GS over WebGPU) is emulated
 * by the runtime, and the disc image is streamed over HTTP Range requests.
 *
 * What this file does:
 *   - Downloads a per-game build bundle (ps2web.js / .wasm / .data / optional
 *     .worker.js and boot.txt) from `config.ps2Path` (default: <data>/cores/ps2/).
 *   - Boots the Emscripten module against EmulatorJS's own canvas.
 *   - Streams the ROM from `config.gameUrl` as the disc image (Range requests).
 *   - Polls keyboard + gamepads and feeds the runtime's DualShock API,
 *     including analog pressure and rumble.
 *   - Keeps an 8 MB memory card in slot 1 in IndexedDB (IDBFS), and wires
 *     EmulatorJS's save/load .sav buttons to export/import that card.
 *
 * Hosting requirements (same as threads-enabled cores):
 *   Cross-Origin-Opener-Policy: same-origin
 *   Cross-Origin-Embedder-Policy: require-corp
 *   plus Range request support on the ROM endpoint.
 */

const PS2_BUNDLE_FILES = ["ps2web.js", "ps2web.wasm", "ps2web.data", "ps2web.worker.js", "boot.txt"];

const PS2_KEY_MAP = {
    ArrowUp: 4, ArrowRight: 5, ArrowDown: 6, ArrowLeft: 7,
    KeyZ: 14, KeyX: 13, KeyA: 15, KeyS: 12,
    KeyQ: 10, KeyW: 11, Digit1: 8, Digit2: 9,
    Enter: 3, Backspace: 0
};
const PS2_STICK_KEYS = new Set(["KeyI", "KeyJ", "KeyK", "KeyL"]);
const PS2_PAD_BUTTONS = [
    [0, 14], [1, 13], [2, 15], [3, 12], [4, 10], [5, 11], [6, 8], [7, 9],
    [8, 0], [9, 3], [10, 1], [11, 2], [12, 4], [13, 6], [14, 7], [15, 5]
];

export class EJS_PS2 {
    constructor(EJS) {
        this.EJS = EJS;
        this.Module = null;
        this.keys = new Set();
        this.players = [0, 1].map(() => ({ plugged: false, pad: -1, pressure: "", strong: 0, weak: 0, rumbleAt: 0 }));
        this.audio = null;
        this.audioNode = null;
        this.listeners = [];
    }

    /* ------------------------------------------------------------------ *
     * Bundle download & module boot                                       *
     * ------------------------------------------------------------------ */

    get bundlePath() {
        return this.EJS.config.ps2Path || (this.EJS.config.dataPath + "cores/ps2/");
    }

    async downloadBundle() {
        const bundle = {};
        for (const name of PS2_BUNDLE_FILES) {
            const url = this.bundlePath + name;
            const res = await fetch(url, { method: "GET" });
            if (!res.ok) {
                if (name === "ps2web.worker.js" || name === "boot.txt") continue; // optional
                throw new Error("Could not download PS2 bundle file " + name + " (" + res.status + ") from " + url);
            }
            bundle[name] = await res.arrayBuffer();
        }
        if (!bundle["ps2web.js"] || !bundle["ps2web.wasm"] || !bundle["ps2web.data"]) {
            throw new Error("PS2 bundle is incomplete — expected ps2web.js, ps2web.wasm and ps2web.data under " + this.bundlePath);
        }
        return bundle;
    }

    async start() {
        const EJS = this.EJS;
        if (typeof window.SharedArrayBuffer !== "function") {
            EJS.startGameError(EJS.localization("Error for site owner") + "\n" + EJS.localization("Check console"));
            console.warn("The ps2web core requires threads. Serve the page cross-origin isolated (COOP: same-origin, COEP: require-corp) and set EJS_threads = true.");
            return;
        }
        if (!navigator.gpu) {
            EJS.startGameError(EJS.localization("Outdated graphics driver"));
            console.warn("The ps2web core renders through WebGPU, which this browser does not expose. Use a current Chrome, Edge or Safari.");
            return;
        }

        EJS.textElem.innerText = EJS.localization("Download Game Core");
        let bundle;
        try {
            bundle = await this.downloadBundle();
        } catch (e) {
            console.warn(e);
            EJS.startGameError(EJS.localization("Error downloading core") + " (ps2web)");
            return;
        }

        // The runtime is a non-modularized Emscripten build: it picks up the
        // global `Module` object if one is defined before the script runs.
        // The WebGPU surface is resolved through the '#canvas' DOM target, so
        // EmulatorJS's canvas must carry that id while this core runs.
        const canvas = EJS.canvas;
        canvas.id = "canvas";
        const self = this;
        window.Module = {
            canvas: canvas,
            noInitialRun: true,
            arguments: ["/game/core.elf"],
            discUrl: EJS.config.gameUrl,
            print: (t) => { if (EJS.debug) console.log("[ps2web]", t); },
            printErr: (t) => { if (EJS.debug) console.warn("[ps2web]", t); },
            setStatus: (text) => {
                if (!text || !EJS.textElem) return;
                const progress = text.match(/^Downloading data\.\.\. \((\d+)\/\d+\)/);
                EJS.textElem.innerText = progress
                    ? EJS.localization("Download Game Core") + " " + (Number(progress[1]) / 1048576).toFixed(1) + " MB"
                    : text;
            },
            locateFile: (fileName) => {
                if (fileName.endsWith(".wasm")) return URL.createObjectURL(new Blob([bundle["ps2web.wasm"]], { type: "application/wasm" }));
                if (fileName.endsWith(".worker.js") && bundle["ps2web.worker.js"]) {
                    return URL.createObjectURL(new Blob([bundle["ps2web.worker.js"]], { type: "application/javascript" }));
                }
                if (fileName.endsWith(".data")) return URL.createObjectURL(new Blob([bundle["ps2web.data"]], { type: "application/octet-stream" }));
                return fileName;
            },
            preRun: [() => {
                // boot.txt tells the runtime the argv[0] the game expects
                if (bundle["boot.txt"]) {
                    const boot = new TextDecoder().decode(bundle["boot.txt"]).trim();
                    window.Module.arguments = [boot || "/game/core.elf"];
                }
                // Memory card in slot 1, kept in browser storage for this origin.
                // FS/IDBFS are globals in the non-modularized build at preRun time.
                try {
                    if (typeof FS !== "undefined" && typeof IDBFS !== "undefined") {
                        FS.mkdir("/memcard");
                        FS.mount(IDBFS, {}, "/memcard");
                        window.Module.addRunDependency("card");
                        FS.syncfs(true, (err) => {
                            if (err) console.warn("memory card: could not read browser storage", err);
                            window.Module.removeRunDependency("card");
                        });
                    }
                } catch (e) {
                    console.warn("memory card: browser storage is not available", e);
                }
                window.Module.addRunDependency("disc");
                fetch(window.Module.discUrl, { method: "HEAD" }).then((r) => {
                    window.Module.discSize = Number(r.headers.get("content-length")) || 0;
                    window.Module.removeRunDependency("disc");
                }).catch(() => window.Module.removeRunDependency("disc"));
            }],
            ps2CardSaved: () => self.syncCard(),
            onRuntimeInitialized: () => self.onRuntimeReady()
        };

        EJS.textElem.innerText = EJS.localization("Loading...");
        const script = document.createElement("script");
        script.src = URL.createObjectURL(new Blob([bundle["ps2web.js"]], { type: "application/javascript" }));
        script.addEventListener("error", () => {
            EJS.startGameError(EJS.localization("Error loading EmulatorJS runtime"));
        });
        document.body.appendChild(script);
    }

    async onRuntimeReady() {
        const EJS = this.EJS;
        this.Module = window.Module;
        try {
            await this.startAudio();
        } catch (e) {
            console.warn("ps2web: audio unavailable", e);
        }
        this.bindInput();

        // Attach the canvas the way startGame() does, THEN size it — before the
        // canvas is in the DOM its clientWidth is 0 and the WebGPU surface
        // would be created 1x1 (black screen).
        EJS.textElem.remove();
        EJS.textElem = null;
        EJS.game.classList.remove("ejs_game");
        EJS.game.classList.add("ejs_canvas_parent");
        EJS.game.appendChild(EJS.canvas);
        EJS.handleResize();
        this.fitCanvas();
        const onResize = () => this.fitCanvas();
        this.listeners.push(["resize", onResize]);
        window.addEventListener("resize", onResize);
        if (typeof ResizeObserver === "function") {
            this.resizeObserver = new ResizeObserver(onResize);
            this.resizeObserver.observe(EJS.canvas);
        }
        EJS.started = true;
        EJS.paused = false;
        if (EJS.config.noAutoFocus !== true) EJS.elements.parent.focus();

        this.Module.running = true;
        this.Module.callMain(this.Module.arguments);
        EJS.callEvent("start");
        this.setupCardButtons();
    }

    /* ------------------------------------------------------------------ *
     * Canvas sizing                                                       *
     * ------------------------------------------------------------------ */

    fitCanvas() {
        const canvas = this.EJS.canvas;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        const width = Math.max(1, Math.round(canvas.clientWidth * ratio));
        const height = Math.max(1, Math.round(canvas.clientHeight * ratio));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            if (this.Module && this.Module.running && this.Module._ps2web_resize) {
                this.Module._ps2web_resize(width, height);
            }
        }
    }

    /* ------------------------------------------------------------------ *
     * Audio — SPU2 ring buffer into an AudioWorklet over SharedArrayBuffer *
     * ------------------------------------------------------------------ */

    async startAudio() {
        const workletSource = `
class Output extends AudioWorkletProcessor {
  constructor(options) {
    super();
    const { buffer, base } = options.processorOptions;
    this.ring = new Uint32Array(buffer, base, 4);
    this.capacity = this.ring[2];
    this.samples = new Int16Array(buffer, base + 16, this.capacity * 2);
    this.left = 0;
    this.right = 0;
  }
  process(inputs, outputs) {
    const left = outputs[0][0], right = outputs[0][1];
    const write = Atomics.load(this.ring, 0), mask = this.capacity - 1;
    let read = Atomics.load(this.ring, 1);
    for (let i = 0; i < left.length; ++i) {
      if (read !== write) {
        const at = (read & mask) * 2;
        this.left = this.samples[at] / 32768;
        this.right = this.samples[at + 1] / 32768;
        read = (read + 1) >>> 0;
      } else {
        this.left *= 0.995;
        this.right *= 0.995;
      }
      left[i] = this.left;
      right[i] = this.right;
    }
    Atomics.store(this.ring, 1, read);
    Atomics.store(this.ring, 3, 1);
    return true;
  }
}
registerProcessor('ps2-output', Output);`;
        this.audio = new AudioContext({ sampleRate: 48000, latencyHint: "interactive" });
        await this.audio.audioWorklet.addModule(URL.createObjectURL(new Blob([workletSource], { type: "application/javascript" })));
        this.audioNode = new AudioWorkletNode(this.audio, "ps2-output", {
            outputChannelCount: [2],
            processorOptions: { buffer: this.Module.HEAPU8.buffer, base: this.Module._ps2web_audio_ring() }
        });
        const gain = this.audio.createGain();
        gain.gain.value = this.EJS.muted ? 0 : this.EJS.volume;
        this.EJS.ps2Gain = gain;
        this.audioNode.connect(gain).connect(this.audio.destination);
        if (this.audio.state === "suspended") {
            const resume = () => { this.audio.resume(); };
            window.addEventListener("pointerdown", resume, { once: true });
            window.addEventListener("keydown", resume, { once: true });
        }
    }

    /* ------------------------------------------------------------------ *
     * Input — keyboard + gamepads straight into the runtime's pad API     *
     * ------------------------------------------------------------------ */

    bindInput() {
        const down = (e) => {
            if (e.code in PS2_KEY_MAP || PS2_STICK_KEYS.has(e.code)) {
                this.keys.add(e.code);
                e.preventDefault();
            }
        };
        const up = (e) => this.keys.delete(e.code);
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);
        this.listeners.push(["keydown", down], ["keyup", up]);
        this.pollTimer = setInterval(() => this.pollInput(), 8);
    }

    pollInput() {
        if (!this.Module || !this.Module._ps2web_pad) return;
        const pads = [...(navigator.getGamepads ? navigator.getGamepads() : [])].filter((pad) => pad);
        this.pollPlayer(0, pads[0] || null, true);
        this.pollPlayer(1, pads[1] || null, false);
    }

    pollPlayer(port, gamepad, own) {
        const M = this.Module;
        const player = this.players[port];
        const plugged = port === 0 || !!gamepad;
        if (plugged !== player.plugged) {
            player.plugged = plugged;
            M._ps2web_pad_connected(port, plugged ? 1 : 0);
        }
        if (!plugged) return;
        let buttons = 0, lx = 128, ly = 128, rx = 128, ry = 128;
        const pressure = new Array(16).fill(255);
        if (own) {
            for (const k of this.keys) if (k in PS2_KEY_MAP) buttons |= 1 << PS2_KEY_MAP[k];
            if (this.keys.has("KeyJ")) lx = 0;
            if (this.keys.has("KeyL")) lx = 255;
            if (this.keys.has("KeyI")) ly = 0;
            if (this.keys.has("KeyK")) ly = 255;
        }
        const full = buttons;
        if (gamepad) {
            for (const [index, bit] of PS2_PAD_BUTTONS) {
                const b = gamepad.buttons[index];
                if (!b || !(b.pressed || b.value > 0.05)) continue;
                buttons |= 1 << bit;
                if (!(full & (1 << bit))) pressure[bit] = Math.max(1, Math.round((b.value > 0 ? b.value : 1) * 255));
            }
            if (gamepad.axes.length >= 4) {
                const axis = (v) => Math.max(0, Math.min(255, Math.round((v + 1) * 127.5)));
                if (lx === 128) lx = axis(gamepad.axes[0]);
                if (ly === 128) ly = axis(gamepad.axes[1]);
                rx = axis(gamepad.axes[2]);
                ry = axis(gamepad.axes[3]);
            }
        }
        const state = buttons + lx * 65536 + ly * 16777216 + rx * 4294967296 + ry * 1099511627776;
        if (state !== player.pad) {
            player.pad = state;
            M._ps2web_pad(port, buttons, lx, ly, rx, ry);
        }
        const packed = [0, 1, 2, 3].map((i) => pressure[i * 4] | (pressure[i * 4 + 1] << 8) | (pressure[i * 4 + 2] << 16) | (pressure[i * 4 + 3] << 24));
        if (packed.join() !== player.pressure) {
            player.pressure = packed.join();
            M._ps2web_pressure(port, packed[0], packed[1], packed[2], packed[3]);
        }
        const rumble = M._ps2web_rumble(port), now = performance.now();
        const motorStrength = (v) => v < 16 ? 0 : Math.sqrt(v / 255);
        const strong = motorStrength(rumble >> 8), weak = rumble & 1;
        const actuator = gamepad && gamepad.vibrationActuator;
        if (actuator && (Math.abs(strong - player.strong) > 0.08 || weak !== player.weak || ((strong || weak) && now - player.rumbleAt > 100))) {
            player.strong = strong;
            player.weak = weak;
            player.rumbleAt = now;
            const done = strong || weak
                ? actuator.playEffect("dual-rumble", { duration: 200, weakMagnitude: weak, strongMagnitude: strong })
                : actuator.reset();
            if (done && done.catch) done.catch(() => {});
        }
    }

    /* ------------------------------------------------------------------ *
     * Memory card — IDBFS persistence + EmulatorJS .sav button hookup     *
     * ------------------------------------------------------------------ */

    syncCard() {
        try {
            if (typeof FS !== "undefined") FS.syncfs(false, (err) => {
                if (err) console.warn("memory card: could not write browser storage", err);
            });
        } catch (e) { /* runtime gone */ }
    }

    setupCardButtons() {
        const EJS = this.EJS;
        const CARD_FILE = "/memcard/Mcd001.ps2";
        const CARD_BYTES = 8650752;
        const bar = EJS.elements && EJS.elements.bottomBar;
        if (!bar) return;
        // Save .sav → export the memory card
        if (bar.saveSavFiles && bar.saveSavFiles[0]) {
            bar.saveSavFiles[0].style.display = "";
            bar.saveSavFiles[0].addEventListener("click", () => {
                let data = null;
                try { data = (typeof FS !== "undefined") ? FS.readFile(CARD_FILE) : null; } catch (e) {}
                if (!data) {
                    EJS.displayMessage(EJS.localization("No save data found"), 3000);
                    return;
                }
                const link = document.createElement("a");
                link.href = URL.createObjectURL(new Blob([data], { type: "application/octet-stream" }));
                link.download = (EJS.getBaseFileName() || "Mcd001") + ".ps2";
                link.click();
                setTimeout(() => URL.revokeObjectURL(link.href), 10000);
            });
        }
        // Load .sav → import a memory card
        if (bar.loadSavFiles && bar.loadSavFiles[0]) {
            bar.loadSavFiles[0].style.display = "";
            bar.loadSavFiles[0].addEventListener("click", () => {
                const input = document.createElement("input");
                input.type = "file";
                input.accept = ".ps2";
                input.addEventListener("change", async () => {
                    const file = input.files[0];
                    if (!file) return;
                    if (file.size !== CARD_BYTES) {
                        EJS.displayMessage(EJS.localization("That is not an 8 MB PS2 memory card image"), 3000);
                        return;
                    }
                    const data = new Uint8Array(await file.arrayBuffer());
                    if (new TextDecoder().decode(data.subarray(0, 28)) !== "Sony PS2 Memory Card Format ") {
                        EJS.displayMessage(EJS.localization("That file is not a formatted PS2 memory card"), 3000);
                        return;
                    }
                    try { FS.writeFile(CARD_FILE, data); } catch (e) { return; }
                    this.syncCard();
                    EJS.displayMessage(EJS.localization("Memory card imported — restart the game to use it"), 4000);
                });
                input.click();
            });
        }
    }

    exit() {
        clearInterval(this.pollTimer);
        if (this.resizeObserver) this.resizeObserver.disconnect();
        try { this.syncCard(); } catch (e) {}
        try { if (this.audio) this.audio.close(); } catch (e) {}
        for (const [event, cb] of this.listeners) window.removeEventListener(event, cb);
    }
}

import { LitElement, html, css, unsafeCSS } from "./vendor/lit.js";
import { resolveDataPath, loadEmulator, prepareLanguage, createEmulator } from "./bootstrap.js";

const moduleUrl = import.meta.url;
// When running unbundled from data/src/webcomponent.js, resolve against
// data/ (one level up), the same directory the bundled data/webcomponent.min.js
// would resolve against.
const dataDirUrl = moduleUrl.includes("/src/") ? new URL("../", moduleUrl) : new URL("./", moduleUrl);
const cssUrl = new URL(moduleUrl.includes(".min.js") ? "emulator.min.css" : "emulator.css", dataDirUrl);

let ejsStyles;
try {
    // Preferred: CSS import attribute — resolves to a CSSStyleSheet that
    // Lit adopts as-is via adoptedStyleSheets.
    ejsStyles = (await import(cssUrl.href, { with: { type: "css" } })).default;
} catch {
    // Fallback: the browser has no `with { type: "css" }` support (e.g. Safari).
    // TODO: delete once all supported browsers allow CSS import attributes.
    ejsStyles = unsafeCSS(await fetch(cssUrl).then((r) => r.text()));
}

export class ReadyEvent extends Event {
    constructor() {
        super("emulator-js:ready");
    }
}
export class StartEvent extends Event {
    constructor() {
        super("emulator-js:start");
    }
}
export class ExitEvent extends Event {
    constructor() {
        super("emulator-js:exit");
    }
}
export class LoadStateEvent extends Event {
    constructor() {
        super("emulator-js:load-state");
    }
}
export class SaveStateEvent extends Event {
    constructor({ state, screenshot, format } = {}) {
        super("emulator-js:save-state");
        this.state = state;
        this.screenshot = screenshot;
        this.format = format;
    }
}
export class LoadSaveEvent extends Event {
    constructor() {
        super("emulator-js:load-save");
    }
}
export class SaveSaveEvent extends Event {
    constructor({ save, screenshot, format } = {}) {
        super("emulator-js:save-save");
        this.save = save;
        this.screenshot = screenshot;
        this.format = format;
    }
}
export class SaveUpdateEvent extends Event {
    constructor({ hash, save, screenshot, format } = {}) {
        super("emulator-js:save-update");
        this.hash = hash;
        this.save = save;
        this.screenshot = screenshot;
        this.format = format;
    }
}
export class StartClickedEvent extends Event {
    constructor() {
        super("emulator-js:start-clicked");
    }
}

// Internal EmulatorJS event name -> DOM event factory.
const emulatorEvents = {
    "ready": () => new ReadyEvent(),
    "start": () => new StartEvent(),
    "exit": () => new ExitEvent(),
    "loadState": () => new LoadStateEvent(),
    "saveState": (data) => new SaveStateEvent(data),
    "loadSave": () => new LoadSaveEvent(),
    "saveSave": (data) => new SaveSaveEvent(data),
    "saveUpdate": (data) => new SaveUpdateEvent(data),
    "start-clicked": () => new StartClickedEvent()
};

export class EmulatorJSElement extends LitElement {
    static styles = [
        css`:host { display: block; }`,
        css`.ejs-container { width: 100%; height: 100%; }`,
        ejsStyles
    ];

    // Every config option is a reactive element property named after its
    // config key, with a kebab-case attribute.
    static properties = {
        system: { attribute: "core" },
        dataPath: { attribute: "data-path" },
        gameUrl: { attribute: "game-url" },
        biosUrl: { attribute: "bios-url" },
        gameName: { attribute: "game-name" },
        gameParentUrl: { attribute: "game-parent-url" },
        gamePatchUrl: { attribute: "game-patch-url" },
        loadState: { attribute: "load-state-url" },
        gameId: { attribute: "game-id" },
        language: { attribute: "language" },
        settingsLanguage: { attribute: "settings-language" },
        volume: { attribute: "volume", type: Number },
        cacheLimit: { attribute: "cache-limit", type: Number },
        color: { attribute: "color" },
        backgroundImg: { attribute: "background-img" },
        backgroundColor: { attribute: "background-color" },
        backgroundBlur: { attribute: "background-blur", type: Boolean },
        startBtnName: { attribute: "start-btn-name" },
        alignStartButton: { attribute: "align-start-button" },
        netplayUrl: { attribute: "netplay-url" },
        startOnLoad: { attribute: "start-on-load", type: Boolean },
        fullscreenOnLoad: { attribute: "fullscreen-on-load", type: Boolean },
        threads: { attribute: "threads", type: Boolean },
        debug: { attribute: "debug", type: Boolean },
        adUrl: { attribute: "ad-url" },
        adMode: { attribute: "ad-mode", type: Number },
        adTimer: { attribute: "ad-timer", type: Number },
        adSize: { attribute: "ad-size", type: Array },
        VirtualGamepadSettings: { attribute: "virtual-gamepad-settings", type: Object },
        buttonOpts: { attribute: "button-opts", type: Object },
        defaultControllers: { attribute: "default-controllers", type: Object },
        filePaths: { attribute: "file-paths", type: Object },
        cacheConfig: { attribute: "cache-config", type: Object },
        cheats: { attribute: "cheats", type: Array },
        cheatPath: { attribute: "cheat-path" },
        defaultOptions: { attribute: "default-options", type: Object },
        netplayICEServers: { attribute: "netplay-ice-servers", type: Array },
        controlScheme: { attribute: "control-scheme" },
        disableCue: { attribute: "disable-cue", type: Boolean },
        softLoad: { attribute: "soft-load", type: Number },
        capture: { attribute: "capture", type: Object },
        externalFiles: { attribute: "external-files", type: Array },
        dontExtractRom: { attribute: "dont-extract-rom", type: Boolean },
        dontExtractBIOS: { attribute: "dont-extract-bios", type: Boolean },
        disableLocalStorage: { attribute: "disable-local-storage", type: Boolean },
        forceLegacyCores: { attribute: "force-legacy-cores", type: Boolean },
        noAutoFocus: { attribute: "no-auto-focus", type: Boolean },
        videoRotation: { attribute: "video-rotation", type: Number },
        hideSettings: { attribute: "hide-settings", type: Boolean },
        browserMode: { attribute: "browser-mode", type: Number },
        additionalShaders: { attribute: "additional-shaders", type: Object },
        fixedSaveInterval: { attribute: "fixed-save-interval", type: Number },
        disableAutoUnload: { attribute: "disable-auto-unload", type: Boolean },
        disableBatchBootup: { attribute: "disable-batch-bootup", type: Boolean },
        askBeforeExit: { attribute: "ask-before-exit", type: Boolean },
        retroarchOpts: { attribute: "retroarch-opts", type: Object },
        coreOpts: { attribute: "core-opts", type: Object }
    };

    #startPromise = null;
    #startToken = null;

    constructor() {
        super();
        this.emulator = null;
    }

    render() {
        return html`<div class="ejs-container"></div>`;
    }

    willUpdate(changed) {
        // Attribute/property changes apply before the first start; after
        // start use reload(). changed only contains reactive properties.
        if (!this.emulator || this.emulator.started) return;
        for (const prop of changed.keys()) {
            if (prop === "dataPath") continue;
            this.emulator.config[prop] = this[prop];
        }
    }

    connectedCallback() {
        super.connectedCallback();
        if (!this.#startPromise) {
            this.#startPromise = this.#start();
        }
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.#startToken = null;
        this.#startPromise = null;
        if (this.emulator) {
            this.emulator.destroy();
            this.emulator = null;
        }
    }

    buildConfig() {
        const callerScriptUrl = new URL("webcomponent.min.js", dataDirUrl).href;
        const config = {
            dataPath: resolveDataPath(callerScriptUrl, typeof this.dataPath === "string" ? this.dataPath : undefined),
            system: this.system,
            gameUrl: this.gameUrl,
            biosUrl: this.biosUrl,
            gameName: this.gameName,
            gameParentUrl: this.gameParentUrl,
            gamePatchUrl: this.gamePatchUrl,
            loadState: this.loadState,
            gameId: this.gameId,
            language: this.language,
            settingsLanguage: this.settingsLanguage,
            volume: this.volume,
            cacheLimit: this.cacheLimit,
            color: this.color,
            backgroundImg: this.backgroundImg,
            backgroundColor: this.backgroundColor,
            backgroundBlur: this.backgroundBlur,
            startBtnName: this.startBtnName,
            alignStartButton: this.alignStartButton,
            netplayUrl: this.netplayUrl,
            startOnLoad: this.startOnLoad,
            fullscreenOnLoad: this.fullscreenOnLoad,
            threads: this.threads,
            debug: this.debug,
            adUrl: this.adUrl,
            adMode: this.adMode,
            adTimer: this.adTimer,
            adSize: this.adSize,
            VirtualGamepadSettings: this.VirtualGamepadSettings,
            buttonOpts: this.buttonOpts,
            defaultControllers: this.defaultControllers,
            filePaths: this.filePaths,
            cacheConfig: this.cacheConfig,
            cheats: this.cheats,
            cheatPath: this.cheatPath,
            defaultOptions: this.defaultOptions,
            netplayICEServers: this.netplayICEServers,
            controlScheme: this.controlScheme,
            disableCue: this.disableCue,
            softLoad: this.softLoad,
            capture: this.capture,
            externalFiles: this.externalFiles,
            dontExtractRom: this.dontExtractRom,
            dontExtractBIOS: this.dontExtractBIOS,
            disableLocalStorage: this.disableLocalStorage,
            forceLegacyCores: this.forceLegacyCores,
            noAutoFocus: this.noAutoFocus,
            videoRotation: this.videoRotation,
            hideSettings: this.hideSettings,
            browserMode: this.browserMode,
            additionalShaders: this.additionalShaders,
            fixedSaveInterval: this.fixedSaveInterval,
            disableAutoUnload: this.disableAutoUnload,
            disableBatchBootup: this.disableBatchBootup,
            askBeforeExit: this.askBeforeExit,
            retroarchOpts: this.retroarchOpts,
            coreOpts: this.coreOpts
        };
        for (const key of Object.keys(config)) {
            if (config[key] === undefined) delete config[key];
        }
        return config;
    }

    // Destroy the current instance (if any) and re-create it on the same
    // container. Set element properties first to change the config.
    async reload() {
        if (this.emulator) {
            this.emulator.destroy();
            this.emulator = null;
        }
        this.#startToken = null;
        this.#startPromise = this.#start();
        return this.#startPromise;
    }

    async #start() {
        const token = this.#startToken = {};
        await this.updateComplete;
        if (token !== this.#startToken || !this.isConnected) return;
        const container = this.renderRoot.querySelector(".ejs-container");
        if (!container) return;
        const config = this.buildConfig();
        try {
            await loadEmulator(config.dataPath, { debug: config.debug === true, css: "none" });
            await prepareLanguage(config);
            if (token !== this.#startToken || !this.isConnected) return;
            const handlers = Object.fromEntries(Object.entries(emulatorEvents).map(([event, handler]) => [event, (data) => this.dispatchEvent(handler(data))]));
            this.emulator = createEmulator(container, config, handlers);
        } catch (e) {
            console.error("emulator-js: failed to start", e);
        }
    }
}

if (!customElements.get("emulator-js")) {
    customElements.define("emulator-js", EmulatorJSElement);
}

export default EmulatorJSElement;

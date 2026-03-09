const folderPath = (path) => {
    const filename = path.split("/").pop();
    return path.substring(0, path.length - filename.length);
};
function isAbsoluteUrl(path) {
    return /^[a-zA-Z][\w.+-]*:\/\//i.test(path);
}

let scriptPath = (typeof window.EJS_pathtodata === "string") ? window.EJS_pathtodata : folderPath((new URL(document.currentScript.src)).pathname);
if (!scriptPath.endsWith("/")) {
    scriptPath += "/";
}
if (!scriptPath.startsWith("/") && !isAbsoluteUrl(scriptPath)) {
    scriptPath = "../" + scriptPath;
}

const debug = window.EJS_DEBUG_XX === true;

if (debug) {
    console.log("Script Path:", scriptPath);
}

function resolvePath(path) {
    if ("undefined" != typeof EJS_paths && typeof EJS_paths[path] === "string") {
        return EJS_paths[path];
    } else if (path.endsWith("emulator.min.js") || path.endsWith("css")) {
        return scriptPath + path;
    } else {
        return scriptPath + "src/" + path;
    }
}

async function loadScript(file) {
    try {
        const script = resolvePath(file);
        const module = await import(script);
        return module.default;
    } catch(e) {
        if (debug) console.error(e);
        const module = await filesMissing(file);
        return module.default;
    }
}

function loadStyle(file) {
    return new Promise(function(resolve) {
        let css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = resolvePath(file);
        css.onload = resolve;
        css.onerror = () => {
            filesMissing(file).then(e => resolve());
        }
        document.head.appendChild(css);
    })
}
async function filesMissing(file) {
    console.error("Failed to load " + file);
    let minifiedFailed = file.includes("min");
    const errorMessage = `Failed to load ${file} because it's likely that the minified files are missing.
To fix this you have 3 options:
  1. You can download the zip from the latest release here: https://github.com/EmulatorJS/EmulatorJS/releases/latest - Recommended
  2. You can download the zip from here: https://cdn.emulatorjs.org/stable/data/emulator.min.zip and extract it to the data/ folder
  3. You can build the files by running "npm i && npm run build" in the data/minify folder.`;
    console[minifiedFailed ? "warn" : "error"](errorMessage);
    if (minifiedFailed) {
        console.log("Attempting to load non-minified files");
        if (file === "emulator.min.js") {
            return await loadScript("emulator.js");
        } else {
            await loadStyle("emulator.css");
        }
    }
}

function getLanguagePath(language) {
    if ("undefined" != typeof EJS_paths && typeof EJS_paths[language] === "string") {
        return { path: EJS_paths[language], fallback: null };
    }

    const base = scriptPath + "localization/" + language + ".json";
    let fallback = null;

    if (language.includes("-") || language.includes("_")) {
        fallback = scriptPath + "localization/" + language.split(/[-_]/)[0] + ".json";
    }

    return { path: base, fallback };
}

async function fetchJson(path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (e) {
        console.warn("Failed to fetch language file:", path, e.message);
        return null;
    }
}

function mergeLanguages(baseJson, overrideJson) {
    if (!baseJson || !overrideJson) return baseJson || overrideJson || {};
    return { ...baseJson, ...overrideJson };
}

async function loadLanguage(config) {
    const defaultLangs = ["en", "en-US"];

    if (!config.language || defaultLangs.includes(config.language)) return config;

    console.log("Language:", config.language);

    let langData = {};
    const paths = getLanguagePath(config.language);

    try {
        const specificJson = await fetchJson(paths.path);
        
        if (paths.fallback) {
            const fallbackJson = await fetchJson(paths.fallback);
            langData = mergeLanguages(fallbackJson, specificJson || {});
        } else {
            langData = specificJson || {};
        }

        config.langJson = langData;
        
    } catch (e) {
        if (paths.fallback) {
            const fallbackLang = config.language.split(/[-_]/)[0];
            console.warn(`Language '${config.language}' not found, trying '${fallbackLang}'`);
            
            const fallbackJson = await fetchJson(paths.fallback);
            if (fallbackJson) {
                langData = fallbackJson;
                config.langJson = langData;
                config.language = fallbackLang;
            }
        } else {
            console.warn(`No language file found for '${config.language}'`);
            delete config.language;
            delete config.langJson;
        }
    }

    return config;
}

const config = {
    debug: debug,
    gameUrl: window.EJS_gameUrl,
    dataPath: scriptPath,
    system: window.EJS_core,
    biosUrl: window.EJS_biosUrl,
    gameName: window.EJS_gameName,
    color: window.EJS_color,
    adUrl: window.EJS_AdUrl,
    adMode: window.EJS_AdMode,
    adTimer: window.EJS_AdTimer,
    adSize: window.EJS_AdSize,
    alignStartButton: window.EJS_alignStartButton,
    VirtualGamepadSettings: window.EJS_VirtualGamepadSettings,
    buttonOpts: window.EJS_Buttons,
    volume: window.EJS_volume,
    defaultControllers: window.EJS_defaultControls,
    startOnLoad: window.EJS_startOnLoaded,
    fullscreenOnLoad: window.EJS_fullscreenOnLoaded,
    filePaths: window.EJS_paths,
    loadState: window.EJS_loadStateURL,
    cacheLimit: window.EJS_CacheLimit,
    cacheConfig: window.EJS_cacheConfig,
    cheats: window.EJS_cheats,
    cheatPath: window.EJS_cheatPath,
    defaultOptions: window.EJS_defaultOptions,
    gamePatchUrl: window.EJS_gamePatchUrl,
    gameParentUrl: window.EJS_gameParentUrl,
    netplayUrl: window.EJS_netplayServer,
    netplayICEServers: window.EJS_netplayICEServers,
    gameId: window.EJS_gameID,
    backgroundImg: window.EJS_backgroundImage,
    backgroundBlur: window.EJS_backgroundBlur,
    backgroundColor: window.EJS_backgroundColor,
    controlScheme: window.EJS_controlScheme,
    threads: window.EJS_threads,
    disableCue: window.EJS_disableCue,
    startBtnName: window.EJS_startButtonName,
    softLoad: window.EJS_softLoad,
    capture: window.EJS_screenCapture,
    externalFiles: window.EJS_externalFiles,
    dontExtractRom: window.EJS_dontExtractRom,
    dontExtractBIOS: window.EJS_dontExtractBIOS,
    disableLocalStorage: window.EJS_disableLocalStorage,
    forceLegacyCores: window.EJS_forceLegacyCores,
    noAutoFocus: window.EJS_noAutoFocus,
    videoRotation: window.EJS_videoRotation,
    hideSettings: window.EJS_hideSettings,
    browserMode: window.EJS_browserMode,
    additionalShaders: window.EJS_shaders,
    fixedSaveInterval: window.EJS_fixedSaveInterval,
    disableAutoUnload: window.EJS_disableAutoUnload,
    disableBatchBootup: window.EJS_disableBatchBootup
};

async function prepareLanguage() {
    try {
        const systemLang = Intl.DateTimeFormat().resolvedOptions().locale;
        config.language = window.EJS_language || systemLang;
        
        if (config.language && window.EJS_disableAutoLang !== false) {
            return await loadLanguage(config);
        }
    } catch (e) {
        console.warn("Language detection failed:", e.message);
        delete config.language;
        delete config.langJson;
    }
}

(async function() {
    let EmulatorJS;
    if (debug) {
        EmulatorJS = await loadScript("emulator.js");
        await loadStyle("emulator.css");
    } else {
        EmulatorJS = await loadScript("emulator.min.js");
        await loadStyle("emulator.min.css");
    }

    if (!EmulatorJS) {
        console.error("EmulatorJS failed to load. Check for missing files.");
        return;
    }

    await prepareLanguage();

    if (debug) {
        console.log("Language:", config.language);
        console.log("Language JSON loaded:", !!config.langJson);
    }

    window.EJS_emulator = new EmulatorJS(EJS_player, config);
    window.EJS_adBlocked = (url, del) => window.EJS_emulator.adBlocked(url, del);

    const handlers = [
        ["ready", window.EJS_ready],
        ["start", window.EJS_onGameStart],
        ["loadState", window.EJS_onLoadState],
        ["saveState", window.EJS_onSaveState],
        ["loadSave", window.EJS_onLoadSave],
        ["saveSave", window.EJS_onSaveSave]
    ];

    handlers.forEach(([event, callback]) => {
        if (typeof callback === "function") {
            window.EJS_emulator.on(event, callback);
        }
    });

    if (typeof window.EJS_onSaveUpdate === "function") {
        window.EJS_emulator.on("saveUpdate", window.EJS_onSaveUpdate);
        window.EJS_emulator.enableSaveUpdateEvent();
    }
})();

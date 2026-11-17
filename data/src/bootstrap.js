const folderPath = (path) => {
    const filename = path.split("/").pop();
    return path.substring(0, path.length - filename.length);
};

export function resolveDataPath(callerScriptUrl, explicitPath) {
    let dataPath = (typeof explicitPath === "string") ? explicitPath : folderPath(new URL(callerScriptUrl, document.baseURI).href);
    if (!dataPath.endsWith("/")) {
        dataPath += "/";
    }
    return dataPath;
}

function resolvePath(dataPath, path, filePaths) {
    let resolved;
    if (filePaths && typeof filePaths[path] === "string") {
        resolved = filePaths[path];
    } else if (path.endsWith("emulator.min.js") || path.endsWith("css")) {
        resolved = dataPath + path;
    } else {
        resolved = dataPath + "src/" + path;
    }
    return new URL(resolved, document.baseURI).href;
}

async function loadScript(dataPath, file, debug, filePaths) {
    try {
        const script = resolvePath(dataPath, file, filePaths);
        const module = await import(script);
        return module.default;
    } catch(e) {
        if (debug) console.error(e);
        const module = await filesMissing(dataPath, file, debug, filePaths);
        return module;
    }
}

function loadStyle(dataPath, file, filePaths) {
    return new Promise(function(resolve) {
        let css = document.createElement("link");
        css.rel = "stylesheet";
        css.href = resolvePath(dataPath, file, filePaths);
        css.onload = resolve;
        css.onerror = () => {
            filesMissing(dataPath, file, filePaths).then(e => resolve());
        }
        document.head.appendChild(css);
    })
}
async function filesMissing(dataPath, file, debug, filePaths) {
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
            return await loadScript(dataPath, "emulator.js", debug, filePaths);
        } else {
            await loadStyle(dataPath, "emulator.css", filePaths);
        }
    }
}

let EmulatorJSClass = null;

export async function loadEmulator(dataPath, { debug = false, css = "link", filePaths } = {}) {
    EmulatorJSClass = await loadScript(dataPath, debug ? "emulator.js" : "emulator.min.js", debug, filePaths);
    if (css === "link") {
        await loadStyle(dataPath, debug ? "emulator.css" : "emulator.min.css", filePaths);
    }
    return EmulatorJSClass;
}

function getLanguagePath(dataPath, language, filePaths) {
    if (filePaths && typeof filePaths[language] === "string") {
        return { path: filePaths[language], fallback: null };
    }

    const base = dataPath + "localization/" + language + ".json";
    let fallback = null;

    if (language.includes("-") || language.includes("_")) {
        fallback = dataPath + "localization/" + language.split(/[-_]/)[0] + ".json";
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

async function loadLanguage(dataPath, config) {
    const defaultLangs = ["en", "en-US"];

    if (!config.language || defaultLangs.includes(config.language)) return config;

    console.log("Language:", config.language);

    let langData = {};
    const paths = getLanguagePath(dataPath, config.language, config.filePaths);

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

export async function prepareLanguage(config) {
    try {
        const systemLang = Intl.DateTimeFormat().resolvedOptions().locale;
        config.language = config.language || systemLang;

        if (config.language && config.disableAutoLang !== false) {
            return await loadLanguage(config.dataPath, config);
        }
    } catch (e) {
        console.warn("Language detection failed:", e.message);
        delete config.language;
        delete config.langJson;
    }
    return config;
}

export function createEmulator(element, config, handlers) {
    if (!EmulatorJSClass) {
        throw new Error("loadEmulator() must be called before createEmulator()");
    }
    const emulator = new EmulatorJSClass(element, config);
    const events = handlers || {};
    for (const event in events) {
        if (typeof events[event] === "function") {
            emulator.on(event, events[event]);
            if (event === "saveUpdate") {
                emulator.enableSaveUpdateEvent();
            }
        }
    }
    return emulator;
}

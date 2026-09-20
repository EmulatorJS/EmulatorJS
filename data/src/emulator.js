import { EJS_Cache, EJS_CacheItem, EJS_FileItem, EJS_Download } from "./cache.js";
import { EJS_COMPRESSION } from "./compression.js";
import { EJS_GameManager } from "./GameManager.js";
import { GamepadHandler } from "./gamepad.js";
import { EJS_STORAGE, EJS_DUMMYSTORAGE } from "./storage.js";
import { cyrb53 } from "./utils.js";
import { EJS_SETUP } from "./setup.js";
import { Netplay } from "./netplay.js";
import { EJS_Frontend } from "./frontend.js";
import * as CONSTS from "./consts.js";

import "./vendor/socket.io.min.js";

class EmulatorJS {
    getCores() {
        let rv = CONSTS.cores;
        if (this.isSafari && this.isMobile) {
            rv.n64 = rv.n64.reverse();
        }
        return rv;
    }
    requiresThreads(core) {
        return CONSTS.requiresThreads.includes(core);
    }
    requiresWebGL2(core) {
        return CONSTS.requiresWebGL2.includes(core);
    }
    getCore(generic) {
        const cores = this.getCores();
        const core = this.config.system;
        if (generic) {
            for (const k in cores) {
                if (cores[k].includes(core)) {
                    return k;
                }
            }
            return core;
        }
        const gen = this.getCore(true);
        if (cores[gen] && cores[gen].includes(this.preGetSetting("retroarch_core"))) {
            return this.preGetSetting("retroarch_core");
        }
        if (cores[core]) {
            return cores[core][0];
        }
        return core;
    }
    createElement(type) {
        return document.createElement(type);
    }
    addEventListener(element, listener, callback) {
        const listeners = listener.split(" ");
        let rv = [];
        for (let i = 0; i < listeners.length; i++) {
            element.addEventListener(listeners[i], callback);
            const data = { cb: callback, elem: element, listener: listeners[i] };
            rv.push(data);
        }
        return rv;
    }
    removeEventListener(data) {
        for (let i = 0; i < data.length; i++) {
            data[i].elem.removeEventListener(data[i].listener, data[i].cb);
        }
    }
    /**
     * Downloads a file from the specified path.
     * Helper method that delegates to EJS_Download system for all URL-based downloads.
     * Handles direct data objects (ArrayBuffer, Uint8Array, Blob) and constructs proper paths.
     * @param {*} path The path to the file to download.
     * @param {*} type The expected type of the file.
     * @param {*} progress A callback function for progress updates.
     * @param {*} notWithPath Whether to exclude the base path.
     * @param {*} opts Additional options for the download.
     * @param {boolean} forceExtract Whether to force extraction of compressed files regardless of extension (default is false).
     * @param {boolean} dontCache If true, the downloaded file will not be cached (default is false).
     * @param {boolean} dontExtract If true, the downloaded file will not be extracted, but will still be cached (default is false, overridden by forceExtract).
     * @returns A promise that resolves with the downloaded file data.
     */
    downloadFile(path, type, progress, notWithPath, opts, forceExtract = false, dontCache = false, dontExtract = false) {
        if (this.debug) console.log("[EJS " + type + "] Downloading " + path);
        return new Promise(async (resolve) => {
            // Handle direct data objects (ArrayBuffer, Uint8Array, Blob)
            const data = this.toData(path);
            if (data) {
                data.then((game) => {
                    if (opts.method === "HEAD") {
                        resolve({ headers: {} });
                    } else {
                        resolve({ headers: {}, data: game });
                    }
                });
                return;
            }

            // Construct the full path/URL
            const basePath = notWithPath ? "" : this.config.dataPath;
            let fullPath = basePath + path;
            if (!notWithPath && this.config.filePaths && typeof this.config.filePaths[path.split("/").pop()] === "string") {
                fullPath = this.config.filePaths[path.split("/").pop()];
            }

            const attempt = async (targetUrl) => {
                try {
                    const onProgress = progress instanceof Function ? (status, percentage, loaded, total) => {
                        if (status === "downloading" || status === "decompressing") {
                            let progressText = "";
                            if (total || percentage) {
                                progressText = " " + Math.floor(percentage).toString() + "%";
                            } else if (loaded) {
                                progressText = " " + (loaded / 1048576).toFixed(2) + "MB";
                            }
                            progress(progressText, status);
                        }
                    } : null;

                    const onComplete = (success, result) => {
                        if (!success) {
                            console.error("Download failed in onComplete:", result);
                        }
                    };

                    const responseType = opts.responseType || "arraybuffer";
                    const method = opts.method || "GET";
                    const headers = {};
                    const timeout = 30000;

                    const cacheItem = await this.downloader.downloadFile(
                        targetUrl,
                        type,
                        method,
                        headers,
                        null,
                        onProgress,
                        onComplete,
                        timeout,
                        responseType,
                        forceExtract,
                        dontCache,
                        dontExtract
                    );

                    if (!cacheItem) {
                        return { headers: {} };
                    }

                    if (cacheItem.files && cacheItem.files.length > 0) {
                        return {
                            data: cacheItem,
                            headers: {
                                "content-length": cacheItem.files.reduce((sum, f) => sum + (f.bytes.byteLength || 0), 0)
                            }
                        };
                    }

                    console.error("Invalid cache item returned:", cacheItem);
                    return -1;
                } catch(error) {
                    console.error("Download error:", error);
                    return -1;
                }
            };

            let result = await attempt(fullPath);

            const typeConfig = Object.values(this.downloadType).find((t) => t.name === type);
            if (result === -1 && !notWithPath && typeConfig && typeConfig.cdnFallback) {
                console.log("[EJS " + type + "] " + path + " not found locally, attempting to fetch from the emulatorjs cdn.");
                console.error("**THIS METHOD IS A FAILSAFE, AND NOT OFFICIALLY SUPPORTED. USE AT YOUR OWN RISK**");
                const version = this.ejs_version.endsWith("-beta") ? "nightly" : this.ejs_version;
                result = await attempt(`https://cdn.emulatorjs.org/${version}/data/${path}`);
                if (result !== -1) {
                    console.warn("File was not found locally, but was found on the emulatorjs cdn.\nIt is recommended to download the stable release from here: https://cdn.emulatorjs.org/releases/");
                }
            }

            resolve(result);
        });
    }
    toData(data, rv) {
        if (!(data instanceof ArrayBuffer) && !(data instanceof Uint8Array) && !(data instanceof Blob)) return null;
        if (rv) return true;
        return new Promise(async (resolve) => {
            if (data instanceof ArrayBuffer) {
                resolve(new Uint8Array(data));
            } else if (data instanceof Uint8Array) {
                resolve(data);
            } else if (data instanceof Blob) {
                resolve(new Uint8Array(await data.arrayBuffer()));
            }
            resolve();
        })
    }
    checkForUpdates() {
        if (this.ejs_version.endsWith("-beta")) {
            console.warn("Using EmulatorJS beta. Not checking for updates. This instance may be out of date. Using stable is highly recommended unless you build and ship your own cores.");
            return;
        }
        fetch("https://cdn.emulatorjs.org/stable/data/version.json").then(response => {
            if (response.ok) {
                response.text().then(body => {
                    let version = JSON.parse(body);
                    if (this.versionAsInt(this.ejs_version) < this.versionAsInt(version.version)) {
                        console.log(`Using EmulatorJS version ${this.ejs_version} but the newest version is ${version.current_version}\nopen https://github.com/EmulatorJS/EmulatorJS to update`);
                    }
                })
            }
        })
    }
    versionAsInt(ver) {
        if (ver.endsWith("-beta")) {
            return 99999999;
        }
        if (ver.endsWith("-pre")) {
            ver = ver.substring(0, ver.length - 4);
        }
        let rv = ver.split(".");
        if (rv[rv.length - 1].length === 1) {
            rv[rv.length - 1] = "0" + rv[rv.length - 1];
        }
        return parseInt(rv.join(""));
    }
    constructor(element, config) {
        this.ejs_version = CONSTS.version;
        this.extensions = [];
        this.allSettings = {};
        this.initControlVars();
        this.debug = config.debug;
        if (this.debug || (window.location && ["localhost", "127.0.0.1"].includes(location.hostname))) {
            this.checkForUpdates();
        }
        this.netplayEnabled = true;
        this.config = config;

        this.setup = new EJS_SETUP(this);
        this.setup.checkDeprecatedSettings();
        this.setup.cacheDefaults();
        this.setup.browserMode();
        this.setup.shaders();
        
        this.config.buttonOpts = this.buildButtonOptions(this.config.buttonOpts);
        this.config.settingsLanguage = window.EJS_settingsLanguage || false;

        this.isFastForward = false;
        this.isSlowMotion = false;
        this.failedToStart = false;
        this.rewindEnabled = this.preGetSetting("rewindEnabled") === "enabled";
        this.touch = false;
        this.cheats = [];
        this.started = false;
        this.volume = (typeof this.config.volume === "number") ? this.config.volume : 0.5;
        if (this.config.defaultControllers) {
            // Merge user config with defaults instead of replacing
            for (const [player, buttons] of Object.entries(this.config.defaultControllers)) {
                this.defaultControllers[player] = this.defaultControllers[player] || {};

                for (const [button, config] of Object.entries(buttons)) {
                    this.defaultControllers[player][button] = {
                        ...(this.defaultControllers[player][button] || {}),
                        ...config
                    };
                }
            }
        }
        this.defaultAutoFireInterval = 100;
        this.autofireIntervals = {};
        this.muted = false;
        this.paused = true;
        this.frontend = new EJS_Frontend(this, element);
        this.frontend.setColor(this.config.color || "");
        this.config.alignStartButton = (typeof this.config.alignStartButton === "string") ? this.config.alignStartButton : "bottom";
        this.config.backgroundColor = (typeof this.config.backgroundColor === "string") ? this.config.backgroundColor : "rgb(51, 51, 51)";
        if (this.config.adUrl) {
            this.config.adSize = (Array.isArray(this.config.adSize)) ? this.config.adSize : ["300px", "250px"];
            this.frontend.setupAds(this.config.adUrl, this.config.adSize[0], this.config.adSize[1]);
        }
        this.isMobile = (() => {
            // browserMode can be either a 1 (force mobile), 2 (force desktop) or undefined (auto detect)
            switch (this.config.browserMode) {
                case 1:
                    return true;
                case 2:
                    return false;
            }

            let check = false;
            (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
            return check;
        })();
        this.hasTouchScreen = (function() {
            if (window.PointerEvent && ("maxTouchPoints" in navigator)) {
                if (navigator.maxTouchPoints > 0) {
                    return true;
                }
            } else {
                if (window.matchMedia && window.matchMedia("(any-pointer:coarse)").matches) {
                    return true;
                } else if (window.TouchEvent || ("ontouchstart" in window)) {
                    return true;
                }
            }
            return false;
        })();
        this.videoRotation = ([0, 1, 2, 3].includes(this.config.videoRotation)) ? this.config.videoRotation : this.preGetSetting("videoRotation") || 0;
        this.videoRotationChanged = false;
        this.capture = this.capture || {};
        this.capture.photo = this.capture.photo || {};
        this.capture.photo.source = ["canvas", "retroarch"].includes(this.capture.photo.source) ? this.capture.photo.source : "canvas";
        this.capture.photo.format = (typeof this.capture.photo.format === "string") ? this.capture.photo.format : "png";
        this.capture.photo.upscale = (typeof this.capture.photo.upscale === "number") ? this.capture.photo.upscale : 1;
        this.capture.video = this.capture.video || {};
        this.capture.video.format = (typeof this.capture.video.format === "string") ? this.capture.video.format : "detect";
        this.capture.video.upscale = (typeof this.capture.video.upscale === "number") ? this.capture.video.upscale : 1;
        this.capture.video.fps = (typeof this.capture.video.fps === "number") ? this.capture.video.fps : 30;
        this.capture.video.videoBitrate = (typeof this.capture.video.videoBitrate === "number") ? this.capture.video.videoBitrate : 2.5 * 1024 * 1024;
        this.capture.video.audioBitrate = (typeof this.capture.video.audioBitrate === "number") ? this.capture.video.audioBitrate : 192 * 1024;
        this.bindListeners();
        if (this.netplayEnabled) {
            this.netplay = new Netplay(this);
        }

        if (this.isMobile || this.hasTouchScreen) {
            this.frontend.setTouchActive();
        }

        this.fullscreen = false;
        this.enableMouseLock = false;
        this.supportsWebgl2 = !!document.createElement("canvas").getContext("webgl2") && (this.config.forceLegacyCores !== true);
        this.webgl2Enabled = (() => {
            let setting = this.preGetSetting("webgl2Enabled");
            if (setting === "disabled" || !this.supportsWebgl2) {
                return false;
            } else if (setting === "enabled") {
                return true;
            }
            return null;
        })();
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        this.storage = {}
    
        if (this.config.disableDatabases === true) {
            this.config.cacheConfig.enabled = false;
        }
        
        // Populate downloadTypes
        this.downloadType = {
            "rom": { "name": "ROM", "dontCache": false, "dontExtractIfCore": ["arcade", "fbneo", "fbalpha2012_cps1", "fbalpha2012_cps2", "same_cdi", "mame", "mame2003_plus", "mame2003"] },
            "core": { "name": "Core", "dontCache": false, "cdnFallback": true },
            "bios": { "name": "BIOS", "dontCache": false, "dontExtractIfCore": ["arcade", "fbneo", "fbalpha2012_cps1", "fbalpha2012_cps2", "same_cdi", "mame", "mame2003_plus", "mame2003"] },
            "parent": { "name": "Parent", "dontCache": false },
            "patch": { "name": "Patch", "dontCache": false },
            "reports": { "name": "Reports", "dontCache": true },
            "states": { "name": "States", "dontCache": true },
            "support": { "name": "Support", "dontCache": true },
            "unknown": { "name": "Unknown", "dontCache": true }
        }

        // Initialize storage cache
        this.storageCache = new EJS_Cache(
            this.config.cacheConfig.enabled,
            "EmulatorJS-Cache",
            this.config.cacheConfig.cacheMaxSizeMB,
            this.config.cacheConfig.cacheMaxAgeMins || 7200,
            this.debug
        );

        // Initialize downloader with cache
        this.downloader = new EJS_Download(this.storageCache, this);
        
        // This is not cache. This is save data
        this.storage.states = new EJS_STORAGE("EmulatorJS-states", "states");

        this.frontend.setBackground();

        if (Array.isArray(this.config.cheats)) {
            for (let i = 0; i < this.config.cheats.length; i++) {
                const cheat = this.config.cheats[i];
                if (Array.isArray(cheat) && cheat[0] && cheat[1]) {
                    this.cheats.push({
                        desc: cheat[0],
                        checked: false,
                        code: cheat[1],
                        is_permanent: true
                    })
                }
            }
        }

        this.frontend.createStartButton();
        this.frontend.handleResize();

        if (this.config.fixedSaveInterval) {
            this.startSaveInterval(this.config.fixedSaveInterval);
        }
    }

    togglePlaying(dontUpdate) {
        this.paused = !this.paused;
        if (!dontUpdate) {
            this.frontend.updatePlayPauseButtons(this.paused);
        }
        this.gameManager.toggleMainLoop(this.paused ? 0 : 1);

        //I now realize its not easy to pause it while the cursor is locked, just in case I guess
        if (this.enableMouseLock) {
            this.frontend.exitPointerLock();
        }
    }
    play(dontUpdate) {
        if (this.paused) this.togglePlaying(dontUpdate);
    }
    pause(dontUpdate) {
        if (!this.paused) this.togglePlaying(dontUpdate);
    }
    setVolume(volume) {
        this.saveSettings();
        this.muted = (volume === 0);
        this.frontend.updateVolumeSliderState(volume);

        const skipLocalAudio = this.isNetplay && this.netplay && this.netplay.setVolume(volume);

        if (!skipLocalAudio && this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.sources) {
            this.Module.AL.currentCtx.sources.forEach(e => {
                e.gain.gain.value = volume;
            })
        }
    }
    toggleFullscreen(fullscreen) {
        if (fullscreen) {
            this.frontend.requestFullscreen();
            if (this.isMobile) {
                try {
                    screen.orientation.lock(this.getCore(true) === "nds" ? "portrait" : "landscape").catch(e => {});
                } catch(e) {}
            }
        } else {
            this.frontend.exitFullscreen();
            if (this.isMobile) {
                try {
                    screen.orientation.unlock();
                } catch(e) {}
            }
        }
    }
    startSaveInterval(period) {
        if (this.saveSaveInterval) {
            clearInterval(this.saveSaveInterval);
            this.saveSaveInterval = null;
        }
        // Disabled
        if (period === 0 || isNaN(period)) return;
        if (this.started) this.gameManager.saveSaveFiles();
        if (this.debug) console.log("Saving every", period, "miliseconds");
        this.saveSaveInterval = setInterval(() => {
            if (this.started) this.gameManager.saveSaveFiles();
        }, period);
    }

    on(event, func) {
        if (!this.functions) this.functions = {};
        if (!Array.isArray(this.functions[event])) this.functions[event] = [];
        this.functions[event].push(func);
    }
    callEvent(event, data) {
        if (!this.functions) this.functions = {};
        if (!Array.isArray(this.functions[event])) return 0;
        this.functions[event].forEach(e => e(data));
        return this.functions[event].length;
    }
    checkCoreCompatibility(version) {
        if (this.versionAsInt(version.minimumEJSVersion) > this.versionAsInt(this.ejs_version)) {
            this.startGameError("Outdated EmulatorJS version");
            throw new Error("Core requires minimum EmulatorJS version of " + version.minimumEJSVersion);
        }
    }
    startGameError(message, suffix) {
        console.log(message);
        this.frontend.showError(message, suffix);
        this.loadSettings();
        this.frontend.failedToStart();
        this.failedToStart = true;
    }
    downloadGameCore() {
        this.frontend.setLoadingText("Download Game Core");
        if (!this.config.threads && this.requiresThreads(this.getCore())) {
            this.startGameError(["Error for site owner", "Check console"]);
            console.warn("This core requires threads, but EJS_threads is not set!");
            return;
        }
        if (!this.supportsWebgl2 && this.requiresWebGL2(this.getCore())) {
            this.startGameError("Outdated graphics driver");
            return;
        }
        if (this.config.threads && typeof window.SharedArrayBuffer !== "function") {
            this.startGameError(["Error for site owner", "Check console"]);
            console.warn("Threads is set to true, but the SharedArrayBuffer function is not exposed. Threads requires 2 headers to be set when sending you html page. See https://stackoverflow.com/a/68630724");
            return;
        }
        const gotCore = (data) => {
            this.defaultCoreOpts = {};
            
            let decompressedData = {};
            
            // Check if data is already a cache item with extracted files
            if (data && data.files && Array.isArray(data.files)) {
                console.log("[EJS Core] Data is already decompressed cache item");
                // Convert cache item files array to object keyed by filename
                for (const file of data.files) {
                    decompressedData[file.filename] = file.bytes;
                }
                this.processCore(decompressedData);
            } else {
                // Data is still compressed, need to decompress
                console.log("[EJS Core] Data needs decompression");
                if (!this.compression) {
                    this.compression = new EJS_COMPRESSION(this);
                }
                
                this.frontend.setLoadingText("Decompress Game Core");
                
                this.compression.decompress(new Uint8Array(data), (m, appendMsg) => {
                    this.frontend.setLoadingText(appendMsg ? "Decompress Game Core" : null, m);
                }, null).then(async (decompressedData) => {
                    this.processCore(decompressedData);
                });
            }
        }
        
        this.processCore = (decompressedData) => {
            if (this.debug) console.log("[EJS Core] Decompressed files:", Object.keys(decompressedData));
            let js, thread, wasm;
            for (let k in decompressedData) {
                if (k.endsWith(".wasm")) {
                    wasm = decompressedData[k];
                } else if (k.endsWith(".worker.js")) {
                    thread = decompressedData[k];
                } else if (k.endsWith(".js")) {
                    js = decompressedData[k];
                } else if (k === "build.json") {
                    this.checkCoreCompatibility(JSON.parse(new TextDecoder().decode(decompressedData[k])));
                } else if (k === "core.json") {
                    let core = JSON.parse(new TextDecoder().decode(decompressedData[k]));
                    this.extensions = core.extensions;
                    this.coreName = core.name;
                    this.repository = core.repo;
                    this.defaultCoreOpts = core.options;
                    this.enableMouseLock = core.options.supportsMouse;
                    this.retroarchOpts = core.retroarchOpts;
                    this.saveFileExt = core.save;
                } else if (k === "license.txt") {
                    this.license = new TextDecoder().decode(decompressedData[k]);
                }
            }

            if (this.saveFileExt === false) {
                this.frontend.hideSaveFileButtons();
            }

            if (this.debug) console.log("[EJS Core] Core decompression complete");
            if (this.debug) console.log("[EJS Core] js size:", js?.byteLength, "wasm size:", wasm?.byteLength, "thread size:", thread?.byteLength);

            this.initGameCore(js, wasm, thread);
        }

        const report = "cores/reports/" + this.getCore() + ".json";
        // Add cache-busting parameter periodically to ensure we get updated build versions
        // This ensures that when cores are updated, we'll eventually get the new buildStart value
        const cacheBustInterval = 1000 * 60 * 60; // 1 hour
        const cacheBustParam = Math.floor(Date.now() / cacheBustInterval);
        const reportUrl = `${report}?v=${cacheBustParam}`;

        this.downloadFile(reportUrl, this.downloadType.reports.name, null, false, { responseType: "text", method: "GET" }, false, this.downloadType.reports.dontCache).then(async rep => {
            const decodeReport = (value) => {
                if (!value || value === -1) return {};
                if (typeof value === "string") value = { data: value };
                const payload = value.data;
                if (typeof payload === "string") {
                    try { return JSON.parse(payload); } catch (e) { return {}; }
                }
                const file = payload && Array.isArray(payload.files) ? payload.files[0] : null;
                if (file && file.bytes) {
                    try {
                        return JSON.parse(new TextDecoder().decode(file.bytes));
                    } catch (e) {
                        return {};
                    }
                }
                return payload && typeof payload === "object" ? payload : {};
            };
            rep = decodeReport(rep);
            if (!rep.buildStart) {
                console.warn("Could not fetch core report JSON at " + reportUrl + "! Core caching will be disabled!");
                rep.buildStart = Math.random() * 100;
            }
            if (this.webgl2Enabled === null) {
                this.webgl2Enabled = rep.options ? rep.options.defaultWebGL2 : false;
            }
            if (this.requiresWebGL2(this.getCore())) {
                this.webgl2Enabled = true;
            }
            let threads = false;
            if (typeof window.SharedArrayBuffer === "function") {
                const opt = this.preGetSetting("ejs_threads");
                if (opt) {
                    threads = (opt === "enabled");
                } else {
                    threads = this.config.threads;
                }
            }

            let legacy = (this.supportsWebgl2 && this.webgl2Enabled ? "" : "-legacy");
            let filename = this.getCore() + (threads ? "-thread" : "") + legacy + "-wasm.data";

            // Download the core
            console.log("[EJS Core] Downloading core:", filename);
            const corePath = "cores/" + filename;
            const res = await this.downloadFile(corePath, this.downloadType.core.name, (progress, status) => {
                this.frontend.setLoadingText(status === "decompressing" ? "Decompress Game Core" : "Download Game Core", progress);
            }, false, { responseType: "arraybuffer", method: "GET" }, true, this.downloadType.core.dontCache);
            if (res === -1) {
                if (!this.supportsWebgl2) {
                    this.startGameError("Outdated graphics driver");
                } else {
                    this.startGameError("Error downloading core", " (" + filename + ")");
                }
                return;
            }

            // Core download and caching handled by EJS_Download
            gotCore(res.data);
        });
    }
    initGameCore(js, wasm, thread) {
        let script = this.createElement("script");
        script.src = URL.createObjectURL(new Blob([js], { type: "application/javascript" }));
        script.addEventListener("load", () => {
            this.initModule(wasm, thread);
        });
        document.body.appendChild(script);
    }
    getBaseFileName(force) {
        //Only once game and core is loaded
        if (!this.started && !force) return null;
        if (force && this.config.gameUrl !== "game" && !this.config.gameUrl.startsWith("blob:")) {
            return this.config.gameUrl.split("/").pop().split("#")[0].split("?")[0];
        }
        if (typeof this.config.gameName === "string") {
            const invalidCharacters = /[#<$+%>!`&*'|{}/\\?"=@:^\r\n]/ig;
            const name = this.config.gameName.replace(invalidCharacters, "").trim();
            if (name) return name;
        }
        if (!this.fileName) return "game";
        let parts = this.fileName.split(".");
        parts.splice(parts.length - 1, 1);
        return parts.join(".");
    }
    getFileNameTimestamp(date) {
        return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
    }
    saveInBrowserSupported() {
        return !!window.indexedDB && (typeof this.config.gameName === "string" || !this.config.gameUrl.startsWith("blob:"));
    }
    downloadStartState() {
        return new Promise((resolve, reject) => {
            if (typeof this.config.loadState !== "string" && !this.toData(this.config.loadState, true)) {
                resolve();
                return;
            }
            this.frontend.setLoadingText("Download Game State");

            this.downloadFile(this.config.loadState, this.downloadType.states.name, (progress) => {
                this.frontend.setLoadingText("Download Game State", progress);
            }, true, { responseType: "arraybuffer", method: "GET" }, false, this.downloadType.states.dontCache).then((res) => {
                if (res === -1) {
                    this.startGameError("Error downloading game state");
                    return;
                }
                this.on("start", () => {
                    setTimeout(() => {
                        this.gameManager.loadState(new Uint8Array(res.data.files[0].bytes));
                    }, 10);
                })
                resolve();
            });
        })
    }

    /**
     * Download a file, with caching and File object support
     * @param {*} url The URL or File object to download
     * @param {*} type The download type (from this.downloadType)
     * @returns 
     */
    download(url, type) {
        if (url === undefined || url === null || url === "") {
            if (this.debug) console.log("[EJS " + type.name.toUpperCase() + "] No URL provided, skipping download.");
            return new Promise((resolve) => {
                resolve(url);
            });
        }

        if (!this.compression) {
            this.compression = new EJS_COMPRESSION(this);
        }

        let dontExtract = false;
        if (type.dontExtractIfCore?.includes(this.getCore())) {
            dontExtract = true;
            console.log(`[EJS ${type.name.toUpperCase()}] Core ${this.getCore()} requires special handling, will not attempt to extract if compressed.`);
        } else {
            console.log(`[EJS ${type.name.toUpperCase()}] Core ${this.getCore()} does not require special handling, will attempt to extract if compressed.`);
        }

        return new Promise(async (resolve, reject) => {
            let returnData;

            // check if url is a file object, and if so convert it to an EJS_CacheItem
            if (typeof url === "object" && url instanceof File) {
                if (this.debug) console.log("[EJS " + type.name.toUpperCase() + "] Requested download for File object " + url.name);

                // Convert File to Uint8Array
                const arrayBuffer = await url.arrayBuffer();
                const inData = new Uint8Array(arrayBuffer);

                // check cache
                let key = this.storageCache.generateCacheKey(inData);
                let cachedItem = await this.storageCache.get(key);
                if (cachedItem) {
                    if (this.debug) console.log("[EJS " + type.name.toUpperCase() + "] Using cached content for " + url.name);
                    returnData = cachedItem;
                } else {
                    // Not in cache - decompress
                    let files = [];
                    if (dontExtract === false) {
                        const decompressedData = await this.compression.decompress(inData, (m, appendMsg) => {
                            this.frontend.setLoadingText(appendMsg ? "Decompress Game Core" : null, m);
                        }, (fileName, fileData) => {
                            // Use file callback to collect files during decompression
                            let bytes;
                            if (fileData instanceof Uint8Array) {
                                bytes = fileData;
                            } else if (fileData instanceof ArrayBuffer) {
                                bytes = new Uint8Array(fileData);
                            } else if (fileData && typeof fileData === 'object') {
                                // Handle case where it might be an object with numeric keys
                                bytes = new Uint8Array(Object.values(fileData));
                            } else {
                                console.error("Unknown file data type:", typeof fileData, fileData);
                                return;
                            }

                            if (fileName === "!!notCompressedData") {
                                files.push(new EJS_FileItem(url.name, bytes));
                            } else if (!fileName.endsWith("/")) {
                                files.push(new EJS_FileItem(fileName, bytes));
                            }
                        });
                    } else {
                        // If we shouldn't extract, just treat the whole file as a single item
                        files.push(new EJS_FileItem(url.name, inData));
                    }

                    // construct EJS_CacheItem
                    let data = new EJS_CacheItem(
                        key,
                        files,
                        Date.now(),
                        type.name,
                        "arraybuffer",
                        url.name,
                        url.name,
                        Date.now() + 5 * 24 * 60 * 60 * 1000 // 5 days expiration
                    );

                    this.storageCache.put(data);

                    returnData = data;
                }
            } else {
                // download using a url
                if (this.debug) console.log("[EJS " + type.name.toUpperCase() + "] Requested download for " + url);
                // download the content
                const data = await this.downloadFile(
                    url,
                    type.name,
                    (progress, status) => {
                        this.frontend.setLoadingText(status === "decompressing" ? "Decompress Game Data" : "Download Game Data", progress);
                    },
                    true,
                    { responseType: "arraybuffer", method: "GET" },
                    false,
                    type.dontCache,
                    dontExtract
                );
                // check for error
                if (data === -1) {
                    this.startGameError("Network Error");
                    return;
                }
                // check for content type
                if (this.config.gameUrl instanceof File) {
                    this.config.gameUrl = this.config.gameUrl.name;
                } else if (this.toData(this.config.gameUrl, true)) {
                    this.config.gameUrl = type.name.toLowerCase();
                }

                returnData = data.data;
            }

            if (this.debug) console.log("[EJS " + type.name.toUpperCase() + "] Downloaded content:", returnData);

            const writeFilesToFS = (fileName, fileData) => {
                if (fileName.includes("/")) {
                    const paths = fileName.split("/");
                    let cp = "";
                    for (let i = 0; i < paths.length - 1; i++) {
                        if (paths[i] === "") continue;
                        cp += `/${paths[i]}`;
                        if (!this.gameManager.FS.analyzePath(cp).exists) {
                            this.gameManager.FS.mkdir(cp);
                        }
                    }
                }
                if (fileName.endsWith("/")) {
                    if (!this.gameManager.FS.analyzePath(fileName).exists) {
                        this.gameManager.FS.mkdir(fileName);
                    }
                    return null;
                }
                this.gameManager.FS.writeFile(`/${fileName}`, fileData);
                return fileName;
            };

            // extract to the file system
            if (returnData && returnData.files) {
                for (let i = 0; i < returnData.files.length; i++) {
                    writeFilesToFS(returnData.files[i].filename, returnData.files[i].bytes)
                }
            }

            resolve(returnData);
        });
    }
    /**
     * Initialize GameManager and load external files and file systems
     */
    async initializeGameManager() {
        this.gameManager = new EJS_GameManager(this.Module, this);
        await this.gameManager.loadExternalFiles();
        await this.gameManager.mountFileSystems();
        this.callEvent("saveDatabaseLoaded", this.gameManager.FS);
        if (this.getCore() === "ppsspp") {
            await this.gameManager.loadPpssppAssets();
        }
    }

    /**
     * Determine CUE file handling settings based on core type and configuration
     */
    determineCueSettings() {
        const coresThatNeedCueHandling = ["pcsx_rearmed", "genesis_plus_gx", "picodrive", "mednafen_pce", "smsplus", "vice_x64", "vice_x64sc", "vice_x128", "vice_xvic", "vice_xpet", "puae"];
        let disableCue = false;

        if (coresThatNeedCueHandling.includes(this.getCore()) && this.config.disableCue === undefined) {
            disableCue = true;
        } else {
            disableCue = this.config.disableCue;
        }

        if (this.debug) console.log("Disable CUE handling:", disableCue);
        return disableCue;
    }

    /**
     * Check if extension is supported by the current core
     */
    supportsExtension(ext) {
        if (!this.extensions) return false;
        return this.extensions.includes(ext);
    }

    /**
     * Select the most appropriate ROM file from available files
     */
    selectRomFile(fileNames, coreName) {
        const cueGenerationCores = ["mednafen_psx_hw"];
        const prioritizeExtensions = ["cue", "ccd", "toc", "m3u"];

        let createCueFile = cueGenerationCores.includes(this.getCore());
        if (this.determineCueSettings()) {
            createCueFile = false;
        }

        let isoFile = null;
        let supportedFile = null;
        let cueFile = null;

        fileNames.forEach(fileName => {
            const ext = fileName.split(".").pop().toLowerCase();
            if (supportedFile === null && this.supportsExtension(ext)) {
                supportedFile = fileName;
            }
            if (isoFile === null && ["iso", "cso", "chd", "elf"].includes(ext)) {
                isoFile = fileName;
            }
            if (prioritizeExtensions.includes(ext)) {
                const currentCueExt = (cueFile === null) ? null : cueFile.split(".").pop().toLowerCase();
                if (coreName === "psx") {
                    // Always prefer m3u files for psx cores
                    if (currentCueExt !== "m3u") {
                        if (cueFile === null || ext === "m3u") {
                            cueFile = fileName;
                        }
                    }
                } else {
                    const priority = ["cue", "ccd"]
                    // Prefer cue or ccd files over toc or m3u
                    if (!priority.includes(currentCueExt)) {
                        if (cueFile === null || priority.includes(ext)) {
                            cueFile = fileName;
                        }
                    }
                }
            }
        });

        // Set the primary file selection with priority order
        if (supportedFile !== null) {
            this.fileName = supportedFile;
        } else {
            this.fileName = fileNames[0];
        }

        // ISO files take priority if supported
        if (isoFile !== null && this.supportsExtension(isoFile.split(".").pop().toLowerCase())) {
            this.fileName = isoFile;
        }

        // CUE/CCD files take priority if supported, or create a CUE file if needed
        if (cueFile !== null && this.supportsExtension(cueFile.split(".").pop().toLowerCase())) {
            this.fileName = cueFile;
        } else if (createCueFile && this.supportsExtension("m3u") && this.supportsExtension("cue")) {
            this.fileName = this.gameManager.createCueFile(fileNames);
        }

        // Special handling for DOS
        if (this.getCore(true) === "dos" && !this.config.disableBatchBootup) {
            this.fileName = this.gameManager.writeBootupBatchFile();
        }
    }

    /**
     * Extract file names from downloaded ROM data and start game
     */
    startGameFromDownload(romData) {
        const fileNames = [];
        for (const file of romData.files) {
            if (file.filename.endsWith("/")) {
                continue;
            }
            fileNames.push(file.filename);
        }
        this.selectRomFile(fileNames, this.getCore());
        this.startGame();
    }

    /**
     * Download all necessary files and start the game
     */
    downloadFiles() {
        (async () => {
            await this.initializeGameManager();
            
            const romData = await this.download(this.config.gameUrl, this.downloadType.rom);
            await this.download(this.config.biosUrl, this.downloadType.bios);
            await this.downloadStartState();
            await this.download(this.config.gameParentUrl, this.downloadType.parent);
            await this.download(this.config.gamePatchUrl, this.downloadType.patch);

            this.determineCueSettings();
            this.startGameFromDownload(romData);
        })();
    }
    initModule(wasmData, threadData) {
        if (typeof window.EJS_Runtime !== "function") {
            console.warn("EJS_Runtime is not defined!");
            this.startGameError("Error loading EmulatorJS runtime");
            throw new Error("EJS_Runtime is not defined!");
        }
        window.EJS_Runtime({
            noInitialRun: true,
            onRuntimeInitialized: null,
            arguments: [],
            preRun: [],
            postRun: [],
            canvas: this.frontend.canvas,
            callbacks: {},
            parent: this.frontend.elements.parent,
            print: (msg) => {
                if (this.debug) {
                    console.log(msg);
                }
            },
            printErr: (msg) => {
                if (this.debug) {
                    console.log(msg);
                }
            },
            totalDependencies: 0,
            locateFile: function (fileName) {
                if (this.debug) console.log(fileName);
                if (fileName.endsWith(".wasm")) {
                    return URL.createObjectURL(new Blob([wasmData], { type: "application/wasm" }));
                } else if (fileName.endsWith(".worker.js")) {
                    return URL.createObjectURL(new Blob([threadData], { type: "application/javascript" }));
                }
            },
            getSavExt: () => {
                if (this.saveFileExt) {
                    return "." + this.saveFileExt;
                }
                return ".srm";
            },
            getInputText: (options) => {
                return this.frontend.showInputPrompt(options);
            }
        }).then(module => {
            this.Module = module;
            this.downloadFiles();
        }).catch(e => {
            console.warn(e);
            this.startGameError("Failed to start game");
        });
    }
    startGame() {
        try {
            const args = [];
            if (this.debug) args.push("-v");
            args.push("/" + this.fileName);
            if (this.debug) console.log(args);
            this.Module.callMain(args);
            if (typeof this.config.softLoad === "number" && this.config.softLoad > 0) {
                this.resetTimeout = setTimeout(() => {
                    this.gameManager.restart();
                }, this.config.softLoad * 1000);
            }
            this.Module.resumeMainLoop();
            this.frontend.gameStarted();
            // hide the disks menu if the disk count is not greater than 1
            if (!(this.gameManager.getDiskCount() > 1)) {
                this.frontend.hideDisksButton();
            }
            this.loadSettings();
            this.frontend.updateCheatUI();
            this.frontend.updateGamepadLabels();
            if (!this.muted) this.setVolume(this.volume);
            this.frontend.showCanvas();
            this.started = true;
            this.paused = false;
            if (this.touch) {
                this.frontend.showVirtualGamepad();
            } else if (this.defaultCoreOpts && this.defaultCoreOpts.supportsMouse) {
                this.frontend.canvas.classList.remove("ejs-canvas-no-pointer");
            }
            this.frontend.handleResize();
            if (this.config.fullscreenOnLoad) {
                try {
                    this.toggleFullscreen(true);
                } catch(e) {
                    if (this.debug) console.warn("Could not fullscreen on load");
                }
            }
            this.frontend.menu.open();
            if (this.isSafari && (this.isMobile || this.hasTouchScreen)) {
                // iPadOS can use a desktop Safari user agent, so touch support
                // is a more reliable fallback than mobile user-agent detection.
                this.checkStarted();
            }

            // debug list directory structure
            if (this.debug && this.gameManager && this.gameManager.FS) {
                console.log("File system directory");
                this.gameManager.listDir("/");
            }
        } catch(e) {
            console.warn("Failed to start game", e);
            this.startGameError("Failed to start game");
            this.callEvent("exit");
            return;
        }
        this.callEvent("start");
    }
    checkStarted() {
        (async () => {
            let sleep = (ms) => new Promise(r => setTimeout(r, ms));
            let state = "suspended";
            let popup;
            while (state === "suspended") {
                if (!this.Module.AL) return;
                this.Module.AL.currentCtx.sources.forEach(ctx => {
                    state = ctx.gain.context.state;
                });
                if (state !== "suspended") break;
                if (!popup) {
                    popup = this.frontend.showResumePrompt();
                }
                await sleep(10);
            }
            if (popup) this.frontend.closePopup();
        })();
    }
    bindListeners() {
        this.frontend.bindListeners();

        this.gamepad = new GamepadHandler(); //https://github.com/ethanaobrien/Gamepad
        this.gamepad.on("connected", (e) => {
            if (!this.frontend.gamepadLabels) return;
            const gamepadSelection = this.getGamepadSelectionValue(e.gamepadIndex);
            if (!gamepadSelection) return;
            for (let i = 0; i < this.frontend.gamepadSelection.length; i++) {
                if (this.frontend.gamepadSelection[i] === "") {
                    this.frontend.gamepadSelection[i] = gamepadSelection;
                    break;
                }
            }
            this.frontend.updateGamepadLabels();
        })
        this.gamepad.on("disconnected", (e) => {
            const gamepadSelection = this.getGamepadSelectionValue(e.gamepadIndex);
            if (!gamepadSelection) return;
            for (let i = 0; i < this.frontend.gamepadSelection.length; i++) {
                if (this.frontend.gamepadSelection[i] === gamepadSelection) {
                    this.frontend.gamepadSelection[i] = "";
                }
            }
            setTimeout(this.frontend.updateGamepadLabels.bind(this.frontend), 10);
        })
        this.gamepad.on("axischanged", this.gamepadEvent.bind(this));
        this.gamepad.on("buttondown", this.gamepadEvent.bind(this));
        this.gamepad.on("buttonup", this.gamepadEvent.bind(this));
    }
    getGamepadSelectionValue(gamepadIndex) {
        const gamepad = this.gamepad.gamepads.find((candidate) => candidate && candidate.index === gamepadIndex);
        if (!gamepad) {
            return null;
        }
        return gamepad.id + "_" + gamepad.index;
    }
    buildButtonOptions(buttonUserOpts) {
        this.defaultButtonOptions = {
            playPause: {
                visible: true,
                icon: "play",
                displayName: "Play/Pause"
            },
            play: {
                visible: true,
                icon: '<svg viewBox="0 0 320 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>',
                displayName: "Play"
            },
            pause: {
                visible: true,
                icon: '<svg viewBox="0 0 320 512"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>',
                displayName: "Pause"
            },
            restart: {
                visible: true,
                icon: '<svg viewBox="0 0 512 512"><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>',
                displayName: "Restart"
            },
            mute: {
                visible: true,
                icon: '<svg viewBox="0 0 640 512"><path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"/></svg>',
                displayName: "Mute"
            },
            unmute: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"/></svg>',
                displayName: "Unmute"
            },
            settings: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>',
                displayName: "Settings"
            },
            fullscreen: {
                visible: true,
                icon: "fullscreen",
                displayName: "Fullscreen"
            },
            enterFullscreen: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 281.4c-12.5-12.5-32.76-12.5-45.26-.002l-78.06 78.07l-30.06-30.06c-6.125-6.125-14.31-9.367-22.63-9.367c-4.125 0-8.279 .7891-12.25 2.43c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C.0013 501.3 10.75 512 24 512h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.49 12.5-32.75 .002-45.25L208 281.4zM487.1 0h-136c-12.94 0-24.63 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.87l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.76 0 45.26l22.62 22.62c12.5 12.5 32.76 12.5 45.26 0l78.06-78.07l30.06 30.06c9.156 9.141 22.87 11.84 34.87 6.937C504.2 184.6 512 172.9 512 159.1V23.1C512 10.74 501.3 0 487.1 0z"/></svg>',
                displayName: "Enter Fullscreen"
            },
            exitFullscreen: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.1 272h-136c-12.94 0-24.63 7.797-29.56 19.75C45.47 303.7 48.22 317.5 57.37 326.6l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.75-.0012 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.26 .0013l78.06-78.07l30.06 30.06c6.125 6.125 14.31 9.367 22.63 9.367c4.125 0 8.279-.7891 12.25-2.43c11.97-4.953 19.75-16.62 19.75-29.56V296C239.1 282.7 229.3 272 215.1 272zM296 240h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.5 12.5-32.76 .0002-45.26l-22.62-22.62c-12.5-12.5-32.76-12.5-45.26-.0003l-78.06 78.07l-30.06-30.06c-9.156-9.141-22.87-11.84-34.87-6.937c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C272 229.3 282.7 240 296 240z"/></svg>',
                displayName: "Exit Fullscreen"
            },
            saveState: {
                visible: true,
                icon: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>',
                displayName: "Save State"
            },
            loadState: {
                visible: true,
                icon: '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>',
                displayName: "Load State"
            },
            screenRecord: {
                visible: true
            },
            gamepad: {
                visible: true,
                icon: '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>',
                displayName: "Control Settings"
            },
            cheat: {
                visible: true,
                icon: '<svg viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>',
                displayName: "Cheats"
            },
            volumeSlider: {
                visible: true
            },
            saveSavFiles: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23"><path d="M3 6.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V17.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M8 3H16V8.4C16 8.73137 15.7314 9 15.4 9H8.6C8.26863 9 8 8.73137 8 8.4V3Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M6 21V17.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M12 12H1M1 12L4 9M1 12L4 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                displayName: "Export Save File"
            },
            loadSavFiles: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23"><path d="M3 7.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M6 21V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M16 3V8.4C16 8.73137 15.7314 9 15.4 9H13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M8 3V6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12H12M12 12L9 9M12 12L9 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>',
                displayName: "Import Save File"
            },
            quickSave: {
                visible: true
            },
            quickLoad: {
                visible: true
            },
            screenshot: {
                visible: true
            },
            cacheManager: {
                visible: true,
                icon: '<svg viewBox="0 0 1800 1800"><path d="M896 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5T231 896 128 768V598q119 84 325 127t443 43zm0 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-384q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128V982q119 84 325 127t443 43zM896 0q208 0 385 34.5t280 93.5 103 128v128q0 69-103 128t-280 93.5T896 640t-385-34.5T231 512 128 384V256q0-69 103-128t280-93.5T896 0z"/></svg>',
                displayName: "Cache Manager"
            },
            exitEmulation: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 460"><path style="fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(255,255,255);stroke-opacity:1;stroke-miterlimit:4;" d="M 14.000061 7.636414 L 14.000061 4.5 C 14.000061 4.223877 13.776123 3.999939 13.5 3.999939 L 4.5 3.999939 C 4.223877 3.999939 3.999939 4.223877 3.999939 4.5 L 3.999939 19.5 C 3.999939 19.776123 4.223877 20.000061 4.5 20.000061 L 13.5 20.000061 C 13.776123 20.000061 14.000061 19.776123 14.000061 19.5 L 14.000061 16.363586 " transform="matrix(21.333333,0,0,21.333333,0,0)"/><path style="fill:none;stroke-width:3;stroke-linecap:round;stroke-linejoin:round;stroke:rgb(255,255,255);stroke-opacity:1;stroke-miterlimit:4;" d="M 9.999939 12 L 21 12 M 21 12 L 18.000366 8.499939 M 21 12 L 18 15.500061 " transform="matrix(21.333333,0,0,21.333333,0,0)"/></svg>',
                displayName: "Exit Emulation"
            },
            netplay: {
                visible: true,
                icon: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M364.215 192h131.43c5.439 20.419 8.354 41.868 8.354 64s-2.915 43.581-8.354 64h-131.43c5.154-43.049 4.939-86.746 0-128zM185.214 352c10.678 53.68 33.173 112.514 70.125 151.992.221.001.44.008.661.008s.44-.008.661-.008c37.012-39.543 59.467-98.414 70.125-151.992H185.214zm174.13-192h125.385C452.802 84.024 384.128 27.305 300.95 12.075c30.238 43.12 48.821 96.332 58.394 147.925zm-27.35 32H180.006c-5.339 41.914-5.345 86.037 0 128h151.989c5.339-41.915 5.345-86.037-.001-128zM152.656 352H27.271c31.926 75.976 100.6 132.695 183.778 147.925-30.246-43.136-48.823-96.35-58.393-147.925zm206.688 0c-9.575 51.605-28.163 104.814-58.394 147.925 83.178-15.23 151.852-71.949 183.778-147.925H359.344zm-32.558-192c-10.678-53.68-33.174-112.514-70.125-151.992-.221 0-.44-.008-.661-.008s-.44.008-.661.008C218.327 47.551 195.872 106.422 185.214 160h141.572zM16.355 192C10.915 212.419 8 233.868 8 256s2.915 43.581 8.355 64h131.43c-4.939-41.254-5.154-84.951 0-128H16.355zm136.301-32c9.575-51.602 28.161-104.81 58.394-147.925C127.872 27.305 59.198 84.024 27.271 160h125.385z"/></svg>',
                displayName: "Netplay"
            },
            diskButton: {
                visible: true,
                icon: '<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.109 473.109"><path d="M340.963,101.878H12.105C5.423,101.878,0,107.301,0,113.983v328.862c0,6.68,5.423,12.105,12.105,12.105h328.857 c6.685,0,12.104-5.426,12.104-12.105V113.983C353.067,107.301,347.647,101.878,340.963,101.878z M67.584,120.042h217.895v101.884 H67.584V120.042z M296.076,429.228H56.998V278.414h239.079V429.228z M223.947,135.173h30.269v72.638h-30.269V135.173z M274.13,315.741H78.933v-12.105H274.13V315.741z M274.13,358.109H78.933v-12.105H274.13V358.109z M274.13,398.965H78.933v-12.105 H274.13V398.965z M473.109,30.263v328.863c0,6.68-5.426,12.105-12.105,12.105H384.59v-25.724h31.528V194.694H384.59v-56.489h20.93 V36.321H187.625v43.361h-67.583v-49.42c0-6.682,5.423-12.105,12.105-12.105H461.01C467.695,18.158,473.109,23.581,473.109,30.263z M343.989,51.453h30.269v31.321c-3.18-1.918-6.868-3.092-10.853-3.092h-19.416V51.453z M394.177,232.021h-9.581v-12.105h9.581 V232.021z M384.59,262.284h9.581v12.105h-9.581V262.284z M384.59,303.14h9.581v12.104h-9.581V303.14z"/></svg>',
                displayName: "Disks"
            },
            contextMenu: {
                visible: true,
                icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>',
                displayName: "Context Menu"
            }
        };
        this.defaultButtonAliases = {
            volume: "volumeSlider"
        };

        let mergedButtonOptions = this.defaultButtonOptions;

        // merge buttonUserOpts with mergedButtonOptions
        if (buttonUserOpts) {
            for (const key in buttonUserOpts) {
                let searchKey = key;
                // If the key is an alias, find the actual key in the default buttons
                if (this.defaultButtonAliases[key]) {
                    // Use the alias to find the actual key
                    // and update the searchKey to the actual key
                    searchKey = this.defaultButtonAliases[key];
                }

                // Check if the button exists in the default buttons, and update its properties
                // If the button does not exist, create a custom button
                if (!mergedButtonOptions[searchKey]) {
                    // If the button does not exist in the default buttons, create a custom button
                    // Custom buttons must have a displayName, icon, and callback property
                    if (!buttonUserOpts[searchKey] || !buttonUserOpts[searchKey].displayName || !buttonUserOpts[searchKey].icon || !buttonUserOpts[searchKey].callback) {
                        if (this.debug) console.warn(`Custom button "${searchKey}" is missing required properties`);
                        continue;
                    }

                    mergedButtonOptions[searchKey] = {
                        visible: true,
                        displayName: buttonUserOpts[searchKey].displayName || searchKey,
                        icon: buttonUserOpts[searchKey].icon || "",
                        callback: buttonUserOpts[searchKey].callback || (() => { }),
                        custom: true
                    };
                }

                // if the value is a boolean, set the visible property to the value
                if (typeof buttonUserOpts[searchKey] === "boolean") {
                    mergedButtonOptions[searchKey].visible = buttonUserOpts[searchKey];
                } else if (typeof buttonUserOpts[searchKey] === "object") {
                    // If the value is an object, merge it with the default button properties
    
                    // if the button is the contextMenu, only allow the visible property to be set
                    if (searchKey === "contextMenu") {
                        mergedButtonOptions[searchKey].visible = buttonUserOpts[searchKey].visible !== undefined ? buttonUserOpts[searchKey].visible : true;
                    } else if (this.defaultButtonOptions[searchKey]) {
                        // copy properties from the button definition if they aren't null
                        for (const prop in buttonUserOpts[searchKey]) {
                            if (buttonUserOpts[searchKey][prop] !== null) {
                                mergedButtonOptions[searchKey][prop] = buttonUserOpts[searchKey][prop];
                            }
                        }
                    } else {
                        // button was not in the default buttons list and is therefore a custom button
                        // verify that the value has a displayName, icon, and callback property
                        if (buttonUserOpts[searchKey].displayName && buttonUserOpts[searchKey].icon && buttonUserOpts[searchKey].callback) {
                            mergedButtonOptions[searchKey] = {
                                visible: true,
                                displayName: buttonUserOpts[searchKey].displayName,
                                icon: buttonUserOpts[searchKey].icon,
                                callback: buttonUserOpts[searchKey].callback,
                                custom: true
                            };
                        } else if (this.debug) {
                            console.warn(`Custom button "${searchKey}" is missing required properties`);
                        }
                    }
                }
    
                // behaviour exceptions
                switch (searchKey) {
                    case "playPause":
                        mergedButtonOptions.play.visible = mergedButtonOptions.playPause.visible;
                        mergedButtonOptions.pause.visible = mergedButtonOptions.playPause.visible;
                        break;
    
                    case "mute":
                        mergedButtonOptions.unmute.visible = mergedButtonOptions.mute.visible;
                        break;
    
                    case "fullscreen":
                        mergedButtonOptions.enterFullscreen.visible = mergedButtonOptions.fullscreen.visible;
                        mergedButtonOptions.exitFullscreen.visible = mergedButtonOptions.fullscreen.visible;
                        break;
                }
            }
        }

        return mergedButtonOptions;
    }
    getControlScheme() {
        if (this.config.controlScheme && typeof this.config.controlScheme === "string") {
            return this.config.controlScheme;
        } else {
            return this.getCore(true);
        }
    }
    initControlVars() {
        this.defaultControllers = {
            0: {
                0: {
                    "value": "x",
                    "value2": "BUTTON_2"
                },
                1: {
                    "value": "s",
                    "value2": "BUTTON_4"
                },
                2: {
                    "value": "v",
                    "value2": "SELECT"
                },
                3: {
                    "value": "enter",
                    "value2": "START"
                },
                4: {
                    "value": "up arrow",
                    "value2": "DPAD_UP"
                },
                5: {
                    "value": "down arrow",
                    "value2": "DPAD_DOWN"
                },
                6: {
                    "value": "left arrow",
                    "value2": "DPAD_LEFT"
                },
                7: {
                    "value": "right arrow",
                    "value2": "DPAD_RIGHT"
                },
                8: {
                    "value": "z",
                    "value2": "BUTTON_1"
                },
                9: {
                    "value": "a",
                    "value2": "BUTTON_3"
                },
                10: {
                    "value": "q",
                    "value2": "LEFT_TOP_SHOULDER"
                },
                11: {
                    "value": "e",
                    "value2": "RIGHT_TOP_SHOULDER"
                },
                12: {
                    "value": "tab",
                    "value2": "LEFT_BOTTOM_SHOULDER"
                },
                13: {
                    "value": "r",
                    "value2": "RIGHT_BOTTOM_SHOULDER"
                },
                14: {
                    "value": "",
                    "value2": "LEFT_STICK",
                },
                15: {
                    "value": "",
                    "value2": "RIGHT_STICK",
                },
                16: {
                    "value": "h",
                    "value2": "LEFT_STICK_X:+1"
                },
                17: {
                    "value": "f",
                    "value2": "LEFT_STICK_X:-1"
                },
                18: {
                    "value": "g",
                    "value2": "LEFT_STICK_Y:+1"
                },
                19: {
                    "value": "t",
                    "value2": "LEFT_STICK_Y:-1"
                },
                20: {
                    "value": "l",
                    "value2": "RIGHT_STICK_X:+1"
                },
                21: {
                    "value": "j",
                    "value2": "RIGHT_STICK_X:-1"
                },
                22: {
                    "value": "k",
                    "value2": "RIGHT_STICK_Y:+1"
                },
                23: {
                    "value": "i",
                    "value2": "RIGHT_STICK_Y:-1"
                },
                24: {
                    "value": "1"
                },
                25: {
                    "value": "2"
                },
                26: {
                    "value": "3"
                },
                27: {},
                28: {},
                29: {},
            },
            1: {},
            2: {},
            3: {}
        }
        // Analog stick axes - these use 0x7fff values and don't support autofire
        this.analogAxes = [16, 17, 18, 19, 20, 21, 22, 23];
        this.keyMap = {
            0: "",
            8: "backspace",
            9: "tab",
            13: "enter",
            16: "shift",
            17: "ctrl",
            18: "alt",
            19: "pause/break",
            20: "caps lock",
            27: "escape",
            32: "space",
            33: "page up",
            34: "page down",
            35: "end",
            36: "home",
            37: "left arrow",
            38: "up arrow",
            39: "right arrow",
            40: "down arrow",
            45: "insert",
            46: "delete",
            48: "0",
            49: "1",
            50: "2",
            51: "3",
            52: "4",
            53: "5",
            54: "6",
            55: "7",
            56: "8",
            57: "9",
            65: "a",
            66: "b",
            67: "c",
            68: "d",
            69: "e",
            70: "f",
            71: "g",
            72: "h",
            73: "i",
            74: "j",
            75: "k",
            76: "l",
            77: "m",
            78: "n",
            79: "o",
            80: "p",
            81: "q",
            82: "r",
            83: "s",
            84: "t",
            85: "u",
            86: "v",
            87: "w",
            88: "x",
            89: "y",
            90: "z",
            91: "left window key",
            92: "right window key",
            93: "select key",
            96: "numpad 0",
            97: "numpad 1",
            98: "numpad 2",
            99: "numpad 3",
            100: "numpad 4",
            101: "numpad 5",
            102: "numpad 6",
            103: "numpad 7",
            104: "numpad 8",
            105: "numpad 9",
            106: "multiply",
            107: "add",
            109: "subtract",
            110: "decimal point",
            111: "divide",
            112: "f1",
            113: "f2",
            114: "f3",
            115: "f4",
            116: "f5",
            117: "f6",
            118: "f7",
            119: "f8",
            120: "f9",
            121: "f10",
            122: "f11",
            123: "f12",
            144: "num lock",
            145: "scroll lock",
            186: "semi-colon",
            187: "equal sign",
            188: "comma",
            189: "dash",
            190: "period",
            191: "forward slash",
            192: "grave accent",
            219: "open bracket",
            220: "backslash",
            221: "close bracket",
            222: "single quote"
        }
    }
    setupKeys() {
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 30; j++) {
                if (this.controls[i][j]) {
                    this.controls[i][j].value = parseInt(this.keyLookup(this.controls[i][j].value));
                    if (this.controls[i][j].value === -1 && this.debug) {
                        delete this.controls[i][j].value;
                        if (this.debug) console.warn("Invalid key for control " + j + " player " + i);
                    }
                }
            }
        }
    }
    keyLookup(controllerkey) {
        if (controllerkey === undefined) return 0;
        if (typeof controllerkey === "number") return controllerkey;
        controllerkey = controllerkey.toString().toLowerCase()
        const values = Object.values(this.keyMap);
        if (values.includes(controllerkey)) {
            const index = values.indexOf(controllerkey);
            return Object.keys(this.keyMap)[index];
        }
        return -1;
    }
    getAutofireInterval(playerIndex, buttonIndex) {
        const control = this.controls[playerIndex] && this.controls[playerIndex][buttonIndex];
        if (control && typeof control.autoFireInterval === "number") {
            return control.autoFireInterval;
        }
        const settingValue = this.getSettingValue("autofireInterval");
        return settingValue ? parseInt(settingValue) : this.defaultAutoFireInterval;
    }
    isAutofireEnabled(playerIndex, buttonIndex) {
        const control = this.controls[playerIndex] && this.controls[playerIndex][buttonIndex];
        return control && control.autofire === true;
    }
    startAutofire(playerIndex, buttonIndex, inputValue) {
        const key = `${playerIndex}-${buttonIndex}`;
        if (this.autofireIntervals[key]) {
            return;
        }
        let pressed = true;
        const interval = this.getAutofireInterval(playerIndex, buttonIndex);
        this.autofireIntervals[key] = setInterval(() => {
            if (this.paused || !this.gameManager) return;
            pressed = !pressed;
            this.gameManager.simulateInput(playerIndex, buttonIndex, pressed ? inputValue : 0);
        }, interval);
    }
    stopAutofire(playerIndex, buttonIndex) {
        const key = `${playerIndex}-${buttonIndex}`;
        if (this.autofireIntervals[key]) {
            clearInterval(this.autofireIntervals[key]);
            delete this.autofireIntervals[key];
            this.gameManager.simulateInput(playerIndex, buttonIndex, 0);
        }
    }
    stopAllAutofire() {
        for (const key in this.autofireIntervals) {
            clearInterval(this.autofireIntervals[key]);
            const [playerIndex, buttonIndex] = key.split("-").map(Number);
            if (this.gameManager) {
                this.gameManager.simulateInput(playerIndex, buttonIndex, 0);
            }
        }
        this.autofireIntervals = {};
    }
    keyChange(e) {
        if (e.repeat) return;
        if (!this.started) return;
        if (this.frontend.isRemapping()) {
            const { num, player } = this.frontend.getRemapTarget();
            if (!this.controls[player][num]) {
                this.controls[player][num] = {};
            }
            this.controls[player][num].value = e.keyCode;
            this.frontend.clearRemapTarget();
            this.frontend.checkGamepadInputs();
            this.saveSettings();
            return;
        }
        if (this.frontend.isSettingsMenuOpen() || this.frontend.isPopupOpen() || this.getSettingValue("keyboardInput") === "enabled") return;
        e.preventDefault();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 30; j++) {
                if (this.controls[i][j] && this.controls[i][j].value === e.keyCode) {
                    const isAnalog = this.analogAxes.includes(j);
                    const inputValue = isAnalog ? 0x7fff : 1;
                    const isKeyUp = e.type === "keyup";
                    const value = isKeyUp ? 0 : inputValue;

                    if (this.isAutofireEnabled(i, j) && !isAnalog) {
                        isKeyUp ? this.stopAutofire(i, j) : this.startAutofire(i, j, inputValue);
                    } else {
                        this.gameManager.simulateInput(i, j, value);
                    }
                }
            }
        }
    }
    gamepadEvent(e) {
        if (!this.started) return;
        const gamepadSelection = this.getGamepadSelectionValue(e.gamepadIndex);
        if (!gamepadSelection) {
            return;
        }
        const gamepadIndex = this.frontend.gamepadSelection.indexOf(gamepadSelection);
        if (gamepadIndex < 0) {
            return; // Gamepad not set anywhere
        }

        const toIntValue = (value) => {
            if (value > 0.5 || value < -0.5) {
                return (value > 0) ? 1 : -1;
            } else {
                return 0;
            }
        };

        const value = toIntValue(e.value || 0);
        const oldValue = toIntValue(e.oldValue || 0);
        const skippedZero = (value !== 0) && (value + oldValue === 0);

        if (this.frontend.isRemapping()) {
            if ("buttonup" === e.type || (e.type === "axischanged" && value === 0)) return;
            const target = this.frontend.getRemapTarget();
            const num = target.num;
            const player = parseInt(target.player);
            if (gamepadIndex !== player) return;
            if (!this.controls[player][num]) {
                this.controls[player][num] = {};
            }
            this.controls[player][num].value2 = e.label;
            this.frontend.clearRemapTarget();
            this.frontend.checkGamepadInputs();
            this.saveSettings();
            return;
        }
        if (this.frontend.isSettingsMenuOpen() || this.frontend.isPopupOpen()) return;
        for (let i = 0; i < 4; i++) {
            if (gamepadIndex !== i) continue;
            for (let j = 0; j < 30; j++) {
                if (!this.controls[i][j] || this.controls[i][j].value2 === undefined) {
                    continue;
                }
                const controlValue = this.controls[i][j].value2;
                const isAnalog = this.analogAxes.includes(j);

                if (["buttonup", "buttondown"].includes(e.type) && (controlValue === e.label || controlValue === e.index)) {
                    const inputValue = isAnalog ? 0x7fff : 1;
                    const isButtonUp = e.type === "buttonup";
                    const value = isButtonUp ? 0 : inputValue;

                    if (this.isAutofireEnabled(i, j) && !isAnalog) {
                        isButtonUp ? this.stopAutofire(i, j) : this.startAutofire(i, j, inputValue);
                    } else {
                        this.gameManager.simulateInput(i, j, value);
                    }
                } else if (e.type === "axischanged") {
                    if (typeof controlValue === "string" && controlValue.split(":")[0] === e.axis) {
                        if (isAnalog) {
                            if (j === 16 || j === 17) {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 16, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 17, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 17, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 16, 0);
                                }
                            } else if (j === 18 || j === 19) {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 18, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 19, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 19, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 18, 0);
                                }
                            } else if (j === 20 || j === 21) {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 20, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 21, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 21, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 20, 0);
                                }
                            } else if (j === 22 || j === 23) {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 22, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 23, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 23, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 22, 0);
                                }
                            }
                        } else if (value === 0 || controlValue === e.label || controlValue === `${e.axis}:${value}`) {
                            this.gameManager.simulateInput(i, j, ((value === 0) ? 0 : 1));
                        } else if (skippedZero) {
                            this.gameManager.simulateInput(i, j, 0);
                        }
                    }
                }
            }
        }
    }
    saveSettings() {
        if (!window.localStorage || this.config.disableLocalStorage || !this.settingsLoaded) return;
        if (!this.started && !this.failedToStart) return;
        const coreSpecific = {
            controlSettings: this.controls,
            settings: this.frontend.settings,
            cheats: this.cheats
        }
        const ejs_settings = {
            volume: this.volume,
            muted: this.muted
        }
        localStorage.setItem("ejs-settings", JSON.stringify(ejs_settings));
        localStorage.setItem(this.getLocalStorageKey(), JSON.stringify(coreSpecific));
    }
    getLocalStorageKey() {
        let identifier = (this.config.gameId || 1) + "-" + this.getCore(true);
        if (typeof this.config.gameName === "string") {
            identifier += "-" + this.config.gameName;
        } else if (typeof this.config.gameUrl === "string" && !this.config.gameUrl.toLowerCase().startsWith("blob:")) {
            identifier += "-" + this.config.gameUrl;
        } else if (this.config.gameUrl instanceof File) {
            identifier += "-" + this.config.gameUrl.name;
        } else if (typeof this.config.gameId !== "number") {
            console.warn("gameId (EJS_gameID) is not set. This may result in settings persisting across games.");
        }
        return "ejs-" + identifier + "-settings";
    }
    preGetSetting(setting) {
        if (window.localStorage && !this.config.disableLocalStorage) {
            let coreSpecific = localStorage.getItem(this.getLocalStorageKey());
            try {
                coreSpecific = JSON.parse(coreSpecific);
                if (coreSpecific && coreSpecific.settings) {
                    return coreSpecific.settings[setting];
                }
            } catch(e) {
                console.warn("Could not load previous settings", e);
            }
        }
        if (this.config.defaultOptions && this.config.defaultOptions[setting]) {
            return this.config.defaultOptions[setting];
        }
        return null;
    }
    getCoreSettings() {
        if (!window.localStorage || this.config.disableLocalStorage) {
            if (this.config.defaultOptions) {
                let rv = "";
                for (const k in this.config.defaultOptions) {
                    let value = isNaN(this.config.defaultOptions[k]) ? `"${this.config.defaultOptions[k]}"` : this.config.defaultOptions[k];
                    rv += `${k} = ${value}\n`;
                }
                return rv;
            }
            return "";
        };
        let coreSpecific = localStorage.getItem(this.getLocalStorageKey());
        if (coreSpecific) {
            try {
                coreSpecific = JSON.parse(coreSpecific);
                if (!(coreSpecific.settings instanceof Object)) throw new Error("Not a JSON object");
                let rv = "";
                for (const k in coreSpecific.settings) {
                    let value = isNaN(coreSpecific.settings[k]) ? `"${coreSpecific.settings[k]}"` : coreSpecific.settings[k];
                    rv += `${k} = ${value}\n`;
                }
                for (const k in this.config.defaultOptions) {
                    if (rv.includes(k)) continue;
                    let value = isNaN(this.config.defaultOptions[k]) ? `"${this.config.defaultOptions[k]}"` : this.config.defaultOptions[k];
                    rv += `${k} = ${value}\n`;
                }
                return rv;
            } catch(e) {
                console.warn("Could not load previous settings", e);
            }
        }
        return "";
    }
    loadSettings() {
        if (!window.localStorage || this.config.disableLocalStorage) return;
        this.settingsLoaded = true;
        let ejs_settings = localStorage.getItem("ejs-settings");
        let coreSpecific = localStorage.getItem(this.getLocalStorageKey());
        if (coreSpecific) {
            try {
                coreSpecific = JSON.parse(coreSpecific);
                if (!(coreSpecific.controlSettings instanceof Object) || !(coreSpecific.settings instanceof Object) || !Array.isArray(coreSpecific.cheats)) return;
                this.controls = coreSpecific.controlSettings;
                this.frontend.checkGamepadInputs();
                for (const k in coreSpecific.settings) {
                    this.frontend.changeSettingOption(k, coreSpecific.settings[k]);
                }
                for (let i = 0; i < coreSpecific.cheats.length; i++) {
                    const cheat = coreSpecific.cheats[i];
                    let includes = false;
                    for (let j = 0; j < this.cheats.length; j++) {
                        if (this.cheats[j].desc === cheat.desc && this.cheats[j].code === cheat.code) {
                            this.cheats[j].checked = cheat.checked;
                            includes = true;
                            break;
                        }
                    }
                    if (includes) continue;
                    this.cheats.push(cheat);
                }

            } catch(e) {
                console.warn("Could not load previous settings", e);
            }
        }
        if (ejs_settings) {
            try {
                ejs_settings = JSON.parse(ejs_settings);
                if (typeof ejs_settings.volume !== "number" || typeof ejs_settings.muted !== "boolean") return;
                this.volume = ejs_settings.volume;
                this.muted = ejs_settings.muted;
                this.setVolume(this.muted ? 0 : this.volume);
            } catch(e) {
                console.warn("Could not load previous settings", e);
            }
        }
    }
    handleSpecialOptions(option, value) {
        if (option === "shader") {
            this.enableShader(value);
        } else if (option === "disk") {
            this.gameManager.setCurrentDisk(value);
        } else if (option === "virtual-gamepad") {
            this.frontend.toggleVirtualGamepad(value !== "disabled");
        } else if (option === "menu-bar-button") {
            this.frontend.setMenuBarButtonVisible(value === "visible");
        } else if (option === "virtual-gamepad-left-handed-mode") {
            this.frontend.toggleVirtualGamepadLeftHanded(value !== "disabled");
        } else if (option === "ff-ratio") {
            if (this.isFastForward) this.gameManager.toggleFastForward(0);
            if (value === "unlimited") {
                this.gameManager.setFastForwardRatio(0);
            } else if (!isNaN(value)) {
                this.gameManager.setFastForwardRatio(parseFloat(value));
            }
            setTimeout(() => {
                if (this.isFastForward) this.gameManager.toggleFastForward(1);
            }, 10)
        } else if (option === "fastForward") {
            if (value === "enabled") {
                this.isFastForward = true;
                this.gameManager.toggleFastForward(1);
            } else if (value === "disabled") {
                this.isFastForward = false;
                this.gameManager.toggleFastForward(0);
            }
        } else if (option === "sm-ratio") {
            if (this.isSlowMotion) this.gameManager.toggleSlowMotion(0);
            this.gameManager.setSlowMotionRatio(parseFloat(value));
            setTimeout(() => {
                if (this.isSlowMotion) this.gameManager.toggleSlowMotion(1);
            }, 10);
        } else if (option === "slowMotion") {
            if (value === "enabled") {
                this.isSlowMotion = true;
                this.gameManager.toggleSlowMotion(1);
            } else if (value === "disabled") {
                this.isSlowMotion = false;
                this.gameManager.toggleSlowMotion(0);
            }
        } else if (option === "rewind-granularity") {
            if (this.rewindEnabled) {
                this.gameManager.setRewindGranularity(parseInt(value));
            }
        } else if (option === "vsync") {
            this.gameManager.setVSync(value === "enabled");
        } else if (option === "videoRotation") {
            value = parseInt(value);
            if (this.videoRotationChanged === true || value !== 0) {
                this.gameManager.setVideoRotation(value);
                this.videoRotationChanged = true;
            } else if (this.videoRotationChanged === true && value === 0) {
                this.gameManager.setVideoRotation(0);
                this.videoRotationChanged = true;
            }
        } else if (option === "save-save-interval" && !this.config.fixedSaveInterval) {
            value = parseInt(value);
            this.startSaveInterval(value * 1000);
        } else if (option === "menubarBehavior") {
            this.frontend.createBottomMenuBarListeners();
        } else if (option === "keyboardInput") {
            this.gameManager.setKeyboardEnabled(value === "enabled");
        } else if (option === "altKeyboardInput") {
            this.gameManager.setAltKeyEnabled(value === "enabled");
        } else if (option === "lockMouse") {
            this.enableMouseLock = (value === "enabled");
        } else if (option === "autofireInterval") {
            this.defaultAutoFireInterval = parseInt(value);
        } else if (option.startsWith("controller-port-device-p")) {
            const port = parseInt(option.replace("controller-port-device-p", "")) - 1;
            const deviceId = parseInt(value);
            this.gameManager.setControllerPortDevice(port, deviceId);
            /* RETRO_DEVICE_LIGHTGUN = 4; subclass mask = 0xFF */
            const isLightgun = (deviceId & 0xFF) === 4;
            if (isLightgun) {
                this.lightgunActive = true;
            } else {
                /* Re-check all ports */
                this.lightgunActive = false;
                for (const k in this.allSettings) {
                    if (k.startsWith("controller-port-device-p")) {
                        const v = parseInt(this.allSettings[k]);
                        if ((v & 0xFF) === 4) this.lightgunActive = true;
                    }
                }
            }
            this.frontend.setLightgunCursor(this.lightgunActive);
        }
    }
    menuOptionChanged(option, value) {
        this.saveSettings();
        this.allSettings[option] = value;
        if (this.debug) console.log(option, value);
        if (!this.gameManager) return;
        this.handleSpecialOptions(option, value);
        this.gameManager.setVariable(option, value);
        this.saveSettings();
    }
    getSettingValue(id) {
        return this.allSettings[id] || this.frontend.settings[id] || null;
    }
    cheatChanged(checked, code, index) {
        if (!this.gameManager) return;
        this.gameManager.setCheat(index, checked, code);
    }

    enableShader(name) {
        if (!this.gameManager) return;
        try {
            this.Module.FS.unlink("/shader/shader.glslp");
        } catch(e) {}

        if (name === "disabled" || !this.shaders[name]) {
            this.gameManager.toggleShader(0);
            return;
        }

        const shaderConfig = this.shaders[name];

        if (typeof shaderConfig === "string") {
            this.Module.FS.writeFile("/shader/shader.glslp", shaderConfig, {}, "w+");
        } else {
            const shader = shaderConfig.shader;
            this.Module.FS.writeFile("/shader/shader.glslp", shader.type === "base64" ? atob(shader.value) : shader.value, {}, "w+");
            if (Array.isArray(shaderConfig.resources)) {
                shaderConfig.resources.forEach(resource => {
                    this.Module.FS.writeFile(`/shader/${resource.name}`, resource.type === "base64" ? atob(resource.value) : resource.value, {}, "w+");
                });
            }
        }

        this.gameManager.toggleShader(1);
    }

    screenshot(callback, source, format, upscale) {
        const imageFormat = format || this.getSettingValue("screenshotFormat") || this.capture.photo.format;
        const imageUpscale = upscale || parseInt(this.getSettingValue("screenshotUpscale") || this.capture.photo.upscale);
        const screenshotSource = source || this.getSettingValue("screenshotSource") || this.capture.photo.source;
        const videoRotation = parseInt(this.getSettingValue("videoRotation") || 0);
        const aspectRatio = this.gameManager.getVideoDimensions("aspect") || 1.333333;
        const gameWidth = this.gameManager.getVideoDimensions("width") || 256;
        const gameHeight = this.gameManager.getVideoDimensions("height") || 224;
        const videoTurned = (videoRotation === 1 || videoRotation === 3);
        let width = this.frontend.canvas.width;
        let height = this.frontend.canvas.height;
        let scaleHeight = imageUpscale;
        let scaleWidth = imageUpscale;
        let scale = 1;
        
        if (screenshotSource === "retroarch") {
            if (width >= height) {
                width = height * aspectRatio;
            } else if (width < height) {
                height = width / aspectRatio;
            }
            this.gameManager.screenshot().then(screenshot => {
                const blob = new Blob([screenshot], { type: "image/png" });
                if (imageUpscale === 0) {
                    callback(blob, "png");
                } else if (imageUpscale > 1) {
                    scale = imageUpscale;
                    const img = new Image();
                    const screenshotUrl = URL.createObjectURL(blob);
                    img.src = screenshotUrl;
                    img.onload = () => {
                        const canvas = document.createElement("canvas");
                        canvas.width = width * scale;
                        canvas.height = height * scale;
                        const ctx = canvas.getContext("2d", { alpha: false });
                        ctx.imageSmoothingEnabled = false;
                        ctx.scale(scaleWidth, scaleHeight);
                        ctx.drawImage(img, 0, 0, width, height);
                        canvas.toBlob((blob) => {
                            callback(blob, imageFormat);
                            img.remove();
                            URL.revokeObjectURL(screenshotUrl);
                            canvas.remove();
                        }, "image/" + imageFormat, 1);
                    }
                }
            });
        } else if (screenshotSource === "canvas") {
            if (width >= height && !videoTurned) {
                width = height * aspectRatio;
            } else if (width < height && !videoTurned) {
                height = width / aspectRatio;
            } else if (width >= height && videoTurned) {
                width = height * (1/aspectRatio);
            } else if (width < height && videoTurned) {
                width = height / (1/aspectRatio);
            }
            if (imageUpscale === 0) {
                scale = gameHeight / height;
                scaleHeight = scale;
                scaleWidth = scale;
            } else if (imageUpscale > 1) {
                scale = imageUpscale;
            }
            const captureCanvas = document.createElement("canvas");
            captureCanvas.width = width * scale;
            captureCanvas.height = height * scale;
            captureCanvas.style.display = "none";
            const captureCtx = captureCanvas.getContext("2d", { alpha: false });
            captureCtx.imageSmoothingEnabled = false;
            captureCtx.scale(scale, scale);
            const imageAspect = this.frontend.canvas.width / this.frontend.canvas.height;
            const canvasAspect = width / height;
            let offsetX = 0;
            let offsetY = 0;

            if (imageAspect > canvasAspect) {
                offsetX = (this.frontend.canvas.width - width) / -2;
            } else if (imageAspect < canvasAspect) {
                offsetY = (this.frontend.canvas.height - height) / -2;
            }
            const drawNextFrame = () => {
                captureCtx.drawImage(this.frontend.canvas, offsetX, offsetY, this.frontend.canvas.width, this.frontend.canvas.height);
                captureCanvas.toBlob((blob) => {
                    callback(blob, imageFormat);
                    captureCanvas.remove();
                }, "image/" + imageFormat, 1);
            };
            requestAnimationFrame(drawNextFrame);
        }
    }

    takeScreenshot(source, format, upscale) {
        return new Promise((resolve) => {
            this.screenshot(async (blob, returnFormat) => {
                const arrayBuffer = await blob.arrayBuffer();
                const uint8 = new Uint8Array(arrayBuffer);
                resolve({ screenshot: uint8, format: returnFormat });
            }, source, format, upscale);
        });
    }

    collectScreenRecordingMediaTracks(canvasEl, fps) {
        let videoTrack = null;
        const videoTracks = canvasEl.captureStream(fps).getVideoTracks();
        if (videoTracks.length !== 0) {
            videoTrack = videoTracks[0];
        } else {
            if (this.debug) console.error("Unable to capture video stream");
            return null;
        }

        let audioTrack = null;
        if (this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.audioCtx) {
            const alContext = this.Module.AL.currentCtx;
            const audioContext = alContext.audioCtx;

            const gainNodes = [];
            for (let sourceIdx in alContext.sources) {
                gainNodes.push(alContext.sources[sourceIdx].gain);
            }

            const merger = audioContext.createChannelMerger(gainNodes.length);
            gainNodes.forEach(node => node.connect(merger));

            const destination = audioContext.createMediaStreamDestination();
            merger.connect(destination);

            const audioTracks = destination.stream.getAudioTracks();
            if (audioTracks.length !== 0) {
                audioTrack = audioTracks[0];
            }
        }

        const stream = new MediaStream();
        if (videoTrack && videoTrack.readyState === "live") {
            stream.addTrack(videoTrack);
        }
        if (audioTrack && audioTrack.readyState === "live") {
            stream.addTrack(audioTrack);
        }
        return stream;
    }

    screenRecord() {
        const captureFps = this.getSettingValue("screenRecordingFPS") || this.capture.video.fps;
        const captureFormat = this.getSettingValue("screenRecordFormat") || this.capture.video.format;
        const captureUpscale = this.getSettingValue("screenRecordUpscale") || this.capture.video.upscale;
        const captureVideoBitrate = this.getSettingValue("screenRecordVideoBitrate") || this.capture.video.videoBitrate;
        const captureAudioBitrate = this.getSettingValue("screenRecordAudioBitrate") || this.capture.video.audioBitrate;
        const aspectRatio = this.gameManager.getVideoDimensions("aspect") || 1.333333;
        const videoRotation = parseInt(this.getSettingValue("videoRotation") || 0);
        const videoTurned = (videoRotation === 1 || videoRotation === 3);
        let width = 800;
        let height = 600;
        let frameAspect = this.frontend.canvas.width / this.frontend.canvas.height;
        let canvasAspect = width / height;
        let offsetX = 0;
        let offsetY = 0;

        const captureCanvas = document.createElement("canvas");
        const captureCtx = captureCanvas.getContext("2d", { alpha: false });
        captureCtx.fillStyle = "#000";
        captureCtx.imageSmoothingEnabled = false;
        const updateSize = () => {
            width = this.frontend.canvas.width;
            height = this.frontend.canvas.height;
            frameAspect = width / height
            if (width >= height && !videoTurned) {
                width = height * aspectRatio;
            } else if (width < height && !videoTurned) {
                height = width / aspectRatio;
            } else if (width >= height && videoTurned) {
                width = height * (1/aspectRatio);
            } else if (width < height && videoTurned) {
                width = height / (1/aspectRatio);
            }
            canvasAspect = width / height;
            captureCanvas.width = width * captureUpscale;
            captureCanvas.height = height * captureUpscale;
            captureCtx.scale(captureUpscale, captureUpscale);
            if (frameAspect > canvasAspect) {
                offsetX = (this.frontend.canvas.width - width) / -2;
            } else if (frameAspect < canvasAspect) {
                offsetY = (this.frontend.canvas.height - height) / -2;
            }
        }
        updateSize();
        this.addEventListener(this.frontend.canvas, "resize", () => {
            updateSize();
        });

        let animation = true;

        const drawNextFrame = () => {
            captureCtx.drawImage(this.frontend.canvas, offsetX, offsetY, this.frontend.canvas.width, this.frontend.canvas.height);
            if (animation) {
                requestAnimationFrame(drawNextFrame);
            }
        };
        requestAnimationFrame(drawNextFrame);

        const chunks = [];
        const tracks = this.collectScreenRecordingMediaTracks(captureCanvas, captureFps);
        const recorder = new MediaRecorder(tracks, {
            videoBitsPerSecond: captureVideoBitrate,
            audioBitsPerSecond: captureAudioBitrate,
            mimeType: "video/" + captureFormat
        });
        recorder.addEventListener("dataavailable", e => {
            chunks.push(e.data);
        });
        recorder.addEventListener("stop", () => {
            const blob = new Blob(chunks);
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = this.getBaseFileName() + "-" + this.getFileNameTimestamp(new Date()) + "." + captureFormat;
            a.click();

            animation = false;
            captureCanvas.remove();
        });
        recorder.start();

        return recorder;
    }

    enableSaveUpdateEvent() {
        function withGameSaveHash(saveFile, callback) {
            if (saveFile) {
                cyrb53(saveFile).then(digest => callback(digest, saveFile));
            } else {
                console.warn("Save file not found when attempting to hash");
                callback(null, null);
            }
        }

        var recentHash = null;
        if (this.gameManager) { withGameSaveHash(this.gameManager.getSaveFile(false), (hash, _) => { recentHash = hash }) }

        this.on("saveSaveFiles", saveFile => {
            withGameSaveHash(saveFile, (newHash, fileContents) => {
                if (newHash && fileContents && newHash !== recentHash) {
                    recentHash = newHash;
                    this.takeScreenshot(this.capture.photo.source, this.capture.photo.format, this.capture.photo.upscale).then(({ screenshot, format }) => {
                        this.callEvent("saveUpdate", {
                            hash: newHash,
                            save: fileContents,
                            screenshot: screenshot,
                            format: format
                        });
                    })
                }
            })
        })
    }
}

export default EmulatorJS;

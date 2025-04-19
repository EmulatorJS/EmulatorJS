(async function () {
    const scripts = [
        "emulator.js",
        "nipplejs.js",
        "shaders.js",
        "storage.js",
        "gamepad.js",
        "GameManager.js",
        "socket.io.min.js",
        "compression.js"
    ];

    const folderPath = (path) => path.substring(0, path.length - path.split('/').pop().length);
    let scriptPath = (typeof window.EJS_pathtodata === "string") ? window.EJS_pathtodata : folderPath((new URL(document.currentScript.src)).pathname);
    if (!scriptPath.endsWith('/')) scriptPath += '/';
    //console.log(scriptPath);
    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = function () {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else if (file.endsWith("emulator.min.js")) {
                    return scriptPath + file;
                } else {
                    return scriptPath + "src/" + file;
                }
            }();
            script.onload = resolve;
            script.onerror = () => {
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(script);
        })
    }

    function loadStyle(file) {
        return new Promise(function (resolve, reject) {
            let css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = function () {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath + file;
                }
            }();
            css.onload = resolve;
            css.onerror = () => {
                filesmissing(file).then(e => resolve());
            }
            document.head.appendChild(css);
        })
    }

    async function filesmissing(file) {
        console.error("Failed to load " + file);
        let minifiedFailed = file.includes(".min.") && !file.includes("socket");
        console[minifiedFailed ? "warn" : "error"]("Failed to load " + file + " beacuse it's likly that the minified files are missing.\nTo fix this you have 3 options:\n1. You can download the zip from the latest release here: https://github.com/EmulatorJS/EmulatorJS/releases/latest - Stable\n2. You can download the zip from here: https://cdn.emulatorjs.org/latest/data/emulator.min.zip and extract it to the data/ folder. (easiest option) - Beta\n3. You can build the files by running `npm i && npm run build` in the data/minify folder. (hardest option) - Beta\nNote: you will probably need to do the same for the cores, extract them to the data/cores/ folder.");
        if (minifiedFailed) {
            console.log("Attempting to load non-minified files");
            if (file === "emulator.min.js") {
                for (let i = 0; i < scripts.length; i++) {
                    await loadScript(scripts[i]);
                }
            } else {
                await loadStyle('emulator.css');
            }
        }
    }

    if (('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX)) {
        for (let i = 0; i < scripts.length; i++) {
            await loadScript(scripts[i]);
        }
        await loadStyle('emulator.css');
    } else {
        await loadScript('emulator.min.js');
        await loadStyle('emulator.min.css');
    }
    const config = {};
    config.gameUrl = window.EJS_gameUrl;
    config.dataPath = scriptPath;
    config.system = window.EJS_core;
    config.biosUrl = window.EJS_biosUrl;
    config.gameName = window.EJS_gameName;
    config.color = window.EJS_color;
    config.adUrl = window.EJS_AdUrl;
    config.adMode = window.EJS_AdMode;
    config.adTimer = window.EJS_AdTimer;
    config.adSize = window.EJS_AdSize;
    config.alignStartButton = window.EJS_alignStartButton;
    config.VirtualGamepadSettings = window.EJS_VirtualGamepadSettings;

    // set default button options
    config.buttonOpts = {
        playPause: {
            visible: true,
            icon: "play",
            displayName: "Play/Pause",
            callback: undefined
        },
        play: {
            visible: true,
            icon: '<svg viewBox="0 0 320 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>',
            displayName: "Play",
            callback: undefined
        },
        pause: {
            visible: true,
            icon: '<svg viewBox="0 0 320 512"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>',
            displayName: "Pause",
            callback: undefined
        },
        restart: {
            visible: true,
            icon: '<svg viewBox="0 0 512 512"><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>',
            displayName: "Restart",
            callback: undefined
        },
        mute: {
            visible: true,
            icon: '<svg viewBox="0 0 640 512"><path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"/></svg>',
            displayName: "Mute",
            callback: undefined
        },
        unmute: {
            visible: true,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"/></svg>',
            displayName: "Unmute",
            callback: undefined
        },
        settings: {
            visible: true,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>',
            displayName: "Settings",
            callback: undefined
        },
        fullscreen: {
            visible: true,
            icon: "fullscreen",
            displayName: "Fullscreen",
            callback: undefined
        },
        enterFullscreen: {
            visible: true,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 281.4c-12.5-12.5-32.76-12.5-45.26-.002l-78.06 78.07l-30.06-30.06c-6.125-6.125-14.31-9.367-22.63-9.367c-4.125 0-8.279 .7891-12.25 2.43c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C.0013 501.3 10.75 512 24 512h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.49 12.5-32.75 .002-45.25L208 281.4zM487.1 0h-136c-12.94 0-24.63 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.87l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.76 0 45.26l22.62 22.62c12.5 12.5 32.76 12.5 45.26 0l78.06-78.07l30.06 30.06c9.156 9.141 22.87 11.84 34.87 6.937C504.2 184.6 512 172.9 512 159.1V23.1C512 10.74 501.3 0 487.1 0z"/></svg>',
            displayName: "Enter Fullscreen",
            callback: undefined
        },
        exitFullscreen: {
            visible: true,
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.1 272h-136c-12.94 0-24.63 7.797-29.56 19.75C45.47 303.7 48.22 317.5 57.37 326.6l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.75-.0012 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.26 .0013l78.06-78.07l30.06 30.06c6.125 6.125 14.31 9.367 22.63 9.367c4.125 0 8.279-.7891 12.25-2.43c11.97-4.953 19.75-16.62 19.75-29.56V296C239.1 282.7 229.3 272 215.1 272zM296 240h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.5 12.5-32.76 .0002-45.26l-22.62-22.62c-12.5-12.5-32.76-12.5-45.26-.0003l-78.06 78.07l-30.06-30.06c-9.156-9.141-22.87-11.84-34.87-6.937c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C272 229.3 282.7 240 296 240z"/></svg>',
            displayName: "Exit Fullscreen",
            callback: undefined
        },
        saveState: {
            visible: true,
            icon: '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>',
            displayName: "Save State",
            callback: undefined
        },
        loadState: {
            visible: true,
            icon: '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>',
            displayName: "Load State",
            callback: undefined
        },
        screenRecord: {
            visible: true
        },
        gamepad: {
            visible: true,
            icon: '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>',
            displayName: "Control Settings",
            callback: undefined
        },
        cheat: {
            visible: true,
            icon: '<svg viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>',
            displayName: "Cheats",
            callback: undefined
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
            visible: false,
            displayName: "Netplay",
            icon: '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M364.215 192h131.43c5.439 20.419 8.354 41.868 8.354 64s-2.915 43.581-8.354 64h-131.43c5.154-43.049 4.939-86.746 0-128zM185.214 352c10.678 53.68 33.173 112.514 70.125 151.992.221.001.44.008.661.008s.44-.008.661-.008c37.012-39.543 59.467-98.414 70.125-151.992H185.214zm174.13-192h125.385C452.802 84.024 384.128 27.305 300.95 12.075c30.238 43.12 48.821 96.332 58.394 147.925zm-27.35 32H180.006c-5.339 41.914-5.345 86.037 0 128h151.989c5.339-41.915 5.345-86.037-.001-128zM152.656 352H27.271c31.926 75.976 100.6 132.695 183.778 147.925-30.246-43.136-48.823-96.35-58.393-147.925zm206.688 0c-9.575 51.605-28.163 104.814-58.394 147.925 83.178-15.23 151.852-71.949 183.778-147.925H359.344zm-32.558-192c-10.678-53.68-33.174-112.514-70.125-151.992-.221 0-.44-.008-.661-.008s-.44.008-.661.008C218.327 47.551 195.872 106.422 185.214 160h141.572zM16.355 192C10.915 212.419 8 233.868 8 256s2.915 43.581 8.355 64h131.43c-4.939-41.254-5.154-84.951 0-128H16.355zm136.301-32c9.575-51.602 28.161-104.81 58.394-147.925C127.872 27.305 59.198 84.024 27.271 160h125.385z"/></svg>'
        },
        diskButton: {
            visible: true,
            icon: '<svg fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 473.109 473.109"><path d="M340.963,101.878H12.105C5.423,101.878,0,107.301,0,113.983v328.862c0,6.68,5.423,12.105,12.105,12.105h328.857 c6.685,0,12.104-5.426,12.104-12.105V113.983C353.067,107.301,347.647,101.878,340.963,101.878z M67.584,120.042h217.895v101.884 H67.584V120.042z M296.076,429.228H56.998V278.414h239.079V429.228z M223.947,135.173h30.269v72.638h-30.269V135.173z M274.13,315.741H78.933v-12.105H274.13V315.741z M274.13,358.109H78.933v-12.105H274.13V358.109z M274.13,398.965H78.933v-12.105 H274.13V398.965z M473.109,30.263v328.863c0,6.68-5.426,12.105-12.105,12.105H384.59v-25.724h31.528V194.694H384.59v-56.489h20.93 V36.321H187.625v43.361h-67.583v-49.42c0-6.682,5.423-12.105,12.105-12.105H461.01C467.695,18.158,473.109,23.581,473.109,30.263z M343.989,51.453h30.269v31.321c-3.18-1.918-6.868-3.092-10.853-3.092h-19.416V51.453z M394.177,232.021h-9.581v-12.105h9.581 V232.021z M384.59,262.284h9.581v12.105h-9.581V262.284z M384.59,303.14h9.581v12.104h-9.581V303.14z"/></svg>',
            displayName: "Disks"
        },
        contextMenu: {
            visible: true,
            displayName: "Context Menu",
            icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2023 Fonticons, Inc.--><path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"/></svg>'
        },
        customBtn1: {
            visible: false,
            icon: null,
            displayName: undefined,
            callback: undefined
        },
        customBtn2: {
            visible: false,
            icon: null,
            displayName: undefined,
            callback: undefined
        },
        customBtn3: {
            visible: false,
            icon: null,
            displayName: undefined,
            callback: undefined
        }
    };

    if (window.EJS_Buttons) {
        for (const key in window.EJS_Buttons) {
            // Check if the button exists in the default buttons, and update its properties
            // if the value is a boolean, set the visible property to the value
            if (typeof window.EJS_Buttons[key] === "boolean") {
                config.buttonOpts[key].visible = window.EJS_Buttons[key];
            } else if (typeof window.EJS_Buttons[key] === "object") {
                // If the value is an object, merge it with the default button properties
                // check if the value is a custom button, if so, visible, icon, and callback are required
                if (key === "customBtn1" || key === "customBtn2" || key === "customBtn3") {
                    if (window.EJS_Buttons[key].visible === undefined) {
                        window.EJS_Buttons[key].visible = true;
                    }
                    if (window.EJS_Buttons[key].icon === undefined) {
                        console.error("Custom button " + key + " is missing icon");
                        continue;
                    }
                    if (window.EJS_Buttons[key].callback === undefined) {
                        console.error("Custom button " + key + " is missing callback");
                        continue;
                    }
                }

                // copy properties from the button definition if they aren't null
                for (const prop in window.EJS_Buttons[key]) {
                    if (window.EJS_Buttons[key][prop] !== null) {
                        config.buttonOpts[key][prop] = window.EJS_Buttons[key][prop];
                    }
                }
            }
            // If the button is not in the default buttons, ignore it

            // behaviour exceptions
            switch (key) {
                case "playPause":
                    config.buttonOpts.play.visible = config.buttonOpts.playPause.visible;
                    config.buttonOpts.pause.visible = config.buttonOpts.playPause.visible;
                    break;

                case "mute":
                    config.buttonOpts.unmute.visible = config.buttonOpts.mute.visible;
                    break;

                case "fullscreen":
                    config.buttonOpts.enterFullscreen.visible = config.buttonOpts.fullscreen.visible;
                    config.buttonOpts.exitFullscreen.visible = config.buttonOpts.fullscreen.visible;
                    break;
            }
        }
    }

    config.volume = window.EJS_volume;
    config.defaultControllers = window.EJS_defaultControls;
    config.startOnLoad = window.EJS_startOnLoaded;
    config.fullscreenOnLoad = window.EJS_fullscreenOnLoaded;
    config.filePaths = window.EJS_paths;
    config.loadState = window.EJS_loadStateURL;
    config.cacheLimit = window.EJS_CacheLimit;
    config.cheats = window.EJS_cheats;
    config.defaultOptions = window.EJS_defaultOptions;
    config.gamePatchUrl = window.EJS_gamePatchUrl;
    config.gameParentUrl = window.EJS_gameParentUrl;
    config.netplayUrl = window.EJS_netplayServer;
    config.gameId = window.EJS_gameID;
    config.backgroundImg = window.EJS_backgroundImage;
    config.backgroundBlur = window.EJS_backgroundBlur;
    config.backgroundColor = window.EJS_backgroundColor;
    config.controlScheme = window.EJS_controlScheme;
    config.threads = window.EJS_threads;
    config.disableCue = window.EJS_disableCue;
    config.startBtnName = window.EJS_startButtonName;
    config.softLoad = window.EJS_softLoad;
    config.screenRecording = window.EJS_screenRecording;
    config.externalFiles = window.EJS_externalFiles;
    config.dontExtractBIOS = window.EJS_dontExtractBIOS;
    config.disableDatabases = window.EJS_disableDatabases;
    config.disableLocalStorage = window.EJS_disableLocalStorage;
    config.forceLegacyCores = window.EJS_forceLegacyCores;
    config.noAutoFocus = window.EJS_noAutoFocus;
    config.videoRotation = window.EJS_videoRotation;
    config.hideSettings = window.EJS_hideSettings;
    config.shaders = Object.assign({}, window.EJS_SHADERS, window.EJS_shaders ? window.EJS_shaders : {});

    let systemLang;
    try {
        systemLang = Intl.DateTimeFormat().resolvedOptions().locale;
    } catch (e) { } //Ignore
    if ((typeof window.EJS_language === "string" && window.EJS_language !== "en-US") || (systemLang && window.EJS_disableAutoLang !== false)) {
        const language = window.EJS_language || systemLang;
        try {
            let path;
            console.log("Loading language", language);
            if ('undefined' != typeof EJS_paths && typeof EJS_paths[language] === 'string') {
                path = EJS_paths[language];
            } else {
                path = scriptPath + "localization/" + language + ".json";
            }
            config.language = language;
            config.langJson = JSON.parse(await (await fetch(path)).text());
        } catch (e) {
            console.log("Missing language", language, "!!");
            delete config.language;
            delete config.langJson;
        }
    }

    window.EJS_emulator = new EmulatorJS(EJS_player, config);
    window.EJS_adBlocked = (url, del) => window.EJS_emulator.adBlocked(url, del);
    if (typeof window.EJS_ready === "function") {
        window.EJS_emulator.on("ready", window.EJS_ready);
    }
    if (typeof window.EJS_onGameStart === "function") {
        window.EJS_emulator.on("start", window.EJS_onGameStart);
    }
    if (typeof window.EJS_onLoadState === "function") {
        window.EJS_emulator.on("loadState", window.EJS_onLoadState);
    }
    if (typeof window.EJS_onSaveState === "function") {
        window.EJS_emulator.on("saveState", window.EJS_onSaveState);
    }
    if (typeof window.EJS_onLoadSave === "function") {
        window.EJS_emulator.on("loadSave", window.EJS_onLoadSave);
    }
    if (typeof window.EJS_onSaveSave === "function") {
        window.EJS_emulator.on("saveSave", window.EJS_onSaveSave);
    }
})();

(async function() {
    const folderPath = (path) => path.substring(0, path.length - path.split('/').pop().length);
    const scriptPath = (typeof window.EJS_pathtodata === "string") ? window.EJS_pathtodata : folderPath((new URL(document.currentScript.src)).pathname);
    if (!scriptPath.endsWith('/')) scriptPath+='/';
    //console.log(scriptPath);
    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            script.src = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath+file;
                }
            }();
            script.onload = resolve;
            document.head.appendChild(script);
        })
    }
    function loadStyle(file) {
        return new Promise(function(resolve, reject) {
            let css = document.createElement('link');
            css.rel = 'stylesheet';
            css.href = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] === 'string') {
                    return EJS_paths[file];
                } else {
                    return scriptPath+file;
                }
            }();
            css.onload = resolve;
            document.head.appendChild(css);
        })
    }
    
    if (('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX) || true) {
        await loadScript('emulator.js');
        await loadScript('nipplejs.js');
        await loadScript('shaders.js');
        await loadScript('storage.js');
        await loadScript('gamepad.js');
        await loadScript('GameManager.js');
        await loadStyle('css/main.css');
    }
    const config = {};
    config.gameUrl = window.EJS_gameUrl;
    config.dataPath = scriptPath;
    config.system = window.EJS_core;
    config.biosUrl = window.EJS_biosUrl;
    config.gameName = window.EJS_gameName;
    config.color = window.EJS_color;
    config.adUrl = window.EJS_AdUrl;
    config.adTimer = window.EJS_AdTimer
    config.VirtualGamepadSettings = window.EJS_VirtualGamepadSettings;
    config.buttonOpts = window.EJS_Buttons;
    config.volume = window.EJS_volume;
    config.defaultControllers = window.EJS_defaultControls;
    config.startOnLoad = window.EJS_startOnLoaded;
    config.filePaths = window.EJS_paths;
    config.loadState = window.EJS_loadStateURL;
    
    new EmulatorJS(EJS_player, config);
    
})();
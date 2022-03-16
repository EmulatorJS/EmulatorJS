(async function() {
    var VERSION = 1.2;
    if (window.location && ['localhost', '127.0.0.1'].includes(location.hostname)) {
        fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
            if (response.ok) {
                response.text().then(body => {
                    var version = JSON.parse(body);
                    if (VERSION < version.current_version) {
                        console.log('Using emulatorjs version ' + usingVersion + ' but the newest version is ' + version.current_version + '\nopen https://github.com/ethanaobrien/emulatorjs to update');
                    }
                })
            }
        })
    }
    var scriptTag = document.getElementsByTagName('script')[0]
    function loadScript(file) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            script.src = function() {
                if ('undefined' != typeof EJS_paths && typeof EJS_paths[file] == 'string') {
                    return EJS_paths[file];
                } else if ('undefined' != typeof EJS_pathtodata) {
                    return EJS_pathtodata+file+'?v='+VERSION;
                } else {
                    return file+'?v='+VERSION;
                }
            }();
            scriptTag.parentNode.insertBefore(script, scriptTag);
            script.onload = function() {
                resolve();
            }
        })
    }
    if ('undefined' != typeof EJS_DEBUG_XX && true === EJS_DEBUG_XX) {
        await loadScript('emu-main.js');
        await loadScript('emulator.js');
    } else {
        await loadScript('emu-min.js');
    }
    var config = {};
    config.gameUrl = EJS_gameUrl;
    'undefined' != typeof EJS_mameCore && (config.mameCore = EJS_mameCore);
    'undefined' != typeof EJS_biosUrl && (config.biosUrl = EJS_biosUrl);
    'undefined' != typeof EJS_gameID && (config.gameId = EJS_gameID);
    'undefined' != typeof EJS_gameParentUrl && (config.gameParentUrl = EJS_gameParentUrl);
    'undefined' != typeof EJS_gamePatchUrl && (config.gamePatchUrl = EJS_gamePatchUrl);
    'undefined' != typeof EJS_AdUrl && (config.adUrl = EJS_AdUrl);
    'undefined' != typeof EJS_paths && (config.paths = EJS_paths);
    'undefined' != typeof EJS_netplayUrl && (config.netplayUrl = EJS_netplayUrl);
    'undefined' != typeof EJS_startOnLoaded && (config.startOnLoad = EJS_startOnLoaded);
    'undefined' != typeof EJS_core && (config.system = EJS_core);
    'undefined' != typeof EJS_loadStateURL && (config.loadStateOnStart = EJS_loadStateURL);
    'undefined' != typeof EJS_language && (config.lang = EJS_language);
    'undefined' != typeof EJS_oldEJSNetplayServer && (config.oldNetplayServer = EJS_oldEJSNetplayServer);
    'undefined' != typeof EJS_BETA && (config.useBeta = EJS_BETA);
    config.onsavestate = null;
    config.onloadstate = null;
    'undefined' != typeof EJS_onSaveState && (config.onsavestate = EJS_onSaveState);
    'undefined' != typeof EJS_onLoadState && (config.onloadstate = EJS_onLoadState);
    'undefined' != typeof EJS_lightgun && (config.lightgun = EJS_lightgun);
    'undefined' != typeof EJS_gameName && (config.gameName = EJS_gameName);
    'undefined' != typeof EJS_pathtodata && (config.dataPath = EJS_pathtodata);
    'undefined' != typeof EJS_mouse && (config.mouse = EJS_mouse);
    'undefined' != typeof EJS_multitap && (config.multitap = EJS_multitap);
    'undefined' != typeof EJS_playerName && (config.playerName = EJS_playerName);
    'undefined' != typeof EJS_cheats && (config.cheats = EJS_cheats);
    'undefined' != typeof EJS_color && (config.color = EJS_color);
    window.EJS_emulator = new EJS(EJS_player, config);
    'undefined' != typeof EJS_onGameStart && EJS_emulator.on('start-game', EJS_onGameStart);
})();

var VERSION = '0.4.26'
fetch('https://raw.githack.com/ethanaobrien/emulatorjs/main/data/version.json').then(response => {
    if (response.ok) {
        response.text().then(body => {
            var version = JSON.parse(body);
            var usingVersion = VERSION;
            if (usingVersion != version.current_version) {
                console.log('Using emulatorjs version ' + usingVersion + ' but the newest version is ' + version.current_version + '\n\nopen https://github.com/ethanaobrien/emulatorjs to update');
            };
        });
    };
});
var scriptTag = document.getElementsByTagName('script')[0]
var emu_main = document.createElement('script')
emu_main.src = function() {
    if ('undefined' != typeof EJS_paths && typeof EJS_paths['emu-main.js'] == 'string') {
        return EJS_paths['emu-main.js']
    } else if ('undefined' != typeof EJS_pathtodata) {
        return EJS_pathtodata + 'emu-main.js?v=' + VERSION
    } else {
        return 'emu-main.js?v=' + VERSION;
    }
}();
scriptTag.parentNode.insertBefore(emu_main, scriptTag)
emu_main.onload = function() {
    var emulatorjs = document.createElement('script')
    emulatorjs.async = true
    emulatorjs.src = function() {
        if ('undefined' != typeof EJS_paths && typeof EJS_paths['emulator.js'] == 'string') {
            return EJS_paths['emulator.js']
        } else if ('undefined' != typeof EJS_pathtodata) {
            return EJS_pathtodata + 'emulator.js?v=' + VERSION
        } else {
            return 'emulator.js?v=' + VERSION;
        }
    }();
    scriptTag.parentNode.insertBefore(emulatorjs, scriptTag)
    emulatorjs.onload = function() {
        var config = {};
        config.gameUrl = EJS_gameUrl

        'undefined' != typeof EJS_mameCore && (config.mameCore = EJS_mameCore)
        'undefined' != typeof EJS_biosUrl && (config.biosUrl = EJS_biosUrl)
        'undefined' != typeof EJS_gameID && (config.gameId = EJS_gameID)
        'undefined' != typeof EJS_gameParentUrl && (config.gameParentUrl = EJS_gameParentUrl)
        'undefined' != typeof EJS_gamePatchUrl && (config.gamePatchUrl = EJS_gamePatchUrl)
        'undefined' != typeof EJS_AdUrl && (config.adUrl = EJS_AdUrl)
        'undefined' != typeof EJS_paths && (config.paths = EJS_paths)
        'undefined' != typeof EJS_netplayUrl && (config.netplayUrl = EJS_netplayUrl)
        'undefined' != typeof EJS_startOnLoaded && (config.startOnLoad = EJS_startOnLoaded)
        'undefined' != typeof EJS_core && (config.system = EJS_core)
        'undefined' != typeof EJS_loadStateURL && (config.loadStateOnStart = EJS_loadStateURL)
        'undefined' != typeof EJS_language && (config.lang = EJS_language)
        'undefined' != typeof EJS_oldEJSNetplayServer && (config.oldNetplayServer = EJS_oldEJSNetplayServer)
        'undefined' != typeof EJS_BETA && (config.useBeta = EJS_BETA)
        config.onsavestate = null
        config.onloadstate = null
        'undefined' != typeof EJS_onSaveState && (config.onsavestate = EJS_onSaveState)
        'undefined' != typeof EJS_onLoadState && (config.onloadstate = EJS_onLoadState)
        'undefined' != typeof EJS_lightgun && (config.lightgun = EJS_lightgun)
        'undefined' != typeof EJS_gameName && (config.gameName = EJS_gameName)
        'undefined' != typeof EJS_pathtodata && (config.dataPath = EJS_pathtodata)
        'undefined' != typeof EJS_mouse && (config.mouse = EJS_mouse)
        'undefined' != typeof EJS_multitap && (config.multitap = EJS_multitap)
        'undefined' != typeof EJS_playerName && (config.playerName = EJS_playerName)
        'undefined' != typeof EJS_cheats && (config.cheats = EJS_cheats)
        'undefined' != typeof EJS_color && (config.color = EJS_color)
        window.EJS_emulator = new EJS(EJS_player, config)
        'undefined' != typeof EJS_onGameStart && EJS_emulator.on('start-game', EJS_onGameStart);
    };
};

$(document).ready(function(){
    $(".ejs--73f9b4e94a7a1fe74e11107d5ab2ef").attr("id","start");
    $(".ejs--cbcfe0a1421cadac9a04c81d6431d6").attr("id","loding");
    $(".ejs--71527b6509aa48afce3ce1a11c02f0").attr("id","naming");
    $(".ejs--057800d021995e1347ec07cb748672").addClass("backg");
    $("#loding").attr("hidden","");
    $("#loding").hide();
    $("#start").on('touchstart click', function() {
    $(".ejs--057800d021995e1347ec07cb748672").removeClass("backg");
    $("#loding").show();
    $("#loding").removeAttr("hidden");
    $("div").remove(".ejs--f3a1903d935f6cf720d4a0498db62a");
    setTimeout(
  function() 
  {
    $("div").remove(".ejs--cbcfe0a1421cadac9a04c81d6431d6");
  }, 4500);
});
});

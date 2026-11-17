const callerScriptUrl = (document.currentScript && document.currentScript.src) || "";

const debug = window.EJS_DEBUG_XX === true;

(async function() {
    let bootstrap;
    try {
        bootstrap = await import(new URL("src/bootstrap.js", callerScriptUrl || document.baseURI).href);
    } catch(e) {
        console.error("Failed to load src/bootstrap.js", e);
        return;
    }

    const dataPath = bootstrap.resolveDataPath(callerScriptUrl, window.EJS_pathtodata);

    if (debug) {
        console.log("Script Path:", dataPath);
    }

    const config = {
        debug: debug,
        gameUrl: window.EJS_gameUrl,
        dataPath: dataPath,
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
        netplayUrl: window.EJS_netplayServer || window.EJS_netplayUrl,
        netplayICEServers: window.EJS_netplayICEServers,
        language: window.EJS_language,
        disableAutoLang: window.EJS_disableAutoLang,
        settingsLanguage: window.EJS_settingsLanguage,
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
        disableBatchBootup: window.EJS_disableBatchBootup,
        askBeforeExit: window.EJS_askBeforeExit,
        retroarchOpts: window.EJS_retroarchOpts,
        coreOpts: window.EJS_coreOpts
    };

    const EmulatorJS = await bootstrap.loadEmulator(dataPath, { debug: debug, css: "link", filePaths: config.filePaths });

    if (!EmulatorJS) {
        console.error("EmulatorJS failed to load. Check for missing files.");
        return;
    }

    await bootstrap.prepareLanguage(config);

    if (debug) {
        console.log("Language:", config.language);
        console.log("Language JSON loaded:", !!config.langJson);
    }

    const handlers = {
        ready: window.EJS_ready,
        start: window.EJS_onGameStart,
        loadState: window.EJS_onLoadState,
        saveState: window.EJS_onSaveState,
        loadSave: window.EJS_onLoadSave,
        saveSave: window.EJS_onSaveSave,
        exit: window.EJS_onExit,
        saveUpdate: window.EJS_onSaveUpdate
    };
    window.EJS_emulator = bootstrap.createEmulator(window.EJS_player, config, handlers);
    window.EJS_adBlocked = (url, del) => window.EJS_emulator.frontend.adBlocked(url, del);
})();

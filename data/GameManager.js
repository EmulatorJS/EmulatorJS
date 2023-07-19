class EJS_GameManager {
    constructor(Module, EJS) {
        this.EJS = EJS;
        this.Module = Module;
        this.FS = this.Module.FS;
        this.functions = {
            restart: this.Module.cwrap('system_restart', '', []),
            getStateInfo: this.Module.cwrap('get_state_info', 'string', []), //these names are dumb
            saveStateInfo: this.Module.cwrap('save_state_info', 'null', []),
            loadState: this.Module.cwrap('load_state', 'number', ['string', 'number']),
            screenshot: this.Module.cwrap('cmd_take_screenshot', '', []),
            simulateInput: this.Module.cwrap('simulate_input', 'null', ['number', 'number', 'number']),
            toggleMainLoop: this.Module.cwrap('toggleMainLoop', 'null', ['number']),
            getCoreOptions: this.Module.cwrap('get_core_options', 'string', []),
            setVariable: this.Module.cwrap('set_variable', 'null', ['string', 'string']),
            setCheat: this.Module.cwrap('set_cheat', 'null', ['number', 'number', 'string']),
            resetCheat: this.Module.cwrap('reset_cheat', 'null', []),
            toggleShader: this.Module.cwrap('shader_enable', 'null', ['number']),
            getDiskCount: this.Module.cwrap('get_disk_count', 'number', []),
            getCurrentDisk: this.Module.cwrap('get_current_disk', 'number', []),
            setCurrentDisk: this.Module.cwrap('set_current_disk', 'null', ['number']),
            getSaveFilePath: this.Module.cwrap('save_file_path', 'string', []),
            saveSaveFiles: this.Module.cwrap('cmd_savefiles', '', []),
            supportsStates: this.Module.cwrap('supports_states', 'number', []),
            loadSaveFiles: this.Module.cwrap('refresh_save_files', 'null', []),
            setVolume: this.Module.cwrap('set_volume', 'null', ['number'])
        }
        this.mkdir("/home");
        this.mkdir("/home/web_user");
        this.mkdir("/home/web_user/retroarch");
        this.mkdir("/home/web_user/retroarch/userdata");
        this.mkdir("/home/web_user/retroarch/userdata/config");
        this.mkdir("/home/web_user/retroarch/userdata/config/Beetle PSX HW");
        this.FS.writeFile("/home/web_user/retroarch/userdata/config/Beetle PSX HW/Beetle PSX HW.opt", 'beetle_psx_hw_renderer = "software"\n');
        
        this.mkdir("/data");
        this.mkdir("/data/saves");
        
        this.FS.writeFile("/home/web_user/retroarch/userdata/retroarch.cfg", this.getRetroArchCfg());
        
        this.FS.mount(IDBFS, {}, '/data/saves');
        this.FS.syncfs(true, () => {});
        
        this.initShaders();
        
        this.EJS.addEventListener(window, "beforeunload", () => {
            this.saveSaveFiles();
            this.FS.syncfs(() => {});
        })
    }
    mkdir(path) {
        try {
            this.FS.mkdir(path);
        } catch(e) {}
    }
    getRetroArchCfg() {
        return "autosave_interval = 60\n" +
               "screenshot_directory = /\n" +
               "block_sram_overwrite = false\n" +
               "video_gpu_screenshot = false\n" +
               "audio_latency = 64\n" +
               "video_top_portrait_viewport = true\n" +
               "video_vsync = true\n" +
               "video_smooth = false\n" +
               "savefile_directory = \"/data/saves\"\n";
    }
    initShaders() {
        if (!window.EJS_SHADERS) return;
        this.mkdir("/shader");
        for (const shader in window.EJS_SHADERS) {
            this.FS.writeFile('/shader/'+shader, window.EJS_SHADERS[shader]);
        }
    }
    restart() {
        this.functions.restart();
    }
    getState() {
        return new Promise(async (resolve, reject) => {
            const stateInfo = (await this.getStateInfo()).split('|')
            let state;
            let size = stateInfo[0] >> 0;
            if (size > 0) {
                state = new Uint8Array(size);
                let start = stateInfo[1] >> 0;
                for (let i=0; i<size; i++) state[i] = this.Module.getValue(start + i);
            }
            resolve(state);
        })
    }
    getStateInfo() {
        this.functions.saveStateInfo();
        return new Promise((resolve, reject) => {
            let a;
            let b = setInterval(() => {
                a = this.functions.getStateInfo();
                if (a) {
                    clearInterval(b);
                    resolve(a);
                }
            }, 50)
        });
    }
    loadState(state) {
        try {
            this.FS.unlink('game.state');
        } catch(e){}
        this.FS.writeFile('/game.state', state);
        this.functions.loadState("game.state", 0);
        setTimeout(() => {
            try {
                this.FS.unlink('game.state');
            } catch(e){}
        }, 5000)
    }
    screenshot() {
        this.functions.screenshot();
        return this.FS.readFile('screenshot.png');
    }
    quickSave(slot) {
        if (!slot) slot = 1;
        (async () => {
            let name = slot + '-quick.state';
            try {
                this.FS.unlink(name);
            } catch (e) {}
            let data = await this.getState();
            this.FS.writeFile('/'+name, data);
        })();
    }
    quickLoad(slot) {
        if (!slot) slot = 1;
        (async () => {
            let name = slot + '-quick.state';
            this.functions.loadState(name, 0);
        })();
    }
    simulateInput(player, index, value) {
        if (this.EJS.isNetplay) {
            this.EJS.netplay.simulateInput(player, index, value);
            return;
        }
        if ([24, 25, 26].includes(index)) {
            if (index === 24 && value === 1) {
                const slot = this.EJS.settings['save-state-slot'] ? this.EJS.settings['save-state-slot'] : "1";
                this.quickSave(slot);
                this.EJS.displayMessage(this.EJS.localization("SAVED STATE TO SLOT")+" "+slot);
            }
            if (index === 25 && value === 1) {
                const slot = this.EJS.settings['save-state-slot'] ? this.EJS.settings['save-state-slot'] : "1";
                this.quickLoad(slot);
                this.EJS.displayMessage(this.EJS.localization("LOADED STATE FROM SLOT")+" "+slot);
            }
            if (index === 26 && value === 1) {
                let newSlot;
                try {
                    newSlot = parseFloat(this.EJS.settings['save-state-slot'] ? this.EJS.settings['save-state-slot'] : "1") + 1;
                } catch(e) {
                    newSlot = 1;
                }
                if (newSlot > 9) newSlot = 1;
                this.EJS.displayMessage(this.EJS.localization("SET SAVE STATE SLOT TO")+" "+newSlot);
                this.EJS.changeSettingOption('save-state-slot', newSlot.toString());
            }
            return;
        }
        this.functions.simulateInput(player, index, value);
    }
    createCueFile(fileNames) {
        try {
            if (fileNames.length > 1) {
                fileNames = fileNames.filter((item) => {
                    return ["toc", "ccd", "exe", "pbp", "chd", "img", "bin"].includes(item.split(".").pop().toLowerCase());
                })
                fileNames = fileNames.sort((a, b) => {
                    if (isNaN(a.charAt()) || isNaN(b.charAt())) throw new Error("Incorrect file name format");
                    return (parseInt(a.charAt()) > parseInt(b.charAt())) ? 1 : -1;
                })
            }
        } catch(e) {
            console.log(e, fileNames);
            if (fileNames.length > 1) {
                console.warn("Could not auto-create cue file(s).");
                return null;
            }
        }
        for (let i=0; i<fileNames.length; i++) {
            if (fileNames[i].split(".").pop().toLowerCase() === "ccd") {
                console.warn("Did not auto-create cue file(s). Found a ccd.");
                return null;
            }
        }
        if (fileNames.length === 0) {
            console.warn("Could not auto-create cue file(s).");
            return null;
        }
        console.log(fileNames);
        let baseFileName = fileNames[0].split("/").pop();
        if (baseFileName.includes(".")) {
            baseFileName = baseFileName.substring(0, baseFileName.length - baseFileName.split(".").pop().length - 1);
            console.log(baseFileName);
        }
        for (let i=0; i<fileNames.length; i++) {
            const contents = " FILE \""+fileNames[i]+"\" BINARY\n  TRACK 01 MODE1/2352\n   INDEX 01 00:00:00";
            FS.writeFile("/"+baseFileName+"-"+i+".cue", contents);
        }
        if (fileNames.length > 1) {
            let contents = "";
            for (let i=0; i<fileNames.length; i++) {
                contents += "/"+baseFileName+"-"+i+".cue\n";
            }
            FS.writeFile("/"+baseFileName+".m3u", contents);
        }
        return (fileNames.length === 1) ? baseFileName+"-0.cue" : baseFileName+".m3u";
    }
    toggleMainLoop(playing) {
        this.functions.toggleMainLoop(playing);
    }
    getCoreOptions() {
        return this.functions.getCoreOptions();
    }
    setVariable(option, value) {
        this.functions.setVariable(option, value);
    }
    setCheat(index, enabled, code) {
        this.functions.setCheat(index, enabled, code);
    }
    resetCheat() {
        this.functions.resetCheat();
    }
    toggleShader(active) {
        this.functions.toggleShader(active);
    }
    getDiskCount() {
        return this.functions.getDiskCount();
    }
    getCurrentDisk() {
        return this.functions.getCurrentDisk();
    }
    setCurrentDisk(disk) {
        this.functions.setCurrentDisk(disk);
    }
    getSaveFilePath() {
        return this.functions.getSaveFilePath();
    }
    saveSaveFiles() {
        this.functions.saveSaveFiles();
        this.FS.syncfs(false, () => {});
    }
    supportsStates() {
        return !!this.functions.supportsStates();
    }
    getSaveFile() {
        this.saveSaveFiles();
        const exists = FS.analyzePath(this.getSaveFilePath()).exists;
        return (exists ? FS.readFile(this.getSaveFilePath()) : null);
    }
    loadSaveFiles() {
        this.functions.loadSaveFiles();
    }
}

window.EJS_GameManager = EJS_GameManager;

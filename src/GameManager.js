class EJS_GameManager {
    constructor(Module) {
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
            getCoreOptions: this.Module.cwrap('get_core_options', 'string', [])
        }
        this.mkdir("/home");
        this.mkdir("/home/web_user");
        this.mkdir("/home/web_user/retroarch");
        this.mkdir("/home/web_user/retroarch/userdata");
        
        this.FS.writeFile("/home/web_user/retroarch/userdata/retroarch.cfg", this.getRetroArchCfg());
    }
    mkdir(path) {
        try {
            this.FS.mkdir(path);
        } catch(e) {}
    }
    getRetroArchCfg() {
        return "\naudio_latency: 256\n";
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
            this.FS.unlink('game.state');
        }, 5000)
    }
    screenshot() {
        this.functions.screenshot();
        return this.FS.readFile('screenshot.png');
    }
    quickSave() {
        (async () => {
            let slot = 0;
            let name = slot + '-quick.state';
            try {
                this.FS.unlink(name);
            } catch (e) {}
            let data = await this.getState();
            this.FS.writeFile('/'+name, data);
        })();
    }
    quickLoad() {
        (async () => {
            let slot = 0;
            let name = slot + '-quick.state';
            this.functions.loadState(name, 0);
        })();
    }
    simulateInput(player, index, value) {
        this.functions.simulateInput(player, index, value);
    }
    toggleMainLoop(playing) {
        this.functions.toggleMainLoop(playing);
    }
    getCoreOptions() {
        return this.functions.getCoreOptions();
    }

}

window.EJS_GameManager = EJS_GameManager;

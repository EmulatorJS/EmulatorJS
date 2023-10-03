class EmulatorJS {
    version = 11; //Increase by 1 when cores are updated
    getCore(generic) {
        const core = this.config.system;
        /*todo:
        Systems: msx
        
        Cores:
        - FreeChaF
        - FreeIntv
        - NeoCD
        - O2EM
        - Vecx
        */
        if (generic) {
            const options = {
                'a5200': 'atari5200',
                'beetle_vb': 'vb',
                'desmume': 'nds',
                'desmume2015': 'nds',
                'fbalpha2012_cps1': 'arcade',
                'fbalpha2012_cps2': 'arcade',
                'fbneo': 'arcade',
                'fceumm': 'nes',
                'gambatte': 'gb',
                'gearcoleco': 'coleco',
                'genesis_plus_gx': 'sega',
                'handy': 'lynx',
                'mame2003': 'mame2003',
                'mame2003_plus': 'mame2003',
                'mednafen_ngp': 'ngp',
                'mednafen_pce': 'pce',
                'mednafen_pcfx': 'pcfx',
                'mednafen_psx_hw': 'psx',
                'mednafen_wswan': 'ws',
                'melonds': 'nds',
                'mgba': 'gba',
                'mupen64plus_next': 'n64',
                'nestopia': 'nes',
                'opera': '3do',
                'parallel_n64': 'n64',
                'pcsx_rearmed': 'psx',
                'picodrive': 'sega',
                'ppsspp': 'psp',
                'prosystem': 'atari7800',
                'snes9x': 'snes',
                'stella2014': 'atari2600',
                'virtualjaguar': 'jaguar',
                'yabause': 'segaSaturn',
                'puae': 'amiga',
                'vice_x64': 'c64'
            }
            return options[core] || core;
        }
        const options = {
            'jaguar': 'virtualjaguar',
            'lynx': 'handy',
            'segaSaturn': 'yabause',
            'segaMS': 'genesis_plus_gx',
            'segaMD': 'genesis_plus_gx',
            'segaGG': 'genesis_plus_gx',
            'segaCD': 'genesis_plus_gx',
            'sega32x': 'picodrive',
            'atari2600': 'stella2014',
            'atari7800': 'prosystem',
            'nes': 'fceumm',
            'snes': 'snes9x',
            'atari5200': 'a5200',
            'gb': 'gambatte',
            'gba': 'mgba',
            'vb': 'beetle_vb',
            'n64': 'mupen64plus_next',
            'nds': 'melonds',
            'mame2003': 'mame2003_plus',
            'arcade': 'fbneo',
            'psx': 'pcsx_rearmed',
            '3do': 'opera',
            'psp': 'ppsspp',
            'pce': 'mednafen_pce',
            'pcfx': 'mednafen_pcfx',
            'ngp': 'mednafen_ngp',
            'ws': 'mednafen_wswan',
            'coleco': 'gearcoleco',
            'amiga': 'puae',
            'c64': 'vice_x64'
        }
        if (this.isSafari && this.isMobile && this.getCore(true) === "n64") {
            return "parallel_n64";
        }
        return options[core] || core;
    }
    extensions = {
        'a5200': ['a52', 'bin'],
        'amiga': ['adf', 'adz', 'dms', 'fdi', 'ipf', 'raw', 'hdf', 'hdz', 'lha', 'slave', 'info', 'cue', 'ccd', 'chd', 'nrg', 'mds', 'iso', 'uae', 'm3u', 'zip', '7z'],
        'desmume': ['nds', 'bin'],
        'desmume2015': ['nds', 'bin'],
        'fbalpha2012_cps1': ['zip'],
        'fbalpha2012_cps2': ['zip'],
        'fbneo': ['zip', '7z'],
        'fceumm': ['fds', 'nes', 'unif', 'unf'],
        'gambatte': ['gb', 'gbc', 'dmg'],
        'gearcoleco': ['col', 'cv', 'bin', 'rom'],
        'genesis_plus_gx': ['m3u', 'mdx', 'md', 'smd', 'gen', 'bin', 'cue', 'iso', 'chd', 'bms', 'sms', 'gg', 'sg', '68k', 'sgd'],
        'handy': ['lnx'],
        'mame2003': ['zip'],
        'mame2003_plus': ['zip'],
        'mednafen_ngp': ['ngp', 'ngc'],
        'mednafen_pce': ['pce', 'cue', 'ccd', 'iso', 'img', 'bin', 'chd'],
        'mednafen_pcfx': ['cue', 'ccd', 'toc', 'chd'],
        'mednafen_psx': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
        'mednafen_wswan': ['ws', 'wsc', 'pc2'],
        'mednafen_psx_hw': ['cue', 'toc', 'm3u', 'ccd', 'exe', 'pbp', 'chd'],
        'beetle_vb': ['vb', 'vboy', 'bin'],
        'melonds': ['nds'],
        'mgba': ['gb', 'gbc', 'gba'],
        'mupen64plus_next': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd', 'gb'],
        'nestopia': ['fds', 'nes', 'unif', 'unf'],
        'opera': ['iso', 'bin', 'chd', 'cue'],
        'parallel_n64': ['n64', 'v64', 'z64', 'bin', 'u1', 'ndd', 'gb'],
        'pcsx_rearmed': ['bin', 'cue', 'img', 'mdf', 'pbp', 'toc', 'cbn', 'm3u', 'ccd'],
        'picodrive': ['bin', 'gen', 'smd', 'md', '32x', 'cue', 'iso', 'sms', '68k', 'chd'],
        'ppsspp': ['elf', 'iso', 'cso', 'prx', 'pbp'],
        'prosystem': ['a78', 'bin'],
        'snes9x': ['smc', 'sfc', 'swc', 'fig', 'bs', 'st'],
        'stella2014': ['a26', 'bin', 'zip'],
        'vice_x64': ['d64', 'd6z', 'd71', 'd7z', 'd80', 'd81', 'd82', 'd8z', 'g64', 'g6z', 'g41', 'g4z', 'x64', 'x6z', 'nib', 'nbz', 'd2m', 'd4m', 't64', 'tap', 'tcrt', 'prg', 'p00', 'crt', 'bin', 'cmd', 'm3u', 'vfl', 'vsf', 'zip', '7z', 'gz', '20', '40', '60', 'a0', 'b0', 'rom'],
        'virtualjaguar': ['j64', 'jag', 'rom', 'abs', 'cof', 'bin', 'prg'],
        'yabause': ['cue', 'iso', 'ccd', 'mds', 'chd', 'zip', 'm3u']
    }
    createElement(type) {
        return document.createElement(type);
    }
    addEventListener(element, listener, callback) {
        const listeners = listener.split(" ");
        let rv = [];
        for (let i=0; i<listeners.length; i++) {
            element.addEventListener(listeners[i], callback);
            const data = {cb:callback, elem:element, listener:listeners[i]};
            rv.push(data);
            this.listeners.push(data);
        }
        return rv;
    }
    removeEventListener(data) {
        for (let i=0; i<data.length; i++) {
            data[i].elem.removeEventListener(data[i].listener, data[i].cb);
        }
    }
    downloadFile(path, cb, progressCB, notWithPath, opts) {
        const data = this.toData(path);//check other data types
        if (data) {
            data.then((game) => {
                if (opts.method === 'HEAD') {
                    cb({headers:{}});
                    return;
                } else {
                    cb({headers:{}, data:game});
                    return;
                }
            })
            return;
        }
        const basePath = notWithPath ? '' : this.config.dataPath;
        path = basePath + path;
        if (!notWithPath && this.config.filePaths) {
            if (typeof this.config.filePaths[path.split('/').pop()] === "string") {
                path = this.config.filePaths[path.split('/').pop()];
            }
        }
        let url;
        try {url=new URL(path)}catch(e){};
        if ((url && ['http:', 'https:'].includes(url.protocol)) || !url) {
            const xhr = new XMLHttpRequest();
            if (progressCB instanceof Function) {
                xhr.addEventListener('progress', (e) => {
                    const progress = e.total ? ' '+Math.floor(e.loaded / e.total * 100).toString()+'%' : ' '+(e.loaded/1048576).toFixed(2)+'MB';
                    progressCB(progress);
                });
            }
            xhr.onload = function() {
                if (xhr.readyState === xhr.DONE) {
                    let data = xhr.response;
                    if (xhr.status.toString().startsWith("4") || xhr.status.toString().startsWith("5")) {
                        cb(-1);
                        return;
                    }
                    try {data=JSON.parse(data)}catch(e){}
                    cb({
                        data: data,
                        headers: {
                            "content-length": xhr.getResponseHeader('content-length')
                        }
                    });
                }
            }
            if (opts.responseType) xhr.responseType = opts.responseType;
            xhr.onerror = () => cb(-1);
            xhr.open(opts.method, path, true);
            xhr.send();
        } else {
            (async () => {
                //Most commonly blob: urls. Not sure what else it could be
                if (opts.method === 'HEAD') {
                    cb({headers:{}});
                    return;
                }
                let res;
                try {
                    res = await fetch(path);
                    if ((opts.type && opts.type.toLowerCase() === 'arraybuffer') || !opts.type) {
                        res = await res.arrayBuffer();
                    } else {
                        res = await res.text();
                        try {res = JSON.parse(res)} catch(e) {}
                    }
                } catch(e) {
                    cb(-1);
                }
                if (path.startsWith('blob:')) URL.revokeObjectURL(path);
                cb({
                    data: res,
                    headers: {}
                });
            })();
        }
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
        fetch('https://raw.githack.com/EmulatorJS/EmulatorJS/main/data/version.json').then(response => {
            if (response.ok) {
                response.text().then(body => {
                    let version = JSON.parse(body);
                    if (this.ejs_num_version < version.current_version) {
                        console.log('Using emulatorjs version ' + this.ejs_num_version + ' but the newest version is ' + version.current_version + '\nopen https://github.com/EmulatorJS/EmulatorJS to update');
                    }
                })
            }
        })
    }
    constructor(element, config) {
        this.ejs_version = "4.0.8";
        this.ejs_num_version = 40.8;
        this.debug = (window.EJS_DEBUG_XX === true);
        if (this.debug || (window.location && ['localhost', '127.0.0.1'].includes(location.hostname))) this.checkForUpdates();
        this.netplayEnabled = (window.EJS_DEBUG_XX === true) && (window.EJS_EXPERIMENTAL_NETPLAY === true);
        this.settingsLanguage = window.EJS_settingsLanguage || false;
        this.config = config;
        this.currentPopup = null;
        this.isFastForward = false;
        this.isSlowMotion = false;
        this.rewindEnabled = this.loadRewindEnabled();
        this.touch = false;
        this.cheats = [];
        this.started = false;
        this.volume = (typeof this.config.volume === "number") ? this.config.volume : 0.5;
        if (this.config.defaultControllers) this.defaultControllers = this.config.defaultControllers;
        this.muted = false;
        this.paused = true;
        this.listeners = [];
        this.missingLang = [];
        this.setElements(element);
        this.setColor(this.config.color || "");
        this.config.alignStartButton = (typeof this.config.alignStartButton === "string") ? this.config.alignStartButton : "bottom";
        this.config.backgroundColor = (typeof this.config.backgroundColor === "string") ? this.config.backgroundColor : "rgb(51, 51, 51)";
        if (this.config.adUrl) {
            this.config.adSize = (Array.isArray(this.config.adSize)) ? this.config.adSize : ["300px", "250px"];
            this.setupAds(this.config.adUrl, this.config.adSize[0], this.config.adSize[1]);
        }
        this.canvas = this.createElement('canvas');
        this.canvas.classList.add('ejs_canvas');
        this.bindListeners();
        this.config.netplayUrl = this.config.netplayUrl || "https://netplay.emulatorjs.org";
        this.fullscreen = false;
        this.isMobile = (function() {
            let check = false;
            (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
            return check;
        })();
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        this.storage = {
            rom: new window.EJS_STORAGE("EmulatorJS-roms", "rom"),
            bios: new window.EJS_STORAGE("EmulatorJS-bios", "bios"),
            core: new window.EJS_STORAGE("EmulatorJS-core", "core"),
            states: new window.EJS_STORAGE("EmulatorJS-states", "states")
        }
        
        this.game.classList.add("ejs_game");
        if (typeof this.config.backgroundImg === "string") {
            this.game.classList.add("ejs_game_background");
            if (this.config.backgroundBlur) this.game.classList.add("ejs_game_background_blur");
            this.game.setAttribute("style", "--ejs-background-image: url("+this.config.backgroundImg+"); --ejs-background-color: "+this.config.backgroundColor+";");
            this.on("start", () => {
                this.game.classList.remove("ejs_game_background");
                if (this.config.backgroundBlur) this.game.classList.remove("ejs_game_background_blur");
            })
        } else {
            this.game.setAttribute("style", "--ejs-background-color: "+this.config.backgroundColor+";");
        }
        
        if (Array.isArray(this.config.cheats)) {
            for (let i=0; i<this.config.cheats.length; i++) {
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
        
        this.createStartButton();
    }
    setColor(color) {
        if (typeof color !== "string") color = "";
        let getColor = function(color) {
            color = color.toLowerCase();
            if (color && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
                if (color.length === 4) {
                    let rv = '#';
                    for (let i=1; i<4; i++) {
                        rv += color.slice(i, i+1)+color.slice(i, i+1);
                    }
                    color = rv;
                }
                let rv = [];
                for (let i=1; i<7; i+=2) {
                    rv.push(parseInt('0x'+color.slice(i, i+2), 16));
                }
                return rv.join(", ");
            }
            return null;
        }
        if (!color || getColor(color) === null) {
            this.elements.parent.setAttribute("style", "--ejs-primary-color: 26,175,255;");
            return;
        }
        this.elements.parent.setAttribute("style", "--ejs-primary-color:" + getColor(color) + ";");
    }
    setupAds(ads, width, height) {
        const div = this.createElement("div");
        const time = (typeof this.config.adMode === "number" && this.config.adMode > -1 && this.config.adMode < 3) ? this.config.adMode : 2;
        div.classList.add("ejs_ad_iframe");
        const frame = this.createElement("iframe");
        frame.src = ads;
        frame.setAttribute("scrolling", "no");
        frame.setAttribute("frameborder", "no");
        frame.style.width = width;
        frame.style.height = height;
        const closeParent = this.createElement("div");
        closeParent.classList.add("ejs_ad_close");
        const closeButton = this.createElement("a");
        closeParent.appendChild(closeButton);
        closeParent.setAttribute("hidden", "");
        div.appendChild(closeParent);
        div.appendChild(frame);
        if (this.config.adMode !== 1) {
            this.elements.parent.appendChild(div);
        }
        this.addEventListener(closeButton, "click", () => {
            div.remove();
        })
        
        this.on("start-clicked", () => {
            if (this.config.adMode === 0) div.remove();
            if (this.config.adMode === 1){
                this.elements.parent.appendChild(div);
            }
        })
        
        this.on("start", () => {
            closeParent.removeAttribute("hidden");
            const time = (typeof this.config.adTimer === "number" && this.config.adTimer > 0) ? this.config.adTimer : 10000;
            if (this.config.adTimer === -1) div.remove();
            if (this.config.adTimer === 0) return;
            setTimeout(() => {
                div.remove();
            }, time);
        })
        
    }
    adBlocked(url, del){
        if (del){
            document.querySelector('div[class="ejs_ad_iframe"]').remove();
        } else {
            try {
                document.querySelector('div[class="ejs_ad_iframe"]').remove();
            } catch(e) {}
            this.config.adUrl = url;
            this.setupAds(this.config.adUrl, this.config.adSize[0], this.config.adSize[1]);
        }
    }
    functions = {};
    on(event, func) {
        if (!Array.isArray(this.functions[event])) this.functions[event] = [];
        this.functions[event].push(func);
    }
    callEvent(event, data) {
        if (!Array.isArray(this.functions[event])) return 0;
        this.functions[event].forEach(e => e(data));
        return this.functions[event].length;
    }
    setElements(element) {
        const game = this.createElement("div");
        const elem = document.querySelector(element);
        elem.innerHTML = "";
        elem.appendChild(game);
        this.game = game;
        
        this.elements = {
            main: this.game,
            parent: elem
        }
        this.elements.parent.classList.add("ejs_parent");
        this.elements.parent.setAttribute("tabindex", -1);
    }
    // Start button
    createStartButton() {
        const button = this.createElement("div");
        button.classList.add("ejs_start_button");
        let border = 0;
        if (typeof this.config.backgroundImg === "string"){
            button.classList.add("ejs_start_button_border");
            border = 1;
        }
        button.innerText = (typeof this.config.startBtnName === 'string') ? this.config.startBtnName : this.localization("Start Game");
        if (this.config.alignStartButton == "top"){
            button.style.bottom = "calc(100% - 20px)";
        }else if (this.config.alignStartButton == "center"){
            button.style.bottom = "calc(50% + 22.5px + "+border+"px)";
        }
        this.elements.parent.appendChild(button);
        this.addEventListener(button, "touchstart", () => {
            this.touch = true;
        })
        this.addEventListener(button, "click", this.startButtonClicked.bind(this));
        if (this.config.startOnLoad === true) {
            this.startButtonClicked(button);
        }
        setTimeout(() => {
            this.callEvent("ready");
        }, 20);
    }
    startButtonClicked(e) {
        this.callEvent("start-clicked");
        if (e.pointerType === "touch") {
            this.touch = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
            e.target.remove();
        } else {
            e.remove();
        }
        this.createText();
        this.downloadGameCore();
    }
    // End start button
    createText() {
        this.textElem = this.createElement("div");
        this.textElem.classList.add("ejs_loading_text");
        if (typeof this.config.backgroundImg === "string") this.textElem.classList.add("ejs_loading_text_glow");
        this.textElem.innerText = this.localization("Loading...");
        this.elements.parent.appendChild(this.textElem);
    }
    localization(text, log) {
        if (typeof text === "undefined") return;
        text = text.toString();
        if (text.includes("EmulatorJS v")) return text;
        if (this.config.langJson) {
            if (typeof log === "undefined") log = true;
            if (!this.config.langJson[text] && log) {
                if (!this.missingLang.includes(text)) this.missingLang.push(text);
                console.log("Translation not found for '"+text+"'. Language set to '"+this.config.language+"'");
            }
            return this.config.langJson[text] || text;
        }
        return text;
    }
    checkCompression(data, msg, fileCbFunc) {
        if (msg) {
            this.textElem.innerText = msg;
        }
        //to be put in another file
        function isCompressed(data) { //https://www.garykessler.net/library/file_sigs.html
            //todo. Use hex instead of numbers
            if ((data[0] === 80 && data[1] === 75) && ((data[2] === 3 && data[3] === 4) || (data[2] === 5 && data[3] === 6) || (data[2] === 7 && data[3] === 8))) {
                return 'zip';
            } else if (data[0] === 55 && data[1] === 122 && data[2] === 188 && data[3] === 175 && data[4] === 39 && data[5] === 28) {
                return '7z';
            } else if ((data[0] === 82 && data[1] === 97 && data[2] === 114 && data[3] === 33 && data[4] === 26 && data[5] === 7) && ((data[6] === 0) || (data[6] === 1 && data[7] == 0))) {
                return 'rar';
            }
        }
        const createWorker = (path) => {
            return new Promise((resolve, reject) => {
                this.downloadFile(path, (res) => {
                    if (res === -1) {
                        this.textElem.innerText = this.localization('Network Error');
                        this.textElem.style.color = "red";
                        return;
                    }
                    const blob = new Blob([res.data], {
                        'type': 'application/javascript'
                    })
                    const url = window.URL.createObjectURL(blob);
                    resolve(new Worker(url));
                }, null, false, {responseType: "arraybuffer", method: "GET"});
            })
        }
        const files = {};
        let res;
        const onMessage = (data) => {
            if (!data.data) return;
            //data.data.t/ 4=progress, 2 is file, 1 is zip done
            if (data.data.t === 4 && msg) {
                const pg = data.data;
                const num = Math.floor(pg.current / pg.total * 100);
                if (isNaN(num)) return;
                const progress = ' '+num.toString()+'%';
                this.textElem.innerText = msg + progress;
            }
            if (data.data.t === 2) {
                if (typeof fileCbFunc === "function") {
                    fileCbFunc(data.data.file, data.data.data);
                    files[data.data.file] = true;
                } else {
                    files[data.data.file] = data.data.data;
                }
            }
            if (data.data.t === 1) {
                res(files);
            }
        }
        const decompress7z = (file) => {
            return new Promise((resolve, reject) => {
                res = resolve;
                
                createWorker('compression/extract7z.js').then((worker) => {
                    worker.onmessage = onMessage;
                    worker.postMessage(file);
                    //console.log(file);
                })
            })
        }
        const decompressRar = (file) => {
            return new Promise((resolve, reject) => {
                res = resolve;
                
                this.downloadFile("compression/libunrar.js", (res) => {
                    this.downloadFile("compression/libunrar.wasm", (res2) => {
                        if (res === -1 || res2 === -1) {
                            this.textElem.innerText = this.localization('Network Error');
                            this.textElem.style.color = "red";
                            return;
                        }
                        const path = URL.createObjectURL(new Blob([res2.data], {type: "application/wasm"}));
                        let data = '\nlet dataToPass = [];\nModule = {\n    monitorRunDependencies: function(left)  {\n        if (left == 0) {\n            setTimeout(function() {\n                unrar(dataToPass, null);\n            }, 100);\n        }\n    },\n    onRuntimeInitialized: function() {\n    },\n    locateFile: function(file) {\n        return \''+path+'\';\n    }\n};\n'+res.data+'\nlet unrar = function(data, password) {\n    let cb = function(fileName, fileSize, progress) {\n        postMessage({"t":4,"current":progress,"total":fileSize, "name": fileName});\n    };\n\n    let rarContent = readRARContent(data.map(function(d) {\n        return {\n            name: d.name,\n            content: new Uint8Array(d.content)\n        }\n    }), password, cb)\n    let rec = function(entry) {\n        if (!entry) return;\n        if (entry.type === \'file\') {\n            postMessage({"t":2,"file":entry.fullFileName,"size":entry.fileSize,"data":entry.fileContent});\n        } else if (entry.type === \'dir\') {\n            Object.keys(entry.ls).forEach(function(k) {\n                rec(entry.ls[k]);\n            })\n        } else {\n            throw "Unknown type";\n        }\n    }\n    rec(rarContent);\n    postMessage({"t":1});\n    return rarContent;\n};\nonmessage = function(data) {\n    dataToPass.push({name:  \'test.rar\', content: data.data});\n};\n                ';
                        const blob = new Blob([data], {
                            'type': 'application/javascript'
                        })
                        const url = window.URL.createObjectURL(blob);
                        const worker = new Worker(url);
                        worker.onmessage = onMessage;
                        worker.postMessage(file);
                    }, null, false, {responseType: "arraybuffer", method: "GET"})
                }, null, false, {responseType: "text", method: "GET"});
                
            })
        }
        const decompressZip = (file) => {
            return new Promise((resolve, reject) => {
                res = resolve;
                
                createWorker('compression/extractzip.js').then((worker) => {
                    worker.onmessage = onMessage;
                    worker.postMessage(file);
                })
            })
        }
        const compression = isCompressed(data.slice(0, 10));
        if (compression) {
            //Need to do zip and rar still
            if (compression === "7z") {
                return decompress7z(data);
            } else if (compression === "zip") {
                return decompressZip(data);
            } else if (compression === "rar") {
                return decompressRar(data);
            }
        } else {
            if (typeof fileCbFunc === "function") {
                fileCbFunc("!!notCompressedData", data);
                return new Promise(resolve => resolve({"!!notCompressedData": true}));
            } else {
                return new Promise(resolve => resolve({"!!notCompressedData": data}));
            }
        }
        
    }
    downloadGameCore() {
        this.textElem.innerText = this.localization("Download Game Core");
        if (this.config.threads && ((typeof window.SharedArrayBuffer) !== "function")) {
            this.textElem.innerText = this.localization('Error for site owner')+"\n"+this.localization("Check console");
            this.textElem.style.color = "red";
            console.warn("Threads is set to true, but the SharedArrayBuffer function is not exposed. Threads requires 2 headers to be set when sending you html page. See https://stackoverflow.com/a/68630724");
            return;
        }
        const gotCore = (data) => {
            this.checkCompression(new Uint8Array(data), this.localization("Decompress Game Core")).then((data) => {
                let js, thread, wasm;
                for (let k in data) {
                    if (k.endsWith(".wasm")) {
                        wasm = data[k];
                    } else if (k.endsWith(".worker.js")) {
                        thread = data[k];
                    } else if (k.endsWith(".js")) {
                        js = data[k];
                    }
                }
                this.initGameCore(js, wasm, thread);
            });
        }
        this.storage.core.get(this.getCore()+'-wasm.data').then((result) => {
            if (result && result.version === this.version && !this.debug) {
                gotCore(result.data);
                return;
            }
            let corePath = 'cores/'+this.getCore()+(this.config.threads ? "-thread" : "")+'-wasm.data';
            this.downloadFile(corePath, (res) => {
                if (res === -1) {
                    this.textElem.innerText = this.localization('Network Error');
                    this.textElem.style.color = "red";
                    return;
                }
                gotCore(res.data);
                this.storage.core.put(this.getCore()+'-wasm.data', {
                    version: this.version,
                    data: res.data
                });
            }, (progress) => {
                this.textElem.innerText = this.localization("Download Game Core") + progress;
            }, false, {responseType: "arraybuffer", method: "GET"});
        })
    }
    initGameCore(js, wasm, thread) {
        this.initModule(wasm, thread);
        let script = this.createElement("script");
        script.src = URL.createObjectURL(new Blob([js], {type: "application/javascript"}));
        document.body.appendChild(script);
    }
    getBaseFileName() {
        //Only once game and core is loaded
        if (!this.started) return null;
        if (typeof this.config.gameName === "string") {
            const invalidCharacters = /[#<$+%>!`&*'|{}/\\?"=@:^\r\n]/ig;
            const name = this.config.gameName.replace(invalidCharacters, "").trim();
            if (name) return name;
        }
        let parts = this.fileName.split(".");
        parts.splice(parts.length-1, 1);
        return parts.join(".");
    }
    saveInBrowserSupported() {
        return !!window.indexedDB && (typeof this.config.gameName === "string" || !this.config.gameUrl.startsWith("blob:"));
    }
    displayMessage(message) {
        if (!this.msgElem) {
            this.msgElem = this.createElement("div");
            this.msgElem.classList.add("ejs_message");
            this.elements.parent.appendChild(this.msgElem);
        }
        clearTimeout(this.msgTimeout);
        this.msgTimeout = setTimeout(() => {
            this.msgElem.innerText = "";
        }, 3000)
        this.msgElem.innerText = message;
    }
    downloadStartState() {
        return new Promise((resolve, reject) => {
            if (typeof this.config.loadState !== "string" && !this.toData(this.config.loadState, true)) {
                resolve();
                return;
            }
            this.textElem.innerText = this.localization("Download Game State");
            
            this.downloadFile(this.config.loadState, (res) => {
                if (res === -1) {
                    this.textElem.innerText = this.localization('Network Error');
                    this.textElem.style.color = "red";
                    return;
                }
                this.on("start", () => {
                    setTimeout(() => {
                        this.gameManager.loadState(new Uint8Array(res.data));
                    }, 10);
                })
                resolve();
            }, (progress) => {
                this.textElem.innerText = this.localization("Download Game State") + progress;
            }, true, {responseType: "arraybuffer", method: "GET"});
        })
    }
    downloadGamePatch() {
        return new Promise((resolve, reject) => {
            if ((typeof this.config.gamePatchUrl !== "string" || !this.config.gamePatchUrl.trim()) && !this.toData(this.config.gamePatchUrl, true)) {
                resolve();
                return;
            }
            this.textElem.innerText = this.localization("Download Game Patch");
            const gotData = (data) => {
                this.checkCompression(new Uint8Array(data), this.localization("Decompress Game Patch")).then((data) => {
                    for (const k in data) {
                        if (k === "!!notCompressedData") {
                            FS.writeFile(this.config.gamePatchUrl.split('/').pop().split("#")[0].split("?")[0], data[k]);
                            break;
                        }
                        if (k.endsWith('/')) continue;
                        FS.writeFile("/" + k.split('/').pop(), data[k]);
                    }
                    resolve();
                })
            }
            
            this.downloadFile(this.config.gamePatchUrl, (res) => {
                this.storage.rom.get(this.config.gamePatchUrl.split("/").pop()).then((result) => {
                    if (result && result['content-length'] === res.headers['content-length'] && !this.debug) {
                        gotData(result.data);
                        return;
                    }
                    this.downloadFile(this.config.gamePatchUrl, (res) => {
                        if (res === -1) {
                            this.textElem.innerText = this.localization('Network Error');
                            this.textElem.style.color = "red";
                            return;
                        }
                        if (this.toData(this.config.gamePatchUrl, true)) {
                            this.config.gamePatchUrl = "game";
                        }
                        gotData(res.data);
                        const limit = (typeof this.config.cacheLimit === "number") ? this.config.cacheLimit : 1073741824;
                        if (parseFloat(res.headers['content-length']) < limit && this.saveInBrowserSupported() && this.config.gamePatchUrl !== "game") {
                            this.storage.rom.put(this.config.gamePatchUrl.split("/").pop(), {
                                "content-length": res.headers['content-length'],
                                data: res.data
                            })
                        }
                    }, (progress) => {
                        this.textElem.innerText = this.localization("Download Game Patch") + progress;
                    }, true, {responseType: "arraybuffer", method: "GET"});
                })
            }, null, true, {method: "HEAD"})
        })
    }
    downloadGameParent() {
        return new Promise((resolve, reject) => {
            if ((typeof this.config.gameParentUrl !== "string" || !this.config.gameParentUrl.trim()) && !this.toData(this.config.gameParentUrl, true)) {
                resolve();
                return;
            }
            this.textElem.innerText = this.localization("Download Game Parent");
            const gotData = (data) => {
                this.checkCompression(new Uint8Array(data), this.localization("Decompress Game Parent")).then((data) => {
                    for (const k in data) {
                        if (k === "!!notCompressedData") {
                            FS.writeFile(this.config.gameParentUrl.split('/').pop().split("#")[0].split("?")[0], data[k]);
                            break;
                        }
                        if (k.endsWith('/')) continue;
                        FS.writeFile("/" + k.split('/').pop(), data[k]);
                    }
                    resolve();
                })
            }
            
            this.downloadFile(this.config.gameParentUrl, (res) => {
                this.storage.rom.get(this.config.gameParentUrl.split("/").pop()).then((result) => {
                    if (result && result['content-length'] === res.headers['content-length'] && !this.debug) {
                        gotData(result.data);
                        return;
                    }
                    this.downloadFile(this.config.gameParentUrl, (res) => {
                        if (res === -1) {
                            this.textElem.innerText = this.localization('Network Error');
                            this.textElem.style.color = "red";
                            return;
                        }
                        if (this.toData(this.config.gameParentUrl, true)) {
                            this.config.gameParentUrl = "game";
                        }
                        gotData(res.data);
                        const limit = (typeof this.config.cacheLimit === "number") ? this.config.cacheLimit : 1073741824;
                        if (parseFloat(res.headers['content-length']) < limit && this.saveInBrowserSupported() && this.config.gameParentUrl !== "game") {
                            this.storage.rom.put(this.config.gameParentUrl.split("/").pop(), {
                                "content-length": res.headers['content-length'],
                                data: res.data
                            })
                        }
                    }, (progress) => {
                        this.textElem.innerText = this.localization("Download Game Parent") + progress;
                    }, true, {responseType: "arraybuffer", method: "GET"});
                })
            }, null, true, {method: "HEAD"})
        })
    }
    downloadBios() {
        return new Promise((resolve, reject) => {
            if ((typeof this.config.biosUrl !== "string" || !this.config.biosUrl.trim()) && !this.toData(this.config.biosUrl, true)) {
                resolve();
                return;
            }
            this.textElem.innerText = this.localization("Download Game BIOS");
            const gotBios = (data) => {
                this.checkCompression(new Uint8Array(data), this.localization("Decompress Game BIOS")).then((data) => {
                    for (const k in data) {
                        if (k === "!!notCompressedData") {
                            FS.writeFile(this.config.biosUrl.split('/').pop().split("#")[0].split("?")[0], data[k]);
                            break;
                        }
                        if (k.endsWith('/')) continue;
                        FS.writeFile("/" + k.split('/').pop(), data[k]);
                    }
                    resolve();
                })
            }
            
            this.downloadFile(this.config.biosUrl, (res) => {
                if (res === -1) {
                    this.textElem.innerText = this.localization('Network Error');
                    this.textElem.style.color = "red";
                    return;
                }
                this.storage.bios.get(this.config.biosUrl.split("/").pop()).then((result) => {
                    if (result && result['content-length'] === res.headers['content-length'] && !this.debug) {
                        gotBios(result.data);
                        return;
                    }
                    this.downloadFile(this.config.biosUrl, (res) => {
                        if (res === -1) {
                            this.textElem.innerText = this.localization('Network Error');
                            this.textElem.style.color = "red";
                            return;
                        }
                        if (this.toData(this.config.biosUrl, true)) {
                            this.config.biosUrl = "game";
                        }
                        gotBios(res.data);
                        if (this.saveInBrowserSupported() && this.config.biosUrl !== "game") {
                            this.storage.bios.put(this.config.biosUrl.split("/").pop(), {
                                "content-length": res.headers['content-length'],
                                data: res.data
                            })
                        }
                    }, (progress) => {
                        this.textElem.innerText = this.localization("Download Game BIOS") + progress;
                    }, true, {responseType: "arraybuffer", method: "GET"});
                })
            }, null, true, {method: "HEAD"})
        })
    }
    downloadRom() {
        const extractFileNameFromUrl = url => {
            if (!url) return null;
            return url.split('/').pop().split("#")[0].split("?")[0];
        };
        const supportsExt = (ext) => {
            const core = this.getCore();
            if (!this.extensions[core]) return false;
            return this.extensions[core].includes(ext);
        };

        return new Promise(resolve => {
            this.textElem.innerText = this.localization("Download Game Data");

            const gotGameData = (data) => {
                if (['arcade', 'mame2003'].includes(this.getCore(true))) {
                    this.fileName = extractFileNameFromUrl(this.config.gameUrl);
                    FS.writeFile(this.fileName, new Uint8Array(data));
                    resolve();
                    return;
                }

                const altName = this.config.gameUrl.startsWith("blob:") ? (this.config.gameName || "game") : extractFileNameFromUrl(this.config.gameUrl);

                let disableCue = false;
                if (['pcsx_rearmed', 'genesis_plus_gx', 'picodrive', 'mednafen_pce', 'vice_x64'].includes(this.getCore()) && this.config.disableCue === undefined) {
                    disableCue = true;
                } else {
                    disableCue = this.config.disableCue;
                }

                let fileNames = [];
                this.checkCompression(new Uint8Array(data), this.localization("Decompress Game Data"), (fileName, fileData) => {
                    if (fileName.includes("/")) {
                        const paths = fileName.split("/");
                        let cp = "";
                        for (let i=0; i<paths.length-1; i++) {
                            if (paths[i] === "") continue;
                            cp += `/${paths[i]}`;
                            if (!FS.analyzePath(cp).exists) {
                                FS.mkdir(cp);
                            }
                        }
                    }
                    if (fileName.endsWith('/')) {
                        FS.mkdir(fileName);
                        return;
                    }
                    if (fileName === "!!notCompressedData") {
                        FS.writeFile(altName, fileData);
                        fileNames.push(altName);
                    } else {
                        FS.writeFile(`/${fileName}`, fileData);
                        fileNames.push(fileName);
                    }
                }).then(() => {
                    let isoFile = null;
                    let supportedFile = null;
                    let cueFile = null;
                    let selectedCueExt = null;
                    fileNames.forEach(fileName => {
                        const ext = fileName.split('.').pop().toLowerCase();
                        if (supportedFile === null && supportsExt(ext)) {
                            supportedFile = fileName;
                        }
                        if (isoFile === null && ['iso', 'cso', 'chd', 'elf'].includes(ext)) {
                            isoFile = fileName;
                        }
                        if (['cue', 'ccd', 'toc', 'm3u'].includes(ext)) {
                            if (this.getCore(true) === 'psx') {
                                //always prefer m3u files for psx cores
                                if (selectedCueExt !== 'm3u') {
                                    if (cueFile === null || ext === 'm3u') {
                                        cueFile = fileName;
                                        selectedCueExt = ext;
                                    }
                                }
                            } else {
                                //prefer cue or ccd files over toc or m3u
                                if (!['cue', 'ccd'].includes(selectedCueExt)) {
                                    if (cueFile === null || ['cue', 'ccd'].includes(ext)) {
                                        cueFile = fileName;
                                        selectedCueExt = ext;
                                    }
                                }
                            }
                        }
                    });
                    if (supportedFile !== null) {
                        this.fileName = supportedFile;
                    } else {
                        this.fileName = fileNames[0];
                    }
                    if (isoFile !== null && (supportsExt('iso') || supportsExt('cso') || supportsExt('chd') || supportsExt('elf'))) {
                        this.fileName = isoFile;
                    } else if (supportsExt('cue') || supportsExt('ccd') || supportsExt('toc') || supportsExt('m3u')) {
                        if (cueFile !== null) {
                            this.fileName = cueFile;
                        } else if (!disableCue) {
                            this.fileName = this.gameManager.createCueFile(fileNames);
                        }
                    }
                    resolve();
                });
            }
            
            this.downloadFile(this.config.gameUrl, (res) => {
                if (res === -1) {
                    this.textElem.innerText = this.localization('Network Error');
                    this.textElem.style.color = "red";
                    return;
                }
                const name = (typeof this.config.gameUrl === "string") ? this.config.gameUrl.split('/').pop() : "game";
                this.storage.rom.get(name).then((result) => {
                    if (result && result['content-length'] === res.headers['content-length'] && !this.debug && name !== "game") {
                        gotGameData(result.data);
                        return;
                    }
                    this.downloadFile(this.config.gameUrl, (res) => {
                        if (res === -1) {
                            this.textElem.innerText = this.localization('Network Error');
                            this.textElem.style.color = "red";
                            return;
                        }
                        if (this.toData(this.config.gameUrl, true)) {
                            this.config.gameUrl = "game";
                        }
                        gotGameData(res.data);
                        const limit = (typeof this.config.cacheLimit === "number") ? this.config.cacheLimit : 1073741824;
                        if (parseFloat(res.headers['content-length']) < limit && this.saveInBrowserSupported() && this.config.gameUrl !== "game") {
                            this.storage.rom.put(this.config.gameUrl.split("/").pop(), {
                                "content-length": res.headers['content-length'],
                                data: res.data
                            })
                        }
                    }, (progress) => {
                        this.textElem.innerText = this.localization("Download Game Data") + progress;
                    }, true, {responseType: "arraybuffer", method: "GET"});
                })
            }, null, true, {method: "HEAD"})
        })
    }
    downloadFiles() {
        (async () => {
            this.gameManager = new window.EJS_GameManager(this.Module, this);
            if (this.getCore() === "ppsspp") {
                await this.gameManager.loadPpssppAssets();
            }
            await this.downloadRom();
            await this.downloadBios();
            await this.downloadStartState();
            await this.downloadGameParent();
            await this.downloadGamePatch();
            this.startGame();
        })();
    }
    initModule(wasmData, threadData) {
        window.Module = {
            'noInitialRun': true,
            'onRuntimeInitialized': this.downloadFiles.bind(this),
            'arguments': [],
            'preRun': [],
            'postRun': [],
            'canvas': this.canvas,
            'print': (msg) => {
                if (this.debug) {
                    console.log(msg);
                }
            },
            'printErr': (msg) => {
                if (this.debug) {
                    console.log(msg);
                }
            },
            'totalDependencies': 0,
            'monitorRunDependencies': () => {},
            'locateFile': function(fileName) {
                if (this.debug) console.log(fileName);
                if (fileName.endsWith(".wasm")) {
                    return URL.createObjectURL(new Blob([wasmData], {type: "application/wasm"}));
                } else if (fileName.endsWith(".worker.js")) {
                    return URL.createObjectURL(new Blob([threadData], {type: "application/javascript"}));
                }
            }
        };
        this.Module = window.Module;
    }
    startGame() {
        try {
            const args = [];
            if (this.debug) args.push('-v');
            args.push('/'+this.fileName);
            if (this.debug) console.log(args);
            this.Module.callMain(args);
            if (typeof this.config.softLoad === "number" && this.config.softLoad > 0) {
                this.resetTimeout = setTimeout(() => {
                    this.gameManager.restart();
                }, this.config.softLoad * 1000);
            }
            this.Module.resumeMainLoop();
            this.checkSupportedOpts();
            this.setupSettingsMenu();
            this.loadSettings();
            this.updateCheatUI();
            this.updateGamepadLabels();
            if (!this.muted) this.setVolume(this.volume);
            this.elements.parent.focus();
            this.textElem.remove();
            this.textElem = null;
            this.game.classList.remove("ejs_game");
            this.game.appendChild(this.canvas);
            this.handleResize();
            this.started = true;
            this.paused = false;
            if (this.touch) {
                this.virtualGamepad.style.display = "";
            }
            this.handleResize();
            if (this.config.fullscreenOnLoad) {
                try {
                    this.toggleFullscreen(true);
                } catch(e) {
                    if (this.debug) console.warn("Could not fullscreen on load");
                }
            }
            if (this.isSafari && this.isMobile) {
                //Safari is --- funny
                this.checkStarted();
            }
        } catch(e) {
            console.warn("failed to start game", e);
            this.textElem.innerText = this.localization("Failed to start game");
            this.textElem.style.color = "red";
            return;
        }
        this.callEvent("start");
    }
    checkStarted() {
        (async() => {
            let sleep = (ms) => new Promise(r => setTimeout(r, ms));
            let state = "suspended";
            let popup;
            while (state === "suspended") {
                if (!window.AL) return;
                window.AL.currentCtx.sources.forEach(ctx => {
                    state = ctx.gain.context.state;
                });
                if (state !== "suspended") break;
                if (!popup) {
                    popup = this.createPopup("", {});
                    const button = this.createElement("button");
                    button.innerText = "Click to resume Emulator";
                    button.classList.add("ejs_menu_button");
                    button.style.width = "25%";
                    button.style.height = "25%";
                    popup.appendChild(button);
                    popup.style["text-align"] = "center";
                    popup.style["font-size"] = "28px";
                }
                await sleep(10);
            }
            if (popup) this.closePopup();
        })();
    }
    bindListeners() {
        this.createContextMenu();
        this.createBottomMenuBar();
        this.createControlSettingMenu();
        this.createCheatsMenu()
        this.createNetplayMenu();
        this.setVirtualGamepad();
        this.addEventListener(this.elements.parent, "keydown keyup", this.keyChange.bind(this));
        this.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (document.activeElement !== this.elements.parent) this.elements.parent.focus();
        })
        this.addEventListener(window, "resize", this.handleResize.bind(this));
        //this.addEventListener(window, "blur", e => console.log(e), true); //TODO - add "click to make keyboard keys work" message?
        
        let counter = 0;
        this.elements.statePopupPanel = this.createPopup("", {}, true);
        this.elements.statePopupPanel.innerText = "Drop save state here to load";
        this.elements.statePopupPanel.style["text-align"] = "center";
        this.elements.statePopupPanel.style["font-size"] = "28px";
        this.addEventListener(this.elements.parent, "dragenter", (e) => {
            e.preventDefault();
            if (!this.started) return;
            counter++;
            this.elements.statePopupPanel.parentElement.style.display = "block";
        });
        this.addEventListener(this.elements.parent, "dragover", (e) => {
            e.preventDefault();
        });
        this.addEventListener(this.elements.parent, "dragleave", (e) => {
            e.preventDefault();
            if (!this.started) return;
            counter--;
            if (counter === 0) {
                this.elements.statePopupPanel.parentElement.style.display = "none";
            }
        });
        this.addEventListener(this.elements.parent, "dragend", (e) => {
            e.preventDefault();
            if (!this.started) return;
            counter = 0;
            this.elements.statePopupPanel.parentElement.style.display = "none";
        });
        this.addEventListener(this.elements.parent, "drop", (e) => {
            e.preventDefault();
            if (!this.started) return;
            this.elements.statePopupPanel.parentElement.style.display = "none";
            counter = 0;
            const items = e.dataTransfer.items;
            let file;
            for (let i=0; i<items.length; i++) {
                if (items[i].kind !== 'file') continue;
                file = items[i];
                break;
            }
            if (!file) return;
            const fileHandle = file.getAsFile();
            fileHandle.arrayBuffer().then(data => {
                this.gameManager.loadState(new Uint8Array(data));
            })
        });
        
        this.gamepad = new GamepadHandler(); //https://github.com/ethanaobrien/Gamepad
        this.gamepad.on('connected', (e) => {
            if (!this.gamepadLabels) return;
            this.updateGamepadLabels();
        })
        this.gamepad.on('disconnected', (e) => {
            setTimeout(this.updateGamepadLabels.bind(this), 10);
        })
        this.gamepad.on('axischanged', this.gamepadEvent.bind(this));
        this.gamepad.on('buttondown', this.gamepadEvent.bind(this));
        this.gamepad.on('buttonup', this.gamepadEvent.bind(this));
    }
    checkSupportedOpts() {
        if (!this.gameManager.supportsStates()) {
            this.elements.bottomBar.saveState[0].style.display = "none";
            this.elements.bottomBar.loadState[0].style.display = "none";
            this.elements.bottomBar.netplay[0].style.display = "none";
            this.elements.contextMenu.save.style.display = "none";
            this.elements.contextMenu.load.style.display = "none";
        }
        if (typeof this.config.gameId !== "number" || !this.config.netplayUrl || this.netplayEnabled === false) {
            this.elements.bottomBar.netplay[0].style.display = "none";
        }
    }
    updateGamepadLabels() {
        for (let i=0; i<this.gamepadLabels.length; i++) {
            if (this.gamepad.gamepads[i]) {
                this.gamepadLabels[i].innerText = this.gamepad.gamepads[i].id;
            } else {
                this.gamepadLabels[i].innerText = "n/a";
            }
        }
    }
    createContextMenu() {
        this.elements.contextmenu = this.createElement('div');
        this.elements.contextmenu.classList.add("ejs_context_menu");
        this.addEventListener(this.game, 'contextmenu', (e) => {
            if (this.started) {
                this.elements.contextmenu.style.display = "block";
                this.elements.contextmenu.style.left = e.offsetX+"px";
                this.elements.contextmenu.style.top = e.offsetY+"px";
            }
            e.preventDefault();
        })
        const hideMenu = () => {
            this.elements.contextmenu.style.display = "none";
        }
        this.addEventListener(this.elements.contextmenu, 'contextmenu', (e) => e.preventDefault());
        this.addEventListener(this.elements.parent, 'contextmenu', (e) => e.preventDefault());
        this.addEventListener(this.game, 'mousedown', hideMenu);
        const parent = this.createElement("ul");
        const addButton = (title, hidden, functi0n) => {
            //<li><a href="#" onclick="return false">'+title+'</a></li>
            const li = this.createElement("li");
            if (hidden) li.hidden = true;
            const a = this.createElement("a");
            if (functi0n instanceof Function) {
                this.addEventListener(li, 'click', (e) => {
                    e.preventDefault();
                    functi0n();
                });
            }
            a.href = "#";
            a.onclick = "return false";
            a.innerText = this.localization(title);
            li.appendChild(a);
            parent.appendChild(li);
            hideMenu();
            return li;
        }
        let screenshotUrl;
        const screenshot = addButton("Take Screenshot", false, () => {
            if (screenshotUrl) URL.revokeObjectURL(screenshotUrl);
            const screenshot = this.gameManager.screenshot();
            const blob = new Blob([screenshot]);
            screenshotUrl = URL.createObjectURL(blob);
            const a = this.createElement("a");
            a.href = screenshotUrl;
            const date = new Date();
            a.download = this.getBaseFileName()+"-"+date.getMonth()+"-"+date.getDate()+"-"+date.getFullYear()+".png";
            a.click();
            hideMenu();
        });
        const qSave = addButton("Quick Save", false, () => {
            const slot = this.settings['save-state-slot'] ? this.settings['save-state-slot'] : "1";
            this.gameManager.quickSave(slot);
            this.displayMessage(this.localization("SAVED STATE TO SLOT")+" "+slot);
            hideMenu();
        });
        const qLoad = addButton("Quick Load", false, () => {
            const slot = this.settings['save-state-slot'] ? this.settings['save-state-slot'] : "1";
            this.gameManager.quickLoad(slot);
            this.displayMessage(this.localization("LOADED STATE FROM SLOT")+" "+slot);
            hideMenu();
        });
        this.elements.contextMenu = {
            screenshot: screenshot,
            save: qSave,
            load: qLoad
        }
        addButton("EmulatorJS v"+this.ejs_version, false, () => {
            hideMenu();
            const body = this.createPopup("EmulatorJS", {
                "Close": () => {
                    this.closePopup();
                }
            });
            
            const menu = this.createElement('div');
            menu.classList.add("ejs_list_selector");
            const parent = this.createElement("ul");
            const addButton = (title, hidden, functi0n) => {
                const li = this.createElement("li");
                if (hidden) li.hidden = true;
                const a = this.createElement("a");
                if (functi0n instanceof Function) {
                    this.addEventListener(li, 'click', (e) => {
                        e.preventDefault();
                        functi0n();
                    });
                }
                a.href = "#";
                a.onclick = "return false";
                a.innerText = this.localization(title);
                li.appendChild(a);
                parent.appendChild(li);
                hideMenu();
                return li;
            }
            //body.style["padding-left"] = "20%";
            const home = this.createElement("div");
            const license = this.createElement("div");
            license.style.display = "none";
            const retroarch = this.createElement("div");
            retroarch.style.display = "none";
            body.appendChild(home);
            body.appendChild(license);
            body.appendChild(retroarch);
            
            let current = home;
            home.innerText = "EmulatorJS v"+this.ejs_version;
            home.appendChild(this.createElement("br"));
            home.appendChild(this.createElement("br"));
            const gh = this.createElement("a");
            gh.href = "https://github.com/EmulatorJS/EmulatorJS";
            gh.target = "_blank";
            gh.innerText = this.localization("View on GitHub");
            home.appendChild(gh);
            home.appendChild(this.createElement("br"));
            const dc = this.createElement("a");
            dc.href = "https://discord.gg/6akryGkETU";
            dc.target = "_blank";
            dc.innerText = this.localization("Join the discord");
            home.appendChild(dc);
            home.appendChild(this.createElement("br"));
            menu.appendChild(parent);
            body.appendChild(menu);
            const setElem = (element) => {
                if (current === element) return;
                if (current) {
                    current.style.display = "none";
                }
                current = element;
                element.style.display = "";
            }
            addButton("Home", false, () => {
                setElem(home);
            })
            addButton("EmulatorJS License", false, () => {
                setElem(license);
            })
            addButton("RetroArch License", false, () => {
                setElem(retroarch);
            })
            //Todo - Core specific licenses, contributors.
            
            retroarch.innerText = "This project is powered by ";
            const a = this.createElement("a");
            a.href = "https://github.com/libretro/RetroArch";
            a.target = "_blank";
            a.innerText = "RetroArch";
            retroarch.appendChild(a);
            const licenseLink = this.createElement("a");
            licenseLink.target = "_blank";
            licenseLink.href = "https://github.com/libretro/RetroArch/blob/master/COPYING";
            licenseLink.innerText = "View the RetroArch license here.";
            a.appendChild(this.createElement("br"));
            a.appendChild(licenseLink);
            
            license.style['text-align'] = "center";
            license.style['padding'] = "10px";
            //license.style["white-space"] = "pre-wrap";
            license.innerText = '                    GNU GENERAL PUBLIC LICENSE\n                       Version 3, 29 June 2007\n\n Copyright (C) 2007 Free Software Foundation, Inc. <https://fsf.org/>\n Everyone is permitted to copy and distribute verbatim copies\n of this license document, but changing it is not allowed.\n\n                            Preamble\n\n  The GNU General Public License is a free, copyleft license for\nsoftware and other kinds of works.\n\n  The licenses for most software and other practical works are designed\nto take away your freedom to share and change the works.  By contrast,\nthe GNU General Public License is intended to guarantee your freedom to\nshare and change all versions of a program--to make sure it remains free\nsoftware for all its users.  We, the Free Software Foundation, use the\nGNU General Public License for most of our software; it applies also to\nany other work released this way by its authors.  You can apply it to\nyour programs, too.\n\n  When we speak of free software, we are referring to freedom, not\nprice.  Our General Public Licenses are designed to make sure that you\nhave the freedom to distribute copies of free software (and charge for\nthem if you wish), that you receive source code or can get it if you\nwant it, that you can change the software or use pieces of it in new\nfree programs, and that you know you can do these things.\n\n  To protect your rights, we need to prevent others from denying you\nthese rights or asking you to surrender the rights.  Therefore, you have\ncertain responsibilities if you distribute copies of the software, or if\nyou modify it: responsibilities to respect the freedom of others.\n\n  For example, if you distribute copies of such a program, whether\ngratis or for a fee, you must pass on to the recipients the same\nfreedoms that you received.  You must make sure that they, too, receive\nor can get the source code.  And you must show them these terms so they\nknow their rights.\n\n  Developers that use the GNU GPL protect your rights with two steps:\n(1) assert copyright on the software, and (2) offer you this License\ngiving you legal permission to copy, distribute and/or modify it.\n\n  For the developers\' and authors\' protection, the GPL clearly explains\nthat there is no warranty for this free software.  For both users\' and\nauthors\' sake, the GPL requires that modified versions be marked as\nchanged, so that their problems will not be attributed erroneously to\nauthors of previous versions.\n\n  Some devices are designed to deny users access to install or run\nmodified versions of the software inside them, although the manufacturer\ncan do so.  This is fundamentally incompatible with the aim of\nprotecting users\' freedom to change the software.  The systematic\npattern of such abuse occurs in the area of products for individuals to\nuse, which is precisely where it is most unacceptable.  Therefore, we\nhave designed this version of the GPL to prohibit the practice for those\nproducts.  If such problems arise substantially in other domains, we\nstand ready to extend this provision to those domains in future versions\nof the GPL, as needed to protect the freedom of users.\n\n  Finally, every program is threatened constantly by software patents.\nStates should not allow patents to restrict development and use of\nsoftware on general-purpose computers, but in those that do, we wish to\navoid the special danger that patents applied to a free program could\nmake it effectively proprietary.  To prevent this, the GPL assures that\npatents cannot be used to render the program non-free.\n\n  The precise terms and conditions for copying, distribution and\nmodification follow.\n\n                       TERMS AND CONDITIONS\n\n  0. Definitions.\n\n  "This License" refers to version 3 of the GNU General Public License.\n\n  "Copyright" also means copyright-like laws that apply to other kinds of\nworks, such as semiconductor masks.\n\n  "The Program" refers to any copyrightable work licensed under this\nLicense.  Each licensee is addressed as "you".  "Licensees" and\n"recipients" may be individuals or organizations.\n\n  To "modify" a work means to copy from or adapt all or part of the work\nin a fashion requiring copyright permission, other than the making of an\nexact copy.  The resulting work is called a "modified version" of the\nearlier work or a work "based on" the earlier work.\n\n  A "covered work" means either the unmodified Program or a work based\non the Program.\n\n  To "propagate" a work means to do anything with it that, without\npermission, would make you directly or secondarily liable for\ninfringement under applicable copyright law, except executing it on a\ncomputer or modifying a private copy.  Propagation includes copying,\ndistribution (with or without modification), making available to the\npublic, and in some countries other activities as well.\n\n  To "convey" a work means any kind of propagation that enables other\nparties to make or receive copies.  Mere interaction with a user through\na computer network, with no transfer of a copy, is not conveying.\n\n  An interactive user interface displays "Appropriate Legal Notices"\nto the extent that it includes a convenient and prominently visible\nfeature that (1) displays an appropriate copyright notice, and (2)\ntells the user that there is no warranty for the work (except to the\nextent that warranties are provided), that licensees may convey the\nwork under this License, and how to view a copy of this License.  If\nthe interface presents a list of user commands or options, such as a\nmenu, a prominent item in the list meets this criterion.\n\n  1. Source Code.\n\n  The "source code" for a work means the preferred form of the work\nfor making modifications to it.  "Object code" means any non-source\nform of a work.\n\n  A "Standard Interface" means an interface that either is an official\nstandard defined by a recognized standards body, or, in the case of\ninterfaces specified for a particular programming language, one that\nis widely used among developers working in that language.\n\n  The "System Libraries" of an executable work include anything, other\nthan the work as a whole, that (a) is included in the normal form of\npackaging a Major Component, but which is not part of that Major\nComponent, and (b) serves only to enable use of the work with that\nMajor Component, or to implement a Standard Interface for which an\nimplementation is available to the public in source code form.  A\n"Major Component", in this context, means a major essential component\n(kernel, window system, and so on) of the specific operating system\n(if any) on which the executable work runs, or a compiler used to\nproduce the work, or an object code interpreter used to run it.\n\n  The "Corresponding Source" for a work in object code form means all\nthe source code needed to generate, install, and (for an executable\nwork) run the object code and to modify the work, including scripts to\ncontrol those activities.  However, it does not include the work\'s\nSystem Libraries, or general-purpose tools or generally available free\nprograms which are used unmodified in performing those activities but\nwhich are not part of the work.  For example, Corresponding Source\nincludes interface definition files associated with source files for\nthe work, and the source code for shared libraries and dynamically\nlinked subprograms that the work is specifically designed to require,\nsuch as by intimate data communication or control flow between those\nsubprograms and other parts of the work.\n\n  The Corresponding Source need not include anything that users\ncan regenerate automatically from other parts of the Corresponding\nSource.\n\n  The Corresponding Source for a work in source code form is that\nsame work.\n\n  2. Basic Permissions.\n\n  All rights granted under this License are granted for the term of\ncopyright on the Program, and are irrevocable provided the stated\nconditions are met.  This License explicitly affirms your unlimited\npermission to run the unmodified Program.  The output from running a\ncovered work is covered by this License only if the output, given its\ncontent, constitutes a covered work.  This License acknowledges your\nrights of fair use or other equivalent, as provided by copyright law.\n\n  You may make, run and propagate covered works that you do not\nconvey, without conditions so long as your license otherwise remains\nin force.  You may convey covered works to others for the sole purpose\nof having them make modifications exclusively for you, or provide you\nwith facilities for running those works, provided that you comply with\nthe terms of this License in conveying all material for which you do\nnot control copyright.  Those thus making or running the covered works\nfor you must do so exclusively on your behalf, under your direction\nand control, on terms that prohibit them from making any copies of\nyour copyrighted material outside their relationship with you.\n\n  Conveying under any other circumstances is permitted solely under\nthe conditions stated below.  Sublicensing is not allowed; section 10\nmakes it unnecessary.\n\n  3. Protecting Users\' Legal Rights From Anti-Circumvention Law.\n\n  No covered work shall be deemed part of an effective technological\nmeasure under any applicable law fulfilling obligations under article\n11 of the WIPO copyright treaty adopted on 20 December 1996, or\nsimilar laws prohibiting or restricting circumvention of such\nmeasures.\n\n  When you convey a covered work, you waive any legal power to forbid\ncircumvention of technological measures to the extent such circumvention\nis effected by exercising rights under this License with respect to\nthe covered work, and you disclaim any intention to limit operation or\nmodification of the work as a means of enforcing, against the work\'s\nusers, your or third parties\' legal rights to forbid circumvention of\ntechnological measures.\n\n  4. Conveying Verbatim Copies.\n\n  You may convey verbatim copies of the Program\'s source code as you\nreceive it, in any medium, provided that you conspicuously and\nappropriately publish on each copy an appropriate copyright notice;\nkeep intact all notices stating that this License and any\nnon-permissive terms added in accord with section 7 apply to the code;\nkeep intact all notices of the absence of any warranty; and give all\nrecipients a copy of this License along with the Program.\n\n  You may charge any price or no price for each copy that you convey,\nand you may offer support or warranty protection for a fee.\n\n  5. Conveying Modified Source Versions.\n\n  You may convey a work based on the Program, or the modifications to\nproduce it from the Program, in the form of source code under the\nterms of section 4, provided that you also meet all of these conditions:\n\n    a) The work must carry prominent notices stating that you modified\n    it, and giving a relevant date.\n\n    b) The work must carry prominent notices stating that it is\n    released under this License and any conditions added under section\n    7.  This requirement modifies the requirement in section 4 to\n    "keep intact all notices".\n\n    c) You must license the entire work, as a whole, under this\n    License to anyone who comes into possession of a copy.  This\n    License will therefore apply, along with any applicable section 7\n    additional terms, to the whole of the work, and all its parts,\n    regardless of how they are packaged.  This License gives no\n    permission to license the work in any other way, but it does not\n    invalidate such permission if you have separately received it.\n\n    d) If the work has interactive user interfaces, each must display\n    Appropriate Legal Notices; however, if the Program has interactive\n    interfaces that do not display Appropriate Legal Notices, your\n    work need not make them do so.\n\n  A compilation of a covered work with other separate and independent\nworks, which are not by their nature extensions of the covered work,\nand which are not combined with it such as to form a larger program,\nin or on a volume of a storage or distribution medium, is called an\n"aggregate" if the compilation and its resulting copyright are not\nused to limit the access or legal rights of the compilation\'s users\nbeyond what the individual works permit.  Inclusion of a covered work\nin an aggregate does not cause this License to apply to the other\nparts of the aggregate.\n\n  6. Conveying Non-Source Forms.\n\n  You may convey a covered work in object code form under the terms\nof sections 4 and 5, provided that you also convey the\nmachine-readable Corresponding Source under the terms of this License,\nin one of these ways:\n\n    a) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by the\n    Corresponding Source fixed on a durable physical medium\n    customarily used for software interchange.\n\n    b) Convey the object code in, or embodied in, a physical product\n    (including a physical distribution medium), accompanied by a\n    written offer, valid for at least three years and valid for as\n    long as you offer spare parts or customer support for that product\n    model, to give anyone who possesses the object code either (1) a\n    copy of the Corresponding Source for all the software in the\n    product that is covered by this License, on a durable physical\n    medium customarily used for software interchange, for a price no\n    more than your reasonable cost of physically performing this\n    conveying of source, or (2) access to copy the\n    Corresponding Source from a network server at no charge.\n\n    c) Convey individual copies of the object code with a copy of the\n    written offer to provide the Corresponding Source.  This\n    alternative is allowed only occasionally and noncommercially, and\n    only if you received the object code with such an offer, in accord\n    with subsection 6b.\n\n    d) Convey the object code by offering access from a designated\n    place (gratis or for a charge), and offer equivalent access to the\n    Corresponding Source in the same way through the same place at no\n    further charge.  You need not require recipients to copy the\n    Corresponding Source along with the object code.  If the place to\n    copy the object code is a network server, the Corresponding Source\n    may be on a different server (operated by you or a third party)\n    that supports equivalent copying facilities, provided you maintain\n    clear directions next to the object code saying where to find the\n    Corresponding Source.  Regardless of what server hosts the\n    Corresponding Source, you remain obligated to ensure that it is\n    available for as long as needed to satisfy these requirements.\n\n    e) Convey the object code using peer-to-peer transmission, provided\n    you inform other peers where the object code and Corresponding\n    Source of the work are being offered to the general public at no\n    charge under subsection 6d.\n\n  A separable portion of the object code, whose source code is excluded\nfrom the Corresponding Source as a System Library, need not be\nincluded in conveying the object code work.\n\n  A "User Product" is either (1) a "consumer product", which means any\ntangible personal property which is normally used for personal, family,\nor household purposes, or (2) anything designed or sold for incorporation\ninto a dwelling.  In determining whether a product is a consumer product,\ndoubtful cases shall be resolved in favor of coverage.  For a particular\nproduct received by a particular user, "normally used" refers to a\ntypical or common use of that class of product, regardless of the status\nof the particular user or of the way in which the particular user\nactually uses, or expects or is expected to use, the product.  A product\nis a consumer product regardless of whether the product has substantial\ncommercial, industrial or non-consumer uses, unless such uses represent\nthe only significant mode of use of the product.\n\n  "Installation Information" for a User Product means any methods,\nprocedures, authorization keys, or other information required to install\nand execute modified versions of a covered work in that User Product from\na modified version of its Corresponding Source.  The information must\nsuffice to ensure that the continued functioning of the modified object\ncode is in no case prevented or interfered with solely because\nmodification has been made.\n\n  If you convey an object code work under this section in, or with, or\nspecifically for use in, a User Product, and the conveying occurs as\npart of a transaction in which the right of possession and use of the\nUser Product is transferred to the recipient in perpetuity or for a\nfixed term (regardless of how the transaction is characterized), the\nCorresponding Source conveyed under this section must be accompanied\nby the Installation Information.  But this requirement does not apply\nif neither you nor any third party retains the ability to install\nmodified object code on the User Product (for example, the work has\nbeen installed in ROM).\n\n  The requirement to provide Installation Information does not include a\nrequirement to continue to provide support service, warranty, or updates\nfor a work that has been modified or installed by the recipient, or for\nthe User Product in which it has been modified or installed.  Access to a\nnetwork may be denied when the modification itself materially and\nadversely affects the operation of the network or violates the rules and\nprotocols for communication across the network.\n\n  Corresponding Source conveyed, and Installation Information provided,\nin accord with this section must be in a format that is publicly\ndocumented (and with an implementation available to the public in\nsource code form), and must require no special password or key for\nunpacking, reading or copying.\n\n  7. Additional Terms.\n\n  "Additional permissions" are terms that supplement the terms of this\nLicense by making exceptions from one or more of its conditions.\nAdditional permissions that are applicable to the entire Program shall\nbe treated as though they were included in this License, to the extent\nthat they are valid under applicable law.  If additional permissions\napply only to part of the Program, that part may be used separately\nunder those permissions, but the entire Program remains governed by\nthis License without regard to the additional permissions.\n\n  When you convey a copy of a covered work, you may at your option\nremove any additional permissions from that copy, or from any part of\nit.  (Additional permissions may be written to require their own\nremoval in certain cases when you modify the work.)  You may place\nadditional permissions on material, added by you to a covered work,\nfor which you have or can give appropriate copyright permission.\n\n  Notwithstanding any other provision of this License, for material you\nadd to a covered work, you may (if authorized by the copyright holders of\nthat material) supplement the terms of this License with terms:\n\n    a) Disclaiming warranty or limiting liability differently from the\n    terms of sections 15 and 16 of this License; or\n\n    b) Requiring preservation of specified reasonable legal notices or\n    author attributions in that material or in the Appropriate Legal\n    Notices displayed by works containing it; or\n\n    c) Prohibiting misrepresentation of the origin of that material, or\n    requiring that modified versions of such material be marked in\n    reasonable ways as different from the original version; or\n\n    d) Limiting the use for publicity purposes of names of licensors or\n    authors of the material; or\n\n    e) Declining to grant rights under trademark law for use of some\n    trade names, trademarks, or service marks; or\n\n    f) Requiring indemnification of licensors and authors of that\n    material by anyone who conveys the material (or modified versions of\n    it) with contractual assumptions of liability to the recipient, for\n    any liability that these contractual assumptions directly impose on\n    those licensors and authors.\n\n  All other non-permissive additional terms are considered "further\nrestrictions" within the meaning of section 10.  If the Program as you\nreceived it, or any part of it, contains a notice stating that it is\ngoverned by this License along with a term that is a further\nrestriction, you may remove that term.  If a license document contains\na further restriction but permits relicensing or conveying under this\nLicense, you may add to a covered work material governed by the terms\nof that license document, provided that the further restriction does\nnot survive such relicensing or conveying.\n\n  If you add terms to a covered work in accord with this section, you\nmust place, in the relevant source files, a statement of the\nadditional terms that apply to those files, or a notice indicating\nwhere to find the applicable terms.\n\n  Additional terms, permissive or non-permissive, may be stated in the\nform of a separately written license, or stated as exceptions;\nthe above requirements apply either way.\n\n  8. Termination.\n\n  You may not propagate or modify a covered work except as expressly\nprovided under this License.  Any attempt otherwise to propagate or\nmodify it is void, and will automatically terminate your rights under\nthis License (including any patent licenses granted under the third\nparagraph of section 11).\n\n  However, if you cease all violation of this License, then your\nlicense from a particular copyright holder is reinstated (a)\nprovisionally, unless and until the copyright holder explicitly and\nfinally terminates your license, and (b) permanently, if the copyright\nholder fails to notify you of the violation by some reasonable means\nprior to 60 days after the cessation.\n\n  Moreover, your license from a particular copyright holder is\nreinstated permanently if the copyright holder notifies you of the\nviolation by some reasonable means, this is the first time you have\nreceived notice of violation of this License (for any work) from that\ncopyright holder, and you cure the violation prior to 30 days after\nyour receipt of the notice.\n\n  Termination of your rights under this section does not terminate the\nlicenses of parties who have received copies or rights from you under\nthis License.  If your rights have been terminated and not permanently\nreinstated, you do not qualify to receive new licenses for the same\nmaterial under section 10.\n\n  9. Acceptance Not Required for Having Copies.\n\n  You are not required to accept this License in order to receive or\nrun a copy of the Program.  Ancillary propagation of a covered work\noccurring solely as a consequence of using peer-to-peer transmission\nto receive a copy likewise does not require acceptance.  However,\nnothing other than this License grants you permission to propagate or\nmodify any covered work.  These actions infringe copyright if you do\nnot accept this License.  Therefore, by modifying or propagating a\ncovered work, you indicate your acceptance of this License to do so.\n\n  10. Automatic Licensing of Downstream Recipients.\n\n  Each time you convey a covered work, the recipient automatically\nreceives a license from the original licensors, to run, modify and\npropagate that work, subject to this License.  You are not responsible\nfor enforcing compliance by third parties with this License.\n\n  An "entity transaction" is a transaction transferring control of an\norganization, or substantially all assets of one, or subdividing an\norganization, or merging organizations.  If propagation of a covered\nwork results from an entity transaction, each party to that\ntransaction who receives a copy of the work also receives whatever\nlicenses to the work the party\'s predecessor in interest had or could\ngive under the previous paragraph, plus a right to possession of the\nCorresponding Source of the work from the predecessor in interest, if\nthe predecessor has it or can get it with reasonable efforts.\n\n  You may not impose any further restrictions on the exercise of the\nrights granted or affirmed under this License.  For example, you may\nnot impose a license fee, royalty, or other charge for exercise of\nrights granted under this License, and you may not initiate litigation\n(including a cross-claim or counterclaim in a lawsuit) alleging that\nany patent claim is infringed by making, using, selling, offering for\nsale, or importing the Program or any portion of it.\n\n  11. Patents.\n\n  A "contributor" is a copyright holder who authorizes use under this\nLicense of the Program or a work on which the Program is based.  The\nwork thus licensed is called the contributor\'s "contributor version".\n\n  A contributor\'s "essential patent claims" are all patent claims\nowned or controlled by the contributor, whether already acquired or\nhereafter acquired, that would be infringed by some manner, permitted\nby this License, of making, using, or selling its contributor version,\nbut do not include claims that would be infringed only as a\nconsequence of further modification of the contributor version.  For\npurposes of this definition, "control" includes the right to grant\npatent sublicenses in a manner consistent with the requirements of\nthis License.\n\n  Each contributor grants you a non-exclusive, worldwide, royalty-free\npatent license under the contributor\'s essential patent claims, to\nmake, use, sell, offer for sale, import and otherwise run, modify and\npropagate the contents of its contributor version.\n\n  In the following three paragraphs, a "patent license" is any express\nagreement or commitment, however denominated, not to enforce a patent\n(such as an express permission to practice a patent or covenant not to\nsue for patent infringement).  To "grant" such a patent license to a\nparty means to make such an agreement or commitment not to enforce a\npatent against the party.\n\n  If you convey a covered work, knowingly relying on a patent license,\nand the Corresponding Source of the work is not available for anyone\nto copy, free of charge and under the terms of this License, through a\npublicly available network server or other readily accessible means,\nthen you must either (1) cause the Corresponding Source to be so\navailable, or (2) arrange to deprive yourself of the benefit of the\npatent license for this particular work, or (3) arrange, in a manner\nconsistent with the requirements of this License, to extend the patent\nlicense to downstream recipients.  "Knowingly relying" means you have\nactual knowledge that, but for the patent license, your conveying the\ncovered work in a country, or your recipient\'s use of the covered work\nin a country, would infringe one or more identifiable patents in that\ncountry that you have reason to believe are valid.\n\n  If, pursuant to or in connection with a single transaction or\narrangement, you convey, or propagate by procuring conveyance of, a\ncovered work, and grant a patent license to some of the parties\nreceiving the covered work authorizing them to use, propagate, modify\nor convey a specific copy of the covered work, then the patent license\nyou grant is automatically extended to all recipients of the covered\nwork and works based on it.\n\n  A patent license is "discriminatory" if it does not include within\nthe scope of its coverage, prohibits the exercise of, or is\nconditioned on the non-exercise of one or more of the rights that are\nspecifically granted under this License.  You may not convey a covered\nwork if you are a party to an arrangement with a third party that is\nin the business of distributing software, under which you make payment\nto the third party based on the extent of your activity of conveying\nthe work, and under which the third party grants, to any of the\nparties who would receive the covered work from you, a discriminatory\npatent license (a) in connection with copies of the covered work\nconveyed by you (or copies made from those copies), or (b) primarily\nfor and in connection with specific products or compilations that\ncontain the covered work, unless you entered into that arrangement,\nor that patent license was granted, prior to 28 March 2007.\n\n  Nothing in this License shall be construed as excluding or limiting\nany implied license or other defenses to infringement that may\notherwise be available to you under applicable patent law.\n\n  12. No Surrender of Others\' Freedom.\n\n  If conditions are imposed on you (whether by court order, agreement or\notherwise) that contradict the conditions of this License, they do not\nexcuse you from the conditions of this License.  If you cannot convey a\ncovered work so as to satisfy simultaneously your obligations under this\nLicense and any other pertinent obligations, then as a consequence you may\nnot convey it at all.  For example, if you agree to terms that obligate you\nto collect a royalty for further conveying from those to whom you convey\nthe Program, the only way you could satisfy both those terms and this\nLicense would be to refrain entirely from conveying the Program.\n\n  13. Use with the GNU Affero General Public License.\n\n  Notwithstanding any other provision of this License, you have\npermission to link or combine any covered work with a work licensed\nunder version 3 of the GNU Affero General Public License into a single\ncombined work, and to convey the resulting work.  The terms of this\nLicense will continue to apply to the part which is the covered work,\nbut the special requirements of the GNU Affero General Public License,\nsection 13, concerning interaction through a network will apply to the\ncombination as such.\n\n  14. Revised Versions of this License.\n\n  The Free Software Foundation may publish revised and/or new versions of\nthe GNU General Public License from time to time.  Such new versions will\nbe similar in spirit to the present version, but may differ in detail to\naddress new problems or concerns.\n\n  Each version is given a distinguishing version number.  If the\nProgram specifies that a certain numbered version of the GNU General\nPublic License "or any later version" applies to it, you have the\noption of following the terms and conditions either of that numbered\nversion or of any later version published by the Free Software\nFoundation.  If the Program does not specify a version number of the\nGNU General Public License, you may choose any version ever published\nby the Free Software Foundation.\n\n  If the Program specifies that a proxy can decide which future\nversions of the GNU General Public License can be used, that proxy\'s\npublic statement of acceptance of a version permanently authorizes you\nto choose that version for the Program.\n\n  Later license versions may give you additional or different\npermissions.  However, no additional obligations are imposed on any\nauthor or copyright holder as a result of your choosing to follow a\nlater version.\n\n  15. Disclaimer of Warranty.\n\n  THERE IS NO WARRANTY FOR THE PROGRAM, TO THE EXTENT PERMITTED BY\nAPPLICABLE LAW.  EXCEPT WHEN OTHERWISE STATED IN WRITING THE COPYRIGHT\nHOLDERS AND/OR OTHER PARTIES PROVIDE THE PROGRAM "AS IS" WITHOUT WARRANTY\nOF ANY KIND, EITHER EXPRESSED OR IMPLIED, INCLUDING, BUT NOT LIMITED TO,\nTHE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR\nPURPOSE.  THE ENTIRE RISK AS TO THE QUALITY AND PERFORMANCE OF THE PROGRAM\nIS WITH YOU.  SHOULD THE PROGRAM PROVE DEFECTIVE, YOU ASSUME THE COST OF\nALL NECESSARY SERVICING, REPAIR OR CORRECTION.\n\n  16. Limitation of Liability.\n\n  IN NO EVENT UNLESS REQUIRED BY APPLICABLE LAW OR AGREED TO IN WRITING\nWILL ANY COPYRIGHT HOLDER, OR ANY OTHER PARTY WHO MODIFIES AND/OR CONVEYS\nTHE PROGRAM AS PERMITTED ABOVE, BE LIABLE TO YOU FOR DAMAGES, INCLUDING ANY\nGENERAL, SPECIAL, INCIDENTAL OR CONSEQUENTIAL DAMAGES ARISING OUT OF THE\nUSE OR INABILITY TO USE THE PROGRAM (INCLUDING BUT NOT LIMITED TO LOSS OF\nDATA OR DATA BEING RENDERED INACCURATE OR LOSSES SUSTAINED BY YOU OR THIRD\nPARTIES OR A FAILURE OF THE PROGRAM TO OPERATE WITH ANY OTHER PROGRAMS),\nEVEN IF SUCH HOLDER OR OTHER PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF\nSUCH DAMAGES.\n\n  17. Interpretation of Sections 15 and 16.\n\n  If the disclaimer of warranty and limitation of liability provided\nabove cannot be given local legal effect according to their terms,\nreviewing courts shall apply local law that most closely approximates\nan absolute waiver of all civil liability in connection with the\nProgram, unless a warranty or assumption of liability accompanies a\ncopy of the Program in return for a fee.\n\n                     END OF TERMS AND CONDITIONS\n\n            How to Apply These Terms to Your New Programs\n\n  If you develop a new program, and you want it to be of the greatest\npossible use to the public, the best way to achieve this is to make it\nfree software which everyone can redistribute and change under these terms.\n\n  To do so, attach the following notices to the program.  It is safest\nto attach them to the start of each source file to most effectively\nstate the exclusion of warranty; and each file should have at least\nthe "copyright" line and a pointer to where the full notice is found.\n\n    EmulatorJS: RetroArch on the web\n    Copyright (C) 2023  Ethan O\'Brien\n\n    This program is free software: you can redistribute it and/or modify\n    it under the terms of the GNU General Public License as published by\n    the Free Software Foundation, either version 3 of the License, or\n    (at your option) any later version.\n\n    This program is distributed in the hope that it will be useful,\n    but WITHOUT ANY WARRANTY; without even the implied warranty of\n    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n    GNU General Public License for more details.\n\n    You should have received a copy of the GNU General Public License\n    along with this program.  If not, see <https://www.gnu.org/licenses/>.\n\nAlso add information on how to contact you by electronic and paper mail.\n\n  If the program does terminal interaction, make it output a short\nnotice like this when it starts in an interactive mode:\n\n    EmulatorJS  Copyright (C) 2023  Ethan O\'Brien\n    This program comes with ABSOLUTELY NO WARRANTY; for details type `show w\'.\n    This is free software, and you are welcome to redistribute it\n    under certain conditions; type `show c\' for details.\n\nThe hypothetical commands `show w\' and `show c\' should show the appropriate\nparts of the General Public License.  Of course, your program\'s commands\nmight be different; for a GUI interface, you would use an "about box".\n\n  You should also get your employer (if you work as a programmer) or school,\nif any, to sign a "copyright disclaimer" for the program, if necessary.\nFor more information on this, and how to apply and follow the GNU GPL, see\n<https://www.gnu.org/licenses/>.\n\n  The GNU General Public License does not permit incorporating your program\ninto proprietary programs.  If your program is a subroutine library, you\nmay consider it more useful to permit linking proprietary applications with\nthe library.  If this is what you want to do, use the GNU Lesser General\nPublic License instead of this License.  But first, please read\n<https://www.gnu.org/licenses/why-not-lgpl.html>.\n';
        });
        
        if (this.config.buttonOpts) {
            if (this.config.buttonOpts.screenshot === false) screenshot.setAttribute("hidden", "");
            if (this.config.buttonOpts.quickSave === false) qSave.setAttribute("hidden", "");
            if (this.config.buttonOpts.quickLoad === false) qLoad.setAttribute("hidden", "");
        }
        
        this.elements.contextmenu.appendChild(parent);
        
        this.elements.parent.appendChild(this.elements.contextmenu);
    }
    closePopup() {
        if (this.currentPopup !== null) {
            try {
                this.currentPopup.remove();
            } catch(e){}
            this.currentPopup = null;
        }
    }
    //creates a full box popup.
    createPopup(popupTitle, buttons, hidden) {
        if (!hidden) this.closePopup();
        const popup = this.createElement('div');
        popup.classList.add("ejs_popup_container");
        this.elements.parent.appendChild(popup);
        const title = this.createElement("h4");
        title.innerText = this.localization(popupTitle);
        const main = this.createElement("div");
        main.classList.add("ejs_popup_body");
        
        popup.appendChild(title);
        popup.appendChild(main);
        
        for (let k in buttons) {
            const button = this.createElement("a");
            if (buttons[k] instanceof Function) {
                button.addEventListener("click", (e) => {
                    buttons[k]();
                    e.preventDefault();
                });
            }
            button.classList.add("ejs_button");
            button.innerText = this.localization(k);
            popup.appendChild(button);
        }
        if (!hidden) {
            this.currentPopup = popup;
        } else {
            popup.style.display = "none";
        }
        
        return main;
    }
    selectFile() {
        return new Promise((resolve, reject) => {
            const file = this.createElement("input");
            file.type = "file";
            this.addEventListener(file, "change", (e) => {
                resolve(e.target.files[0]);
            })
            file.click();
        })
    }
    isPopupOpen() {
        return this.cheatMenu.style.display !== "none" || this.netplayMenu.style.display !== "none" || this.controlMenu.style.display !== "none" || this.currentPopup !== null;
    }
    isChild(first, second) {
        if (!first || !second) return false;
        const adown = first.nodeType === 9 ? first.documentElement : first;

        if (first === second) return true;

        if (adown.contains) { 
            return adown.contains(second);
        }

        return first.compareDocumentPosition && first.compareDocumentPosition(second) & 16;
    }
    createBottomMenuBar() {
        this.elements.menu = this.createElement("div");
        this.elements.menu.classList.add("ejs_menu_bar");
        this.elements.menu.classList.add("ejs_menu_bar_hidden");
        
        let timeout = null;
        let ignoreEvents = false;
        const hide = () => {
            if (this.paused || this.settingsMenuOpen) return;
            this.elements.menu.classList.add("ejs_menu_bar_hidden");
        }
        
        this.addEventListener(this.elements.parent, 'mousemove click', (e) => {
            if (e.pointerType === "touch") return;
            if (!this.started || ignoreEvents || document.pointerLockElement === this.canvas) return;
            if (this.isPopupOpen()) return;
            clearTimeout(timeout);
            timeout = setTimeout(hide, 3000);
            this.elements.menu.classList.remove("ejs_menu_bar_hidden");
        })
        this.addEventListener(this.elements.menu, 'touchstart touchend', (e) => {
            if (!this.started) return;
            if (this.isPopupOpen()) return;
            clearTimeout(timeout);
            timeout = setTimeout(hide, 3000);
            this.elements.menu.classList.remove("ejs_menu_bar_hidden");
        })
        this.menu = {
            close: () => {
                if (!this.started) return;
                clearTimeout(timeout);
                this.elements.menu.classList.add("ejs_menu_bar_hidden");
            },
            open: () => {
                if (!this.started) return;
                clearTimeout(timeout);
                timeout = setTimeout(hide, 3000);
                this.elements.menu.classList.remove("ejs_menu_bar_hidden");
            },
            toggle: () => {
                if (!this.started) return;
                clearTimeout(timeout);
                if (this.elements.menu.classList.contains("ejs_menu_bar_hidden")) {
                    timeout = setTimeout(hide, 3000);
                }
                this.elements.menu.classList.toggle("ejs_menu_bar_hidden");
                
            }
        }
        this.elements.parent.appendChild(this.elements.menu);
        
        let tmout;
        this.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (this.isChild(this.elements.menu, e.target) || this.isChild(this.elements.menuToggle, e.target)) return;
            if (!this.started || this.elements.menu.classList.contains("ejs_menu_bar_hidden") || this.isPopupOpen()) return;
            const width = this.elements.parent.getBoundingClientRect().width;
            if (width > 575) return;
            clearTimeout(tmout);
            tmout = setTimeout(() => {
                ignoreEvents = false;
            }, 2000)
            ignoreEvents = true;
            this.menu.close();
        })
        
        
        //Now add buttons
        const addButton = (title, image, callback, element, both) => {
            const button = this.createElement("button");
            button.type = "button";
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute("role", "presentation");
            svg.setAttribute("focusable", "false");
            svg.innerHTML = image;
            const text = this.createElement("span");
            text.innerText = this.localization(title);
            if (title == "Enter Fullscreen" || title == "Exit Fullscreen") text.classList.add("ejs_menu_text_right");
            text.classList.add("ejs_menu_text");
            
            button.classList.add("ejs_menu_button");
            button.appendChild(svg);
            button.appendChild(text);
            if (element) {
                element.appendChild(button);
            } else {
                this.elements.menu.appendChild(button);
            }
            if (callback instanceof Function) {
                this.addEventListener(button, 'click', callback);
            }
            return both ? [button, svg, text] : button;
        }
        
        //todo. Center text on not restart button
        
        const restartButton = addButton("Restart", '<svg viewBox="0 0 512 512"><path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z"/></svg>', () => {
            if (this.isNetplay && this.netplay.owner) {
                this.gameManager.saveSaveFiles();
                this.gameManager.restart();
                this.netplay.reset();
                this.netplay.sendMessage({restart:true});
                this.play();
            } else if (!this.isNetplay) {
                this.gameManager.saveSaveFiles();
                this.gameManager.restart();
            }
        });
        const pauseButton = addButton("Pause", '<svg viewBox="0 0 320 512"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z"/></svg>', () => {
            if (this.isNetplay && this.netplay.owner) {
                this.pause();
                this.netplay.sendMessage({pause:true});
            } else if (!this.isNetplay) {
                this.pause();
            }
        });
        const playButton = addButton("Play", '<svg viewBox="0 0 320 512"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z"/></svg>', () => {
            if (this.isNetplay && this.netplay.owner) {
                this.play();
                this.netplay.sendMessage({play:true});
            } else if (!this.isNetplay) {
                this.play();
            }
        });
        playButton.style.display = "none";
        this.togglePlaying = (dontUpdate) => {
            this.paused = !this.paused;
            if (!dontUpdate) {
                if (this.paused) {
                    pauseButton.style.display = "none";
                    playButton.style.display = "";
                } else {
                    pauseButton.style.display = "";
                    playButton.style.display = "none";
                }
            }
            this.gameManager.toggleMainLoop(this.paused ? 0 : 1);
            
            //I now realize its not easy to pause it while the cursor is locked, just in case I guess
            if (this.getCore(true) === "nds") {
                if (this.canvas.exitPointerLock) {
                    this.canvas.exitPointerLock();
                } else if (this.canvas.mozExitPointerLock) {
                    this.canvas.mozExitPointerLock();
                }
            }
        }
        this.play = (dontUpdate) => {
            if (this.paused) this.togglePlaying(dontUpdate);
        }
        this.pause = (dontUpdate) => {
            if (!this.paused) this.togglePlaying(dontUpdate);
        }
        
        let stateUrl;
        const saveState = addButton("Save State", '<svg viewBox="0 0 448 512"><path fill="currentColor" d="M433.941 129.941l-83.882-83.882A48 48 0 0 0 316.118 32H48C21.49 32 0 53.49 0 80v352c0 26.51 21.49 48 48 48h352c26.51 0 48-21.49 48-48V163.882a48 48 0 0 0-14.059-33.941zM224 416c-35.346 0-64-28.654-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64zm96-304.52V212c0 6.627-5.373 12-12 12H76c-6.627 0-12-5.373-12-12V108c0-6.627 5.373-12 12-12h228.52c3.183 0 6.235 1.264 8.485 3.515l3.48 3.48A11.996 11.996 0 0 1 320 111.48z"/></svg>', async () => {
            const state = await this.gameManager.getState();
            const called = this.callEvent("save", {
                screenshot: this.gameManager.screenshot(),
                state: state
            });
            if (called > 0) return;
            if (stateUrl) URL.revokeObjectURL(stateUrl);
            if (this.settings['save-state-location'] === "browser" && this.saveInBrowserSupported()) {
                this.storage.states.put(this.getBaseFileName()+".state", state);
                this.displayMessage(this.localization("SAVE SAVED TO BROWSER"));
            } else {
                const blob = new Blob([state]);
                stateUrl = URL.createObjectURL(blob);
                const a = this.createElement("a");
                a.href = stateUrl;
                a.download = this.getBaseFileName()+".state";
                a.click();
            }
        });
        const loadState = addButton("Load State", '<svg viewBox="0 0 576 512"><path fill="currentColor" d="M572.694 292.093L500.27 416.248A63.997 63.997 0 0 1 444.989 448H45.025c-18.523 0-30.064-20.093-20.731-36.093l72.424-124.155A64 64 0 0 1 152 256h399.964c18.523 0 30.064 20.093 20.73 36.093zM152 224h328v-48c0-26.51-21.49-48-48-48H272l-64-64H48C21.49 64 0 85.49 0 112v278.046l69.077-118.418C86.214 242.25 117.989 224 152 224z"/></svg>', async () => {
            const called = this.callEvent("load");
            if (called > 0) return;
            if (this.settings['save-state-location'] === "browser" && this.saveInBrowserSupported()) {
                this.storage.states.get(this.getBaseFileName()+".state").then(e => {
                    this.gameManager.loadState(e);
                    this.displayMessage(this.localization("SAVE LOADED FROM BROWSER"));
                })
            } else {
                const file = await this.selectFile();
                const state = new Uint8Array(await file.arrayBuffer());
                this.gameManager.loadState(state);
            }
        });
        const controlMenu = addButton("Control Settings", '<svg viewBox="0 0 640 512"><path fill="currentColor" d="M480 96H160C71.6 96 0 167.6 0 256s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h91.5c29 29.6 69.5 48 114.2 48 88.4 0 160-71.6 160-160S568.4 96 480 96zM256 276c0 6.6-5.4 12-12 12h-52v52c0 6.6-5.4 12-12 12h-40c-6.6 0-12-5.4-12-12v-52H76c-6.6 0-12-5.4-12-12v-40c0-6.6 5.4-12 12-12h52v-52c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v52h52c6.6 0 12 5.4 12 12v40zm184 68c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48zm80-80c-26.5 0-48-21.5-48-48s21.5-48 48-48 48 21.5 48 48-21.5 48-48 48z"/></svg>', () => {
            this.controlMenu.style.display = "";
        });
        const cheatMenu = addButton("Cheats", '<svg viewBox="0 0 496 512"><path fill="currentColor" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z" class=""></path></svg>', () => {
            this.cheatMenu.style.display = "";
        });
        
        const cache = addButton("Cache Manager", '<svg viewBox="0 0 1800 1800"><path d="M896 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5T231 896 128 768V598q119 84 325 127t443 43zm0 768q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128v-170q119 84 325 127t443 43zm0-384q237 0 443-43t325-127v170q0 69-103 128t-280 93.5-385 34.5-385-34.5-280-93.5-103-128V982q119 84 325 127t443 43zM896 0q208 0 385 34.5t280 93.5 103 128v128q0 69-103 128t-280 93.5T896 640t-385-34.5T231 512 128 384V256q0-69 103-128t280-93.5T896 0z"/></svg>', () => {
            this.openCacheMenu();
        });
        
        let savUrl;
        
        const saveSavFiles = addButton("Export Save File", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23"><path d="M3 6.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V17.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M8 3H16V8.4C16 8.73137 15.7314 9 15.4 9H8.6C8.26863 9 8 8.73137 8 8.4V3Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M6 21V17.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M12 12H1M1 12L4 9M1 12L4 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>', async () => {
            const file = await this.gameManager.getSaveFile();
            const blob = new Blob([file]);
            savUrl = URL.createObjectURL(blob);
            const a = this.createElement("a");
            a.href = savUrl;
            a.download = this.gameManager.getSaveFilePath().split("/").pop();
            a.click();
        });
        const loadSavFiles = addButton("Import Save File", '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 23 23"><path d="M3 7.5V5C3 3.89543 3.89543 3 5 3H16.1716C16.702 3 17.2107 3.21071 17.5858 3.58579L20.4142 6.41421C20.7893 6.78929 21 7.29799 21 7.82843V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V16.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M6 21V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M18 21V13.6C18 13.2686 17.7314 13 17.4 13H15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M16 3V8.4C16 8.73137 15.7314 9 15.4 9H13.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" fill="transparent"></path><path d="M8 3V6" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path><path d="M1 12H12M12 12L9 9M12 12L9 15" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"></path></svg>', async () => {
            const file = await this.selectFile();
            const sav = new Uint8Array(await file.arrayBuffer());
            const path = this.gameManager.getSaveFilePath();
            const paths = path.split("/");
            let cp = "";
            for (let i=0; i<paths.length-1; i++) {
                if (paths[i] === "") continue;
                cp += "/"+paths[i];
                if (!FS.analyzePath(cp).exists) FS.mkdir(cp);
            }
            if (FS.analyzePath(path).exists) FS.unlink(path);
            FS.writeFile(path, sav);
            this.gameManager.loadSaveFiles();
        });
        const netplay = addButton("Netplay", '<svg viewBox="0 0 512 512"><path fill="currentColor" d="M364.215 192h131.43c5.439 20.419 8.354 41.868 8.354 64s-2.915 43.581-8.354 64h-131.43c5.154-43.049 4.939-86.746 0-128zM185.214 352c10.678 53.68 33.173 112.514 70.125 151.992.221.001.44.008.661.008s.44-.008.661-.008c37.012-39.543 59.467-98.414 70.125-151.992H185.214zm174.13-192h125.385C452.802 84.024 384.128 27.305 300.95 12.075c30.238 43.12 48.821 96.332 58.394 147.925zm-27.35 32H180.006c-5.339 41.914-5.345 86.037 0 128h151.989c5.339-41.915 5.345-86.037-.001-128zM152.656 352H27.271c31.926 75.976 100.6 132.695 183.778 147.925-30.246-43.136-48.823-96.35-58.393-147.925zm206.688 0c-9.575 51.605-28.163 104.814-58.394 147.925 83.178-15.23 151.852-71.949 183.778-147.925H359.344zm-32.558-192c-10.678-53.68-33.174-112.514-70.125-151.992-.221 0-.44-.008-.661-.008s-.44.008-.661.008C218.327 47.551 195.872 106.422 185.214 160h141.572zM16.355 192C10.915 212.419 8 233.868 8 256s2.915 43.581 8.355 64h131.43c-4.939-41.254-5.154-84.951 0-128H16.355zm136.301-32c9.575-51.602 28.161-104.81 58.394-147.925C127.872 27.305 59.198 84.024 27.271 160h125.385z"/></svg>', async () => {
            this.openNetplayMenu();
        });
        
        const spacer = this.createElement("span");
        spacer.classList.add("ejs_menu_bar_spacer");
        this.elements.menu.appendChild(spacer);
        
        const volumeSettings = this.createElement("div");
        volumeSettings.classList.add("ejs_volume_parent");
        const muteButton = addButton("Mute", '<svg viewBox="0 0 640 512"><path d="M412.6 182c-10.28-8.334-25.41-6.867-33.75 3.402c-8.406 10.24-6.906 25.35 3.375 33.74C393.5 228.4 400 241.8 400 255.1c0 14.17-6.5 27.59-17.81 36.83c-10.28 8.396-11.78 23.5-3.375 33.74c4.719 5.806 11.62 8.802 18.56 8.802c5.344 0 10.75-1.779 15.19-5.399C435.1 311.5 448 284.6 448 255.1S435.1 200.4 412.6 182zM473.1 108.2c-10.22-8.334-25.34-6.898-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C476.6 172.1 496 213.3 496 255.1s-19.44 82.1-53.31 110.7c-10.25 8.396-11.75 23.5-3.344 33.74c4.75 5.775 11.62 8.771 18.56 8.771c5.375 0 10.75-1.779 15.22-5.431C518.2 366.9 544 313 544 255.1S518.2 145 473.1 108.2zM534.4 33.4c-10.22-8.334-25.34-6.867-33.78 3.34c-8.406 10.24-6.906 25.35 3.344 33.74C559.9 116.3 592 183.9 592 255.1s-32.09 139.7-88.06 185.5c-10.25 8.396-11.75 23.5-3.344 33.74C505.3 481 512.2 484 519.2 484c5.375 0 10.75-1.779 15.22-5.431C601.5 423.6 640 342.5 640 255.1S601.5 88.34 534.4 33.4zM301.2 34.98c-11.5-5.181-25.01-3.076-34.43 5.29L131.8 160.1H48c-26.51 0-48 21.48-48 47.96v95.92c0 26.48 21.49 47.96 48 47.96h83.84l134.9 119.8C272.7 477 280.3 479.8 288 479.8c4.438 0 8.959-.9314 13.16-2.835C312.7 471.8 320 460.4 320 447.9V64.12C320 51.55 312.7 40.13 301.2 34.98z"/></svg>', () => {
            muteButton.style.display = "none";
            unmuteButton.style.display = "";
            this.muted = true;
            this.setVolume(0);
        }, volumeSettings);
        const unmuteButton = addButton("Unmute", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M301.2 34.85c-11.5-5.188-25.02-3.122-34.44 5.253L131.8 160H48c-26.51 0-48 21.49-48 47.1v95.1c0 26.51 21.49 47.1 48 47.1h83.84l134.9 119.9c5.984 5.312 13.58 8.094 21.26 8.094c4.438 0 8.972-.9375 13.17-2.844c11.5-5.156 18.82-16.56 18.82-29.16V64C319.1 51.41 312.7 40 301.2 34.85zM513.9 255.1l47.03-47.03c9.375-9.375 9.375-24.56 0-33.94s-24.56-9.375-33.94 0L480 222.1L432.1 175c-9.375-9.375-24.56-9.375-33.94 0s-9.375 24.56 0 33.94l47.03 47.03l-47.03 47.03c-9.375 9.375-9.375 24.56 0 33.94c9.373 9.373 24.56 9.381 33.94 0L480 289.9l47.03 47.03c9.373 9.373 24.56 9.381 33.94 0c9.375-9.375 9.375-24.56 0-33.94L513.9 255.1z"/></svg>', () => {
            if (this.volume === 0) this.volume = 0.5;
            muteButton.style.display = "";
            unmuteButton.style.display = "none";
            this.muted = false;
            this.setVolume(this.volume);
        }, volumeSettings);
        unmuteButton.style.display = "none";
        
        const volumeSlider = this.createElement("input");
        volumeSlider.setAttribute("data-range", "volume");
        volumeSlider.setAttribute("type", "range");
        volumeSlider.setAttribute("min", 0);
        volumeSlider.setAttribute("max", 1);
        volumeSlider.setAttribute("step", 0.01);
        volumeSlider.setAttribute("autocomplete", "off");
        volumeSlider.setAttribute("role", "slider");
        volumeSlider.setAttribute("aria-label", "Volume");
        volumeSlider.setAttribute("aria-valuemin", 0);
        volumeSlider.setAttribute("aria-valuemax", 100);
    
        this.setVolume = (volume) => {
            this.saveSettings();
            this.muted = (volume === 0);
            volumeSlider.value = volume;
            volumeSlider.setAttribute("aria-valuenow", volume*100);
            volumeSlider.setAttribute("aria-valuetext", (volume*100).toFixed(1) + "%");
            volumeSlider.setAttribute("style", "--value: "+volume*100+"%;margin-left: 5px;position: relative;z-index: 2;");
            if (window.AL && AL.currentCtx && AL.currentCtx.sources) {
                AL.currentCtx.sources.forEach(e => {
                    e.gain.gain.value = volume;
                })
            }
            if (!this.config.buttonOpts || this.config.buttonOpts.mute !== false) {
                unmuteButton.style.display = (volume === 0) ? "" : "none";
                muteButton.style.display = (volume === 0) ? "none" : "";
            }
        }
        
        this.addEventListener(volumeSlider, "change mousemove touchmove mousedown touchstart mouseup", (e) => {
            setTimeout(() => {
                const newVal = parseFloat(volumeSlider.value);
                if (newVal === 0 && this.muted) return;
                this.volume = newVal;
                this.setVolume(this.volume);
            }, 5);
        })

        if (!this.config.buttonOpts || this.config.buttonOpts.volume !== false) {
            volumeSettings.appendChild(volumeSlider);
        }

        this.elements.menu.appendChild(volumeSettings);
        
        this.settingParent = this.createElement("div");
        this.settingsMenuOpen = false;
        const settingButton = addButton("Settings", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/></svg>', () => {
            this.settingsMenuOpen = !this.settingsMenuOpen;
            settingButton[1].classList.toggle("ejs_svg_rotate", this.settingsMenuOpen);
            this.settingsMenu.style.display = this.settingsMenuOpen ? "" : "none";
            settingButton[2].classList.toggle("ejs_settings_text", this.settingsMenuOpen);
        }, this.settingParent, true);
        this.elements.menu.appendChild(this.settingParent);
        this.closeSettingsMenu = () => {
            if (!this.settingsMenu) return;
            this.settingsMenuOpen = false;
            settingButton[1].classList.toggle("ejs_svg_rotate", this.settingsMenuOpen);
            settingButton[2].classList.toggle("ejs_settings_text", this.settingsMenuOpen);
            this.settingsMenu.style.display = "none";
        }
        this.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (this.isChild(this.settingsMenu, e.target)) return;
            if (e.pointerType === "touch") return;
            if (e.target === settingButton[0] || e.target === settingButton[2]) return;
            this.closeSettingsMenu();
        })
        this.addEventListener(this.canvas, "click", (e) => {
            if (e.pointerType === "touch") return;
            if (this.getCore(true) === "nds" && !this.paused) {
                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                } else if (this.canvas.mozRequestPointerLock) {
                    this.canvas.mozRequestPointerLock();
                }
                this.menu.close();
            }
        })
        
        const enter = addButton("Enter Fullscreen", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M208 281.4c-12.5-12.5-32.76-12.5-45.26-.002l-78.06 78.07l-30.06-30.06c-6.125-6.125-14.31-9.367-22.63-9.367c-4.125 0-8.279 .7891-12.25 2.43c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C.0013 501.3 10.75 512 24 512h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.49 12.5-32.75 .002-45.25L208 281.4zM487.1 0h-136c-12.94 0-24.63 7.797-29.56 19.75c-4.969 11.97-2.219 25.72 6.938 34.87l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.76 0 45.26l22.62 22.62c12.5 12.5 32.76 12.5 45.26 0l78.06-78.07l30.06 30.06c9.156 9.141 22.87 11.84 34.87 6.937C504.2 184.6 512 172.9 512 159.1V23.1C512 10.74 501.3 0 487.1 0z"/></svg>', () => {
            this.toggleFullscreen(true);
        });
        const exit = addButton("Exit Fullscreen", '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M215.1 272h-136c-12.94 0-24.63 7.797-29.56 19.75C45.47 303.7 48.22 317.5 57.37 326.6l30.06 30.06l-78.06 78.07c-12.5 12.5-12.5 32.75-.0012 45.25l22.62 22.62c12.5 12.5 32.76 12.5 45.26 .0013l78.06-78.07l30.06 30.06c6.125 6.125 14.31 9.367 22.63 9.367c4.125 0 8.279-.7891 12.25-2.43c11.97-4.953 19.75-16.62 19.75-29.56V296C239.1 282.7 229.3 272 215.1 272zM296 240h136c12.94 0 24.63-7.797 29.56-19.75c4.969-11.97 2.219-25.72-6.938-34.87l-30.06-30.06l78.06-78.07c12.5-12.5 12.5-32.76 .0002-45.26l-22.62-22.62c-12.5-12.5-32.76-12.5-45.26-.0003l-78.06 78.07l-30.06-30.06c-9.156-9.141-22.87-11.84-34.87-6.937c-11.97 4.953-19.75 16.62-19.75 29.56v135.1C272 229.3 282.7 240 296 240z"/></svg>', () => {
            this.toggleFullscreen(false);
        });
        exit.style.display = "none";
        
        this.toggleFullscreen = (fullscreen) => {
            if (fullscreen) {
                if (this.elements.parent.requestFullscreen) {
                    this.elements.parent.requestFullscreen();
                } else if (this.elements.parent.mozRequestFullScreen) {
                    this.elements.parent.mozRequestFullScreen();
                } else if (this.elements.parent.webkitRequestFullscreen) {
                    this.elements.parent.webkitRequestFullscreen();
                } else if (this.elements.parent.msRequestFullscreen) {
                    this.elements.parent.msRequestFullscreen();
                }
                exit.style.display = "";
                enter.style.display = "none";
                if (this.isMobile) {
                    try {
                        screen.orientation.lock(this.getCore(true) === "nds" ? "portrait" : "landscape").catch(e => {});;
                    } catch(e) {}
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                exit.style.display = "none";
                enter.style.display = "";
                if (this.isMobile) {
                    try {
                        screen.orientation.unlock();
                    } catch(e) {}
                }
            }
        }
        
        
        this.addEventListener(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", (e) => {
            if (e.target !== this.elements.parent) return;
            if (document.fullscreenElement === null) {
                exit.style.display = "none";
                enter.style.display = "";
            } else {
                //not sure if this is possible, lets put it here anyways
                exit.style.display = "";
                enter.style.display = "none";
            }
        })
        
        const hasFullscreen = !!(this.elements.parent.requestFullscreen || this.elements.parent.mozRequestFullScreen || this.elements.parent.webkitRequestFullscreen || this.elements.parent.msRequestFullscreen);
        
        if (!hasFullscreen) {
            exit.style.display = "none";
            enter.style.display = "none";
        }
        
        this.elements.bottomBar = {
            playPause: [pauseButton, playButton],
            restart: [restartButton],
            settings: [settingButton],
            fullscreen: [enter, exit],
            saveState: [saveState],
            loadState: [loadState],
            gamepad: [controlMenu],
            cheat: [cheatMenu],
            cacheManager: [cache],
            saveSavFiles: [saveSavFiles],
            loadSavFiles: [loadSavFiles],
            netplay: [netplay]
        }
        
        
        if (this.config.buttonOpts) {
            if (this.debug) console.log(this.config.buttonOpts);
            if (this.config.buttonOpts.playPause === false) {
                pauseButton.style.display = "none";
                playButton.style.display = "none";
            }
            if (this.config.buttonOpts.restart === false) restartButton.style.display = "none"
            if (this.config.buttonOpts.settings === false) settingButton[0].style.display = "none"
            if (this.config.buttonOpts.fullscreen === false) {
                enter.style.display = "none";
                exit.style.display = "none";
            }
            if (this.config.buttonOpts.mute === false) {
                muteButton.style.display = "none";
                unmuteButton.style.display = "none";
            }
            if (this.config.buttonOpts.saveState === false) saveState.style.display = "none"
            if (this.config.buttonOpts.loadState === false) loadState.style.display = "none"
            if (this.config.buttonOpts.saveSavFiles === false) saveSavFiles.style.display = "none"
            if (this.config.buttonOpts.loadSavFiles === false) loadSavFiles.style.display = "none"
            if (this.config.buttonOpts.gamepad === false) controlMenu.style.display = "none"
            if (this.config.buttonOpts.cheat === false) cheatMenu.style.display = "none"
            if (this.config.buttonOpts.cacheManager === false) cache.style.display = "none"
            if (this.config.buttonOpts.netplay === false) netplay.style.display = "none"
        }
    }
    openCacheMenu() {
        (async () => {
            const list = this.createElement("table");
            const tbody = this.createElement("tbody");
            const body = this.createPopup("Cache Manager", {
                "Clear All": async () => {
                    const roms = await this.storage.rom.getSizes();
                    for (const k in roms) {
                        await this.storage.rom.remove(k);
                    }
                    tbody.innerHTML = "";
                },
                "Close": () => {
                    this.closePopup();
                }
            });
            const roms = await this.storage.rom.getSizes();
            list.style.width = "100%";
            list.style["padding-left"] = "10px";
            list.style["text-align"] = "left";
            body.appendChild(list);
            list.appendChild(tbody);
            const getSize = function(size) {
                let i = -1;
                do {
                    size /= 1024, i++;
                } while (size > 1024);
                return Math.max(size, 0.1).toFixed(1) + [' kB', ' MB', ' GB', ' TB', 'PB', 'EB', 'ZB', 'YB'][i];
            }
            for (const k in roms) {
                const line = this.createElement("tr");
                const name = this.createElement("td");
                const size = this.createElement("td");
                const remove = this.createElement("td");
                remove.style.cursor = "pointer";
                name.innerText = k;
                size.innerText = getSize(roms[k]);
                
                const a = this.createElement("a");
                a.innerText = this.localization("Remove");
                this.addEventListener(remove, "click", () => {
                    this.storage.rom.remove(k);
                    line.remove();
                })
                remove.appendChild(a);
                
                line.appendChild(name);
                line.appendChild(size);
                line.appendChild(remove);
                tbody.appendChild(line);
            }
            
        })();
    }
    getControlScheme() {
        if (this.config.controlScheme && typeof this.config.controlScheme === 'string') {
            return this.config.controlScheme;
        } else {
            return this.getCore(true);
        }
    }
    createControlSettingMenu() {
        let buttonListeners = [];
        this.checkGamepadInputs = () => buttonListeners.forEach(elem => elem());
        this.gamepadLabels = [];
        this.controls = JSON.parse(JSON.stringify(this.defaultControllers));
        const body = this.createPopup("Control Settings", {
            "Reset": () => {
                this.controls = JSON.parse(JSON.stringify(this.defaultControllers));
                this.setupKeys();
                this.checkGamepadInputs();
                this.saveSettings();
            },
            "Clear": () => {
                this.controls = {0:{},1:{},2:{},3:{}};
                this.setupKeys();
                this.checkGamepadInputs();
                this.saveSettings();
            },
            "Close": () => {
                this.controlMenu.style.display = "none";
            }
        }, true);
        this.setupKeys();
        this.controlMenu = body.parentElement;
        body.classList.add("ejs_control_body");
        
        let buttons;
        if (['nes', 'gb'].includes(this.getControlScheme())) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('snes' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 9, label: this.localization('X')},
                {id: 1, label: this.localization('Y')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
            ];
        } else if ('n64' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('A')},
                {id: 1, label: this.localization('B')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('D-PAD UP')},
                {id: 5, label: this.localization('D-PAD DOWN')},
                {id: 6, label: this.localization('D-PAD LEFT')},
                {id: 7, label: this.localization('D-PAD RIGHT')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 12, label: this.localization('Z')},
                {id: 19, label: this.localization('STICK UP')},
                {id: 18, label: this.localization('STICK DOWN')},
                {id: 17, label: this.localization('STICK LEFT')},
                {id: 16, label: this.localization('STICK RIGHT')},
                {id: 23, label: this.localization('C-PAD UP')},
                {id: 22, label: this.localization('C-PAD DOWN')},
                {id: 21, label: this.localization('C-PAD LEFT')},
                {id: 20, label: this.localization('C-PAD RIGHT')},
            ];
        } else if ('gba' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('nds' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 9, label: this.localization('X')},
                {id: 1, label: this.localization('Y')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 14, label: this.localization('Microphone')},
            ];
        } else if ('vb' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('LEFT D-PAD UP')},
                {id: 5, label: this.localization('LEFT D-PAD DOWN')},
                {id: 6, label: this.localization('LEFT D-PAD LEFT')},
                {id: 7, label: this.localization('LEFT D-PAD RIGHT')},
                {id: 19, label: this.localization('RIGHT D-PAD UP')},
                {id: 18, label: this.localization('RIGHT D-PAD DOWN')},
                {id: 17, label: this.localization('RIGHT D-PAD LEFT')},
                {id: 16, label: this.localization('RIGHT D-PAD RIGHT')},
            ];
        } else if (['segaMD', 'segaCD', 'sega32x'].includes(this.getControlScheme())) {
            buttons = [
                {id: 1, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 8, label: this.localization('C')},
                {id: 10, label: this.localization('X')},
                {id: 9, label: this.localization('Y')},
                {id: 11, label: this.localization('Z')},
                {id: 3, label: this.localization('START')},
                {id: 2, label: this.localization('MODE')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('segaMS' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('BUTTON 1 / START')},
                {id: 8, label: this.localization('BUTTON 2')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('segaGG' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('BUTTON 1')},
                {id: 8, label: this.localization('BUTTON 2')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('segaSaturn' === this.getControlScheme()) {
            buttons = [
                {id: 1, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 8, label: this.localization('C')},
                {id: 9, label: this.localization('X')},
                {id: 10, label: this.localization('Y')},
                {id: 11, label: this.localization('Z')},
                {id: 12, label: this.localization('L')},
                {id: 13, label: this.localization('R')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('3do' === this.getControlScheme()) {
            buttons = [
                {id: 1, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 8, label: this.localization('C')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 2, label: this.localization('X')},
                {id: 3, label: this.localization('P')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('atari2600' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('FIRE')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('RESET')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
                {id: 10, label: this.localization('LEFT DIFFICULTY A')},
                {id: 12, label: this.localization('LEFT DIFFICULTY B')},
                {id: 11, label: this.localization('RIGHT DIFFICULTY A')},
                {id: 13, label: this.localization('RIGHT DIFFICULTY B')},
                {id: 14, label: this.localization('COLOR')},
                {id: 15, label: this.localization('B/W')},
            ];
        } else if ('atari7800' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('BUTTON 1')},
                {id: 8, label: this.localization('BUTTON 2')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('PAUSE')},
                {id: 9, label: this.localization('RESET')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
                {id: 10, label: this.localization('LEFT DIFFICULTY')},
                {id: 11, label: this.localization('RIGHT DIFFICULTY')},
            ];
        } else if ('lynx' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 10, label: this.localization('OPTION 1')},
                {id: 11, label: this.localization('OPTION 2')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('jaguar' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 1, label: this.localization('C')},
                {id: 2, label: this.localization('PAUSE')},
                {id: 3, label: this.localization('OPTION')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('pce' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('I')},
                {id: 0, label: this.localization('II')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('RUN')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('ngp' === this.getControlScheme()) {
            buttons = [
                {id: 0, label: this.localization('A')},
                {id: 8, label: this.localization('B')},
                {id: 3, label: this.localization('OPTION')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('ws' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('A')},
                {id: 0, label: this.localization('B')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('X UP')},
                {id: 5, label: this.localization('X DOWN')},
                {id: 6, label: this.localization('X LEFT')},
                {id: 7, label: this.localization('X RIGHT')},
                {id: 13, label: this.localization('Y UP')},
                {id: 12, label: this.localization('Y DOWN')},
                {id: 10, label: this.localization('Y LEFT')},
                {id: 11, label: this.localization('Y RIGHT')},
            ];
        } else if ('coleco' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('LEFT BUTTON')},
                {id: 0, label: this.localization('RIGHT BUTTON')},
                {id: 9, label: this.localization('1')},
                {id: 1, label: this.localization('2')},
                {id: 11, label: this.localization('3')},
                {id: 10, label: this.localization('4')},
                {id: 13, label: this.localization('5')},
                {id: 12, label: this.localization('6')},
                {id: 15, label: this.localization('7')},
                {id: 14, label: this.localization('8')},
                {id: 2, label: this.localization('*')},
                {id: 3, label: this.localization('#')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else if ('pcfx' === this.getControlScheme()) {
            buttons = [
                {id: 8, label: this.localization('I')},
                {id: 0, label: this.localization('II')},
                {id: 9, label: this.localization('III')},
                {id: 1, label: this.localization('IV')},
                {id: 10, label: this.localization('V')},
                {id: 11, label: this.localization('VI')},
                {id: 3, label: this.localization('RUN')},
                {id: 2, label: this.localization('SELECT')},
                {id: 12, label: this.localization('MODE1')},
                {id: 13, label: this.localization('MODE2')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
            ];
        } else {
            buttons = [
                {id: 0, label: this.localization('B')},
                {id: 1, label: this.localization('Y')},
                {id: 2, label: this.localization('SELECT')},
                {id: 3, label: this.localization('START')},
                {id: 4, label: this.localization('UP')},
                {id: 5, label: this.localization('DOWN')},
                {id: 6, label: this.localization('LEFT')},
                {id: 7, label: this.localization('RIGHT')},
                {id: 8, label: this.localization('A')},
                {id: 9, label: this.localization('X')},
                {id: 10, label: this.localization('L')},
                {id: 11, label: this.localization('R')},
                {id: 12, label: this.localization('L2')},
                {id: 13, label: this.localization('R2')},
                {id: 14, label: this.localization('L3')},
                {id: 15, label: this.localization('R3')},
                {id: 19, label: this.localization('L STICK UP')},
                {id: 18, label: this.localization('L STICK DOWN')},
                {id: 17, label: this.localization('L STICK LEFT')},
                {id: 16, label: this.localization('L STICK RIGHT')},
                {id: 23, label: this.localization('R STICK UP')},
                {id: 22, label: this.localization('R STICK DOWN')},
                {id: 21, label: this.localization('R STICK LEFT')},
                {id: 20, label: this.localization('R STICK RIGHT')},
            ];
        }
        if (['arcade', 'mame'].includes(this.getControlScheme())) {
            for (const buttonIdx in buttons) {
                if (buttons[buttonIdx].id === 2) {
                    buttons[buttonIdx].label = this.localization('INSERT COIN');
                }
            }
        }
        buttons.push(
            {id: 24, label: this.localization('QUICK SAVE STATE')},
            {id: 25, label: this.localization('QUICK LOAD STATE')},
            {id: 26, label: this.localization('CHANGE STATE SLOT')},
            {id: 27, label: this.localization('FAST FORWARD')},
            {id: 29, label: this.localization('SLOW MOTION')},
            {id: 28, label: this.localization('REWIND')}
        );
        //if (_this.statesSupported === false) {
        //    delete buttons[24];
        //    delete buttons[25];
        //    delete buttons[26];
        //}
        let selectedPlayer;
        let players = [];
        let playerDivs = [];
        
        const playerSelect = this.createElement("ul");
        playerSelect.classList.add("ejs_control_player_bar");
        for (let i=1; i<5; i++) {
            const playerContainer = this.createElement("li");
            playerContainer.classList.add("tabs-title");
            playerContainer.setAttribute("role", "presentation");
            const player = this.createElement("a");
            player.innerText = this.localization("Player")+" "+i;
            player.setAttribute("role", "tab");
            player.setAttribute("aria-controls", "controls-"+(i-1));
            player.setAttribute("aria-selected", "false");
            player.id = "controls-"+(i-1)+"-label";
            this.addEventListener(player, "click", (e) => {
                e.preventDefault();
                players[selectedPlayer].classList.remove("ejs_control_selected");
                playerDivs[selectedPlayer].setAttribute("hidden", "");
                selectedPlayer = i-1;
                players[i-1].classList.add("ejs_control_selected");
                playerDivs[i-1].removeAttribute("hidden");
            })
            playerContainer.appendChild(player);
            playerSelect.appendChild(playerContainer);
            players.push(playerContainer);
        }
        body.appendChild(playerSelect);
        
        const controls = this.createElement("div");
        for (let i=0; i<4; i++) {
            if (!this.controls[i]) this.controls[i] = {};
            const player = this.createElement("div");
            const playerTitle = this.createElement("div");
            
            const gamepadTitle = this.createElement("div");
            gamepadTitle.style = "font-size:12px;";
            gamepadTitle.innerText = this.localization("Connected Gamepad")+": ";
            
            const gamepadName = this.createElement("span");
            this.gamepadLabels.push(gamepadName);
            gamepadName.innerText = "n/a";
            gamepadTitle.appendChild(gamepadName);
            
            const leftPadding = this.createElement("div");
            leftPadding.style = "width:25%;float:left;";
            leftPadding.innerHTML = "&nbsp;";
            
            const aboutParent = this.createElement("div");
            aboutParent.style = "font-size:12px;width:50%;float:left;";
            const gamepad = this.createElement("div");
            gamepad.style = "text-align:center;width:50%;float:left;";
            gamepad.innerText = this.localization("Gamepad");
            aboutParent.appendChild(gamepad);
            const keyboard = this.createElement("div");
            keyboard.style = "text-align:center;width:50%;float:left;";
            keyboard.innerText = this.localization("Keyboard");
            aboutParent.appendChild(keyboard);
            
            const headingPadding = this.createElement("div");
            headingPadding.style = "clear:both;";
            
            playerTitle.appendChild(gamepadTitle);
            playerTitle.appendChild(leftPadding);
            playerTitle.appendChild(aboutParent);
            
            if ((this.touch || navigator.maxTouchPoints > 0) && i === 0) {
                const vgp = this.createElement("div");
                vgp.style = "width:25%;float:right;clear:none;padding:0;font-size: 11px;padding-left: 2.25rem;";
                vgp.classList.add("ejs_control_row");
                vgp.classList.add("ejs_cheat_row");
                const input = this.createElement("input");
                input.type = "checkbox";
                input.checked = true;
                input.value = "o";
                input.id = "ejs_vp";
                vgp.appendChild(input);
                const label = this.createElement("label");
                label.for = "ejs_vp";
                label.innerText = "Virtual Gamepad";
                vgp.appendChild(label);
                label.addEventListener("click", (e) => {
                    input.checked = !input.checked;
                    this.changeSettingOption('virtual-gamepad', input.checked ? 'enabled' : "disabled");
                })
                this.on("start", (e) => {
                    if (this.settings["virtual-gamepad"] === "disabled") {
                        input.checked = false;
                    }
                })
                playerTitle.appendChild(vgp);
            }
            
            playerTitle.appendChild(headingPadding);
            
            
            player.appendChild(playerTitle);
            
            for (const buttonIdx in buttons) {
                const k = buttons[buttonIdx].id;
                const controlLabel = buttons[buttonIdx].label;

                const buttonText = this.createElement("div");
                buttonText.setAttribute("data-id", k);
                buttonText.setAttribute("data-index", i);
                buttonText.setAttribute("data-label", controlLabel);
                buttonText.style = "margin-bottom:10px;";
                buttonText.classList.add("ejs_control_bar");
                
                
                const title = this.createElement("div");
                title.style = "width:25%;float:left;font-size:12px;";
                const label = this.createElement("label");
                label.innerText = controlLabel+":";
                title.appendChild(label);
                
                const textBoxes = this.createElement("div");
                textBoxes.style = "width:50%;float:left;";
                
                const textBox1Parent = this.createElement("div");
                textBox1Parent.style = "width:50%;float:left;padding: 0 5px;";
                const textBox1 = this.createElement("input");
                textBox1.style = "text-align:center;height:25px;width: 100%;";
                textBox1.type = "text";
                textBox1.setAttribute("readonly", "");
                textBox1.setAttribute("placeholder", "");
                textBox1Parent.appendChild(textBox1);
                
                const textBox2Parent = this.createElement("div");
                textBox2Parent.style = "width:50%;float:left;padding: 0 5px;";
                const textBox2 = this.createElement("input");
                textBox2.style = "text-align:center;height:25px;width: 100%;";
                textBox2.type = "text";
                textBox2.setAttribute("readonly", "");
                textBox2.setAttribute("placeholder", "");
                textBox2Parent.appendChild(textBox2);
                
                buttonListeners.push(() => {
                    textBox2.value = "";
                    textBox1.value = "";
                    if (this.controls[i][k] && this.controls[i][k].value !== undefined) {
                        let value = this.keyMap[this.controls[i][k].value];
                        value = this.localization(value);
                        textBox2.value = value;
                    }
                    if (this.controls[i][k] && this.controls[i][k].value2 !== undefined && this.controls[i][k].value2 !== "") {
                        let value2 = this.controls[i][k].value2.toString();
                        if (value2.includes(":")) {
                            value2 = value2.split(":");
                            value2 = this.localization(value2[0]) + ":" + this.localization(value2[1])
                        } else if (!isNaN(value2)){
                            value2 = this.localization("BUTTON")+" "+this.localization(value2);
                        } else {
                            value2 = this.localization(value2);
                        }
                        textBox1.value = value2;
                    }
                })
                
                if (this.controls[i][k] && this.controls[i][k].value) {
                    let value = this.keyMap[this.controls[i][k].value];
                    value = this.localization(value);
                    textBox2.value = value;
                }
                if (this.controls[i][k] && this.controls[i][k].value2) {
                    let value2 = this.controls[i][k].value2.toString();
                    if (value2.includes(":")) {
                        value2 = value2.split(":");
                        value2 = this.localization(value2[0]) + ":" + this.localization(value2[1])
                    } else if (!isNaN(value2)){
                        value2 = this.localization("BUTTON")+" "+this.localization(value2);
                    } else {
                        value2 = this.localization(value2);
                    }
                    textBox1.value = value2;
                }
                
                textBoxes.appendChild(textBox1Parent);
                textBoxes.appendChild(textBox2Parent);
                
                const padding = this.createElement("div");
                padding.style = "clear:both;";
                textBoxes.appendChild(padding);
                
                const setButton = this.createElement("div");
                setButton.style = "width:25%;float:left;";
                const button = this.createElement("a");
                button.classList.add("ejs_control_set_button");
                button.innerText = this.localization("Set");
                setButton.appendChild(button);
                
                const padding2 = this.createElement("div");
                padding2.style = "clear:both;";
                
                buttonText.appendChild(title);
                buttonText.appendChild(textBoxes);
                buttonText.appendChild(setButton);
                buttonText.appendChild(padding2);
                
                player.appendChild(buttonText);
                
                this.addEventListener(buttonText, "mousedown", (e) => {
                    e.preventDefault();
                    this.controlPopup.parentElement.parentElement.removeAttribute("hidden");
                    this.controlPopup.innerText = "[ " + controlLabel + " ]\n"+this.localization("Press Keyboard");
                    this.controlPopup.setAttribute("button-num", k);
                    this.controlPopup.setAttribute("player-num", i);
                })
            }
            controls.appendChild(player);
            player.setAttribute("hidden", "");
            playerDivs.push(player);
        }
        body.appendChild(controls);
        
        
        selectedPlayer = 0;
        players[0].classList.add("ejs_control_selected");
        playerDivs[0].removeAttribute("hidden");
        
        
        const popup = this.createElement('div');
        popup.classList.add("ejs_popup_container");
        const popupMsg = this.createElement("div");
        this.addEventListener(popup, "mousedown click touchstart", (e) => {
            if (this.isChild(popupMsg, e.target)) return;
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
        })
        const btn = this.createElement("a");
        btn.classList.add("ejs_control_set_button");
        btn.innerText = this.localization("Clear");
        this.addEventListener(btn, "mousedown click touchstart", (e) => {
            const num = this.controlPopup.getAttribute("button-num");
            const player = this.controlPopup.getAttribute("player-num");
            if (!this.controls[player][num]) {
                this.controls[player][num] = {};
            }
            this.controls[player][num].value = 0;
            this.controls[player][num].value2 = "";
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
            this.checkGamepadInputs();
            this.saveSettings();
        })
        popupMsg.classList.add("ejs_popup_box");
        popupMsg.innerText = "";
        popup.setAttribute("hidden", "");
        const popMsg = this.createElement("div");
        this.controlPopup = popMsg;
        popup.appendChild(popupMsg);
        popupMsg.appendChild(popMsg);
        popupMsg.appendChild(this.createElement("br"));
        popupMsg.appendChild(btn);
        this.controlMenu.appendChild(popup);
        
    }
    defaultControllers = {
        0: {
            0: {
                'value': 'x',
                'value2': 'BUTTON_2'
            },
            1: {
                'value': 's',
                'value2': 'BUTTON_4'
            },
            2: {
                'value': 'v',
                'value2': 'SELECT'
            },
            3: {
                'value': 'enter',
                'value2': 'START'
            },
            4: {
                'value': 'up arrow',
                'value2': 'DPAD_UP'
            },
            5: {
                'value': 'down arrow',
                'value2': 'DPAD_DOWN'
            },
            6: {
                'value': 'left arrow',
                'value2': 'DPAD_LEFT'
            },
            7: {
                'value': 'right arrow',
                'value2': 'DPAD_RIGHT'
            },
            8: {
                'value': 'z',
                'value2': 'BUTTON_1'
            },
            9: {
                'value': 'a',
                'value2': 'BUTTON_3'
            },
            10: {
                'value': 'q',
                'value2': 'LEFT_TOP_SHOULDER'
            },
            11: {
                'value': 'e',
                'value2': 'RIGHT_TOP_SHOULDER'
            },
            12: {
                'value': 'tab',
                'value2': 'LEFT_BOTTOM_SHOULDER'
            },
            13: {
                'value': 'r',
                'value2': 'RIGHT_BOTTOM_SHOULDER'
            },
            14: {
                'value': '',
                'value2': 'LEFT_STICK',
            },
            15: {
                'value': '',
                'value2': 'RIGHT_STICK',
            },
            16: {
                'value': 'h',
                'value2': 'LEFT_STICK_X:+1'
            },
            17: {
                'value': 'f',
                'value2': 'LEFT_STICK_X:-1'
            },
            18: {
                'value': 'g',
                'value2': 'LEFT_STICK_Y:+1'
            },
            19: {
                'value': 't',
                'value2': 'LEFT_STICK_Y:-1'
            },
            20: {
                'value': 'l',
                'value2': 'RIGHT_STICK_X:+1'
            },
            21: {
                'value': 'j',
                'value2': 'RIGHT_STICK_X:-1'
            },
            22: {
                'value': 'k',
                'value2': 'RIGHT_STICK_Y:+1'
            },
            23: {
                'value': 'i',
                'value2': 'RIGHT_STICK_Y:-1'
            },
            24: {
                'value': '1'
            },
            25: {
                'value': '2'
            },
            26: {
                'value': '3'
            },
            27: {},
            28: {},
            29: {},
        },
        1: {},
        2: {},
        3: {}
    }
    keyMap = {
        0: '',
        8: 'backspace',
        9: 'tab',
        13: 'enter',
        16: 'shift',
        17: 'ctrl',
        18: 'alt',
        19: 'pause/break',
        20: 'caps lock',
        27: 'escape',
        32: 'space',
        33: 'page up',
        34: 'page down',
        35: 'end',
        36: 'home',
        37: 'left arrow',
        38: 'up arrow',
        39: 'right arrow',
        40: 'down arrow',
        45: 'insert',
        46: 'delete',
        48: '0',
        49: '1',
        50: '2',
        51: '3',
        52: '4',
        53: '5',
        54: '6',
        55: '7',
        56: '8',
        57: '9',
        65: 'a',
        66: 'b',
        67: 'c',
        68: 'd',
        69: 'e',
        70: 'f',
        71: 'g',
        72: 'h',
        73: 'i',
        74: 'j',
        75: 'k',
        76: 'l',
        77: 'm',
        78: 'n',
        79: 'o',
        80: 'p',
        81: 'q',
        82: 'r',
        83: 's',
        84: 't',
        85: 'u',
        86: 'v',
        87: 'w',
        88: 'x',
        89: 'y',
        90: 'z',
        91: 'left window key',
        92: 'right window key',
        93: 'select key',
        96: 'numpad 0',
        97: 'numpad 1',
        98: 'numpad 2',
        99: 'numpad 3',
        100: 'numpad 4',
        101: 'numpad 5',
        102: 'numpad 6',
        103: 'numpad 7',
        104: 'numpad 8',
        105: 'numpad 9',
        106: 'multiply',
        107: 'add',
        109: 'subtract',
        110: 'decimal point',
        111: 'divide',
        112: 'f1',
        113: 'f2',
        114: 'f3',
        115: 'f4',
        116: 'f5',
        117: 'f6',
        118: 'f7',
        119: 'f8',
        120: 'f9',
        121: 'f10',
        122: 'f11',
        123: 'f12',
        144: 'num lock',
        145: 'scroll lock',
        186: 'semi-colon',
        187: 'equal sign',
        188: 'comma',
        189: 'dash',
        190: 'period',
        191: 'forward slash',
        192: 'grave accent',
        219: 'open bracket',
        220: 'back slash',
        221: 'close braket',
        222: 'single quote'
    }
    controls;
    setupKeys(){
        for (let i=0; i<4; i++) {
            for (let j=0; j<30; j++) {
                if (this.controls[i][j] && this.keyMap) {
                    this.controls[i][j].value = Number(this.keyLookup(this.controls[i][j]));
                    if(this.controls[i][j].value === -1){
                        console.warn("Invalid key for control "+j+" player "+i+" with value "+this.keyMap[this.keyLookup(this.defaultControllers[i][j])]);
                    }
                }
            }
        }
    }
    keyLookup(controllerkey){
        for (var key in this.keyMap) {
            if (this.keyMap[key] === controllerkey.value || key === controllerkey.value) {
                return key;
            } else if (controllerkey.value === undefined) {
                return 0;
            }
        }
        return -1;
    }
    keyChange(e) {
        if (e.repeat) return;
        if (!this.started) return;
        if (this.controlPopup.parentElement.parentElement.getAttribute("hidden") === null) {
            const num = this.controlPopup.getAttribute("button-num");
            const player = this.controlPopup.getAttribute("player-num");
            if (!this.controls[player][num]) {
                this.controls[player][num] = {};
            }
            this.controls[player][num].value = e.keyCode;
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
            this.checkGamepadInputs();
            this.saveSettings();
            return;
        }
        if (this.settingsMenu.style.display !== "none" || this.isPopupOpen()) return;
        e.preventDefault();
        const special = [16, 17, 18, 19, 20, 21, 22, 23];
        for (let i=0; i<4; i++) {
            for (let j=0; j<30; j++) {
                if (this.controls[i][j] && this.controls[i][j].value === e.keyCode) {
                    this.gameManager.simulateInput(i, j, (e.type === 'keyup' ? 0 : (special.includes(j) ? 0x7fff : 1)));
                }
            }
        }
    }
    gamepadEvent(e) {
        if (!this.started) return;
        const value = function(value) {
            if (value > 0.5 || value < -0.5) {
                return (value > 0) ? 1 : -1;
            } else {
                return 0;
            }
        }(e.value || 0);
        if (this.controlPopup.parentElement.parentElement.getAttribute("hidden") === null) {
            if ('buttonup' === e.type || (e.type === "axischanged" && value === 0)) return;
            const num = this.controlPopup.getAttribute("button-num");
            const player = parseInt(this.controlPopup.getAttribute("player-num"));
            if (e.gamepadIndex !== player) return;
            if (!this.controls[player][num]) {
                this.controls[player][num] = {};
            }
            this.controls[player][num].value2 = e.label;
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
            this.checkGamepadInputs();
            this.saveSettings();
            return;
        }
        if (this.settingsMenu.style.display !== "none" || this.isPopupOpen()) return;
        const special = [16, 17, 18, 19, 20, 21, 22, 23];
        for (let i=0; i<4; i++) {
            if (e.gamepadIndex !== i) continue;
            for (let j=0; j<30; j++) {
                if (!this.controls[i][j] || this.controls[i][j].value2 === undefined) {
                    continue;
                }
                const controlValue = this.controls[i][j].value2;

                if (['buttonup', 'buttondown'].includes(e.type) && (controlValue === e.label || controlValue === e.index)) {
                    this.gameManager.simulateInput(i, j, (e.type === 'buttonup' ? 0 : (special.includes(j) ? 0x7fff : 1)));
                } else if (e.type === "axischanged") {
                    if (typeof controlValue === 'string' && controlValue.split(":")[0] === e.axis) {
                        if (special.includes(j)) {
                            if (e.axis === 'LEFT_STICK_X') {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 16, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 17, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 17, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 16, 0);
                                }
                            } else if (e.axis === 'LEFT_STICK_Y') {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 18, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 19, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 19, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 18, 0);
                                }
                            } else if (e.axis === 'RIGHT_STICK_X') {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 20, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 21, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 21, -0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 20, 0);
                                }
                            } else if (e.axis === 'RIGHT_STICK_Y') {
                                if (e.value > 0) {
                                    this.gameManager.simulateInput(i, 22, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 23, 0);
                                } else {
                                    this.gameManager.simulateInput(i, 23, 0x7fff * e.value);
                                    this.gameManager.simulateInput(i, 22, 0);
                                }
                            }
                        } else if (value === 0 || controlValue === e.label || controlValue === `${e.axis}:${value}`) {
                            this.gameManager.simulateInput(i, j, ((value === 0) ? 0 : 1));
                        }
                    }
                }
            }
        }
    }
    setVirtualGamepad() {
        this.virtualGamepad = this.createElement("div");
        this.toggleVirtualGamepad = (show) => {
            this.virtualGamepad.style.display = show ? "" : "none";
        }
        this.virtualGamepad.classList.add("ejs_virtualGamepad_parent");
        this.elements.parent.appendChild(this.virtualGamepad);

        const speedControlButtons = [
            {"type":"button","text":"Fast","id":"speed-fast","location":"center","left":-35,"top":50,"fontSize":15,"block":true,"input_value":27},
            {"type":"button","text":"Slow","id":"speed-slow","location":"center","left":95,"top":50,"fontSize":15,"block":true,"input_value":29},
        ];
        if (this.rewindEnabled) {
            speedControlButtons.push({"type":"button","text":"Rewind","id":"speed-rewind","location":"center","left":30,"top":50,"fontSize":15,"block":true,"input_value":28});
        }

        let info;
        if (this.config.VirtualGamepadSettings && function(set) {
            if (!Array.isArray(set)) {
                console.warn("Virtual gamepad settings is not array! Using default gamepad settings");
                return false;
            }
            if (!set.length) {
                console.warn("Virtual gamepad settings is empty! Using default gamepad settings");
                return false;
            }
            for (let i=0; i<set.length; i++) {
                if (!set[i].type) continue;
                try {
                    if (set[i].type === 'zone' || set[i].type === 'dpad') {
                        if (!set[i].location) {
                            console.warn("Missing location value for "+set[i].type+"! Using default gamepad settings");
                            return false;
                        } else if (!set[i].inputValues) {
                            console.warn("Missing inputValues for "+set[i].type+"! Using default gamepad settings");
                            return false;
                        }
                        continue;
                    }
                    if (!set[i].location) {
                        console.warn("Missing location value for button "+set[i].text+"! Using default gamepad settings");
                        return false;
                    } else if (!set[i].type) {
                        console.warn("Missing type value for button "+set[i].text+"! Using default gamepad settings");
                        return false;
                    } else if (!set[i].id.toString()) {
                        console.warn("Missing id value for button "+set[i].text+"! Using default gamepad settings");
                        return false;
                    } else if (!set[i].input_value.toString()) {
                        console.warn("Missing input_value for button "+set[i].text+"! Using default gamepad settings");
                        return false;
                    }
                } catch(e) {
                    console.warn("Error checking values! Using default gamepad settings");
                    return false;
                }
            }
            return true;
        }(this.config.VirtualGamepadSettings)) {
            info = this.config.VirtualGamepadSettings;
        } else if ("gba" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"b","location":"right","left":10,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"A","id":"a","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-90,"bold":true,"block":true,"input_value":10},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-90,"bold":true,"block":true,"input_value":11}
            ];
            info.push(...speedControlButtons);
        } else if ("gb" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"A","id":"a","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"button","text":"B","id":"b","location":"right","left":10,"top":70,"bold":true,"input_value":0},
                {"type":"dpad","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ('nes' === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"A","id":"a","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ('n64' === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"b","location":"right","left":-10,"top":95,"input_value":1,"bold":true},
                {"type":"button","text":"A","id":"a","location":"right","left":40,"top":150,"input_value":0,"bold":true},
                {"type":"zone","location":"left","left":"50%","top":"100%","joystickInput":true,"inputValues":[16, 17, 18, 19]},
                {"type":"zone","location":"left","left":"50%","top":"0%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":30,"top":-10,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"L","id":"l","block":true,"location":"top","left":10,"top":-40,"bold":true,"input_value":10},
                {"type":"button","text":"R","id":"r","block":true,"location":"top","right":10,"top":-40,"bold":true,"input_value":11},
                {"type":"button","text":"Z","id":"z","block":true,"location":"top","left":10,"bold":true,"input_value":12},
                {"fontSize":20,"type":"button","text":"CU","id":"cu","location":"right","left":25,"top":-65,"input_value":23},
                {"fontSize":20,"type":"button","text":"CD","id":"cd","location":"right","left":25,"top":15,"input_value":22},
                {"fontSize":20,"type":"button","text":"CL","id":"cl","location":"right","left":-15,"top":-25,"input_value":21},
                {"fontSize":20,"type":"button","text":"CR","id":"cr","location":"right","left":65,"top":-25,"input_value":20}
            ];
            info.push(...speedControlButtons);
        } else if ("nds" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"X","id":"x","location":"right","left":40,"bold":true,"input_value":9},
                {"type":"button","text":"Y","id":"y","location":"right","top":40,"bold":true,"input_value":1},
                {"type":"button","text":"A","id":"a","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"button","text":"B","id":"b","location":"right","left":40,"top":80,"bold":true,"input_value":0},
                {"type":"dpad","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-100,"bold":true,"block":true,"input_value":10},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-100,"bold":true,"block":true,"input_value":11}
            ];
            info.push(...speedControlButtons);
        } else if ("snes" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"X","id":"x","location":"right","left":40,"bold":true,"input_value":9},
                {"type":"button","text":"Y","id":"y","location":"right","top":40,"bold":true,"input_value":1},
                {"type":"button","text":"A","id":"a","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"button","text":"B","id":"b","location":"right","left":40,"top":80,"bold":true,"input_value":0},
                {"type":"dpad","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-100,"bold":true,"block":true,"input_value":10},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-100,"bold":true,"block":true,"input_value":11}
            ];
            info.push(...speedControlButtons);
        } else if (['segaMD', 'segaCD', 'sega32x'].includes(this.getControlScheme())) {
            info = [
                {"type":"button","text":"A","id":"a","location":"right","right":145,"top":70,"bold":true,"input_value":1},
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"C","id":"c","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"button","text":"X","id":"x","location":"right","right":145,"top":0,"bold":true,"input_value":10},
                {"type":"button","text":"Y","id":"y","location":"right","right":75,"top":0,"bold":true,"input_value":9},
                {"type":"button","text":"Z","id":"z","location":"right","right":5,"top":0,"bold":true,"input_value":11},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Mode","id":"mode","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else if ("segaMS" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"1","id":"button1","location":"right","left":10,"top":40,"bold":true,"input_value":0},
                {"type":"button","text":"2","id":"button2","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]}
            ];
            info.push(...speedControlButtons);
        } else if ("segaGG" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"1","id":"button1","location":"right","left":10,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"2","id":"button2","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":30,"fontSize":15,"block":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else if ("segaSaturn" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"A","id":"a","location":"right","right":145,"top":70,"bold":true,"input_value":1},
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"C","id":"c","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"button","text":"X","id":"x","location":"right","right":145,"top":0,"bold":true,"input_value":9},
                {"type":"button","text":"Y","id":"y","location":"right","right":75,"top":0,"bold":true,"input_value":10},
                {"type":"button","text":"Z","id":"z","location":"right","right":5,"top":0,"bold":true,"input_value":11},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-90,"bold":true,"block":true,"input_value":12},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-90,"bold":true,"block":true,"input_value":13},
                {"type":"button","text":"Start","id":"start","location":"center","left":30,"fontSize":15,"block":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else if ("atari2600" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"","id":"button1","location":"right","right":10,"top":70,"bold":true,"input_value":0},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Reset","id":"reset","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ("atari7800" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"1","id":"button1","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"2","id":"button2","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Reset","id":"reset","location":"center","left":-35,"fontSize":15,"block":true,"input_value":9},
                {"type":"button","text":"Pause","id":"pause","location":"center","left":95,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":30,"fontSize":15,"block":true,"input_value":2},
            ];
            info.push(...speedControlButtons);
        } else if ("lynx" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"button1","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"A","id":"button2","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Opt 1","id":"option1","location":"center","left":-35,"fontSize":15,"block":true,"input_value":10},
                {"type":"button","text":"Opt 2","id":"option2","location":"center","left":95,"fontSize":15,"block":true,"input_value":11},
                {"type":"button","text":"Start","id":"start","location":"center","left":30,"fontSize":15,"block":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else if ("jaguar" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"A","id":"a","location":"right","right":145,"top":70,"bold":true,"input_value":8},
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"C","id":"c","location":"right","right":5,"top":70,"bold":true,"input_value":1},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Option","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Pause","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ("vb" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":150,"bold":true,"input_value":0},
                {"type":"button","text":"A","id":"a","location":"right","right":5,"top":150,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"dpad","location":"right","left":"50%","right":"50%","joystickInput":false,"inputValues":[19,18,17,16]},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-90,"bold":true,"block":true,"input_value":10},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-90,"bold":true,"block":true,"input_value":11},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ("3do" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"A","id":"a","location":"right","right":145,"top":70,"bold":true,"input_value":1},
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"C","id":"c","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"L","id":"l","location":"left","left":3,"top":-90,"bold":true,"block":true,"input_value":10},
                {"type":"button","text":"R","id":"r","location":"right","right":3,"top":-90,"bold":true,"block":true,"input_value":11},
                {"type":"button","text":"X","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"bold":true,"input_value":2},
                {"type":"button","text":"P","id":"start","location":"center","left":60,"fontSize":15,"block":true,"bold":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else if ("pce" === this.getControlScheme()) {
            info = [
                {"type":"button","text":"II","id":"ii","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"I","id":"i","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Run","id":"run","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        } else if ('ngp' === this.getControlScheme()) {
                info = [
                    {"type":"button","text":"A","id":"a","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                    {"type":"button","text":"B","id":"b","location":"right","right":5,"top":50,"bold":true,"input_value":8},
                    {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                    {"type":"button","text":"Option","id":"option","location":"center","left":30,"fontSize":15,"block":true,"input_value":3}
                ];
                info.push(...speedControlButtons);
        } else if ('ws' === this.getControlScheme()) {
            info = [
                {"type":"button","text":"B","id":"b","location":"right","right":75,"top":150,"bold":true,"input_value":0},
                {"type":"button","text":"A","id":"a","location":"right","right":5,"top":150,"bold":true,"input_value":8},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"dpad","location":"right","left":"50%","right":"50%","joystickInput":false,"inputValues":[13,12,10,11]},
                {"type":"button","text":"Start","id":"start","location":"center","left":30,"fontSize":15,"block":true,"input_value":3},
            ];
            info.push(...speedControlButtons);
        } else if ('coleco' === this.getControlScheme()) {
            info = [
                {"type":"button","text":"L","id":"buttonLeft","location":"right","left":10,"top":40,"bold":true,"input_value":8},
                {"type":"button","text":"R","id":"buttonRight","location":"right","left":81,"top":40,"bold":true,"input_value":0},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]}
            ];
            info.push(...speedControlButtons);
        } else if ('pcfx' === this.getControlScheme()) {
            info = [
                {"type":"button","text":"I","id":"i","location":"right","right":5,"top":70,"bold":true,"input_value":8},
                {"type":"button","text":"II","id":"ii","location":"right","right":75,"top":70,"bold":true,"input_value":0},
                {"type":"button","text":"III","id":"iii","location":"right","right":145,"top":70,"bold":true,"input_value":9},
                {"type":"button","text":"IV","id":"iv","location":"right","right":5,"top":0,"bold":true,"input_value":1},
                {"type":"button","text":"V","id":"v","location":"right","right":75,"top":0,"bold":true,"input_value":10},
                {"type":"button","text":"VI","id":"vi","location":"right","right":145,"top":0,"bold":true,"input_value":11},
                {"type":"dpad","location":"left","left":"50%","right":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2},
                {"type":"button","text":"Run","id":"run","location":"center","left":60,"fontSize":15,"block":true,"input_value":3}
            ];
            info.push(...speedControlButtons);
        } else {
            info = [
                {"type":"button","text":"Y","id":"y","location":"right","left":40,"bold":true,"input_value":9},
                {"type":"button","text":"X","id":"X","location":"right","top":40,"bold":true,"input_value":1},
                {"type":"button","text":"B","id":"b","location":"right","left":81,"top":40,"bold":true,"input_value":8},
                {"type":"button","text":"A","id":"a","location":"right","left":40,"top":80,"bold":true,"input_value":0},
                {"type":"zone","location":"left","left":"50%","top":"50%","joystickInput":false,"inputValues":[4,5,6,7]},
                {"type":"button","text":"Start","id":"start","location":"center","left":60,"fontSize":15,"block":true,"input_value":3},
                {"type":"button","text":"Select","id":"select","location":"center","left":-5,"fontSize":15,"block":true,"input_value":2}
            ];
            info.push(...speedControlButtons);
        }
        for (let i=0; i<info.length; i++) {
            if (info[i].text) {
                info[i].text = this.localization(info[i].text);
            }
        }
        info = JSON.parse(JSON.stringify(info));
        
        
        const up = this.createElement("div");
        up.classList.add("ejs_virtualGamepad_top");
        const down = this.createElement("div");
        down.classList.add("ejs_virtualGamepad_bottom");
        const left = this.createElement("div");
        left.classList.add("ejs_virtualGamepad_left");
        const right = this.createElement("div");
        right.classList.add("ejs_virtualGamepad_right");
        const elems = {top:up, center:down, left, right};
        
        this.virtualGamepad.appendChild(up);
        this.virtualGamepad.appendChild(down);
        this.virtualGamepad.appendChild(left);
        this.virtualGamepad.appendChild(right);
        
        this.toggleVirtualGamepadLeftHanded = (enabled) => {
            left.classList.toggle("ejs_virtualGamepad_left", !enabled);
            right.classList.toggle("ejs_virtualGamepad_right", !enabled);
            left.classList.toggle("ejs_virtualGamepad_right", enabled);
            right.classList.toggle("ejs_virtualGamepad_left", enabled);
        }
        
        const leftHandedMode = false;
        const blockCSS = 'height:31px;text-align:center;border:1px solid #ccc;border-radius:5px;line-height:31px;';
        
        for (let i=0; i<info.length; i++) {
            if (info[i].type !== 'button') continue;
            if (leftHandedMode && ['left', 'right'].includes(info[i].location)) {
                info[i].location = (info[i].location==='left') ? 'right' : 'left';
                const amnt = JSON.parse(JSON.stringify(info[i]));
                if (amnt.left) {
                    info[i].right = amnt.left;
                }
                if (amnt.right) {
                    info[i].left = amnt.right;
                }
            }
            let style = '';
            if (info[i].left) {
                style += 'left:'+info[i].left+(typeof info[i].left === 'number'?'px':'')+';';
            }
            if (info[i].right) {
                style += 'right:'+info[i].right+(typeof info[i].right === 'number'?'px':'')+';';
            }
            if (info[i].top) {
                style += 'top:'+info[i].top+(typeof info[i].top === 'number'?'px':'')+';';
            }
            if (!info[i].bold) {
                style += 'font-weight:normal;';
            } else if (info[i].bold) {
                style += 'font-weight:bold;';
            }
            info[i].fontSize = info[i].fontSize || 30;
            style += 'font-size:'+info[i].fontSize+'px;';
            if (info[i].block) {
                style += blockCSS;
            }
            if (['top', 'center', 'left', 'right'].includes(info[i].location)) {
                const button = this.createElement("div");
                button.style = style;
                button.innerText = info[i].text;
                button.classList.add("ejs_virtualGamepad_button");
                elems[info[i].location].appendChild(button);
                const value = info[i].input_new_cores || info[i].input_value;
                this.addEventListener(button, "touchstart touchend touchcancel", (e) => {
                    e.preventDefault();
                    if (e.type === 'touchend' || e.type === 'touchcancel') {
                        e.target.classList.remove("ejs_virtualGamepad_button_down");
                        window.setTimeout(() => {
                            this.gameManager.simulateInput(0, value, 0);
                        })
                    } else {
                        e.target.classList.add("ejs_virtualGamepad_button_down");
                        this.gameManager.simulateInput(0, value, 1);
                    }
                })
            }
        }
        
        const createDPad = (opts) => {
            const container = opts.container;
            const callback = opts.event;
            const dpadMain = this.createElement("div");
            dpadMain.classList.add("ejs_dpad_main");
            const vertical = this.createElement("div");
            vertical.classList.add("ejs_dpad_vertical");
            const horizontal = this.createElement("div");
            horizontal.classList.add("ejs_dpad_horizontal");
            const bar1 = this.createElement("div");
            bar1.classList.add("ejs_dpad_bar");
            const bar2 = this.createElement("div");
            bar2.classList.add("ejs_dpad_bar");
            
            horizontal.appendChild(bar1);
            vertical.appendChild(bar2);
            dpadMain.appendChild(vertical);
            dpadMain.appendChild(horizontal);
            
            const updateCb = (e) => {
                e.preventDefault();
                const touch = e.targetTouches[0];
                if (!touch) return;
                const rect = dpadMain.getBoundingClientRect();
                const x = touch.clientX - rect.left - dpadMain.clientWidth / 2;
                const y = touch.clientY - rect.top - dpadMain.clientHeight / 2;
                let up = 0,
                    down = 0,
                    left = 0,
                    right = 0,
                    angle = Math.atan(x / y) / (Math.PI / 180);
                
                if (y <= -10) {
                    up = 1;
                }
                if (y >= 10) {
                    down = 1;
                }
                
                if (x >= 10) {
                    right = 1;
                    left = 0;
                    if (angle < 0 && angle >= -35 || angle > 0 && angle <= 35) {
                        right = 0;
                    }
                    up = (angle < 0 && angle >= -55 ? 1 : 0);
                    down = (angle > 0 && angle <= 55 ? 1 : 0);
                }
                
                if (x <= -10) {
                    right = 0;
                    left = 1;
                    if (angle < 0 && angle >= -35 || angle > 0 && angle <= 35) {
                        left = 0;
                    }
                    up = (angle > 0 && angle <= 55 ? 1 : 0);
                    down = (angle < 0 && angle >= -55 ? 1 : 0);
                }
                
                dpadMain.classList.toggle("ejs_dpad_up_pressed", up);
                dpadMain.classList.toggle("ejs_dpad_down_pressed", down);
                dpadMain.classList.toggle("ejs_dpad_right_pressed", right);
                dpadMain.classList.toggle("ejs_dpad_left_pressed", left);
                
                callback(up, down, left, right);
            }
            const cancelCb = (e) => {
                e.preventDefault();
                dpadMain.classList.remove("ejs_dpad_up_pressed");
                dpadMain.classList.remove("ejs_dpad_down_pressed");
                dpadMain.classList.remove("ejs_dpad_right_pressed");
                dpadMain.classList.remove("ejs_dpad_left_pressed");
                
                callback(0, 0, 0, 0);
            }
            
            this.addEventListener(dpadMain, 'touchstart touchmove', updateCb);
            this.addEventListener(dpadMain, 'touchend touchcancel', cancelCb);
            
            
            container.appendChild(dpadMain);
        }
        
        info.forEach((dpad, index) => {
            if (dpad.type !== 'dpad') return;
            if (leftHandedMode && ['left', 'right'].includes(dpad.location)) {
                dpad.location = (dpad.location==='left') ? 'right' : 'left';
                const amnt = JSON.parse(JSON.stringify(dpad));
                if (amnt.left) {
                    dpad.right = amnt.left;
                }
                if (amnt.right) {
                    dpad.left = amnt.right;
                }
            }
            const elem = this.createElement("div");
            let style = '';
            if (dpad.left) {
                style += 'left:'+dpad.left+';';
            }
            if (dpad.right) {
                style += 'right:'+dpad.right+';';
            }
            if (dpad.top) {
                style += 'top:'+dpad.top+';';
            }
            elem.style = style;
            elems[dpad.location].appendChild(elem);
            createDPad({container: elem, event: (up, down, left, right) => {
                if (dpad.joystickInput) {
                    if (up === 1) up=0x7fff;
                    if (down === 1) down=0x7fff;
                    if (left === 1) left=0x7fff;
                    if (right === 1) right=0x7fff;
                }
                this.gameManager.simulateInput(0, dpad.inputValues[0], up);
                this.gameManager.simulateInput(0, dpad.inputValues[1], down);
                this.gameManager.simulateInput(0, dpad.inputValues[2], left);
                this.gameManager.simulateInput(0, dpad.inputValues[3], right);
            }});
        })
        
        
        info.forEach((zone, index) => {
            if (zone.type !== 'zone') return;
            if (leftHandedMode && ['left', 'right'].includes(zone.location)) {
                zone.location = (zone.location==='left') ? 'right' : 'left';
                const amnt = JSON.parse(JSON.stringify(zone));
                if (amnt.left) {
                    zone.right = amnt.left;
                }
                if (amnt.right) {
                    zone.left = amnt.right;
                }
            }
            const elem = this.createElement("div");
            this.addEventListener(elem, "touchstart touchmove touchend touchcancel", (e) => {
                e.preventDefault();
            });
            elems[zone.location].appendChild(elem);
            const zoneObj = nipplejs.create({
                'zone': elem,
                'mode': 'static',
                'position': {
                    'left': zone.left,
                    'top': zone.top
                },
                'color': zone.color || 'red'
            });
            zoneObj.on('end', () => {
                this.gameManager.simulateInput(0, zone.inputValues[0], 0);
                this.gameManager.simulateInput(0, zone.inputValues[1], 0);
                this.gameManager.simulateInput(0, zone.inputValues[2], 0);
                this.gameManager.simulateInput(0, zone.inputValues[3], 0);
            });
            zoneObj.on('move', (e, info) => {
                const degree = info.angle.degree;
                const distance = info.distance;
                if (zone.joystickInput === true) {
                    let x = 0, y = 0;
                    if (degree > 0 && degree <= 45) {
                        x = distance / 50;
                        y = -0.022222222222222223 * degree * distance / 50;
                    }
                    if (degree > 45 && degree <= 90) {
                        x = 0.022222222222222223 * (90 - degree) * distance / 50;
                        y = -distance / 50;
                    }
                    if (degree > 90 && degree <= 135) {
                        x = 0.022222222222222223 * (90 - degree) * distance / 50;
                        y = -distance / 50;
                    }
                    if (degree > 135 && degree <= 180) {
                        x = -distance / 50;
                        y = -0.022222222222222223 * (180 - degree) * distance / 50;
                    }
                    if (degree > 135 && degree <= 225) {
                        x = -distance / 50;
                        y = -0.022222222222222223 * (180 - degree) * distance / 50;
                    }
                    if (degree > 225 && degree <= 270) {
                        x = -0.022222222222222223 * (270 - degree) * distance / 50;
                        y = distance / 50;
                    }
                    if (degree > 270 && degree <= 315) {
                        x = -0.022222222222222223 * (270 - degree) * distance / 50;
                        y = distance / 50;
                    }
                    if (degree > 315 && degree <= 359.9) {
                        x = distance / 50;
                        y = 0.022222222222222223 * (360 - degree) * distance / 50;
                    }
                    if (x > 0) {
                        this.gameManager.simulateInput(0, zone.inputValues[0], 0x7fff * x);
                        this.gameManager.simulateInput(0, zone.inputValues[1], 0);
                    } else {
                        this.gameManager.simulateInput(0, zone.inputValues[1], 0x7fff * -x);
                        this.gameManager.simulateInput(0, zone.inputValues[0], 0);
                    }
                    if (y > 0) {
                        this.gameManager.simulateInput(0, zone.inputValues[2], 0x7fff * y);
                        this.gameManager.simulateInput(0, zone.inputValues[3], 0);
                    } else {
                        this.gameManager.simulateInput(0, zone.inputValues[3], 0x7fff * -y);
                        this.gameManager.simulateInput(0, zone.inputValues[2], 0);
                    }
                    
                } else {
                    if (degree >= 30 && degree < 150) {
                        this.gameManager.simulateInput(0, zone.inputValues[0], 1);
                    } else {
                        window.setTimeout(() => {
                            this.gameManager.simulateInput(0, zone.inputValues[0], 0);
                        }, 30);
                    }
                    if (degree >= 210 && degree < 330) {
                        this.gameManager.simulateInput(0, zone.inputValues[1], 1);
                    } else {
                        window.setTimeout(() => {
                            this.gameManager.simulateInput(0, zone.inputValues[1], 0);
                        }, 30);
                    }
                    if (degree >= 120 && degree < 240) {
                        this.gameManager.simulateInput(0, zone.inputValues[2], 1);
                    } else {
                        window.setTimeout(() => {
                            this.gameManager.simulateInput(0, zone.inputValues[2], 0);
                        }, 30);
                    }
                    if (degree >= 300 || degree >= 0 && degree < 60) {
                        this.gameManager.simulateInput(0, zone.inputValues[3], 1);
                    } else {
                        window.setTimeout(() => {
                            this.gameManager.simulateInput(0, zone.inputValues[3], 0);
                        }, 30);
                    }
                }
            });
        })
        
        if (this.touch || navigator.maxTouchPoints > 0) {
            const menuButton = this.createElement("div");
            menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>';
            menuButton.classList.add("ejs_virtualGamepad_open");
            menuButton.style.display = "none";
            this.on("start", () => menuButton.style.display = "");
            this.elements.parent.appendChild(menuButton);
            let timeout;
            let ready = true;
            this.addEventListener(menuButton, "touchstart touchend mousedown mouseup click", (e) => {
                if (!ready) return;
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    ready = true;
                }, 2000)
                ready = false;
                e.preventDefault();
                this.menu.toggle();
            })
            this.elements.menuToggle = menuButton;
        }
        
        this.virtualGamepad.style.display = "none";
    }
    handleResize() {
        if (this.virtualGamepad) {
            if (this.virtualGamepad.style.display === "none") {
                this.virtualGamepad.style.opacity = 0;
                this.virtualGamepad.style.display = "";
                setTimeout(() => {
                    this.virtualGamepad.style.display = "none";
                    this.virtualGamepad.style.opacity = "";
                }, 250)
            }
        }
        if (!this.Module) return;
        const dpr = window.devicePixelRatio || 1;
        const positionInfo = this.elements.parent.getBoundingClientRect();
        const width = positionInfo.width * dpr;
        const height = (positionInfo.height * dpr);
        this.Module.setCanvasSize(width, height);
        if (!this.handleSettingsResize) return;
        this.handleSettingsResize();
    }
    getElementSize(element) {
        let elem = element.cloneNode(true);
        elem.style.position = 'absolute';
        elem.style.opacity = 0;
        elem.removeAttribute('hidden');
        element.parentNode.appendChild(elem);
        const res = elem.getBoundingClientRect();
        elem.remove();
        return {
            'width': res.width,
            'height': res.height
        };
    }
    saveSettings() {
        if (!window.localStorage || !this.settingsLoaded) return;
        const coreSpecific = {
            controlSettings: this.controls,
            settings: this.settings,
            cheats: this.cheats
        }
        const ejs_settings = {
            volume: this.volume,
            muted: this.muted
        }
        localStorage.setItem("ejs-settings", JSON.stringify(ejs_settings));
        localStorage.setItem("ejs-"+this.getCore()+"-settings", JSON.stringify(coreSpecific));
    }
    loadRewindEnabled() {
        if (!window.localStorage) return;
        let coreSpecific = localStorage.getItem("ejs-"+this.getCore()+"-settings");
        try {
           coreSpecific = JSON.parse(coreSpecific);
           if (!coreSpecific || !coreSpecific.settings) {
               return false;
           }
           return coreSpecific.settings.rewindEnabled === 'enabled';
        } catch (e) {
            console.warn("Could not load previous settings", e);
            return false;
        }
    }
    loadSettings() {
        if (!window.localStorage) return;
        this.settingsLoaded = true;
        let ejs_settings = localStorage.getItem("ejs-settings");
        let coreSpecific = localStorage.getItem("ejs-"+this.getCore()+"-settings");
        if (coreSpecific) {
            try {
                coreSpecific = JSON.parse(coreSpecific);
                if (!(coreSpecific.controlSettings instanceof Object) || !(coreSpecific.settings instanceof Object) || !Array.isArray(coreSpecific.cheats)) return;
                this.controls = coreSpecific.controlSettings;
                this.checkGamepadInputs();
                for (const k in coreSpecific.settings) {
                    this.changeSettingOption(k, coreSpecific.settings[k]);
                }
                for (let i=0; i<coreSpecific.cheats.length; i++) {
                    const cheat = coreSpecific.cheats[i];
                    let includes = false;
                    for (let j=0; j<this.cheats.length; j++) {
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
    menuOptionChanged(option, value) {
        this.saveSettings();
        if (this.debug) console.log(option, value);
        if (option === "shader") {
            try {
                this.Module.FS.unlink("/shader/shader.glslp");
            } catch(e) {}
            if (value === "disabled") {
                this.gameManager.toggleShader(0);
                return;
            }
            this.Module.FS.writeFile("/shader/shader.glslp", window.EJS_SHADERS[value]);
            this.gameManager.toggleShader(1);
            return;
        } else if (option === "disk") {
            this.gameManager.setCurrentDisk(value);
            return;
        } else if (option === "virtual-gamepad") {
            this.toggleVirtualGamepad(value !== "disabled");
        } else if (option === "virtual-gamepad-left-handed-mode") {
            this.toggleVirtualGamepadLeftHanded(value !== "disabled");
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
        } else if (option === 'sm-ratio') {
            if (this.isSlowMotion) this.gameManager.toggleSlowMotion(0);
            this.gameManager.setSlowMotionRatio(parseFloat(value));
            setTimeout(() => {
                if (this.isSlowMotion) this.gameManager.toggleSlowMotion(1);
            }, 10);
        } else if (option === 'slowMotion') {
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
        }
        this.gameManager.setVariable(option, value);
        this.saveSettings();
    }
    setupSettingsMenu() {
        this.settingsMenu = this.createElement("div");
        this.settingsMenu.classList.add("ejs_settings_parent");
        const nested = this.createElement("div");
        nested.classList.add("ejs_settings_transition");
        this.settings = {};
        
        const home = this.createElement("div");
        home.style.overflow = "auto";
        const menus = [];
        this.handleSettingsResize = () => {
            let needChange = false;
            if (this.settingsMenu.style.display !== "") {
                this.settingsMenu.style.opacity = "0";
                this.settingsMenu.style.display = "";
                needChange = true;
            }
            const x = this.settingsMenu.parentElement.getBoundingClientRect().x;
            let height = this.elements.parent.getBoundingClientRect().height;
            let width = this.elements.parent.getBoundingClientRect().width;
            if (height > 375) height = 375;
            home.style['max-height'] = (height - 95) + "px";
            nested.style['max-height'] = (height - 95) + "px";
            for (let i=0; i<menus.length; i++) {
                menus[i].style['max-height'] = (height - 95) + "px";
            }
            this.settingsMenu.classList.toggle("ejs_settings_center_left", (x < width/2) && (width < 575));
            this.settingsMenu.classList.toggle("ejs_settings_center_right", (x >= width/2) && (width < 575));
            if (needChange) {
                this.settingsMenu.style.display = "none";
                this.settingsMenu.style.opacity = "";
            }
        }
        
        home.classList.add("ejs_setting_menu");
        nested.appendChild(home);
        let funcs = [];
        this.changeSettingOption = (title, newValue) => {
            this.settings[title] = newValue;
            funcs.forEach(e => e(title));
        }
        let allOpts = {};
        
        const addToMenu = (title, id, options, defaultOption) => {
            const menuOption = this.createElement("div");
            menuOption.classList.add("ejs_settings_main_bar");
            const span = this.createElement("span");
            span.innerText = title;
            
            const current = this.createElement("div");
            current.innerText = "";
            current.classList.add("ejs_settings_main_bar_selected");
            span.appendChild(current);
            
            menuOption.appendChild(span);
            home.appendChild(menuOption);
            
            const menu = this.createElement("div");
            menus.push(menu);
            menu.style.overflow  = "auto";
            menu.setAttribute("hidden", "");
            const button = this.createElement("button");
            const goToHome = () => {
                const homeSize = this.getElementSize(home);
                nested.style.width = (homeSize.width+20) + "px";
                nested.style.height = homeSize.height + "px";
                menu.setAttribute("hidden", "");
                home.removeAttribute("hidden");
            }
            this.addEventListener(menuOption, "click", (e) => {
                const targetSize = this.getElementSize(menu);
                nested.style.width = (targetSize.width+20) + "px";
                nested.style.height = targetSize.height + "px";
                menu.removeAttribute("hidden");
                home.setAttribute("hidden", "");
            })
            this.addEventListener(button, "click", goToHome);
            
            button.type = "button";
            button.classList.add("ejs_back_button");
            menu.appendChild(button);
            const pageTitle = this.createElement("span");
            pageTitle.innerText = title;
            pageTitle.classList.add("ejs_menu_text_a");
            button.appendChild(pageTitle);
            
            const optionsMenu = this.createElement("div");
            optionsMenu.classList.add("ejs_setting_menu");
            //optionsMenu.style["max-height"] = "385px";
            //optionsMenu.style.overflow  = "auto";
            
            let buttons = [];
            let opts = options;
            if (Array.isArray(options)) {
                opts = {};
                for (let i=0; i<options.length; i++) {
                    opts[options[i]] = options[i];
                }
            }
            allOpts[id] = opts;
            
            funcs.push((title) => {
                if (id !== title) return;
                for (let j=0; j<buttons.length; j++) {
                    buttons[j].classList.toggle("ejs_option_row_selected", buttons[j].getAttribute("ejs_value") === this.settings[id]);
                }
                this.menuOptionChanged(id, this.settings[id]);
                current.innerText = opts[this.settings[id]];
            });
            
            for (const opt in opts) {
                const optionButton = this.createElement("button");
                buttons.push(optionButton);
                optionButton.setAttribute("ejs_value", opt);
                optionButton.type = "button";
                optionButton.value = opts[opt];
                optionButton.classList.add("ejs_option_row");
                optionButton.classList.add("ejs_button_style");
                
                this.addEventListener(optionButton, "click", (e) => {
                    this.settings[id] = opt;
                    for (let j=0; j<buttons.length; j++) {
                        buttons[j].classList.remove("ejs_option_row_selected");
                    }
                    optionButton.classList.add("ejs_option_row_selected");
                    this.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                    goToHome();
                })
                if (defaultOption === opt) {
                    optionButton.classList.add("ejs_option_row_selected");
                    this.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                }
                
                const msg = this.createElement("span");
                msg.innerText = opts[opt];
                optionButton.appendChild(msg);
                
                optionsMenu.appendChild(optionButton);
            }
            
            menu.appendChild(optionsMenu);
            
            nested.appendChild(menu);
        }
        //addToMenu("Test", 'test', {a:1, b:2, c:3}, 2);
        //addToMenu("Test2", 'test_2', [4, 5, 6]);
        //addToMenu("Testertthgfd", 'booger', [7, 8, 9]);
        
        if (this.gameManager.getDiskCount() > 1) {
            const diskLabels = {};
            for (let i=0; i<this.gameManager.getDiskCount(); i++) {
                diskLabels[i.toString()] = "Disk "+(i+1);
            }
            addToMenu(this.localization("Disk"), "disk", diskLabels, this.gameManager.getCurrentDisk().toString());
        }
        
        if (window.EJS_SHADERS) {
            addToMenu(this.localization('Shaders'), 'shader', {
                'disabled': this.localization("Disabled"),
                '2xScaleHQ.glslp': this.localization("2xScaleHQ"),
                '4xScaleHQ.glslp': this.localization("4xScaleHQ"),
                'crt-easymode.glslp': this.localization('CRT easymode'),
                'crt-aperture.glslp': this.localization('CRT aperture'),
                'crt-geom.glslp': this.localization('CRT geom'),
                'crt-mattias.glslp': this.localization('CRT mattias')
            }, 'disabled');
        }
        
        addToMenu(this.localization('FPS'), 'fps', {
            'show': this.localization("show"),
            'hide': this.localization("hide")
        }, 'hide');
        
        addToMenu(this.localization('Fast Forward Ratio'), 'ff-ratio', [
            "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "unlimited"
        ], "3.0");

        addToMenu(this.localization('Slow Motion Ratio'), 'sm-ratio', [
            "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0"
        ], "3.0");

        addToMenu(this.localization('Fast Forward'), 'fastForward', {
            'enabled': this.localization("Enabled"),
            'disabled': this.localization("Disabled")
        }, "disabled");

        addToMenu(this.localization('Slow Motion'), 'slowMotion', {
            'enabled': this.localization("Enabled"),
            'disabled': this.localization("Disabled")
        }, "disabled");

        addToMenu(this.localization('Rewind Enabled (requires restart)'), 'rewindEnabled', {
            'enabled': this.localization("Enabled"),
            'disabled': this.localization("Disabled")
        }, 'disabled');

        addToMenu(this.localization('Rewind Granularity'), 'rewind-granularity', [
            '1', '3', '6', '12', '25', '50', '100'
        ], '6');

        if (this.saveInBrowserSupported()) {
            addToMenu(this.localization('Save State Slot'), 'save-state-slot', ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "1");
            addToMenu(this.localization('Save State Location'), 'save-state-location', {
                'download': this.localization("Download"),
                'browser': this.localization("Keep in Browser")
            }, 'download');
        }
        
        if (this.touch || navigator.maxTouchPoints > 0) {
            addToMenu(this.localization('Virtual Gamepad'), 'virtual-gamepad', {
                'enabled': this.localization("Enabled"),
                'disabled': this.localization("Disabled")
            }, this.isMobile ? 'enabled' : 'disabled');
            addToMenu(this.localization('Left Handed Mode'), 'virtual-gamepad-left-handed-mode', {
                'enabled': this.localization("Enabled"),
                'disabled': this.localization("Disabled")
            }, 'disabled');
        }
        let coreOpts;
        try {
            coreOpts = this.gameManager.getCoreOptions();
        } catch(e){}
        if (coreOpts) {
            coreOpts.split('\n').forEach((line, index) => {
                let option = line.split('; ');
                let name = option[0];
                let options = option[1].split('|'),
                    optionName = name.split("|")[0].replace(/_/g, ' ').replace(/.+\-(.+)/, '$1');
                options.slice(1, -1);
                if (options.length === 1) return;
                let availableOptions = {};
                for (let i=0; i<options.length; i++) {
                    availableOptions[options[i]] = this.localization(options[i], this.settingsLanguage);
                }
                addToMenu(this.localization(optionName, this.settingsLanguage),
                          name.split("|")[0], availableOptions,
                          (name.split("|").length > 1) ? name.split("|")[1] : options[0].replace('(Default) ', ''));
            })
        }
        
        this.settingsMenu.appendChild(nested);
        
        this.settingParent.appendChild(this.settingsMenu);
        this.settingParent.style.position = "relative";
        
        const homeSize = this.getElementSize(home);
        nested.style.width = (homeSize.width+20) + "px";
        nested.style.height = homeSize.height + "px";
        
        this.settingsMenu.style.display = "none";
        
        if (this.debug) {
            console.log("Available core options", allOpts);
        }
        
        if (this.config.defaultOptions) {
            for (const k in this.config.defaultOptions) {
                this.changeSettingOption(k, this.config.defaultOptions[k]);
            }
        }
    }
    createSubPopup(hidden) {
        const popup = this.createElement('div');
        popup.classList.add("ejs_popup_container");
        popup.classList.add("ejs_popup_container_box");
        const popupMsg = this.createElement("div");
        popupMsg.innerText = "";
        if (hidden) popup.setAttribute("hidden", "");
        popup.appendChild(popupMsg);
        return [popup, popupMsg];
    }
    createNetplayMenu() {
        const body = this.createPopup("Netplay", {
            "Create a Room": () => {
                if (this.isNetplay) {
                    this.netplay.leaveRoom();
                } else {
                    this.netplay.showOpenRoomDialog();
                }
            },
            "Close": () => {
                this.netplayMenu.style.display = "none";
                this.netplay.updateList.stop();
            }
        }, true);
        this.netplayMenu = body.parentElement;
        const createButton = this.netplayMenu.getElementsByTagName("a")[0];
        const rooms = this.createElement("div");
        const title = this.createElement("strong");
        title.innerText = this.localization("Rooms");
        const table = this.createElement("table");
        table.classList.add("ejs_netplay_table");
        table.style.width = "100%";
        table.setAttribute("cellspacing", "0");
        const thead = this.createElement("thead");
        const row = this.createElement("tr");
        const addToHeader = (text) => {
            const item = this.createElement("td");
            item.innerText = text;
            item.style["text-align"] = "center";
            row.appendChild(item);
            return item;
        }
        thead.appendChild(row);
        addToHeader("Room Name").style["text-align"] = "left";
        addToHeader("Players").style.width = "80px";
        addToHeader("").style.width = "80px"; //"join" button
        table.appendChild(thead);
        const tbody = this.createElement("tbody");
        
        table.appendChild(tbody);
        rooms.appendChild(title);
        rooms.appendChild(table);
        
        
        const joined = this.createElement("div");
        const title2 = this.createElement("strong");
        title2.innerText = "{roomname}";
        const password = this.createElement("div");
        password.innerText = "Password: ";
        const table2 = this.createElement("table");
        table2.classList.add("ejs_netplay_table");
        table2.style.width = "100%";
        table2.setAttribute("cellspacing", "0");
        const thead2 = this.createElement("thead");
        const row2 = this.createElement("tr");
        const addToHeader2 = (text) => {
            const item = this.createElement("td");
            item.innerText = text;
            row2.appendChild(item);
            return item;
        }
        thead2.appendChild(row2);
        addToHeader2("Player").style.width = "80px";
        addToHeader2("Name");
        addToHeader2("").style.width = "80px"; //"join" button
        table2.appendChild(thead2);
        const tbody2 = this.createElement("tbody");
        
        table2.appendChild(tbody2);
        joined.appendChild(title2);
        joined.appendChild(password);
        joined.appendChild(table2);
        
        joined.style.display = "none";
        body.appendChild(rooms);
        body.appendChild(joined);
        
        this.openNetplayMenu = () => {
            this.netplayMenu.style.display = "";
            if (!this.netplay || (this.netplay && !this.netplay.name)) {
                this.netplay = {};
                this.netplay.table = tbody;
                this.netplay.playerTable = tbody2;
                this.netplay.passwordElem = password;
                this.netplay.roomNameElem = title2;
                this.netplay.createButton = createButton;
                this.netplay.tabs = [rooms, joined];
                this.defineNetplayFunctions();
                const popups = this.createSubPopup();
                this.netplayMenu.appendChild(popups[0]);
                popups[1].classList.add("ejs_cheat_parent"); //Hehe
                const popup = popups[1];
                
                const header = this.createElement("div");
                const title = this.createElement("h2");
                title.innerText = this.localization("Set Player Name");
                title.classList.add("ejs_netplay_name_heading");
                header.appendChild(title);
                popup.appendChild(header);
                
                const main = this.createElement("div");
                main.classList.add("ejs_netplay_header");
                const head = this.createElement("strong");
                head.innerText = this.localization("Player Name");
                const input = this.createElement("input");
                input.type = "text";
                input.setAttribute("maxlength", 20);
                
                main.appendChild(head);
                main.appendChild(this.createElement("br"));
                main.appendChild(input);
                popup.appendChild(main);
                
                popup.appendChild(this.createElement("br"));
                const submit = this.createElement("button");
                submit.classList.add("ejs_button_button");
                submit.classList.add("ejs_popup_submit");
                submit.style["background-color"] = "rgba(var(--ejs-primary-color),1)";
                submit.innerText = this.localization("Submit");
                popup.appendChild(submit);
                this.addEventListener(submit, "click", (e) => {
                    if (!input.value.trim()) return;
                    this.netplay.name = input.value.trim();
                    popups[0].remove();
                })
            }
            this.netplay.updateList.start();
        }
    }
    defineNetplayFunctions() {
        function guidGenerator() {
            const S4 = function() {
               return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
            };
            return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
        }
        this.netplay.url = this.config.netplayUrl;
        while (this.netplay.url.endsWith("/")) {
            this.netplay.url = this.netplay.url.substring(0, this.netplay.url.length-1);
        }
        this.netplay.current_frame = 0;
        this.netplay.getOpenRooms = async () => {
            return JSON.parse(await (await fetch(this.netplay.url+"/list?domain="+window.location.host+"&game_id="+this.config.gameId)).text());
        }
        this.netplay.updateTableList = async () => {
            const addToTable = (id, name, current, max) => {
                const row = this.createElement("tr");
                row.classList.add("ejs_netplay_table_row");
                const addToHeader = (text) => {
                    const item = this.createElement("td");
                    item.innerText = text;
                    item.style.padding = "10px 0";
                    item.style["text-align"] = "center";
                    row.appendChild(item);
                    return item;
                }
                addToHeader(name).style["text-align"] = "left";
                addToHeader(current + "/" + max).style.width = "80px";
                
                const parent = addToHeader("");
                parent.style.width = "80px";
                this.netplay.table.appendChild(row);
                if (current < max) {
                    const join = this.createElement("button");
                    join.classList.add("ejs_netplay_join_button");
                    join.classList.add("ejs_button_button");
                    join.style["background-color"] = "rgba(var(--ejs-primary-color),1)";
                    join.innerText = this.localization("Join");
                    parent.appendChild(join);
                    this.addEventListener(join, "click", (e) => {
                        this.netplay.joinRoom(id, name);
                    })
                    return join;
                }
            }
            const open = await this.netplay.getOpenRooms();
            //console.log(open);
            this.netplay.table.innerHTML = "";
            for (const k in open) {
                addToTable(k, open[k].room_name, open[k].current, open[k].max);//todo: password
            }
        }
        this.netplay.showOpenRoomDialog = () => {
            const popups = this.createSubPopup();
            this.netplayMenu.appendChild(popups[0]);
            popups[1].classList.add("ejs_cheat_parent"); //Hehe
            const popup = popups[1];
            
            const header = this.createElement("div");
            const title = this.createElement("h2");
            title.innerText = this.localization("Create a room");
            title.classList.add("ejs_netplay_name_heading");
            header.appendChild(title);
            popup.appendChild(header);
            
            const main = this.createElement("div");
            
            main.classList.add("ejs_netplay_header");
            const rnhead = this.createElement("strong");
            rnhead.innerText = this.localization("Room Name");
            const rninput = this.createElement("input");
            rninput.type = "text";
            rninput.setAttribute("maxlength", 20);
            
            const maxhead = this.createElement("strong");
            maxhead.innerText = this.localization("Max Players");
            const maxinput = this.createElement("select");
            maxinput.setAttribute("disabled", "disabled");
            const val2 = this.createElement("option");
            val2.value = 2;
            val2.innerText = "2";
            const val3 = this.createElement("option");
            val3.value = 3;
            val3.innerText = "3";
            const val4 = this.createElement("option");
            val4.value = 4;
            val4.innerText = "4";
            maxinput.appendChild(val2);
            maxinput.appendChild(val3);
            maxinput.appendChild(val4);
            
            
            const pwhead = this.createElement("strong");
            pwhead.innerText = this.localization("Password (optional)");
            const pwinput = this.createElement("input");
            pwinput.type = "text";
            pwinput.setAttribute("maxlength", 20);
            
            main.appendChild(rnhead);
            main.appendChild(this.createElement("br"));
            main.appendChild(rninput);
            
            main.appendChild(maxhead);
            main.appendChild(this.createElement("br"));
            main.appendChild(maxinput);
            
            main.appendChild(pwhead);
            main.appendChild(this.createElement("br"));
            main.appendChild(pwinput);
            
            popup.appendChild(main);
            
            popup.appendChild(this.createElement("br"));
            const submit = this.createElement("button");
            submit.classList.add("ejs_button_button");
            submit.classList.add("ejs_popup_submit");
            submit.style["background-color"] = "rgba(var(--ejs-primary-color),1)";
            submit.style.margin = "0 10px";
            submit.innerText = this.localization("Submit");
            popup.appendChild(submit);
            this.addEventListener(submit, "click", (e) => {
                if (!rninput.value.trim()) return;
                this.netplay.openRoom(rninput.value.trim(), parseInt(maxinput.value), pwinput.value.trim());
                popups[0].remove();
            })
            const close = this.createElement("button");
            close.classList.add("ejs_button_button");
            close.classList.add("ejs_popup_submit");
            close.style.margin = "0 10px";
            close.innerText = this.localization("Close");
            popup.appendChild(close);
            this.addEventListener(close, "click", (e) => {
                popups[0].remove();
            })
        }
        this.netplay.startSocketIO = (callback) => {
            this.netplay.socket = io(this.netplay.url);
            this.netplay.socket.on("connect", () => callback());
            this.netplay.socket.on("users-updated", (users) => {
                this.netplay.reset();
                if (this.debug) console.log(users);
                this.netplay.players = users;
                this.netplay.updatePlayersTable();
                if (this.netplay.owner) this.netplay.sync();
            })
            this.netplay.socket.on("disconnect", () => this.netplay.roomLeft());
            this.netplay.socket.on("data-message", (data) => {
                this.netplay.dataMessage(data);
            })
        }
        this.netplay.openRoom = (roomName, maxPlayers, password) => {
            const sessionid = guidGenerator();
            this.netplay.playerID = guidGenerator();
            this.netplay.players = {};
            this.netplay.extra = {
                domain: window.location.host,
                game_id: this.config.gameId,
                room_name: roomName,
                player_name: this.netplay.name,
                userid: this.netplay.playerID,
                sessionid: sessionid
            }
            this.netplay.players[this.netplay.playerID] = this.netplay.extra;
            this.netplay.users = {};
            
            this.netplay.startSocketIO((error) => {
                this.netplay.socket.emit("open-room", {
                    extra: this.netplay.extra,
                    maxPlayers: maxPlayers,
                    password: password
                }, (error) => {
                    if (error) {
                        if (this.debug) console.log("error: ", error);
                        return;
                    }
                    this.netplay.roomJoined(true, roomName, password, sessionid);
                })
            });
        }
        this.netplay.leaveRoom = () => {
            if (this.debug) console.log("asd");
            this.netplay.roomLeft();
        }
        this.netplay.joinRoom = (sessionid, roomName) => {
            this.netplay.playerID = guidGenerator();
            this.netplay.players = {};
            this.netplay.extra = {
                domain: window.location.host,
                game_id: this.config.gameId,
                room_name: roomName,
                player_name: this.netplay.name,
                userid: this.netplay.playerID,
                sessionid: sessionid
            }
            this.netplay.players[this.netplay.playerID] = this.netplay.extra;
            
            this.netplay.startSocketIO((error) => {
                this.netplay.socket.emit("join-room", {
                    extra: this.netplay.extra//,
                    //password: password
                }, (error, users) => {
                    if (error) {
                        if (this.debug) console.log("error: ", error);
                        return;
                    }
                    this.netplay.players = users;
                    //this.netplay.roomJoined(false, roomName, password, sessionid);
                    this.netplay.roomJoined(false, roomName, "", sessionid);
                })
            });
        }
        this.netplay.roomJoined = (isOwner, roomName, password, roomId) => {
            //Will already assume this.netplay.players has been refreshed
            this.isNetplay = true;
            this.netplay.inputs = {};
            this.netplay.owner = isOwner;
            if (this.debug) console.log(this.netplay.extra);
            this.netplay.roomNameElem.innerText = roomName;
            this.netplay.tabs[0].style.display = "none";
            this.netplay.tabs[1].style.display = "";
            if (password) {
                this.netplay.passwordElem.style.display = "";
                this.netplay.passwordElem.innerText = this.localization("Password")+": "+password
            } else {
                this.netplay.passwordElem.style.display = "none";
            }
            this.netplay.createButton.innerText = this.localization("Leave Room");
            this.netplay.updatePlayersTable();
            if (!this.netplay.owner) {
                this.netplay.oldStyles = [
                    this.elements.bottomBar.cheat[0].style.display,
                    this.elements.bottomBar.playPause[0].style.display,
                    this.elements.bottomBar.playPause[1].style.display,
                    this.elements.bottomBar.restart[0].style.display,
                    this.elements.bottomBar.loadState[0].style.display,
                    this.elements.bottomBar.saveState[0].style.display,
                    this.elements.bottomBar.saveSavFiles[0].style.display,
                    this.elements.bottomBar.loadSavFiles[0].style.display,
                    this.elements.contextMenu.save.style.display,
                    this.elements.contextMenu.load.style.display
                ]
                this.elements.bottomBar.cheat[0].style.display = "none";
                this.elements.bottomBar.playPause[0].style.display = "none";
                this.elements.bottomBar.playPause[1].style.display = "none";
                this.elements.bottomBar.restart[0].style.display = "none";
                this.elements.bottomBar.loadState[0].style.display = "none";
                this.elements.bottomBar.saveState[0].style.display = "none";
                this.elements.bottomBar.saveSavFiles[0].style.display = "none";
                this.elements.bottomBar.loadSavFiles[0].style.display = "none";
                this.elements.contextMenu.save.style.display = "none";
                this.elements.contextMenu.load.style.display = "none";
                this.gameManager.resetCheat();
            } else {
                this.netplay.oldStyles = [
                    this.elements.bottomBar.cheat[0].style.display
                ]
            }
            this.elements.bottomBar.cheat[0].style.display = "none";
        }
        this.netplay.updatePlayersTable = () => {
            const table = this.netplay.playerTable;
            table.innerHTML = "";
            const addToTable = (num, playerName) => {
                const row = this.createElement("tr");
                const addToHeader = (text) => {
                    const item = this.createElement("td");
                    item.innerText = text;
                    row.appendChild(item);
                    return item;
                }
                addToHeader(num).style.width = "80px";
                addToHeader(playerName);
                addToHeader("").style.width = "80px"; //"join" button
                table.appendChild(row);
            }
            let i=1;
            for (const k in this.netplay.players) {
                addToTable(i, this.netplay.players[k].player_name);
                i++;
            }
        }
        this.netplay.roomLeft = () => {
            this.isNetplay = false;
            this.netplay.tabs[0].style.display = "";
            this.netplay.tabs[1].style.display = "none";
            this.netplay.extra = null;
            this.netplay.playerID = null;
            this.netplay.createButton.innerText = this.localization("Create a Room");
            this.netplay.socket.disconnect();
            this.elements.bottomBar.cheat[0].style.display = this.netplay.oldStyles[0];
            if (!this.netplay.owner) {
                this.elements.bottomBar.playPause[0].style.display = this.netplay.oldStyles[1];
                this.elements.bottomBar.playPause[1].style.display = this.netplay.oldStyles[2];
                this.elements.bottomBar.restart[0].style.display = this.netplay.oldStyles[3];
                this.elements.bottomBar.loadState[0].style.display = this.netplay.oldStyles[4];
                this.elements.bottomBar.saveState[0].style.display = this.netplay.oldStyles[5];
                this.elements.bottomBar.saveSavFiles[0].style.display = this.netplay.oldStyles[6];
                this.elements.bottomBar.loadSavFiles[0].style.display = this.netplay.oldStyles[7];
                this.elements.contextMenu.save.style.display = this.netplay.oldStyles[8];
                this.elements.contextMenu.load.style.display = this.netplay.oldStyles[9];
            }
            this.updateCheatUI();
        }
        this.netplay.setLoading = (loading) => {
            if (this.debug) console.log("loading:", loading);
        }
        let syncing = false;
        this.netplay.sync = async () => {
            if (syncing) return;
            syncing = true;
            if (this.debug) console.log("sync")
            this.netplay.ready = 0;
            const state = await this.gameManager.getState();
            this.netplay.sendMessage({
                state: state
            });
            this.netplay.setLoading(true);
            this.pause(true);
            this.netplay.ready++;
            this.netplay.current_frame = 0;
            if (this.netplay.ready === this.netplay.getUserCount()) {
                this.play(true);
            }
            syncing = false;
        }
        this.netplay.getUserIndex = (user) => {
            let i=0;
            for (const k in this.netplay.players) {
                if (k === user) return i;
                i++;
            }
            return -1;
        }
        this.netplay.getUserCount = () => {
            let i=0;
            for (const k in this.netplay.players) i++;
            return i;
        }
        let justReset = false;
        this.netplay.dataMessage = (data) => {
            //console.log(data);
            if (data.sync === true && this.netplay.owner) {
                this.netplay.sync();
            }
            if (data.state) {
                this.netplay.wait = true;
                this.netplay.setLoading(true);
                this.pause(true);
                this.gameManager.loadState(new Uint8Array(data.state));
                this.netplay.sendMessage({ready:true});
            }
            if (data.play && !this.owner) {
                this.play(true);
            }
            if (data.pause && !this.owner) {
                this.pause(true);
            }
            if (data.ready && this.netplay.owner) {
                this.netplay.ready++;
                if (this.netplay.ready === this.netplay.getUserCount()) {
                    this.netplay.sendMessage({readyready:true});
                    this.netplay.reset();
                    setTimeout(() => this.play(true), 48);
                    this.netplay.setLoading(false);
                }
            }
            if (data.readyready) {
                this.netplay.setLoading(false);
                this.netplay.reset();
                this.play(true);
            }
            if (data.shortPause) console.log(data.shortPause);
            if (data.shortPause && data.shortPause !== this.netplay.playerID) {
                this.pause(true);
                this.netplay.wait = true;
                setTimeout(() => this.play(true), 48);
            }
            if (data["sync-control"]) {
                data["sync-control"].forEach((value) => {
                    let inFrame = parseInt(value.frame);
                    let frame = this.netplay.currentFrame;
                    if (!value.connected_input || value.connected_input[0] < 0) return;
                    //if (value.connected_input[0] === this.netplay.getUserIndex(this.netplay.playerID)) return;
                    console.log(value, inFrame, frame);
                    if (inFrame === frame) {
                        inFrame++;
                        this.gameManager.functions.simulateInput(value.connected_input[0], value.connected_input[1], value.connected_input[2]);
                    }
                    this.netplay.inputsData[inFrame] || (this.netplay.inputsData[inFrame] = []);
                    this.netplay.inputsData[frame] || (this.netplay.inputsData[frame] = []);
                    if (this.netplay.owner) {
                        this.netplay.inputsData[frame].push(value);
                        this.gameManager.functions.simulateInput(value.connected_input[0], value.connected_input[1], value.connected_input[2]);
                        if (frame - 10 >= inFrame) {
                            this.netplay.wait = true;
                            this.pause(true);
                            setTimeout(() => {
                                this.play(true);
                                this.netplay.wait = false;
                            }, 48)
                        }
                    } else {
                        this.netplay.inputsData[inFrame].push(value);
                        if (this.netplay.inputsData[frame]) {
                            this.play(true);
                        }
                        if (frame + 10 <= inFrame && inFrame > this.netplay.init_frame + 100) {
                            this.netplay.sendMessage({shortPause:this.netplay.playerID});
                        }
                    }
                });
            }
            if (data.restart) {
                this.gameManager.restart();
                this.netplay.reset();
                this.play(true);
            }
        }
        this.netplay.simulateInput = (player, index, value, resp) => {
            if (!this.isNetplay) return;
            if (player !== 0 && !resp) return;
            player = this.netplay.getUserIndex(this.netplay.playerID);
            let frame = this.netplay.currentFrame;
            if (this.netplay.owner) {
                if (!this.netplay.inputsData[frame]) {
                    this.netplay.inputsData[frame] = [];
                }
                this.netplay.inputsData[frame].push({
                    frame: frame,
                    connected_input: [player, index, value]
                })
                this.gameManager.functions.simulateInput(player, index, value);
            } else {
                this.netplay.sendMessage({
                    "sync-control": [{
                        frame: frame+10,
                        connected_input: [player, index, value]
                    }]
                })
            }
        }
        this.netplay.sendMessage = (data) => {
            this.netplay.socket.emit("data-message", data);
        }
        this.netplay.reset = () => {
            this.netplay.init_frame = this.netplay.currentFrame;
            this.netplay.inputsData = {};
        }
        //let fps;
        //let lastTime;
        this.netplay.init_frame = 0;
        this.netplay.currentFrame = 0;
        this.netplay.inputsData = {};
        this.Module.postMainLoop = () => {
            //const newTime = window.performance.now();
            //fps = 1000 / (newTime - lastTime);
            //console.log(fps);
            //lastTime = newTime;
            
            //frame syncing - working
            //control syncing - broken
            this.netplay.currentFrame = parseInt(this.gameManager.getFrameNum()) - this.netplay.init_frame;
            if (!this.isNetplay) return;
            if (this.netplay.owner) {
                let to_send = [];
                let i = this.netplay.currentFrame-1;
                this.netplay.inputsData[i] ? this.netplay.inputsData[i].forEach((value) => {
                    value.frame+=10;
                    to_send.push(value);
                }) : to_send.push({frame: i+10});
                this.netplay.sendMessage({"sync-control": to_send});
            } else {
                if (this.netplay.currentFrame <= 0 || this.netplay.inputsData[this.netplay.currentFrame]) {
                    this.netplay.wait = false;
                    this.play();
                    this.netplay.inputsData[this.netplay.currentFrame].forEach((value) => {
                        if (!value.connected_input) return;
                        console.log(value.connected_input);
                        this.gameManager.functions.simulateInput(value.connected_input[0], value.connected_input[1], value.connected_input[2]);
                    })
                } else if (!this.netplay.syncing) {
                    console.log("sync");
                    this.pause(true);
                    this.netplay.sendMessage({sync:true});
                    this.netplay.syncing = true;
                }
            }
            if (this.netplay.currentFrame % 100 === 0) {
                Object.keys(this.netplay.inputsData).forEach(value => {
                    if (value < this.netplay.currentFrame - 50) {
                        this.netplay.inputsData[value] = null;
                        delete this.netplay.inputsData[value];
                    }
                })
            }
            
            
        }
        
        this.netplay.updateList = {
            start: () => {
                this.netplay.updateList.interval = setInterval(this.netplay.updateTableList.bind(this), 1000);
            },
            stop: () => {
                clearInterval(this.netplay.updateList.interval);
            }
        }
    }
    createCheatsMenu() {
        const body = this.createPopup("Cheats", {
            "Add Cheat": () => {
                const popups = this.createSubPopup();
                this.cheatMenu.appendChild(popups[0]);
                popups[1].classList.add("ejs_cheat_parent");
                popups[1].style.width = "100%";
                const popup = popups[1];
                const header = this.createElement("div");
                header.classList.add("ejs_cheat_header");
                const title = this.createElement("h2");
                title.innerText = this.localization("Add Cheat Code");
                title.classList.add("ejs_cheat_heading");
                const close = this.createElement("button");
                close.classList.add("ejs_cheat_close");
                header.appendChild(title);
                header.appendChild(close);
                popup.appendChild(header);
                this.addEventListener(close, "click", (e) => {
                    popups[0].remove();
                })
                
                const main = this.createElement("div");
                main.classList.add("ejs_cheat_main");
                const header3 = this.createElement("strong");
                header3.innerText = this.localization("Code");
                main.appendChild(header3);
                main.appendChild(this.createElement("br"));
                const mainText = this.createElement("textarea");
                mainText.classList.add("ejs_cheat_code");
                mainText.style.width = "100%";
                mainText.style.height = "80px";
                main.appendChild(mainText);
                main.appendChild(this.createElement("br"));
                const header2 = this.createElement("strong");
                header2.innerText = this.localization("Description");
                main.appendChild(header2);
                main.appendChild(this.createElement("br"));
                const mainText2 = this.createElement("input");
                mainText2.type = "text";
                mainText2.classList.add("ejs_cheat_code");
                main.appendChild(mainText2);
                main.appendChild(this.createElement("br"));
                popup.appendChild(main);
                
                const footer = this.createElement("footer");
                const submit = this.createElement("button");
                const closeButton = this.createElement("button");
                submit.innerText = this.localization("Submit");
                closeButton.innerText = this.localization("Close");
                submit.classList.add("ejs_button_button");
                closeButton.classList.add("ejs_button_button");
                submit.classList.add("ejs_popup_submit");
                closeButton.classList.add("ejs_popup_submit");
                submit.style["background-color"] = "rgba(var(--ejs-primary-color),1)";
                footer.appendChild(submit);
                const span = this.createElement("span");
                span.innerText = " ";
                footer.appendChild(span);
                footer.appendChild(closeButton);
                popup.appendChild(footer);
                
                this.addEventListener(submit, "click", (e) => {
                    if (!mainText.value.trim() || !mainText2.value.trim()) return;
                    popups[0].remove();
                    this.cheats.push({
                        code: mainText.value,
                        desc: mainText2.value,
                        checked: false
                    });
                    this.updateCheatUI();
                    this.saveSettings();
                })
                this.addEventListener(closeButton, "click", (e) => {
                    popups[0].remove();
                })
                
            },
            "Close": () => {
                this.cheatMenu.style.display = "none";
            }
        }, true);
        this.cheatMenu = body.parentElement;
        this.cheatMenu.getElementsByTagName("h4")[0].style["padding-bottom"] = "0px";
        const msg = this.createElement("div");
        msg.style["padding-top"] = "0px";
        msg.style["padding-bottom"] = "15px";
        msg.innerText = "Note that some cheats require a restart to disable.";
        body.appendChild(msg);
        const rows = this.createElement("div");
        body.appendChild(rows);
        rows.classList.add("ejs_cheat_rows");
        this.elements.cheatRows = rows;
    }
    updateCheatUI() {
        this.elements.cheatRows.innerHTML = "";
        
        const addToMenu = (desc, checked, code, is_permanent, i) => {
            const row = this.createElement("div");
            row.classList.add("ejs_cheat_row");
            const input = this.createElement("input");
            input.type = "checkbox";
            input.checked = checked;
            input.value = i;
            input.id = "ejs_cheat_switch_"+i;
            row.appendChild(input);
            const label = this.createElement("label");
            label.for = "ejs_cheat_switch_"+i;
            label.innerText = desc;
            row.appendChild(label);
            label.addEventListener("click", (e) => {
                input.checked = !input.checked;
                this.cheats[i].checked = input.checked;
                this.cheatChanged(input.checked, code, i);
                this.saveSettings();
            })
            if (!is_permanent) {
                const close = this.createElement("a");
                close.classList.add("ejs_cheat_row_button");
                close.innerText = "×";
                row.appendChild(close);
                close.addEventListener("click", (e) => {
                    this.cheatChanged(false, code, i);
                    this.cheats.splice(i, 1);
                    this.updateCheatUI();
                    this.saveSettings();
                })
            }
            this.elements.cheatRows.appendChild(row);
            this.cheatChanged(checked, code, i);
        }
        this.gameManager.resetCheat();
        for (let i=0; i<this.cheats.length; i++) {
            addToMenu(this.cheats[i].desc, this.cheats[i].checked, this.cheats[i].code, this.cheats[i].is_permanent, i);
        }
    }
    cheatChanged(checked, code, index) {
        this.gameManager.setCheat(index, checked, code);
    }
}
window.EmulatorJS = EmulatorJS;

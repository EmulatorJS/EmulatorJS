class EmulatorJS {
    createElement(type) {
        return document.createElement(type);
    }
    downloadFile(path, cb, progressCB, notWithPath) {
        //todo. Progress callback
        const basePath = notWithPath ? '' : this.config.dataPath;
        fetch(basePath + path).then(async res => {
            const ab = await res.arrayBuffer();
            cb(new Uint8Array(ab));
        });
        
    }
    constructor(element, config) {
        this.setElements(element);
        this.listeners = [];
        this.config = config;
        this.canvas = this.createElement('canvas');
        this.canvas.classList.add('ejs_canvas');
        
        
        this.game.classList.add("ejs_game");
        
        this.createStartButton();
        
        console.log(this)
    }
    setElements(element) {
        this.game =  document.querySelector(element);
        this.elements = {
            main: this.game,
            parent: this.game.parentElement
        }
        this.elements.parent.classList.add("ejs_parent");
    }
    addEventListener(element, listener, callback) {
        element.addEventListener(listener, callback);
        this.listeners.push({cb:callback, elem:element, listener:listener});
    }
    // Start button
    createStartButton() {
        const button = this.createElement("div");
        button.classList.add("ejs_start_button");
        button.innerText = this.localization("Start Game");
        this.elements.parent.appendChild(button);
        this.addEventListener(button, "click", this.startButtonClicked.bind(this));
    }
    startButtonClicked(e) {
        e.preventDefault();
        e.target.remove();
        this.createText();
        this.downloadGameCore();
    }
    // End start button
    createText() {
        this.textElem = this.createElement("div");
        this.textElem.classList.add("ejs_loading_text");
        this.textElem.innerText = this.localization("Loading...");
        this.elements.parent.appendChild(this.textElem);
    }
    localization(text) {
        //todo
        return text;
    }
    checkCompression(data) {
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
                this.downloadFile(path, (fileData) => {
                    const blob = new Blob([fileData], {
                        'type': 'application/javascript'
                    })
                    const url = window.URL.createObjectURL(blob);
                    resolve(new Worker(url));
                });
            })
        }
        const decompress7z = (file) => {
            return new Promise((resolve, reject) => {
                const files = {};
                function onMessage(data) {
                    if (!data.data) return;
                    //data.data.t/ 4=progress, 2 is file, 1 is zip done
                    if (data.data.t === 2) {
                        files[data.data.file] = data.data.data;
                    }
                    if (data.data.t === 1) {
                        resolve(files);
                    }
                }
                
                createWorker('compression/extract7z.js').then((worker) => {
                    worker.onmessage = onMessage;
                    worker.postMessage(file);
                    //console.log(file);
                })
            })
        }
        async function decompressRar() {
            
        }
        const compression = isCompressed(data.slice(0, 10));
        if (compression) {
            //Need to do zip and rar still
            return decompress7z(data);
        } else {
            return new Promise(resolve => resolve(data));
        }
        
    }
    downloadGameCore() {
        this.downloadFile('cores/'+this.getCore()+'-wasm.data', (e) => {
            this.checkCompression(e).then((data) => {
                //console.log(data);
                let js, wasm;
                for (let k in data) {
                    if (k.endsWith(".wasm")) {
                        wasm = data[k];
                    } else if (k.endsWith(".js")) {
                        js = data[k];
                    }
                }
                this.initGameCore(js, wasm);
            });
        });
        
    }
    initGameCore(js, wasm) {
        this.initModule(wasm);
        let script = this.createElement("script");
        script.src = URL.createObjectURL(new Blob([js], {type: "application/javascript"}));
        script.onload = this.downloadRom.bind(this);
        document.body.appendChild(script);
    }
    getCore() {
        const core = this.config.system;
        //switch case or an object holding this data
        if (core === 'nes') {
            return 'fceumm';
        }
    }
    downloadRom() {
        this.downloadFile(this.config.gameUrl, (e) => {
            this.checkCompression(e).then((data) => {
                FS.writeFile("/game", data);
                this.startGame();
            });
        }, null, true);
    }
    initModule(wasmData) {
        window.Module = {
            'TOTAL_MEMORY': 0x10000000,
            'noInitialRun': true,
            'arguments': [],
            'preRun': [],
            'postRun': [],
            'canvas': this.canvas,
            'print': function(msg) {
                if (window.EJS_DEBUG_XX === true) {
                    console.log(msg);
                }
            },
            'printErr': function(msg) {
                if (window.EJS_DEBUG_XX === true) {
                    console.log(msg);
                }
            },
            'totalDependencies': 0,
            'monitorRunDependencies': () => {},
            'locateFile': function(fileName) {
                console.log(fileName);
                if (fileName.endsWith(".wasm")) {
                    return URL.createObjectURL(new Blob([wasmData], {type: "application/wasm"}));
                }
            },
            'readAsync': function(_0x20d016, _0x9d2de4, _0x1425ee) {
                console.log(_0x20d016, _0x9d2de4, _0x1425ee)
            }
        };
    }
    startGame() {
        this.bindListeners();
        this.textElem.remove();
        this.textElem = null;
        this.game.classList.remove("ejs_game");
        this.game.appendChild(this.canvas);
        const args = [];
        if (window.EJS_DEBUG_XX === true) args.push('-v');
        args.push('/game');
        Module.callMain(args);
        Module.resumeMainLoop();
        Module.setCanvasSize(800, 600);
        let i=0;
        // this needs to be fixed. Ugh
        let j = setInterval(function() { // some cores have a messed up screen size on load (for example - gba)
            if (i>20) clearInterval(j);
            i++;
            Module.setCanvasSize(800, 600);
        }, 100)
    }
    bindListeners() {
        //keyboard, etc...
        this.addEventListener(this.game, 'contextmenu', (e) => {
            e.preventDefault();
        })
    }
        
    
    
}

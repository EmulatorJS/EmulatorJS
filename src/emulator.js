class EmulatorJS {
    createElement(type) {
        return document.createElement(type);
    }
    downloadFile(path, cb, progressCB, notWithPath, opts) {
        const basePath = notWithPath ? '' : this.config.dataPath;
        path = basePath + path;
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
                    try {data=JSON.parse(data)}catch(e){}
                    cb({
                        data: data,
                        headers: {
                            "content-length": xhr.getResponseHeader('content-length'),
                            "content-type": xhr.getResponseHeader('content-type'),
                            "last-modified": xhr.getResponseHeader('last-modified')
                        }
                    });
                }
            }
            xhr.responseType = opts.responseType;
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
                    if (opts.type && opts.type.toLowerCase() === 'arraybuffer') {
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
            })
        }
    }
    constructor(element, config) {
        this.setElements(element);
        this.started = false;
        this.listeners = [];
        this.config = config;
        this.canvas = this.createElement('canvas');
        this.canvas.classList.add('ejs_canvas');
        this.bindListeners();
        
        
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
    checkCompression(data, msg) {
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
                        this.textElem.innerText = "Error";
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
        const decompress7z = (file) => {
            return new Promise((resolve, reject) => {
                const files = {};
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
        this.textElem.innerText = this.localization("Download Game Core");
        this.downloadFile('cores/'+this.getCore()+'-wasm.data', (res) => {
            if (res === -1) {
                this.textElem.innerText = "Error";
                this.textElem.style.color = "red";
                return;
            }
            this.checkCompression(new Uint8Array(res.data), this.localization("Decompress Game Core")).then((data) => {
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
        }, (progress) => {
            this.textElem.innerText = this.localization("Download Game Core") + progress;
        }, false, {responseType: "arraybuffer", method: "GET"});
        
    }
    initGameCore(js, wasm) {
        this.initModule(wasm);
        let script = this.createElement("script");
        script.src = URL.createObjectURL(new Blob([js], {type: "application/javascript"}));
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
        this.textElem.innerText = this.localization("Download Game Data");
        this.downloadFile(this.config.gameUrl, (res) => {
            if (res === -1) {
                this.textElem.innerText = "Error";
                this.textElem.style.color = "red";
                return;
            }
            this.checkCompression(new Uint8Array(res.data), this.localization("Decompress Game Data")).then((data) => {
                FS.writeFile("/game", data);
                this.startGame();
            });
        }, (progress) => {
            this.textElem.innerText = this.localization("Download Game Data") + progress;
        }, true, {responseType: "arraybuffer", method: "GET"});
    }
    initModule(wasmData) {
        window.Module = {
            'TOTAL_MEMORY': 0x10000000,
            'noInitialRun': true,
            'onRuntimeInitialized': this.downloadRom.bind(this),
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
            'readAsync': function(a, b, c) {
                console.log(a, b, c)
            }
        };
    }
    startGame() {
        this.textElem.remove();
        this.textElem = null;
        this.game.classList.remove("ejs_game");
        this.game.appendChild(this.canvas);
        const args = [];
        if (window.EJS_DEBUG_XX === true) args.push('-v');
        args.push('/game');
        Module.callMain(args);
        Module.resumeMainLoop();
        this.started = true;
        Module.setCanvasSize(800, 600);
        let i=0;
        // this needs to be fixed. Ugh.
        let j = setInterval(function() { // some cores have a messed up screen size on load (for example - gba)
            if (i>20) clearInterval(j);
            i++;
            Module.setCanvasSize(800, 600);
        }, 100)
    }
    bindListeners() {
        this.createContextMenu();
        //keyboard, etc...
    }
    createContextMenu() {
        this.elements.contextmenu = this.createElement('div');
        this.elements.contextmenu.classList.add("ejs_context_menu");
        this.addEventListener(this.game, 'contextmenu', (e) => {
            if (this.started) {
                this.elements.contextmenu.style.display = "block";
                this.elements.contextmenu.style.left = e.offsetX;
                this.elements.contextmenu.style.top = e.offsetY;
            }
            e.preventDefault();
        })
        this.addEventListener(this.elements.contextmenu, 'contextmenu', (e) => e.preventDefault());
        this.addEventListener(this.elements.parent, 'contextmenu', (e) => e.preventDefault());
        this.addEventListener(this.game, 'mousedown', (e) => {
            this.elements.contextmenu.style.display = "none";
        })
        let contextHtml = ['<ul>', '</ul>']
        let contextFunctions = []
        const addButton = (title, hidden, functi0n) => {
            if (functi0n instanceof Function) {
                contextFunctions.push(functi0n);
            } else {
                contextFunctions.push(() => {});
            }
            let i = contextHtml.length - 1;
            if (hidden) {
                contextHtml.splice(i, 0, '<li hidden><a href="#" onclick="return false">'+title+'</a></li>');
            } else {
                contextHtml.splice(i, 0, '<li><a href="#" onclick="return false">'+title+'</a></li>');
            }
        }
        addButton("test 1", false, () => console.log("1"));
        addButton("test 2", false, () => console.log("2"));
        addButton("test 3", false, () => console.log("3"));
        addButton("test 4", false, () => console.log("4"));
        
        this.elements.contextmenu.innerHTML = contextHtml.join('');
        
        let buttons = this.elements.contextmenu.getElementsByTagName('li')
        for (let i=0; i<buttons.length; i++) {
            this.addEventListener(buttons[i], 'click', contextFunctions[i]);
        }
        
        this.elements.parent.appendChild(this.elements.contextmenu);
    }
        
    
    
}

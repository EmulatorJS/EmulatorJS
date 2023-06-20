class EmulatorJS {
    createElement(type) {
        return document.createElement(type);
    }
    downloadFile(path, cb, progressCB) {
        //todo. Progress callback
        fetch(this.config.dataPath + path).then(async res => {
            const ab = await res.arrayBuffer();
            cb(ab);
        });
        
    }
    constructor(element, config) {
        this.setElements(element);
        this.listeners = [];
        this.config = config;
        
        
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
        this.downloadRom();
    }
    // End start button
    createText() {
        const text = this.createElement("div");
        text.classList.add("ejs_loading_text");
        text.innerText = this.localization("Loading...");
        this.elements.parent.appendChild(text);
    }
    localization(text) {
        //todo
        return text;
    }
    checkCompression(e) {
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
        async function decompressZip7z() {
            
        }
        async function decompressRar() {
            
        }
        const compression = isCompressed(e);
        if (compression) {
            console.log(compression); //where I left off
        } else {
            return new Promise(resolve => resolve(e));
        }
        
        return e;
    }
    downloadRom() {
        this.downloadFile(this.config.gameUrl, (e) => {
            this.checkCompression(e).then((data) => {
                console.log(e);
            });
        });
    }
        
    
    
}

/**
 * Netplay - WebRTC-based multiplayer for EmulatorJS
 * Handles room creation, peer connections, video/audio streaming, and input sync
 */
export class Netplay {
    constructor(emu) {
        if (!emu) throw new Error("Netplay requires an EmulatorJS instance");
        this.emu = emu;

        // Connection state
        this.owner = false;
        this.connected = false;
        this.room = null;
        this.socket = null;
        this.localStream = null;
        this.peerConnections = {};
        this.players = {};
        this.playerID = null;
        this.name = null;
        this.extra = null;
        this.maxPlayers = 4;

        // Input synchronization
        this.inputs = {};
        this.inputsData = {};
        this.init_frame = 0;
        this.currentFrame = 0;

        // WebRTC state
        this.webRtcReady = false;
        this.video = null;
        this.frozen = null;
        this.previousPlayers = {};
        this.captureCanvas = null;
        this._captureCtx = null;
        this._captureLoopRunning = false;
        this.captureRunning = false;

        // Audio handling
        this.remoteAudioElements = {};
        this.remoteAudioContext = null;
        this.remoteGainNode = null;

        // Host audio capture
        this._hostAudioDest = null;
        this._hostAudioSourceNode = null;
        this._hostAudioBoostGain = null;

        // Remote audio context (created during user gesture)
        this._remoteAudioCtx = null;
        this._remoteAudioGain = null;
        this._remoteAudioSource = null;

        // Audio amplification factor for netplay streaming
        this._audioBoostFactor = 1.5;

        // UI restoration state
        this._restoreParentPosition = null;
        this._gotVideoEver = false;
        this._audioUnlockArmed = false;
        this._audioUnlockCleanup = null;
        this._chatBound = false;
        this._leaving = false;
        this._dcTimer = null;
        this.connectionTimeout = null;
        this.updateListInterval = null;
        this.stopDrawLoop = null;
        this.originalSimulateInput = null;
        this.oldCheatDisplay = null;

        // UI element references
        this.table = null;
        this.playerTable = null;
        this.passwordElem = null;
        this.roomNameElem = null;
        this.createButton = null;
        this.tabs = null;
        this.chatWrap = null;
        this.chatLog = null;
        this.chatTo = null;
        this.chatInput = null;
        this.chatSendBtn = null;
        this._hostCanvasOrigSize = null;

        // Server configuration
        this.url = this.emu.config.netplayUrl || window.EJS_netplayUrl || null;
        if (this.url) {
            while (this.url.endsWith("/")) this.url = this.url.slice(0, -1);
        }

        this.iceServers = this.emu.config.netplayICEServers || window.EJS_netplayICEServers || [];

        if (this.iceServers.length === 0) {
            console.warn("[NETPLAY] No ICE servers configured. Connections will only work on LAN.");
        }
    }

    /** Toggle visibility of UI elements based on host/guest role */
    updateNetplayUI(isJoining) {
        if (!this.emu.elements.bottomBar) return;
        const bar = this.emu.elements.bottomBar;
        const shouldHide = isJoining && !this.owner;
        const elems = [
            ...(bar.playPause || []), ...(bar.restart || []), ...(bar.saveState || []),
            ...(bar.loadState || []), ...(bar.cheat || []), ...(bar.saveSavFiles || []),
            ...(bar.loadSavFiles || []), ...(bar.exit || []), ...(bar.contextMenu || []),
            ...(bar.cacheManager || [])
        ];
        if (bar.settings && bar.settings.length > 0 && bar.settings[0].parentElement) elems.push(bar.settings[0].parentElement);
        if (this.emu.diskParent) elems.push(this.emu.diskParent);
        elems.forEach((el) => { if (el) el.classList.toggle("netplay-hidden", shouldHide); });
    }

    /** Build the netplay menu popup with room list, chat, and player table */
    createNetplayMenu() {
        const body = this.emu.createPopup("Netplay", {
            "Create a Room": () => {
                this._unlockMobileAudio();
                if (typeof this.updateList !== "object" || !this.updateList) this.defineNetplayFunctions();
                if (this.emu.isNetplay) this.leaveRoom();
                else this.showOpenRoomDialog();
            },
            "Close": () => {
                this._menuElement.style.display = "none";
                if (this.updateList) this.updateList.stop();
            }
        }, true);

        this._menuElement = body.parentElement;
        this.createButton = this._menuElement.getElementsByTagName("a")[0];

        // Room list section
        const rooms = this.emu.createElement("div");
        const title = this.emu.createElement("strong");
        title.innerText = this.emu.localization("Rooms");

        const table = this.emu.createElement("table");
        table.classList.add("ejs_netplay_table");
        table.style.width = "100%";
        table.setAttribute("cellspacing", "0");

        const thead = this.emu.createElement("thead");
        const row = this.emu.createElement("tr");
        const addToHeader = (text) => {
            const item = this.emu.createElement("td");
            item.innerText = text;
            item.style.textAlign = "center";
            row.appendChild(item);
            return item;
        };
        thead.appendChild(row);
        addToHeader("Room Name").style.textAlign = "left";
        addToHeader("Players").style.width = "80px";
        addToHeader("").style.width = "80px";
        table.appendChild(thead);

        const tbody = this.emu.createElement("tbody");
        table.appendChild(tbody);
        rooms.appendChild(title);
        rooms.appendChild(table);

        // Joined room section
        const joined = this.emu.createElement("div");
        const title2 = this.emu.createElement("strong");
        title2.innerText = "{roomname}";

        const password = this.emu.createElement("div");
        password.innerText = "Password: ";

        const table2 = this.emu.createElement("table");
        table2.classList.add("ejs_netplay_table");
        table2.style.width = "100%";
        table2.setAttribute("cellspacing", "0");

        const thead2 = this.emu.createElement("thead");
        const row2 = this.emu.createElement("tr");
        const addToHeader2 = (text) => {
            const item = this.emu.createElement("td");
            item.innerText = text;
            row2.appendChild(item);
            return item;
        };
        thead2.appendChild(row2);
        addToHeader2("Player").style.width = "80px";
        addToHeader2("Name");
        addToHeader2("").style.width = "80px";
        table2.appendChild(thead2);

        const tbody2 = this.emu.createElement("tbody");
        table2.appendChild(tbody2);
        joined.appendChild(title2);
        joined.appendChild(password);
        joined.appendChild(table2);

        // Chat UI
        const chatWrap = this.emu.createElement("div");
        chatWrap.classList.add("ejs_netplay_chat_container");
        chatWrap.style.marginTop = "10px";

        const chatHeaderRow = this.emu.createElement("div");
        chatHeaderRow.classList.add("ejs_netplay_chat_header_row");
        chatWrap.appendChild(chatHeaderRow);

        const chatTitle = this.emu.createElement("strong");
        chatTitle.innerText = this.emu.localization("Chat");
        chatHeaderRow.appendChild(chatTitle);

        const chatHint = this.emu.createElement("span");
        chatHint.classList.add("ejs_netplay_chat_hint");
        chatHint.innerText = this.emu.localization("Everyone or private");
        chatHeaderRow.appendChild(chatHint);

        const chatLog = this.emu.createElement("div");
        chatLog.classList.add("ejs_netplay_chat_log");
        chatWrap.appendChild(chatLog);

        const chatRow = this.emu.createElement("div");
        chatRow.classList.add("ejs_netplay_chat_row");
        chatWrap.appendChild(chatRow);

        const chatTo = this.emu.createElement("select");
        chatTo.classList.add("ejs_netplay_chat_to");
        const optAll = document.createElement("option");
        optAll.value = "all";
        optAll.innerText = this.emu.localization("Everyone");
        chatTo.appendChild(optAll);
        chatRow.appendChild(chatTo);

        const chatInput = this.emu.createElement("input");
        chatInput.type = "text";
        chatInput.maxLength = 300;
        chatInput.placeholder = this.emu.localization("Type a message...");
        chatInput.classList.add("ejs_netplay_chat_input");
        chatRow.appendChild(chatInput);

        const chatSend = this.emu.createElement("button");
        chatSend.classList.add("ejs_button_button");
        chatSend.style.height = "34px";
        chatSend.style.minWidth = "70px";
        chatSend.innerText = this.emu.localization("Send");
        chatRow.appendChild(chatSend);

        joined.appendChild(chatWrap);
        joined.style.display = "none";
        body.appendChild(rooms);
        body.appendChild(joined);

        // Store references
        this._roomsDiv = rooms;
        this._joinedDiv = joined;
        this._tbody = tbody;
        this._tbody2 = tbody2;
        this._password = password;
        this._title2 = title2;
        this._chatWrap = chatWrap;
        this._chatLog = chatLog;
        this._chatTo = chatTo;
        this._chatInput = chatInput;
        this._chatSend = chatSend;

        this.openMenu = () => {
            // Show TURN warning if needed
            if (this.emu.netplayShowTurnWarning && !this._warningShown) {
                const warningDiv = this.emu.createElement("div");
                warningDiv.className = "ejs_netplay_warning";
                warningDiv.innerText = "Warning: No TURN server configured. Netplay connections may fail.";
                const menuBody = this._menuElement.querySelector(".ejs_popup_body");
                if (menuBody) {
                    menuBody.prepend(warningDiv);
                    this._warningShown = true;
                }
            }

            this._menuElement.style.display = "";
            this.table = this._tbody;
            this.playerTable = this._tbody2;
            this.passwordElem = this._password;
            this.roomNameElem = this._title2;
            this.tabs = [this._roomsDiv, this._joinedDiv];
            this.chatWrap = this._chatWrap;
            this.chatLog = this._chatLog;
            this.chatTo = this._chatTo;
            this.chatInput = this._chatInput;
            this.chatSendBtn = this._chatSend;

            // Prompt for player name if not set
            if (!this.name) {
                const popups = this.emu.createSubPopup();
                this._menuElement.appendChild(popups[0]);
                popups[1].classList.add("ejs_cheat_parent");
                const popup = popups[1];

                const header = this.emu.createElement("div");
                const nameTitle = this.emu.createElement("h2");
                nameTitle.innerText = this.emu.localization("Set Player Name");
                nameTitle.classList.add("ejs_netplay_name_heading");
                header.appendChild(nameTitle);
                popup.appendChild(header);

                const main = this.emu.createElement("div");
                main.classList.add("ejs_netplay_header");
                const head = this.emu.createElement("strong");
                head.innerText = this.emu.localization("Player Name");
                const input = this.emu.createElement("input");
                input.type = "text";
                input.setAttribute("maxlength", 20);

                main.appendChild(head);
                main.appendChild(this.emu.createElement("br"));
                main.appendChild(input);
                popup.appendChild(main);
                popup.appendChild(this.emu.createElement("br"));

                const buttonRow = this.emu.createElement("div");
                buttonRow.style.display = "flex";
                buttonRow.style.justifyContent = "center";
                buttonRow.style.gap = "10px";
                popup.appendChild(buttonRow);

                const submit = this.emu.createElement("button");
                submit.classList.add("ejs_button_button", "ejs_popup_submit");
                submit.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                submit.innerText = this.emu.localization("Submit");
                buttonRow.appendChild(submit);

                const cancel = this.emu.createElement("button");
                cancel.classList.add("ejs_button_button", "ejs_popup_submit");
                cancel.innerText = this.emu.localization("Cancel");
                buttonRow.appendChild(cancel);

                const closeNamePopup = () => popups[0].remove();

                this.emu.addEventListener(submit, "click", () => {
                    if (!input.value.trim()) return;
                    this.name = input.value.trim();
                    closeNamePopup();
                });

                this.emu.addEventListener(cancel, "click", () => {
                    closeNamePopup();
                    this._menuElement.style.display = "none";
                    if (this.updateList) this.updateList.stop();
                });

                this.emu.addEventListener(input, "keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        submit.click();
                    } else if (e.key === "Escape") {
                        e.preventDefault();
                        cancel.click();
                    }
                });

                setTimeout(() => input.focus(), 0);
            }

            if (!this.updateList) this.defineNetplayFunctions();
            this.bindChatUI();
            this.chatRefreshRecipients();
            this.updateList.start();
        };
    }

    /** Initialize update list and hook into emulator's main loop */
    defineNetplayFunctions() {
        this.updateList = { start: () => this._updateListStart(), stop: () => this._updateListStop() };
        if (!this.url) {
            this.emu.displayMessage("Netplay URL not configured", 5000);
            return;
        }
        const Module = (this.emu.gameManager && this.emu.gameManager.Module) ? this.emu.gameManager.Module : this.emu.Module;
        if (Module) {
            this._origPostMainLoop = Module.postMainLoop || null;
            Module.postMainLoop = () => this._initModulePostMainLoop();
        }
    }

    /** Generate a unique identifier */
    _guid() {
        const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }

    /** Debug logging helper */
    _log(role, ...args) {
        if (this.emu.debug) console.log("[NETPLAY " + role + "]", ...args);
    }

    /** Get emulator's native resolution for aspect ratio calculations */
    getNativeResolution() {
        try {
            if (this.emu.Module && this.emu.Module.getNativeResolution) return this.emu.Module.getNativeResolution();
        } catch (e) {}
        return { width: 640, height: 480 };
    }

    /** Get current player's index in the player list */
    getUserIndex() {
        if (!this.emu.isNetplay || !this.players || !this.playerID) return 0;
        const idx = Object.keys(this.players).indexOf(this.playerID);
        return idx === -1 ? 0 : idx;
    }

    /** Unlock audio context on mobile devices (requires user gesture) */
    _unlockMobileAudio() {
        const ctx = this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx;
        if (!ctx) return;
        try { if (ctx.state !== "running") ctx.resume().catch(() => {}); } catch (e) {}
        try {
            const b = ctx.createBuffer(1, 1, ctx.sampleRate);
            const s = ctx.createBufferSource();
            s.buffer = b;
            s.connect(ctx.destination);
            s.start(0);
            s.stop(0);
        } catch (e) {}
    }

    /**
     * Pre-create remote AudioContext during a user gesture so it starts in "running" state.
     * Must be called from a click/touch/keydown handler.
     */
    _ensureRemoteAudioContext() {
        try {
            if (!this._remoteAudioCtx) {
                this._remoteAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
                console.log("[NETPLAY] Pre-created remote AudioContext during user gesture, state:", this._remoteAudioCtx.state);
            }
            if (this._remoteAudioCtx.state === "suspended") {
                this._remoteAudioCtx.resume().then(() => {
                    console.log("[NETPLAY] Remote AudioContext resumed to:", this._remoteAudioCtx.state);
                }).catch(() => {});
            }
        } catch (e) {
            console.error("[NETPLAY] _ensureRemoteAudioContext error:", e);
        }
    }

    /** Create or get existing audio element for remote peer, with dedicated AudioContext routing */
    ensureRemoteAudioElement(peerId) {
        this.remoteAudioElements = this.remoteAudioElements || {};
        const id = "ejs-remote-audio-" + peerId;
        let el = this.remoteAudioElements[peerId] || document.getElementById(id);
        if (!el) {
            el = document.createElement("audio");
            el.id = id;
            el.autoplay = true;
            el.playsInline = true;
            el.style.display = "none";
            document.body.appendChild(el);
            this.remoteAudioElements[peerId] = el;
        }
        el.muted = false;
        el.volume = 1.0;
        return el;
    }

    /**
     * Capture audio from the emulator's AudioContext using MediaStreamDestination.
     * Inserts a boost gain node to amplify the signal before streaming.
     */
    _captureHostAudio() {
        try {
            let audioCtx = null;

            // Method 1: EmulatorJS OpenAL audio context
            if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx) {
                const alCtx = this.emu.Module.AL.currentCtx;
                if (alCtx.audioCtx) {
                    audioCtx = alCtx.audioCtx;
                    if (audioCtx.state !== "running") {
                        audioCtx.resume().catch(() => {});
                    }
                }
            }

            // Method 2: gameManager audioContext
            if (!audioCtx && this.emu.gameManager && this.emu.gameManager.audioContext) {
                audioCtx = this.emu.gameManager.audioContext;
            }

            if (!audioCtx) {
                console.warn("[NETPLAY HOST] No audio context found for capture");
                return null;
            }

            // Create boost gain node and MediaStreamDestination
            const boostGain = audioCtx.createGain();
            boostGain.gain.value = this._audioBoostFactor;
            this._hostAudioBoostGain = boostGain;

            const dest = audioCtx.createMediaStreamDestination();
            this._hostAudioDest = dest;

            // Connect: source -> boostGain -> dest
            boostGain.connect(dest);

            let connected = false;

            // Method 1: Connect gameManager's audioNode
            if (this.emu.gameManager && this.emu.gameManager.audioNode) {
                try {
                    this.emu.gameManager.audioNode.connect(boostGain);
                    connected = true;
                    console.log("[NETPLAY HOST] Connected gameManager.audioNode -> boostGain -> capture dest (boost:", this._audioBoostFactor + "x)");
                } catch (e) {
                    console.warn("[NETPLAY HOST] Failed to connect audioNode:", e);
                }
            }

            // Method 2: Connect OpenAL gain/source nodes
            if (!connected && this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx) {
                const alCtx = this.emu.Module.AL.currentCtx;
                if (alCtx.gain) {
                    try {
                        alCtx.gain.connect(boostGain);
                        connected = true;
                        console.log("[NETPLAY HOST] Connected AL gain node -> boostGain -> capture dest (boost:", this._audioBoostFactor + "x)");
                    } catch (e) {
                        console.warn("[NETPLAY HOST] Failed to connect AL gain:", e);
                    }
                }
                if (!connected && alCtx.sources) {
                    for (const sid in alCtx.sources) {
                        const src = alCtx.sources[sid];
                        if (src && src.gain) {
                            try {
                                src.gain.connect(boostGain);
                                connected = true;
                                console.log("[NETPLAY HOST] Connected AL source gain -> boostGain -> capture dest (boost:", this._audioBoostFactor + "x)");
                            } catch (e) {}
                        }
                    }
                }
            }

            // Method 3: Use createMediaElementSource if there's an audio element
            if (!connected) {
                try {
                    const audioElements = document.querySelectorAll("audio");
                    for (const ae of audioElements) {
                        if (ae.id && ae.id.startsWith("ejs-remote-audio-")) continue;
                        try {
                            const mediaSource = audioCtx.createMediaElementSource(ae);
                            mediaSource.connect(boostGain);
                            mediaSource.connect(audioCtx.destination);
                            connected = true;
                            console.log("[NETPLAY HOST] Connected audio element -> boostGain -> capture dest (boost:", this._audioBoostFactor + "x)");
                            break;
                        } catch (e) {}
                    }
                } catch (e) {}
            }

            if (!connected) {
                console.warn("[NETPLAY HOST] Could not connect any audio source to capture destination");
            }

            const audioTracks = dest.stream.getAudioTracks();
            console.log("[NETPLAY HOST] Captured", audioTracks.length, "audio tracks, connected:", connected, "boost:", this._audioBoostFactor + "x");
            
            if (audioTracks.length > 0) {
                return dest.stream;
            }
            return null;
        } catch (e) {
            console.error("[NETPLAY HOST] _captureHostAudio error:", e);
            return null;
        }
    }

    /** Route remote audio stream through a dedicated AudioContext with amplification */
    _routeRemoteAudio(peerId, stream) {
        try {
            if (!this._remoteAudioCtx) {
                console.warn("[NETPLAY GUEST] AudioContext not pre-created, creating now (may be suspended)");
                this._remoteAudioCtx = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (this._remoteAudioCtx.state !== "running") {
                this._remoteAudioCtx.resume().catch(() => {});
            }

            // Disconnect previous source/gain if reconnecting
            if (this._remoteAudioSource) {
                try { this._remoteAudioSource.disconnect(); } catch (e) {}
                this._remoteAudioSource = null;
            }
            if (this._remoteAudioGain) {
                try { this._remoteAudioGain.disconnect(); } catch (e) {}
                this._remoteAudioGain = null;
            }

            const source = this._remoteAudioCtx.createMediaStreamSource(stream);
            const gain = this._remoteAudioCtx.createGain();
            
            // Apply volume with boost factor for audible playback
            const baseVol = this.emu.muted ? 0 : (typeof this.emu.volume === "number" ? this.emu.volume : 1);
            gain.gain.value = baseVol * this._audioBoostFactor;
            
            source.connect(gain);
            gain.connect(this._remoteAudioCtx.destination);

            this._remoteAudioGain = gain;
            this._remoteAudioSource = source;

            console.log("[NETPLAY GUEST] Audio stream connected to AudioContext, state:", this._remoteAudioCtx.state, "gain:", gain.gain.value);
        } catch (e) {
            console.error("[NETPLAY GUEST] _routeRemoteAudio error:", e);
        }
    }

    /** Sync volume to remote audio elements and dedicated AudioContext */
    setVolume(vol) {
        if (!this.emu.isNetplay) return false;
        if (this.remoteAudioElements) {
            for (const peerId in this.remoteAudioElements) {
                try { this.remoteAudioElements[peerId].volume = Math.min(1.0, vol * this._audioBoostFactor); } catch (e) {}
            }
        }
        if (this._remoteAudioGain) {
            try { this._remoteAudioGain.gain.value = vol * this._audioBoostFactor; } catch (e) {}
        }
        return !this.owner;
    }

    /** Set up audio unlock on user interaction for guests */
    armGuestAudioUnlock() {
        if (!this.emu.isNetplay || this.owner || this._audioUnlockArmed) return;
        this._audioUnlockArmed = true;

        const tryPlayAll = () => {
            console.log("[NETPLAY GUEST] Audio unlock triggered by user gesture");

            // Resume dedicated remote audio context
            if (this._remoteAudioCtx && this._remoteAudioCtx.state !== "running") {
                this._remoteAudioCtx.resume().then(() => {
                    console.log("[NETPLAY GUEST] Remote AudioContext resumed via interaction, state:", this._remoteAudioCtx.state);
                }).catch(() => {});
            }
            try {
                const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
                els.forEach((a) => {
                    a.muted = false;
                    a.volume = 1.0;
                    a.play().catch(() => {});
                });
            } catch (e) {}
            cleanup();
        };

        const cleanup = () => {
            if (!this._audioUnlockArmed) return;
            this._audioUnlockArmed = false;
            document.removeEventListener("pointerdown", tryPlayAll, true);
            document.removeEventListener("touchend", tryPlayAll, true);
            document.removeEventListener("keydown", tryPlayAll, true);
        };

        document.addEventListener("pointerdown", tryPlayAll, true);
        document.addEventListener("touchend", tryPlayAll, true);
        document.addEventListener("keydown", tryPlayAll, true);
        this._audioUnlockCleanup = cleanup;
    }

    /** Stop local emulation for guests (they watch host's stream instead) */
    freezeGuest() {
        this._log("GUEST", "Freezing emulator...");
        this.frozen = this.frozen || { originals: {} };
        const orig = this.frozen.originals;

        if (this.emu.gameManager) {
            try { this.emu.gameManager.toggleMainLoop(0); } catch (e) {}
            if (this.emu.gameManager.pause) {
                try { this.emu.gameManager.pause(); } catch (e) {}
            }
        }
        if (this.emu.Module && this.emu.Module.pauseMainLoop) {
            try { this.emu.Module.pauseMainLoop(); } catch (e) {}
        }

        // Prevent resize from affecting guest canvas
        if (this.emu.handleResize && !orig.handleResize) {
            orig.handleResize = this.emu.handleResize;
            this.emu.handleResize = (...args) => {
                if (this.emu.isNetplay && !this.owner) return;
                try { orig.handleResize.apply(this.emu, args); } catch (e) {}
            };
        }

        // Silence local audio
        if (this.emu.gameManager && this.emu.gameManager.audioNode) {
            try { this.emu.gameManager.audioNode.disconnect(); } catch (e) {}
        }
        if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx) {
            const ctx = this.emu.Module.AL.currentCtx;
            if (ctx.sources) {
                for (const id in ctx.sources) {
                    try { ctx.sources[id].gain.gain.value = 0; } catch (e) {}
                }
            }
            if (ctx.audioCtx) ctx.audioCtx.suspend().catch(() => {});
        }
        this._log("GUEST", "Emulator frozen");
    }

    /** Restore local emulation after leaving room */
    unfreezeGuest() {
        if (!this.frozen) return;
        this._log("GUEST", "Unfreezing emulator...");

        const orig = this.frozen.originals || {};
        if (orig.handleResize) this.emu.handleResize = orig.handleResize;

        // Restore audio
        if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
            const vol = this.emu.muted ? 0 : this.emu.volume;
            if (this.emu.Module.AL.currentCtx.sources) {
                for (const id in this.emu.Module.AL.currentCtx.sources) {
                    try { this.emu.Module.AL.currentCtx.sources[id].gain.gain.value = vol; } catch (e) {}
                }
            }
        }
        if (this.emu.gameManager && this.emu.gameManager.audioNode && this.emu.gameManager.audioContext) {
            try { this.emu.gameManager.audioNode.connect(this.emu.gameManager.audioContext.destination); } catch (e) {}
        }

        // Resume emulation
        if (this.emu.Module && this.emu.Module.resumeMainLoop) {
            try { this.emu.Module.resumeMainLoop(); } catch (e) {}
        }
        if (this.emu.gameManager) {
            try { this.emu.gameManager.toggleMainLoop(1); } catch (e) {}
        }

        this.frozen = null;
        this._log("GUEST", "Emulator unfrozen");
    }

    /** Request peer connection renegotiation (for reconnection) */
    requestRenegotiate(peerId, reason) {
        try {
            if (!this.socket || !this.socket.connected) return;
            this._log(this.owner ? "HOST" : "GUEST", "Request renegotiate (" + (reason || "unknown") + ") with " + peerId);
            
            if (!this.owner) {
                if (this.peerConnections[peerId]) {
                    try { this.peerConnections[peerId].pc.close(); } catch(e) {}
                    delete this.peerConnections[peerId];
                }
            }

            this.socket.emit("webrtc-signal", { target: peerId, requestRenegotiate: true, reason: reason || "" });
        } catch (e) {}
    }

    /** Initialize WebRTC stream from emulator canvas (host only) */
    initWebRTCStream() {
        if (this.localStream) return Promise.resolve();

        if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
        }

        return new Promise((resolve) => {
            try {
                const emuCanvas = this.emu.canvas;
                if (!emuCanvas || !emuCanvas.captureStream) { resolve(); return; }

                // Capture directly from emulator canvas at 30fps
                let rawStream;
                try {
                    rawStream = emuCanvas.captureStream(30);
                } catch (e) {
                    resolve(); return;
                }

                if (!rawStream || rawStream.getVideoTracks().length === 0) { resolve(); return; }

                try { rawStream.getVideoTracks()[0].contentHint = "detail"; } catch (e) {}

                // Build final stream with video + audio
                const finalStream = new MediaStream();
                rawStream.getVideoTracks().forEach(t => finalStream.addTrack(t));

                // Try direct audio capture from AudioContext first
                let audioAdded = false;
                const directAudio = this._captureHostAudio();
                if (directAudio) {
                    const audioTracks = directAudio.getAudioTracks();
                    if (audioTracks.length > 0) {
                        audioTracks.forEach(t => finalStream.addTrack(t));
                        audioAdded = true;
                        console.log("[NETPLAY HOST] Audio captured via AudioContext MediaStreamDestination");
                    }
                }

                // Fallback: try collectScreenRecordingMediaTracks
                if (!audioAdded && typeof this.emu.collectScreenRecordingMediaTracks === "function") {
                    try {
                        const tempCanvas = document.createElement("canvas");
                        tempCanvas.width = 2; tempCanvas.height = 2;
                        const audioOnlyStream = this.emu.collectScreenRecordingMediaTracks(tempCanvas);
                        if (audioOnlyStream) {
                            const fallbackTracks = audioOnlyStream.getAudioTracks();
                            if (fallbackTracks.length > 0) {
                                fallbackTracks.forEach(t => finalStream.addTrack(t));
                                audioAdded = true;
                                console.log("[NETPLAY HOST] Audio captured via collectScreenRecordingMediaTracks fallback");
                            }
                        }
                    } catch (e) {
                        console.warn("[NETPLAY HOST] collectScreenRecordingMediaTracks fallback failed:", e);
                    }
                }

                if (!audioAdded) {
                    console.warn("[NETPLAY HOST] No audio tracks captured - guests will have no audio");
                }

                this.localStream = finalStream;
                console.log("[NETPLAY HOST] Stream ready - video tracks:", finalStream.getVideoTracks().length, "audio tracks:", finalStream.getAudioTracks().length);

                this.captureRunning = true;
                resolve();
            } catch (e) {
                console.error("[NETPLAY HOST] initWebRTCStream error:", e);
                resolve();
            }
        });
    }

    /** Capture loop for offscreen canvas (currently unused - direct capture preferred) */
    _startCaptureLoop() {
        if (this._captureLoopRunning) return;
        this._captureLoopRunning = true;

        const emuCanvas    = this.emu.canvas;
        const captureCanvas = this.captureCanvas;
        const captureCtx   = this._captureCtx;
        if (!emuCanvas || !captureCanvas || !captureCtx) return;

        const INTERVAL = 1000 / 62;
        let lastTime = 0;

        const loop = (now) => {
            if (!this._captureLoopRunning || !this.captureRunning) return;

            if (now - lastTime >= INTERVAL) {
                try {
                    const sw = emuCanvas.width;
                    const sh = emuCanvas.height;
                    if (sw > 0 && sh > 0) {
                        if (captureCanvas.width !== sw || captureCanvas.height !== sh) {
                            captureCanvas.width  = sw;
                            captureCanvas.height = sh;
                        }
                        captureCtx.drawImage(emuCanvas, 0, 0);
                    }
                } catch (e) {}
                lastTime = now;
            }

            requestAnimationFrame(loop);
        };

        requestAnimationFrame(loop);
    }

    /** Handle successful room join for both host and guest */
    roomJoined(isOwner, roomName, password, roomId) {
        this._log(isOwner ? "HOST" : "GUEST", "Room joined: " + roomName);

        this.updateNetplayUI(true);
        this.emu.isNetplay = true;
        this.inputs = {};
        this.owner = isOwner;

        // Update UI
        if (this.roomNameElem) this.roomNameElem.innerText = roomName;
        if (this.tabs && this.tabs[0]) {
            this.tabs[0].style.display = "none";
            this.tabs[1].style.display = "";
        }
        if (this.passwordElem) {
            this.passwordElem.style.display = password ? "" : "none";
            this.passwordElem.innerText = password ? "Password: " + password : "";
        }
        if (this.createButton) this.createButton.innerText = this.emu.localization("Leave Room");

        this.updatePlayersTable();

        if (!isOwner) {
            // Guest setup: freeze local emulation and show remote stream
            this._log("GUEST", "Setting up as guest...");
            
            this.freezeGuest();

            if (this.emu.canvas) {
                this.emu.canvas.classList.add("ejs_netplay_offscreen_canvas");
            }

            // Create overlay canvas for remote video
            if (!this.emu.netplayCanvas) {
                this.emu.netplayCanvas = this.emu.createElement("canvas");
                this.emu.netplayCanvas.classList.add("ejs_canvas");
            }

            Object.assign(this.emu.netplayCanvas.style, {
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
                zIndex: "5",
                display: "block",
                objectFit: "contain",
                objectPosition: "center",
                pointerEvents: "none"
            });

            if (!this.emu.netplayCanvas.parentElement) {
                this.emu.elements.parent.appendChild(this.emu.netplayCanvas);
            }

            const parentCs = window.getComputedStyle(this.emu.elements.parent);
            if (parentCs.position === "static") {
                this._restoreParentPosition = this.emu.elements.parent.style.position;
                this.emu.elements.parent.style.position = "relative";
            }

            // Hide cheat button for guests
            if (this.emu.elements.bottomBar && this.emu.elements.bottomBar.cheat && this.emu.elements.bottomBar.cheat[0]) {
                this.oldCheatDisplay = this.emu.elements.bottomBar.cheat[0].style.display;
                this.emu.elements.bottomBar.cheat[0].style.display = "none";
            }
            if (this.emu.gameManager && this.emu.gameManager.resetCheat) {
                this.emu.gameManager.resetCheat();
            }

            // Show "Connecting..." message
            const ctx = this.emu.netplayCanvas.getContext("2d", { alpha: false, willReadFrequently: true });
            const nativeRes = this.getNativeResolution();
            const nativeW = (nativeRes && nativeRes.width) ? nativeRes.width : 640;
            const nativeH = (nativeRes && nativeRes.height) ? nativeRes.height : 480;
            this.emu.netplayCanvas.width = nativeW;
            this.emu.netplayCanvas.height = nativeH;
            
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, nativeW, nativeH);
            ctx.fillStyle = "#fff";
            ctx.font = "20px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Connecting...", nativeW / 2, nativeH / 2);

            // Redirect local inputs to send over network
            if (this.emu.gameManager && this.emu.gameManager.functions && this.emu.gameManager.functions.simulateInput) {
                this.originalSimulateInput = this.emu.gameManager.functions.simulateInput;
                this.emu.gameManager.functions.simulateInput = (player, index, value) => {
                    const pidx = this.getUserIndex();
                    const pcs = this.peerConnections;
                    for (const key in pcs) {
                        if (pcs[key] && pcs[key].dataChannel && pcs[key].dataChannel.readyState === "open") {
                            pcs[key].dataChannel.send(JSON.stringify({ player: pidx, index, value }));
                        }
                    }
                };
            }

            this._gotVideoEver = false;

            // Eagerly arm audio unlock so first user interaction starts audio
            this.armGuestAudioUnlock();

            // Connection timeout fallback
            this.connectionTimeout = setTimeout(() => {
                if (!this.webRtcReady && !this._gotVideoEver) {
                    this.emu.displayMessage("Connection failed", 5000);
                    this.leaveRoom();
                }
            }, 15000);

            this.emu.elements.parent.focus();
        } else {
            this._log("HOST", "Setup complete");
            if (this.emu.gameManager) {
                try { this.emu.gameManager.toggleMainLoop(1); } catch (e) {}
            }
        }
    }

    /** Draw remote video stream to guest's overlay canvas */
    drawVideoToCanvas() {
        const video = this.video;
        const canvas = this.emu.netplayCanvas;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        let running = true;
        const draw = () => {
            if (!running || !this.emu.isNetplay || this.owner || !canvas.parentNode) return;

            if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                const vw = video.videoWidth;
                const vh = video.videoHeight;
                
                // Calculate aspect ratio correction
                const nativeRes = this.getNativeResolution();
                let nativeAspect = 4 / 3;
                if (nativeRes && nativeRes.width && nativeRes.height) {
                    nativeAspect = nativeRes.width / nativeRes.height;
                }
                
                const videoAspect = vw / vh;
                let srcX = 0, srcY = 0, srcW = vw, srcH = vh;

                // Crop to correct aspect ratio if needed
                if (videoAspect > nativeAspect + 0.05) {
                    srcH = vh;
                    srcW = vh * nativeAspect;
                    srcX = (vw - srcW) / 2;
                } 
                else if (videoAspect < nativeAspect - 0.05) {
                    srcW = vw;
                    srcH = vw / nativeAspect;
                    srcY = 0; 
                }

                srcX = Math.round(srcX);
                srcY = Math.round(srcY);
                srcW = Math.max(1, Math.round(srcW));
                srcH = Math.max(1, Math.round(srcH));

                if (canvas.width !== srcW || canvas.height !== srcH) {
                    canvas.width = srcW;
                    canvas.height = srcH;
                }
                
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                ctx.imageSmoothingEnabled = false;
                ctx.drawImage(video, srcX, srcY, srcW, srcH, 0, 0, canvas.width, canvas.height);
            }
            requestAnimationFrame(draw);
        };

        video.onloadeddata = () => { requestAnimationFrame(draw); };
        if (video.readyState >= 2) requestAnimationFrame(draw);
        this.stopDrawLoop = () => { running = false; };
    }

    /** Create WebRTC peer connection with video/audio/data channels */
    createPeerConnection(peerId) {
        const role = this.owner ? "HOST" : "GUEST";
        let iceServers = null;

        // Get ICE servers from config
        if (this.emu.config && this.emu.config.netplayICEServers && this.emu.config.netplayICEServers.length > 0) {
            iceServers = this.emu.config.netplayICEServers;
        } else if (window.EJS_netplayICEServers && window.EJS_netplayICEServers.length > 0) {
            iceServers = window.EJS_netplayICEServers;
        } else if (this.iceServers && this.iceServers.length > 0) {
            iceServers = this.iceServers;
        } else {
            iceServers = [];
        }

        const pc = new RTCPeerConnection({ iceServers: iceServers, iceCandidatePoolSize: 10 });
        let usingRelay = false;
        let bitrateAdjusted = false;

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                if (e.candidate.type === "relay") usingRelay = true;
                this.socket.emit("webrtc-signal", { target: peerId, candidate: e.candidate });
            }
        };

        pc.oniceconnectionstatechange = () => {
            if (this.owner && pc.iceConnectionState === "connected" && !bitrateAdjusted) {
                bitrateAdjusted = true;
                this.adjustVideoBitrate(pc, usingRelay);
            }
        };

        // Set up data channel for inputs
        let dc;
        if (this.owner) {
            dc = pc.createDataChannel("inputs");
            dc.onmessage = (e) => {
                const d = JSON.parse(e.data);
                if (d.type === "host-left") {
                    this.emu.displayMessage("Host left", 3000);
                    this.leaveRoom();
                    return;
                }
                const f = this.currentFrame || 0;
                this.inputsData[f] = this.inputsData[f] || [];
                this.inputsData[f].push({ frame: f, connected_input: [d.player, d.index, d.value] });
                if (this.emu.gameManager && this.emu.gameManager.functions && this.emu.gameManager.functions.simulateInput) {
                    this.emu.gameManager.functions.simulateInput(d.player, d.index, d.value);
                }
            };
        } else {
            pc.ondatachannel = (e) => {
                dc = e.channel;
                if (this.peerConnections[peerId]) this.peerConnections[peerId].dataChannel = dc;
                dc.onmessage = (e) => {
                    const d = JSON.parse(e.data);
                    if (d.type === "host-left") {
                        this.emu.displayMessage("Host left", 3000);
                        this.leaveRoom();
                    }
                };
            };
        }

        // Add media tracks (host sends, guest receives)
        if (this.owner && this.localStream) {
            this.localStream.getTracks().forEach((t) => {
                pc.addTrack(t, this.localStream);
                console.log("[NETPLAY HOST] Added", t.kind, "track to peer connection, enabled:", t.enabled, "readyState:", t.readyState);
            });

            this._preferH264(pc);

            try {
                const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
                if (sender) {
                    const p = sender.getParameters();
                    p.degradationPreference = "maintain-framerate";
                    if (!p.encodings || !p.encodings.length) p.encodings = [{}];
                    p.encodings[0].maxBitrate = 1200000;
                    p.encodings[0].maxFramerate = 30;
                    sender.setParameters(p).catch(() => {});
                }
            } catch (e) {}
        } else {
            pc.addTransceiver("video", { direction: "recvonly" });
            pc.addTransceiver("audio", { direction: "recvonly" });
        }

        // Store peer connection entry - always include iceCandidateQueue
        this.peerConnections[peerId] = {
            pc: pc,
            dataChannel: dc,
            usingRelay: false,
            iceCandidateQueue: (this.peerConnections[peerId] && this.peerConnections[peerId].iceCandidateQueue)
                ? this.peerConnections[peerId].iceCandidateQueue
                : []
        };

        let gotStream = false;

        const streamTimeout = setTimeout(() => {
            if (!gotStream && !this.owner) this.requestRenegotiate(peerId, "stream-timeout");
        }, 15000);

        // Handle connection state changes
        pc.onconnectionstatechange = () => {
            if (pc.connectionState === "connected") {
                this.webRtcReady = true;
                clearTimeout(this.connectionTimeout);
                if (this.peerConnections[peerId]) this.peerConnections[peerId].usingRelay = usingRelay;
                if (this._dcTimer) { clearTimeout(this._dcTimer); this._dcTimer = null; }
                return;
            }

            if (!this.owner) {
                if (pc.connectionState === "failed") {
                    this.requestRenegotiate(peerId, "pc-failed");
                }
                if (pc.connectionState === "disconnected") {
                    if (this._dcTimer) clearTimeout(this._dcTimer);
                    this._dcTimer = setTimeout(() => {
                        if (!this.emu.isNetplay) return;
                        const pd = this.peerConnections[peerId];
                        if (!pd || !pd.pc) return;
                        if (pd.pc.connectionState === "disconnected") {
                            this.requestRenegotiate(peerId, "pc-disconnected");
                        }
                    }, 2500);
                }
            } else {
                if (pc.connectionState === "failed") {
                    try { pc.close(); } catch (e) {}
                    delete this.peerConnections[peerId];
                    setTimeout(() => { this.createPeerConnection(peerId); }, 1500);
                }
            }
        };

        // Handle incoming media tracks (guest only)
        pc.ontrack = (e) => {
            if (this.owner) return;
            const t = e.track;

            if (t.kind === "audio") {
                console.log("[NETPLAY GUEST] Audio track received, readyState:", t.readyState);
                try {
                    const stream = (e.streams && e.streams[0]) ? e.streams[0] : new MediaStream([t]);

                    // Method 1: HTML audio element (most reliable for autoplay)
                    const audioEl = this.ensureRemoteAudioElement(peerId);
                    audioEl.srcObject = stream;
                    audioEl.volume = 1.0;
                    const p = audioEl.play();
                    if (p && p.then) {
                        p.then(() => {
                            console.log("[NETPLAY GUEST] Audio element playing");
                        }).catch(() => {
                            console.warn("[NETPLAY GUEST] Audio element play blocked, arming unlock");
                            this.armGuestAudioUnlock();
                        });
                    }

                    // Method 2: Dedicated AudioContext with amplification
                    this._routeRemoteAudio(peerId, stream);
                } catch (err) {
                    console.error("[NETPLAY GUEST] Audio setup error:", err);
                }
                return;
            }

            if (t.kind === "video") {
                gotStream = true;
                this._gotVideoEver = true;
                clearTimeout(streamTimeout);
                clearTimeout(this.connectionTimeout);
                this.webRtcReady = true;

                if (!this.video) {
                    this.video = document.createElement("video");
                    this.video.muted = true;
                    this.video.autoplay = true;
                    this.video.playsInline = true;
                    this.video.style.display = "none";
                }
                this.video.srcObject = (e.streams && e.streams[0]) ? e.streams[0] : new MediaStream([t]);
                this.monitorVideoFrames(t);
                this.video.play().catch(() => {});
                this.drawVideoToCanvas();

                t.onended = () => { if (this.emu.isNetplay) this.requestRenegotiate(peerId, "video-track-ended"); };
            }
        };

        // Host initiates offer
        if (this.owner && this.localStream) {
            pc.createOffer()
                .then((o) => pc.setLocalDescription(o))
                .then(() => { this.socket.emit("webrtc-signal", { target: peerId, offer: pc.localDescription }); })
                .catch(() => {});
        }

        return pc;
    }

    /** Adjust video bitrate based on connection type (relay vs direct) */
    adjustVideoBitrate(pc, usingRelay) {
        if (!this.owner) return;
        try {
            const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
            if (!sender) return;

            const p = sender.getParameters();
            if (!p.encodings || !p.encodings.length) p.encodings = [{}];

            p.degradationPreference = "maintain-framerate";
            p.encodings[0].maxFramerate = 30;

            if (usingRelay) {
                p.encodings[0].maxBitrate = 900000;   // Conservative for relay
            } else {
                p.encodings[0].maxBitrate = 2000000;  // Higher for direct
            }

            sender.setParameters(p).catch(() => {});
        } catch (e) {}
    }
    
    /** Prefer H264 codec for hardware encoding (better performance) */
    _preferH264(pc) {
        try {
            if (!window.RTCRtpSender || !RTCRtpSender.getCapabilities) return;
            const caps = RTCRtpSender.getCapabilities("video");
            if (!caps || !caps.codecs) return;

            const h264 = caps.codecs.filter(c => (c.mimeType || "").toLowerCase() === "video/h264");
            if (!h264.length) return;

            const trans = pc.getTransceivers().find(t => t && t.sender && t.sender.track && t.sender.track.kind === "video");
            if (trans && trans.setCodecPreferences) {
                const rest = caps.codecs.filter(c => (c.mimeType || "").toLowerCase() !== "video/h264");
                trans.setCodecPreferences([...h264, ...rest]);
            }
        } catch (e) {}
    }

    /** Monitor video frames for stall detection */
    monitorVideoFrames(track) {
        if (!track || typeof track.getSettings !== "function") return;
        let noFrameCount = 0;
        const checkFrames = () => {
            if (!this.emu.isNetplay || this.owner) return;
            try {
                if (this.video && this.video.readyState >= 2) {
                    const currentTime = this.video.currentTime;
                    if (this._lastVideoTime !== undefined) {
                        if (currentTime === this._lastVideoTime) {
                            noFrameCount++;
                            if (noFrameCount >= 10) noFrameCount = 0;
                        } else {
                            noFrameCount = 0;
                        }
                    }
                    this._lastVideoTime = currentTime;
                }
            } catch (e) {}
            if (this.emu.isNetplay && !this.owner) setTimeout(checkFrames, 200);
        };
        setTimeout(checkFrames, 1000);
    }

    /** Append message to chat log */
    chatAppend(payload) {
        if (!this.chatLog) return;
        const name = payload && payload.player_name ? payload.player_name : "Player";
        const msg = payload && payload.message ? payload.message : "";
        const to = payload && payload.to ? payload.to : "all";
        const line = document.createElement("div");
        if (to && to !== "all") {
            line.textContent = name + " (private): " + msg;
            line.style.opacity = "0.95";
        } else {
            line.textContent = name + ": " + msg;
        }
        this.chatLog.appendChild(line);
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
    }

    /** Refresh chat recipient dropdown with current players */
    chatRefreshRecipients() {
        if (!this.chatTo) return;
        const sel = this.chatTo;
        const prev = sel.value || "all";
        sel.innerHTML = "";
        const optAll = document.createElement("option");
        optAll.value = "all";
        optAll.innerText = this.emu.localization("Everyone");
        sel.appendChild(optAll);
        const players = this.players || {};
        Object.keys(players).forEach((userid) => {
            const p = players[userid];
            const opt = document.createElement("option");
            opt.value = userid;
            opt.innerText = p.player_name || "Player";
            sel.appendChild(opt);
        });
        const stillExists = Array.from(sel.options).some((o) => o.value === prev);
        sel.value = stillExists ? prev : "all";
    }

    /** Send chat message to selected recipient(s) */
    chatSendMessage() {
        if (!this.socket || !this.socket.connected || !this.chatInput || !this.chatTo) return;
        const message = String(this.chatInput.value || "").trim();
        if (!message) return;
        const to = this.chatTo.value || "all";
        this.chatInput.value = "";
        const chatPayload = { player_name: this.name || "Player", message, to, from: this.playerID };
        this.chatAppend(chatPayload);
        this.sendMessage({ "chat-message": chatPayload });
    }

    /** Bind event listeners to chat UI elements */
    bindChatUI() {
        if (this._chatBound) return;
        if (!this._chatSend || !this._chatInput) return;
        this._chatBound = true;
        this.emu.addEventListener(this._chatSend, "click", () => { this.chatSendMessage(); });
        this.emu.addEventListener(this._chatInput, "keydown", (e) => {
            if (e.key === "Enter") { e.preventDefault(); this.chatSendMessage(); }
        });
    }

    /** Clean up and leave the current room */
    leaveRoom() {
        // Restore module hooks
        if (this._prevPostMainLoop || this._origPostMainLoop) {
            const Module = (this.emu.gameManager && this.emu.gameManager.Module) ? this.emu.gameManager.Module : this.emu.Module;
            if (Module) Module.postMainLoop = this._origPostMainLoop || null;
            this._prevPostMainLoop = null;
            this._origPostMainLoop = null;
        }
        this._copyFrameToCapture = null;

        this._captureLoopRunning = false;
        this._captureCtx = null;
        this.captureCanvas = null;

        if (this._leaving) return;
        this._leaving = true;

        this.updateNetplayUI(false);
        clearTimeout(this.connectionTimeout);
        if (this.stopDrawLoop) this.stopDrawLoop();

        this.captureRunning = false;

        // Stop local stream
        if (this.localStream) {
            try { this.localStream.getTracks().forEach((tr) => tr.stop()); } catch (e) {}
            this.localStream = null;
        }

        // Clean up host audio capture
        if (this._hostAudioBoostGain) {
            try { this._hostAudioBoostGain.disconnect(); } catch (e) {}
            this._hostAudioBoostGain = null;
        }
        if (this._hostAudioSourceNode) {
            try { this._hostAudioSourceNode.disconnect(); } catch (e) {}
            this._hostAudioSourceNode = null;
        }
        if (this._hostAudioDest) {
            this._hostAudioDest = null;
        }

        // Remove netplay canvas
        if (this.emu.netplayCanvas && this.emu.netplayCanvas.parentNode) {
            try { this.emu.netplayCanvas.parentNode.removeChild(this.emu.netplayCanvas); } catch (e) {}
        }
        this.emu.netplayCanvas = null;

        // Show original emulator canvas
        if (this.emu.canvas) {
            this.emu.canvas.classList.remove("ejs_netplay_offscreen_canvas");
        }

        if (!this.owner) {
            this.unfreezeGuest();
        }

        // Restore parent position
        if (this._restoreParentPosition !== undefined && this._restoreParentPosition !== null) {
            try {
                const parent = this.emu.elements.parent;
                if (parent) parent.style.position = this._restoreParentPosition;
            } catch (e) {}
            this._restoreParentPosition = null;
        }

        // Clean up remote audio elements
        try {
            const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
            els.forEach((a) => {
                try { a.pause(); a.srcObject = null; a.remove(); } catch (e) {}
            });
        } catch (e) {}
        if (this.remoteAudioElements) this.remoteAudioElements = {};
        if (this._audioUnlockCleanup) { try { this._audioUnlockCleanup(); } catch (e) {} this._audioUnlockCleanup = null; }
        this._audioUnlockArmed = false;

        // Clean up dedicated remote audio context
        if (this._remoteAudioSource) { try { this._remoteAudioSource.disconnect(); } catch (e) {} this._remoteAudioSource = null; }
        if (this._remoteAudioGain) { try { this._remoteAudioGain.disconnect(); } catch (e) {} this._remoteAudioGain = null; }
        if (this._remoteAudioCtx) { try { this._remoteAudioCtx.close(); } catch (e) {} this._remoteAudioCtx = null; }

        // Notify peers if host
        if (this.owner && this.sendMessage) {
            try { this.sendMessage({ type: "host-left" }); } catch (e) {}
        }

        // Disconnect socket
        if (this.socket) {
            try {
                if (this.socket.connected) this.socket.emit("leave-room");
                this.socket.disconnect();
            } catch (e) {}
            this.socket = null;
        }

        // Close peer connections
        const pcs = this.peerConnections || {};
        for (const key in pcs) {
            if (pcs[key] && pcs[key].pc) { try { pcs[key].pc.close(); } catch (e) {} }
        }
        this.peerConnections = {};

        if (this.video) {
            try { this.video.srcObject = null; } catch (e) {}
            this.video = null;
        }

        // Reset UI
        if (this.createButton) this.createButton.innerText = this.emu.localization("Create Room");
        if (this.tabs) {
            this.tabs[0].style.display = "";
            this.tabs[1].style.display = "none";
        }
        if (this.roomNameElem) this.roomNameElem.innerText = "";
        if (this.passwordElem) this.passwordElem.style.display = "none";
        if (this.playerTable) this.playerTable.innerHTML = "";

        if (this.emu.elements.bottomBar && this.emu.elements.bottomBar.cheat && this.emu.elements.bottomBar.cheat[0]) {
            this.emu.elements.bottomBar.cheat[0].style.display = this.oldCheatDisplay || "";
        }

        // Restore original input handler
        if (this.originalSimulateInput && this.emu.gameManager && this.emu.gameManager.functions) {
            this.emu.gameManager.functions.simulateInput = this.originalSimulateInput;
        }

        // Reset state
        this.emu.isNetplay = false;
        this.owner = false;
        this.players = {};
        this.playerID = null;
        this.webRtcReady = false;

        if (this.emu.originalControls) {
            this.emu.controls = JSON.parse(JSON.stringify(this.emu.originalControls));
            this.emu.originalControls = null;
        }

        setTimeout(() => { if (this.emu.handleResize) this.emu.handleResize(); }, 100);
        this.emu.displayMessage("Left room", 3000);
        this._leaving = false;
    }

    /** Process and send input to network */
    simulateInput(player, index, value) {
        if (!this.emu.isNetplay || !this.emu.gameManager || !this.emu.gameManager.functions || !this.emu.gameManager.functions.simulateInput) return;
        const pidx = this.getUserIndex();
        const f = this.currentFrame || 0;
        if (this.owner) {
            this.inputsData[f] = this.inputsData[f] || [];
            this.inputsData[f].push({ frame: f, connected_input: [pidx, index, value] });
            this.emu.gameManager.functions.simulateInput(pidx, index, value);
        } else {
            this.emu.gameManager.functions.simulateInput(pidx, index, value);
            this.sendMessage({ "sync-control": [{ frame: f + 20, connected_input: [pidx, index, value] }] });
        }
    }

    /** Fetch available rooms from server */
    getOpenRooms() {
        if (!this.url) return Promise.resolve({});
        return fetch(this.url + "/list?domain=" + window.location.host + "&game_id=" + this.emu.config.gameId)
            .then((res) => res.text())
            .then((text) => JSON.parse(text))
            .catch(() => ({}));
    }

    /** Update room list table */
    updateTableList() {
        if (!this.table) return Promise.resolve();
        return this.getOpenRooms().then((rooms) => {
            this.table.innerHTML = "";
            for (const k in rooms) {
                ((id, r) => {
                    const row = this.emu.createElement("tr");
                    row.classList.add("ejs_netplay_table_row");
                    const c1 = this.emu.createElement("td");
                    c1.innerText = r.room_name; c1.style.textAlign = "left"; c1.style.padding = "10px 0";
                    const c2 = this.emu.createElement("td");
                    c2.innerText = r.current + "/" + r.max; c2.style.width = "80px"; c2.style.textAlign = "center";
                    const c3 = this.emu.createElement("td");
                    c3.style.width = "80px";
                    if (r.current < r.max) {
                        const btn = this.emu.createElement("button");
                        btn.classList.add("ejs_netplay_join_button", "ejs_button_button");
                        btn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                        btn.innerText = this.emu.localization("Join");
                        c3.appendChild(btn);
                        this.emu.addEventListener(btn, "click", () => {
                            // Pre-create AudioContext during this user gesture
                            this._ensureRemoteAudioContext();
                            if (r.hasPassword) this.showJoinPasswordDialog(id, r.room_name, r.max);
                            else this.joinRoom(id, r.room_name, r.max, null);
                        });
                    }
                    row.appendChild(c1); row.appendChild(c2); row.appendChild(c3);
                    this.table.appendChild(row);
                })(k, rooms[k]);
            }
        }).catch(() => {});
    }

    _updateListStart() { this.updateListInterval = setInterval(() => { this.updateTableList(); }, 1000); }
    _updateListStop() { clearInterval(this.updateListInterval); }

    /** Show dialog to create a new room */
    showOpenRoomDialog() {
        if (!this.emu.createSubPopup) return;
        this.emu.originalControls = JSON.parse(JSON.stringify(this.emu.controls));
        const popups = this.emu.createSubPopup();
        this._menuElement.appendChild(popups[0]);
        popups[1].classList.add("ejs_cheat_parent");
        const title = this.emu.createElement("h2");
        title.innerText = this.emu.localization("Create a room");
        title.classList.add("ejs_netplay_name_heading");
        popups[1].appendChild(title);
        const form = this.emu.createElement("div");
        form.classList.add("ejs_netplay_header");
        const ni = this.emu.createElement("input"); ni.type = "text"; ni.maxLength = 20;
        const ms = this.emu.createElement("select");
        ["2", "3", "4"].forEach((v) => { const o = document.createElement("option"); o.value = v; o.innerText = v; ms.appendChild(o); });
        const pw = this.emu.createElement("input"); pw.type = "text"; pw.maxLength = 20;
        [["Room Name", ni], ["Max Players", ms], ["Password (optional)", pw]].forEach((item) => {
            const s = this.emu.createElement("strong");
            s.innerText = this.emu.localization(item[0]);
            form.appendChild(s); form.appendChild(this.emu.createElement("br")); form.appendChild(item[1]);
        });
        popups[1].appendChild(form);
        const sub = this.emu.createElement("button");
        sub.classList.add("ejs_button_button", "ejs_popup_submit");
        sub.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
        sub.style.margin = "10px";
        sub.innerText = this.emu.localization("Submit");
        this.emu.addEventListener(sub, "click", () => {
            const n = ni.value.trim();
            if (n) { this.openRoom(n, parseInt(ms.value, 10), pw.value.trim()); popups[0].remove(); }
        });
        const cls = this.emu.createElement("button");
        cls.classList.add("ejs_button_button", "ejs_popup_submit");
        cls.style.margin = "10px";
        cls.innerText = this.emu.localization("Close");
        this.emu.addEventListener(cls, "click", () => { popups[0].remove(); });
        popups[1].appendChild(sub); popups[1].appendChild(cls);
    }

    /** Show password dialog for protected rooms */
    showJoinPasswordDialog(roomId, roomName, maxPlayers) {
        if (!this.emu.createSubPopup) return;
        const popups = this.emu.createSubPopup();
        this._menuElement.appendChild(popups[0]);
        popups[1].classList.add("ejs_cheat_parent");
        const title = this.emu.createElement("h2");
        title.innerText = this.emu.localization("Enter Password");
        title.classList.add("ejs_netplay_name_heading");
        popups[1].appendChild(title);
        const form = this.emu.createElement("div");
        form.classList.add("ejs_netplay_header");
        const roomLabel = this.emu.createElement("div");
        roomLabel.classList.add("ejs_netplay_dialog_label");
        roomLabel.innerText = this.emu.localization("Room") + ": " + roomName;
        form.appendChild(roomLabel);
        const pwLabel = this.emu.createElement("strong");
        pwLabel.innerText = this.emu.localization("Password");
        form.appendChild(pwLabel); form.appendChild(this.emu.createElement("br"));
        const pwInput = this.emu.createElement("input");
        pwInput.type = "password"; pwInput.maxLength = 20; pwInput.placeholder = this.emu.localization("Enter room password");
        form.appendChild(pwInput);
        popups[1].appendChild(form);
        const buttonRow = this.emu.createElement("div");
        buttonRow.classList.add("ejs_netplay_dialog_buttons");
        const joinBtn = this.emu.createElement("button");
        joinBtn.classList.add("ejs_button_button", "ejs_popup_submit");
        joinBtn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
        joinBtn.innerText = this.emu.localization("Join");
        const cancelBtn = this.emu.createElement("button");
        cancelBtn.classList.add("ejs_button_button", "ejs_popup_submit");
        cancelBtn.innerText = this.emu.localization("Cancel");

        this.emu.addEventListener(joinBtn, "click", () => {
            // Pre-create AudioContext during this user gesture
            this._ensureRemoteAudioContext();
            const pw = pwInput.value.trim();
            popups[0].remove();
            if (pw) this.joinRoom(roomId, roomName, maxPlayers, pw);
        });
        this.emu.addEventListener(cancelBtn, "click", () => { popups[0].remove(); });
        this.emu.addEventListener(pwInput, "keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                // Pre-create AudioContext during this user gesture
                this._ensureRemoteAudioContext();
                const pw = pwInput.value.trim();
                popups[0].remove();
                if (pw) this.joinRoom(roomId, roomName, maxPlayers, pw);
            }
            if (e.key === "Escape") popups[0].remove();
        });
        buttonRow.appendChild(joinBtn); buttonRow.appendChild(cancelBtn); popups[1].appendChild(buttonRow);
        setTimeout(() => pwInput.focus(), 50);
    }

    /** Show error dialog when join fails */
    showJoinErrorDialog(roomId, roomName, maxPlayers, errorMessage, hadPassword) {
        if (!this.emu.createSubPopup) {
            this.emu.displayMessage(this.emu.localization("Join error") + ": " + errorMessage, 5000);
            return;
        }
        const popups = this.emu.createSubPopup();
        this._menuElement.appendChild(popups[0]);
        popups[1].classList.add("ejs_cheat_parent");
        const title = this.emu.createElement("h2");
        title.innerText = this.emu.localization("Unable to Join");
        title.classList.add("ejs_netplay_name_heading");
        popups[1].appendChild(title);
        const content = this.emu.createElement("div");
        content.classList.add("ejs_netplay_header");
        const roomLabel = this.emu.createElement("div");
        roomLabel.classList.add("ejs_netplay_dialog_label");
        roomLabel.innerText = this.emu.localization("Room") + ": " + roomName;
        content.appendChild(roomLabel);
        const errorBox = this.emu.createElement("div");
        errorBox.classList.add("ejs_netplay_error_box");
        errorBox.innerText = errorMessage;
        content.appendChild(errorBox);
        popups[1].appendChild(content);
        const buttonRow = this.emu.createElement("div");
        buttonRow.classList.add("ejs_netplay_dialog_buttons");

        if (hadPassword) {
            const retryBtn = this.emu.createElement("button");
            retryBtn.classList.add("ejs_button_button", "ejs_popup_submit");
            retryBtn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
            retryBtn.innerText = this.emu.localization("Try Again");
            this.emu.addEventListener(retryBtn, "click", () => {
                popups[0].remove();
                this.showJoinPasswordDialog(roomId, roomName, maxPlayers);
            });
            buttonRow.appendChild(retryBtn);
        }

        const closeBtn = this.emu.createElement("button");
        closeBtn.classList.add("ejs_button_button", "ejs_popup_submit");
        closeBtn.innerText = this.emu.localization("Close");
        this.emu.addEventListener(closeBtn, "click", () => { popups[0].remove(); });
        buttonRow.appendChild(closeBtn);
        popups[1].appendChild(buttonRow);
    }

    /** Initialize Socket.IO connection and set up event handlers */
    startSocketIO(cb) {
        this._unlockMobileAudio();
        if (typeof io === "undefined") { this.emu.displayMessage("Socket.IO unavailable", 5000); return; }
        if (this.socket && this.socket.connected) { cb(); return; }
        if (!this.url) { this.emu.displayMessage("Network error", 5000); return; }

        this.previousPlayers = {};
        this.socket = io(this.url);

        this.socket.on("connect", () => { this.bindChatUI(); cb(); });
        this.socket.on("connect_error", (e) => { this.emu.displayMessage("Connect error: " + e.message, 5000); });
        this.socket.on("disconnect", () => { this.leaveRoom(); });

        // Handle player list updates
        this.socket.on("users-updated", (users) => {
            const pv = Object.keys(this.previousPlayers || {});
            const cu = Object.keys(users || {});
            cu.forEach((id) => {
                if (pv.indexOf(id) === -1 && id !== this.playerID) {
                    this.emu.displayMessage((users[id].player_name || "Player") + " joined");
                }
            });
            pv.forEach((id) => {
                if (cu.indexOf(id) === -1) {
                    this.emu.displayMessage((this.previousPlayers[id].player_name || "Player") + " left");
                }
            });

            this.previousPlayers = users;
            this.players = users;
            this.updatePlayersTable();
            this.chatRefreshRecipients();

            // Host creates peer connections for new players
            if (this.owner) {
                this.initWebRTCStream().then(() => {
                    Object.keys(users).forEach((pid) => {
                        if (pid !== this.playerID) {
                            const sid = users[pid].socketId;
                            if (sid && !this.peerConnections[sid]) this.createPeerConnection(sid);
                        }
                    });
                });
            }
        });

        this.socket.on("data-message", (d) => { this.dataMessage(d); });
        
        // Handle WebRTC signaling
        this.socket.on("webrtc-signal", (data) => {
            const sender = data.sender;
            const offer = data.offer;
            const answer = data.answer;
            const candidate = data.candidate;
            const requestRenegotiate = data.requestRenegotiate;

            if (requestRenegotiate && this.owner && sender) {
                try {
                    if (this.peerConnections[sender] && this.peerConnections[sender].pc) this.peerConnections[sender].pc.close();
                } catch (e) {}
                delete this.peerConnections[sender];
                this.initWebRTCStream().then(() => { this.createPeerConnection(sender); });
                return;
            }

            if (!sender) return;

            let pd = this.peerConnections[sender];
            
            if (offer) {
                if (pd && !this.owner) {
                    try { pd.pc.close(); } catch(e) {}
                    delete this.peerConnections[sender];
                    pd = null;
                }
                if (!pd) {
                    this.createPeerConnection(sender);
                    pd = this.peerConnections[sender];
                }
            } else if (!pd) {
                this.createPeerConnection(sender);
                pd = this.peerConnections[sender];
            }
            
            // Safety: ensure pd and iceCandidateQueue exist
            if (!pd) {
                pd = { pc: null, dataChannel: null, usingRelay: false, iceCandidateQueue: [] };
                this.peerConnections[sender] = pd;
            }
            if (!pd.iceCandidateQueue) {
                pd.iceCandidateQueue = [];
            }

            const pc = pd.pc;
            if (!pc) return;

            if (offer) {
                pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                    if (pd.iceCandidateQueue && pd.iceCandidateQueue.length > 0) {
                        pd.iceCandidateQueue.forEach((c) => { pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}); });
                        pd.iceCandidateQueue = [];
                    }
                    return pc.createAnswer();
                }).then((ans) => pc.setLocalDescription(ans))
                .then(() => { this.socket.emit("webrtc-signal", { target: sender, answer: pc.localDescription }); })
                .catch(() => {});
            } else if (answer) {
                pc.setRemoteDescription(new RTCSessionDescription(answer)).then(() => {
                    if (pd.iceCandidateQueue && pd.iceCandidateQueue.length > 0) {
                        pd.iceCandidateQueue.forEach((c) => { pc.addIceCandidate(new RTCIceCandidate(c)).catch(() => {}); });
                        pd.iceCandidateQueue = [];
                    }
                }).catch(() => {});
            } else if (candidate) {
                if (pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(e => {
                        if (this.emu.debug) console.warn("Ignored ICE candidate error:", e.message);
                    });
                } else {
                    pd.iceCandidateQueue.push(candidate);
                }
            }
        });
    }

    /** Refresh player table UI */
    updatePlayersTable() {
        if (!this.playerTable) return;
        this.playerTable.innerHTML = "";
        let i = 0;
        const keys = Object.keys(this.players || {});
        keys.forEach((k) => {
            const row = this.emu.createElement("tr");
            const values = [i + 1, this.players[k].player_name || "Unknown", i === 0 ? keys.length + "/" + (this.maxPlayers || "?") : ""];
            values.forEach((t) => {
                const td = this.emu.createElement("td");
                td.innerText = t;
                row.appendChild(td);
            });
            this.playerTable.appendChild(row);
            i++;
        });
        this.chatRefreshRecipients();
    }

    /** Create and host a new room */
    openRoom(rn, mp, pw) {
        this._unlockMobileAudio();
        if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
        }

        const sid = this._guid();
        this.playerID = this._guid();
        this.players = {};
        this.maxPlayers = mp;
        this.extra = {
            domain: window.location.host,
            game_id: this.emu.config.gameId,
            room_name: rn,
            player_name: this.name,
            userid: this.playerID,
            sessionid: sid
        };
        this.players[this.playerID] = this.extra;
        this.owner = true;

        this.startSocketIO(() => {
            this.socket.emit("open-room", { extra: this.extra, maxPlayers: mp, password: pw }, (e) => {
                if (e) { this.emu.displayMessage("Room error: " + e, 5000); return; }
                this.roomJoined(true, rn, pw, sid);
            });
        });
    }

    /** Join an existing room */
    joinRoom(sid, rn, mp, pw) {
        this._unlockMobileAudio();
        // Also ensure AudioContext is ready (belt and suspenders)
        this._ensureRemoteAudioContext();
        
        this.playerID = this._guid();
        this.players = {};
        this.maxPlayers = mp;
        this.extra = {
            domain: window.location.host,
            game_id: this.emu.config.gameId,
            room_name: rn,
            player_name: this.name,
            userid: this.playerID,
            sessionid: sid
        };
        this.players[this.playerID] = this.extra;
        this.owner = false;

        this.startSocketIO(() => {
            this.socket.emit("join-room", { extra: this.extra, password: pw }, (e, u) => {
                if (e) { this.showJoinErrorDialog(sid, rn, mp, e, !!pw); return; }
                this.players = u;
                this.roomJoined(false, rn, pw, sid);
            });
        });
    }

    /** Handle incoming data messages (chat, inputs, game state) */
    dataMessage(d) {
        if (d.pause) this.emu.pause(true);
        if (d.play) this.emu.play(true);
        if (d.restart) this.emu.gameManager.restart();
        
        if (d["chat-message"]) {
            const chat = d["chat-message"];
            const to = chat.to || "all";
            const from = chat.from || "";
            if (to !== "all" && to !== this.playerID) return;
            if (from === this.playerID) return;
            this.chatAppend(chat);
            try {
                const name = chat.player_name || "Player";
                const msg = chat.message || "";
                const typing = this.chatInput && document.activeElement === this.chatInput;
                if (!typing && this.emu.displayMessage) {
                    const prefix = (to !== "all") ? "(private) " : "";
                    this.emu.displayMessage(prefix + name + ": " + msg, 4500);
                }
            } catch (e) {}
            return;
        }

        // Handle input sync messages
        if (d["sync-control"]) {
            d["sync-control"].forEach((v) => {
                const f = parseInt(v.frame, 10);
                if (!v.connected_input || v.connected_input[0] < 0) return;
                this.inputsData[f] = this.inputsData[f] || [];
                this.inputsData[f].push(v);
                this.sendMessage({ frameAck: f });
                if (this.owner && this.emu.gameManager && this.emu.gameManager.functions && this.emu.gameManager.functions.simulateInput) {
                    this.emu.gameManager.functions.simulateInput(v.connected_input[0], v.connected_input[1], v.connected_input[2]);
                }
            });
        }
    }

    /** Send data message via socket */
    sendMessage(d) {
        if (this.socket && this.socket.connected) {
            this.socket.emit("data-message", d);
        }
    }

    /** Reset frame counters and input data */
    reset() {
        this.init_frame = this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0;
        this.currentFrame = 0;
        this.inputsData = {};
    }

    /** Post-frame hook for input synchronization (host only) */
    _initModulePostMainLoop() {
        if (this._origPostMainLoop) {
            try { this._origPostMainLoop(); } catch (e) {}
        }

        if (this.emu.isNetplay && !this.owner) return;
        this.currentFrame = (this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0) - (this.init_frame || 0);
        if (!this.emu.isNetplay || !this.owner) return;
        
        // Process and broadcast inputs for current frame
        const i = this.currentFrame;
        if (this.inputsData[i]) {
            const ts = this.inputsData[i].map((v) => {
                if (this.emu.gameManager && this.emu.gameManager.functions && this.emu.gameManager.functions.simulateInput) {
                    this.emu.gameManager.functions.simulateInput(v.connected_input[0], v.connected_input[1], v.connected_input[2]);
                }
                return { frame: i + 20, connected_input: v.connected_input };
            });
            this.sendMessage({ "sync-control": ts });
            delete this.inputsData[i];
        }
    }
}

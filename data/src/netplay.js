/**
 * Netplay module for EmulatorJS
 * Handles peer-to-peer multiplayer functionality
 */
export class Netplay {
    constructor(emu) {
        if (!emu) throw new Error("Netplay requires an EmulatorJS instance");
        this.emu = emu;

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
        this.inputs = {};
        this.inputsData = {};
        this.init_frame = 0;
        this.currentFrame = 0;
        this.webRtcReady = false;
        this.video = null;
        this.frozen = null;
        this.previousPlayers = {};
        this.captureCanvas = null;
        this.captureRunning = false;
        this.remoteAudioElements = {};
        this.remoteAudioContext = null;
        this.remoteGainNode = null;
        this._overlay = null;
        this._overlaySync = null;
        this._vvSync = null;
        this._fsSync = null;
        this._overlayRO = null;
        this._hostRawStream = null;
        this._hostOutStream = null;
        this._hostSourceVideo = null;
        this._restoreParentPosition = null;
        this._uiZBoosted = null;
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

        this.url = this.emu.config.netplayUrl || window.EJS_netplayUrl || null;
        if (this.url) {
            while (this.url.endsWith("/")) this.url = this.url.slice(0, -1);
        }
    }

    // --- UI ---

    updateNetplayUI(isJoining) {
        if (!this.emu.elements.bottomBar) return;

        const bar = this.emu.elements.bottomBar;
        const shouldHide = isJoining && !this.owner;
        const elems = [
            ...(bar.playPause || []),
            ...(bar.restart || []),
            ...(bar.saveState || []),
            ...(bar.loadState || []),
            ...(bar.cheat || []),
            ...(bar.saveSavFiles || []),
            ...(bar.loadSavFiles || []),
            ...(bar.exit || []),
            ...(bar.contextMenu || []),
            ...(bar.cacheManager || [])
        ];

        if (bar.settings && bar.settings.length > 0 && bar.settings[0].parentElement) {
            elems.push(bar.settings[0].parentElement);
        }
        if (this.emu.diskParent) elems.push(this.emu.diskParent);

        elems.forEach((el) => {
            if (el) el.classList.toggle("netplay-hidden", shouldHide);
        });
    }

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

    // --- Core ---

    defineNetplayFunctions() {
        this.updateList = {
            start: () => this._updateListStart(),
            stop: () => this._updateListStop()
        };

        if (!this.url) {
            this.emu.displayMessage("Netplay URL not configured", 5000);
            return;
        }

        const Module = (this.emu.gameManager && this.emu.gameManager.Module)
            ? this.emu.gameManager.Module
            : this.emu.Module;

        if (Module) {
            // Save the original postMainLoop so initWebRTCStream can chain it
            this._origPostMainLoop = Module.postMainLoop || null;
            Module.postMainLoop = () => this._initModulePostMainLoop();
        }
    }

    // --- Utility ---

    _guid() {
        const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
    }

    _log(role, ...args) {
        if (this.emu.debug) console.log("[NETPLAY " + role + "]", ...args);
    }

    getNativeResolution() {
        try {
            if (this.emu.Module && this.emu.Module.getNativeResolution) {
                return this.emu.Module.getNativeResolution();
            }
        } catch (e) {}
        return { width: 640, height: 480 };
    }

    getUserIndex() {
        if (!this.emu.isNetplay || !this.players || !this.playerID) return 0;
        const idx = Object.keys(this.players).indexOf(this.playerID);
        return idx === -1 ? 0 : idx;
    }

    // --- Audio ---

    _unlockMobileAudio() {
        const ctx = this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx;
        if (!ctx) return;

        try {
            if (ctx.state !== "running") ctx.resume().catch(() => {});
        } catch (e) {}

        try {
            const b = ctx.createBuffer(1, 1, ctx.sampleRate);
            const s = ctx.createBufferSource();
            s.buffer = b;
            s.connect(ctx.destination);
            s.start(0);
            s.stop(0);
        } catch (e) {}
    }

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
        el.volume = this.emu.muted ? 0 : (typeof this.emu.volume === "number" ? this.emu.volume : 1);

        return el;
    }

    setVolume(vol) {
        if (!this.emu.isNetplay) return false;

        if (this.remoteAudioElements) {
            for (const peerId in this.remoteAudioElements) {
                try {
                    this.remoteAudioElements[peerId].volume = vol;
                } catch (e) {}
            }
        }

        return !this.owner;
    }

    armGuestAudioUnlock() {
        if (!this.emu.isNetplay || this.owner) return;
        if (this._audioUnlockArmed) return;

        this._audioUnlockArmed = true;

        const tryPlayAll = () => {
            try {
                const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
                els.forEach((a) => {
                    a.muted = false;
                    a.volume = this.emu.muted ? 0 : (typeof this.emu.volume === "number" ? this.emu.volume : 1);
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

    // --- Stream Size ---

    chooseStreamSize() {
        const fps = (this.emu.config && this.emu.config.netplayFps) || window.EJS_netplayFps || 30;

        const override = (this.emu.config && this.emu.config.netplayStream) || window.EJS_netplayStream;
        if (override && typeof override === "string") {
            const m = override.trim().match(/^(\d+)\s*x\s*(\d+)$/i);
            if (m) {
                let ow = Math.max(2, parseInt(m[1], 10));
                let oh = Math.max(2, parseInt(m[2], 10));
                if (ow % 2) ow++;
                if (oh % 2) oh++;
                return { w: ow, h: oh, fps, mode: "override" };
            }
        }

        const n = this.getNativeResolution();
        const aw = (n && n.width) ? n.width : 640;
        const ah = (n && n.height) ? n.height : 480;
        let aspect = aw / ah;
        if (!isFinite(aspect) || aspect <= 0) aspect = 4 / 3;
        if (aspect < 1.1) aspect = 1.1;
        if (aspect > 2.0) aspect = 2.0;

        let H = 720;
        let W = Math.round(H * aspect);

        if (W > 1280) {
            W = 1280;
            H = Math.round(W / aspect);
        }

        if (W % 2) W++;
        if (H % 2) H++;

        return { w: W, h: H, fps, mode: "auto" };
    }

    // --- Overlay ---

    getAnchorElement() {
        try {
            if (this.emu.config && this.emu.config.player) {
                const el = document.querySelector(this.emu.config.player);
                if (el) return el;
            }
        } catch (e) {}
        return this.emu.canvas || null;
    }

    ensureOverlay() {
        if (this._overlay && this._overlay.parentNode) return;

        const parent = this.emu.elements.parent;
        if (!parent) return;

        // Ensure parent is a positioning context
        const cs = window.getComputedStyle(parent);
        if (cs.position === "static") {
            this._restoreParentPosition = parent.style.position;
            parent.style.position = "relative";
        }

        const ov = document.createElement("div");
        ov.id = "ejs-netplay-overlay";
        ov.classList.add("ejs_netplay_overlay");
        ov.style.position = "absolute";
        ov.style.top = "0";
        ov.style.left = "0";
        ov.style.width = "100%";
        ov.style.height = "100%";
        ov.style.pointerEvents = "none";
        ov.style.zIndex = "10000";
        ov.style.overflow = "hidden";
        parent.appendChild(ov);
        this._overlay = ov;

        this._overlaySync = () => this.syncOverlay(false);
        window.addEventListener("resize", this._overlaySync, true);
        window.addEventListener("scroll", this._overlaySync, true);
        window.addEventListener("orientationchange", this._overlaySync, true);

        if (window.visualViewport) {
            this._vvSync = () => this.syncOverlay(false);
            window.visualViewport.addEventListener("resize", this._vvSync, true);
            window.visualViewport.addEventListener("scroll", this._vvSync, true);
        }

        this._fsSync = () => {
            setTimeout(() => this.syncOverlay(true), 50);
            setTimeout(() => this.syncOverlay(true), 200);
        };
        document.addEventListener("fullscreenchange", this._fsSync, true);
        document.addEventListener("webkitfullscreenchange", this._fsSync, true);

        if (!this._overlayRO && window.ResizeObserver) {
            this._overlayRO = new ResizeObserver(() => this.syncOverlay(false));
            try {
                const anchor = this.getAnchorElement();
                if (anchor) this._overlayRO.observe(anchor);
                if (anchor && anchor.parentElement) this._overlayRO.observe(anchor.parentElement);
                if (parent) this._overlayRO.observe(parent);
            } catch (e) {}
        }

        this.syncOverlay(true);
    }

    syncOverlay(force) {
        if (!this.emu.netplayCanvas || !this._overlay) return;

        const anchor = this.getAnchorElement();
        if (!anchor || !anchor.getBoundingClientRect) return;

        const parent = this.emu.elements.parent;
        if (!parent) return;

        const anchorRect = anchor.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();

        if (!anchorRect || anchorRect.width <= 0 || anchorRect.height <= 0) return;
        if (!parentRect || parentRect.width <= 0 || parentRect.height <= 0) return;

        const dpr = window.devicePixelRatio || 1;

        // Position relative to parent, not viewport
        let left = anchorRect.left - parentRect.left + parent.scrollLeft;
        let top = anchorRect.top - parentRect.top + parent.scrollTop;
        let cssW = Math.max(1, Math.round(anchorRect.width));
        let cssH = Math.max(1, Math.round(anchorRect.height));

        // Clamp within parent
        if (left < 0) { cssW += left; left = 0; }
        if (top < 0) { cssH += top; top = 0; }
        cssW = Math.max(1, Math.min(cssW, Math.round(parentRect.width - left)));
        cssH = Math.max(1, Math.min(cssH, Math.round(parentRect.height - top)));

        this.guestDisplayWidth = cssW;
        this.guestDisplayHeight = cssH;

        if (this.emu.netplayCanvas.parentNode !== this._overlay) {
            this._overlay.appendChild(this.emu.netplayCanvas);
        }

        this.emu.netplayCanvas.style.position = "absolute";
        this.emu.netplayCanvas.style.left = left + "px";
        this.emu.netplayCanvas.style.top = top + "px";
        this.emu.netplayCanvas.style.width = cssW + "px";
        this.emu.netplayCanvas.style.height = cssH + "px";
        this.emu.netplayCanvas.style.zIndex = "10000";
        this.emu.netplayCanvas.style.pointerEvents = "none";
        this.emu.netplayCanvas.style.background = "#000";
        this.emu.netplayCanvas.style.imageRendering = "pixelated";

        const pxW = Math.max(1, Math.round(cssW * dpr));
        const pxH = Math.max(1, Math.round(cssH * dpr));
        if (force || this.emu.netplayCanvas.width !== pxW || this.emu.netplayCanvas.height !== pxH) {
            this.emu.netplayCanvas.width = pxW;
            this.emu.netplayCanvas.height = pxH;
        }
    }

    destroyOverlay() {
        if (this._overlaySync) {
            window.removeEventListener("resize", this._overlaySync, true);
            window.removeEventListener("scroll", this._overlaySync, true);
            window.removeEventListener("orientationchange", this._overlaySync, true);
            this._overlaySync = null;
        }
        if (this._vvSync && window.visualViewport) {
            window.visualViewport.removeEventListener("resize", this._vvSync, true);
            window.visualViewport.removeEventListener("scroll", this._vvSync, true);
            this._vvSync = null;
        }
        if (this._fsSync) {
            document.removeEventListener("fullscreenchange", this._fsSync, true);
            document.removeEventListener("webkitfullscreenchange", this._fsSync, true);
            this._fsSync = null;
        }
        if (this._overlayRO) {
            try { this._overlayRO.disconnect(); } catch (e) {}
            this._overlayRO = null;
        }
        if (this._overlay && this._overlay.parentNode) {
            try { this._overlay.parentNode.removeChild(this._overlay); } catch (e) {}
        }
        this._overlay = null;

        if (this._restoreParentPosition !== undefined && this._restoreParentPosition !== null) {
            try {
                const parent = this.emu.elements.parent;
                if (parent) parent.style.position = this._restoreParentPosition;
            } catch (e) {}
            this._restoreParentPosition = null;
        }
    }

    // --- Guest UI Z-Index ---

    boostGuestUIZ() {
        if (!this.emu.isNetplay || this.owner) return;
        if (this._uiZBoosted) return;

        this._uiZBoosted = [];
        let root = null;

        if (!this.emu.msgElem && typeof this.emu.displayMessage === "function") {
            this.emu.displayMessage("", 1);
        }

        try {
            root = (this.emu.config && this.emu.config.player) ? document.querySelector(this.emu.config.player) : null;
        } catch (e) {}
        if (!root) root = document;

        const sel = [
            ".ejs_message",
            ".ejs_menu_bar",
            ".ejs_settings_parent",
            ".ejs_context_menu",
            ".ejs_popup_container",
            ".ejs_popup_container_box",
            ".ejs_virtualGamepad_parent",
            ".ejs_virtualGamepad_top",
            ".ejs_virtualGamepad_left",
            ".ejs_virtualGamepad_right",
            ".ejs_virtualGamepad_bottom",
            ".ejs_virtualGamepad_open"
        ].join(",");

        const nodes = root.querySelectorAll(sel);

        for (let i = 0; i < nodes.length; i++) {
            const el = nodes[i];
            const cs = window.getComputedStyle(el);

            this._uiZBoosted.push({
                el,
                z: el.style.zIndex,
                pos: el.style.position,
                pe: el.style.pointerEvents
            });

            if (cs.position === "static") el.style.position = "relative";
            el.style.zIndex = "10002";
            el.style.pointerEvents = "auto";
        }
    }

    restoreGuestUIZ() {
        const list = this._uiZBoosted;
        if (!list) return;

        for (let i = 0; i < list.length; i++) {
            const item = list[i];
            if (!item || !item.el) continue;
            item.el.style.zIndex = item.z || "";
            item.el.style.position = item.pos || "";
            item.el.style.pointerEvents = item.pe || "";
        }

        this._uiZBoosted = null;
    }

    // --- Freeze / Unfreeze ---

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

        if (this.emu.handleResize && !orig.handleResize) {
            orig.handleResize = this.emu.handleResize;
            this.emu.handleResize = (...args) => {
                try { orig.handleResize.apply(this.emu, args); } catch (e) {}
                if (this.emu.isNetplay && !this.owner) this.syncOverlay(true);
            };
        }

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

    unfreezeGuest() {
        if (!this.frozen) return;
        this._log("GUEST", "Unfreezing emulator...");

        const orig = this.frozen.originals || {};
        if (orig.handleResize) this.emu.handleResize = orig.handleResize;

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

        if (this.emu.Module && this.emu.Module.resumeMainLoop) {
            try { this.emu.Module.resumeMainLoop(); } catch (e) {}
        }
        if (this.emu.gameManager) {
            try { this.emu.gameManager.toggleMainLoop(1); } catch (e) {}
        }

        this.frozen = null;
        this._log("GUEST", "Emulator unfrozen");
    }

    // --- Renegotiation ---

    requestRenegotiate(peerId, reason) {
        try {
            if (!this.socket || !this.socket.connected) return;
            this._log(this.owner ? "HOST" : "GUEST", "Request renegotiate (" + (reason || "unknown") + ") with " + peerId);
            this.socket.emit("webrtc-signal", { target: peerId, requestRenegotiate: true, reason: reason || "" });
        } catch (e) {}
    }

    // --- WebRTC Stream ---

    initWebRTCStream() {
        if (this.localStream) return Promise.resolve();

        if (this.emu.Module && this.emu.Module.AL && this.emu.Module.AL.currentCtx && this.emu.Module.AL.currentCtx.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
        }

        return new Promise((resolve) => {
            if (!this.emu.canvas || !this.emu.canvas.captureStream) {
                if (this.emu.debug) console.error("[NETPLAY HOST] canvas.captureStream unavailable");
                resolve();
                return;
            }

            const chosen = this.chooseStreamSize();
            const outW = chosen.w;
            const outH = chosen.h;
            const fps = chosen.fps;
            const outAspect = outW / outH;

            this._log("HOST", "Init stream (" + chosen.mode + ") " + outW + "x" + outH + " @ " + fps + "fps");

            // Lock the aspect ratio at stream creation time
            const initialW = this.emu.canvas.width || 640;
            const initialH = this.emu.canvas.height || 480;
            let lockedAspect = initialW / initialH;
            if (!isFinite(lockedAspect) || lockedAspect <= 0) lockedAspect = 4 / 3;

            this._log("HOST", "Locked source aspect: " + lockedAspect.toFixed(4) +
                      " (initial " + initialW + "x" + initialH + ")");

            // Create a stable output canvas at fixed resolution
            const stableCanvas = document.createElement("canvas");
            stableCanvas.width = outW;
            stableCanvas.height = outH;
            stableCanvas.classList.add("ejs_netplay_offscreen_canvas");
            document.body.appendChild(stableCanvas);
            this.captureCanvas = stableCanvas;

            const stableCtx = stableCanvas.getContext("2d", { alpha: false });
            this.captureRunning = true;

            // Draw initial black frame
            stableCtx.fillStyle = "#000";
            stableCtx.fillRect(0, 0, outW, outH);

            let hasDrawnFrame = false;
            let lastDrawTime = 0;
            const frameInterval = 1000 / fps;

            const drawToStableCanvas = (timestamp) => {
                if (!this.captureRunning) return;

                // Throttle to target fps - reduces CPU load especially in fullscreen
                if (timestamp - lastDrawTime < frameInterval * 0.9) {
                    requestAnimationFrame(drawToStableCanvas);
                    return;
                }
                lastDrawTime = timestamp;

                const srcCanvas = this.emu.canvas;
                if (srcCanvas && srcCanvas.width > 0 && srcCanvas.height > 0) {
                    const srcW = srcCanvas.width;
                    const srcH = srcCanvas.height;
                    const srcAspect = srcW / srcH;

                    // Calculate source region with locked aspect ratio
                    let sx = 0, sy = 0, sw = srcW, sh = srcH;

                    if (Math.abs(srcAspect - lockedAspect) > 0.01) {
                        if (srcAspect > lockedAspect) {
                            sw = Math.round(srcH * lockedAspect);
                            sx = Math.round((srcW - sw) / 2);
                        } else {
                            sh = Math.round(srcW / lockedAspect);
                            sy = Math.round((srcH - sh) / 2);
                        }
                    }

                    // Clamp bounds
                    sx = Math.max(0, Math.min(sx, srcW - 1));
                    sy = Math.max(0, Math.min(sy, srcH - 1));
                    sw = Math.max(1, Math.min(sw, srcW - sx));
                    sh = Math.max(1, Math.min(sh, srcH - sy));

                    // Calculate destination with letterboxing
                    let dx = 0, dy = 0, dw = outW, dh = outH;

                    if (lockedAspect > outAspect) {
                        dh = Math.round(outW / lockedAspect);
                        dy = Math.round((outH - dh) / 2);
                    } else if (lockedAspect < outAspect) {
                        dw = Math.round(outH * lockedAspect);
                        dx = Math.round((outW - dw) / 2);
                    }

                    dw = Math.max(1, dw);
                    dh = Math.max(1, dh);

                    // Clear and draw directly from emulator canvas
                    stableCtx.fillStyle = "#000";
                    stableCtx.fillRect(0, 0, outW, outH);
                    stableCtx.imageSmoothingEnabled = true;
                    stableCtx.drawImage(srcCanvas, sx, sy, sw, sh, dx, dy, dw, dh);

                    hasDrawnFrame = true;
                } else if (!hasDrawnFrame) {
                    stableCtx.fillStyle = "#000";
                    stableCtx.fillRect(0, 0, outW, outH);
                }

                requestAnimationFrame(drawToStableCanvas);
            };
            requestAnimationFrame(drawToStableCanvas);

            if (typeof this.emu.collectScreenRecordingMediaTracks === "function") {
                const finalStream = this.emu.collectScreenRecordingMediaTracks(stableCanvas, fps);

                try {
                    const outVideoTrack = finalStream.getVideoTracks()[0];
                    if (outVideoTrack) outVideoTrack.contentHint = "detail";
                } catch (e) {}

                this.localStream = finalStream;
                this._hostOutStream = finalStream;

                this._log("HOST", "Stream ready - Video: " + finalStream.getVideoTracks().length + ", Audio: " + finalStream.getAudioTracks().length);
            } else {
                if (this.emu.debug) console.warn("[NETPLAY HOST] collectScreenRecordingMediaTracks missing, video only fallback");
                const fallbackStream = stableCanvas.captureStream(fps);
                this.localStream = fallbackStream;
                this._hostOutStream = fallbackStream;
            }

            resolve();
        });
    }

    // --- Room Joined ---

    roomJoined(isOwner, roomName, password, roomId) {
        this._log(isOwner ? "HOST" : "GUEST", "Room joined: " + roomName);

        this.updateNetplayUI(true);

        this.emu.isNetplay = true;
        this.inputs = {};
        this.owner = isOwner;

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
            const anchor = this.getAnchorElement();
            const rect = (anchor && anchor.getBoundingClientRect)
                ? anchor.getBoundingClientRect()
                : (this.emu.canvas ? this.emu.canvas.getBoundingClientRect() : { width: 640, height: 480 });

            const cssW = Math.max(1, Math.round(rect.width));
            const cssH = Math.max(1, Math.round(rect.height));
            const dpr = window.devicePixelRatio || 1;

            this._log("GUEST", "Display rect: " + cssW + "x" + cssH);

            this.freezeGuest();

            this._restoreCanvasStyle = {
                opacity: this.emu.canvas ? this.emu.canvas.style.opacity : "",
                pointerEvents: this.emu.canvas ? this.emu.canvas.style.pointerEvents : "",
                visibility: this.emu.canvas ? this.emu.canvas.style.visibility : ""
            };

            this.emu.netplayCanvas = document.createElement("canvas");
            this.emu.netplayCanvas.id = "ejs-netplay-canvas";
            this.emu.netplayCanvas.width = Math.max(1, Math.round(cssW * dpr));
            this.emu.netplayCanvas.height = Math.max(1, Math.round(cssH * dpr));
            this.emu.netplayCanvas.classList.add("ejs_netplay_canvas");
            this.emu.netplayCanvas.style.width = cssW + "px";
            this.emu.netplayCanvas.style.height = cssH + "px";

            this.ensureOverlay();
            this.syncOverlay(true);

            this.boostGuestUIZ();

            if (this.emu.canvas) {
                this.emu.canvas.style.opacity = "0";
                this.emu.canvas.style.visibility = "visible";
                this.emu.canvas.style.pointerEvents = "";
            }

            const ctx = this.emu.netplayCanvas.getContext("2d", { alpha: false });
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, this.emu.netplayCanvas.width, this.emu.netplayCanvas.height);
            ctx.fillStyle = "#fff";
            ctx.font = (20 * dpr) + "px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Connecting...", this.emu.netplayCanvas.width / 2, this.emu.netplayCanvas.height / 2);

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

            if (this.emu.elements.bottomBar && this.emu.elements.bottomBar.cheat && this.emu.elements.bottomBar.cheat[0]) {
                this.oldCheatDisplay = this.emu.elements.bottomBar.cheat[0].style.display;
                this.emu.elements.bottomBar.cheat[0].style.display = "none";
            }

            this._gotVideoEver = false;

            this.connectionTimeout = setTimeout(() => {
                if (!this.webRtcReady && !this._gotVideoEver) {
                    this.emu.displayMessage("Connection failed", 5000);
                    this.leaveRoom();
                }
            }, 15000);

            this._log("GUEST", "Setup complete - waiting for stream");
        } else {
            this._log("HOST", "Setup complete");

            if (this.emu.gameManager) {
                try { this.emu.gameManager.toggleMainLoop(1); } catch (e) {}
            }
        }
    }

    // --- Draw Video ---

    drawVideoToCanvas() {
        const video = this.video;
        const canvas = this.emu.netplayCanvas;
        if (!video || !canvas) return;

        const ctx = canvas.getContext("2d", { alpha: false });
        if (!ctx) return;

        this._log("GUEST", "Starting draw loop");

        let running = true;
        let lockedAspect = null;
        let lastVideoSize = "";

        const draw = () => {
            if (!running || !this.emu.isNetplay || this.owner) return;
            if (!canvas.parentNode) return;

            this.syncOverlay(false);

            const W = canvas.width;
            const H = canvas.height;

            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, W, H);

            if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                const vs = video.videoWidth + "x" + video.videoHeight;
                if (vs !== lastVideoSize) {
                    lastVideoSize = vs;
                    this._log("GUEST", "Video size: " + vs);
                }

                if (lockedAspect === null) {
                    lockedAspect = video.videoWidth / video.videoHeight;
                    this._log("GUEST", "Aspect locked: " + lockedAspect.toFixed(4));
                }

                const guestAspect = W / H;
                let drawW, drawH, ox, oy;

                if (lockedAspect > guestAspect) {
                    drawW = W;
                    drawH = W / lockedAspect;
                    ox = 0;
                    oy = (H - drawH) / 2;
                } else {
                    drawH = H;
                    drawW = H * lockedAspect;
                    ox = (W - drawW) / 2;
                    oy = 0;
                }

                ctx.imageSmoothingEnabled = true;
                ctx.drawImage(video, ox, oy, drawW, drawH);
            }

            requestAnimationFrame(draw);
        };

        video.onloadeddata = () => {
            this._log("GUEST", "Video loadeddata");
            requestAnimationFrame(draw);
        };

        if (video.readyState >= 2) requestAnimationFrame(draw);

        this.stopDrawLoop = () => { running = false; };
    }

    // --- Peer Connection ---

    createPeerConnection(peerId) {
        const role = this.owner ? "HOST" : "GUEST";

        this._log(role, "Creating peer connection: " + peerId);

        const pc = new RTCPeerConnection({
            iceServers: this.emu.config.netplayICEServers,
            iceCandidatePoolSize: 10
        });

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

        if (this.owner && this.localStream) {
            const tracks = this.localStream.getTracks();
            this._log("HOST", "Adding " + tracks.length + " tracks");
            for (let i = 0; i < tracks.length; i++) {
                pc.addTrack(tracks[i], this.localStream);
            }

            try {
                const sender = pc.getSenders().find((s) => s.track && s.track.kind === "video");
                if (sender) {
                    const p = sender.getParameters();
                    p.degradationPreference = "maintain-resolution";
                    if (!p.encodings || !p.encodings.length) p.encodings = [{}];
                    p.encodings[0].maxBitrate = 5000000;
                    p.encodings[0].scaleResolutionDownBy = 1.0;
                    sender.setParameters(p).catch(() => {});
                }
            } catch (e) {}
        } else {
            pc.addTransceiver("video", { direction: "recvonly" });
            pc.addTransceiver("audio", { direction: "recvonly" });
        }

        this.peerConnections[peerId] = { pc, dataChannel: dc };

        let gotStream = false;
        const streamTimeout = setTimeout(() => {
            if (!gotStream && !this.owner) {
                this._log("GUEST", "Stream timeout -> request renegotiate");
                this.requestRenegotiate(peerId, "stream-timeout");
            }
        }, 15000);

        pc.onicecandidate = (e) => {
            if (e.candidate) {
                this.socket.emit("webrtc-signal", { target: peerId, candidate: e.candidate });
            }
        };

        pc.onconnectionstatechange = () => {
            this._log(role, "Connection: " + pc.connectionState);

            if (pc.connectionState === "connected") {
                this.webRtcReady = true;
                clearTimeout(this.connectionTimeout);
                if (this._dcTimer) {
                    clearTimeout(this._dcTimer);
                    this._dcTimer = null;
                }
                return;
            }

            if (!this.owner) {
                if (pc.connectionState === "failed") {
                    this.requestRenegotiate(peerId, "pc-failed");
                    return;
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

        pc.ontrack = (e) => {
            if (this.owner) return;

            const t = e.track;
            this._log("GUEST", "Track received: " + t.kind);

            if (t.kind === "audio") {
                try {
                    const stream = (e.streams && e.streams[0]) ? e.streams[0] : new MediaStream([t]);
                    const audioEl = this.ensureRemoteAudioElement(peerId);
                    audioEl.srcObject = stream;

                    const p = audioEl.play();
                    if (p && p.catch) {
                        p.catch(() => {
                            this._log("GUEST", "Audio autoplay blocked, arming unlock");
                            this.armGuestAudioUnlock();
                        });
                    }
                } catch (err) {
                    if (this.emu.debug) console.error("[NETPLAY GUEST] Audio element error:", err);
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
                this.video.play().catch((err) => {
                    this._log("GUEST", "video.play() warning:", err);
                });

                this.drawVideoToCanvas();

                t.onended = () => {
                    if (this.emu.isNetplay) this.requestRenegotiate(peerId, "video-track-ended");
                };
            }
        };

        if (this.owner && this.localStream) {
            this._log("HOST", "Creating offer...");
            pc.createOffer()
                .then((o) => pc.setLocalDescription(o))
                .then(() => {
                    this.socket.emit("webrtc-signal", { target: peerId, offer: pc.localDescription });
                })
                .catch((err) => {
                    if (this.emu.debug) console.error("[NETPLAY HOST] Offer error:", err);
                });
        }

        return pc;
    }

    // --- Chat ---

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

    chatSendMessage() {
        if (!this.socket || !this.socket.connected) return;
        if (!this.chatInput || !this.chatTo) return;

        const message = String(this.chatInput.value || "").trim();
        if (!message) return;

        const to = this.chatTo.value || "all";
        this.chatInput.value = "";

        const chatPayload = {
            player_name: this.name || "Player",
            message,
            to,
            from: this.playerID
        };

        this.chatAppend(chatPayload);
        this.sendMessage({ "chat-message": chatPayload });
    }

    bindChatUI() {
        if (this._chatBound) return;
        if (!this._chatSend || !this._chatInput) return;

        this._chatBound = true;

        this.emu.addEventListener(this._chatSend, "click", () => {
            this.chatSendMessage();
        });
        this.emu.addEventListener(this._chatInput, "keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.chatSendMessage();
            }
        });
    }

    // --- Leave Room ---

    leaveRoom() {
        if (this._prevPostMainLoop || this._origPostMainLoop) {
            const Module = (this.emu.gameManager && this.emu.gameManager.Module)
                ? this.emu.gameManager.Module
                : this.emu.Module;
            if (Module) {
                Module.postMainLoop = this._origPostMainLoop || null;
            }
            this._prevPostMainLoop = null;
            this._origPostMainLoop = null;
        }
        this._copyFrameToCapture = null;
        if (this._leaving) return;
        this._leaving = true;

        this._log(this.owner ? "HOST" : "GUEST", "Leaving room");

        this.updateNetplayUI(false);
        clearTimeout(this.connectionTimeout);
        if (this.stopDrawLoop) this.stopDrawLoop();

        this.unfreezeGuest();

        this.captureRunning = false;

        if (this.captureCanvas && this.captureCanvas.parentNode) {
            try { this.captureCanvas.parentNode.removeChild(this.captureCanvas); } catch (e) {}
        }
        this.captureCanvas = null;

        if (this._hostOutStream) {
            try { this._hostOutStream.getTracks().forEach((tr) => tr.stop()); } catch (e) {}
            this._hostOutStream = null;
        }

        this.restoreGuestUIZ();
        this.destroyOverlay();

        if (this.emu.netplayCanvas && this.emu.netplayCanvas.parentNode) {
            try { this.emu.netplayCanvas.parentNode.removeChild(this.emu.netplayCanvas); } catch (e) {}
        }
        this.emu.netplayCanvas = null;

        if (this.emu.canvas && this._restoreCanvasStyle) {
            this.emu.canvas.style.opacity = this._restoreCanvasStyle.opacity || "";
            this.emu.canvas.style.pointerEvents = this._restoreCanvasStyle.pointerEvents || "";
            this.emu.canvas.style.visibility = this._restoreCanvasStyle.visibility || "";
            this._restoreCanvasStyle = null;
        } else if (this.emu.canvas) {
            this.emu.canvas.style.opacity = "";
        }

        if (this.remoteAudioContext) {
            try { this.remoteAudioContext.close(); } catch (e) {}
            this.remoteAudioContext = null;
            this.remoteGainNode = null;
        }

        try {
            const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
            els.forEach((a) => {
                try { a.pause(); } catch (e) {}
                try { a.srcObject = null; } catch (e) {}
                try { a.remove(); } catch (e) {}
            });
        } catch (e) {}
        if (this.remoteAudioElements) this.remoteAudioElements = {};
        if (this._audioUnlockCleanup) {
            try { this._audioUnlockCleanup(); } catch (e) {}
            this._audioUnlockCleanup = null;
        }
        this._audioUnlockArmed = false;

        if (this.owner && this.sendMessage) {
            try { this.sendMessage({ type: "host-left" }); } catch (e) {}
        }

        if (this.socket) {
            try {
                if (this.socket.connected) this.socket.emit("leave-room");
                this.socket.disconnect();
            } catch (e) {}
            this.socket = null;
        }

        if (this.localStream) {
            try { this.localStream.getTracks().forEach((tr) => tr.stop()); } catch (e) {}
            this.localStream = null;
        }

        const pcs = this.peerConnections || {};
        for (const key in pcs) {
            if (pcs[key] && pcs[key].pc) {
                try { pcs[key].pc.close(); } catch (e) {}
            }
        }
        this.peerConnections = {};

        if (this.video) {
            try { this.video.srcObject = null; } catch (e) {}
            this.video = null;
        }

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

        if (this.originalSimulateInput && this.emu.gameManager && this.emu.gameManager.functions) {
            this.emu.gameManager.functions.simulateInput = this.originalSimulateInput;
        }

        this.emu.isNetplay = false;
        this.owner = false;
        this.players = {};
        this.playerID = null;
        this.webRtcReady = false;

        if (this.emu.originalControls) {
            this.emu.controls = JSON.parse(JSON.stringify(this.emu.originalControls));
            this.emu.originalControls = null;
        }

        // Removed: _hostCanvasRO cleanup (no longer needed since we don't lock canvas)

        setTimeout(() => {
            if (this.emu.handleResize) this.emu.handleResize();
        }, 100);

        this.emu.displayMessage("Left room", 3000);
        this._leaving = false;
    }

    // --- Simulate Input ---

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

    // --- Room List ---

    getOpenRooms() {
        if (!this.url) return Promise.resolve({});
        return fetch(this.url + "/list?domain=" + window.location.host + "&game_id=" + this.emu.config.gameId)
            .then((res) => res.text())
            .then((text) => JSON.parse(text))
            .catch(() => ({}));
    }

    updateTableList() {
        if (!this.table) return Promise.resolve();
        return this.getOpenRooms().then((rooms) => {
            this.table.innerHTML = "";
            for (const k in rooms) {
                ((id, r) => {
                    const row = this.emu.createElement("tr");
                    row.classList.add("ejs_netplay_table_row");
                    const c1 = this.emu.createElement("td");
                    c1.innerText = r.room_name;
                    c1.style.textAlign = "left";
                    c1.style.padding = "10px 0";
                    const c2 = this.emu.createElement("td");
                    c2.innerText = r.current + "/" + r.max;
                    c2.style.width = "80px";
                    c2.style.textAlign = "center";
                    const c3 = this.emu.createElement("td");
                    c3.style.width = "80px";
                    if (r.current < r.max) {
                        const btn = this.emu.createElement("button");
                        btn.classList.add("ejs_netplay_join_button", "ejs_button_button");
                        btn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                        btn.innerText = this.emu.localization("Join");
                        c3.appendChild(btn);
                        this.emu.addEventListener(btn, "click", () => {
                            if (r.hasPassword) {
                                this.showJoinPasswordDialog(id, r.room_name, r.max);
                            } else {
                                this.joinRoom(id, r.room_name, r.max, null);
                            }
                        });
                    }
                    row.appendChild(c1);
                    row.appendChild(c2);
                    row.appendChild(c3);
                    this.table.appendChild(row);
                })(k, rooms[k]);
            }
        }).catch(() => {});
    }

    _updateListStart() {
        this.updateListInterval = setInterval(() => { this.updateTableList(); }, 1000);
    }

    _updateListStop() {
        clearInterval(this.updateListInterval);
    }

    // --- Dialogs ---

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
        const ni = this.emu.createElement("input");
        ni.type = "text";
        ni.maxLength = 20;
        const ms = this.emu.createElement("select");
        ["2", "3", "4"].forEach((v) => {
            const o = document.createElement("option");
            o.value = v;
            o.innerText = v;
            ms.appendChild(o);
        });
        const pw = this.emu.createElement("input");
        pw.type = "text";
        pw.maxLength = 20;
        [["Room Name", ni], ["Max Players", ms], ["Password (optional)", pw]].forEach((item) => {
            const s = this.emu.createElement("strong");
            s.innerText = this.emu.localization(item[0]);
            form.appendChild(s);
            form.appendChild(this.emu.createElement("br"));
            form.appendChild(item[1]);
        });
        popups[1].appendChild(form);
        const sub = this.emu.createElement("button");
        sub.classList.add("ejs_button_button", "ejs_popup_submit");
        sub.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
        sub.style.margin = "10px";
        sub.innerText = this.emu.localization("Submit");
        this.emu.addEventListener(sub, "click", () => {
            const n = ni.value.trim();
            if (n) {
                this.openRoom(n, parseInt(ms.value, 10), pw.value.trim());
                popups[0].remove();
            }
        });
        const cls = this.emu.createElement("button");
        cls.classList.add("ejs_button_button", "ejs_popup_submit");
        cls.style.margin = "10px";
        cls.innerText = this.emu.localization("Close");
        this.emu.addEventListener(cls, "click", () => { popups[0].remove(); });
        popups[1].appendChild(sub);
        popups[1].appendChild(cls);
    }

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
        form.appendChild(pwLabel);
        form.appendChild(this.emu.createElement("br"));

        const pwInput = this.emu.createElement("input");
        pwInput.type = "password";
        pwInput.maxLength = 20;
        pwInput.placeholder = this.emu.localization("Enter room password");
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
            const pw = pwInput.value.trim();
            popups[0].remove();
            if (pw) this.joinRoom(roomId, roomName, maxPlayers, pw);
        });

        this.emu.addEventListener(cancelBtn, "click", () => { popups[0].remove(); });

        this.emu.addEventListener(pwInput, "keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                const pw = pwInput.value.trim();
                popups[0].remove();
                if (pw) this.joinRoom(roomId, roomName, maxPlayers, pw);
            }
            if (e.key === "Escape") popups[0].remove();
        });

        buttonRow.appendChild(joinBtn);
        buttonRow.appendChild(cancelBtn);
        popups[1].appendChild(buttonRow);

        setTimeout(() => pwInput.focus(), 50);
    }

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

    // --- Socket.IO ---

    startSocketIO(cb) {
        this._unlockMobileAudio();

        if (typeof io === "undefined") {
            this.emu.displayMessage("Socket.IO unavailable", 5000);
            return;
        }
        if (this.socket && this.socket.connected) {
            cb();
            return;
        }
        if (!this.url) {
            this.emu.displayMessage("Network error", 5000);
            return;
        }

        this.previousPlayers = {};
        this.socket = io(this.url);

        this.socket.on("connect", () => {
            this.bindChatUI();
            cb();
        });

        this.socket.on("connect_error", (e) => {
            this.emu.displayMessage("Connect error: " + e.message, 5000);
        });

        this.socket.on("disconnect", () => { this.leaveRoom(); });

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

            if (this.owner) {
                this.initWebRTCStream().then(() => {
                    Object.keys(users).forEach((pid) => {
                        if (pid !== this.playerID) {
                            const sid = users[pid].socketId;
                            if (sid && !this.peerConnections[sid]) {
                                this.createPeerConnection(sid);
                            }
                        }
                    });
                });
            }
        });

        this.socket.on("data-message", (d) => { this.dataMessage(d); });

        this.socket.on("webrtc-signal", (data) => {
            const sender = data.sender;
            const offer = data.offer;
            const answer = data.answer;
            const candidate = data.candidate;
            const requestRenegotiate = data.requestRenegotiate;

            if (requestRenegotiate && this.owner && sender) {
                if (this.emu.debug) console.log("[NETPLAY HOST] Renegotiate requested by " + sender + " (" + (data.reason || "") + ")");
                try {
                    if (this.peerConnections[sender] && this.peerConnections[sender].pc) {
                        this.peerConnections[sender].pc.close();
                    }
                } catch (e) {}
                delete this.peerConnections[sender];

                this.initWebRTCStream().then(() => { this.createPeerConnection(sender); });
                return;
            }

            if (!sender) return;

            let pd = this.peerConnections[sender];
            if (!pd) {
                pd = { pc: this.createPeerConnection(sender), iceCandidateQueue: [] };
                this.peerConnections[sender] = pd;
            }
            pd.iceCandidateQueue = pd.iceCandidateQueue || [];
            const pc = pd.pc;

            if (offer) {
                pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                    pd.iceCandidateQueue.forEach((c) => { pc.addIceCandidate(new RTCIceCandidate(c)); });
                    pd.iceCandidateQueue = [];
                    return pc.createAnswer();
                }).then((ans) => pc.setLocalDescription(ans))
                .then(() => {
                    this.socket.emit("webrtc-signal", { target: sender, answer: pc.localDescription });
                }).catch((err) => {
                    if (this.emu.debug) console.error("[NETPLAY GUEST] Answer error:", err);
                });

            } else if (answer) {
                pc.setRemoteDescription(new RTCSessionDescription(answer)).then(() => {
                    pd.iceCandidateQueue.forEach((c) => { pc.addIceCandidate(new RTCIceCandidate(c)); });
                    pd.iceCandidateQueue = [];
                }).catch((err) => {
                    if (this.emu.debug) console.error("[NETPLAY HOST] Set answer error:", err);
                });

            } else if (candidate) {
                if (pc.remoteDescription) {
                    pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {});
                } else {
                    pd.iceCandidateQueue.push(candidate);
                }
            }
        });
    }

    // --- Players Table ---

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

    // --- Open / Join Room ---

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
                if (e) {
                    this.emu.displayMessage("Room error: " + e, 5000);
                    return;
                }
                this.roomJoined(true, rn, pw, sid);
            });
        });
    }

    joinRoom(sid, rn, mp, pw) {
        this._unlockMobileAudio();
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
                if (e) {
                    this.showJoinErrorDialog(sid, rn, mp, e, !!pw);
                    return;
                }
                this.players = u;
                this.roomJoined(false, rn, pw, sid);
            });
        });
    }

    // --- Data Message ---

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

    // --- Send Message ---

    sendMessage(d) {
        if (this.socket && this.socket.connected) {
            this.socket.emit("data-message", d);
        }
    }

    // --- Reset / Post Main Loop ---

    reset() {
        this.init_frame = this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0;
        this.currentFrame = 0;
        this.inputsData = {};
    }

    _initModulePostMainLoop() {
        if (this.emu.isNetplay && !this.owner) return;
        this.currentFrame = (this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0) - (this.init_frame || 0);
        if (!this.emu.isNetplay || !this.owner) return;

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

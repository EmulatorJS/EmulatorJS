export const netplayMethods = {

    updateNetplayUI(isJoining) {
        if (!this.elements.bottomBar) return;

        const bar = this.elements.bottomBar;
        const isClient = !this.netplay.owner;
        const shouldHideButtons = isJoining && isClient;
        const elementsToToggle = [
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
            elementsToToggle.push(bar.settings[0].parentElement);
        }
        if (this.diskParent) {
            elementsToToggle.push(this.diskParent);
        }

        elementsToToggle.forEach((el) => {
            if (el) {
                el.classList.toggle("netplay-hidden", shouldHideButtons);
            }
        });
    },

    createNetplayMenu() {
        const body = this.createPopup("Netplay", {
            "Create a Room": () => {
                if (this.netplayUnlockMobileAudio) this.netplayUnlockMobileAudio();
                if (typeof this.netplay.updateList !== "function") this.defineNetplayFunctions();
                if (this.isNetplay) this.netplay.leaveRoom();
                else this.netplay.showOpenRoomDialog();
            },
            "Close": () => {
                this.netplayMenu.style.display = "none";
                if (this.netplay.updateList) this.netplay.updateList.stop();
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
            item.style.textAlign = "center";
            row.appendChild(item);
            return item;
        };
        thead.appendChild(row);
        addToHeader("Room Name").style.textAlign = "left";
        addToHeader("Players").style.width = "80px";
        addToHeader("").style.width = "80px";
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
        };
        thead2.appendChild(row2);
        addToHeader2("Player").style.width = "80px";
        addToHeader2("Name");
        addToHeader2("").style.width = "80px";
        table2.appendChild(thead2);

        const tbody2 = this.createElement("tbody");
        table2.appendChild(tbody2);

        joined.appendChild(title2);
        joined.appendChild(password);
        joined.appendChild(table2);

        const chatWrap = this.createElement("div");
        chatWrap.classList.add("ejs_netplay_chat_container");
        chatWrap.style.marginTop = "10px";

        const chatHeaderRow = this.createElement("div");
        chatHeaderRow.classList.add("ejs_netplay_chat_header_row");
        chatWrap.appendChild(chatHeaderRow);

        const chatTitle = this.createElement("strong");
        chatTitle.innerText = this.localization("Chat");
        chatHeaderRow.appendChild(chatTitle);

        const chatHint = this.createElement("span");
        chatHint.classList.add("ejs_netplay_chat_hint");
        chatHint.innerText = this.localization("Everyone or private");
        chatHeaderRow.appendChild(chatHint);

        const chatLog = this.createElement("div");
        chatLog.classList.add("ejs_netplay_chat_log");
        chatWrap.appendChild(chatLog);

        const chatRow = this.createElement("div");
        chatRow.classList.add("ejs_netplay_chat_row");
        chatWrap.appendChild(chatRow);

        const chatTo = this.createElement("select");
        chatTo.classList.add("ejs_netplay_chat_to");
        const optAll = document.createElement("option");
        optAll.value = "all";
        optAll.innerText = this.localization("Everyone");
        chatTo.appendChild(optAll);
        chatRow.appendChild(chatTo);

        const chatInput = this.createElement("input");
        chatInput.type = "text";
        chatInput.maxLength = 300;
        chatInput.placeholder = this.localization("Type a message...");
        chatInput.classList.add("ejs_netplay_chat_input");
        chatRow.appendChild(chatInput);

        const chatSend = this.createElement("button");
        chatSend.classList.add("ejs_button_button");
        chatSend.style.height = "34px";
        chatSend.style.minWidth = "70px";
        chatSend.innerText = this.localization("Send");
        chatRow.appendChild(chatSend);

        joined.appendChild(chatWrap);

        joined.style.display = "none";
        body.appendChild(rooms);
        body.appendChild(joined);

        this.openNetplayMenu = () => {
            if (this.netplayShowTurnWarning && !this.netplayWarningShown) {
                const warningDiv = this.createElement("div");
                warningDiv.className = "ejs_netplay_warning";
                warningDiv.innerText = "Warning: No TURN server configured. Netplay connections may fail.";
                const menuBody = this.netplayMenu.querySelector(".ejs_popup_body");
                if (menuBody) {
                    menuBody.prepend(warningDiv);
                    this.netplayWarningShown = true;
                }
            }

            this.netplayMenu.style.display = "";

            this.netplay = {
                table: tbody,
                playerTable: tbody2,
                passwordElem: password,
                roomNameElem: title2,
                createButton: createButton,
                tabs: [rooms, joined],

                chatWrap,
                chatLog,
                chatTo,
                chatInput,
                chatSend,

                ...this.netplay
            };

            if (!this.netplay.name) {
                const popups = this.createSubPopup();
                this.netplayMenu.appendChild(popups[0]);
                popups[1].classList.add("ejs_cheat_parent");
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

                const buttonRow = this.createElement("div");
                buttonRow.style.display = "flex";
                buttonRow.style.justifyContent = "center";
                buttonRow.style.gap = "10px";
                popup.appendChild(buttonRow);

                const submit = this.createElement("button");
                submit.classList.add("ejs_button_button", "ejs_popup_submit");
                submit.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                submit.innerText = this.localization("Submit");
                buttonRow.appendChild(submit);

                const cancel = this.createElement("button");
                cancel.classList.add("ejs_button_button", "ejs_popup_submit");
                cancel.innerText = this.localization("Cancel");
                buttonRow.appendChild(cancel);

                const closeNamePopup = () => popups[0].remove();

                this.addEventListener(submit, "click", () => {
                    if (!input.value.trim()) return;
                    this.netplay.name = input.value.trim();
                    closeNamePopup();
                });

                this.addEventListener(cancel, "click", () => {
                    closeNamePopup();
                    this.netplayMenu.style.display = "none";
                    if (this.netplay.updateList) this.netplay.updateList.stop();
                });

                this.addEventListener(input, "keydown", (e) => {
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

            if (typeof this.netplay.updateList !== "function") {
                this.defineNetplayFunctions();
            }

            if (this.netplayBindChatUI) this.netplayBindChatUI();
            if (this.netplayChatRefreshRecipients) this.netplayChatRefreshRecipients();

            this.netplay.updateList.start();
        };
    },

    defineNetplayFunctions() {
        this.netplay = this.netplay || {};

        const guid = () => {
            const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
            return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
        };

        const log = (role, ...args) => {
            if (this.debug) console.log("[NETPLAY " + role + "]", ...args);
        };

        this.getNativeResolution = () => {
            try {
                if (this.Module && this.Module.getNativeResolution) {
                    return this.Module.getNativeResolution();
                }
            } catch (e) {}
            return { width: 640, height: 480 };
        };

        this.netplayGetUserIndex = () => {
            if (!this.isNetplay || !this.netplay || !this.netplay.players || !this.netplay.playerID) return 0;
            const idx = Object.keys(this.netplay.players).indexOf(this.netplay.playerID);
            return idx === -1 ? 0 : idx;
        };

        this.netplayEnsureRemoteAudioElement = (peerId) => {
            this.netplay.remoteAudioElements = this.netplay.remoteAudioElements || {};

            const id = "ejs-remote-audio-" + peerId;
            let el = this.netplay.remoteAudioElements[peerId] || document.getElementById(id);

            if (!el) {
                el = document.createElement("audio");
                el.id = id;
                el.autoplay = true;
                el.playsInline = true;
                el.style.display = "none";
                document.body.appendChild(el);
                this.netplay.remoteAudioElements[peerId] = el;
            }

            el.muted = false;
            el.volume = this.muted ? 0 : (typeof this.volume === "number" ? this.volume : 1);

            return el;
        };

        this.netplayArmGuestAudioUnlock = () => {
            if (!this.isNetplay || (this.netplay && this.netplay.owner)) return;
            if (this.netplay._audioUnlockArmed) return;

            this.netplay._audioUnlockArmed = true;

            const tryPlayAll = () => {
                try {
                    const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
                    els.forEach((a) => {
                        a.muted = false;
                        a.volume = this.muted ? 0 : (typeof this.volume === "number" ? this.volume : 1);
                        a.play().catch(() => {});
                    });
                } catch (e) {}
                cleanup();
            };

            const cleanup = () => {
                if (!this.netplay._audioUnlockArmed) return;
                this.netplay._audioUnlockArmed = false;

                document.removeEventListener("pointerdown", tryPlayAll, true);
                document.removeEventListener("touchend", tryPlayAll, true);
                document.removeEventListener("keydown", tryPlayAll, true);
            };

            document.addEventListener("pointerdown", tryPlayAll, true);
            document.addEventListener("touchend", tryPlayAll, true);
            document.addEventListener("keydown", tryPlayAll, true);

            this.netplay._audioUnlockCleanup = cleanup;
        };

        this.netplayChooseStreamSize = () => {
            const fps = (this.config && this.config.netplayFps) || window.EJS_netplayFps || 30;

            const override = (this.config && this.config.netplayStream) || window.EJS_netplayStream;
            if (override && typeof override === "string") {
                const m = override.trim().match(/^(\d+)\s*x\s*(\d+)$/i);
                if (m) {
                    let ow = Math.max(2, parseInt(m[1], 10));
                    let oh = Math.max(2, parseInt(m[2], 10));
                    if (ow % 2) ow++;
                    if (oh % 2) oh++;
                    return { w: ow, h: oh, fps: fps, mode: "override" };
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

            return { w: W, h: H, fps: fps, mode: "auto" };
        };

        this.netplayGetAnchorElement = () => {
            try {
                if (this.config && this.config.player) {
                    const el = document.querySelector(this.config.player);
                    if (el) return el;
                }
            } catch (e) {}
            return this.canvas || null;
        };

        this.netplayEnsureOverlay = () => {
            if (this.netplay._overlay && this.netplay._overlay.parentNode) return;

            const ov = document.createElement("div");
            ov.id = "ejs-netplay-overlay";
            ov.classList.add("ejs_netplay_overlay");
            this.elements.parent.appendChild(ov);
            this.netplay._overlay = ov;

            this.netplay._overlaySync = () => {
                this.netplaySyncOverlay(false);
            };
            window.addEventListener("resize", this.netplay._overlaySync, true);
            window.addEventListener("scroll", this.netplay._overlaySync, true);
            window.addEventListener("orientationchange", this.netplay._overlaySync, true);

            if (window.visualViewport) {
                this.netplay._vvSync = () => {
                    this.netplaySyncOverlay(false);
                };
                window.visualViewport.addEventListener("resize", this.netplay._vvSync, true);
                window.visualViewport.addEventListener("scroll", this.netplay._vvSync, true);
            }

            if (!this.netplay._overlayRO && window.ResizeObserver) {
                this.netplay._overlayRO = new ResizeObserver(() => {
                    this.netplaySyncOverlay(false);
                });
                try {
                    const anchor = this.netplayGetAnchorElement();
                    if (anchor) this.netplay._overlayRO.observe(anchor);
                    if (anchor && anchor.parentElement) this.netplay._overlayRO.observe(anchor.parentElement);
                } catch (e) {}
            }

            this.netplaySyncOverlay(true);
        };

        this.netplaySyncOverlay = (force) => {
            if (!this.netplayCanvas || !this.netplay._overlay) return;

            const anchor = this.netplayGetAnchorElement();
            if (!anchor || !anchor.getBoundingClientRect) return;

            const rect = anchor.getBoundingClientRect();
            if (!rect || rect.width <= 0 || rect.height <= 0) return;

            const dpr = window.devicePixelRatio || 1;

            const vv = window.visualViewport;
            const offX = vv ? vv.offsetLeft : 0;
            const offY = vv ? vv.offsetTop : 0;
            const vW = vv ? vv.width : window.innerWidth;
            const vH = vv ? vv.height : window.innerHeight;

            let cssW = Math.max(1, Math.round(rect.width));
            let cssH = Math.max(1, Math.round(rect.height));

            let left = rect.left + offX;
            let top = rect.top + offY;

            if (cssW > vW) cssW = Math.max(1, Math.round(vW));
            if (cssH > vH) cssH = Math.max(1, Math.round(vH));
            left = Math.max(0, Math.min(left, vW - cssW));
            top = Math.max(0, Math.min(top, vH - cssH));

            this.netplay.guestDisplayWidth = cssW;
            this.netplay.guestDisplayHeight = cssH;

            if (this.netplayCanvas.parentNode !== this.netplay._overlay) {
                this.netplay._overlay.appendChild(this.netplayCanvas);
            }

            this.netplayCanvas.style.position = "fixed";
            this.netplayCanvas.style.left = left + "px";
            this.netplayCanvas.style.top = top + "px";
            this.netplayCanvas.style.width = cssW + "px";
            this.netplayCanvas.style.height = cssH + "px";
            this.netplayCanvas.style.zIndex = "10000";
            this.netplayCanvas.style.pointerEvents = "none";
            this.netplayCanvas.style.background = "#000";
            this.netplayCanvas.style.imageRendering = "pixelated";

            const pxW = Math.max(1, Math.round(cssW * dpr));
            const pxH = Math.max(1, Math.round(cssH * dpr));
            if (force || this.netplayCanvas.width !== pxW || this.netplayCanvas.height !== pxH) {
                this.netplayCanvas.width = pxW;
                this.netplayCanvas.height = pxH;
            }
        };

        this.netplayDestroyOverlay = () => {
            if (this.netplay._overlaySync) {
                window.removeEventListener("resize", this.netplay._overlaySync, true);
                window.removeEventListener("scroll", this.netplay._overlaySync, true);
                window.removeEventListener("orientationchange", this.netplay._overlaySync, true);
                this.netplay._overlaySync = null;
            }
            if (this.netplay._vvSync && window.visualViewport) {
                window.visualViewport.removeEventListener("resize", this.netplay._vvSync, true);
                window.visualViewport.removeEventListener("scroll", this.netplay._vvSync, true);
                this.netplay._vvSync = null;
            }
            if (this.netplay._overlayRO) {
                try {
                    this.netplay._overlayRO.disconnect();
                } catch (e) {}
                this.netplay._overlayRO = null;
            }
            if (this.netplay._overlay && this.netplay._overlay.parentNode) {
                try {
                    this.netplay._overlay.parentNode.removeChild(this.netplay._overlay);
                } catch (e) {}
            }
            this.netplay._overlay = null;
        };

        this.netplayBoostGuestUIZ = () => {
            if (!this.isNetplay || this.netplay.owner) return;
            if (this.netplay._uiZBoosted) return;

            this.netplay._uiZBoosted = [];
            let root = null;
            
            if (!this.msgElem && typeof this.displayMessage === "function") {
                this.displayMessage("", 1);
            }

            try {
                root = (this.config && this.config.player) ? document.querySelector(this.config.player) : null;
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

                this.netplay._uiZBoosted.push({
                    el: el,
                    z: el.style.zIndex,
                    pos: el.style.position,
                    pe: el.style.pointerEvents
                });

                if (cs.position === "static") el.style.position = "relative";

                el.style.zIndex = "10002";
                el.style.pointerEvents = "auto";
            }
        };

        this.netplayRestoreGuestUIZ = () => {
            const list = this.netplay._uiZBoosted;
            if (!list) return;

            for (let i = 0; i < list.length; i++) {
                const item = list[i];
                if (!item || !item.el) continue;
                item.el.style.zIndex = item.z || "";
                item.el.style.position = item.pos || "";
                item.el.style.pointerEvents = item.pe || "";
            }

            this.netplay._uiZBoosted = null;
        };

        this.netplayFreezeGuest = () => {
            log("GUEST", "Freezing emulator...");

            this.netplay.frozen = this.netplay.frozen || { originals: {} };
            const orig = this.netplay.frozen.originals;

            if (this.gameManager) {
                try {
                    this.gameManager.toggleMainLoop(0);
                } catch (e) {}
                if (this.gameManager.pause) {
                    try {
                        this.gameManager.pause();
                    } catch (e) {}
                }
            }
            if (this.Module && this.Module.pauseMainLoop) {
                try {
                    this.Module.pauseMainLoop();
                } catch (e) {}
            }

            if (this.handleResize && !orig.handleResize) {
                orig.handleResize = this.handleResize;
                this.handleResize = (...args) => {
                    try {
                        orig.handleResize.apply(this, args);
                    } catch (e) {}
                    if (this.isNetplay && !this.netplay.owner) this.netplaySyncOverlay(true);
                };
            }

            if (this.gameManager && this.gameManager.audioNode) {
                try {
                    this.gameManager.audioNode.disconnect();
                } catch (e) {}
            }
            if (this.Module && this.Module.AL && this.Module.AL.currentCtx) {
                const ctx = this.Module.AL.currentCtx;
                if (ctx.sources) {
                    for (const id in ctx.sources) {
                        try {
                            ctx.sources[id].gain.gain.value = 0;
                        } catch (e) {}
                    }
                }
                if (ctx.audioCtx) {
                    ctx.audioCtx.suspend().catch(() => {});
                }
            }

            log("GUEST", "Emulator frozen");
        };

        this.netplayUnfreezeGuest = () => {
            if (!this.netplay.frozen) return;
            log("GUEST", "Unfreezing emulator...");

            const orig = this.netplay.frozen.originals || {};
            if (orig.handleResize) this.handleResize = orig.handleResize;

            if (this.Module && this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.audioCtx) {
                this.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
                const vol = this.muted ? 0 : this.volume;
                if (this.Module.AL.currentCtx.sources) {
                    for (const id in this.Module.AL.currentCtx.sources) {
                        try {
                            this.Module.AL.currentCtx.sources[id].gain.gain.value = vol;
                        } catch (e) {}
                    }
                }
            }
            if (this.gameManager && this.gameManager.audioNode && this.gameManager.audioContext) {
                try {
                    this.gameManager.audioNode.connect(this.gameManager.audioContext.destination);
                } catch (e) {}
            }

            if (this.Module && this.Module.resumeMainLoop) {
                try {
                    this.Module.resumeMainLoop();
                } catch (e) {}
            }
            if (this.gameManager) {
                try {
                    this.gameManager.toggleMainLoop(1);
                } catch (e) {}
            }

            this.netplay.frozen = null;
            log("GUEST", "Emulator unfrozen");
        };

        this.netplayRequestRenegotiate = (peerId, reason) => {
            try {
                if (!this.netplay || !this.netplay.socket || !this.netplay.socket.connected) return;
                log(this.netplay.owner ? "HOST" : "GUEST", "Request renegotiate (" + (reason || "unknown") + ") with " + peerId);
                this.netplay.socket.emit("webrtc-signal", { target: peerId, requestRenegotiate: true, reason: reason || "" });
            } catch (e) {}
        };

        this.netplayInitWebRTCStream = () => {
            if (this.netplay.localStream) return Promise.resolve();

            if (this.Module && this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.audioCtx) {
                this.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
            }

            return new Promise((resolve) => {
                if (!this.canvas || !this.canvas.captureStream) {
                    if (this.debug) console.error("[NETPLAY HOST] canvas.captureStream unavailable");
                    resolve();
                    return;
                }

                const chosen = this.netplayChooseStreamSize();
                const outW = chosen.w;
                const outH = chosen.h;
                const fps = chosen.fps;
                const outAspect = outW / outH;

                log("HOST", "Init stream (decoupled " + chosen.mode + ") " + outW + "x" + outH + " @ " + fps + "fps");

                let rawStream = null;
                try {
                    rawStream = this.canvas.captureStream(fps);
                } catch (e) {}
                if (!rawStream || !rawStream.getVideoTracks || !rawStream.getVideoTracks()[0]) {
                    if (this.debug) console.error("[NETPLAY HOST] No video track from canvas.captureStream()");
                    resolve();
                    return;
                }
                this.netplay._hostRawStream = rawStream;

                const srcVideo = document.createElement("video");
                srcVideo.muted = true;
                srcVideo.autoplay = true;
                srcVideo.playsInline = true;
                srcVideo.classList.add("ejs_netplay_offscreen");
                document.body.appendChild(srcVideo);
                this.netplay._hostSourceVideo = srcVideo;

                srcVideo.srcObject = rawStream;
                srcVideo.play().catch((err) => {
                    log("HOST", "source video play() warning:", err);
                });

                const cap = document.createElement("canvas");
                cap.width = outW;
                cap.height = outH;
                cap.classList.add("ejs_netplay_offscreen_canvas");
                document.body.appendChild(cap);
                this.netplay.captureCanvas = cap;

                const capCtx = cap.getContext("2d", { alpha: false });
                this.netplay.captureRunning = true;

                const drawToFixedCanvas = () => {
                    if (!this.netplay.captureRunning) return;

                    capCtx.fillStyle = "#000";
                    capCtx.fillRect(0, 0, outW, outH);

                    if (srcVideo.readyState >= 2 && srcVideo.videoWidth > 0 && srcVideo.videoHeight > 0) {
                        const srcW = srcVideo.videoWidth;
                        const srcH = srcVideo.videoHeight;
                        const srcAspect = srcW / srcH;

                        let sx = 0;
                        let sy = 0;
                        let sw = srcW;
                        let sh = srcH;

                        if (srcAspect > outAspect) {
                            sw = srcH * outAspect;
                            sx = (srcW - sw) / 2;
                        } else if (srcAspect < outAspect) {
                            sh = srcW / outAspect;
                            const portraitish = (srcH / srcW) >= 1.25;
                            sy = portraitish ? 0 : (srcH - sh) / 2;

                            if (sy < 0) sy = 0;
                            if (sy + sh > srcH) sy = srcH - sh;
                            if (sy < 0) sy = 0;
                        }

                        capCtx.imageSmoothingEnabled = true;
                        capCtx.drawImage(srcVideo, sx, sy, sw, sh, 0, 0, outW, outH);
                    }

                    requestAnimationFrame(drawToFixedCanvas);
                };
                requestAnimationFrame(drawToFixedCanvas);

                // --- DELEGATE AUDIO CAPTURE TO MAIN EMULATOR.JS FUNCTION ---
                if (typeof this.collectScreenRecordingMediaTracks === "function") {
                    
                    // Grab both video and audio tracks simultaneously using your existing logic
                    const finalStream = this.collectScreenRecordingMediaTracks(cap, fps);
                    
                    // Optimize video encoding detail for netplay
                    try {
                        const outVideoTrack = finalStream.getVideoTracks()[0];
                        if (outVideoTrack) outVideoTrack.contentHint = "detail";
                    } catch (e) {}

                    this.netplay.localStream = finalStream;
                    this.netplay._hostOutStream = finalStream; 
                    
                    log("HOST", "Stream ready - Video tracks: " + finalStream.getVideoTracks().length + ", Audio tracks: " + finalStream.getAudioTracks().length);
                } else {
                    if (this.debug) console.warn("[NETPLAY HOST] collectScreenRecordingMediaTracks missing! Fallback to video only.");
                    const fallbackStream = cap.captureStream(fps);
                    this.netplay.localStream = fallbackStream;
                    this.netplay._hostOutStream = fallbackStream;
                }

                resolve();
            });
        };

        this.netplayRoomJoined = (isOwner, roomName, password, roomId) => {
            log(isOwner ? "HOST" : "GUEST", "Room joined: " + roomName);

            if (this.updateNetplayUI) this.updateNetplayUI(true);

            this.isNetplay = true;
            this.netplay.inputs = {};
            this.netplay.owner = isOwner;

            if (this.netplay.roomNameElem) this.netplay.roomNameElem.innerText = roomName;
            if (this.netplay.tabs && this.netplay.tabs[0]) {
                this.netplay.tabs[0].style.display = "none";
                this.netplay.tabs[1].style.display = "";
            }
            if (this.netplay.passwordElem) {
                this.netplay.passwordElem.style.display = password ? "" : "none";
                this.netplay.passwordElem.innerText = password ? "Password: " + password : "";
            }
            if (this.netplay.createButton) this.netplay.createButton.innerText = this.localization("Leave Room");

            this.netplayUpdatePlayersTable();

            if (!isOwner) {
                const anchor = this.netplayGetAnchorElement();
                const rect = (anchor && anchor.getBoundingClientRect)
                    ? anchor.getBoundingClientRect()
                    : (this.canvas ? this.canvas.getBoundingClientRect() : { width: 640, height: 480 });

                const cssW = Math.max(1, Math.round(rect.width));
                const cssH = Math.max(1, Math.round(rect.height));
                const dpr = window.devicePixelRatio || 1;

                log("GUEST", "Display rect: " + cssW + "x" + cssH);

                this.netplayFreezeGuest();

                this.netplay._restoreCanvasStyle = {
                    opacity: this.canvas ? this.canvas.style.opacity : "",
                    pointerEvents: this.canvas ? this.canvas.style.pointerEvents : "",
                    visibility: this.canvas ? this.canvas.style.visibility : ""
                };

                this.netplayCanvas = document.createElement("canvas");
                this.netplayCanvas.id = "ejs-netplay-canvas";
                this.netplayCanvas.width = Math.max(1, Math.round(cssW * dpr));
                this.netplayCanvas.height = Math.max(1, Math.round(cssH * dpr));
                this.netplayCanvas.classList.add("ejs_netplay_canvas");
                this.netplayCanvas.style.width = cssW + "px";
                this.netplayCanvas.style.height = cssH + "px";

                this.netplayEnsureOverlay();
                this.netplaySyncOverlay(true);

                this.netplayBoostGuestUIZ();

                if (this.canvas) {
                    this.canvas.style.opacity = "0";
                    this.canvas.style.visibility = "visible";
                    this.canvas.style.pointerEvents = "";
                }

                const ctx = this.netplayCanvas.getContext("2d", { alpha: false });
                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, this.netplayCanvas.width, this.netplayCanvas.height);
                ctx.fillStyle = "#fff";
                ctx.font = (20 * dpr) + "px sans-serif";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText("Connecting...", this.netplayCanvas.width / 2, this.netplayCanvas.height / 2);

                if (this.gameManager && this.gameManager.functions && this.gameManager.functions.simulateInput) {
                    this.netplay.originalSimulateInput = this.gameManager.functions.simulateInput;
                    this.gameManager.functions.simulateInput = (player, index, value) => {
                        const pidx = this.netplayGetUserIndex();
                        const pcs = this.netplay.peerConnections;
                        for (const key in pcs) {
                            if (pcs[key] && pcs[key].dataChannel && pcs[key].dataChannel.readyState === "open") {
                                pcs[key].dataChannel.send(JSON.stringify({ player: pidx, index: index, value: value }));
                            }
                        }
                    };
                }

                if (this.elements.bottomBar && this.elements.bottomBar.cheat && this.elements.bottomBar.cheat[0]) {
                    this.netplay.oldCheatDisplay = this.elements.bottomBar.cheat[0].style.display;
                    this.elements.bottomBar.cheat[0].style.display = "none";
                }

                this.netplay._gotVideoEver = false;

                this.netplay.connectionTimeout = setTimeout(() => {
                    if (!this.netplay.webRtcReady && !this.netplay._gotVideoEver) {
                        this.displayMessage("Connection failed", 5000);
                        this.netplayLeaveRoom();
                    }
                }, 15000);

                log("GUEST", "Setup complete - waiting for stream");
            } else {
                log("HOST", "Setup complete");
                if (this.gameManager) {
                    try {
                        this.gameManager.toggleMainLoop(1);
                    } catch (e) {}
                }
            }
        };

        this.drawVideoToCanvas = () => {
            const video = this.netplay.video;
            const canvas = this.netplayCanvas;
            if (!video || !canvas) return;

            const ctx = canvas.getContext("2d", { alpha: false });
            if (!ctx) return;

            log("GUEST", "Starting draw loop");

            let running = true;
            let lockedAspect = null;
            let lastVideoSize = "";

            const draw = () => {
                if (!running || !this.isNetplay || this.netplay.owner) return;
                if (!canvas.parentNode) return;

                this.netplaySyncOverlay(false);

                const W = canvas.width;
                const H = canvas.height;

                ctx.fillStyle = "#000";
                ctx.fillRect(0, 0, W, H);

                if (video.readyState >= 2 && video.videoWidth > 0 && video.videoHeight > 0) {
                    const vs = video.videoWidth + "x" + video.videoHeight;
                    if (vs !== lastVideoSize) {
                        lastVideoSize = vs;
                        log("GUEST", "Video size: " + vs);
                    }

                    if (lockedAspect === null) {
                        lockedAspect = video.videoWidth / video.videoHeight;
                        log("GUEST", "Aspect locked: " + lockedAspect.toFixed(4));
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
                log("GUEST", "Video loadeddata");
                requestAnimationFrame(draw);
            };

            if (video.readyState >= 2) requestAnimationFrame(draw);

            this.netplay.stopDrawLoop = () => {
                running = false;
            };
        };

        this.netplayCreatePeerConnection = (peerId) => {
            const role = this.netplay.owner ? "HOST" : "GUEST";

            log(role, "Creating peer connection: " + peerId);

            const pc = new RTCPeerConnection({
                iceServers: this.config.netplayICEServers,
                iceCandidatePoolSize: 10
            });

            let dc;

            if (this.netplay.owner) {
                dc = pc.createDataChannel("inputs");
                dc.onmessage = (e) => {
                    const d = JSON.parse(e.data);
                    if (d.type === "host-left") {
                        this.displayMessage("Host left", 3000);
                        this.netplayLeaveRoom();
                        return;
                    }
                    const f = this.netplay.currentFrame || 0;
                    this.netplay.inputsData[f] = this.netplay.inputsData[f] || [];
                    this.netplay.inputsData[f].push({ frame: f, connected_input: [d.player, d.index, d.value] });
                    if (this.gameManager && this.gameManager.functions && this.gameManager.functions.simulateInput) {
                        this.gameManager.functions.simulateInput(d.player, d.index, d.value);
                    }
                };
            } else {
                pc.ondatachannel = (e) => {
                    dc = e.channel;
                    if (this.netplay.peerConnections[peerId]) this.netplay.peerConnections[peerId].dataChannel = dc;
                    dc.onmessage = (e) => {
                        const d = JSON.parse(e.data);
                        if (d.type === "host-left") {
                            this.displayMessage("Host left", 3000);
                            this.netplayLeaveRoom();
                        }
                    };
                };
            }

            if (this.netplay.owner && this.netplay.localStream) {
                const tracks = this.netplay.localStream.getTracks();
                log("HOST", "Adding " + tracks.length + " tracks");
                for (let i = 0; i < tracks.length; i++) {
                    pc.addTrack(tracks[i], this.netplay.localStream);
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

            this.netplay.peerConnections[peerId] = { pc: pc, dataChannel: dc };

            let gotStream = false;
            const streamTimeout = setTimeout(() => {
                if (!gotStream && !this.netplay.owner) {
                    log("GUEST", "Stream timeout -> request renegotiate");
                    this.netplayRequestRenegotiate(peerId, "stream-timeout");
                }
            }, 15000);

            pc.onicecandidate = (e) => {
                if (e.candidate) {
                    this.netplay.socket.emit("webrtc-signal", { target: peerId, candidate: e.candidate });
                }
            };

            pc.onconnectionstatechange = () => {
                log(role, "Connection: " + pc.connectionState);

                if (pc.connectionState === "connected") {
                    this.netplay.webRtcReady = true;
                    clearTimeout(this.netplay.connectionTimeout);
                    if (this.netplay._dcTimer) {
                        clearTimeout(this.netplay._dcTimer);
                        this.netplay._dcTimer = null;
                    }
                    return;
                }

                if (!this.netplay.owner) {
                    if (pc.connectionState === "failed") {
                        this.netplayRequestRenegotiate(peerId, "pc-failed");
                        return;
                    }
                    if (pc.connectionState === "disconnected") {
                        if (this.netplay._dcTimer) clearTimeout(this.netplay._dcTimer);
                        this.netplay._dcTimer = setTimeout(() => {
                            if (!this.isNetplay) return;
                            const pd = this.netplay.peerConnections[peerId];
                            if (!pd || !pd.pc) return;
                            if (pd.pc.connectionState === "disconnected") {
                                this.netplayRequestRenegotiate(peerId, "pc-disconnected");
                            }
                        }, 2500);
                    }
                } else {
                    if (pc.connectionState === "failed") {
                        try {
                            pc.close();
                        } catch (e) {}
                        delete this.netplay.peerConnections[peerId];
                        setTimeout(() => {
                            this.netplayCreatePeerConnection(peerId);
                        }, 1500);
                    }
                }
            };

            pc.ontrack = (e) => {
                if (this.netplay.owner) return;

                const t = e.track;
                log("GUEST", "Track received: " + t.kind);

                if (t.kind === "audio") {
                    try {
                        const stream = (e.streams && e.streams[0]) ? e.streams[0] : new MediaStream([t]);
                        const audioEl = this.netplayEnsureRemoteAudioElement(peerId);
                        audioEl.srcObject = stream;

                        const p = audioEl.play();
                        if (p && p.catch) {
                            p.catch(() => {
                                log("GUEST", "Audio autoplay blocked, arming user-gesture unlock");
                                this.netplayArmGuestAudioUnlock();
                            });
                        }
                    } catch (err) {
                        if (this.debug) console.error("[NETPLAY GUEST] Audio element error:", err);
                    }
                    return;
                }

                if (t.kind === "video") {
                    gotStream = true;
                    this.netplay._gotVideoEver = true;
                    clearTimeout(streamTimeout);
                    clearTimeout(this.netplay.connectionTimeout);
                    this.netplay.webRtcReady = true;

                    if (!this.netplay.video) {
                        this.netplay.video = document.createElement("video");
                        this.netplay.video.muted = true;
                        this.netplay.video.autoplay = true;
                        this.netplay.video.playsInline = true;
                        this.netplay.video.style.display = "none";
                    }

                    this.netplay.video.srcObject = (e.streams && e.streams[0]) ? e.streams[0] : new MediaStream([t]);
                    this.netplay.video.play().catch((err) => {
                        log("GUEST", "video.play() warning:", err);
                    });

                    this.drawVideoToCanvas();

                    t.onended = () => {
                        if (this.isNetplay) this.netplayRequestRenegotiate(peerId, "video-track-ended");
                    };
                }
            };

            if (this.netplay.owner && this.netplay.localStream) {
                log("HOST", "Creating offer...");
                pc.createOffer()
                    .then((o) => pc.setLocalDescription(o))
                    .then(() => {
                        this.netplay.socket.emit("webrtc-signal", { target: peerId, offer: pc.localDescription });
                    })
                    .catch((err) => {
                        if (this.debug) console.error("[NETPLAY HOST] Offer error:", err);
                    });
            }

            return pc;
        };

        this.netplayChatAppend = (payload) => {
            if (!this.netplay || !this.netplay.chatLog) return;

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

            this.netplay.chatLog.appendChild(line);
            this.netplay.chatLog.scrollTop = this.netplay.chatLog.scrollHeight;
        };

        this.netplayChatRefreshRecipients = () => {
            if (!this.netplay || !this.netplay.chatTo) return;

            const sel = this.netplay.chatTo;
            const prev = sel.value || "all";

            sel.innerHTML = "";
            const optAll = document.createElement("option");
            optAll.value = "all";
            optAll.innerText = this.localization("Everyone");
            sel.appendChild(optAll);

            const players = this.netplay.players || {};
            Object.keys(players).forEach((userid) => {
                const p = players[userid];
                const opt = document.createElement("option");
                opt.value = userid;
                opt.innerText = p.player_name || "Player";
                sel.appendChild(opt);
            });

            const stillExists = Array.from(sel.options).some((o) => o.value === prev);
            sel.value = stillExists ? prev : "all";
        };

        this.netplayChatSend = () => {
            if (!this.netplay || !this.netplay.socket || !this.netplay.socket.connected) return;
            if (!this.netplay.chatInput || !this.netplay.chatTo) return;

            const message = String(this.netplay.chatInput.value || "").trim();
            if (!message) return;

            const to = this.netplay.chatTo.value || "all";
            this.netplay.chatInput.value = "";

            const chatPayload = {
                player_name: this.netplay.name || "Player",
                message: message,
                to: to,
                from: this.netplay.playerID
            };

            this.netplayChatAppend(chatPayload);

            this.netplaySendMessage({ "chat-message": chatPayload });
        };

        this.netplayBindChatUI = () => {
            if (!this.netplay || this.netplay._chatBound) return;
            if (!this.netplay.chatSend || !this.netplay.chatInput) return;

            this.netplay._chatBound = true;

            this.addEventListener(this.netplay.chatSend, "click", () => {
                this.netplayChatSend();
            });
            this.addEventListener(this.netplay.chatInput, "keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    this.netplayChatSend();
                }
            });
        };

        this.netplayLeaveRoom = () => {
            if (this.netplay._leaving) return;
            this.netplay._leaving = true;

            log(this.netplay.owner ? "HOST" : "GUEST", "Leaving room");

            if (this.updateNetplayUI) this.updateNetplayUI(false);
            clearTimeout(this.netplay.connectionTimeout);
            if (this.netplay.stopDrawLoop) this.netplay.stopDrawLoop();

            this.netplayUnfreezeGuest();

            this.netplay.captureRunning = false;

            if (this.netplay.captureCanvas && this.netplay.captureCanvas.parentNode) {
                try {
                    this.netplay.captureCanvas.parentNode.removeChild(this.netplay.captureCanvas);
                } catch (e) {}
            }
            this.netplay.captureCanvas = null;

            if (this.netplay._hostSourceVideo) {
                try {
                    this.netplay._hostSourceVideo.srcObject = null;
                } catch (e) {}
                if (this.netplay._hostSourceVideo.parentNode) {
                    try {
                        this.netplay._hostSourceVideo.parentNode.removeChild(this.netplay._hostSourceVideo);
                    } catch (e) {}
                }
                this.netplay._hostSourceVideo = null;
            }

            if (this.netplay._hostRawStream) {
                try {
                    this.netplay._hostRawStream.getTracks().forEach((tr) => {
                        tr.stop();
                    });
                } catch (e) {}
                this.netplay._hostRawStream = null;
            }
            if (this.netplay._hostOutStream) {
                try {
                    this.netplay._hostOutStream.getTracks().forEach((tr) => {
                        tr.stop();
                    });
                } catch (e) {}
                this.netplay._hostOutStream = null;
            }

            this.netplayRestoreGuestUIZ();

            this.netplayDestroyOverlay();

            if (this.netplayCanvas && this.netplayCanvas.parentNode) {
                try {
                    this.netplayCanvas.parentNode.removeChild(this.netplayCanvas);
                } catch (e) {}
            }
            this.netplayCanvas = null;

            if (this.canvas && this.netplay._restoreCanvasStyle) {
                this.canvas.style.opacity = this.netplay._restoreCanvasStyle.opacity || "";
                this.canvas.style.pointerEvents = this.netplay._restoreCanvasStyle.pointerEvents || "";
                this.canvas.style.visibility = this.netplay._restoreCanvasStyle.visibility || "";
                this.netplay._restoreCanvasStyle = null;
            } else if (this.canvas) {
                this.canvas.style.opacity = "";
            }

            if (this.netplay.remoteAudioContext) {
                try {
                    this.netplay.remoteAudioContext.close();
                } catch (e) {}
                this.netplay.remoteAudioContext = null;
                this.netplay.remoteGainNode = null;
            }

            try {
                const els = document.querySelectorAll("audio[id^=\"ejs-remote-audio-\"]");
                els.forEach((a) => {
                    try {
                        a.pause();
                    } catch (e) {}
                    try {
                        a.srcObject = null;
                    } catch (e) {}
                    try {
                        a.remove();
                    } catch (e) {}
                });
            } catch (e) {}
            if (this.netplay.remoteAudioElements) this.netplay.remoteAudioElements = {};
            if (this.netplay._audioUnlockCleanup) {
                try {
                    this.netplay._audioUnlockCleanup();
                } catch (e) {}
                this.netplay._audioUnlockCleanup = null;
            }
            this.netplay._audioUnlockArmed = false;

            if (this.netplay.owner && this.netplaySendMessage) {
                try {
                    this.netplaySendMessage({ type: "host-left" });
                } catch (e) {}
            }

            if (this.netplay.socket) {
                try {
                    if (this.netplay.socket.connected) this.netplay.socket.emit("leave-room");
                    this.netplay.socket.disconnect();
                } catch (e) {}
                this.netplay.socket = null;
            }

            if (this.netplay.localStream) {
                try {
                    this.netplay.localStream.getTracks().forEach((tr) => {
                        tr.stop();
                    });
                } catch (e) {}
                this.netplay.localStream = null;
            }

            const pcs = this.netplay.peerConnections || {};
            for (const key in pcs) {
                if (pcs[key] && pcs[key].pc) {
                    try {
                        pcs[key].pc.close();
                    } catch (e) {}
                }
            }
            this.netplay.peerConnections = {};

            if (this.netplay.video) {
                try {
                    this.netplay.video.srcObject = null;
                } catch (e) {}
                this.netplay.video = null;
            }

            if (this.netplay.createButton) this.netplay.createButton.innerText = this.localization("Create Room");
            if (this.netplay.tabs) {
                this.netplay.tabs[0].style.display = "";
                this.netplay.tabs[1].style.display = "none";
            }
            if (this.netplay.roomNameElem) this.netplay.roomNameElem.innerText = "";
            if (this.netplay.passwordElem) this.netplay.passwordElem.style.display = "none";
            if (this.netplay.playerTable) this.netplay.playerTable.innerHTML = "";

            if (this.elements.bottomBar && this.elements.bottomBar.cheat && this.elements.bottomBar.cheat[0]) {
                this.elements.bottomBar.cheat[0].style.display = this.netplay.oldCheatDisplay || "";
            }

            if (this.netplay.originalSimulateInput && this.gameManager && this.gameManager.functions) {
                this.gameManager.functions.simulateInput = this.netplay.originalSimulateInput;
            }

            this.isNetplay = false;
            this.netplay.owner = false;
            this.netplay.players = {};
            this.netplay.playerID = null;
            this.netplay.webRtcReady = false;

            if (this.originalControls) {
                this.controls = JSON.parse(JSON.stringify(this.originalControls));
                this.originalControls = null;
            }

            setTimeout(() => {
                if (this.handleResize) this.handleResize();
            }, 100);

            this.displayMessage("Left room", 3000);
            this.netplay._leaving = false;
        };

        this.netplay.simulateInput = (player, index, value) => {
            if (!this.isNetplay || !this.gameManager || !this.gameManager.functions || !this.gameManager.functions.simulateInput) return;
            const pidx = this.netplayGetUserIndex();
            const f = this.netplay.currentFrame || 0;
            if (this.netplay.owner) {
                this.netplay.inputsData[f] = this.netplay.inputsData[f] || [];
                this.netplay.inputsData[f].push({ frame: f, connected_input: [pidx, index, value] });
                this.gameManager.functions.simulateInput(pidx, index, value);
            } else {
                this.gameManager.functions.simulateInput(pidx, index, value);
                if (this.netplaySendMessage) {
                    this.netplaySendMessage({ "sync-control": [{ frame: f + 20, connected_input: [pidx, index, value] }] });
                }
            }
        };

        this.netplayGetOpenRooms = () => {
            if (!this.netplay || !this.netplay.url) return Promise.resolve({});
            return fetch(this.netplay.url + "/list?domain=" + window.location.host + "&game_id=" + this.config.gameId)
                .then((res) => res.text())
                .then((text) => JSON.parse(text))
                .catch(() => ({}));
        };

        this.netplayUpdateTableList = () => {
            if (!this.netplay || !this.netplay.table) return Promise.resolve();
            return this.netplayGetOpenRooms().then((rooms) => {
                this.netplay.table.innerHTML = "";
                for (const k in rooms) {
                    ((id, r) => {
                        const row = this.createElement("tr");
                        row.classList.add("ejs_netplay_table_row");
                        const c1 = this.createElement("td");
                        c1.innerText = r.room_name;
                        c1.style.textAlign = "left";
                        c1.style.padding = "10px 0";
                        const c2 = this.createElement("td");
                        c2.innerText = r.current + "/" + r.max;
                        c2.style.width = "80px";
                        c2.style.textAlign = "center";
                        const c3 = this.createElement("td");
                        c3.style.width = "80px";
                        if (r.current < r.max) {
                            const btn = this.createElement("button");
                            btn.classList.add("ejs_netplay_join_button", "ejs_button_button");
                            btn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                            btn.innerText = this.localization("Join");
                            c3.appendChild(btn);
                            this.addEventListener(btn, "click", () => {
                                if (r.hasPassword) {
                                    this.netplayShowJoinPasswordDialog(id, r.room_name, r.max);
                                } else {
                                    this.netplayJoinRoom(id, r.room_name, r.max, null);
                                }
                            });
                        }
                        row.appendChild(c1);
                        row.appendChild(c2);
                        row.appendChild(c3);
                        this.netplay.table.appendChild(row);
                    })(k, rooms[k]);
                }
            }).catch(() => {});
        };

        this.netplayUpdateListStart = () => {
            this.netplay.updateListInterval = setInterval(() => {
                this.netplayUpdateTableList();
            }, 1000);
        };

        this.netplayUpdateListStop = () => {
            clearInterval(this.netplay.updateListInterval);
        };

        this.netplayShowOpenRoomDialog = () => {
            if (!this.createSubPopup) return;
            this.originalControls = JSON.parse(JSON.stringify(this.controls));
            const popups = this.createSubPopup();
            this.netplayMenu.appendChild(popups[0]);
            popups[1].classList.add("ejs_cheat_parent");
            const title = this.createElement("h2");
            title.innerText = this.localization("Create a room");
            title.classList.add("ejs_netplay_name_heading");
            popups[1].appendChild(title);
            const form = this.createElement("div");
            form.classList.add("ejs_netplay_header");
            const ni = this.createElement("input");
            ni.type = "text";
            ni.maxLength = 20;
            const ms = this.createElement("select");
            ["2", "3", "4"].forEach((v) => {
                const o = document.createElement("option");
                o.value = v;
                o.innerText = v;
                ms.appendChild(o);
            });
            const pw = this.createElement("input");
            pw.type = "text";
            pw.maxLength = 20;
            [["Room Name", ni], ["Max Players", ms], ["Password (optional)", pw]].forEach((item) => {
                const s = this.createElement("strong");
                s.innerText = this.localization(item[0]);
                form.appendChild(s);
                form.appendChild(this.createElement("br"));
                form.appendChild(item[1]);
            });
            popups[1].appendChild(form);
            const sub = this.createElement("button");
            sub.classList.add("ejs_button_button", "ejs_popup_submit");
            sub.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
            sub.style.margin = "10px";
            sub.innerText = this.localization("Submit");
            this.addEventListener(sub, "click", () => {
                const n = ni.value.trim();
                if (n) {
                    this.netplayOpenRoom(n, parseInt(ms.value, 10), pw.value.trim());
                    popups[0].remove();
                }
            });
            const cls = this.createElement("button");
            cls.classList.add("ejs_button_button", "ejs_popup_submit");
            cls.style.margin = "10px";
            cls.innerText = this.localization("Close");
            this.addEventListener(cls, "click", () => {
                popups[0].remove();
            });
            popups[1].appendChild(sub);
            popups[1].appendChild(cls);
        };

        this.netplayShowJoinPasswordDialog = (roomId, roomName, maxPlayers) => {
            if (!this.createSubPopup) return;

            const popups = this.createSubPopup();
            this.netplayMenu.appendChild(popups[0]);
            popups[1].classList.add("ejs_cheat_parent");

            const title = this.createElement("h2");
            title.innerText = this.localization("Enter Password");
            title.classList.add("ejs_netplay_name_heading");
            popups[1].appendChild(title);

            const form = this.createElement("div");
            form.classList.add("ejs_netplay_header");

            const roomLabel = this.createElement("div");
            roomLabel.classList.add("ejs_netplay_dialog_label");
            roomLabel.innerText = this.localization("Room") + ": " + roomName;
            form.appendChild(roomLabel);

            const pwLabel = this.createElement("strong");
            pwLabel.innerText = this.localization("Password");
            form.appendChild(pwLabel);
            form.appendChild(this.createElement("br"));

            const pwInput = this.createElement("input");
            pwInput.type = "password";
            pwInput.maxLength = 20;
            pwInput.placeholder = this.localization("Enter room password");
            form.appendChild(pwInput);

            popups[1].appendChild(form);

            const buttonRow = this.createElement("div");
            buttonRow.classList.add("ejs_netplay_dialog_buttons");

            const joinBtn = this.createElement("button");
            joinBtn.classList.add("ejs_button_button", "ejs_popup_submit");
            joinBtn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
            joinBtn.innerText = this.localization("Join");

            const cancelBtn = this.createElement("button");
            cancelBtn.classList.add("ejs_button_button", "ejs_popup_submit");
            cancelBtn.innerText = this.localization("Cancel");

            this.addEventListener(joinBtn, "click", () => {
                const pw = pwInput.value.trim();
                popups[0].remove();
                if (pw) {
                    this.netplayJoinRoom(roomId, roomName, maxPlayers, pw);
                }
            });

            this.addEventListener(cancelBtn, "click", () => {
                popups[0].remove();
            });

            this.addEventListener(pwInput, "keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    const pw = pwInput.value.trim();
                    popups[0].remove();
                    if (pw) {
                        this.netplayJoinRoom(roomId, roomName, maxPlayers, pw);
                    }
                }
                if (e.key === "Escape") {
                    popups[0].remove();
                }
            });

            buttonRow.appendChild(joinBtn);
            buttonRow.appendChild(cancelBtn);
            popups[1].appendChild(buttonRow);

            setTimeout(() => {
                pwInput.focus();
            }, 50);
        };

        this.netplayShowJoinErrorDialog = (roomId, roomName, maxPlayers, errorMessage, hadPassword) => {
            if (!this.createSubPopup) {
                this.displayMessage(this.localization("Join error") + ": " + errorMessage, 5000);
                return;
            }

            const popups = this.createSubPopup();
            this.netplayMenu.appendChild(popups[0]);
            popups[1].classList.add("ejs_cheat_parent");

            const title = this.createElement("h2");
            title.innerText = this.localization("Unable to Join");
            title.classList.add("ejs_netplay_name_heading");
            popups[1].appendChild(title);

            const content = this.createElement("div");
            content.classList.add("ejs_netplay_header");

            const roomLabel = this.createElement("div");
            roomLabel.classList.add("ejs_netplay_dialog_label");
            roomLabel.innerText = this.localization("Room") + ": " + roomName;
            content.appendChild(roomLabel);

            const errorBox = this.createElement("div");
            errorBox.classList.add("ejs_netplay_error_box");
            errorBox.innerText = errorMessage;
            content.appendChild(errorBox);

            popups[1].appendChild(content);

            const buttonRow = this.createElement("div");
            buttonRow.classList.add("ejs_netplay_dialog_buttons");

            if (hadPassword) {
                const retryBtn = this.createElement("button");
                retryBtn.classList.add("ejs_button_button", "ejs_popup_submit");
                retryBtn.style.backgroundColor = "rgba(var(--ejs-primary-color),1)";
                retryBtn.innerText = this.localization("Try Again");

                this.addEventListener(retryBtn, "click", () => {
                    popups[0].remove();
                    this.netplayShowJoinPasswordDialog(roomId, roomName, maxPlayers);
                });

                buttonRow.appendChild(retryBtn);
            }

            const closeBtn = this.createElement("button");
            closeBtn.classList.add("ejs_button_button", "ejs_popup_submit");
            closeBtn.innerText = this.localization("Close");

            this.addEventListener(closeBtn, "click", () => {
                popups[0].remove();
            });

            buttonRow.appendChild(closeBtn);
            popups[1].appendChild(buttonRow);
        };

        this.netplayStartSocketIO = (cb) => {
            this.netplayUnlockMobileAudio = this.netplayUnlockMobileAudio || (() => {
                const ctx = this.Module && this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.audioCtx;
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
            });

            this.netplayChatAppend = this.netplayChatAppend || ((payload) => {
                if (!this.netplay || !this.netplay.chatLog) return;

                const name = (payload && payload.player_name) ? payload.player_name : "Player";
                const msg = (payload && payload.message) ? payload.message : "";
                const to = (payload && payload.to) ? payload.to : "all";
                const isPrivate = to && to !== "all";

                const line = document.createElement("div");
                line.style.margin = "2px 0";

                line.textContent = isPrivate ? (name + " (private): " + msg) : (name + ": " + msg);

                this.netplay.chatLog.appendChild(line);
                this.netplay.chatLog.scrollTop = this.netplay.chatLog.scrollHeight;
            });

            this.netplayChatRefreshRecipients = this.netplayChatRefreshRecipients || (() => {
                if (!this.netplay || !this.netplay.chatTo) return;

                const sel = this.netplay.chatTo;
                const prev = sel.value || "all";

                sel.innerHTML = "";

                const optAll = document.createElement("option");
                optAll.value = "all";
                optAll.innerText = this.localization ? this.localization("Everyone") : "Everyone";
                sel.appendChild(optAll);

                const players = (this.netplay && this.netplay.players) ? this.netplay.players : {};
                Object.keys(players).forEach((userid) => {
                    const p = players[userid];
                    const opt = document.createElement("option");
                    opt.value = userid;
                    opt.innerText = (p && p.player_name) ? p.player_name : "Player";
                    sel.appendChild(opt);
                });

                const exists = Array.from(sel.options).some((o) => o.value === prev);
                sel.value = exists ? prev : "all";
            });

            this.netplayBindChatUI = this.netplayBindChatUI || (() => {
                if (!this.netplay || this.netplay._chatBound) return;
                if (!this.netplay.chatSend || !this.netplay.chatInput) return;

                this.netplay._chatBound = true;

                this.addEventListener(this.netplay.chatSend, "click", () => {
                    this.netplayChatSend();
                });

                this.addEventListener(this.netplay.chatInput, "keydown", (e) => {
                    if (e.key === "Enter") {
                        e.preventDefault();
                        this.netplayChatSend();
                    }
                });
            });

            if (typeof io === "undefined") {
                this.displayMessage("Socket.IO unavailable", 5000);
                return;
            }
            if (this.netplay.socket && this.netplay.socket.connected) {
                cb();
                return;
            }
            if (!this.netplay.url) {
                this.displayMessage("Network error", 5000);
                return;
            }

            this.netplay.previousPlayers = {};
            this.netplay.socket = io(this.netplay.url);

            this.netplay.socket.on("connect", () => {
                this.netplayBindChatUI();
                cb();
            });

            this.netplay.socket.on("connect_error", (e) => {
                this.displayMessage("Connect error: " + e.message, 5000);
            });

            this.netplay.socket.on("disconnect", () => {
                this.netplayLeaveRoom();
            });            

            this.netplay.socket.on("users-updated", (users) => {
                const pv = Object.keys(this.netplay.previousPlayers || {});
                const cu = Object.keys(users || {});
                cu.forEach((id) => {
                    if (pv.indexOf(id) === -1 && id !== this.netplay.playerID) {
                        this.displayMessage((users[id].player_name || "Player") + " joined");
                    }
                });
                pv.forEach((id) => {
                    if (cu.indexOf(id) === -1) {
                        this.displayMessage((this.netplay.previousPlayers[id].player_name || "Player") + " left");
                    }
                });

                this.netplay.previousPlayers = users;
                this.netplay.players = users;

                this.netplayUpdatePlayersTable();

                this.netplayChatRefreshRecipients();

                if (this.netplay.owner) {
                    this.netplayInitWebRTCStream().then(() => {
                        Object.keys(users).forEach((pid) => {
                            if (pid !== this.netplay.playerID) {
                                const sid = users[pid].socketId;
                                if (sid && !this.netplay.peerConnections[sid]) {
                                    this.netplayCreatePeerConnection(sid);
                                }
                            }
                        });
                    });
                }
            });

            this.netplay.socket.on("data-message", (d) => {
                this.netplayDataMessage(d);
            });

            this.netplay.socket.on("webrtc-signal", (data) => {
                const sender = data.sender;
                const offer = data.offer;
                const answer = data.answer;
                const candidate = data.candidate;
                const requestRenegotiate = data.requestRenegotiate;

                if (requestRenegotiate && this.netplay.owner && sender) {
                    if (this.debug) console.log("[NETPLAY HOST] Renegotiate requested by " + sender + " (" + (data.reason || "") + ")");
                    try {
                        if (this.netplay.peerConnections[sender] && this.netplay.peerConnections[sender].pc) {
                            this.netplay.peerConnections[sender].pc.close();
                        }
                    } catch (e) {}
                    delete this.netplay.peerConnections[sender];

                    this.netplayInitWebRTCStream().then(() => {
                        this.netplayCreatePeerConnection(sender);
                    });
                    return;
                }

                if (!sender) return;

                let pd = this.netplay.peerConnections[sender];
                if (!pd) {
                    pd = { pc: this.netplayCreatePeerConnection(sender), iceCandidateQueue: [] };
                    this.netplay.peerConnections[sender] = pd;
                }
                pd.iceCandidateQueue = pd.iceCandidateQueue || [];
                const pc = pd.pc;

                if (offer) {
                    pc.setRemoteDescription(new RTCSessionDescription(offer)).then(() => {
                        pd.iceCandidateQueue.forEach((c) => {
                            pc.addIceCandidate(new RTCIceCandidate(c));
                        });
                        pd.iceCandidateQueue = [];
                        return pc.createAnswer();
                    }).then((ans) => pc.setLocalDescription(ans))
                    .then(() => {
                        this.netplay.socket.emit("webrtc-signal", { target: sender, answer: pc.localDescription });
                    }).catch((err) => {
                        if (this.debug) console.error("[NETPLAY GUEST] Answer error:", err);
                    });

                } else if (answer) {
                    pc.setRemoteDescription(new RTCSessionDescription(answer)).then(() => {
                        pd.iceCandidateQueue.forEach((c) => {
                            pc.addIceCandidate(new RTCIceCandidate(c));
                        });
                        pd.iceCandidateQueue = [];
                    }).catch((err) => {
                        if (this.debug) console.error("[NETPLAY HOST] Set answer error:", err);
                    });

                } else if (candidate) {
                    if (pc.remoteDescription) {
                        pc.addIceCandidate(new RTCIceCandidate(candidate)).catch(() => {});
                    } else {
                        pd.iceCandidateQueue.push(candidate);
                    }
                }
            });
        };

        this.netplayUpdatePlayersTable = () => {
            if (!this.netplay.playerTable) return;
            this.netplay.playerTable.innerHTML = "";
            let i = 0;
            const keys = Object.keys(this.netplay.players || {});
            keys.forEach((k) => {
                const row = this.createElement("tr");
                const values = [i + 1, this.netplay.players[k].player_name || "Unknown", i === 0 ? keys.length + "/" + (this.netplay.maxPlayers || "?") : ""];
                values.forEach((t) => {
                    const td = this.createElement("td");
                    td.innerText = t;
                    row.appendChild(td);
                });
                this.netplay.playerTable.appendChild(row);
                i++;
            });
            this.netplayChatRefreshRecipients();
        };

        this.netplayOpenRoom = (rn, mp, pw) => {
            if (this.netplayUnlockMobileAudio) this.netplayUnlockMobileAudio();

            if (this.Module && this.Module.AL && this.Module.AL.currentCtx && this.Module.AL.currentCtx.audioCtx) {
                this.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
            }

            const sid = guid();
            this.netplay.playerID = guid();
            this.netplay.players = {};
            this.netplay.maxPlayers = mp;
            this.netplay.extra = {
                domain: window.location.host,
                game_id: this.config.gameId,
                room_name: rn,
                player_name: this.netplay.name,
                userid: this.netplay.playerID,
                sessionid: sid
            };
            this.netplay.players[this.netplay.playerID] = this.netplay.extra;
            this.netplay.owner = true;

            this.netplayStartSocketIO(() => {
                this.netplay.socket.emit("open-room", { extra: this.netplay.extra, maxPlayers: mp, password: pw }, (e) => {
                    if (e) {
                        this.displayMessage("Room error: " + e, 5000);
                        return;
                    }
                    this.netplayRoomJoined(true, rn, pw, sid);
                });
            });
        };

        this.netplayJoinRoom = (sid, rn, mp, pw) => {
            if (this.netplayUnlockMobileAudio) this.netplayUnlockMobileAudio();
            this.netplay.playerID = guid();
            this.netplay.players = {};
            this.netplay.maxPlayers = mp;
            this.netplay.extra = {
                domain: window.location.host,
                game_id: this.config.gameId,
                room_name: rn,
                player_name: this.netplay.name,
                userid: this.netplay.playerID,
                sessionid: sid
            };
            this.netplay.players[this.netplay.playerID] = this.netplay.extra;
            this.netplay.owner = false;

            this.netplayStartSocketIO(() => {
                this.netplay.socket.emit("join-room", { extra: this.netplay.extra, password: pw }, (e, u) => {
                    if (e) {
                        this.netplayShowJoinErrorDialog(sid, rn, mp, e, !!pw);
                        return;
                    }
                    this.netplay.players = u;
                    this.netplayRoomJoined(false, rn, pw, sid);
                });
            });
        };

        this.netplayDataMessage = (d) => {
            if (d["chat-message"]) {
                const chat = d["chat-message"];
                const to = chat.to || "all";
                const from = chat.from || "";

                if (to !== "all" && to !== this.netplay.playerID) return;

                if (from === this.netplay.playerID) return;

                this.netplayChatAppend(chat);

                try {
                    const name = chat.player_name || "Player";
                    const msg = chat.message || "";
                    const typing = this.netplay &&
                        this.netplay.chatInput &&
                        document.activeElement === this.netplay.chatInput;

                    if (!typing && this.displayMessage) {
                        const prefix = (to !== "all") ? "(private) " : "";
                        this.displayMessage(prefix + name + ": " + msg, 4500);
                    }
                } catch (e) {}
                return;
            }

            if (d["sync-control"]) {
                d["sync-control"].forEach((v) => {
                    const f = parseInt(v.frame, 10);
                    if (!v.connected_input || v.connected_input[0] < 0) return;
                    this.netplay.inputsData[f] = this.netplay.inputsData[f] || [];
                    this.netplay.inputsData[f].push(v);
                    this.netplaySendMessage({ frameAck: f });
                    if (this.netplay.owner && this.gameManager && this.gameManager.functions && this.gameManager.functions.simulateInput) {
                        this.gameManager.functions.simulateInput(v.connected_input[0], v.connected_input[1], v.connected_input[2]);
                    }
                });
            }
        };

        this.netplaySendMessage = (d) => {
            if (this.netplay.socket && this.netplay.socket.connected) {
                this.netplay.socket.emit("data-message", d);
            }
        };

        this.netplayReset = () => {
            this.netplay.init_frame = this.gameManager ? this.gameManager.getFrameNum() : 0;
            this.netplay.currentFrame = 0;
            this.netplay.inputsData = {};
        };

        this.netplayInitModulePostMainLoop = () => {
            if (this.isNetplay && !this.netplay.owner) return;
            this.netplay.currentFrame = (this.gameManager ? this.gameManager.getFrameNum() : 0) - (this.netplay.init_frame || 0);
            if (!this.isNetplay || !this.netplay.owner) return;

            const i = this.netplay.currentFrame;
            if (this.netplay.inputsData[i]) {
                const ts = this.netplay.inputsData[i].map((v) => {
                    if (this.gameManager && this.gameManager.functions && this.gameManager.functions.simulateInput) {
                        this.gameManager.functions.simulateInput(v.connected_input[0], v.connected_input[1], v.connected_input[2]);
                    }
                    return { frame: i + 20, connected_input: v.connected_input };
                });
                this.netplaySendMessage({ "sync-control": ts });
                delete this.netplay.inputsData[i];
            }
        };

        this.netplay.updateList = { start: this.netplayUpdateListStart.bind(this), stop: this.netplayUpdateListStop.bind(this) };
        this.netplay.showOpenRoomDialog = this.netplayShowOpenRoomDialog.bind(this);
        this.netplay.openRoom = this.netplayOpenRoom.bind(this);
        this.netplay.joinRoom = this.netplayJoinRoom.bind(this);
        this.netplay.leaveRoom = this.netplayLeaveRoom.bind(this);
        this.netplay.sendMessage = this.netplaySendMessage.bind(this);
        this.netplay.updatePlayersTable = this.netplayUpdatePlayersTable.bind(this);
        this.netplay.createPeerConnection = this.netplayCreatePeerConnection.bind(this);
        this.netplay.initWebRTCStream = this.netplayInitWebRTCStream.bind(this);
        this.netplay.roomJoined = this.netplayRoomJoined.bind(this);
        this.netplay.reset = this.netplayReset.bind(this);

        this.netplay.init_frame = 0;
        this.netplay.currentFrame = 0;
        this.netplay.inputsData = {};
        this.netplay.webRtcReady = false;
        this.netplay.peerConnections = {};

        this.netplay.url = this.config.netplayUrl || window.EJS_netplayUrl;
        if (!this.netplay.url) {
            this.displayMessage("Netplay URL not configured", 5000);
            return;
        }
        while (this.netplay.url.endsWith("/")) {
            this.netplay.url = this.netplay.url.slice(0, -1);
        }

        if (this.gameManager && this.gameManager.Module) {
            this.gameManager.Module.postMainLoop = this.netplayInitModulePostMainLoop.bind(this);
        } else if (this.Module) {
            this.Module.postMainLoop = this.netplayInitModulePostMainLoop.bind(this);
        }
    }

};
import { EJS_UTILS } from "./utils.js";

/**
 * Netplay — owns all netplay state and logic.
 *
 * Receives a reference to the host EmulatorJS instance so it can read
 * config, canvas, gameManager, etc.  Nothing is bolted onto EmulatorJS's
 * prototype; the emulator simply holds `this.netplay = new Netplay(this)`.
 */
export class Netplay {

    /* ------------------------------------------------------------------ */
    /*  Construction                                                       */
    /* ------------------------------------------------------------------ */

    /**
     * @param {EmulatorJS} emu - Back-reference to the host emulator instance.
     */
    constructor(emu) {
        /** @type {EmulatorJS} */
        this.emu = emu;

        /** @type {EJS_UTILS} */
        this.utils = new EJS_UTILS();

        /** @type {string|null} Player display name. */
        this.name = null;

        /** @type {string|null} Unique player identifier for this session. */
        this.playerID = null;

        /** @type {Object<string, Object>} Map of playerID → player info. */
        this.players = {};

        /** @type {Object<string, Object>} Snapshot of players from previous update. */
        this.previousPlayers = {};

        /** @type {number} Maximum players allowed in the room. */
        this.maxPlayers = 0;

        /** @type {boolean} True if this client is the room host. */
        this.owner = false;

        /** @type {Object|null} Extra metadata sent with room events. */
        this.extra = null;

        /** @type {string|null} Netplay signaling server URL. */
        this.url = null;

        /** @type {Object|null} Socket.IO socket instance. */
        this.socket = null;

        /** @type {Object<string, {pc: RTCPeerConnection, dataChannel?: RTCDataChannel, iceCandidateQueue?: Array}>} */
        this.peerConnections = {};

        /** @type {boolean} True once a WebRTC connection is established. */
        this.webRtcReady = false;

        /** @type {MediaStream|null} Host's outgoing media stream. */
        this.localStream = null;

        /** @type {number} Frame number at the start of the netplay session. */
        this.initFrame = 0;

        /** @type {number} Current frame offset within the netplay session. */
        this.currentFrame = 0;

        /** @type {Object<number, Array>} Buffered input data keyed by frame. */
        this.inputsData = {};

        /** @type {Object} Active netplay inputs. */
        this.inputs = {};

        /** @type {Function|null} Original simulateInput before netplay override. */
        this.originalSimulateInput = null;

        /** @type {HTMLCanvasElement|null} Off-screen capture canvas (host). */
        this.captureCanvas = null;

        /** @type {boolean} Whether the host capture loop is running. */
        this.captureRunning = false;

        /** @type {HTMLVideoElement|null} Video element receiving the host stream (guest). */
        this.video = null;

        /** @type {HTMLCanvasElement|null} Canvas used to render received stream (guest). */
        this.canvas = null;

        /** @type {Object<string, HTMLAudioElement>} Remote audio elements keyed by peer ID. */
        this.remoteAudioElements = {};

        /** @type {HTMLElement|null} Room-list table body. */
        this.table = null;

        /** @type {HTMLElement|null} In-room player-list table body. */
        this.playerTable = null;

        /** @type {HTMLElement|null} Password display element. */
        this.passwordElem = null;

        /** @type {HTMLElement|null} Room name heading element. */
        this.roomNameElem = null;

        /** @type {HTMLElement|null} "Create Room" / "Leave Room" button. */
        this.createButton = null;

        /** @type {HTMLElement[]|null} [roomsDiv, joinedDiv] tab pair. */
        this.tabs = null;

        /** @type {HTMLElement|null} Chat container wrapper. */
        this.chatWrap = null;

        /** @type {HTMLElement|null} Chat message log element. */
        this.chatLog = null;

        /** @type {HTMLSelectElement|null} Chat recipient dropdown. */
        this.chatTo = null;

        /** @type {HTMLInputElement|null} Chat text input. */
        this.chatInput = null;

        /** @type {HTMLButtonElement|null} Chat send button. */
        this.chatSendBtn = null;

        /** @type {boolean} Whether chat event listeners have been bound. */
        this._chatBound = false;

        /** @type {HTMLElement|null} Overlay container for the guest canvas. */
        this._overlay = null;

        /** @type {Function|null} Bound resize/scroll listener for overlay sync. */
        this._overlaySync = null;

        /** @type {ResizeObserver|null} Observer for anchor element resizes. */
        this._overlayRO = null;

        /** @type {Function|null} Bound visualViewport listener. */
        this._vvSync = null;

        /** @type {Array|null} Saved z-index/position/pointerEvents for boosted UI elements. */
        this._uiZBoosted = null;

        /** @type {Object|null} Frozen emulator state (guest). */
        this.frozen = null;

        /** @type {Object|null} Saved canvas inline styles before guest takeover. */
        this._restoreCanvasStyle = null;

        /** @type {boolean} Whether any video track has ever been received. */
        this._gotVideoEver = false;

        /** @type {number|null} Connection timeout handle. */
        this.connectionTimeout = null;

        /** @type {boolean} Guard against re-entrant leaveRoom calls. */
        this._leaving = false;

        /** @type {number|null} Disconnected-state debounce timer. */
        this._dcTimer = null;

        /** @type {MediaStream|null} Raw stream from canvas.captureStream (host). */
        this._hostRawStream = null;

        /** @type {MediaStream|null} Final composed output stream (host). */
        this._hostOutStream = null;

        /** @type {HTMLVideoElement|null} Off-screen source video element (host). */
        this._hostSourceVideo = null;

        /** @type {boolean} Whether the guest audio-unlock listeners are armed. */
        this._audioUnlockArmed = false;

        /** @type {Function|null} Cleanup callback for guest audio-unlock listeners. */
        this._audioUnlockCleanup = null;

        /** @type {AudioContext|null} Audio context used for remote audio routing. */
        this.remoteAudioContext = null;

        /** @type {GainNode|null} Gain node applied to remote audio (guest). */
        this.remoteGainNode = null;

        /** @type {GainNode|null} Compensation gain node to keep stream audio level constant when host changes local volume. */
        this.streamCompensationGain = null;

        /** @type {MediaStreamAudioDestinationNode|null} Audio destination for the outgoing stream. */
        this.audioDestination = null;

        /** @type {boolean} Whether the stream gain is connected to the audio destination. */
        this._streamGainConnectedToDest = false;

        /** @type {boolean} Whether the audio-tap retry interval has been started. */
        this._audioTapRetryStarted = false;

        /** @type {WeakSet|null} Set of source gain nodes already connected to the stream gain. */
        this._connectedSourceGains = null;

        /** @type {boolean} Whether the OpenAL master gain has been tapped. */
        this._alMasterConnected = false;

        /** @type {number|null} Interval handle for the audio-tap retry loop. */
        this._audioTapRetryTimer = null;

        /** @type {number|null} Room-list polling interval handle. */
        this.updateListInterval = null;

        /** @type {string|null} Saved cheat button display style. */
        this.oldCheatDisplay = null;

        /** @type {Function|null} Callback to stop the guest draw loop. */
        this.stopDrawLoop = null;

        /** @type {number} Cached CSS width of the guest display area. */
        this.guestDisplayWidth = 0;

        /** @type {number} Cached CSS height of the guest display area. */
        this.guestDisplayHeight = 0;

        /** @type {boolean} True if no TURN server is configured (connections may fail). */
        this.showTurnWarning = false;

        /** @type {boolean} Whether the TURN warning has already been shown in the menu. */
        this._turnWarningShown = false;
    }

    /* ------------------------------------------------------------------ */
    /*  Logging                                                            */
    /* ------------------------------------------------------------------ */

    /**
     * Log a debug message if debug mode is enabled.
     * @param {string} role - Label such as "HOST" or "GUEST".
     * @param {...*} args - Values to log.
     */
    _log(role, ...args) {
        if (this.emu.debug) console.log("[NETPLAY " + role + "]", ...args);
    }

    /**
     * Current role string based on ownership.
     * @returns {string}
     */
    get _role() {
        return this.owner ? "HOST" : "GUEST";
    }

    /* ------------------------------------------------------------------ */
    /*  URL bootstrap                                                      */
    /* ------------------------------------------------------------------ */

    /**
     * Read the netplay server URL from config and normalize it.
     * Must be called once after the emulator config is available.
     * @returns {boolean} True if the URL was found, false otherwise.
     */
    configure() {
        this.url = this.emu.config.netplayUrl || window.EJS_netplayUrl;
        if (!this.url) {
            this.emu.displayMessage("Netplay URL not configured", 5000);
            return false;
        }
        while (this.url.endsWith("/")) {
            this.url = this.url.slice(0, -1);
        }
        return true;
    }

    /**
     * Inspect the configured ICE servers and set {@link showTurnWarning}
     * if no TURN server is present.  Logs a console warning in debug mode.
     */
    checkTurnConfig() {
        const iceServers = this.emu.config.netplayICEServers || window.EJS_netplayICEServers || [];
        const hasTurn = iceServers.some(
            (server) => server && typeof server.urls === "string" && server.urls.startsWith("turn:")
        );
        this.showTurnWarning = !hasTurn;

        if (this.showTurnWarning && this.emu.debug) {
            console.warn("WARNING: No TURN addresses are configured! Many clients may fail to connect!");
        }
    }

    /**
     * If a TURN warning is pending and hasn't been shown yet, prepend a
     * warning banner to the netplay menu body.
     * @param {HTMLElement} menuElement - The netplay popup/menu element.
     */
    showTurnWarningIfNeeded(menuElement) {
        if (!this.showTurnWarning || this._turnWarningShown) return;

        const warningDiv = this.emu.createElement("div");
        warningDiv.className = "ejs_netplay_warning";
        warningDiv.innerText = "Warning: No TURN server configured. Netplay connections may fail.";

        const menuBody = menuElement.querySelector(".ejs_popup_body");
        if (menuBody) {
            menuBody.prepend(warningDiv);
            this._turnWarningShown = true;
        }
    }

    /* ------------------------------------------------------------------ */
    /*  UI helpers (bottom-bar visibility)                                  */
    /* ------------------------------------------------------------------ */

    /**
     * Toggle visibility of host-only bottom-bar controls.
     * When a client joins, buttons like save/load/restart are hidden.
     * @param {boolean} isJoining - True when entering a room, false when leaving.
     */
    updateUI(isJoining) {
        const bar = this.emu.elements?.bottomBar;
        if (!bar) return;

        const isClient = !this.owner;
        const shouldHide = isJoining && isClient;

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
            ...(bar.cacheManager || []),
        ];

        if (bar.settings?.[0]?.parentElement) {
            elems.push(bar.settings[0].parentElement);
        }
        if (this.emu.diskParent) {
            elems.push(this.emu.diskParent);
        }

        for (const el of elems) {
            if (el) el.classList.toggle("netplay-hidden", shouldHide);
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Volume                                                             */
    /* ------------------------------------------------------------------ */

    /**
     * Apply a volume change during an active netplay session.
     *
     * For guests this adjusts remote audio elements and the remote gain node.
     * For hosts this adjusts the stream compensation gain so the outgoing
     * stream level stays constant regardless of local volume.
     *
     * @param {number} volume - Volume level between 0 and 1.
     */
    setVolume(volume) {
        const isGuest = this.emu.isNetplay && !this.owner;

        if (isGuest) {
            if (this.remoteGainNode) {
                this.remoteGainNode.gain.value = volume;
            }

            const audioElements = document.querySelectorAll(
                'audio[id^="ejs-remote-audio-"]',
            );
            audioElements.forEach((el) => {
                el.volume = Math.max(0, Math.min(1, volume));
                el.muted = volume === 0;
            });
            return;
        }

        if (this.emu.isNetplay && this.owner && this.streamCompensationGain) {
            const compensation = volume > 0.01 ? 1.0 / volume : 1.0;
            this.streamCompensationGain.gain.value = Math.min(compensation, 20);
            if (this.emu.debug) {
                console.log(
                    "Stream compensation adjusted: " +
                        this.streamCompensationGain.gain.value,
                );
            }
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Resolution / stream sizing                                         */
    /* ------------------------------------------------------------------ */

    /**
     * Query the emulator core for its native output resolution.
     * @returns {{width: number, height: number}}
     * @private
     */
    _getNativeResolution() {
        try {
            if (this.emu.Module?.getNativeResolution) {
                return this.emu.Module.getNativeResolution();
            }
        } catch (_) { /* ignore */ }
        return { width: 640, height: 480 };
    }

    /**
     * Determine the local player's index within the room's player list.
     * @returns {number} Zero-based player index, or 0 if not found.
     */
    getUserIndex() {
        if (!this.emu.isNetplay || !this.players || !this.playerID) return 0;
        const idx = Object.keys(this.players).indexOf(this.playerID);
        return idx === -1 ? 0 : idx;
    }

    /**
     * Calculate the dimensions and frame rate for the outgoing WebRTC stream.
     * Respects manual overrides via config/EJS_netplayStream and falls back
     * to an aspect-ratio-aware auto size capped at 1280×720.
     * @returns {{w: number, h: number, fps: number, mode: string}}
     */
    chooseStreamSize() {
        const fps = this.emu.config?.netplayFps || window.EJS_netplayFps || 30;

        const override = this.emu.config?.netplayStream || window.EJS_netplayStream;
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

        const n = this._getNativeResolution();
        const aw = n?.width || 640;
        const ah = n?.height || 480;
        let aspect = aw / ah;
        if (!isFinite(aspect) || aspect <= 0) aspect = 4 / 3;
        if (aspect < 1.1) aspect = 1.1;
        if (aspect > 2.0) aspect = 2.0;

        let H = 720;
        let W = Math.round(H * aspect);
        if (W > 1280) { W = 1280; H = Math.round(W / aspect); }
        if (W % 2) W++;
        if (H % 2) H++;

        return { w: W, h: H, fps, mode: "auto" };
    }

    /* ------------------------------------------------------------------ */
    /*  Anchor / overlay                                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Locate the DOM element that the overlay canvas should align to.
     * Falls back to the emulator's main canvas.
     * @returns {HTMLElement|null}
     * @private
     */
    _getAnchorElement() {
        try {
            if (this.emu.config?.player) {
                const el = document.querySelector(this.emu.config.player);
                if (el) return el;
            }
        } catch (_) { /* ignore */ }
        return this.emu.canvas || null;
    }

    /**
     * Create (if needed) the fixed-position overlay that holds the guest
     * canvas, and attach resize/scroll listeners to keep it aligned.
     */
    ensureOverlay() {
        if (this._overlay?.parentNode) return;

        const ov = document.createElement("div");
        ov.id = "ejs-netplay-overlay";
        ov.classList.add("ejs_netplay_overlay");
        this.emu.elements.parent.appendChild(ov);
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

        if (!this._overlayRO && window.ResizeObserver) {
            this._overlayRO = new ResizeObserver(() => this.syncOverlay(false));
            try {
                const anchor = this._getAnchorElement();
                if (anchor) this._overlayRO.observe(anchor);
                if (anchor?.parentElement) this._overlayRO.observe(anchor.parentElement);
            } catch (_) { /* ignore */ }
        }

        this.syncOverlay(true);
    }

    /**
     * Reposition and resize the guest canvas to match the anchor element.
     * @param {boolean} force - If true, always update the canvas backing size.
     */
    syncOverlay(force) {
        if (!this.canvas || !this._overlay) return;

        const anchor = this._getAnchorElement();
        if (!anchor?.getBoundingClientRect) return;

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

        this.guestDisplayWidth = cssW;
        this.guestDisplayHeight = cssH;

        if (this.canvas.parentNode !== this._overlay) {
            this._overlay.appendChild(this.canvas);
        }

        Object.assign(this.canvas.style, {
            position: "fixed",
            left: left + "px",
            top: top + "px",
            width: cssW + "px",
            height: cssH + "px",
            zIndex: "10000",
            pointerEvents: "none",
            background: "#000",
            imageRendering: "pixelated",
        });

        const pxW = Math.max(1, Math.round(cssW * dpr));
        const pxH = Math.max(1, Math.round(cssH * dpr));
        if (force || this.canvas.width !== pxW || this.canvas.height !== pxH) {
            this.canvas.width = pxW;
            this.canvas.height = pxH;
        }
    }

    /**
     * Remove the overlay element and detach all associated listeners.
     */
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
        if (this._overlayRO) {
            try { this._overlayRO.disconnect(); } catch (_) { /* ignore */ }
            this._overlayRO = null;
        }
        if (this._overlay?.parentNode) {
            try { this._overlay.parentNode.removeChild(this._overlay); } catch (_) { /* ignore */ }
        }
        this._overlay = null;
    }

    /* ------------------------------------------------------------------ */
    /*  Guest UI z-index boost / restore                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Raise z-index on emulator UI elements (menu bar, virtual gamepad, etc.)
     * so they render above the fixed-position guest canvas overlay.
     */
    boostGuestUIZ() {
        if (!this.emu.isNetplay || this.owner) return;
        if (this._uiZBoosted) return;

        this._uiZBoosted = [];

        if (!this.emu.msgElem && typeof this.emu.displayMessage === "function") {
            this.emu.displayMessage("", 1);
        }

        let root = null;
        try {
            root = this.emu.config?.player ? document.querySelector(this.emu.config.player) : null;
        } catch (_) { /* ignore */ }
        if (!root) root = document;

        const sel = [
            ".ejs_message", ".ejs_menu_bar", ".ejs_settings_parent",
            ".ejs_context_menu", ".ejs_popup_container", ".ejs_popup_container_box",
            ".ejs_virtualGamepad_parent", ".ejs_virtualGamepad_top",
            ".ejs_virtualGamepad_left", ".ejs_virtualGamepad_right",
            ".ejs_virtualGamepad_bottom", ".ejs_virtualGamepad_open",
        ].join(",");

        const nodes = root.querySelectorAll(sel);

        for (const el of nodes) {
            const cs = window.getComputedStyle(el);
            this._uiZBoosted.push({
                el,
                z: el.style.zIndex,
                pos: el.style.position,
                pe: el.style.pointerEvents,
            });
            if (cs.position === "static") el.style.position = "relative";
            el.style.zIndex = "10002";
            el.style.pointerEvents = "auto";
        }
    }

    /**
     * Restore z-index, position, and pointer-events on UI elements that
     * were previously boosted by {@link boostGuestUIZ}.
     */
    restoreGuestUIZ() {
        if (!this._uiZBoosted) return;
        for (const item of this._uiZBoosted) {
            if (!item?.el) continue;
            item.el.style.zIndex = item.z || "";
            item.el.style.position = item.pos || "";
            item.el.style.pointerEvents = item.pe || "";
        }
        this._uiZBoosted = null;
    }

    /* ------------------------------------------------------------------ */
    /*  Guest freeze / unfreeze                                            */
    /* ------------------------------------------------------------------ */

    /**
     * Pause the emulator's main loop and silence its audio so the guest
     * can display the host's streamed video instead.
     */
    freezeGuest() {
        this._log("GUEST", "Freezing emulator...");

        this.frozen = this.frozen || { originals: {} };
        const orig = this.frozen.originals;
        const emu = this.emu;

        if (emu.gameManager) {
            try { emu.gameManager.toggleMainLoop(0); } catch (_) { /* ignore */ }
            if (emu.gameManager.pause) {
                try { emu.gameManager.pause(); } catch (_) { /* ignore */ }
            }
        }
        if (emu.Module?.pauseMainLoop) {
            try { emu.Module.pauseMainLoop(); } catch (_) { /* ignore */ }
        }

        if (emu.handleResize && !orig.handleResize) {
            orig.handleResize = emu.handleResize;
            emu.handleResize = (...args) => {
                try { orig.handleResize.apply(emu, args); } catch (_) { /* ignore */ }
                if (emu.isNetplay && !this.owner) this.syncOverlay(true);
            };
        }

        if (emu.gameManager?.audioNode) {
            try { emu.gameManager.audioNode.disconnect(); } catch (_) { /* ignore */ }
        }
        if (emu.Module?.AL?.currentCtx) {
            const ctx = emu.Module.AL.currentCtx;
            if (ctx.sources) {
                for (const id in ctx.sources) {
                    try { ctx.sources[id].gain.gain.value = 0; } catch (_) { /* ignore */ }
                }
            }
            if (ctx.audioCtx) ctx.audioCtx.suspend().catch(() => {});
        }

        this._log("GUEST", "Emulator frozen");
    }

    /**
     * Resume the emulator's main loop and reconnect its audio after
     * leaving a netplay session as a guest.
     */
    unfreezeGuest() {
        if (!this.frozen) return;
        this._log("GUEST", "Unfreezing emulator...");

        const orig = this.frozen.originals || {};
        const emu = this.emu;

        if (orig.handleResize) emu.handleResize = orig.handleResize;

        if (emu.Module?.AL?.currentCtx?.audioCtx) {
            emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
            const vol = emu.muted ? 0 : emu.volume;
            if (emu.Module.AL.currentCtx.sources) {
                for (const id in emu.Module.AL.currentCtx.sources) {
                    try { emu.Module.AL.currentCtx.sources[id].gain.gain.value = vol; } catch (_) { /* ignore */ }
                }
            }
        }
        if (emu.gameManager?.audioNode && emu.gameManager.audioContext) {
            try { emu.gameManager.audioNode.connect(emu.gameManager.audioContext.destination); } catch (_) { /* ignore */ }
        }
        if (emu.Module?.resumeMainLoop) {
            try { emu.Module.resumeMainLoop(); } catch (_) { /* ignore */ }
        }
        if (emu.gameManager) {
            try { emu.gameManager.toggleMainLoop(1); } catch (_) { /* ignore */ }
        }

        this.frozen = null;
        this._log("GUEST", "Emulator unfrozen");
    }

    /* ------------------------------------------------------------------ */
    /*  Remote audio                                                       */
    /* ------------------------------------------------------------------ */

    /**
     * Get or create a hidden `<audio>` element for a specific peer,
     * configured for autoplay with the current volume.
     * @param {string} peerId - The remote peer's socket/connection ID.
     * @returns {HTMLAudioElement}
     */
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

    /**
     * Register user-gesture listeners (pointer, touch, key) that will
     * attempt to play all remote audio elements once triggered.
     * Required on mobile where autoplay is blocked.
     */
    armGuestAudioUnlock() {
        if (!this.emu.isNetplay || this.owner) return;
        if (this._audioUnlockArmed) return;

        this._audioUnlockArmed = true;

        const tryPlayAll = () => {
            try {
                const els = document.querySelectorAll('audio[id^="ejs-remote-audio-"]');
                els.forEach((a) => {
                    a.muted = false;
                    a.volume = this.emu.muted ? 0 : (typeof this.emu.volume === "number" ? this.emu.volume : 1);
                    a.play().catch(() => {});
                });
            } catch (_) { /* ignore */ }
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

    /**
     * Play a silent buffer through the emulator's audio context to
     * satisfy mobile autoplay restrictions.
     */
    unlockMobileAudio() {
        const ctx = this.emu.Module?.AL?.currentCtx?.audioCtx;
        if (!ctx) return;
        try { if (ctx.state !== "running") ctx.resume().catch(() => {}); } catch (_) { /* ignore */ }
        try {
            const b = ctx.createBuffer(1, 1, ctx.sampleRate);
            const s = ctx.createBufferSource();
            s.buffer = b;
            s.connect(ctx.destination);
            s.start(0);
            s.stop(0);
        } catch (_) { /* ignore */ }
    }

    /* ------------------------------------------------------------------ */
    /*  WebRTC stream init (host)                                          */
    /* ------------------------------------------------------------------ */

    /**
     * Capture the emulator canvas into a fixed-resolution MediaStream
     * suitable for WebRTC transmission.  Audio track collection is handled
     * by {@link collectStreamMediaTracks}.
     * @returns {Promise<void>}
     */
    initWebRTCStream() {
        if (this.localStream) return Promise.resolve();

        if (this.emu.Module?.AL?.currentCtx?.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
        }

        return new Promise((resolve) => {
            const emuCanvas = this.emu.canvas;
            if (!emuCanvas?.captureStream) {
                if (this.emu.debug) console.error("[NETPLAY HOST] canvas.captureStream unavailable");
                resolve();
                return;
            }

            const chosen = this.chooseStreamSize();
            const { w: outW, h: outH, fps } = chosen;
            const outAspect = outW / outH;

            this._log("HOST", `Init stream (decoupled ${chosen.mode}) ${outW}x${outH} @ ${fps}fps`);

            let rawStream = null;
            try { rawStream = emuCanvas.captureStream(fps); } catch (_) { /* ignore */ }
            if (!rawStream?.getVideoTracks?.()?.[0]) {
                if (this.emu.debug) console.error("[NETPLAY HOST] No video track from canvas.captureStream()");
                resolve();
                return;
            }
            this._hostRawStream = rawStream;

            const srcVideo = document.createElement("video");
            srcVideo.muted = true;
            srcVideo.autoplay = true;
            srcVideo.playsInline = true;
            srcVideo.classList.add("ejs_netplay_offscreen");
            document.body.appendChild(srcVideo);
            this._hostSourceVideo = srcVideo;

            srcVideo.srcObject = rawStream;
            srcVideo.play().catch((err) => this._log("HOST", "source video play() warning:", err));

            const cap = document.createElement("canvas");
            cap.width = outW;
            cap.height = outH;
            cap.classList.add("ejs_netplay_offscreen_canvas");
            document.body.appendChild(cap);
            this.captureCanvas = cap;

            const capCtx = cap.getContext("2d", { alpha: false });
            this.captureRunning = true;

            const drawToFixedCanvas = () => {
                if (!this.captureRunning) return;

                capCtx.fillStyle = "#000";
                capCtx.fillRect(0, 0, outW, outH);

                if (srcVideo.readyState >= 2 && srcVideo.videoWidth > 0 && srcVideo.videoHeight > 0) {
                    const srcW = srcVideo.videoWidth;
                    const srcH = srcVideo.videoHeight;
                    const srcAspect = srcW / srcH;

                    let sx = 0, sy = 0, sw = srcW, sh = srcH;

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

            const finalStream = this.collectStreamMediaTracks(cap, fps);
            if (finalStream) {
                try {
                    const vt = finalStream.getVideoTracks()[0];
                    if (vt) vt.contentHint = "detail";
                } catch (_) { /* ignore */ }

                this.localStream = finalStream;
                this._hostOutStream = finalStream;
                this._log("HOST", "Stream ready - Video: " + finalStream.getVideoTracks().length + ", Audio: " + finalStream.getAudioTracks().length);
            } else {
                this._log("HOST", "Fallback to video-only stream");
                const fallback = cap.captureStream(fps);
                this.localStream = fallback;
                this._hostOutStream = fallback;
            }

            resolve();
        });
    }

    /**
     * Capture video and audio tracks from a canvas element for WebRTC streaming.
     *
     * Creates a video track via `captureStream` and taps into the emulator's
     * OpenAL audio graph to produce an audio track.  A compensation gain node
     * is inserted so the outgoing stream level stays constant regardless of
     * the host's local volume setting.
     *
     * @param {HTMLCanvasElement} canvasEl - The canvas to capture video from.
     * @param {number} fps - Frames per second for the video capture.
     * @returns {MediaStream|null} A stream with video (and optionally audio) tracks, or null on failure.
     */
    collectStreamMediaTracks(canvasEl, fps) {
        this._log("HOST", "collectStreamMediaTracks " + canvasEl.width + "x" + canvasEl.height);

        const emu = this.emu;

        /* --- Video --- */
        let videoTrack = null;
        const videoTracks = canvasEl.captureStream(fps).getVideoTracks();
        this._log("HOST", "Video tracks from captureStream: " + videoTracks.length);

        if (videoTracks.length === 0) {
            if (emu.debug) console.error("[NETPLAY HOST] Unable to capture video stream");
            return null;
        }
        videoTrack = videoTracks[0];
        this._log("HOST", "Video track: " + videoTrack.label + " " + videoTrack.readyState);

        /* --- Audio --- */
        let audioTrack = null;

        if (emu.Module?.AL?.currentCtx?.audioCtx) {
            const alContext = emu.Module.AL.currentCtx;
            const audioContext = alContext.audioCtx;

            this._log("HOST", "AL AudioContext state: " + audioContext.state);
            this._log("HOST", "AL sources: " + Object.keys(alContext.sources || {}).length);

            if (audioContext.state === "suspended") {
                audioContext.resume().catch((e) => {
                    if (emu.debug) console.error("[NETPLAY HOST] Failed to resume AudioContext:", e);
                });
            }

            const gainNodes = [];
            if (alContext.sources) {
                for (const sourceIdx in alContext.sources) {
                    const source = alContext.sources[sourceIdx];
                    if (source?.gain) gainNodes.push(source.gain);
                }
            }
            this._log("HOST", "Gain nodes collected: " + gainNodes.length);

            const masterGain = alContext.gain || alContext.masterGain || alContext.outputGain;

            if (masterGain || gainNodes.length > 0) {
                try {
                    const destination = this.audioDestination || audioContext.createMediaStreamDestination();
                    this.audioDestination = destination;

                    const streamGain = this.streamCompensationGain || audioContext.createGain();
                    this.streamCompensationGain = streamGain;

                    const currentVolume = (typeof emu.volume === "number" && emu.volume > 0.01) ? emu.volume : 1.0;
                    streamGain.gain.value = 1.0 / currentVolume;
                    this._log("HOST", "Stream compensation gain: " + streamGain.gain.value + " (local volume: " + currentVolume + ")");

                    if (!this._streamGainConnectedToDest) {
                        streamGain.connect(destination);
                        this._streamGainConnectedToDest = true;
                    }

                    if (!this._audioTapRetryStarted) {
                        this._audioTapRetryStarted = true;
                        this._connectedSourceGains = this._connectedSourceGains || new WeakSet();

                        const tryTap = () => {
                            const mg = alContext.gain || alContext.masterGain || alContext.outputGain;
                            if (mg && typeof mg.connect === "function") {
                                if (!this._alMasterConnected) {
                                    this._log("HOST", "Using OpenAL master gain tap for stream audio");
                                    try { mg.connect(streamGain); } catch (_) { /* ignore */ }
                                    this._alMasterConnected = true;
                                }
                                return true;
                            }

                            const sources = alContext.sources || {};
                            let connectedAny = false;
                            for (const k in sources) {
                                const g = sources[k]?.gain;
                                if (g && !this._connectedSourceGains.has(g)) {
                                    try { g.connect(streamGain); } catch (_) { /* ignore */ }
                                    this._connectedSourceGains.add(g);
                                    connectedAny = true;
                                }
                            }
                            return connectedAny;
                        };

                        tryTap();
                        clearInterval(this._audioTapRetryTimer);
                        this._audioTapRetryTimer = setInterval(() => {
                            if (this._alMasterConnected) {
                                clearInterval(this._audioTapRetryTimer);
                                this._audioTapRetryTimer = null;
                                return;
                            }
                            tryTap();
                        }, 500);
                    }

                    const audioTracks = destination.stream.getAudioTracks();
                    this._log("HOST", "Audio tracks created: " + audioTracks.length);

                    if (audioTracks.length > 0) {
                        audioTrack = audioTracks[0];
                        this._log("HOST", "Audio track: " + audioTrack.label + " readyState: " + audioTrack.readyState + " muted: " + audioTrack.muted);
                    }
                } catch (e) {
                    if (emu.debug) console.error("[NETPLAY HOST] Error creating audio destination:", e);
                }
            }
        }

        /* --- Compose --- */
        const stream = new MediaStream();
        if (videoTrack?.readyState === "live") stream.addTrack(videoTrack);
        if (audioTrack?.readyState === "live") stream.addTrack(audioTrack);

        this._log("HOST", "Final stream - video: " + stream.getVideoTracks().length + " audio: " + stream.getAudioTracks().length);
        return stream;

    /* ------------------------------------------------------------------ */
    /*  WebRTC peer connection                                             */
    /* ------------------------------------------------------------------ */

    /**
     * Build a new RTCPeerConnection for a remote peer, attach data channels,
     * media tracks, and all event handlers (ICE, connection state, ontrack).
     * @param {string} peerId - The remote peer's socket ID.
     * @returns {RTCPeerConnection}
     */
    createPeerConnection(peerId) {
        const role = this._role;
        this._log(role, "Creating peer connection: " + peerId);

        const pc = new RTCPeerConnection({
            iceServers: this.emu.config.netplayICEServers,
            iceCandidatePoolSize: 10,
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
                this.emu.gameManager?.functions?.simulateInput?.(d.player, d.index, d.value);
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

        /* Add tracks */
        if (this.owner && this.localStream) {
            const tracks = this.localStream.getTracks();
            this._log("HOST", "Adding " + tracks.length + " tracks");
            for (const t of tracks) pc.addTrack(t, this.localStream);

            try {
                const sender = pc.getSenders().find((s) => s.track?.kind === "video");
                if (sender) {
                    const p = sender.getParameters();
                    p.degradationPreference = "maintain-resolution";
                    if (!p.encodings?.length) p.encodings = [{}];
                    p.encodings[0].maxBitrate = 5_000_000;
                    p.encodings[0].scaleResolutionDownBy = 1.0;
                    sender.setParameters(p).catch(() => {});
                }
            } catch (_) { /* ignore */ }
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

        /* ICE */
        pc.onicecandidate = (e) => {
            if (e.candidate) {
                this.socket.emit("webrtc-signal", { target: peerId, candidate: e.candidate });
            }
        };

        /* Connection state */
        pc.onconnectionstatechange = () => {
            this._log(role, "Connection: " + pc.connectionState);

            if (pc.connectionState === "connected") {
                this.webRtcReady = true;
                clearTimeout(this.connectionTimeout);
                if (this._dcTimer) { clearTimeout(this._dcTimer); this._dcTimer = null; }
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
                        if (pd?.pc?.connectionState === "disconnected") {
                            this.requestRenegotiate(peerId, "pc-disconnected");
                        }
                    }, 2500);
                }
            } else {
                if (pc.connectionState === "failed") {
                    try { pc.close(); } catch (_) { /* ignore */ }
                    delete this.peerConnections[peerId];
                    setTimeout(() => this.createPeerConnection(peerId), 1500);
                }
            }
        };

        /* Track received (guest) */
        pc.ontrack = (e) => {
            if (this.owner) return;
            const t = e.track;
            this._log("GUEST", "Track received: " + t.kind);

            if (t.kind === "audio") {
                try {
                    const stream = e.streams?.[0] || new MediaStream([t]);
                    const audioEl = this.ensureRemoteAudioElement(peerId);
                    audioEl.srcObject = stream;
                    const p = audioEl.play();
                    if (p?.catch) {
                        p.catch(() => {
                            this._log("GUEST", "Audio autoplay blocked, arming user-gesture unlock");
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

                this.video.srcObject = e.streams?.[0] || new MediaStream([t]);
                this.video.play().catch((err) => this._log("GUEST", "video.play() warning:", err));
                this._startDrawLoop();
                t.onended = () => {
                    if (this.emu.isNetplay) this.requestRenegotiate(peerId, "video-track-ended");
                };
            }
        };

        /* Create offer (host) */
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

    /**
     * Ask a remote peer to tear down and re-establish the WebRTC connection.
     * @param {string} peerId - The remote peer's socket ID.
     * @param {string} [reason] - Human-readable reason for the renegotiation.
     */
    requestRenegotiate(peerId, reason) {
        try {
            if (!this.socket?.connected) return;
            this._log(this._role, "Request renegotiate (" + (reason || "unknown") + ") with " + peerId);
            this.socket.emit("webrtc-signal", { target: peerId, requestRenegotiate: true, reason: reason || "" });
        } catch (_) { /* ignore */ }
    }

    /* ------------------------------------------------------------------ */
    /*  Guest draw loop                                                    */
    /* ------------------------------------------------------------------ */

    /**
     * Start a `requestAnimationFrame` loop that draws the received video
     * onto the guest's overlay canvas, maintaining the host's aspect ratio.
     * @private
     */
    _startDrawLoop() {
        const video = this.video;
        const canvas = this.canvas;
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

    /* ------------------------------------------------------------------ */
    /*  Room join / leave                                                  */
    /* ------------------------------------------------------------------ */

    /**
     * Handle the transition into an active netplay room for both host and guest.
     * Updates UI, sets ownership state, and delegates to guest-specific setup
     * when joining as a non-owner.
     * @param {boolean} isOwner - True if this client created the room.
     * @param {string} roomName - Display name of the room.
     * @param {string|null} password - Room password, or null.
     * @param {string} roomId - Unique room/session identifier.
     */
    roomJoined(isOwner, roomName, password, roomId) {
        this._log(isOwner ? "HOST" : "GUEST", "Room joined: " + roomName);
        const emu = this.emu;

        this.updateUI(true);
        emu.isNetplay = true;
        this.inputs = {};
        this.owner = isOwner;

        if (this.roomNameElem) this.roomNameElem.innerText = roomName;
        if (this.tabs?.[0]) {
            this.tabs[0].style.display = "none";
            this.tabs[1].style.display = "";
        }
        if (this.passwordElem) {
            this.passwordElem.style.display = password ? "" : "none";
            this.passwordElem.innerText = password ? "Password: " + password : "";
        }
        if (this.createButton) this.createButton.innerText = emu.localization("Leave Room");

        this.updatePlayersTable();

        if (!isOwner) {
            this._setupGuest();
        } else {
            this._log("HOST", "Setup complete");
            if (emu.gameManager) {
                try { emu.gameManager.toggleMainLoop(1); } catch (_) { /* ignore */ }
            }
        }
    }

    /**
     * Perform guest-specific setup after joining a room: freeze the local
     * emulator, create the overlay canvas, intercept input, and set a
     * connection timeout.
     * @private
     */
    _setupGuest() {
        const emu = this.emu;
        const anchor = this._getAnchorElement();
        const rect = (anchor?.getBoundingClientRect)
            ? anchor.getBoundingClientRect()
            : (emu.canvas ? emu.canvas.getBoundingClientRect() : { width: 640, height: 480 });

        const cssW = Math.max(1, Math.round(rect.width));
        const cssH = Math.max(1, Math.round(rect.height));
        const dpr = window.devicePixelRatio || 1;

        this._log("GUEST", "Display rect: " + cssW + "x" + cssH);
        this.freezeGuest();

        this._restoreCanvasStyle = {
            opacity: emu.canvas ? emu.canvas.style.opacity : "",
            pointerEvents: emu.canvas ? emu.canvas.style.pointerEvents : "",
            visibility: emu.canvas ? emu.canvas.style.visibility : "",
        };

        this.canvas = document.createElement("canvas");
        this.canvas.id = "ejs-netplay-canvas";
        this.canvas.width = Math.max(1, Math.round(cssW * dpr));
        this.canvas.height = Math.max(1, Math.round(cssH * dpr));
        this.canvas.classList.add("ejs_netplay_canvas");
        this.canvas.style.width = cssW + "px";
        this.canvas.style.height = cssH + "px";

        this.ensureOverlay();
        this.syncOverlay(true);
        this.boostGuestUIZ();

        if (emu.canvas) {
            emu.canvas.style.opacity = "0";
            emu.canvas.style.visibility = "visible";
            emu.canvas.style.pointerEvents = "";
        }

        const ctx = this.canvas.getContext("2d", { alpha: false });
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        ctx.fillStyle = "#fff";
        ctx.font = (20 * dpr) + "px sans-serif";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Connecting...", this.canvas.width / 2, this.canvas.height / 2);

        if (emu.gameManager?.functions?.simulateInput) {
            this.originalSimulateInput = emu.gameManager.functions.simulateInput;
            emu.gameManager.functions.simulateInput = (player, index, value) => {
                const pidx = this.getUserIndex();
                for (const key in this.peerConnections) {
                    const dc = this.peerConnections[key]?.dataChannel;
                    if (dc?.readyState === "open") {
                        dc.send(JSON.stringify({ player: pidx, index, value }));
                    }
                }
            };
        }

        if (emu.elements.bottomBar?.cheat?.[0]) {
            this.oldCheatDisplay = emu.elements.bottomBar.cheat[0].style.display;
            emu.elements.bottomBar.cheat[0].style.display = "none";
        }

        this._gotVideoEver = false;

        this.connectionTimeout = setTimeout(() => {
            if (!this.webRtcReady && !this._gotVideoEver) {
                emu.displayMessage("Connection failed", 5000);
                this.leaveRoom();
            }
        }, 15000);

        this._log("GUEST", "Setup complete - waiting for stream");
    }

    /**
     * Cleanly leave the current netplay room.  Tears down WebRTC connections,
     * stops media streams, removes the overlay, unfreezes the guest emulator,
     * and resets all netplay state.
     */
    leaveRoom() {
        if (this._leaving) return;
        this._leaving = true;

        this._log(this._role, "Leaving room");
        const emu = this.emu;

        this.updateUI(false);
        clearTimeout(this.connectionTimeout);
        if (this.stopDrawLoop) this.stopDrawLoop();

        this.unfreezeGuest();
        this.captureRunning = false;

        if (this.captureCanvas?.parentNode) {
            try { this.captureCanvas.parentNode.removeChild(this.captureCanvas); } catch (_) { /* ignore */ }
        }
        this.captureCanvas = null;

        if (this._hostSourceVideo) {
            try { this._hostSourceVideo.srcObject = null; } catch (_) { /* ignore */ }
            if (this._hostSourceVideo.parentNode) {
                try { this._hostSourceVideo.parentNode.removeChild(this._hostSourceVideo); } catch (_) { /* ignore */ }
            }
            this._hostSourceVideo = null;
        }

        for (const stream of [this._hostRawStream, this._hostOutStream]) {
            if (stream) {
                try { stream.getTracks().forEach((tr) => tr.stop()); } catch (_) { /* ignore */ }
            }
        }
        this._hostRawStream = null;
        this._hostOutStream = null;

        this.restoreGuestUIZ();
        this.destroyOverlay();

        if (this.canvas?.parentNode) {
            try { this.canvas.parentNode.removeChild(this.canvas); } catch (_) { /* ignore */ }
        }
        this.canvas = null;

        if (emu.canvas && this._restoreCanvasStyle) {
            emu.canvas.style.opacity = this._restoreCanvasStyle.opacity || "";
            emu.canvas.style.pointerEvents = this._restoreCanvasStyle.pointerEvents || "";
            emu.canvas.style.visibility = this._restoreCanvasStyle.visibility || "";
            this._restoreCanvasStyle = null;
        } else if (emu.canvas) {
            emu.canvas.style.opacity = "";
        }

        if (this.remoteAudioContext) {
            try { this.remoteAudioContext.close(); } catch (_) { /* ignore */ }
            this.remoteAudioContext = null;
            this.remoteGainNode = null;
        }

        try {
            document.querySelectorAll('audio[id^="ejs-remote-audio-"]').forEach((a) => {
                try { a.pause(); } catch (_) { /* ignore */ }
                try { a.srcObject = null; } catch (_) { /* ignore */ }
                try { a.remove(); } catch (_) { /* ignore */ }
            });
        } catch (_) { /* ignore */ }
        this.remoteAudioElements = {};
        if (this._audioUnlockCleanup) {
            try { this._audioUnlockCleanup(); } catch (_) { /* ignore */ }
            this._audioUnlockCleanup = null;
        }
        this._audioUnlockArmed = false;

        if (this.owner) {
            try { this.sendMessage({ type: "host-left" }); } catch (_) { /* ignore */ }
        }

        if (this.socket) {
            try {
                if (this.socket.connected) this.socket.emit("leave-room");
                this.socket.disconnect();
            } catch (_) { /* ignore */ }
            this.socket = null;
        }

        if (this.localStream) {
            try { this.localStream.getTracks().forEach((tr) => tr.stop()); } catch (_) { /* ignore */ }
            this.localStream = null;
        }

        for (const key in this.peerConnections) {
            try { this.peerConnections[key]?.pc?.close(); } catch (_) { /* ignore */ }
        }
        this.peerConnections = {};

        if (this.video) {
            try { this.video.srcObject = null; } catch (_) { /* ignore */ }
            this.video = null;
        }

        if (this.createButton) this.createButton.innerText = emu.localization("Create Room");
        if (this.tabs) {
            this.tabs[0].style.display = "";
            this.tabs[1].style.display = "none";
        }
        if (this.roomNameElem) this.roomNameElem.innerText = "";
        if (this.passwordElem) this.passwordElem.style.display = "none";
        if (this.playerTable) this.playerTable.innerHTML = "";

        if (emu.elements.bottomBar?.cheat?.[0]) {
            emu.elements.bottomBar.cheat[0].style.display = this.oldCheatDisplay || "";
        }

        if (this.originalSimulateInput && emu.gameManager?.functions) {
            emu.gameManager.functions.simulateInput = this.originalSimulateInput;
        }

        emu.isNetplay = false;
        this.owner = false;
        this.players = {};
        this.playerID = null;
        this.webRtcReady = false;

        /* Reset audio tap / stream capture state */
        if (this._audioTapRetryTimer) {
            clearInterval(this._audioTapRetryTimer);
            this._audioTapRetryTimer = null;
        }
        this.streamCompensationGain = null;
        this.audioDestination = null;
        this._streamGainConnectedToDest = false;
        this._audioTapRetryStarted = false;
        this._connectedSourceGains = null;
        this._alMasterConnected = false;

        if (emu.originalControls) {
            emu.controls = JSON.parse(JSON.stringify(emu.originalControls));
            emu.originalControls = null;
        }

        setTimeout(() => { if (emu.handleResize) emu.handleResize(); }, 100);
        emu.displayMessage("Left room", 3000);
        this._leaving = false;
    }

    /* ------------------------------------------------------------------ */
    /*  Input simulation                                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Send or apply an input event.  Hosts apply locally and buffer for
     * broadcast; guests forward over the data channel.
     * @param {number} player - Player index.
     * @param {number} index - Button/axis index.
     * @param {number} value - Input value.
     */
    simulateInput(player, index, value) {
        const emu = this.emu;
        if (!emu.isNetplay || !emu.gameManager?.functions?.simulateInput) return;

        const pidx = this.getUserIndex();
        const f = this.currentFrame || 0;

        if (this.owner) {
            this.inputsData[f] = this.inputsData[f] || [];
            this.inputsData[f].push({ frame: f, connected_input: [pidx, index, value] });
            emu.gameManager.functions.simulateInput(pidx, index, value);
        } else {
            emu.gameManager.functions.simulateInput(pidx, index, value);
            this.sendMessage({ "sync-control": [{ frame: f + 20, connected_input: [pidx, index, value] }] });
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Chat                                                               */
    /* ------------------------------------------------------------------ */

    /**
     * Append a chat message to the chat log element.
     * @param {{player_name?: string, message?: string, to?: string}} payload
     */
    chatAppend(payload) {
        if (!this.chatLog) return;

        const name = payload?.player_name || "Player";
        const msg = payload?.message || "";
        const to = payload?.to || "all";

        const line = document.createElement("div");
        line.textContent = (to && to !== "all")
            ? name + " (private): " + msg
            : name + ": " + msg;

        this.chatLog.appendChild(line);
        this.chatLog.scrollTop = this.chatLog.scrollHeight;
    }

    /**
     * Rebuild the chat recipient dropdown to reflect the current player list.
     */
    chatRefreshRecipients() {
        if (!this.chatTo) return;

        const sel = this.chatTo;
        const prev = sel.value || "all";

        sel.innerHTML = "";
        const optAll = document.createElement("option");
        optAll.value = "all";
        optAll.innerText = this.emu.localization("Everyone");
        sel.appendChild(optAll);

        for (const userid of Object.keys(this.players || {})) {
            const p = this.players[userid];
            const opt = document.createElement("option");
            opt.value = userid;
            opt.innerText = p?.player_name || "Player";
            sel.appendChild(opt);
        }

        const exists = Array.from(sel.options).some((o) => o.value === prev);
        sel.value = exists ? prev : "all";
    }

    /**
     * Read, validate, and transmit the current chat input value.
     */
    chatSendMessage() {
        if (!this.socket?.connected) return;
        if (!this.chatInput || !this.chatTo) return;

        const message = String(this.chatInput.value || "").trim();
        if (!message) return;

        const to = this.chatTo.value || "all";
        this.chatInput.value = "";

        const payload = {
            player_name: this.name || "Player",
            message,
            to,
            from: this.playerID,
        };

        this.chatAppend(payload);
        this.sendMessage({ "chat-message": payload });
    }

    /**
     * Attach click and keydown listeners to the chat send button and input
     * field.  Safe to call multiple times — only binds once.
     */
    bindChatUI() {
        if (this._chatBound) return;
        if (!this.chatSendBtn || !this.chatInput) return;
        this._chatBound = true;

        this.emu.addEventListener(this.chatSendBtn, "click", () => this.chatSendMessage());
        this.emu.addEventListener(this.chatInput, "keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.chatSendMessage();
            }
        });
    }

    /* ------------------------------------------------------------------ */
    /*  Room list                                                          */
    /* ------------------------------------------------------------------ */

    /**
     * Fetch the list of open rooms from the signaling server.
     * @returns {Promise<Object>} Map of room ID → room info.
     */
    getOpenRooms() {
        if (!this.url) return Promise.resolve({});
        return fetch(this.url + "/list?domain=" + window.location.host + "&game_id=" + this.emu.config.gameId)
            .then((res) => res.text())
            .then((text) => JSON.parse(text))
            .catch(() => ({}));
    }

    /**
     * Refresh the room-list table body with current open rooms.
     * @returns {Promise<void>}
     */
    updateTableList() {
        if (!this.table) return Promise.resolve();
        return this.getOpenRooms().then((rooms) => {
            this.table.innerHTML = "";
            for (const id in rooms) {
                const r = rooms[id];
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
                            this._showJoinPasswordDialog(id, r.room_name, r.max);
                        } else {
                            this.joinRoom(id, r.room_name, r.max, null);
                        }
                    });
                }

                row.appendChild(c1);
                row.appendChild(c2);
                row.appendChild(c3);
                this.table.appendChild(row);
            }
        }).catch(() => {});
    }

    /**
     * Begin polling the room list every second.
     */
    startListUpdates() {
        this.updateListInterval = setInterval(() => this.updateTableList(), 1000);
    }

    /**
     * Stop the room-list polling interval.
     */
    stopListUpdates() {
        clearInterval(this.updateListInterval);
    }

    /* ------------------------------------------------------------------ */
    /*  Players table                                                      */
    /* ------------------------------------------------------------------ */

    /**
     * Rebuild the in-room player table and refresh chat recipients.
     */
    updatePlayersTable() {
        if (!this.playerTable) return;
        this.playerTable.innerHTML = "";

        const keys = Object.keys(this.players || {});
        keys.forEach((k, i) => {
            const row = this.emu.createElement("tr");
            const values = [
                i + 1,
                this.players[k]?.player_name || "Unknown",
                i === 0 ? keys.length + "/" + (this.maxPlayers || "?") : "",
            ];
            for (const t of values) {
                const td = this.emu.createElement("td");
                td.innerText = t;
                row.appendChild(td);
            }
            this.playerTable.appendChild(row);
        });

        this.chatRefreshRecipients();
    }

    /* ------------------------------------------------------------------ */
    /*  Dialogs                                                            */
    /* ------------------------------------------------------------------ */

    /**
     * Display the "Create a room" dialog with name, max players, and
     * optional password fields.
     */
    showOpenRoomDialog() {
        if (!this.emu.createSubPopup) return;
        this.emu.originalControls = JSON.parse(JSON.stringify(this.emu.controls));

        const popups = this.emu.createSubPopup();
        this.emu.netplayMenu.appendChild(popups[0]);
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
        for (const v of ["2", "3", "4"]) {
            const o = document.createElement("option");
            o.value = v;
            o.innerText = v;
            ms.appendChild(o);
        }

        const pw = this.emu.createElement("input");
        pw.type = "text";
        pw.maxLength = 20;

        for (const [label, el] of [["Room Name", ni], ["Max Players", ms], ["Password (optional)", pw]]) {
            const s = this.emu.createElement("strong");
            s.innerText = this.emu.localization(label);
            form.appendChild(s);
            form.appendChild(this.emu.createElement("br"));
            form.appendChild(el);
        }
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
        this.emu.addEventListener(cls, "click", () => popups[0].remove());

        popups[1].appendChild(sub);
        popups[1].appendChild(cls);
    }

    /**
     * Display a password prompt dialog before joining a protected room.
     * @param {string} roomId - Room/session identifier.
     * @param {string} roomName - Display name of the room.
     * @param {number} maxPlayers - Maximum player count for the room.
     * @private
     */
    _showJoinPasswordDialog(roomId, roomName, maxPlayers) {
        if (!this.emu.createSubPopup) return;

        const popups = this.emu.createSubPopup();
        this.emu.netplayMenu.appendChild(popups[0]);
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

        this.emu.addEventListener(cancelBtn, "click", () => popups[0].remove());

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

    /**
     * Display an error dialog when a room join attempt fails, optionally
     * allowing the user to retry with a different password.
     * @param {string} roomId - Room/session identifier.
     * @param {string} roomName - Display name of the room.
     * @param {number} maxPlayers - Maximum player count for the room.
     * @param {string} errorMessage - Error text from the server.
     * @param {boolean} hadPassword - Whether a password was supplied.
     * @private
     */
    _showJoinErrorDialog(roomId, roomName, maxPlayers, errorMessage, hadPassword) {
        if (!this.emu.createSubPopup) {
            this.emu.displayMessage(this.emu.localization("Join error") + ": " + errorMessage, 5000);
            return;
        }

        const popups = this.emu.createSubPopup();
        this.emu.netplayMenu.appendChild(popups[0]);
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
                this._showJoinPasswordDialog(roomId, roomName, maxPlayers);
            });
            buttonRow.appendChild(retryBtn);
        }

        const closeBtn = this.emu.createElement("button");
        closeBtn.classList.add("ejs_button_button", "ejs_popup_submit");
        closeBtn.innerText = this.emu.localization("Close");
        this.emu.addEventListener(closeBtn, "click", () => popups[0].remove());

        buttonRow.appendChild(closeBtn);
        popups[1].appendChild(buttonRow);
    }

    /* ------------------------------------------------------------------ */
    /*  Socket.IO                                                          */
    /* ------------------------------------------------------------------ */

    /**
     * Initialize the Socket.IO connection to the signaling server and
     * register all event handlers (connect, disconnect, users-updated,
     * data-message, webrtc-signal).
     * @param {Function} cb - Callback invoked once the socket connects.
     * @private
     */
    _startSocketIO(cb) {
        if (typeof io === "undefined") {
            this.emu.displayMessage("Socket.IO unavailable", 5000);
            return;
        }
        if (this.socket?.connected) { cb(); return; }
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

        this.socket.on("disconnect", () => this.leaveRoom());

        this.socket.on("users-updated", (users) => {
            const prev = Object.keys(this.previousPlayers || {});
            const curr = Object.keys(users || {});

            for (const id of curr) {
                if (!prev.includes(id) && id !== this.playerID) {
                    this.emu.displayMessage((users[id].player_name || "Player") + " joined");
                }
            }
            for (const id of prev) {
                if (!curr.includes(id)) {
                    this.emu.displayMessage((this.previousPlayers[id].player_name || "Player") + " left");
                }
            }

            this.previousPlayers = users;
            this.players = users;
            this.updatePlayersTable();
            this.chatRefreshRecipients();

            if (this.owner) {
                this.initWebRTCStream().then(() => {
                    for (const pid of Object.keys(users)) {
                        if (pid !== this.playerID) {
                            const sid = users[pid].socketId;
                            if (sid && !this.peerConnections[sid]) {
                                this.createPeerConnection(sid);
                            }
                        }
                    }
                });
            }
        });

        this.socket.on("data-message", (d) => this._handleDataMessage(d));

        this.socket.on("webrtc-signal", (data) => {
            const { sender, offer, answer, candidate, requestRenegotiate } = data;

            if (requestRenegotiate && this.owner && sender) {
                if (this.emu.debug) console.log("[NETPLAY HOST] Renegotiate requested by " + sender + " (" + (data.reason || "") + ")");
                try { this.peerConnections[sender]?.pc?.close(); } catch (_) { /* ignore */ }
                delete this.peerConnections[sender];
                this.initWebRTCStream().then(() => this.createPeerConnection(sender));
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
                pc.setRemoteDescription(new RTCSessionDescription(offer))
                    .then(() => {
                        pd.iceCandidateQueue.forEach((c) => pc.addIceCandidate(new RTCIceCandidate(c)));
                        pd.iceCandidateQueue = [];
                        return pc.createAnswer();
                    })
                    .then((ans) => pc.setLocalDescription(ans))
                    .then(() => {
                        this.socket.emit("webrtc-signal", { target: sender, answer: pc.localDescription });
                    })
                    .catch((err) => {
                        if (this.emu.debug) console.error("[NETPLAY GUEST] Answer error:", err);
                    });
            } else if (answer) {
                pc.setRemoteDescription(new RTCSessionDescription(answer))
                    .then(() => {
                        pd.iceCandidateQueue.forEach((c) => pc.addIceCandidate(new RTCIceCandidate(c)));
                        pd.iceCandidateQueue = [];
                    })
                    .catch((err) => {
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

    /* ------------------------------------------------------------------ */
    /*  Data messages                                                      */
    /* ------------------------------------------------------------------ */

    /**
     * Process an incoming data message from the signaling server.
     * Dispatches chat messages and sync-control input frames.
     * @param {Object} d - The data-message payload.
     * @private
     */
    _handleDataMessage(d) {
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
            } catch (_) { /* ignore */ }
            return;
        }

        if (d["sync-control"]) {
            for (const v of d["sync-control"]) {
                const f = parseInt(v.frame, 10);
                if (!v.connected_input || v.connected_input[0] < 0) continue;
                this.inputsData[f] = this.inputsData[f] || [];
                this.inputsData[f].push(v);
                this.sendMessage({ frameAck: f });
                if (this.owner) {
                    this.emu.gameManager?.functions?.simulateInput?.(
                        v.connected_input[0], v.connected_input[1], v.connected_input[2]
                    );
                }
            }
        }
    }

    /**
     * Emit a data message over the Socket.IO connection.
     * @param {Object} d - The payload to send.
     */
    sendMessage(d) {
        if (this.socket?.connected) {
            this.socket.emit("data-message", d);
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Open / Join room                                                   */
    /* ------------------------------------------------------------------ */

    /**
     * Create and host a new netplay room.
     * @param {string} roomName - Display name for the room.
     * @param {number} maxPlayers - Maximum number of players (2–4).
     * @param {string} password - Optional room password.
     */
    openRoom(roomName, maxPlayers, password) {
        this.unlockMobileAudio();

        if (this.emu.Module?.AL?.currentCtx?.audioCtx) {
            this.emu.Module.AL.currentCtx.audioCtx.resume().catch(() => {});
        }

        const sid = this.utils.guid();
        this.playerID = this.utils.guid();
        this.players = {};
        this.maxPlayers = maxPlayers;
        this.extra = {
            domain: window.location.host,
            game_id: this.emu.config.gameId,
            room_name: roomName,
            player_name: this.name,
            userid: this.playerID,
            sessionid: sid,
        };
        this.players[this.playerID] = this.extra;
        this.owner = true;

        this._startSocketIO(() => {
            this.socket.emit("open-room", { extra: this.extra, maxPlayers, password }, (e) => {
                if (e) { this.emu.displayMessage("Room error: " + e, 5000); return; }
                this.roomJoined(true, roomName, password, sid);
            });
        });
    }

    /**
     * Join an existing netplay room.
     * @param {string} roomId - The room/session identifier.
     * @param {string} roomName - Display name of the room.
     * @param {number} maxPlayers - Maximum player count.
     * @param {string|null} password - Room password, or null.
     */
    joinRoom(roomId, roomName, maxPlayers, password) {
        this.unlockMobileAudio();

        this.playerID = this.utils.guid();
        this.players = {};
        this.maxPlayers = maxPlayers;
        this.extra = {
            domain: window.location.host,
            game_id: this.emu.config.gameId,
            room_name: roomName,
            player_name: this.name,
            userid: this.playerID,
            sessionid: roomId,
        };
        this.players[this.playerID] = this.extra;
        this.owner = false;

        this._startSocketIO(() => {
            this.socket.emit("join-room", { extra: this.extra, password }, (e, u) => {
                if (e) {
                    this._showJoinErrorDialog(roomId, roomName, maxPlayers, e, !!password);
                    return;
                }
                this.players = u;
                this.roomJoined(false, roomName, password, roomId);
            });
        });
    }

    /* ------------------------------------------------------------------ */
    /*  Frame loop (postMainLoop hook)                                     */
    /* ------------------------------------------------------------------ */

    /**
     * Reset frame counters and input buffer for a fresh netplay session.
     */
    reset() {
        this.initFrame = this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0;
        this.currentFrame = 0;
        this.inputsData = {};
    }

    /**
     * Called every frame by the emulator's main loop.  Tracks the current
     * frame offset and, on the host, applies buffered inputs and broadcasts
     * them to connected guests.
     */
    postMainLoop() {
        if (this.emu.isNetplay && !this.owner) return;
        this.currentFrame = (this.emu.gameManager ? this.emu.gameManager.getFrameNum() : 0) - (this.initFrame || 0);
        if (!this.emu.isNetplay || !this.owner) return;

        const i = this.currentFrame;
        if (this.inputsData[i]) {
            const ts = this.inputsData[i].map((v) => {
                this.emu.gameManager?.functions?.simulateInput?.(
                    v.connected_input[0], v.connected_input[1], v.connected_input[2]
                );
                return { frame: i + 20, connected_input: v.connected_input };
            });
            this.sendMessage({ "sync-control": ts });
            delete this.inputsData[i];
        }
    }

    /* ------------------------------------------------------------------ */
    /*  Wire postMainLoop into emulator Module                             */
    /* ------------------------------------------------------------------ */

    /**
     * Configure the netplay URL, check TURN server availability, and
     * install the {@link postMainLoop} hook into the emulator's Module
     * so it is called every frame.
     */
    installPostMainLoop() {
        if (!this.configure()) return;
        this.checkTurnConfig();

        const hook = () => this.postMainLoop();
        if (this.emu.gameManager?.Module) {
            this.emu.gameManager.Module.postMainLoop = hook;
        } else if (this.emu.Module) {
            this.emu.Module.postMainLoop = hook;
        }
    }
}

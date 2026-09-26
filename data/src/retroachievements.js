
async function loginRA(username, password) {
    const url = `https://retroachievements.org/dorequest.php?r=login&u=${encodeURIComponent(username)}&p=${encodeURIComponent(password)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.Success) {
        localStorage.setItem('ra_user', data.User);
        localStorage.setItem('ra_token', data.Token);
        localStorage.setItem('ra_score', data.Score || 0);
        return data;
    } else {
        throw new Error(data.Error || 'Invalid credentials');
    }
}

import { md5 } from "./utils.js";
import { peekRAM, rc_evaluate_richpresence, evaluateOperand } from "./rcheevos/rcheevos.js";

class RetroAchievements {

    peek(address, numBytes = 1) {
        if (!this.ejs || !this.ejs.Module) return 0;
        const M = this.ejs.Module;

        let ptr = 0;
        if (typeof M._retro_get_memory_data === 'function') {
            ptr = M._retro_get_memory_data(0); // RETRO_MEMORY_SYSTEM_RAM = 0
        }

        const heap = M.HEAPU8 || (M.buffer ? new Uint8Array(M.buffer) : null);
        if (!heap || ptr + address >= heap.length) return 0;

        let val = 0;
        for (let i = 0; i < numBytes; i++) {
            val |= (heap[ptr + address + i] << (i * 8));
        }
        return val >>> 0;
    }

    static async loginRA(username, password) {
        return await loginRA(username, password);
    }

    constructor(ejs) {
        this.ejs = ejs;
        this.baseUrl = "https://retroachievements.org/dorequest.php";
        this.gameId = null;
        this.achievements = [];
        this.gameData = null;
        this.romMd5 = null;
        this.unlockedIds = new Set();
        this._pollInterval = null;
        this.loadConfig();
    }

    loadConfig() {
        try {
            const raUser = localStorage.getItem("ra_user");
            const raToken = localStorage.getItem("ra_token");
            const raw = localStorage.getItem("ejs-retroachievements-config");
            if (raUser && raToken) {
                this.username = raUser;
                this.token = raToken;
                this.hardcore = raw ? (JSON.parse(raw).hardcore === true) : false;
            } else if (raw) {
                const config = JSON.parse(raw);
                this.username = config.username || "";
                this.token = config.token || "";
                this.hardcore = config.hardcore === true;
            } else {
                this.username = "";
                this.token = "";
                this.hardcore = false;
            }
        } catch (e) {
            this.username = "";
            this.token = "";
            this.hardcore = false;
        }
    }

    saveConfig(username, token, hardcore) {
        this.username = username !== undefined ? username : this.username;
        this.token = token !== undefined ? token : this.token;
        this.hardcore = hardcore !== undefined ? !!hardcore : this.hardcore;

        const config = {
            username: this.username,
            token: this.token,
            hardcore: this.hardcore
        };

        localStorage.setItem("ejs-retroachievements-config", JSON.stringify(config));
    }

    async initGame(romBytes) {
        if (!romBytes) return;
        this.romMd5 = md5(romBytes);
        if (this.ejs.debug) console.log("[RetroAchievements] Computed ROM MD5:", this.romMd5);

        try {
            const gameId = await this.fetchGameId(this.romMd5);
            if (gameId && gameId > 0) {
                this.gameId = gameId;
                if (this.ejs.debug) console.log("[RetroAchievements] Identified Game ID:", this.gameId);
                await this.fetchPatchData(this.gameId);
                await this.startSession();
                this.startRichPresenceAndPolling();
            } else {
                if (this.ejs.debug) console.log("[RetroAchievements] No Game ID matched for MD5:", this.romMd5);
            }
        } catch (e) {
            if (this.ejs.debug) console.warn("[RetroAchievements] Initialization failed:", e);
        }
    }

    async startSession() {
        this.unlockedIds = new Set();
        if (!this.gameId || !this.romMd5) return;

        if (!this.username || !this.token) {
            if (this.ejs.debug) console.log("[RetroAchievements] Guest mode active (no credentials)");
            return;
        }

        try {
            const url = `${this.baseUrl}?r=startsession`
                + `&g=${this.gameId}`
                + `&z=${encodeURIComponent(this.username)}`
                + `&y=${encodeURIComponent(this.token)}`
                + `&h=${this.hardcore ? 1 : 0}`
                + `&m=${this.romMd5}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            const unlocks = (this.hardcore ? data.HardcoreUnlocks : data.Unlocks) || data.Unlocks || data.HardcoreUnlocks || [];
            if (Array.isArray(unlocks)) {
                unlocks.forEach(item => {
                    if (typeof item === "object" && item !== null) {
                        const id = item.ID || item.id || item.AchievementID;
                        if (id !== undefined) this.unlockedIds.add(Number(id));
                    } else if (item !== undefined) {
                        this.unlockedIds.add(Number(item));
                    }
                });
            }
            if (this.ejs.debug) console.log("[RetroAchievements] Session started. Unlocked count:", this.unlockedIds.size);
        } catch (e) {
            if (this.ejs.debug) console.warn("[RetroAchievements] Failed to start session:", e);
        }
    }

    startAchievementPolling() {
        if (this._pollInterval) return;
        this._pollInterval = setInterval(() => {
            this.checkAchievements();
        }, 500); // check every 500ms
    }

    stopAchievementPolling() {
        if (this._pollInterval) {
            clearInterval(this._pollInterval);
            this._pollInterval = null;
        }
    }

    checkAchievements() {
        if (!this.achievements || this.achievements.length === 0) return;

        // TODO: requires gameManager memory read API
        if (!this.ejs.gameManager || typeof this.ejs.gameManager.getRetroVariable !== "function") {
            return;
        }

        for (const achievement of this.achievements) {
            const achId = achievement.ID || achievement.id;
            if (achId === undefined || this.unlockedIds.has(Number(achId))) continue;

            // Evaluate memory condition if address is available
            const conditionMet = false; // Stub until memory read API is available
            if (conditionMet) {
                this.awardAchievement(achievement);
            }
        }
    }

    async awardAchievement(achievement) {
        const achId = achievement.ID || achievement.id;
        if (achId === undefined) return;
        const numericId = Number(achId);
        if (this.unlockedIds.has(numericId)) return;

        this.unlockedIds.add(numericId);
        this.showUnlockToast(achievement);

        if (!this.username || !this.token) return; // guest — local only

        try {
            const url = `${this.baseUrl}?r=awardachievement`
                + `&z=${encodeURIComponent(this.username)}`
                + `&y=${encodeURIComponent(this.token)}`
                + `&a=${numericId}`
                + `&h=${this.hardcore ? 1 : 0}`
                + `&m=${this.romMd5}`;
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const data = await res.json();
            if (this.ejs.debug) console.log("[RetroAchievements] Awarded:", achievement.Title || achievement.title, data);
        } catch (e) {
            console.warn("[RetroAchievements] Failed to submit award:", e);
            // Do NOT remove from unlockedIds — don't double-toast on retry
        }
    }


    startRichPresenceAndPolling() {
        if (this._frameInterval) clearInterval(this._frameInterval);
        if (this._pingInterval) clearInterval(this._pingInterval);

        // Frame interval (every ~1s / 60 frames equivalent)
        this._frameInterval = setInterval(() => {
            this.evaluateGameFrame();
        }, 1000);

        // Ping interval (every 2 minutes)
        this._pingInterval = setInterval(() => {
            this.sendRichPresencePing();
        }, 120000);

        // Initial evaluation
        this.evaluateGameFrame();
        this.sendRichPresencePing();
    }

    stopAchievementPolling() {
        if (this._frameInterval) {
            clearInterval(this._frameInterval);
            this._frameInterval = null;
        }
        if (this._pingInterval) {
            clearInterval(this._pingInterval);
            this._pingInterval = null;
        }
        if (this._pollInterval) {
            clearInterval(this._pollInterval);
            this._pollInterval = null;
        }
    }

    evaluateGameFrame() {
        if (!this.gameData) return;
        const peek = (addr, size) => this.peek(addr, size);

        // Evaluate Rich Presence
        const script = this.gameData.RichPresencePatch || this.gameData.RichPresence || "";
        if (script) {
            this.richPresenceText = rc_evaluate_richpresence(script, peek);
        } else {
            this.richPresenceText = "Playing " + (this.gameData.Title || "Game");
        }

        // Evaluate Achievements
        if (this.achievements && this.achievements.length > 0) {
            for (const ach of this.achievements) {
                const id = Number(ach.ID || ach.id);
                if (this.unlockedIds.has(id)) continue;

                // Simple mem condition evaluation if mem string supplied
                if (ach.MemAddr) {
                    const condMet = evaluateOperand(ach.MemAddr, peek) > 0;
                    if (condMet) {
                        this.awardAchievement(ach);
                    }
                }
            }
        }
    }

    async sendRichPresencePing() {
        if (!this.username || !this.token || !this.gameId) return;
        const text = this.richPresenceText || ("Playing " + (this.gameData ? this.gameData.Title : "Game"));
        const url = `${this.baseUrl}?r=ping`
            + `&u=${encodeURIComponent(this.username)}`
            + `&t=${encodeURIComponent(this.token)}`
            + `&g=${this.gameId}`
            + `&m=${encodeURIComponent(text)}`;
        try {
            const res = await fetch(url);
            if (this.ejs.debug) console.log("[RetroAchievements] Rich Presence Ping sent:", text, res.status);
        } catch (e) {
            if (this.ejs.debug) console.warn("[RetroAchievements] Ping failed:", e);
        }
    }

    async fetchGameId(hash) {
        let url = `${this.baseUrl}?r=gameid&m=${hash}`;
        if (this.username && this.token) {
            url += `&z=${encodeURIComponent(this.username)}&y=${encodeURIComponent(this.token)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.GameID || data.gameID || data.ID || 0;
    }

    async fetchPatchData(gameId) {
        let url = `${this.baseUrl}?r=patch&g=${gameId}`;
        if (this.username && this.token) {
            url += `&z=${encodeURIComponent(this.username)}&y=${encodeURIComponent(this.token)}`;
        }
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        this.gameData = data;
        if (data.Achievements && Array.isArray(data.Achievements)) {
            this.achievements = data.Achievements;
            if (this.ejs.debug) console.log(`[RetroAchievements] Loaded ${this.achievements.length} achievements`);
        } else {
            this.achievements = [];
        }
        return data;
    }

    playChime() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            if (!AudioContext) return;
            const ctx = new AudioContext();

            const playNote = (freq, startTime, duration) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();

                osc.type = "sine";
                osc.frequency.setValueAtTime(freq, ctx.currentTime + startTime);

                gain.gain.setValueAtTime(0.001, ctx.currentTime + startTime);
                gain.gain.exponentialRampToValueAtTime(0.25, ctx.currentTime + startTime + 0.03);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startTime + duration);

                osc.connect(gain);
                gain.connect(ctx.destination);

                osc.start(ctx.currentTime + startTime);
                osc.stop(ctx.currentTime + startTime + duration);
            };

            // Classic retro ascending chime sequence (C5 -> E5 -> G5 -> C6)
            playNote(523.25, 0.00, 0.15); // C5
            playNote(659.25, 0.12, 0.15); // E5
            playNote(783.99, 0.24, 0.15); // G5
            playNote(1046.50, 0.36, 0.40); // C6
        } catch (e) {
            console.warn("[RetroAchievements] Could not play chime:", e);
        }
    }

    showUnlockToast(achievement) {
        const title = achievement.Title || achievement.title || "Achievement Unlocked!";
        const description = achievement.Description || achievement.description || "";
        const points = achievement.Points || achievement.points || 0;
        const badge = achievement.BadgeName || achievement.badge || "00000";

        const badgeUrl = badge.startsWith("http")
            ? badge
            : `https://media.retroachievements.org/Badge/${badge}.png`;

        const toast = document.createElement("div");
        toast.className = "ra_toast_notification";

        toast.innerHTML = `
            <div class="ra_toast_badge_container">
                <img src="${badgeUrl}" alt="Badge" class="ra_toast_badge" onerror="this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 24 24\\' fill=\\'%23f59e0b\\'><path d=\\'M12 2l2.4 7.4h7.6l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4-6.2-4.5h7.6z\\'/></svg>';">
            </div>
            <div class="ra_toast_content">
                <div class="ra_toast_header">
                    <span class="ra_toast_tag">ACHIEVEMENT UNLOCKED</span>
                    <span class="ra_toast_points">+${points} PTS</span>
                </div>
                <div class="ra_toast_title">${title}</div>
                <div class="ra_toast_desc">${description}</div>
            </div>
        `;

        const container = (this.ejs && this.ejs.frontend && this.ejs.frontend.elements && this.ejs.frontend.elements.parent)
            ? this.ejs.frontend.elements.parent
            : document.body;

        container.appendChild(toast);

        this.playChime();

        requestAnimationFrame(() => {
            toast.classList.add("ra_toast_visible");
        });

        setTimeout(() => {
            toast.classList.remove("ra_toast_visible");
            toast.classList.add("ra_toast_hiding");
            setTimeout(() => {
                if (toast.remove) toast.remove();
                else if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 500);
        }, 4000);
    }

    showProgressToast(achievement, current, target) {
        const title = achievement.Title || achievement.title || "Achievement Progress";
        let toast = document.querySelector(".ra_progress_toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.className = "ra_progress_toast";
            const container = (this.ejs && this.ejs.frontend && this.ejs.frontend.elements && this.ejs.frontend.elements.parent)
                ? this.ejs.frontend.elements.parent
                : document.body;
            container.appendChild(toast);
        }

        toast.innerText = `${title}: ${current} / ${target}`;

        requestAnimationFrame(() => {
            toast.classList.add("visible");
        });

        if (this._progressTimeout) clearTimeout(this._progressTimeout);
        this._progressTimeout = setTimeout(() => {
            toast.classList.remove("visible");
            setTimeout(() => {
                if (toast && toast.remove) toast.remove();
                else if (toast && toast.parentNode) toast.parentNode.removeChild(toast);
            }, 300);
        }, 2000);
    }

    unlockAchievement(achievement) {
        if (achievement) {
            const achId = achievement.ID || achievement.id;
            if (achId !== undefined) {
                this.unlockedIds.delete(Number(achId));
            }
            this.awardAchievement(achievement);
        }
    }
}

export { RetroAchievements, loginRA };

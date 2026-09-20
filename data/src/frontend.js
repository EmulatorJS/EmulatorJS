import { EJS_license } from "./license.js";

import "./vendor/nipplejs.js";

class EJS_Frontend {
    constructor(ejs, element) {
        this.ejs = ejs;
        this.currentPopup = null;
        this.missingLang = [];
        this.textElem = null;
        this.setElements(element);
        this.canvas = this.ejs.createElement("canvas");
        this.canvas.classList.add("ejs_canvas");
    }
    updatePlayPauseButtons(paused) {
        const [pauseButton, playButton] = this.elements.bottomBar.playPause;
        pauseButton.style.display = paused ? "none" : "";
        playButton.style.display = paused ? "" : "none";
    }
    updateFullscreenButtons(fullscreen) {
        const [enter, exit] = this.elements.bottomBar.fullscreen;
        enter.style.display = fullscreen ? "none" : "";
        exit.style.display = fullscreen ? "" : "none";
    }
    updateVolumeSliderState(volume) {
        const [volumeSlider] = this.elements.bottomBar.volumeSlider;
        volumeSlider.value = volume;
        volumeSlider.setAttribute("aria-valuenow", volume * 100);
        volumeSlider.setAttribute("aria-valuetext", (volume * 100).toFixed(1) + "%");
        volumeSlider.setAttribute("style", "--value: " + volume * 100 + "%;margin-left: 5px;position: relative;z-index: 2;");
        if (!this.ejs.config.buttonOpts || this.ejs.config.buttonOpts.mute !== false) {
            const [muteButton, unmuteButton] = this.elements.bottomBar.mute;
            unmuteButton.style.display = (volume === 0) ? "" : "none";
            muteButton.style.display = (volume === 0) ? "none" : "";
        }
    }
    localization(text, log) {
        if (typeof text === "undefined" || text.length === 0) return;
        text = text.toString();
        if (text.includes("EmulatorJS v")) return text;
        if (this.ejs.config.langJson) {
            if (typeof log === "undefined") log = true;
            if (!this.ejs.config.langJson[text] && log) {
                if (!this.missingLang.includes(text)) this.missingLang.push(text);
                if (this.ejs.debug) console.log(`Translation not found for '${text}'. Language set to '${this.ejs.config.language}'`);
            }
            return this.ejs.config.langJson[text] || text;
        }
        return text;
    }
    localizeAll(text) {
        if (!Array.isArray(text)) return this.localization(text);
        return text.map(e => this.localization(e)).join("\n");
    }
    setBackground() {
        this.game.classList.add("ejs_game");
        if (typeof this.ejs.config.backgroundImg === "string") {
            this.game.classList.add("ejs_game_background");
            if (this.ejs.config.backgroundBlur) this.game.classList.add("ejs_game_background_blur");
            this.game.setAttribute("style", `--ejs-background-image: url("${this.ejs.config.backgroundImg}"); --ejs-background-color: ${this.ejs.config.backgroundColor};`);
            this.ejs.on("start", () => {
                this.game.classList.remove("ejs_game_background");
                if (this.ejs.config.backgroundBlur) this.game.classList.remove("ejs_game_background_blur");
            })
        } else {
            this.game.setAttribute("style", "--ejs-background-color: " + this.ejs.config.backgroundColor + ";");
        }
    }
    setTouchActive() {
        if (!this.virtualGamepad) return;
        this.virtualGamepad.classList.add("ejs-vgamepad-active");
        this.canvas.classList.add("ejs-canvas-no-pointer");
    }
    setLoadingText(text, suffix) {
        this.textElem.innerText = (text ? this.localizeAll(text) : "") + (suffix || "");
    }
    showError(text, suffix) {
        this.textElem.innerText = this.localizeAll(text) + (suffix || "");
        this.textElem.classList.add("ejs_error_text");
        this.setupSettingsMenu();
    }
    failedToStart() {
        this.menu.failedToStart();
        this.handleResize();
    }
    hideSaveFileButtons() {
        this.elements.bottomBar.saveSavFiles[0].style.display = "none";
        this.elements.bottomBar.loadSavFiles[0].style.display = "none";
    }
    hideDisksButton() {
        this.diskParent.style.display = "none";
    }
    setMenuBarButtonVisible(visible) {
        this.elements.menuToggle.style.display = "";
        this.elements.menuToggle.style.opacity = visible ? 0.5 : 0;
    }
    setLightgunCursor(active) {
        if (!this.canvas) return;
        this.canvas.style.cursor = active ? "none" : "";
    }
    gameStarted() {
        this.checkSupportedOpts();
        this.setupDisksMenu();
        this.setupSettingsMenu();
    }
    showCanvas() {
        if (this.ejs.config.noAutoFocus !== true) this.elements.parent.focus();
        this.textElem.remove();
        this.textElem = null;
        this.game.classList.remove("ejs_game");
        this.game.classList.add("ejs_canvas_parent");
        this.game.appendChild(this.canvas);
        this.handleResize();
    }
    showVirtualGamepad() {
        this.virtualGamepad.style.display = "";
    }
    requestFullscreen() {
        if (this.elements.parent.requestFullscreen) {
            this.elements.parent.requestFullscreen();
        } else if (this.elements.parent.mozRequestFullScreen) {
            this.elements.parent.mozRequestFullScreen();
        } else if (this.elements.parent.webkitRequestFullscreen) {
            this.elements.parent.webkitRequestFullscreen();
        } else if (this.elements.parent.msRequestFullscreen) {
            this.elements.parent.msRequestFullscreen();
        }
        this.updateFullscreenButtons(true);
    }
    exitFullscreen() {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
        this.updateFullscreenButtons(false);
    }
    exitPointerLock() {
        if (this.canvas.exitPointerLock) {
            this.canvas.exitPointerLock();
        } else if (this.canvas.mozExitPointerLock) {
            this.canvas.mozExitPointerLock();
        }
    }
    isRemapping() {
        return this.controlPopup.parentElement.parentElement.getAttribute("hidden") === null;
    }
    getRemapTarget() {
        return {
            num: this.controlPopup.getAttribute("button-num"),
            player: this.controlPopup.getAttribute("player-num")
        };
    }
    clearRemapTarget() {
        this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
    }
    isSettingsMenuOpen() {
        return this.settingsMenu.style.display !== "none";
    }
    showResumePrompt() {
        const popup = this.createPopup("", {});
        const button = this.ejs.createElement("button");
        button.innerText = this.localization("Click to resume Emulator");
        button.classList.add("ejs_menu_button");
        button.style.width = "25%";
        button.style.height = "25%";
        popup.appendChild(button);
        popup.style["text-align"] = "center";
        popup.style["font-size"] = "28px";
        return popup;
    }
    setColor(color) {
        if (typeof color !== "string") color = "";
        let getColor = function(color) {
            color = color.toLowerCase();
            if (color && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(color)) {
                if (color.length === 4) {
                    let rv = "#";
                    for (let i = 1; i < 4; i++) {
                        rv += color.slice(i, i + 1) + color.slice(i, i + 1);
                    }
                    color = rv;
                }
                let rv = [];
                for (let i = 1; i < 7; i += 2) {
                    rv.push(parseInt("0x" + color.slice(i, i + 2), 16));
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
        const div = this.ejs.createElement("div");
        const time = (typeof this.ejs.config.adMode === "number" && this.ejs.config.adMode > -1 && this.ejs.config.adMode < 3) ? this.ejs.config.adMode : 2;
        div.classList.add("ejs_ad_iframe");
        const frame = this.ejs.createElement("iframe");
        frame.src = ads;
        frame.setAttribute("scrolling", "no");
        frame.setAttribute("frameborder", "no");
        frame.style.width = width;
        frame.style.height = height;
        const closeParent = this.ejs.createElement("div");
        closeParent.classList.add("ejs_ad_close");
        const closeButton = this.ejs.createElement("a");
        closeParent.appendChild(closeButton);
        closeParent.setAttribute("hidden", "");
        div.appendChild(closeParent);
        div.appendChild(frame);
        if (this.ejs.config.adMode !== 1) {
            this.elements.parent.appendChild(div);
        }
        this.ejs.addEventListener(closeButton, "click", () => {
            div.remove();
        })

        this.ejs.on("start-clicked", () => {
            if (this.ejs.config.adMode === 0) div.remove();
            if (this.ejs.config.adMode === 1) {
                this.elements.parent.appendChild(div);
            }
        })

        this.ejs.on("start", () => {
            closeParent.removeAttribute("hidden");
            const time = (typeof this.ejs.config.adTimer === "number" && this.ejs.config.adTimer > 0) ? this.ejs.config.adTimer : 10000;
            if (this.ejs.config.adTimer === -1) div.remove();
            if (this.ejs.config.adTimer === 0) return;
            setTimeout(() => {
                div.remove();
            }, time);
        })

    }
    adBlocked(url, del) {
        if (del) {
            document.querySelector('div[class="ejs_ad_iframe"]').remove();
        } else {
            try {
                document.querySelector('div[class="ejs_ad_iframe"]').remove();
            } catch(e) {}
            this.ejs.config.adUrl = url;
            this.setupAds(this.ejs.config.adUrl, this.ejs.config.adSize[0], this.ejs.config.adSize[1]);
        }
    }
    bindListeners() {
        this.createContextMenu();
        this.createBottomMenuBar();
        this.createControlSettingMenu();
        this.createCheatsMenu();
        this.setVirtualGamepad();
        this.ejs.addEventListener(this.elements.parent, "keydown keyup", this.ejs.keyChange.bind(this.ejs));
        this.ejs.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (document.activeElement !== this.elements.parent && this.ejs.config.noAutoFocus !== true) this.elements.parent.focus();
        })
        this.ejs.addEventListener(window, "resize", this.handleResize.bind(this));
        this.ejs.addEventListener(window, "blur", () => this.ejs.stopAllAutofire());

        let counter = 0;
        this.elements.statePopupPanel = this.createPopup("", {}, true);
        this.elements.statePopupPanel.innerText = this.localization("Drop save state here to load");
        this.elements.statePopupPanel.style["text-align"] = "center";
        this.elements.statePopupPanel.style["font-size"] = "28px";

        //to fix a funny apple bug
        this.ejs.addEventListener(window, "webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange", () => {
            setTimeout(() => {
                this.handleResize.bind(this);
                if (this.ejs.config.noAutoFocus !== true) this.elements.parent.focus();
            }, 0);
        });
        this.ejs.addEventListener(window, "beforeunload", (e) => {
            if (this.ejs.config.disableAutoUnload) {
                e.preventDefault();
                e.returnValue = "";
                return
            }
            if (!this.ejs.started) return;
            this.ejs.callEvent("exit");
        });
        this.ejs.addEventListener(this.elements.parent, "dragenter", (e) => {
            e.preventDefault();
            if (!this.ejs.started) return;
            counter++;
            this.elements.statePopupPanel.parentElement.style.display = "block";
        });
        this.ejs.addEventListener(this.elements.parent, "dragover", (e) => {
            e.preventDefault();
        });
        this.ejs.addEventListener(this.elements.parent, "dragleave", (e) => {
            e.preventDefault();
            if (!this.ejs.started) return;
            counter--;
            if (counter === 0) {
                this.elements.statePopupPanel.parentElement.style.display = "none";
            }
        });
        this.ejs.addEventListener(this.elements.parent, "dragend", (e) => {
            e.preventDefault();
            if (!this.ejs.started) return;
            counter = 0;
            this.elements.statePopupPanel.parentElement.style.display = "none";
        });

        this.ejs.addEventListener(this.elements.parent, "drop", (e) => {
            e.preventDefault();
            if (!this.ejs.started) return;
            this.elements.statePopupPanel.parentElement.style.display = "none";
            counter = 0;
            const items = e.dataTransfer.items;
            let file;
            for (let i = 0; i < items.length; i++) {
                if (items[i].kind !== "file") continue;
                file = items[i];
                break;
            }
            if (!file) return;
            const fileHandle = file.getAsFile();
            fileHandle.arrayBuffer().then(data => {
                this.ejs.gameManager.loadState(new Uint8Array(data));
            })
        });
    }
    setElements(element) {
        const game = this.ejs.createElement("div");
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
        const button = this.ejs.createElement("div");
        button.classList.add("ejs_start_button");
        let border = 0;
        if (typeof this.ejs.config.backgroundImg === "string") {
            button.classList.add("ejs_start_button_border");
            border = 1;
        }
        button.innerText = (typeof this.ejs.config.startBtnName === "string") ? this.ejs.config.startBtnName : this.localization("Start Game");
        if (this.ejs.config.alignStartButton == "top") {
            button.style.bottom = "calc(100% - 20px)";
        } else if (this.ejs.config.alignStartButton == "center") {
            button.style.bottom = "calc(50% + 22.5px + " + border + "px)";
        }
        this.elements.parent.appendChild(button);
        this.ejs.addEventListener(button, "touchstart", () => {
            this.ejs.touch = true;
        })
        this.ejs.addEventListener(button, "click", this.startButtonClicked.bind(this));
        if (this.ejs.config.startOnLoad === true) {
            this.startButtonClicked(button);
        }
        setTimeout(() => {
            this.ejs.callEvent("ready");
        }, 20);
    }
    startButtonClicked(e) {
        this.ejs.callEvent("start-clicked");
        if (e.pointerType === "touch") {
            this.ejs.touch = true;
        }
        if (e.preventDefault) {
            e.preventDefault();
            e.target.remove();
        } else {
            e.remove();
        }
        this.createText();
        this.ejs.downloadGameCore();
    }
    // End start button
    createText() {
        this.textElem = this.ejs.createElement("div");
        this.textElem.classList.add("ejs_loading_text");
        if (typeof this.ejs.config.backgroundImg === "string") this.textElem.classList.add("ejs_loading_text_glow");
        this.textElem.innerText = this.localization("Loading...");
        this.elements.parent.appendChild(this.textElem);
    }
    displayMessage(message, time, suffix) {
        if (!this.msgElem) {
            this.msgElem = this.ejs.createElement("div");
            this.msgElem.classList.add("ejs_message");
            this.msgElem.style.zIndex = "6";
            this.elements.parent.appendChild(this.msgElem);
        }
        clearTimeout(this.msgTimeout);
        this.msgTimeout = setTimeout(() => {
            this.msgElem.innerText = "";
        }, (typeof time === "number" && time > 0) ? time : 3000)
        this.msgElem.innerText = this.localizeAll(message) + (suffix || "");
    }
    checkSupportedOpts() {
        if (!this.ejs.gameManager.supportsStates()) {
            this.elements.bottomBar.saveState[0].style.display = "none";
            this.elements.bottomBar.loadState[0].style.display = "none";
            this.elements.bottomBar.netplay[0].style.display = "none";
            this.elements.contextMenu.save.style.display = "none";
            this.elements.contextMenu.load.style.display = "none";
        }
        if (typeof this.ejs.config.gameId !== "number" || !this.ejs.config.netplayUrl || this.ejs.netplayEnabled === false) {
            this.elements.bottomBar.netplay[0].style.display = "none";
        }
    }
    updateGamepadLabels() {
        for (let i = 0; i < this.gamepadLabels.length; i++) {
            this.gamepadLabels[i].innerHTML = ""
            const def = this.ejs.createElement("option");
            def.setAttribute("value", "notconnected");
            def.innerText = "Not Connected";
            this.gamepadLabels[i].appendChild(def);
            for (let j = 0; j < this.ejs.gamepad.gamepads.length; j++) {
                const opt = this.ejs.createElement("option");
                opt.setAttribute("value", this.ejs.gamepad.gamepads[j].id + "_" + this.ejs.gamepad.gamepads[j].index);
                opt.innerText = this.ejs.gamepad.gamepads[j].id + "_" + this.ejs.gamepad.gamepads[j].index;
                this.gamepadLabels[i].appendChild(opt);
            }
            this.gamepadLabels[i].value = this.gamepadSelection[i] || "notconnected";
        }
    }
    createLink(elem, link, text, useP) {
        const elm = this.ejs.createElement("a");
        elm.href = link;
        elm.target = "_blank";
        elm.innerText = this.localization(text);
        if (useP) {
            const p = this.ejs.createElement("p");
            p.appendChild(elm);
            elem.appendChild(p);
        } else {
            elem.appendChild(elm);
        }
    }
    createContextMenu() {
        this.elements.contextmenu = this.ejs.createElement("div");
        this.elements.contextmenu.classList.add("ejs_context_menu");
        this.ejs.addEventListener(this.game, "contextmenu", (e) => {
            e.preventDefault();
            if ((this.ejs.config.buttonOpts && this.ejs.config.buttonOpts.rightClick === false) || !this.ejs.started || this.ejs.lightgunActive) return;
            const parentRect = this.elements.parent.getBoundingClientRect();
            this.elements.contextmenu.style.display = "block";
            const rect = this.elements.contextmenu.getBoundingClientRect();
            const up = e.offsetY + rect.height > parentRect.height - 25;
            const left = e.offsetX + rect.width > parentRect.width - 5;
            this.elements.contextmenu.style.left = (e.offsetX - (left ? rect.width : 0)) + "px";
            this.elements.contextmenu.style.top = (e.offsetY - (up ? rect.height : 0)) + "px";
        })
        const hideMenu = () => {
            this.elements.contextmenu.style.display = "none";
        }
        this.ejs.addEventListener(this.elements.contextmenu, "contextmenu", (e) => e.preventDefault());
        this.ejs.addEventListener(this.elements.parent, "contextmenu", (e) => e.preventDefault());
        this.ejs.addEventListener(this.game, "mousedown touchend", hideMenu);
        // Prevent mouse buttons 4/5 (back/forward) from navigating away
        // when used as lightgun Start/Select. Works in Chromium-based
        // browsers; Firefox handles back/forward navigation before page
        // event handlers fire, so this has no effect there.
        // See: https://support.mozilla.org/en-US/questions/1319892
        for (const evtName of ["mousedown", "mouseup", "auxclick"]) {
            this.ejs.addEventListener(this.game, evtName, (e) => {
                if (this.ejs.lightgunActive && (e.button === 3 || e.button === 4)) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            });
        }
        const parent = this.ejs.createElement("ul");
        const addButton = (title, hidden, functi0n) => {
            //<li><a href="#" onclick="return false">'+title+'</a></li>
            const li = this.ejs.createElement("li");
            if (hidden) li.hidden = true;
            const a = this.ejs.createElement("a");
            if (functi0n instanceof Function) {
                this.ejs.addEventListener(li, "click", (e) => {
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
            const fileName = this.ejs.getBaseFileName() + "-" + this.ejs.getFileNameTimestamp(new Date());
            this.ejs.screenshot((blob, format) => {
                screenshotUrl = URL.createObjectURL(blob);
                const a = this.ejs.createElement("a");
                a.href = screenshotUrl;
                a.download = fileName + "." + format;
                a.click();
                hideMenu();
            });
        });

        let screenMediaRecorder = null;
        const startScreenRecording = addButton("Start Screen Recording", false, () => {
            if (screenMediaRecorder !== null) {
                screenMediaRecorder.stop();
            }
            const recorder = this.ejs.screenRecord();
            if (recorder === null) {
                return;
            }
            screenMediaRecorder = recorder;
            const resetScreenRecordingButtons = () => {
                if (screenMediaRecorder === recorder) {
                    screenMediaRecorder = null;
                    startScreenRecording.removeAttribute("hidden");
                    stopScreenRecording.setAttribute("hidden", "hidden");
                }
            };
            screenMediaRecorder.addEventListener("stop", resetScreenRecordingButtons, { once: true });
            screenMediaRecorder.addEventListener("error", resetScreenRecordingButtons, { once: true });
            startScreenRecording.setAttribute("hidden", "hidden");
            stopScreenRecording.removeAttribute("hidden");
            hideMenu();
        });
        const stopScreenRecording = addButton("Stop Screen Recording", true, () => {
            if (screenMediaRecorder !== null) {
                screenMediaRecorder.stop();
                screenMediaRecorder = null;
            }
            startScreenRecording.removeAttribute("hidden");
            stopScreenRecording.setAttribute("hidden", "hidden");
            hideMenu();
        });

        const qSave = addButton("Quick Save", false, () => {
            const slot = this.ejs.getSettingValue("save-state-slot") ? this.ejs.getSettingValue("save-state-slot") : "1";
            if (this.ejs.gameManager.quickSave(slot)) {
                this.displayMessage("SAVED STATE TO SLOT", undefined, " " + slot);
            } else {
                this.displayMessage("FAILED TO SAVE STATE");
            }
            hideMenu();
        });
        const qLoad = addButton("Quick Load", false, () => {
            const slot = this.ejs.getSettingValue("save-state-slot") ? this.ejs.getSettingValue("save-state-slot") : "1";
            this.ejs.gameManager.quickLoad(slot);
            this.displayMessage("LOADED STATE FROM SLOT", undefined, " " + slot);
            hideMenu();
        });
        this.elements.contextMenu = {
            screenshot: screenshot,
            startScreenRecording: startScreenRecording,
            stopScreenRecording: stopScreenRecording,
            save: qSave,
            load: qLoad
        }
        addButton("EmulatorJS v" + this.ejs.ejs_version, false, () => {
            hideMenu();
            const body = this.createPopup("EmulatorJS", {
                "Close": () => {
                    this.closePopup();
                }
            });

            body.style.display = "flex";

            const menu = this.ejs.createElement("div");
            body.appendChild(menu);
            menu.classList.add("ejs_list_selector");
            const parent = this.ejs.createElement("ul");
            const addButton = (title, hidden, functi0n) => {
                const li = this.ejs.createElement("li");
                if (hidden) li.hidden = true;
                const a = this.ejs.createElement("a");
                if (functi0n instanceof Function) {
                    this.ejs.addEventListener(li, "click", (e) => {
                        e.preventDefault();
                        functi0n(li);
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
            const home = this.ejs.createElement("div");
            const license = this.ejs.createElement("div");
            license.style.display = "none";
            const retroarch = this.ejs.createElement("div");
            retroarch.style.display = "none";
            const coreLicense = this.ejs.createElement("div");
            coreLicense.style.display = "none";
            body.appendChild(home);
            body.appendChild(license);
            body.appendChild(retroarch);
            body.appendChild(coreLicense);

            home.innerText = "EmulatorJS v" + this.ejs.ejs_version;
            home.appendChild(this.ejs.createElement("br"));
            home.appendChild(this.ejs.createElement("br"));

            home.classList.add("ejs_context_menu_tab");
            license.classList.add("ejs_context_menu_tab");
            retroarch.classList.add("ejs_context_menu_tab");
            coreLicense.classList.add("ejs_context_menu_tab");

            this.createLink(home, "https://github.com/EmulatorJS/EmulatorJS", "View on GitHub", true);

            this.createLink(home, "https://discord.gg/6akryGkETU", "Join the discord", true);

            const info = this.ejs.createElement("div");

            this.createLink(info, "https://emulatorjs.org", "EmulatorJS");
            // I do not like using innerHTML, though this should be "safe"
            info.innerHTML += " is powered by ";
            this.createLink(info, "https://github.com/libretro/RetroArch/", "RetroArch");
            if (this.ejs.repository && this.ejs.coreName) {
                info.innerHTML += ". This core is powered by ";
                this.createLink(info, this.ejs.repository, this.ejs.coreName);
                info.innerHTML += ".";
            } else {
                info.innerHTML += ".";
            }
            home.appendChild(info);


            home.appendChild(this.ejs.createElement("br"));
            menu.appendChild(parent);
            let current = home;
            const setElem = (element, li) => {
                if (current === element) return;
                if (current) {
                    current.style.display = "none";
                }
                let activeLi = li.parentElement.querySelector(".ejs_active_list_element");
                if (activeLi) {
                    activeLi.classList.remove("ejs_active_list_element");
                }
                li.classList.add("ejs_active_list_element");
                current = element;
                element.style.display = "";
            }
            addButton("Home", false, (li) => {
                setElem(home, li);
            }).classList.add("ejs_active_list_element");
            addButton("EmulatorJS License", false, (li) => {
                setElem(license, li);
            });
            addButton("RetroArch License", false, (li) => {
                setElem(retroarch, li);
            });
            if (this.ejs.coreName && this.ejs.license) {
                addButton(this.ejs.coreName + " License", false, (li) => {
                    setElem(coreLicense, li);
                })
                coreLicense.innerText = this.ejs.license;
            }
            //Todo - Contributors.

            retroarch.innerText = this.localization("This project is powered by") + " ";
            const a = this.ejs.createElement("a");
            a.href = "https://github.com/libretro/RetroArch";
            a.target = "_blank";
            a.innerText = "RetroArch";
            retroarch.appendChild(a);
            const licenseLink = this.ejs.createElement("a");
            licenseLink.target = "_blank";
            licenseLink.href = "https://github.com/libretro/RetroArch/blob/master/COPYING";
            licenseLink.innerText = this.localization("View the RetroArch license here");
            a.appendChild(this.ejs.createElement("br"));
            a.appendChild(licenseLink);

            license.innerText = EJS_license;
        });

        if (this.ejs.config.buttonOpts) {
            if (this.ejs.config.buttonOpts.screenshot.visible === false) screenshot.setAttribute("hidden", "");
            if (this.ejs.config.buttonOpts.screenRecord.visible === false) startScreenRecording.setAttribute("hidden", "");
            if (this.ejs.config.buttonOpts.quickSave.visible === false) qSave.setAttribute("hidden", "");
            if (this.ejs.config.buttonOpts.quickLoad.visible === false) qLoad.setAttribute("hidden", "");
        }

        this.elements.contextmenu.appendChild(parent);

        this.elements.parent.appendChild(this.elements.contextmenu);
    }
    closePopup() {
        if (this.currentPopup !== null) {
            try {
                this.currentPopup.remove();
            } catch(e) {}
            this.currentPopup = null;
        }
    }
    //creates a full box popup.
    createPopup(popupTitle, buttons, hidden) {
        if (!hidden) this.closePopup();
        const popup = this.ejs.createElement("div");
        popup.classList.add("ejs_popup_container");
        this.elements.parent.appendChild(popup);
        const title = this.ejs.createElement("h4");
        title.innerText = this.localization(popupTitle);
        const main = this.ejs.createElement("div");
        main.classList.add("ejs_popup_body");

        popup.appendChild(title);
        popup.appendChild(main);

        const padding = this.ejs.createElement("div");
        padding.style["padding-top"] = "10px";
        popup.appendChild(padding);

        for (let k in buttons) {
            const button = this.ejs.createElement("a");
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
    showInputPrompt(opts) {
        opts = opts || {};
        const hint = opts.hint || "Enter text";
        const maxLength = opts.maxLength | 0;
        const password = !!opts.password;
        return new Promise((resolve) => {
            const popups = this.createSubPopup();
            this.currentPopup = popups;
            this.game.appendChild(popups[0]);
            const popup = popups[1];
            popup.classList.add("small_popup");
            popup.style.width = "100%";
            const header = this.ejs.createElement("div");
            const title = this.ejs.createElement("h2");
            title.innerText = this.localization(hint);
            header.appendChild(title);
            popup.appendChild(header);
            
            const input = this.ejs.createElement("input");
            input.type = "text";
            input.style.width = "100%";
            popup.appendChild(input);
            
            const submit = this.ejs.createElement("button");
            submit.classList.add("ejs_button_button");
            submit.classList.add("ejs_popup_submit");
            submit.innerText = this.localization("Submit");
            popup.appendChild(submit);
            this.ejs.addEventListener(submit, "click", (e) => {
                if (!input.value.trim())
                    return;
                popups[0].remove();
                this.currentPopup = null;
                resolve(input.value.trim());
            });
        });
    }
    selectFile() {
        return new Promise((resolve, reject) => {
            const file = this.ejs.createElement("input");
            file.type = "file";
            this.ejs.addEventListener(file, "change", (e) => {
                resolve(e.target.files[0]);
            })
            file.click();
        })
    }
    isPopupOpen() {
        return (this.cheatMenu && this.cheatMenu.style.display !== "none") ||
               (this.ejs.netplay && this.ejs.netplay.isMenuOpen()) ||
               (this.controlMenu && this.controlMenu.style.display !== "none") ||
               this.currentPopup !== null;
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
        this.elements.menu = this.ejs.createElement("div");

        //prevent weird glitch on some devices
        this.elements.menu.style.opacity = 0;
        this.ejs.on("start", (e) => {
            this.elements.menu.style.opacity = "";
        })
        this.elements.menu.classList.add("ejs_menu_bar");
        this.elements.menu.classList.add("ejs_menu_bar_hidden");

        let timeout = null;
        let ignoreEvents = false;
        const hide = () => {
            if (this.ejs.paused || this.settingsMenuOpen || this.disksMenuOpen) return;
            this.elements.menu.classList.add("ejs_menu_bar_hidden");
        }

        const show = () => {
            clearTimeout(timeout);
            timeout = setTimeout(hide, 3000);
            this.elements.menu.classList.remove("ejs_menu_bar_hidden");
        }

        this.menu = {
            close: () => {
                clearTimeout(timeout);
                this.elements.menu.classList.add("ejs_menu_bar_hidden");
            },
            open: (force) => {
                if (!this.ejs.started && force !== true) return;
                clearTimeout(timeout);
                if (force !== true) timeout = setTimeout(hide, 3000);
                this.elements.menu.classList.remove("ejs_menu_bar_hidden");
            },
            toggle: () => {
                if (!this.ejs.started) return;
                clearTimeout(timeout);
                if (this.elements.menu.classList.contains("ejs_menu_bar_hidden")) {
                    timeout = setTimeout(hide, 3000);
                }
                this.elements.menu.classList.toggle("ejs_menu_bar_hidden");
            }
        }

        this.createBottomMenuBarListeners = () => {
            const clickListener = (e) => {
                if (e.pointerType === "touch") return;
                if (!this.ejs.started || ignoreEvents || document.pointerLockElement === this.canvas) return;
                if (this.isPopupOpen()) return;
                show();
            }
            const mouseListener = (e) => {
                if (!this.ejs.started || ignoreEvents || document.pointerLockElement === this.canvas) return;
                if (this.isPopupOpen()) return;
                const deltaX = e.movementX;
                const deltaY = e.movementY;
                const threshold = this.elements.menu.offsetHeight + 30;
                const mouseY = e.clientY;

                if (mouseY >= window.innerHeight - threshold) {
                    show();
                    return;
                }
                let angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
                if (angle < 0) angle += 360;
                if (angle < 85 || angle > 95) return;
                show();
            }
            if (this.menu.mousemoveListener) this.ejs.removeEventListener(this.menu.mousemoveListener);
            
            if ((this.ejs.preGetSetting("menubarBehavior") || "downward") === "downward") {
                this.menu.mousemoveListener = this.ejs.addEventListener(this.elements.parent, "mousemove", mouseListener);
            } else {
                this.menu.mousemoveListener = this.ejs.addEventListener(this.elements.parent, "mousemove", clickListener);
            }

            this.ejs.addEventListener(this.elements.parent, "click", clickListener);
        }
        this.createBottomMenuBarListeners();

        this.elements.parent.appendChild(this.elements.menu);

        let tmout;
        this.ejs.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (this.isChild(this.elements.menu, e.target) || this.isChild(this.elements.menuToggle, e.target)) return;
            if (!this.ejs.started || this.elements.menu.classList.contains("ejs_menu_bar_hidden") || this.isPopupOpen()) return;
            const width = this.elements.parent.getBoundingClientRect().width;
            if (width > 575) return;
            clearTimeout(tmout);
            tmout = setTimeout(() => {
                ignoreEvents = false;
            }, 2000)
            ignoreEvents = true;
            this.menu.close();
        })

        let paddingSet = false;
        //Now add buttons
        const addButton = (buttonConfig, callback, element, both) => {
            const button = this.ejs.createElement("button");
            button.type = "button";
            const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svg.setAttribute("role", "presentation");
            svg.setAttribute("focusable", "false");
            svg.innerHTML = buttonConfig.icon;
            const text = this.ejs.createElement("span");
            text.innerText = this.localization(buttonConfig.displayName);
            if (paddingSet) text.classList.add("ejs_menu_text_right");
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
                this.ejs.addEventListener(button, "click", callback);
            }

            if (buttonConfig.callback instanceof Function) {
                this.ejs.addEventListener(button, "click", buttonConfig.callback);
            }
            return both ? [button, svg, text] : button;
        }
        
        const restartButton = addButton(this.ejs.config.buttonOpts.restart, () => {
            if (this.ejs.isNetplay && this.ejs.netplay.owner) {
                this.ejs.gameManager.restart();
                this.ejs.netplay.reset();
                this.ejs.netplay.sendMessage({ restart: true });
                this.ejs.play();
            } else if (!this.ejs.isNetplay) {
                this.ejs.gameManager.restart();
            }
        });
        const pauseButton = addButton(this.ejs.config.buttonOpts.pause, () => {
            if (this.ejs.isNetplay && this.ejs.netplay.owner) {
                this.ejs.pause();
                this.ejs.gameManager.saveSaveFiles();
                this.ejs.netplay.sendMessage({ pause: true });
            } else if (!this.ejs.isNetplay) {
                this.ejs.pause();
            }
        });
        const playButton = addButton(this.ejs.config.buttonOpts.play, () => {
            if (this.ejs.isNetplay && this.ejs.netplay.owner) {
                this.ejs.play();
                this.ejs.netplay.sendMessage({ play: true });
            } else if (!this.ejs.isNetplay) {
                this.ejs.play();
            }
        });
        playButton.style.display = "none";

        let stateUrl;
        const saveState = addButton(this.ejs.config.buttonOpts.saveState, async () => {
            let state;
            try {
                state = this.ejs.gameManager.getState();
            } catch(e) {
                this.displayMessage("FAILED TO SAVE STATE");
                return;
            }
            const { screenshot, format } = await this.ejs.takeScreenshot(this.ejs.capture.photo.source, this.ejs.capture.photo.format, this.ejs.capture.photo.upscale);
            const called = this.ejs.callEvent("saveState", {
                screenshot: screenshot,
                format: format,
                state: state
            });
            if (called > 0) return;
            if (stateUrl) URL.revokeObjectURL(stateUrl);
            if (this.ejs.getSettingValue("save-state-location") === "browser" && this.ejs.saveInBrowserSupported()) {
                this.ejs.storage.states.put(this.ejs.getBaseFileName() + ".state", state);
                this.displayMessage("SAVED STATE TO BROWSER");
            } else {
                const blob = new Blob([state]);
                stateUrl = URL.createObjectURL(blob);
                const a = this.ejs.createElement("a");
                a.href = stateUrl;
                a.download = this.ejs.getBaseFileName() + ".state";
                a.click();
            }
        });
        const loadState = addButton(this.ejs.config.buttonOpts.loadState, async () => {
            const called = this.ejs.callEvent("loadState");
            if (called > 0) return;
            if (this.ejs.getSettingValue("save-state-location") === "browser" && this.ejs.saveInBrowserSupported()) {
                this.ejs.storage.states.get(this.ejs.getBaseFileName() + ".state").then(e => {
                    this.ejs.gameManager.loadState(e);
                    this.displayMessage("LOADED STATE FROM BROWSER");
                })
            } else {
                const file = await this.selectFile();
                const state = new Uint8Array(await file.arrayBuffer());
                this.ejs.gameManager.loadState(state);
            }
        });
        const controlMenu = addButton(this.ejs.config.buttonOpts.gamepad, () => {
            this.controlMenu.style.display = "";
        });
        const cheatMenu = addButton(this.ejs.config.buttonOpts.cheat, () => {
            this.cheatMenu.style.display = "";
        });

        const cache = addButton(this.ejs.config.buttonOpts.cacheManager, () => {
            this.openCacheMenu();
        });

        if (this.ejs.config.cacheConfig.enabled === false) cache.style.display = "none";

        let savUrl;

        const saveSavFiles = addButton(this.ejs.config.buttonOpts.saveSavFiles, async () => {
            const file = await this.ejs.gameManager.getSaveFile();
            const { screenshot, format } = await this.ejs.takeScreenshot(this.ejs.capture.photo.source, this.ejs.capture.photo.format, this.ejs.capture.photo.upscale);
            const called = this.ejs.callEvent("saveSave", {
                screenshot: screenshot,
                format: format,
                save: file
            });
            if (called > 0) return;
            const blob = new Blob([file]);
            savUrl = URL.createObjectURL(blob);
            const a = this.ejs.createElement("a");
            a.href = savUrl;
            a.download = this.ejs.gameManager.getSaveFilePath().split("/").pop();
            a.click();
        });
        const loadSavFiles = addButton(this.ejs.config.buttonOpts.loadSavFiles, async () => {
            const called = this.ejs.callEvent("loadSave");
            if (called > 0) return;
            const file = await this.selectFile();
            const sav = new Uint8Array(await file.arrayBuffer());
            const path = this.ejs.gameManager.getSaveFilePath();
            const paths = path.split("/");
            let cp = "";
            for (let i = 0; i < paths.length - 1; i++) {
                if (paths[i] === "") continue;
                cp += "/" + paths[i];
                if (!this.ejs.gameManager.FS.analyzePath(cp).exists) this.ejs.gameManager.FS.mkdir(cp);
            }
            if (this.ejs.gameManager.FS.analyzePath(path).exists) this.ejs.gameManager.FS.unlink(path);
            this.ejs.gameManager.FS.writeFile(path, sav);
            this.ejs.gameManager.loadSaveFiles();
        });
        const netplay = addButton(this.ejs.config.buttonOpts.netplay, async () => {
            if (!this.ejs.netplay) return;
            if (!this.ejs.netplay.isMenuCreated()) {
                this.ejs.netplay.createNetplayMenu();
            }
            this.ejs.netplay.openMenu();
        });
        
        // add custom buttons
        // get all elements from this.ejs.config.buttonOpts with custom: true
        if (this.ejs.config.buttonOpts) {
            for (const [key, value] of Object.entries(this.ejs.config.buttonOpts)) {
                if (value.custom === true) {
                    const customBtn = addButton(value);
                }
            }
        }

        const spacer = this.ejs.createElement("span");
        spacer.classList.add("ejs_menu_bar_spacer");
        this.elements.menu.appendChild(spacer);
        paddingSet = true;

        const volumeSettings = this.ejs.createElement("div");
        volumeSettings.classList.add("ejs_volume_parent");
        const muteButton = addButton(this.ejs.config.buttonOpts.mute, () => {
            muteButton.style.display = "none";
            unmuteButton.style.display = "";
            this.ejs.muted = true;
            this.ejs.setVolume(0);
        }, volumeSettings);
        const unmuteButton = addButton(this.ejs.config.buttonOpts.unmute, () => {
            if (this.ejs.volume === 0) this.ejs.volume = 0.5;
            muteButton.style.display = "";
            unmuteButton.style.display = "none";
            this.ejs.muted = false;
            this.ejs.setVolume(this.ejs.volume);
        }, volumeSettings);
        unmuteButton.style.display = "none";

        const volumeSlider = this.ejs.createElement("input");
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

        this.ejs.addEventListener(volumeSlider, "change mousemove touchmove mousedown touchstart mouseup", (e) => {
            setTimeout(() => {
                const newVal = parseFloat(volumeSlider.value);
                if (newVal === 0 && this.ejs.muted) return;
                this.ejs.volume = newVal;
                this.ejs.setVolume(this.ejs.volume);
            }, 5);
        })

        if (!this.ejs.config.buttonOpts || this.ejs.config.buttonOpts.volume !== false) {
            volumeSettings.appendChild(volumeSlider);
        }

        this.elements.menu.appendChild(volumeSettings);

        const contextMenuButton = addButton(this.ejs.config.buttonOpts.contextMenu, () => {
            if (this.elements.contextmenu.style.display === "none") {
                this.elements.contextmenu.style.display = "block";
                this.elements.contextmenu.style.left = (getComputedStyle(this.elements.parent).width.split("px")[0] / 2 - getComputedStyle(this.elements.contextmenu).width.split("px")[0] / 2) + "px";
                this.elements.contextmenu.style.top = (getComputedStyle(this.elements.parent).height.split("px")[0] / 2 - getComputedStyle(this.elements.contextmenu).height.split("px")[0] / 2) + "px";
                setTimeout(this.menu.close.bind(this), 20);
            } else {
                this.elements.contextmenu.style.display = "none";
            }
        });

        this.diskParent = this.ejs.createElement("div");
        this.diskParent.id = "ejs_disksMenu";
        this.disksMenuOpen = false;
        const diskButton = addButton(this.ejs.config.buttonOpts.diskButton, () => {
            this.disksMenuOpen = !this.disksMenuOpen;
            diskButton[1].classList.toggle("ejs_svg_rotate", this.disksMenuOpen);
            this.disksMenu.style.display = this.disksMenuOpen ? "" : "none";
            diskButton[2].classList.toggle("ejs_disks_text", this.disksMenuOpen);
        }, this.diskParent, true);
        this.elements.menu.appendChild(this.diskParent);
        this.closeDisksMenu = () => {
            if (!this.disksMenu) return;
            this.disksMenuOpen = false;
            diskButton[1].classList.toggle("ejs_svg_rotate", this.disksMenuOpen);
            diskButton[2].classList.toggle("ejs_disks_text", this.disksMenuOpen);
            this.disksMenu.style.display = "none";
        }
        this.ejs.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (this.isChild(this.disksMenu, e.target)) return;
            if (e.pointerType === "touch") return;
            if (e.target === diskButton[0] || e.target === diskButton[2]) return;
            this.closeDisksMenu();
        })

        this.settingParent = this.ejs.createElement("div");
        this.settingsMenuOpen = false;
        const settingButton = addButton(this.ejs.config.buttonOpts.settings, () => {
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
        this.ejs.addEventListener(this.elements.parent, "mousedown touchstart", (e) => {
            if (this.isChild(this.settingsMenu, e.target)) return;
            if (e.pointerType === "touch") return;
            if (e.target === settingButton[0] || e.target === settingButton[2]) return;
            this.closeSettingsMenu();
        })

        this.ejs.addEventListener(this.canvas, "click", (e) => {
            if (e.pointerType === "touch") return;
            if (this.ejs.enableMouseLock && !this.ejs.paused) {
                if (this.canvas.requestPointerLock) {
                    this.canvas.requestPointerLock();
                } else if (this.canvas.mozRequestPointerLock) {
                    this.canvas.mozRequestPointerLock();
                }
                this.menu.close();
            }
        })

        const enter = addButton(this.ejs.config.buttonOpts.enterFullscreen, () => {
            this.ejs.toggleFullscreen(true);
        });
        const exit = addButton(this.ejs.config.buttonOpts.exitFullscreen, () => {
            this.ejs.toggleFullscreen(false);
        });
        exit.style.display = "none";

        let exitMenuIsOpen = false;
        const exitEmulation = addButton(this.ejs.config.buttonOpts.exitEmulation, async () => {
            if (exitMenuIsOpen) return;
            if (this.ejs.config.askBeforeExit !== false) {
                exitMenuIsOpen = true;
                const popups = this.createSubPopup();
                this.game.appendChild(popups[0]);
                popups[1].classList.add("ejs_cheat_parent");
                popups[1].style.width = "100%";
                const popup = popups[1];
                const header = this.ejs.createElement("div");
                header.classList.add("ejs_cheat_header");
                const title = this.ejs.createElement("h2");
                title.innerText = this.localization("Are you sure you want to exit?");
                title.classList.add("ejs_cheat_heading");
                const close = this.ejs.createElement("button");
                close.classList.add("ejs_cheat_close");
                header.appendChild(title);
                header.appendChild(close);
                popup.appendChild(header);
                this.ejs.addEventListener(close, "click", (e) => {
                    exitMenuIsOpen = false
                    popups[0].remove();
                })
                popup.appendChild(this.ejs.createElement("br"));

                const footer = this.ejs.createElement("footer");
                const submit = this.ejs.createElement("button");
                const closeButton = this.ejs.createElement("button");
                submit.innerText = this.localization("Exit");
                closeButton.innerText = this.localization("Cancel");
                submit.classList.add("ejs_button_button");
                closeButton.classList.add("ejs_button_button");
                submit.classList.add("ejs_popup_submit");
                closeButton.classList.add("ejs_popup_submit");
                submit.style["background-color"] = "rgba(var(--ejs-primary-color),1)";
                footer.appendChild(submit);
                const span = this.ejs.createElement("span");
                span.innerText = " ";
                footer.appendChild(span);
                footer.appendChild(closeButton);
                popup.appendChild(footer);

                this.ejs.addEventListener(closeButton, "click", (e) => {
                    popups[0].remove();
                    exitMenuIsOpen = false
                })

                this.ejs.addEventListener(submit, "click", (e) => {
                    popups[0].remove();
                    const body = this.createPopup("EmulatorJS has exited", {});
                    setTimeout(() => {
                        this.ejs.callEvent("exit");
                    }, 20);
                })
                setTimeout(this.menu.close.bind(this), 20);
            } else {
                const body = this.createPopup("EmulatorJS has exited", {});
                setTimeout(() => {
                    this.ejs.callEvent("exit");
                }, 20);
            }
        });

        this.ejs.addEventListener(document, "webkitfullscreenchange mozfullscreenchange fullscreenchange", (e) => {
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
            contextMenu: [contextMenuButton],
            fullscreen: [enter, exit],
            saveState: [saveState],
            loadState: [loadState],
            gamepad: [controlMenu],
            cheat: [cheatMenu],
            cacheManager: [cache],
            saveSavFiles: [saveSavFiles],
            loadSavFiles: [loadSavFiles],
            netplay: [netplay],
            exit: [exitEmulation],
            mute: [muteButton, unmuteButton],
            volumeSlider: [volumeSlider]
        }

        if (this.ejs.config.buttonOpts) {
            if (this.ejs.debug) console.log(this.ejs.config.buttonOpts);
            if (this.ejs.config.buttonOpts.playPause.visible === false) {
                pauseButton.style.display = "none";
                playButton.style.display = "none";
            }
            if (this.ejs.config.buttonOpts.contextMenu.visible === false && this.ejs.config.buttonOpts.rightClick !== false && this.ejs.isMobile === false) contextMenuButton.style.display = "none"
            if (this.ejs.config.buttonOpts.restart.visible === false) restartButton.style.display = "none"
            if (this.ejs.config.buttonOpts.settings.visible === false) settingButton[0].style.display = "none"
            if (this.ejs.config.buttonOpts.fullscreen.visible === false) {
                enter.style.display = "none";
                exit.style.display = "none";
            }
            if (this.ejs.config.buttonOpts.mute.visible === false) {
                muteButton.style.display = "none";
                unmuteButton.style.display = "none";
            }
            if (this.ejs.config.buttonOpts.saveState.visible === false) saveState.style.display = "none";
            if (this.ejs.config.buttonOpts.loadState.visible === false) loadState.style.display = "none";
            if (this.ejs.config.buttonOpts.saveSavFiles.visible === false) saveSavFiles.style.display = "none";
            if (this.ejs.config.buttonOpts.loadSavFiles.visible === false) loadSavFiles.style.display = "none";
            if (this.ejs.config.buttonOpts.gamepad.visible === false) controlMenu.style.display = "none";
            if (this.ejs.config.buttonOpts.cheat.visible === false) cheatMenu.style.display = "none";
            if (this.ejs.config.buttonOpts.cacheManager.visible === false) cache.style.display = "none";
            if (this.ejs.config.buttonOpts.netplay.visible === false) netplay.style.display = "none";
            if (this.ejs.config.buttonOpts.diskButton.visible === false) diskButton[0].style.display = "none";
            if (this.ejs.config.buttonOpts.volumeSlider.visible === false) volumeSlider.style.display = "none";
            if (this.ejs.config.buttonOpts.exitEmulation.visible === false) exitEmulation.style.display = "none";
        }

        this.menu.failedToStart = () => {
            if (!this.ejs.config.buttonOpts) this.ejs.config.buttonOpts = {};
            this.ejs.config.buttonOpts.mute = false;

            settingButton[0].style.display = "";

            // Hide all except settings button.
            pauseButton.style.display = "none";
            playButton.style.display = "none";
            contextMenuButton.style.display = "none";
            restartButton.style.display = "none";
            enter.style.display = "none";
            exit.style.display = "none";
            muteButton.style.display = "none";
            unmuteButton.style.display = "none";
            saveState.style.display = "none";
            loadState.style.display = "none";
            saveSavFiles.style.display = "none";
            loadSavFiles.style.display = "none";
            controlMenu.style.display = "none";
            cheatMenu.style.display = "none";
            cache.style.display = "none";
            netplay.style.display = "none";
            diskButton[0].style.display = "none";
            volumeSlider.style.display = "none";
            exitEmulation.style.display = "none";

            this.elements.menu.style.opacity = "";
            this.elements.menu.style.background = "transparent";
            this.virtualGamepad.style.display = "none";
            settingButton[0].classList.add("shadow");
            this.menu.open(true);
        }
    }
    openCacheMenu() {
        (async () => {
            // Run cleanup before showing cache contents
            await this.ejs.storageCache.cleanup();

            const list = this.ejs.createElement("table");
            const thead = this.ejs.createElement("thead");
            const tbody = this.ejs.createElement("tbody");

            // Create header row
            const headerRow = this.ejs.createElement("tr");
            const nameHeader = this.ejs.createElement("th");
            const typeHeader = this.ejs.createElement("th");
            const sizeHeader = this.ejs.createElement("th");
            const lastUsedHeader = this.ejs.createElement("th");
            const actionHeader = this.ejs.createElement("th");

            nameHeader.innerText = "Filename";
            typeHeader.innerText = "Type";
            sizeHeader.innerText = "Size";
            lastUsedHeader.innerText = "Last Used";
            actionHeader.innerText = "Action";

            nameHeader.style.textAlign = "left";
            typeHeader.style.textAlign = "left";
            sizeHeader.style.textAlign = "left";
            lastUsedHeader.style.textAlign = "left";
            actionHeader.style.textAlign = "left";

            headerRow.appendChild(nameHeader);
            headerRow.appendChild(typeHeader);
            headerRow.appendChild(sizeHeader);
            headerRow.appendChild(lastUsedHeader);
            headerRow.appendChild(actionHeader);
            thead.appendChild(headerRow);

            const body = this.createPopup("Cache Manager", {
                "Cleanup Now": async () => {
                    const cleanupBtn = document.querySelector('.ejs_popup_button');
                    if (cleanupBtn) cleanupBtn.textContent = 'Cleaning...';
                    await this.ejs.storageCache.cleanup();
                    tbody.innerHTML = "";
                    // Refresh the cache list
                    await this.populateCacheList(tbody, getSize, getTypeName);
                    if (cleanupBtn) cleanupBtn.textContent = 'Cleanup Now';
                },
                "Clear All": async () => {
                    await this.ejs.storageCache.clear();
                    tbody.innerHTML = "";
                },
                "Close": () => {
                    this.closePopup();
                }
            });
            
            list.style.width = "100%";
            list.style["padding-left"] = "10px";
            list.style["text-align"] = "left";
            
            list.appendChild(thead);
            list.appendChild(tbody);
            body.appendChild(list);

            const getSize = function (size) {
                let i = -1;
                do {
                    size /= 1024, i++;
                } while (size > 1024);
                return Math.max(size, 0.1).toFixed(1) + [" kB", " MB", " GB", " TB", "PB", "EB", "ZB", "YB"][i];
            }

            const getTypeName = function (key) {
                if (key.startsWith('compression_')) return 'Decompressed Content';
                if (key.startsWith('core_decompressed_')) return 'Core';
                // Additional fallback logic for other types
                if (key.includes('core')) return 'Core';
                if (key.includes('bios')) return 'BIOS';
                if (key.includes('rom')) return 'ROM';
                if (key.includes('asset')) return 'Asset';
                return 'Unknown';
            }

            await this.populateCacheList(tbody, getSize, getTypeName);
        })();
    }

    async populateCacheList(tbody, getSize, getTypeName) {
        // Get all cache items from the compression cache
        const allCacheItems = await this.ejs.storageCache.storage.getAll();

        for (const item of allCacheItems) {
            if (!item.key || !item.fileSize) continue;

            const line = this.ejs.createElement("tr");
            const name = this.ejs.createElement("td");
            const type = this.ejs.createElement("td");
            const size = this.ejs.createElement("td");
            const lastUsed = this.ejs.createElement("td");
            const remove = this.ejs.createElement("td");
            remove.style.cursor = "pointer";

            // Calculate total size of all files in this cache item
            let totalSize = item.fileSize;

            // Use filename if available, otherwise fall back to key
            const displayName = item.filename || item.key;
            name.innerText = displayName.substring(0, 50) + (displayName.length > 50 ? '...' : '');

            // Use the stored type if available, otherwise fall back to getTypeName
            const itemType = item.type || getTypeName(item.key);
            type.innerText = itemType;
            size.innerText = getSize(totalSize);

            // Format last accessed time
            const lastAccessedTime = item.lastAccessed || item.added || Date.now();
            const formatDate = (timestamp) => {
                const date = new Date(timestamp);
                const now = new Date();
                const diffMs = now - date;
                const diffMins = Math.floor(diffMs / (1000 * 60));
                const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

                if (diffMins < 1) return 'Just now';
                if (diffMins < 60) return `${diffMins}m ago`;
                if (diffHours < 24) return `${diffHours}h ago`;
                if (diffDays < 7) return `${diffDays}d ago`;

                // For older items, show the actual date
                return date.toLocaleDateString();
            };
            lastUsed.innerText = formatDate(lastAccessedTime);

            const a = this.ejs.createElement("a");
            a.innerText = this.localization("Remove");
            this.ejs.addEventListener(remove, "click", async () => {
                await this.ejs.storageCache.delete(item.key);
                line.remove();
            })
            remove.appendChild(a);

            line.appendChild(name);
            line.appendChild(type);
            line.appendChild(size);
            line.appendChild(lastUsed);
            line.appendChild(remove);
            tbody.appendChild(line);
        }
    }

    createControlSettingMenu() {
        let buttonListeners = [];
        this.checkGamepadInputs = () => buttonListeners.forEach(elem => elem());
        this.gamepadLabels = [];
        this.gamepadSelection = [];
        this.ejs.controls = JSON.parse(JSON.stringify(this.ejs.defaultControllers));
        const body = this.createPopup("Control Settings", {
            "Reset": () => {
                this.ejs.stopAllAutofire();
                this.ejs.controls = JSON.parse(JSON.stringify(this.ejs.defaultControllers));
                this.ejs.setupKeys();
                this.checkGamepadInputs();
                this.ejs.saveSettings();
            },
            "Clear": () => {
                this.ejs.stopAllAutofire();
                this.ejs.controls = { 0: {}, 1: {}, 2: {}, 3: {} };
                this.ejs.setupKeys();
                this.checkGamepadInputs();
                this.ejs.saveSettings();
            },
            "Close": () => {
                this.controlMenu.style.display = "none";
            }
        }, true);
        this.ejs.setupKeys();
        this.controlMenu = body.parentElement;
        body.classList.add("ejs_control_body");

        let buttons;
        if ("gb" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("nes" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
            if (this.ejs.getCore() === "nestopia") {
                buttons.push({ id: 10, label: this.localization("SWAP DISKS") });
            } else {
                buttons.push({ id: 10, label: this.localization("SWAP DISKS") });
                buttons.push({ id: 11, label: this.localization("EJECT/INSERT DISK") });
            }
        } else if ("snes" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 9, label: this.localization("X") },
                { id: 1, label: this.localization("Y") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
            ];
        } else if ("n64" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("A") },
                { id: 1, label: this.localization("B") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("D-PAD UP") },
                { id: 5, label: this.localization("D-PAD DOWN") },
                { id: 6, label: this.localization("D-PAD LEFT") },
                { id: 7, label: this.localization("D-PAD RIGHT") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 12, label: this.localization("Z") },
                { id: 19, label: this.localization("STICK UP") },
                { id: 18, label: this.localization("STICK DOWN") },
                { id: 17, label: this.localization("STICK LEFT") },
                { id: 16, label: this.localization("STICK RIGHT") },
                { id: 23, label: this.localization("C-PAD UP") },
                { id: 22, label: this.localization("C-PAD DOWN") },
                { id: 21, label: this.localization("C-PAD LEFT") },
                { id: 20, label: this.localization("C-PAD RIGHT") },
            ];
        } else if ("gba" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("nds" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 9, label: this.localization("X") },
                { id: 1, label: this.localization("Y") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 14, label: this.localization("Microphone") },
            ];
        } else if ("vb" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("LEFT D-PAD UP") },
                { id: 5, label: this.localization("LEFT D-PAD DOWN") },
                { id: 6, label: this.localization("LEFT D-PAD LEFT") },
                { id: 7, label: this.localization("LEFT D-PAD RIGHT") },
                { id: 19, label: this.localization("RIGHT D-PAD UP") },
                { id: 18, label: this.localization("RIGHT D-PAD DOWN") },
                { id: 17, label: this.localization("RIGHT D-PAD LEFT") },
                { id: 16, label: this.localization("RIGHT D-PAD RIGHT") },
            ];
        } else if (["segaMD", "segaCD", "sega32x"].includes(this.ejs.getControlScheme())) {
            buttons = [
                { id: 1, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 8, label: this.localization("C") },
                { id: 10, label: this.localization("X") },
                { id: 9, label: this.localization("Y") },
                { id: 11, label: this.localization("Z") },
                { id: 3, label: this.localization("START") },
                { id: 2, label: this.localization("MODE") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("segaMS" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("BUTTON 1 / START") },
                { id: 8, label: this.localization("BUTTON 2") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("segaGG" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("BUTTON 1") },
                { id: 8, label: this.localization("BUTTON 2") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("segaSaturn" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 1, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 8, label: this.localization("C") },
                { id: 9, label: this.localization("X") },
                { id: 10, label: this.localization("Y") },
                { id: 11, label: this.localization("Z") },
                { id: 12, label: this.localization("L") },
                { id: 13, label: this.localization("R") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("3do" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 1, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 8, label: this.localization("C") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 2, label: this.localization("X") },
                { id: 3, label: this.localization("P") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("atari2600" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("FIRE") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("RESET") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("LEFT DIFFICULTY A") },
                { id: 12, label: this.localization("LEFT DIFFICULTY B") },
                { id: 11, label: this.localization("RIGHT DIFFICULTY A") },
                { id: 13, label: this.localization("RIGHT DIFFICULTY B") },
                { id: 14, label: this.localization("COLOR") },
                { id: 15, label: this.localization("B/W") },
            ];
        } else if ("atari7800" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("BUTTON 1") },
                { id: 8, label: this.localization("BUTTON 2") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("PAUSE") },
                { id: 9, label: this.localization("RESET") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("LEFT DIFFICULTY") },
                { id: 11, label: this.localization("RIGHT DIFFICULTY") },
            ];
        } else if ("lynx" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 10, label: this.localization("OPTION 1") },
                { id: 11, label: this.localization("OPTION 2") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("jaguar" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 1, label: this.localization("C") },
                { id: 2, label: this.localization("PAUSE") },
                { id: 3, label: this.localization("OPTION") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("pce" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("I") },
                { id: 0, label: this.localization("II") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("RUN") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("ngp" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 0, label: this.localization("A") },
                { id: 8, label: this.localization("B") },
                { id: 3, label: this.localization("OPTION") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("ws" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("A") },
                { id: 0, label: this.localization("B") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("X UP") },
                { id: 5, label: this.localization("X DOWN") },
                { id: 6, label: this.localization("X LEFT") },
                { id: 7, label: this.localization("X RIGHT") },
                { id: 13, label: this.localization("Y UP") },
                { id: 12, label: this.localization("Y DOWN") },
                { id: 10, label: this.localization("Y LEFT") },
                { id: 11, label: this.localization("Y RIGHT") },
            ];
        } else if ("coleco" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("LEFT BUTTON") },
                { id: 0, label: this.localization("RIGHT BUTTON") },
                { id: 1, label: this.localization("1") },
                { id: 9, label: this.localization("2") },
                { id: 10, label: this.localization("3") },
                { id: 11, label: this.localization("4") },
                { id: 12, label: this.localization("5") },
                { id: 13, label: this.localization("6") },
                { id: 14, label: this.localization("7") },
                { id: 15, label: this.localization("8") },
                { id: 18, label: this.localization("9") },
                { id: 16, label: this.localization("0") },
                { id: 2, label: this.localization("*") },
                { id: 3, label: this.localization("#") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 17, label: this.localization("ALT 0") },
                { id: 19, label: this.localization("ALT 9") },
            ];
            this.ejs.analogAxes.splice(0, 4) // 16 to 19 are not analog for gearcoleco
        } else if ("pcfx" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 8, label: this.localization("I") },
                { id: 0, label: this.localization("II") },
                { id: 9, label: this.localization("III") },
                { id: 1, label: this.localization("IV") },
                { id: 10, label: this.localization("V") },
                { id: 11, label: this.localization("VI") },
                { id: 3, label: this.localization("RUN") },
                { id: 2, label: this.localization("SELECT") },
                { id: 12, label: this.localization("MODE1") },
                { id: 13, label: this.localization("MODE2") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
            ];
        } else if ("psp" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 9, label: this.localization("\u25B3") }, // △
                { id: 1, label: this.localization("\u25A1") }, // □
                { id: 0, label: this.localization("\uFF58") }, // ｘ
                { id: 8, label: this.localization("\u25CB") }, // ○
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 19, label: this.localization("STICK UP") },
                { id: 18, label: this.localization("STICK DOWN") },
                { id: 17, label: this.localization("STICK LEFT") },
                { id: 16, label: this.localization("STICK RIGHT") },
            ];
        } else if ("psx" === this.ejs.getControlScheme()) {
            buttons = [
                { id: 9, label: this.localization("\u25B3") }, // △
                { id: 1, label: this.localization("\u25A1") }, // □
                { id: 0, label: this.localization("\uFF58") }, // ｘ
                { id: 8, label: this.localization("\u25CB") }, // ○
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 10, label: this.localization("L1") },
                { id: 11, label: this.localization("R1") },
                { id: 12, label: this.localization("L2") },
                { id: 13, label: this.localization("R2") },
                { id: 14, label: this.localization("L3") },
                { id: 15, label: this.localization("R3") },
                { id: 19, label: this.localization("L STICK UP") },
                { id: 18, label: this.localization("L STICK DOWN") },
                { id: 17, label: this.localization("L STICK LEFT") },
                { id: 16, label: this.localization("L STICK RIGHT") },
                { id: 23, label: this.localization("R STICK UP") },
                { id: 22, label: this.localization("R STICK DOWN") },
                { id: 21, label: this.localization("R STICK LEFT") },
                { id: 20, label: this.localization("R STICK RIGHT") },
            ];
        } else {
            buttons = [
                { id: 0, label: this.localization("B") },
                { id: 1, label: this.localization("Y") },
                { id: 2, label: this.localization("SELECT") },
                { id: 3, label: this.localization("START") },
                { id: 4, label: this.localization("UP") },
                { id: 5, label: this.localization("DOWN") },
                { id: 6, label: this.localization("LEFT") },
                { id: 7, label: this.localization("RIGHT") },
                { id: 8, label: this.localization("A") },
                { id: 9, label: this.localization("X") },
                { id: 10, label: this.localization("L") },
                { id: 11, label: this.localization("R") },
                { id: 12, label: this.localization("L2") },
                { id: 13, label: this.localization("R2") },
                { id: 14, label: this.localization("L3") },
                { id: 15, label: this.localization("R3") },
                { id: 19, label: this.localization("L STICK UP") },
                { id: 18, label: this.localization("L STICK DOWN") },
                { id: 17, label: this.localization("L STICK LEFT") },
                { id: 16, label: this.localization("L STICK RIGHT") },
                { id: 23, label: this.localization("R STICK UP") },
                { id: 22, label: this.localization("R STICK DOWN") },
                { id: 21, label: this.localization("R STICK LEFT") },
                { id: 20, label: this.localization("R STICK RIGHT") },
            ];
        }
        if (["arcade", "mame"].includes(this.ejs.getControlScheme())) {
            for (const buttonIdx in buttons) {
                if (buttons[buttonIdx].id === 2) {
                    buttons[buttonIdx].label = this.localization("INSERT COIN");
                }
            }
        }
        buttons.push(
            { id: 24, label: this.localization("QUICK SAVE STATE") },
            { id: 25, label: this.localization("QUICK LOAD STATE") },
            { id: 26, label: this.localization("CHANGE STATE SLOT") },
            { id: 27, label: this.localization("FAST FORWARD") },
            { id: 29, label: this.localization("SLOW MOTION") },
            { id: 28, label: this.localization("REWIND") }
        );
        let nums = [];
        for (let i = 0; i < buttons.length; i++) {
            nums.push(buttons[i].id);
        }
        for (let i = 0; i < 30; i++) {
            if (!nums.includes(i)) {
                delete this.ejs.defaultControllers[0][i];
                delete this.ejs.defaultControllers[1][i];
                delete this.ejs.defaultControllers[2][i];
                delete this.ejs.defaultControllers[3][i];
                delete this.ejs.controls[0][i];
                delete this.ejs.controls[1][i];
                delete this.ejs.controls[2][i];
                delete this.ejs.controls[3][i];
            }
        }

        //if (_this.ejs.statesSupported === false) {
        //    delete buttons[24];
        //    delete buttons[25];
        //    delete buttons[26];
        //}
        let selectedPlayer;
        let players = [];
        let playerDivs = [];

        const playerSelect = this.ejs.createElement("ul");
        playerSelect.classList.add("ejs_control_player_bar");
        for (let i = 1; i < 5; i++) {
            const playerContainer = this.ejs.createElement("li");
            playerContainer.classList.add("tabs-title");
            playerContainer.setAttribute("role", "presentation");
            const player = this.ejs.createElement("a");
            player.innerText = this.localization("Player") + " " + i;
            player.setAttribute("role", "tab");
            player.setAttribute("aria-controls", "controls-" + (i - 1));
            player.setAttribute("aria-selected", "false");
            player.id = "controls-" + (i - 1) + "-label";
            this.ejs.addEventListener(player, "click", (e) => {
                e.preventDefault();
                players[selectedPlayer].classList.remove("ejs_control_selected");
                playerDivs[selectedPlayer].setAttribute("hidden", "");
                selectedPlayer = i - 1;
                players[i - 1].classList.add("ejs_control_selected");
                playerDivs[i - 1].removeAttribute("hidden");
            })
            playerContainer.appendChild(player);
            playerSelect.appendChild(playerContainer);
            players.push(playerContainer);
        }
        body.appendChild(playerSelect);

        const controls = this.ejs.createElement("div");
        for (let i = 0; i < 4; i++) {
            if (!this.ejs.controls[i]) this.ejs.controls[i] = {};
            const player = this.ejs.createElement("div");
            const playerTitle = this.ejs.createElement("div");

            const gamepadTitle = this.ejs.createElement("div");
            gamepadTitle.innerText = this.localization("Connected Gamepad") + ": ";

            const gamepadName = this.ejs.createElement("select");
            gamepadName.classList.add("ejs_gamepad_dropdown");
            gamepadName.setAttribute("title", "gamepad-" + i);
            gamepadName.setAttribute("index", i);
            this.gamepadLabels.push(gamepadName);
            this.gamepadSelection.push("");
            this.ejs.addEventListener(gamepadName, "change", e => {
                const controller = e.target.value;
                const player = parseInt(e.target.getAttribute("index"));
                if (controller === "notconnected") {
                    this.gamepadSelection[player] = "";
                } else {
                    for (let i = 0; i < this.gamepadSelection.length; i++) {
                        if (player === i) continue;
                        if (this.gamepadSelection[i] === controller) {
                            this.gamepadSelection[i] = "";
                        }
                    }
                    this.gamepadSelection[player] = controller;
                    this.updateGamepadLabels();
                }
            });
            const def = this.ejs.createElement("option");
            def.setAttribute("value", "notconnected");
            def.innerText = "Not Connected";
            gamepadName.appendChild(def);
            gamepadTitle.appendChild(gamepadName);
            gamepadTitle.classList.add("ejs_gamepad_section");

            const leftPadding = this.ejs.createElement("div");
            leftPadding.style = "width:25%;float:left;";
            leftPadding.innerHTML = "&nbsp;";

            const aboutParent = this.ejs.createElement("div");
            aboutParent.style = "font-size:12px;width:40%;float:left;";
            const gamepad = this.ejs.createElement("div");
            gamepad.style = "text-align:center;width:50%;float:left;";
            gamepad.innerText = this.localization("Gamepad");
            aboutParent.appendChild(gamepad);
            const keyboard = this.ejs.createElement("div");
            keyboard.style = "text-align:center;width:50%;float:left;";
            keyboard.innerText = this.localization("Keyboard");
            aboutParent.appendChild(keyboard);

            const setHeader = this.ejs.createElement("div");
            setHeader.style = "font-size:12px;width:15%;float:left;text-align:center;";
            setHeader.innerHTML = "&nbsp;";

            const autofireHeader = this.ejs.createElement("div");
            autofireHeader.style = "font-size:12px;width:20%;float:left;text-align:center;";
            autofireHeader.innerText = this.localization("Autofire");

            const headingPadding = this.ejs.createElement("div");
            headingPadding.style = "clear:both;";

            playerTitle.appendChild(gamepadTitle);
            playerTitle.appendChild(leftPadding);
            playerTitle.appendChild(aboutParent);
            playerTitle.appendChild(setHeader);
            playerTitle.appendChild(autofireHeader);

            if ((this.ejs.touch || this.ejs.hasTouchScreen) && i === 0) {
                const vgp = this.ejs.createElement("div");
                vgp.style = "width:25%;float:right;clear:none;padding:0;font-size: 11px;padding-left: 2.25rem;";
                vgp.classList.add("ejs_control_row");
                vgp.classList.add("ejs_cheat_row");
                const input = this.ejs.createElement("input");
                input.type = "checkbox";
                input.checked = true;
                input.value = "o";
                input.id = "ejs_vp";
                vgp.appendChild(input);
                const label = this.ejs.createElement("label");
                label.for = "ejs_vp";
                label.innerText = "Virtual Gamepad";
                vgp.appendChild(label);
                label.addEventListener("click", (e) => {
                    input.checked = !input.checked;
                    this.changeSettingOption("virtual-gamepad", input.checked ? "enabled" : "disabled");
                })
                this.ejs.on("start", (e) => {
                    if (this.ejs.getSettingValue("virtual-gamepad") === "disabled") {
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

                const buttonText = this.ejs.createElement("div");
                buttonText.setAttribute("data-id", k);
                buttonText.setAttribute("data-index", i);
                buttonText.setAttribute("data-label", controlLabel);
                buttonText.style = "margin-bottom:10px;";
                buttonText.classList.add("ejs_control_bar");

                const title = this.ejs.createElement("div");
                title.style = "width:25%;float:left;font-size:12px;";
                const label = this.ejs.createElement("label");
                label.innerText = controlLabel + ":";
                title.appendChild(label);

                const textBoxes = this.ejs.createElement("div");
                textBoxes.style = "width:40%;float:left;";

                const textBox1Parent = this.ejs.createElement("div");
                textBox1Parent.style = "width:50%;float:left;padding: 0 5px;";
                const textBox1 = this.ejs.createElement("input");
                textBox1.style = "text-align:center;height:25px;width: 100%;";
                textBox1.type = "text";
                textBox1.setAttribute("readonly", "");
                textBox1.setAttribute("placeholder", "");
                textBox1Parent.appendChild(textBox1);

                const textBox2Parent = this.ejs.createElement("div");
                textBox2Parent.style = "width:50%;float:left;padding: 0 5px;";
                const textBox2 = this.ejs.createElement("input");
                textBox2.style = "text-align:center;height:25px;width: 100%;";
                textBox2.type = "text";
                textBox2.setAttribute("readonly", "");
                textBox2.setAttribute("placeholder", "");
                textBox2Parent.appendChild(textBox2);

                buttonListeners.push(() => {
                    textBox2.value = "";
                    textBox1.value = "";
                    if (this.ejs.controls[i][k] && this.ejs.controls[i][k].value) {
                        let value = this.ejs.keyMap[this.ejs.controls[i][k].value];
                        value = this.localization(value);
                        textBox2.value = value;
                    }
                    if (this.ejs.controls[i][k] && this.ejs.controls[i][k].value2 !== undefined && this.ejs.controls[i][k].value2 !== "") {
                        let value2 = this.ejs.controls[i][k].value2.toString();
                        if (value2.includes(":")) {
                            value2 = value2.split(":");
                            value2 = this.localization(value2[0]) + ":" + this.localization(value2[1])
                        } else if (!isNaN(value2)) {
                            value2 = this.localization("BUTTON") + " " + this.localization(value2);
                        } else {
                            value2 = this.localization(value2);
                        }
                        textBox1.value = value2;
                    }
                })

                if (this.ejs.controls[i][k] && this.ejs.controls[i][k].value) {
                    let value = this.ejs.keyMap[this.ejs.controls[i][k].value];
                    value = this.localization(value);
                    textBox2.value = value;
                }
                if (this.ejs.controls[i][k] && this.ejs.controls[i][k].value2) {
                    let value2 = this.ejs.controls[i][k].value2.toString();
                    if (value2.includes(":")) {
                        value2 = value2.split(":");
                        value2 = this.localization(value2[0]) + ":" + this.localization(value2[1])
                    } else if (!isNaN(value2)) {
                        value2 = this.localization("BUTTON") + " " + this.localization(value2);
                    } else {
                        value2 = this.localization(value2);
                    }
                    textBox1.value = value2;
                }

                textBoxes.appendChild(textBox1Parent);
                textBoxes.appendChild(textBox2Parent);

                const padding = this.ejs.createElement("div");
                padding.style = "clear:both;";
                textBoxes.appendChild(padding);

                const setButton = this.ejs.createElement("div");
                setButton.style = "width:15%;float:left;";
                const button = this.ejs.createElement("a");
                button.classList.add("ejs_control_set_button");
                button.innerText = this.localization("Set");
                setButton.appendChild(button);

                // Autofire checkbox - not available for analog stick axes
                const autofireColumn = this.ejs.createElement("div");
                autofireColumn.style = "width:20%;float:left;text-align:center;";

                if (!this.ejs.analogAxes.includes(k)) {
                    const autofireCheckbox = this.ejs.createElement("input");
                    autofireCheckbox.type = "checkbox";
                    autofireCheckbox.style = "cursor:pointer;";
                    autofireCheckbox.checked = this.ejs.controls[i][k] && this.ejs.controls[i][k].autofire === true;
                    autofireCheckbox.setAttribute("data-player", i);
                    autofireCheckbox.setAttribute("data-button", k);

                    // Update checkbox state when controls change
                    buttonListeners.push(() => {
                        autofireCheckbox.checked = this.ejs.controls[i][k] && this.ejs.controls[i][k].autofire === true;
                    });

                    this.ejs.addEventListener(autofireCheckbox, "change", (e) => {
                        e.stopPropagation();
                        const playerIdx = parseInt(e.target.getAttribute("data-player"));
                        const buttonIdx = parseInt(e.target.getAttribute("data-button"));
                        if (!this.ejs.controls[playerIdx][buttonIdx]) {
                            this.ejs.controls[playerIdx][buttonIdx] = {};
                        }
                        this.ejs.controls[playerIdx][buttonIdx].autofire = e.target.checked;
                        // Stop any active autofire if unchecked
                        if (!e.target.checked) {
                            this.ejs.stopAutofire(playerIdx, buttonIdx);
                        }
                        this.ejs.saveSettings();
                    });

                    autofireColumn.appendChild(autofireCheckbox);
                }

                const padding2 = this.ejs.createElement("div");
                padding2.style = "clear:both;";

                buttonText.appendChild(title);
                buttonText.appendChild(textBoxes);
                buttonText.appendChild(setButton);
                buttonText.appendChild(autofireColumn);
                buttonText.appendChild(padding2);

                player.appendChild(buttonText);

                this.ejs.addEventListener(buttonText, "mousedown", (e) => {
                    // Don't open popup when clicking on the autofire checkbox
                    if (e.target.tagName === "INPUT" && e.target.type === "checkbox") {
                        return;
                    }
                    e.preventDefault();
                    this.controlPopup.parentElement.parentElement.removeAttribute("hidden");
                    this.controlPopup.innerText = "[ " + controlLabel + " ]\n" + this.localization("Press Keyboard");
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

        const popup = this.ejs.createElement("div");
        popup.classList.add("ejs_popup_container");
        const popupMsg = this.ejs.createElement("div");
        this.ejs.addEventListener(popup, "mousedown click touchstart", (e) => {
            if (this.isChild(popupMsg, e.target)) return;
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
        })
        const btn = this.ejs.createElement("a");
        btn.classList.add("ejs_control_set_button");
        btn.innerText = this.localization("Clear");
        this.ejs.addEventListener(btn, "mousedown click touchstart", (e) => {
            const num = this.controlPopup.getAttribute("button-num");
            const player = this.controlPopup.getAttribute("player-num");
            if (!this.ejs.controls[player][num]) {
                this.ejs.controls[player][num] = {};
            }
            this.ejs.controls[player][num].value = 0;
            this.ejs.controls[player][num].value2 = "";
            this.controlPopup.parentElement.parentElement.setAttribute("hidden", "");
            this.checkGamepadInputs();
            this.ejs.saveSettings();
        })
        popupMsg.classList.add("ejs_popup_box");
        popupMsg.innerText = "";
        popup.setAttribute("hidden", "");
        const popMsg = this.ejs.createElement("div");
        this.controlPopup = popMsg;
        popup.appendChild(popupMsg);
        popupMsg.appendChild(popMsg);
        popupMsg.appendChild(this.ejs.createElement("br"));
        popupMsg.appendChild(btn);
        this.controlMenu.appendChild(popup);
    }
    setVirtualGamepad() {
        this.virtualGamepad = this.ejs.createElement("div");
        this.toggleVirtualGamepad = (show) => {
            this.virtualGamepad.style.display = show ? "" : "none";
        }
        this.virtualGamepad.classList.add("ejs_virtualGamepad_parent");
        this.elements.parent.appendChild(this.virtualGamepad);

        const speedControlButtons = [
            { "type": "button", "text": "Fast", "id": "speed_fast", "location": "center", "left": -35, "top": 50, "fontSize": 15, "block": true, "input_value": 27 },
            { "type": "button", "text": "Slow", "id": "speed_slow", "location": "center", "left": 95, "top": 50, "fontSize": 15, "block": true, "input_value": 29 },
        ];
        if (this.ejs.rewindEnabled) {
            speedControlButtons.push({ "type": "button", "text": "Rewind", "id": "speed_rewind", "location": "center", "left": 30, "top": 50, "fontSize": 15, "block": true, "input_value": 28 });
        }

        let info;
        if (this.ejs.config.VirtualGamepadSettings && function (set) {
            if (!Array.isArray(set)) {
                if (this.ejs.debug) console.warn("Virtual gamepad settings is not array! Using default gamepad settings");
                return false;
            }
            if (!set.length) {
                if (this.ejs.debug) console.warn("Virtual gamepad settings is empty! Using default gamepad settings");
                return false;
            }
            for (let i = 0; i < set.length; i++) {
                if (!set[i].type) continue;
                try {
                    if (set[i].type === "zone" || set[i].type === "dpad") {
                        if (!set[i].location) {
                            console.warn("Missing location value for " + set[i].type + "! Using default gamepad settings");
                            return false;
                        } else if (!set[i].inputValues) {
                            console.warn("Missing inputValues for " + set[i].type + "! Using default gamepad settings");
                            return false;
                        }
                        continue;
                    }
                    if (!set[i].location) {
                        console.warn("Missing location value for button " + set[i].text + "! Using default gamepad settings");
                        return false;
                    } else if (!set[i].type) {
                        console.warn("Missing type value for button " + set[i].text + "! Using default gamepad settings");
                        return false;
                    } else if (!set[i].id.toString()) {
                        console.warn("Missing id value for button " + set[i].text + "! Using default gamepad settings");
                        return false;
                    } else if (!set[i].input_value.toString()) {
                        console.warn("Missing input_value for button " + set[i].text + "! Using default gamepad settings");
                        return false;
                    }
                } catch(e) {
                    console.warn("Error checking values! Using default gamepad settings");
                    return false;
                }
            }
            return true;
        }(this.ejs.config.VirtualGamepadSettings)) {
            info = this.ejs.config.VirtualGamepadSettings;
        } else if ("gba" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": 10, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -90, "bold": true, "block": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -90, "bold": true, "block": true, "input_value": 11 }
            ];
            info.push(...speedControlButtons);
        } else if ("gb" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": 10, "top": 70, "bold": true, "input_value": 0 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("nes" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("n64" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": -10, "top": 95, "input_value": 1, "bold": true },
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 40, "top": 150, "input_value": 0, "bold": true },
                { "type": "zone", "id": "stick", "location": "left", "left": "50%", "top": "100%", "joystickInput": true, "inputValues": [16, 17, 18, 19] },
                { "type": "zone", "id": "dpad", "location": "left", "left": "50%", "top": "0%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 30, "top": -10, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "L", "id": "l", "block": true, "location": "top", "left": 10, "top": -40, "bold": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "block": true, "location": "top", "right": 10, "top": -40, "bold": true, "input_value": 11 },
                { "type": "button", "text": "Z", "id": "z", "block": true, "location": "top", "left": 10, "bold": true, "input_value": 12 },
                { "fontSize": 20, "type": "button", "text": "CU", "id": "cu", "joystickInput": true, "location": "right", "left": 25, "top": -65, "input_value": 23 },
                { "fontSize": 20, "type": "button", "text": "CD", "id": "cd", "joystickInput": true, "location": "right", "left": 25, "top": 15, "input_value": 22 },
                { "fontSize": 20, "type": "button", "text": "CL", "id": "cl", "joystickInput": true, "location": "right", "left": -15, "top": -25, "input_value": 21 },
                { "fontSize": 20, "type": "button", "text": "CR", "id": "cr", "joystickInput": true, "location": "right", "left": 65, "top": -25, "input_value": 20 }
            ];
            info.push(...speedControlButtons);
        } else if ("nds" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "X", "id": "x", "location": "right", "left": 40, "bold": true, "input_value": 9 },
                { "type": "button", "text": "Y", "id": "y", "location": "right", "top": 40, "bold": true, "input_value": 1 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": 40, "top": 80, "bold": true, "input_value": 0 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -100, "bold": true, "block": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -100, "bold": true, "block": true, "input_value": 11 }
            ];
            info.push(...speedControlButtons);
        } else if ("snes" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "X", "id": "x", "location": "right", "left": 40, "bold": true, "input_value": 9 },
                { "type": "button", "text": "Y", "id": "y", "location": "right", "top": 40, "bold": true, "input_value": 1 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": 40, "top": 80, "bold": true, "input_value": 0 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -100, "bold": true, "block": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -100, "bold": true, "block": true, "input_value": 11 }
            ];
            info.push(...speedControlButtons);
        } else if (["segaMD", "segaCD", "sega32x"].includes(this.ejs.getControlScheme())) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 145, "top": 70, "bold": true, "input_value": 1 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "C", "id": "c", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "button", "text": "X", "id": "x", "location": "right", "right": 145, "top": 0, "bold": true, "input_value": 10 },
                { "type": "button", "text": "Y", "id": "y", "location": "right", "right": 75, "top": 0, "bold": true, "input_value": 9 },
                { "type": "button", "text": "Z", "id": "z", "location": "right", "right": 5, "top": 0, "bold": true, "input_value": 11 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Mode", "id": "mode", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("segaMS" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "1", "id": "button_1", "location": "right", "left": 10, "top": 40, "bold": true, "input_value": 0 },
                { "type": "button", "text": "2", "id": "button_2", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] }
            ];
            info.push(...speedControlButtons);
        } else if ("segaGG" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "1", "id": "button_1", "location": "right", "left": 10, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "2", "id": "button_2", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("segaSaturn" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 145, "top": 70, "bold": true, "input_value": 1 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "C", "id": "c", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "button", "text": "X", "id": "x", "location": "right", "right": 145, "top": 0, "bold": true, "input_value": 9 },
                { "type": "button", "text": "Y", "id": "y", "location": "right", "right": 75, "top": 0, "bold": true, "input_value": 10 },
                { "type": "button", "text": "Z", "id": "z", "location": "right", "right": 5, "top": 0, "bold": true, "input_value": 11 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -90, "bold": true, "block": true, "input_value": 12 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -90, "bold": true, "block": true, "input_value": 13 },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("atari2600" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "", "id": "button_1", "location": "right", "right": 10, "top": 70, "bold": true, "input_value": 0 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Reset", "id": "reset", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("atari7800" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "1", "id": "button_1", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "2", "id": "button_2", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Reset", "id": "reset", "location": "center", "left": -35, "fontSize": 15, "block": true, "input_value": 9 },
                { "type": "button", "text": "Pause", "id": "pause", "location": "center", "left": 95, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 2 },
            ];
            info.push(...speedControlButtons);
        } else if ("lynx" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "button_1", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "A", "id": "button_2", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Opt 1", "id": "option_1", "location": "center", "left": -35, "fontSize": 15, "block": true, "input_value": 10 },
                { "type": "button", "text": "Opt 2", "id": "option_2", "location": "center", "left": 95, "fontSize": 15, "block": true, "input_value": 11 },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("jaguar" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 145, "top": 70, "bold": true, "input_value": 8 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "C", "id": "c", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 1 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Option", "id": "option", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Pause", "id": "pause", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("vb" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 150, "bold": true, "input_value": 0 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 5, "top": 150, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "left_dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "dpad", "id": "right_dpad", "location": "right", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [19, 18, 17, 16] },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -90, "bold": true, "block": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -90, "bold": true, "block": true, "input_value": 11 },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("3do" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 145, "top": 70, "bold": true, "input_value": 1 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "C", "id": "c", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "L", "id": "l", "location": "left", "left": 3, "top": -90, "bold": true, "block": true, "input_value": 10 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "right": 3, "top": -90, "bold": true, "block": true, "input_value": 11 },
                { "type": "button", "text": "X", "id": "x", "location": "center", "left": -5, "fontSize": 15, "block": true, "bold": true, "input_value": 2 },
                { "type": "button", "text": "P", "id": "p", "location": "center", "left": 60, "fontSize": 15, "block": true, "bold": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("pce" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "II", "id": "ii", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "I", "id": "i", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Run", "id": "run", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("ngp" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 5, "top": 50, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Option", "id": "option", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else if ("ws" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "B", "id": "b", "location": "right", "right": 75, "top": 150, "bold": true, "input_value": 0 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "right": 5, "top": 150, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "x_dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "dpad", "id": "y_dpad", "location": "right", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [13, 12, 10, 11] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 30, "fontSize": 15, "block": true, "input_value": 3 },
            ];
            info.push(...speedControlButtons);
        } else if ("coleco" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "L", "id": "l", "location": "right", "left": 10, "top": 40, "bold": true, "input_value": 0 },
                { "type": "button", "text": "R", "id": "r", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },

                { "type": "button", "text": "1", "id": "one_key", "block": true, "fontSize": 15, "location": "left", "left": 0, "top": 145, "input_value": 1 },
                { "type": "button", "text": "2", "id": "two_key", "block": true, "fontSize": 15, "location": "left", "left": 60, "top": 145, "input_value": 9 },
                { "type": "button", "text": "3", "id": "three_key", "block": true, "fontSize": 15, "location": "left", "left": 120, "top": 145, "input_value": 10 },
                { "type": "button", "text": "4", "id": "four_key", "block": true, "fontSize": 15, "location": "left", "left": 0, "top": 185, "input_value": 11 },
                { "type": "button", "text": "5", "id": "five_key", "block": true, "fontSize": 15, "location": "left", "left": 60, "top": 185, "input_value": 12 },
                { "type": "button", "text": "6", "id": "six_key", "block": true, "fontSize": 15, "location": "left", "left": 120, "top": 185, "input_value": 13 },

                { "type": "button", "text": "7", "id": "seven_key", "block": true, "fontSize": 15, "location": "right", "right": 120, "top": 145, "input_value": 14 },
                { "type": "button", "text": "8", "id": "eight_key", "block": true, "fontSize": 15, "location": "right", "right": 60, "top": 145, "input_value": 15 },
                { "type": "button", "text": "9", "id": "nine_key", "block": true, "fontSize": 15, "location": "right", "right": "0px", "top": 145, "input_value": 18 },
                { "type": "button", "text": "*", "id": "star_key", "block": true, "fontSize": 15, "location": "right", "right": 120, "top": 185, "input_value": 3 },
                { "type": "button", "text": "0", "id": "zero_key", "block": true, "fontSize": 15, "location": "right", "right": 60, "top": 185, "input_value": 16 },
                { "type": "button", "text": "#", "id": "hash_key", "block": true, "fontSize": 15, "location": "right", "right": "0px", "top": 185, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        } else if ("pcfx" === this.ejs.getControlScheme()) {
            info = [
                { "type": "button", "text": "I", "id": "i", "location": "right", "right": 5, "top": 70, "bold": true, "input_value": 8 },
                { "type": "button", "text": "II", "id": "ii", "location": "right", "right": 75, "top": 70, "bold": true, "input_value": 0 },
                { "type": "button", "text": "III", "id": "iii", "location": "right", "right": 145, "top": 70, "bold": true, "input_value": 9 },
                { "type": "button", "text": "IV", "id": "iv", "location": "right", "right": 5, "top": 0, "bold": true, "input_value": 1 },
                { "type": "button", "text": "V", "id": "v", "location": "right", "right": 75, "top": 0, "bold": true, "input_value": 10 },
                { "type": "button", "text": "VI", "id": "vi", "location": "right", "right": 145, "top": 0, "bold": true, "input_value": 11 },
                { "type": "dpad", "id": "dpad", "location": "left", "left": "50%", "right": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 },
                { "type": "button", "text": "Run", "id": "run", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 }
            ];
            info.push(...speedControlButtons);
        } else {
            info = [
                { "type": "button", "text": "Y", "id": "y", "location": "right", "left": 40, "bold": true, "input_value": 9 },
                { "type": "button", "text": "X", "id": "x", "location": "right", "top": 40, "bold": true, "input_value": 1 },
                { "type": "button", "text": "B", "id": "b", "location": "right", "left": 81, "top": 40, "bold": true, "input_value": 8 },
                { "type": "button", "text": "A", "id": "a", "location": "right", "left": 40, "top": 80, "bold": true, "input_value": 0 },
                { "type": "zone", "id": "dpad", "location": "left", "left": "50%", "top": "50%", "joystickInput": false, "inputValues": [4, 5, 6, 7] },
                { "type": "button", "text": "Start", "id": "start", "location": "center", "left": 60, "fontSize": 15, "block": true, "input_value": 3 },
                { "type": "button", "text": "Select", "id": "select", "location": "center", "left": -5, "fontSize": 15, "block": true, "input_value": 2 }
            ];
            info.push(...speedControlButtons);
        }
        for (let i = 0; i < info.length; i++) {
            if (info[i].text) {
                info[i].text = this.localization(info[i].text);
            }
        }
        info = JSON.parse(JSON.stringify(info));

        const up = this.ejs.createElement("div");
        up.classList.add("ejs_virtualGamepad_top");
        const down = this.ejs.createElement("div");
        down.classList.add("ejs_virtualGamepad_bottom");
        const left = this.ejs.createElement("div");
        left.classList.add("ejs_virtualGamepad_left");
        const right = this.ejs.createElement("div");
        right.classList.add("ejs_virtualGamepad_right");
        const elems = { top: up, center: down, left, right };

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
        const blockCSS = "height:31px;text-align:center;border:1px solid #ccc;border-radius:5px;line-height:31px;";
        const controlSchemeCls = `cs_${this.ejs.getControlScheme()}`.split(/\s/g).join("_");

        for (let i = 0; i < info.length; i++) {
            if (info[i].type !== "button") continue;
            if (leftHandedMode && ["left", "right"].includes(info[i].location)) {
                info[i].location = (info[i].location === "left") ? "right" : "left";
                const amnt = JSON.parse(JSON.stringify(info[i]));
                if (amnt.left) {
                    info[i].right = amnt.left;
                }
                if (amnt.right) {
                    info[i].left = amnt.right;
                }
            }
            let style = "";
            if (info[i].left) {
                style += "left:" + info[i].left + (typeof info[i].left === "number" ? "px" : "") + ";";
            }
            if (info[i].right) {
                style += "right:" + info[i].right + (typeof info[i].right === "number" ? "px" : "") + ";";
            }
            if (info[i].top) {
                style += "top:" + info[i].top + (typeof info[i].top === "number" ? "px" : "") + ";";
            }
            if (!info[i].bold) {
                style += "font-weight:normal;";
            } else if (info[i].bold) {
                style += "font-weight:bold;";
            }
            info[i].fontSize = info[i].fontSize || 30;
            style += "font-size:" + info[i].fontSize + "px;";
            if (info[i].block) {
                style += blockCSS;
            }
            if (["top", "center", "left", "right"].includes(info[i].location)) {
                const button = this.ejs.createElement("div");
                button.style = style;
                button.innerText = info[i].text;
                button.classList.add("ejs_virtualGamepad_button", controlSchemeCls);
                if (info[i].id) {
                    button.classList.add(`b_${info[i].id}`);
                }
                elems[info[i].location].appendChild(button);
                const value = info[i].input_new_cores || info[i].input_value;
                let downValue = info[i].joystickInput === true ? 0x7fff : 1;
                this.ejs.addEventListener(button, "touchstart touchend touchcancel", (e) => {
                    e.preventDefault();
                    const isAnalog = this.ejs.analogAxes.includes(value);
                    if (e.type === "touchend" || e.type === "touchcancel") {
                        e.target.classList.remove("ejs_virtualGamepad_button_down");
                        window.setTimeout(() => {
                            this.ejs.stopAutofire(0, value);
                            this.ejs.gameManager.simulateInput(0, value, 0);
                        })
                    } else {
                        e.target.classList.add("ejs_virtualGamepad_button_down");
                        this.ejs.gameManager.simulateInput(0, value, downValue);
                        if (this.ejs.isAutofireEnabled(0, value) && !isAnalog) {
                            this.ejs.startAutofire(0, value, downValue);
                        }
                    }
                })
            }
        }

        const createDPad = (opts) => {
            const container = opts.container;
            const callback = opts.event;
            const dpadMain = this.ejs.createElement("div");
            dpadMain.classList.add("ejs_dpad_main");
            const vertical = this.ejs.createElement("div");
            vertical.classList.add("ejs_dpad_vertical");
            const horizontal = this.ejs.createElement("div");
            horizontal.classList.add("ejs_dpad_horizontal");
            const bar1 = this.ejs.createElement("div");
            bar1.classList.add("ejs_dpad_bar");
            const bar2 = this.ejs.createElement("div");
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

            this.ejs.addEventListener(dpadMain, "touchstart touchmove", updateCb);
            this.ejs.addEventListener(dpadMain, "touchend touchcancel", cancelCb);


            container.appendChild(dpadMain);
        }

        info.forEach((dpad, index) => {
            if (dpad.type !== "dpad") return;
            if (leftHandedMode && ["left", "right"].includes(dpad.location)) {
                dpad.location = (dpad.location === "left") ? "right" : "left";
                const amnt = JSON.parse(JSON.stringify(dpad));
                if (amnt.left) {
                    dpad.right = amnt.left;
                }
                if (amnt.right) {
                    dpad.left = amnt.right;
                }
            }
            const elem = this.ejs.createElement("div");
            let style = "";
            if (dpad.left) {
                style += "left:" + dpad.left + ";";
            }
            if (dpad.right) {
                style += "right:" + dpad.right + ";";
            }
            if (dpad.top) {
                style += "top:" + dpad.top + ";";
            }
            elem.classList.add(controlSchemeCls);
            if (dpad.id) {
                elem.classList.add(`b_${dpad.id}`);
            }
            elem.style = style;
            elems[dpad.location].appendChild(elem);
            createDPad({
                container: elem,
                event: (up, down, left, right) => {
                    if (dpad.joystickInput) {
                        if (up === 1) up = 0x7fff;
                        if (down === 1) down = 0x7fff;
                        if (left === 1) left = 0x7fff;
                        if (right === 1) right = 0x7fff;
                    }
                    this.ejs.gameManager.simulateInput(0, dpad.inputValues[0], up);
                    this.ejs.gameManager.simulateInput(0, dpad.inputValues[1], down);
                    this.ejs.gameManager.simulateInput(0, dpad.inputValues[2], left);
                    this.ejs.gameManager.simulateInput(0, dpad.inputValues[3], right);
                }
            });
        })

        info.forEach((zone, index) => {
            if (zone.type !== "zone") return;
            if (leftHandedMode && ["left", "right"].includes(zone.location)) {
                zone.location = (zone.location === "left") ? "right" : "left";
                const amnt = JSON.parse(JSON.stringify(zone));
                if (amnt.left) {
                    zone.right = amnt.left;
                }
                if (amnt.right) {
                    zone.left = amnt.right;
                }
            }
            const elem = this.ejs.createElement("div");
            this.ejs.addEventListener(elem, "touchstart touchmove touchend touchcancel", (e) => {
                e.preventDefault();
            });
            elem.classList.add(controlSchemeCls);
            if (zone.id) {
                elem.classList.add(`b_${zone.id}`);
            }
            elems[zone.location].appendChild(elem);
            const zoneObj = nipplejs.create({
                "zone": elem,
                "mode": "static",
                "position": {
                    "left": zone.left,
                    "top": zone.top
                },
                "color": zone.color || "red"
            });
            zoneObj.on("end", () => {
                this.ejs.gameManager.simulateInput(0, zone.inputValues[0], 0);
                this.ejs.gameManager.simulateInput(0, zone.inputValues[1], 0);
                this.ejs.gameManager.simulateInput(0, zone.inputValues[2], 0);
                this.ejs.gameManager.simulateInput(0, zone.inputValues[3], 0);
            });
            zoneObj.on("move", (e, info) => {
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
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[0], 0x7fff * x);
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[1], 0);
                    } else {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[1], 0x7fff * -x);
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[0], 0);
                    }
                    if (y > 0) {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[2], 0x7fff * y);
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[3], 0);
                    } else {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[3], 0x7fff * -y);
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[2], 0);
                    }

                } else {
                    if (degree >= 30 && degree < 150) {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[0], 1);
                    } else {
                        window.setTimeout(() => {
                            this.ejs.gameManager.simulateInput(0, zone.inputValues[0], 0);
                        }, 30);
                    }
                    if (degree >= 210 && degree < 330) {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[1], 1);
                    } else {
                        window.setTimeout(() => {
                            this.ejs.gameManager.simulateInput(0, zone.inputValues[1], 0);
                        }, 30);
                    }
                    if (degree >= 120 && degree < 240) {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[2], 1);
                    } else {
                        window.setTimeout(() => {
                            this.ejs.gameManager.simulateInput(0, zone.inputValues[2], 0);
                        }, 30);
                    }
                    if (degree >= 300 || degree >= 0 && degree < 60) {
                        this.ejs.gameManager.simulateInput(0, zone.inputValues[3], 1);
                    } else {
                        window.setTimeout(() => {
                            this.ejs.gameManager.simulateInput(0, zone.inputValues[3], 0);
                        }, 30);
                    }
                }
            });
        })

        if (this.ejs.touch || this.ejs.hasTouchScreen) {
            const menuButton = this.ejs.createElement("div");
            menuButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z"/></svg>';
            menuButton.classList.add("ejs_virtualGamepad_open");
            menuButton.style.display = "none";
            this.ejs.on("start", () => {
                menuButton.style.display = "";
                if (matchMedia('(pointer:fine)').matches && this.ejs.getSettingValue("menu-bar-button") !== "visible") {
                    menuButton.style.opacity = 0;
                    this.changeSettingOption('menu-bar-button', 'hidden', true);
                }
            });
            this.elements.parent.appendChild(menuButton);
            let timeout;
            let ready = true;
            this.ejs.addEventListener(menuButton, "touchstart touchend mousedown mouseup click", (e) => {
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
        const positionInfo = this.elements.parent.getBoundingClientRect();
        this.game.parentElement.classList.toggle("ejs_small_screen", positionInfo.width <= 575);
        //This wouldnt work using :not()... strange.
        this.game.parentElement.classList.toggle("ejs_big_screen", positionInfo.width > 575);

        if (!this.handleSettingsResize) return;
        this.handleSettingsResize();
    }
    getElementSize(element) {
        let elem = element.cloneNode(true);
        elem.style.position = "absolute";
        elem.style.opacity = 0;
        elem.removeAttribute("hidden");
        element.parentNode.appendChild(elem);
        const res = elem.getBoundingClientRect();
        elem.remove();
        return {
            "width": res.width,
            "height": res.height
        };
    }
    setupDisksMenu() {
        this.disksMenu = this.ejs.createElement("div");
        this.disksMenu.classList.add("ejs_settings_parent");
        const nested = this.ejs.createElement("div");
        nested.classList.add("ejs_settings_transition");
        this.disks = {};

        const home = this.ejs.createElement("div");
        home.style.overflow = "auto";
        const menus = [];
        this.handleDisksResize = () => {
            let needChange = false;
            if (this.disksMenu.style.display !== "") {
                this.disksMenu.style.opacity = "0";
                this.disksMenu.style.display = "";
                needChange = true;
            }
            let height = this.elements.parent.getBoundingClientRect().height;
            let w2 = this.diskParent.parentElement.getBoundingClientRect().width;
            let disksX = this.diskParent.getBoundingClientRect().x;
            if (w2 > window.innerWidth) disksX += (w2 - window.innerWidth);
            const onTheRight = disksX > (w2 - 15) / 2;
            if (height > 375) height = 375;
            home.style["max-height"] = (height - 95) + "px";
            nested.style["max-height"] = (height - 95) + "px";
            for (let i = 0; i < menus.length; i++) {
                menus[i].style["max-height"] = (height - 95) + "px";
            }
            this.disksMenu.classList.toggle("ejs_settings_center_left", !onTheRight);
            this.disksMenu.classList.toggle("ejs_settings_center_right", onTheRight);
            if (needChange) {
                this.disksMenu.style.display = "none";
                this.disksMenu.style.opacity = "";
            }
        }

        home.classList.add("ejs_setting_menu");
        nested.appendChild(home);
        let funcs = [];
        this.changeDiskOption = (title, newValue) => {
            this.disks[title] = newValue;
            funcs.forEach(e => e(title));
        }
        let allOpts = {};

        // TODO - Why is this duplicated?
        const addToMenu = (title, id, options, defaultOption) => {
            const span = this.ejs.createElement("span");
            span.innerText = title;

            const current = this.ejs.createElement("div");
            current.innerText = "";
            current.classList.add("ejs_settings_main_bar_selected");
            span.appendChild(current);

            const menu = this.ejs.createElement("div");
            menus.push(menu);
            menu.setAttribute("hidden", "");
            menu.classList.add("ejs_parent_option_div");
            const button = this.ejs.createElement("button");
            const goToHome = () => {
                const homeSize = this.getElementSize(home);
                nested.style.width = (homeSize.width + 20) + "px";
                nested.style.height = homeSize.height + "px";
                menu.setAttribute("hidden", "");
                home.removeAttribute("hidden");
            }
            this.ejs.addEventListener(button, "click", goToHome);

            button.type = "button";
            button.classList.add("ejs_back_button");
            menu.appendChild(button);
            const pageTitle = this.ejs.createElement("span");
            pageTitle.innerText = title;
            pageTitle.classList.add("ejs_menu_text_a");
            button.appendChild(pageTitle);

            const optionsMenu = this.ejs.createElement("div");
            optionsMenu.classList.add("ejs_setting_menu");

            let buttons = [];
            let opts = options;
            if (Array.isArray(options)) {
                opts = {};
                for (let i = 0; i < options.length; i++) {
                    opts[options[i]] = options[i];
                }
            }
            allOpts[id] = opts;

            funcs.push((title) => {
                if (id !== title) return;
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].classList.toggle("ejs_option_row_selected", buttons[j].getAttribute("ejs_value") === this.disks[id]);
                }
                this.ejs.menuOptionChanged(id, this.disks[id]);
                current.innerText = opts[this.disks[id]];
            });

            for (const opt in opts) {
                const optionButton = this.ejs.createElement("button");
                buttons.push(optionButton);
                optionButton.setAttribute("ejs_value", opt);
                optionButton.type = "button";
                optionButton.value = opts[opt];
                optionButton.classList.add("ejs_option_row");
                optionButton.classList.add("ejs_button_style");

                this.ejs.addEventListener(optionButton, "click", (e) => {
                    this.disks[id] = opt;
                    for (let j = 0; j < buttons.length; j++) {
                        buttons[j].classList.remove("ejs_option_row_selected");
                    }
                    optionButton.classList.add("ejs_option_row_selected");
                    this.ejs.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                    goToHome();
                })
                if (defaultOption === opt) {
                    optionButton.classList.add("ejs_option_row_selected");
                    this.ejs.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                }

                const msg = this.ejs.createElement("span");
                msg.innerText = opts[opt];
                optionButton.appendChild(msg);

                optionsMenu.appendChild(optionButton);
            }

            home.appendChild(optionsMenu);

            nested.appendChild(menu);
        }

        if (this.ejs.gameManager.getDiskCount() > 1) {
            const diskLabels = {};
            let isM3U = false;
            let disks = {};
            if (this.ejs.fileName.split(".").pop() === "m3u") {
                disks = this.ejs.gameManager.Module.FS.readFile(this.ejs.fileName, { encoding: "utf8" }).split("\n");
                isM3U = true;
            }
            for (let i = 0; i < this.ejs.gameManager.getDiskCount(); i++) {
                // default if not an m3u loaded rom is "Disk x"
                // if m3u, then use the file name without the extension
                // if m3u, and contains a |, then use the string after the | as the disk label
                if (!isM3U) {
                    diskLabels[i.toString()] = "Disk " + (i + 1);
                } else {
                    // get disk name from m3u
                    const diskLabelValues = disks[i].split("|");
                    // remove the file extension from the disk file name
                    let diskLabel = diskLabelValues[0].replace("." + diskLabelValues[0].split(".").pop(), "");
                    if (diskLabelValues.length >= 2) {
                        // has a label - use that instead
                        diskLabel = diskLabelValues[1];
                    }
                    diskLabels[i.toString()] = diskLabel;
                }
            }
            addToMenu(this.localization("Disk"), "disk", diskLabels, this.ejs.gameManager.getCurrentDisk().toString());
        }

        this.disksMenu.appendChild(nested);

        this.diskParent.appendChild(this.disksMenu);
        this.diskParent.style.position = "relative";

        const homeSize = this.getElementSize(home);
        nested.style.width = (homeSize.width + 20) + "px";
        nested.style.height = homeSize.height + "px";

        this.disksMenu.style.display = "none";

        if (this.ejs.debug) {
            console.log("Available core options", allOpts);
        }

        if (this.ejs.config.defaultOptions) {
            for (const k in this.ejs.config.defaultOptions) {
                this.changeDiskOption(k, this.ejs.config.defaultOptions[k]);
            }
        }
    }
    setupSettingsMenu() {
        this.settingsMenu = this.ejs.createElement("div");
        this.settingsMenu.classList.add("ejs_settings_parent");
        const nested = this.ejs.createElement("div");
        nested.classList.add("ejs_settings_transition");
        this.settings = {};
        const menus = [];
        let parentMenuCt = 0;

        const createSettingParent = (child, title, parentElement) => {
            const rv = this.ejs.createElement("div");
            rv.classList.add("ejs_setting_menu");

            if (child) {
                const menuOption = this.ejs.createElement("div");
                menuOption.classList.add("ejs_settings_main_bar");
                const span = this.ejs.createElement("span");
                span.innerText = title;

                menuOption.appendChild(span);
                parentElement.appendChild(menuOption);

                const menu = this.ejs.createElement("div");
                const menuChild = this.ejs.createElement("div");
                menus.push(menu);
                parentMenuCt++;
                menu.setAttribute("hidden", "");
                menuChild.classList.add("ejs_parent_option_div");
                const button = this.ejs.createElement("button");
                const goToHome = () => {
                    const homeSize = this.getElementSize(parentElement);
                    nested.style.width = (homeSize.width + 20) + "px";
                    nested.style.height = homeSize.height + "px";
                    menu.setAttribute("hidden", "");
                    parentElement.removeAttribute("hidden");
                }
                this.ejs.addEventListener(menuOption, "click", (e) => {
                    const targetSize = this.getElementSize(menu);
                    nested.style.width = (targetSize.width + 20) + "px";
                    nested.style.height = targetSize.height + "px";
                    menu.removeAttribute("hidden");
                    rv.scrollTo(0, 0);
                    parentElement.setAttribute("hidden", "");
                })
                const observer = new MutationObserver((list) => {
                    for (const k of list) {
                        for (const removed of k.removedNodes) {
                            if (removed === menu) {
                                menuOption.remove();
                                observer.disconnect();
                                const index = menus.indexOf(menu);
                                if (index !== -1) menus.splice(index, 1);
                                this.settingsMenu.style.display = "";
                                const homeSize = this.getElementSize(parentElement);
                                nested.style.width = (homeSize.width + 20) + "px";
                                nested.style.height = homeSize.height + "px";
                                // This SHOULD always be called before the game started - this SHOULD never be an issue
                                this.settingsMenu.style.display = "none";
                            }
                        }
                    }
                });
                this.ejs.addEventListener(button, "click", goToHome);

                button.type = "button";
                button.classList.add("ejs_back_button");
                menuChild.appendChild(button);
                const pageTitle = this.ejs.createElement("span");
                pageTitle.innerText = title;
                pageTitle.classList.add("ejs_menu_text_a");
                button.appendChild(pageTitle);
                
                // const optionsMenu = this.ejs.createElement("div");
                // optionsMenu.classList.add("ejs_setting_menu");
                // menu.appendChild(optionsMenu);

                menuChild.appendChild(rv);
                menu.appendChild(menuChild);
                nested.appendChild(menu);
                observer.observe(nested, {
                    childList: true,
                    subtree: true,
                });
            }

            return rv;
        }

        const checkForEmptyMenu = (element) => {
            if (element.firstChild === null) {
                element.parentElement.remove(); // No point in keeping an empty menu
                parentMenuCt--;
            }
        }

        const home = createSettingParent();

        this.handleSettingsResize = () => {
            let needChange = false;
            if (this.settingsMenu.style.display !== "") {
                this.settingsMenu.style.opacity = "0";
                this.settingsMenu.style.display = "";
                needChange = true;
            }
            let height = this.elements.parent.getBoundingClientRect().height;
            let w2 = this.settingParent.parentElement.getBoundingClientRect().width;
            let settingsX = this.settingParent.getBoundingClientRect().x;
            if (w2 > window.innerWidth) settingsX += (w2 - window.innerWidth);
            const onTheRight = settingsX > (w2 - 15) / 2;
            if (height > 375) height = 375;
            home.style["max-height"] = (height - 95) + "px";
            nested.style["max-height"] = (height - 95) + "px";
            for (let i = 0; i < menus.length; i++) {
                menus[i].style["max-height"] = (height - 95) + "px";
            }
            this.settingsMenu.classList.toggle("ejs_settings_center_left", !onTheRight);
            this.settingsMenu.classList.toggle("ejs_settings_center_right", onTheRight);
            if (needChange) {
                this.settingsMenu.style.display = "none";
                this.settingsMenu.style.opacity = "";
            }
        }
        nested.appendChild(home);

        let funcs = [];
        let settings = {};
        this.changeSettingOption = (title, newValue, startup) => {
            this.ejs.allSettings[title] = newValue;
            if (startup !== true) {
                this.settings[title] = newValue;
            }
            settings[title] = newValue;
            funcs.forEach(e => e(title));
        }
        let allOpts = {};

        const addToMenu = (title, id, options, defaultOption, parentElement, useParentParent, info) => {
            if (Array.isArray(this.ejs.config.hideSettings) && this.ejs.config.hideSettings.includes(id)) {
                return;
            }
            parentElement = parentElement || home;
            const transitionElement = useParentParent ? parentElement.parentElement.parentElement : parentElement;
            const menuOption = this.ejs.createElement("div");
            menuOption.classList.add("ejs_settings_main_bar");
            if (info) menuOption.title = info;
            const span = this.ejs.createElement("span");
            span.innerText = title;

            const current = this.ejs.createElement("div");
            current.innerText = "";
            current.classList.add("ejs_settings_main_bar_selected");
            span.appendChild(current);

            menuOption.appendChild(span);
            parentElement.appendChild(menuOption);

            const menu = this.ejs.createElement("div");
            menus.push(menu);
            const menuChild = this.ejs.createElement("div");
            menu.setAttribute("hidden", "");
            menuChild.classList.add("ejs_parent_option_div");

            const optionsMenu = this.ejs.createElement("div");
            optionsMenu.classList.add("ejs_setting_menu");

            const button = this.ejs.createElement("button");
            const goToHome = () => {
                transitionElement.removeAttribute("hidden");
                menu.setAttribute("hidden", "");
                const homeSize = this.getElementSize(transitionElement);
                nested.style.width = (homeSize.width + 20) + "px";
                nested.style.height = homeSize.height + "px";
                transitionElement.removeAttribute("hidden");
            }
            this.ejs.addEventListener(menuOption, "click", (e) => {
                const targetSize = this.getElementSize(menu);
                nested.style.width = (targetSize.width + 20) + "px";
                nested.style.height = targetSize.height + "px";
                menu.removeAttribute("hidden");
                optionsMenu.scrollTo(0, 0);
                transitionElement.setAttribute("hidden", "");
                transitionElement.setAttribute("hidden", "");
            })
            this.ejs.addEventListener(button, "click", goToHome);

            button.type = "button";
            button.classList.add("ejs_back_button");
            menuChild.appendChild(button);
            const pageTitle = this.ejs.createElement("span");
            pageTitle.innerText = title;
            pageTitle.classList.add("ejs_menu_text_a");
            button.appendChild(pageTitle);

            let buttons = [];
            let opts = options;
            if (Array.isArray(options)) {
                opts = {};
                for (let i = 0; i < options.length; i++) {
                    opts[options[i]] = options[i];
                }
            }
            allOpts[id] = opts;

            funcs.push((title) => {
                if (id !== title) return;
                for (let j = 0; j < buttons.length; j++) {
                    buttons[j].classList.toggle("ejs_option_row_selected", buttons[j].getAttribute("ejs_value") === settings[id]);
                }
                this.ejs.menuOptionChanged(id, settings[id]);
                current.innerText = opts[settings[id]];
            });

            for (const opt in opts) {
                const optionButton = this.ejs.createElement("button");
                buttons.push(optionButton);
                optionButton.setAttribute("ejs_value", opt);
                optionButton.type = "button";
                optionButton.value = opts[opt];
                optionButton.classList.add("ejs_option_row");
                optionButton.classList.add("ejs_button_style");

                this.ejs.addEventListener(optionButton, "click", (e) => {
                    this.changeSettingOption(id, opt);
                    for (let j = 0; j < buttons.length; j++) {
                        buttons[j].classList.remove("ejs_option_row_selected");
                    }
                    optionButton.classList.add("ejs_option_row_selected");
                    this.ejs.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                    goToHome();
                })
                if (defaultOption === opt) {
                    optionButton.classList.add("ejs_option_row_selected");
                    this.ejs.menuOptionChanged(id, opt);
                    current.innerText = opts[opt];
                }

                const msg = this.ejs.createElement("span");
                msg.innerText = opts[opt];
                optionButton.appendChild(msg);

                optionsMenu.appendChild(optionButton);
            }

            menuChild.appendChild(optionsMenu);

            menu.appendChild(menuChild);
            nested.appendChild(menu);
        }
        const cores = this.ejs.getCores();
        const core = cores[this.ejs.getCore(true)];
        if (core && core.length > 1) {
            addToMenu(this.localization("Core" + " (" + this.localization("Requires restart") + ")"), "retroarch_core", core, this.ejs.getCore(), home);
        }
        if (typeof window.SharedArrayBuffer === "function" && !this.ejs.requiresThreads(this.ejs.getCore())) {
            addToMenu(this.localization("Threads"), "ejs_threads", {
                "enabled": this.localization("Enabled"),
                "disabled": this.localization("Disabled")
            }, this.ejs.config.threads ? "enabled" : "disabled", home);
        }

        const graphicsOptions = createSettingParent(true, "Graphics Settings", home);

        if (this.ejs.shaders) {
            const builtinShaders = {
                "2xScaleHQ.glslp": this.localization("2xScaleHQ"),
                "4xScaleHQ.glslp": this.localization("4xScaleHQ"),
                "crt-aperture.glslp": this.localization("CRT aperture"),
                "crt-beam": this.localization("CRT beam"),
                "crt-caligari": this.localization("CRT caligari"),
                "crt-easymode.glslp": this.localization("CRT easymode"),
                "crt-geom.glslp": this.localization("CRT geom"),
                "crt-lottes": this.localization("CRT lottes"),
                "crt-mattias.glslp": this.localization("CRT mattias"),
                "crt-yeetron": this.localization("CRT yeetron"),
                "crt-zfast": this.localization("CRT zfast"),
                "sabr": this.localization("SABR"),
                "bicubic": this.localization("Bicubic"),
                "mix-frames": this.localization("Mix frames"),
            };
            let shaderMenu = {
                "disabled": this.localization("Disabled"),
            };
            for (const shaderName in this.ejs.shaders) {
                if (builtinShaders[shaderName]) {
                    shaderMenu[shaderName] = builtinShaders[shaderName];
                } else {
                    shaderMenu[shaderName] = shaderName;
                }
            }
            addToMenu(this.localization("Shaders"), "shader", shaderMenu, "disabled", graphicsOptions, true);
        }

        if (this.ejs.supportsWebgl2 && !this.ejs.requiresWebGL2(this.ejs.getCore())) {
            addToMenu(this.localization("WebGL2") + " (" + this.localization("Requires restart") + ")", "webgl2Enabled", {
                "enabled": this.localization("Enabled"),
                "disabled": this.localization("Disabled")
            }, this.ejs.webgl2Enabled ? "enabled" : "disabled", graphicsOptions, true);
        }

        addToMenu(this.localization("FPS"), "fps", {
            "show": this.localization("show"),
            "hide": this.localization("hide")
        }, "hide", graphicsOptions, true);

        addToMenu(this.localization("VSync"), "vsync", {
            "enabled": this.localization("Enabled"),
            "disabled": this.localization("Disabled")
        }, "enabled", graphicsOptions, true);

        addToMenu(this.localization("Video Rotation"), "videoRotation", {
            "0": "0 deg",
            "1": "90 deg",
            "2": "180 deg",
            "3": "270 deg"
        }, this.ejs.videoRotation.toString(), graphicsOptions, true);

        const screenCaptureOptions = createSettingParent(true, "Screen Capture", home);

        addToMenu(this.localization("Screenshot Source"), "screenshotSource", {
            "canvas": "canvas",
            "retroarch": "retroarch"
        }, this.ejs.capture.photo.source, screenCaptureOptions, true);

        let screenshotFormats = {
            "png": "png",
            "jpeg": "jpeg",
            "webp": "webp"
        }
        if (this.ejs.isSafari) {  
            delete screenshotFormats["webp"]; 
        }
        if (!(this.ejs.capture.photo.format in screenshotFormats)) {
            this.ejs.capture.photo.format = "png";
        }
        addToMenu(this.localization("Screenshot Format"), "screenshotFormat", screenshotFormats, this.ejs.capture.photo.format, screenCaptureOptions, true);

        const screenshotUpscale = this.ejs.capture.photo.upscale.toString();
        let screenshotUpscales = {
            "0": "native",
            "1": "1x",
            "2": "2x",
            "3": "3x"
        }
        if (!(screenshotUpscale in screenshotUpscales)) {
            screenshotUpscales[screenshotUpscale] = screenshotUpscale + "x";
        }
        addToMenu(this.localization("Screenshot Upscale"), "screenshotUpscale", screenshotUpscales, screenshotUpscale, screenCaptureOptions, true);

        const screenRecordFPS = this.ejs.capture.video.fps.toString();
        let screenRecordFPSs = {
            "30": "30",
            "60": "60"
        }
        if (!(screenRecordFPS in screenRecordFPSs)) {
            screenRecordFPSs[screenRecordFPS] = screenRecordFPS;
        }
        addToMenu(this.localization("Screen Recording FPS"), "screenRecordFPS", screenRecordFPSs, screenRecordFPS, screenCaptureOptions, true);

        let screenRecordFormats = {
            "mp4": "mp4",
            "webm": "webm"
        }
        for (const format in screenRecordFormats) {
            if (!MediaRecorder.isTypeSupported("video/" + format)) {
                delete screenRecordFormats[format];
            }
        }
        if (!(this.ejs.capture.video.format in screenRecordFormats)) {
            this.ejs.capture.video.format = Object.keys(screenRecordFormats)[0];
        }
        addToMenu(this.localization("Screen Recording Format"), "screenRecordFormat", screenRecordFormats, this.ejs.capture.video.format, screenCaptureOptions, true);

        const screenRecordUpscale = this.ejs.capture.video.upscale.toString();
        let screenRecordUpscales = {
            "1": "1x",
            "2": "2x",
            "3": "3x",
            "4": "4x"
        }
        if (!(screenRecordUpscale in screenRecordUpscales)) {
            screenRecordUpscales[screenRecordUpscale] = screenRecordUpscale + "x";
        }
        addToMenu(this.localization("Screen Recording Upscale"), "screenRecordUpscale", screenRecordUpscales, screenRecordUpscale, screenCaptureOptions, true);

        const screenRecordVideoBitrate = this.ejs.capture.video.videoBitrate.toString();
        let screenRecordVideoBitrates = {
            "1048576": "1 Mbit/sec",
            "2097152": "2 Mbit/sec",
            "2621440": "2.5 Mbit/sec",
            "3145728": "3 Mbit/sec",
            "4194304": "4 Mbit/sec"
        }
        if (!(screenRecordVideoBitrate in screenRecordVideoBitrates)) {
            screenRecordVideoBitrates[screenRecordVideoBitrate] = screenRecordVideoBitrate + " Bits/sec";
        }
        addToMenu(this.localization("Screen Recording Video Bitrate"), "screenRecordVideoBitrate", screenRecordVideoBitrates, screenRecordVideoBitrate, screenCaptureOptions, true);

        const screenRecordAudioBitrate = this.ejs.capture.video.audioBitrate.toString();
        let screenRecordAudioBitrates = {
            "65536": "64 Kbit/sec",
            "131072": "128 Kbit/sec",
            "196608": "192 Kbit/sec",
            "262144": "256 Kbit/sec",
            "327680": "320 Kbit/sec"
        }
        if (!(screenRecordAudioBitrate in screenRecordAudioBitrates)) {
            screenRecordAudioBitrates[screenRecordAudioBitrate] = screenRecordAudioBitrate + " Bits/sec";
        }
        addToMenu(this.localization("Screen Recording Audio Bitrate"), "screenRecordAudioBitrate", screenRecordAudioBitrates, screenRecordAudioBitrate, screenCaptureOptions, true);

        checkForEmptyMenu(screenCaptureOptions);

        const speedOptions = createSettingParent(true, "Speed Options", home);

        addToMenu(this.localization("Fast Forward"), "fastForward", {
            "enabled": this.localization("Enabled"),
            "disabled": this.localization("Disabled")
        }, "disabled", speedOptions, true);

        addToMenu(this.localization("Fast Forward Ratio"), "ff-ratio", [
            "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0", "unlimited"
        ], "3.0", speedOptions, true);

        addToMenu(this.localization("Slow Motion"), "slowMotion", {
            "enabled": this.localization("Enabled"),
            "disabled": this.localization("Disabled")
        }, "disabled", speedOptions, true);

        addToMenu(this.localization("Slow Motion Ratio"), "sm-ratio", [
            "1.5", "2.0", "2.5", "3.0", "3.5", "4.0", "4.5", "5.0", "5.5", "6.0", "6.5", "7.0", "7.5", "8.0", "8.5", "9.0", "9.5", "10.0"
        ], "3.0", speedOptions, true);

        addToMenu(this.localization("Rewind Enabled" + " (" + this.localization("Requires restart") + ")"), "rewindEnabled", {
            "enabled": this.localization("Enabled"),
            "disabled": this.localization("Disabled")
        }, "disabled", speedOptions, true);

        if (this.ejs.rewindEnabled) {
            addToMenu(this.localization("Rewind Granularity"), "rewind-granularity", [
                "1", "3", "6", "12", "25", "50", "100"
            ], "6", speedOptions, true);
        }

        const inputOptions = createSettingParent(true, "Input Options", home);

        addToMenu(this.localization("Menubar Mouse Trigger"), "menubarBehavior", {
            "downward": this.localization("Downward Movement"),
            "anywhere": this.localization("Movement Anywhere"),
        }, "downward", inputOptions, true);

        addToMenu(this.localization("Direct Keyboard Input"), "keyboardInput", {
            "disabled": this.localization("Disabled"),
            "enabled": this.localization("Enabled"),
        }, ((this.ejs.defaultCoreOpts && this.ejs.defaultCoreOpts.useKeyboard === true) ? "enabled" : "disabled"), inputOptions, true);

        addToMenu(this.localization("Forward Alt key"), "altKeyboardInput", {
            "disabled": this.localization("Disabled"),
            "enabled": this.localization("Enabled"),
        }, "disabled", inputOptions, true);

        addToMenu(this.localization("Lock Mouse"), "lockMouse", {
            "disabled": this.localization("Disabled"),
            "enabled": this.localization("Enabled"),
        }, (this.ejs.enableMouseLock === true ? "enabled" : "disabled"), inputOptions, true);

        addToMenu(this.localization("Autofire Interval"), "autofireInterval", {
            "20": "20ms",
            "50": "50ms",
            "100": "100ms",
            "200": "200ms",
            "500": "500ms",
        }, "100", inputOptions, true);

        checkForEmptyMenu(inputOptions);

        let controllerPortInfo;
        try {
            controllerPortInfo = this.ejs.gameManager.getControllerPortInfo();
        } catch(e) {
            if (this.ejs.debug) console.warn("getControllerPortInfo not available:", e);
        }
        if (controllerPortInfo) {
            // Parse the port info: each line is "port:deviceId:description"
            const ports = {};
            controllerPortInfo.split("\n").forEach(line => {
                if (!line.trim()) return;
                const parts = line.split(":");
                if (parts.length < 3) return;
                const port = parseInt(parts[0]);
                const deviceId = parts[1];
                const desc = parts.slice(2).join(":");
                if (!ports[port]) ports[port] = {};
                ports[port][deviceId] = this.localization(desc);
            });
            const portKeys = Object.keys(ports);
            if (portKeys.length > 0) {
                const controllerDeviceOpts = createSettingParent(true, "Controller Port Devices", home);
                for (const port of portKeys) {
                    const portNum = parseInt(port) + 1;
                    if (Object.keys(ports[port]).length <= 1) continue;
                    addToMenu(this.localization("Port") + " " + portNum,
                        "controller-port-device-p" + portNum,
                        ports[port], "1", controllerDeviceOpts, true);
                }
                checkForEmptyMenu(controllerDeviceOpts);
            }
        }

        if (this.ejs.saveInBrowserSupported()) {
            const saveStateOpts = createSettingParent(true, "Save States", home);
            addToMenu(this.localization("Save State Slot"), "save-state-slot", ["1", "2", "3", "4", "5", "6", "7", "8", "9"], "1", saveStateOpts, true);
            addToMenu(this.localization("Save State Location"), "save-state-location", {
                "download": this.localization("Download"),
                "browser": this.localization("Keep in Browser")
            }, "download", saveStateOpts, true);
            if (!this.ejs.config.fixedSaveInterval) {
                addToMenu(this.localization("System Save interval"), "save-save-interval", {
                    "0": "Disabled",
                    "30": "30 seconds",
                    "60": "1 minute",
                    "300": "5 minutes",
                    "600": "10 minutes",
                    "900": "15 minutes",
                    "1800": "30 minutes"
                }, "300", saveStateOpts, true);
            }
            checkForEmptyMenu(saveStateOpts);
        }

        if (this.ejs.touch || this.ejs.hasTouchScreen) {
            const virtualGamepad = createSettingParent(true, "Virtual Gamepad", home);
            addToMenu(this.localization("Virtual Gamepad"), "virtual-gamepad", {
                "enabled": this.localization("Enabled"),
                "disabled": this.localization("Disabled")
            }, this.ejs.isMobile ? "enabled" : "disabled", virtualGamepad, true);
            addToMenu(this.localization("Menu Bar Button"), "menu-bar-button", {
                "visible": this.localization("visible"),
                "hidden": this.localization("hidden")
            }, "visible", virtualGamepad, true);
            addToMenu(this.localization("Left Handed Mode"), "virtual-gamepad-left-handed-mode", {
                "enabled": this.localization("Enabled"),
                "disabled": this.localization("Disabled")
            }, "disabled", virtualGamepad, true);
            checkForEmptyMenu(virtualGamepad);
        }

        let coreOptsJSON;
        try {
            coreOptsJSON = this.ejs.gameManager.getCoreOptionsJSON();
        } catch(e) {}
        let coreOpts;
        if (!coreOptsJSON) {
            try {
                coreOpts = this.ejs.gameManager.getCoreOptions();
            } catch(e) {}
        }
        if (coreOptsJSON) {
            const coreOptions = createSettingParent(true, "Core Options", home);
            coreOptsJSON.options.forEach(option => {
                if (option.visible === false || option.values.length <= 1) return;
                const availableOptions = {};
                option.values.forEach(value => {
                    availableOptions[value.value] = this.localization(value.label, this.ejs.config.settingsLanguage);
                });
                addToMenu(this.localization(option.desc || option.key, this.ejs.config.settingsLanguage),
                    option.key, availableOptions,
                    option.current || option.default,
                    coreOptions,
                    true,
                    option.info ? this.localization(option.info, this.ejs.config.settingsLanguage) : null);
            })
            checkForEmptyMenu(coreOptions);
        } else if (coreOpts) {
            const coreOptions = createSettingParent(true, "Core Options", home);
            coreOpts.split("\n").forEach((line, index) => {
                let option = line.split("; ");
                let name = option[0];
                let options = option[1].split("|"),
                    optionName = name.split("|")[0].replace(/_/g, " ").replace(/.+\-(.+)/, "$1");
                options.slice(1, -1);
                if (options.length === 1) return;
                let availableOptions = {};
                for (let i = 0; i < options.length; i++) {
                    availableOptions[options[i]] = this.localization(options[i], this.ejs.config.settingsLanguage);
                }
                addToMenu(this.localization(optionName, this.ejs.config.settingsLanguage),
                    name.split("|")[0], availableOptions,
                    (name.split("|").length > 1) ? name.split("|")[1] : options[0].replace("(Default) ", ""),
                    coreOptions,
                    true);
            })
            checkForEmptyMenu(coreOptions);
        }

        /*
        this.ejs.retroarchOpts = [
            {
                title: "Audio Latency", // String
                name: "audio_latency", // String - value to be set in retroarch.cfg
                // options should ALWAYS be strings here...
                options: ["8", "16", "32", "64", "128"], // values
                options: {"8": "eight", "16": "sixteen", "32": "thirty-two", "64": "sixty-four", "128": "one hundred-twenty-eight"}, // This also works
                default: "128", // Default
                isString: false // Surround value with quotes in retroarch.cfg file?
            }
        ];*/

        if (this.ejs.retroarchOpts && Array.isArray(this.ejs.retroarchOpts)) {
            const retroarchOptsMenu = createSettingParent(true, "RetroArch Options" + " (" + this.localization("Requires restart") + ")", home);
            this.ejs.retroarchOpts.forEach(option => {
                addToMenu(this.localization(option.title, this.ejs.config.settingsLanguage),
                    option.name,
                    option.options,
                    option.default,
                    retroarchOptsMenu,
                    true);
            })
            checkForEmptyMenu(retroarchOptsMenu);
        }

        checkForEmptyMenu(graphicsOptions);
        checkForEmptyMenu(speedOptions);

        this.settingsMenu.appendChild(nested);

        this.settingParent.appendChild(this.settingsMenu);
        this.settingParent.style.position = "relative";

        this.settingsMenu.style.display = "";
        const homeSize = this.getElementSize(home);
        nested.style.width = (homeSize.width + 20) + "px";
        nested.style.height = homeSize.height + "px";

        this.settingsMenu.style.display = "none";

        if (this.ejs.debug) {
            console.log("Available core options", allOpts);
        }

        if (this.ejs.config.defaultOptions) {
            for (const k in this.ejs.config.defaultOptions) {
                this.changeSettingOption(k, this.ejs.config.defaultOptions[k], true);
            }
        }

        if (parentMenuCt === 0) {
            this.ejs.on("start", () => {
                this.elements.bottomBar.settings[0][0].style.display = "none";
            });
        }
    }
    createSubPopup(hidden) {
        const popup = this.ejs.createElement("div");
        popup.classList.add("ejs_popup_container");
        popup.classList.add("ejs_popup_container_box");
        const popupMsg = this.ejs.createElement("div");
        popupMsg.innerText = "";
        if (hidden) popup.setAttribute("hidden", "");
        popup.appendChild(popupMsg);
        return [popup, popupMsg];
    }
    createCheatsMenu() {
        const body = this.createPopup(
            "Cheats",
            {
                "Add Cheat": () => {
                    const popups = this.createSubPopup();
                    this.cheatMenu.appendChild(popups[0]);
                    popups[1].classList.add("ejs_cheat_parent");
                    popups[1].style.width = "100%";
                    const popup = popups[1];
                    const header = this.ejs.createElement("div");
                    header.classList.add("ejs_cheat_header");
                    const title = this.ejs.createElement("h2");
                    title.innerText = this.localization("Add Cheat Code");
                    title.classList.add("ejs_cheat_heading");
                    const close = this.ejs.createElement("button");
                    close.classList.add("ejs_cheat_close");
                    header.appendChild(title);
                    header.appendChild(close);
                    popup.appendChild(header);
                    this.ejs.addEventListener(close, "click", (e) => {
                        popups[0].remove();
                    });

                    let cheatDB = {};
                    const systemKey = this.ejs.getCore(true);
                    const cleanRomTags = (name) => {
                        return name
                            .replace(/\([^)]+\)/g, "")
                            .replace(/\[[^\]]+\]/g, "")
                            .trim();
                    };

                    const normalizeAndConvertNumerals = (name) => {
                        let normalized = name.toLowerCase();
                        normalized = normalized.replace(/ iv/g, " 4");
                        normalized = normalized.replace(/ iii/g, " 3");
                        normalized = normalized.replace(/ ii/g, " 2");
                        normalized = normalized.replace(/ v/g, " 5");
                        normalized = normalized.replace(/ i/g, " 1");

                        return normalized.replace(/[^a-z0-9]/g, "");
                    };

                    const createSelect = (labelText) => {
                        const div = this.ejs.createElement("div");
                        const label = this.ejs.createElement("strong");
                        label.innerText = this.localization(labelText);
                        div.appendChild(label);
                        div.appendChild(this.ejs.createElement("br"));
                        const select = this.ejs.createElement("select");
                        select.style.width = "100%";
                        select.classList.add("ejs_cheat_code");
                        div.appendChild(select);
                        return {
                            container: div,
                            select: select,
                        };
                    };

                    const importDiv = this.ejs.createElement("div");
                    importDiv.classList.add("ejs_cheat_main");
                    importDiv.style.borderBottom = "1px solid #555";
                    importDiv.style.paddingBottom = "10px";
                    importDiv.style.display = "none";

                    const importTitle = this.ejs.createElement("h3");
                    importTitle.innerText =
                        this.localization("Import from Database") +
                        (systemKey ? ` (${systemKey.toUpperCase()})` : "");
                    importTitle.style.marginTop = "0px";
                    importDiv.appendChild(importTitle);

                    const gameSelectUI = createSelect("Game");
                    const cheatSelectUI = createSelect("Cheat");

                    importDiv.appendChild(gameSelectUI.container);
                    importDiv.appendChild(cheatSelectUI.container);

                    popup.appendChild(importDiv);

                    const main = this.ejs.createElement("div");
                    main.classList.add("ejs_cheat_main");
                    const header3 = this.ejs.createElement("strong");
                    header3.innerText = this.localization(
                        "Manual Entry - Code",
                    );
                    main.appendChild(header3);
                    main.appendChild(this.ejs.createElement("br"));

                    const manualCodeTextarea = this.ejs.createElement("textarea");
                    manualCodeTextarea.classList.add("ejs_cheat_code");
                    manualCodeTextarea.style.width = "100%";
                    manualCodeTextarea.style.height = "80px";
                    main.appendChild(manualCodeTextarea);
                    main.appendChild(this.ejs.createElement("br"));

                    const header2 = this.ejs.createElement("strong");
                    header2.innerText = this.localization(
                        "Manual Entry - Description",
                    );
                    main.appendChild(header2);
                    main.appendChild(this.ejs.createElement("br"));

                    const manualDescriptionInput = this.ejs.createElement("input");
                    manualDescriptionInput.type = "text";
                    manualDescriptionInput.classList.add("ejs_cheat_code");
                    manualDescriptionInput.style.width = "100%";
                    main.appendChild(manualDescriptionInput);
                    main.appendChild(this.ejs.createElement("br"));
                    popup.appendChild(main);

                    const loadCheatList = (gameName) => {
                        cheatSelectUI.select.innerHTML = "";

                        const defaultOpt = this.ejs.createElement("option");
                        defaultOpt.value = "";
                        defaultOpt.innerText =
                            "--- " +
                            this.localization("Select a Cheat") +
                            " ---";
                        cheatSelectUI.select.appendChild(defaultOpt);

                        manualCodeTextarea.value = "";
                        manualDescriptionInput.value = "";

                        if (!gameName || !cheatDB[gameName]) return;

                        const cheats = cheatDB[gameName];
                        cheats.forEach((cheat) => {
                            const opt = this.ejs.createElement("option");
                            opt.value = cheat.desc;
                            opt.innerText = cheat.desc;
                            cheatSelectUI.select.appendChild(opt);
                        });

                        if (cheats.length > 0) {
                            cheatSelectUI.select.value = cheats[0].desc;
                            manualCodeTextarea.value = cheats[0].code;
                            manualDescriptionInput.value = cheats[0].desc;
                        }
                    };

                    const loadCheatDatabase = async (system) => {
                        gameSelectUI.select.innerHTML = "";
                        cheatSelectUI.select.innerHTML = "";

                        const defaultGameOpt = this.ejs.createElement("option");
                        defaultGameOpt.value = "";
                        defaultGameOpt.innerText =
                            "--- " +
                            this.localization("Select a Game") +
                            " ---";
                        gameSelectUI.select.appendChild(defaultGameOpt);

                        if (!this.ejs.config.cheatPath) {
                            if (this.ejs.debug)
                                console.error(
                                    "Cheat file load error: EJS_cheatPath is not configured.",
                                );
                            importDiv.style.display = "none";
                            return;
                        }

                        const globalUrl = this.ejs.config.cheatPath + "cheats.json";
                        const systemUrl =
                            this.ejs.config.cheatPath + system + ".json";

                        const fetchCheatJson = async (url) => {
                            const res = await this.ejs.downloadFile(url, "cheats", null, true, { responseType: "text", method: "GET" });
                            if (res === -1) return null;
                            return res.data;
                        };

                        try {
                            let data = await fetchCheatJson(globalUrl);
                            if (data === null) {
                                if (this.ejs.debug)
                                    console.log(
                                        `[Cheats] cheats.json not found. Trying ${system}.json fallback...`,
                                    );
                                data = await fetchCheatJson(systemUrl);
                                if (data === null) {
                                    throw new Error(
                                        `Cheat JSON not found at ${globalUrl} or ${systemUrl}`,
                                    );
                                }
                            }
                            // downloadFile tries JSON.parse internally and swallows failures,
                            // so data may be the already-parsed object or still a string.
                            if (typeof data === "string") data = JSON.parse(data);
                            if (
                                data &&
                                data.data &&
                                typeof data.data === "object" &&
                                !Array.isArray(data.data)
                            ) {
                                data = data.data;
                            }
                            if (data && data.systems && data.systems[system]) {
                                cheatDB = data.systems[system];
                            } else if (data && data[system]) {
                                cheatDB = data[system];
                            } else {
                                cheatDB = data;
                            }

                            importDiv.style.display = "";

                            const gameNames = Object.keys(cheatDB).sort();
                            gameNames.forEach((name) => {
                                const opt = this.ejs.createElement("option");
                                opt.value = name;
                                opt.innerText = name;
                                gameSelectUI.select.appendChild(opt);
                            });

                            let currentFileBaseName =
                                this.ejs.getBaseFileName(true);
                            currentFileBaseName = currentFileBaseName.replace(
                                /\.[^/.]+$/,
                                "",
                            );
                            const cleanedFileName =
                                cleanRomTags(currentFileBaseName);
                            const normalizedFile =
                                normalizeAndConvertNumerals(cleanedFileName);

                            let matchedGameName = null;
                            if (
                                this.ejs.config.gameName &&
                                gameNames.includes(this.ejs.config.gameName)
                            ) {
                                matchedGameName = this.ejs.config.gameName;
                            }

                            if (!matchedGameName) {
                                for (const name of gameNames) {
                                    if (
                                        normalizeAndConvertNumerals(name) ===
                                        normalizedFile
                                    ) {
                                        matchedGameName = name;
                                        break;
                                    }
                                }
                            }

                            if (matchedGameName) {
                                gameSelectUI.select.value = matchedGameName;
                            }

                            loadCheatList(gameSelectUI.select.value);
                        } catch (e) {
                            if (this.ejs.debug)
                                console.error(
                                    "Cheat file load error:",
                                    e.message,
                                );
                            importDiv.style.display = "none";
                            cheatDB = {};
                            loadCheatList(null);
                        }
                    };

                    gameSelectUI.select.addEventListener("change", () => {
                        loadCheatList(gameSelectUI.select.value);
                    });

                    cheatSelectUI.select.addEventListener("change", () => {
                        const game = gameSelectUI.select.value;
                        const cheatDesc = cheatSelectUI.select.value;

                        if (!game || !cheatDesc) {
                            manualCodeTextarea.value = "";
                            manualDescriptionInput.value = "";
                            return;
                        }

                        const cheat = cheatDB[game].find(
                            (c) => c.desc === cheatDesc,
                        );
                        if (cheat) {
                            manualCodeTextarea.value = cheat.code;
                            manualDescriptionInput.value = cheat.desc;
                        }
                    });

                    if (systemKey) {
                        loadCheatDatabase(systemKey).catch((e) => {
                            if (this.ejs.debug)
                                console.error("Initial cheat load failed:", e);
                        });
                    } else {
                        importDiv.style.display = "none";
                    }

                    const footer = this.ejs.createElement("footer");
                    const submit = this.ejs.createElement("button");
                    const closeButton = this.ejs.createElement("button");
                    submit.innerText = this.localization("Submit");
                    closeButton.innerText = this.localization("Close");
                    submit.classList.add("ejs_button_button");
                    closeButton.classList.add("ejs_button_button");
                    submit.classList.add("ejs_popup_submit");
                    closeButton.classList.add("ejs_popup_submit");
                    submit.style["background-color"] =
                        "rgba(var(--ejs-primary-color),1)";
                    footer.appendChild(submit);
                    const span = this.ejs.createElement("span");
                    span.innerText = " ";
                    footer.appendChild(span);
                    footer.appendChild(closeButton);
                    popup.appendChild(footer);

                    this.ejs.addEventListener(submit, "click", (e) => {
                        if (
                            !manualCodeTextarea.value.trim() ||
                            !manualDescriptionInput.value.trim()
                        )
                            return;
                        popups[0].remove();
                        this.ejs.cheats.push({
                            code: manualCodeTextarea.value,
                            desc: manualDescriptionInput.value,
                            checked: false,
                        });
                        this.updateCheatUI();
                        this.ejs.saveSettings();
                    });
                    this.ejs.addEventListener(closeButton, "click", (e) => {
                        popups[0].remove();
                    });
                },
                Close: () => {
                    this.cheatMenu.style.display = "none";
                },
            },
            true,
        );
        this.cheatMenu = body.parentElement;
        this.cheatMenu.getElementsByTagName("h4")[0].style["padding-bottom"] =
            "0px";
        const msg = this.ejs.createElement("div");
        msg.style["padding-top"] = "0px";
        msg.style["padding-bottom"] = "15px";
        msg.innerText = this.localization(
            "Note that some cheats require a restart to disable",
        );
        body.appendChild(msg);
        const rows = this.ejs.createElement("div");
        body.appendChild(rows);
        rows.classList.add("ejs_cheat_rows");
        this.elements.cheatRows = rows;
    }
    updateCheatUI() {
        if (!this.ejs.gameManager) return;
        this.elements.cheatRows.innerHTML = "";

        const addToMenu = (desc, checked, code, is_permanent, i) => {
            const row = this.ejs.createElement("div");
            row.classList.add("ejs_cheat_row");
            const input = this.ejs.createElement("input");
            input.type = "checkbox";
            input.checked = checked;
            input.value = i;
            input.id = "ejs_cheat_switch_" + i;
            row.appendChild(input);
            const label = this.ejs.createElement("label");
            label.for = "ejs_cheat_switch_" + i;
            label.innerText = desc;
            row.appendChild(label);
            label.addEventListener("click", (e) => {
                input.checked = !input.checked;
                this.ejs.cheats[i].checked = input.checked;
                this.ejs.cheatChanged(input.checked, code, i);
                this.ejs.saveSettings();
            });
            if (!is_permanent) {
                const close = this.ejs.createElement("a");
                close.classList.add("ejs_cheat_row_button");
                close.innerText = "×";
                row.appendChild(close);
                close.addEventListener("click", (e) => {
                    this.ejs.cheatChanged(false, code, i);
                    this.ejs.cheats.splice(i, 1);
                    this.updateCheatUI();
                    this.ejs.saveSettings();
                });
            }
            this.elements.cheatRows.appendChild(row);
            this.ejs.cheatChanged(checked, code, i);
        };
        this.ejs.gameManager.resetCheat();
        for (let i = 0; i < this.ejs.cheats.length; i++) {
            addToMenu(
                this.ejs.cheats[i].desc,
                this.ejs.cheats[i].checked,
                this.ejs.cheats[i].code,
                this.ejs.cheats[i].is_permanent,
                i,
            );
        }
    }}

export { EJS_Frontend };

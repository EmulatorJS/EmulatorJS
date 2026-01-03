/**
 * HistoryManager - Command pattern for undo/redo operations
 */
class HistoryManager {
    constructor(onUpdate) {
        this.undoStack = [];
        this.redoStack = [];
        this.onUpdate = onUpdate;
    }

    push(action) {
        // action = { undo: Function, redo: Function }
        this.undoStack.push(action);
        this.redoStack = [];
        this.onUpdate();
    }

    undo() {
        const action = this.undoStack.pop();
        if (action) {
            action.undo();
            this.redoStack.push(action);
            this.onUpdate();
        }
    }

    redo() {
        const action = this.redoStack.pop();
        if (action) {
            action.redo();
            this.undoStack.push(action);
            this.onUpdate();
        }
    }

    clear() {
        this.undoStack = [];
        this.redoStack = [];
        this.onUpdate();
    }

    canUndo() { return this.undoStack.length > 0; }
    canRedo() { return this.redoStack.length > 0; }
}

/**
 * OverlayElement - Encapsulates overlay creation and state for a single editable element
 */
class OverlayElement {
    constructor(editor, original, id, type, rect, parentRect, defaults) {
        this.editor = editor;
        this.original = original;
        this.id = id;
        this.type = type;
        this.defaults = defaults || {};
        this.cleanupFns = [];
        this.overlay = this.createOverlay(rect, parentRect);
        this.startState = this.captureState();
    }

    createOverlay(rect, parentRect) {
        const emu = this.editor.emu;
        const overlay = emu.createElement("div");
        overlay.classList.add("ejs_edit_overlay_element");
        overlay.dataset.id = this.id;
        overlay.dataset.type = this.type;

        // Position exactly where the original is
        const left = rect.left - parentRect.left;
        const top = rect.top - parentRect.top;

        // Dynamic position/size (must be inline)
        overlay.style.left = left + "px";
        overlay.style.top = top + "px";
        overlay.style.width = rect.width + "px";
        overlay.style.height = rect.height + "px";

        // Copy visual styles from original (for buttons/dpads, not zones)
        if (this.type !== "zone") {
            const computedStyle = window.getComputedStyle(this.original);
            overlay.style.borderRadius = computedStyle.borderRadius;
            overlay.style.background = computedStyle.background;
            overlay.style.border = computedStyle.border;
            overlay.style.boxShadow = computedStyle.boxShadow;
            overlay.style.color = computedStyle.color;
            overlay.style.fontSize = computedStyle.fontSize;
            overlay.style.fontFamily = computedStyle.fontFamily;
            overlay.style.fontWeight = computedStyle.fontWeight;
        }

        // Add label
        const labelText = this.type === "button" ? (this.original.innerText || "") :
                         this.type === "dpad" ? "D-PAD" : "STICK";
        if (labelText) {
            const label = emu.createElement("span");
            label.innerText = labelText;
            overlay.appendChild(label);
        }

        // Store starting state
        overlay._startLeft = left;
        overlay._startTop = top;
        overlay._startWidth = rect.width;
        overlay._startHeight = rect.height;

        // Store default positions
        overlay._defaultLeft = this.defaults.absoluteLeft ?? left;
        overlay._defaultTop = this.defaults.absoluteTop ?? top;
        overlay._defaultWidth = this.defaults.absoluteWidth ?? rect.width;
        overlay._defaultHeight = this.defaults.absoluteHeight ?? rect.height;

        this.setupDragHandlers(overlay);
        this.setupResizeHandle(overlay);

        return overlay;
    }

    setupDragHandlers(overlay) {
        let startLeft, startTop, dragOldState;

        const cleanup = this.editor.setupPointerInteraction(overlay, {
            onStart: ({ event }) => {
                if (event.target.classList.contains("ejs_virtualGamepad_resize_handle")) return false;
                startLeft = parseFloat(overlay.style.left) || 0;
                startTop = parseFloat(overlay.style.top) || 0;
                // Capture FULL state for proper undo
                dragOldState = this.captureState();
                overlay.classList.add("ejs_dragging");
            },
            onMove: ({ deltaX, deltaY }) => {
                overlay.style.left = (startLeft + deltaX) + "px";
                overlay.style.top = (startTop + deltaY) + "px";
            },
            onEnd: () => {
                overlay.classList.remove("ejs_dragging");
                const newState = this.captureState();
                // Copy to local const to avoid closure capturing mutable variable
                const oldState = { ...dragOldState };

                // Check if position actually changed
                if (Math.abs(oldState.left - newState.left) > 0.5 ||
                    Math.abs(oldState.top - newState.top) > 0.5) {
                    this.editor.history.push({
                        undo: () => this.setState(oldState),
                        redo: () => this.setState(newState)
                    });
                }
            }
        });
        if (cleanup) this.cleanupFns.push(cleanup);
    }

    setupResizeHandle(overlay) {
        const emu = this.editor.emu;
        const handle = emu.createElement("div");
        handle.classList.add("ejs_virtualGamepad_resize_handle", "ejs_resize_se");
        overlay.appendChild(handle);

        let startWidth, startHeight, resizeOldState;

        const cleanup = this.editor.setupPointerInteraction(handle, {
            documentEvents: true,
            stopPropagation: true,
            onStart: () => {
                startWidth = parseFloat(overlay.style.width) || 50;
                startHeight = parseFloat(overlay.style.height) || 50;
                // Capture FULL state for proper undo
                resizeOldState = this.captureState();
            },
            onMove: ({ deltaX, deltaY }) => {
                const delta = (deltaX + deltaY) / 2;
                overlay.style.width = Math.max(20, startWidth + delta) + "px";
                overlay.style.height = Math.max(20, startHeight + delta) + "px";
            },
            onEnd: () => {
                const newState = this.captureState();
                // Copy to local const to avoid closure capturing mutable variable
                const oldState = { ...resizeOldState };

                // Check if size actually changed
                if (Math.abs(oldState.width - newState.width) > 0.5 ||
                    Math.abs(oldState.height - newState.height) > 0.5) {
                    this.editor.history.push({
                        undo: () => this.setState(oldState),
                        redo: () => this.setState(newState)
                    });
                }
            }
        });
        if (cleanup) this.cleanupFns.push(cleanup);
    }

    captureState() {
        return {
            left: parseFloat(this.overlay.style.left) || 0,
            top: parseFloat(this.overlay.style.top) || 0,
            width: parseFloat(this.overlay.style.width) || 50,
            height: parseFloat(this.overlay.style.height) || 50
        };
    }

    setState(state) {
        if (state.left !== undefined) this.overlay.style.left = state.left + "px";
        if (state.top !== undefined) this.overlay.style.top = state.top + "px";
        if (state.width !== undefined) this.overlay.style.width = state.width + "px";
        if (state.height !== undefined) this.overlay.style.height = state.height + "px";
    }

    setSize(width, height) {
        this.overlay.style.width = width + "px";
        this.overlay.style.height = height + "px";
    }

    resetToStart() {
        this.setState({
            left: this.overlay._startLeft,
            top: this.overlay._startTop,
            width: this.overlay._startWidth,
            height: this.overlay._startHeight
        });
    }

    resetToDefault() {
        const oldState = this.captureState();
        const newState = {
            left: this.overlay._defaultLeft,
            top: this.overlay._defaultTop,
            width: this.overlay._defaultWidth,
            height: this.overlay._defaultHeight
        };

        // Check if actually changed
        if (Math.abs(oldState.left - newState.left) < 0.5 &&
            Math.abs(oldState.top - newState.top) < 0.5 &&
            Math.abs(oldState.width - newState.width) < 0.5 &&
            Math.abs(oldState.height - newState.height) < 0.5) {
            return false;
        }

        this.setState(newState);
        return { oldState, newState };
    }

    cleanup() {
        this.cleanupFns.forEach(fn => fn());
        this.cleanupFns = [];
    }
}

/**
 * VirtualGamepadEditor - Orchestrates edit mode for virtual gamepad
 */
class VirtualGamepadEditor {
    constructor(emulator) {
        this.emu = emulator;
        this.elements = [];
        this.history = new HistoryManager(() => this.updateToolbarState());
        this.container = null;
        this.overlayContainer = null;
        this.toolbar = null;
        this.toolbarButtons = {};
        this.buttonCleanups = [];
        this.wasPaused = false;
        this.active = false;
    }

    /** Check if edit mode is currently active */
    get isActive() {
        return this.active;
    }

    /** Setup pointer (touch + mouse) interaction with unified event handling */
    setupPointerInteraction(element, { onStart, onMove, onEnd, documentEvents = false, stopPropagation = false }) {
        let isActive = false;
        let startX = 0, startY = 0;

        const handleStart = (e) => {
            if (isActive) return; // Prevent duplicate starts from touch+mouse
            if (stopPropagation) e.stopPropagation();
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            const result = onStart({ x: touch.clientX, y: touch.clientY, event: e });
            if (result === false) return;
            isActive = true;
            startX = touch.clientX;
            startY = touch.clientY;
        };

        const handleMove = (e) => {
            if (!isActive) return;
            e.preventDefault();
            const touch = e.touches ? e.touches[0] : e;
            onMove({ x: touch.clientX, y: touch.clientY, deltaX: touch.clientX - startX, deltaY: touch.clientY - startY, event: e });
        };

        const handleEnd = (e) => {
            if (!isActive) return;
            isActive = false;
            onEnd({ event: e });
        };

        element.addEventListener("touchstart", handleStart, { passive: false });
        element.addEventListener("mousedown", handleStart);

        const moveEndTarget = documentEvents ? document : element;
        moveEndTarget.addEventListener("touchmove", handleMove, { passive: false });
        moveEndTarget.addEventListener("mousemove", handleMove);
        moveEndTarget.addEventListener("touchend", handleEnd);
        moveEndTarget.addEventListener("touchcancel", handleEnd);
        moveEndTarget.addEventListener("mouseup", handleEnd);

        return () => {
            element.removeEventListener("touchstart", handleStart);
            element.removeEventListener("mousedown", handleStart);
            moveEndTarget.removeEventListener("touchmove", handleMove);
            moveEndTarget.removeEventListener("mousemove", handleMove);
            moveEndTarget.removeEventListener("touchend", handleEnd);
            moveEndTarget.removeEventListener("touchcancel", handleEnd);
            moveEndTarget.removeEventListener("mouseup", handleEnd);
        };
    }

    enter() {
        if (this.active) return;
        this.active = true;
        this.emu.virtualGamepadEditMode = true;

        // Store pause state and pause emulator
        this.wasPaused = this.emu.paused;
        if (!this.emu.paused) {
            if (this.emu.gameManager) {
                this.emu.gameManager.toggleMainLoop(false);
            }
            this.emu.paused = true;
        }

        // Ensure virtual gamepad is visible
        this.emu.virtualGamepad.style.display = "";
        this.emu.virtualGamepad.classList.add("ejs_virtualGamepad_edit_mode");

        // Hide bottom menu bar
        if (this.emu.elements.menu) {
            this.emu.elements.menu.style.display = "none";
        }

        // Create edit container
        this.container = this.emu.createElement("div");
        this.container.classList.add("ejs_virtualGamepad_edit_container");
        this.emu.elements.parent.appendChild(this.container);

        // Create toolbar
        this.toolbar = this.createToolbar();
        this.container.appendChild(this.toolbar);

        // Create overlay container
        this.overlayContainer = this.emu.createElement("div");
        this.overlayContainer.classList.add("ejs_virtualGamepad_overlay_container");
        this.container.appendChild(this.overlayContainer);

        // Measure default positions (lazy - only when editor opens)
        this.emu.measureVirtualGamepadDefaults();

        // Setup overlay elements
        this.setupOverlayElements();

        // Dim original virtual gamepad
        this.emu.virtualGamepad.classList.add("ejs_virtualGamepad_edit_mode_faded");
    }

    createToolbar() {
        const toolbar = this.emu.createElement("div");
        toolbar.classList.add("ejs_virtualGamepad_edit_toolbar");

        // Icons for toolbar buttons
        const UNDO_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z"/></svg>';
        const REDO_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M18.4 10.6C16.55 8.99 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16c1.05-3.19 4.05-5.5 7.6-5.5 1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6z"/></svg>';
        // Prohibited/cancel icon for clear
        const CLEAR_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM4 12c0-4.42 3.58-8 8-8 1.85 0 3.55.63 4.9 1.69L5.69 16.9C4.63 15.55 4 13.85 4 12zm8 8c-1.85 0-3.55-.63-4.9-1.69L18.31 7.1C19.37 8.45 20 10.15 20 12c0 4.42-3.58 8-8 8z"/></svg>';
        // Repeat/cycle arrows icon for default
        const DEFAULT_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z"/></svg>';
        // Floppy disk icon for save
        const SAVE_ICON = '<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor"><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>';

        const buttonConfigs = [
            { icon: UNDO_ICON, cls: "undo", title: "UNDO_VIRTUAL_GAMEPAD", action: () => this.history.undo(), getDisabled: () => !this.history.canUndo() },
            { icon: REDO_ICON, cls: "redo", title: "REDO_VIRTUAL_GAMEPAD", action: () => this.history.redo(), getDisabled: () => !this.history.canRedo() },
            { icon: CLEAR_ICON, cls: "clear", title: "CLEAR_VIRTUAL_GAMEPAD", action: () => this.clear(), getDisabled: () => !this.hasChangesFromStart() },
            { icon: DEFAULT_ICON, cls: "default", title: "RESET_TO_DEFAULT_VIRTUAL_GAMEPAD", action: () => this.reset() },
            { icon: SAVE_ICON, cls: "close", title: "SAVE_AND_CLOSE_VIRTUAL_GAMEPAD", action: () => this.exit(true) }
        ];

        buttonConfigs.forEach(cfg => {
            const btn = this.createButton(cfg);
            this.toolbarButtons[cfg.cls] = { element: btn, getDisabled: cfg.getDisabled };
            toolbar.appendChild(btn);
        });

        return toolbar;
    }

    createButton(cfg) {
        const btn = this.emu.createElement("button");
        if (cfg.icon) {
            btn.innerHTML = cfg.icon;
            btn.classList.add("ejs_edit_icon_btn");
        } else {
            btn.innerText = this.emu.localization(cfg.text);
        }
        btn.classList.add(`ejs_edit_btn_${cfg.cls}`);
        if (cfg.title) btn.title = this.emu.localization(cfg.title);
        if (cfg.getDisabled) btn.disabled = cfg.getDisabled();

        const clickHandler = (e) => {
            e.preventDefault();
            e.stopPropagation();
            cfg.action();
        };
        btn.addEventListener("click", clickHandler);
        this.buttonCleanups.push(() => btn.removeEventListener("click", clickHandler));

        return btn;
    }

    /** Check if any element has changed from its start position */
    hasChangesFromStart() {
        return this.elements.some(el => {
            const current = el.captureState();
            return Math.abs(current.left - el.overlay._startLeft) > 0.5 ||
                   Math.abs(current.top - el.overlay._startTop) > 0.5 ||
                   Math.abs(current.width - el.overlay._startWidth) > 0.5 ||
                   Math.abs(current.height - el.overlay._startHeight) > 0.5;
        });
    }

    updateToolbarState() {
        for (const key in this.toolbarButtons) {
            const { element, getDisabled } = this.toolbarButtons[key];
            if (getDisabled) element.disabled = getDisabled();
        }
    }

    setupOverlayElements() {
        const parentRect = this.emu.elements.parent.getBoundingClientRect();
        const virtualGamepad = this.emu.virtualGamepad;
        const findId = (classList, fallback) => this.emu.findElementId(classList, fallback);

        // Process buttons
        const buttons = virtualGamepad.querySelectorAll(".ejs_virtualGamepad_button");
        buttons.forEach((btn, index) => {
            const id = findId(btn.classList, `b_button_${index}`);
            const rect = btn.getBoundingClientRect();
            const defaults = this.emu.virtualGamepadDefaults[id];

            const overlayEl = new OverlayElement(this, btn, id, "button", rect, parentRect, defaults);
            this.overlayContainer.appendChild(overlayEl.overlay);
            this.elements.push(overlayEl);
        });

        // Process dpads
        const dpads = virtualGamepad.querySelectorAll(".ejs_dpad_main");
        dpads.forEach((dpadMain, index) => {
            const dpadContainer = dpadMain.parentElement;
            if (!dpadContainer) return;

            const id = findId(dpadContainer.classList, `b_dpad_${index}`);
            const rect = dpadMain.getBoundingClientRect();
            const defaults = this.emu.virtualGamepadDefaults[id];

            const overlayEl = new OverlayElement(this, dpadContainer, id, "dpad", rect, parentRect, defaults);
            this.overlayContainer.appendChild(overlayEl.overlay);
            this.elements.push(overlayEl);
        });

        // Process zones (nipplejs joysticks)
        const nipples = virtualGamepad.querySelectorAll(".nipple");
        const zones = [];
        nipples.forEach(nipple => {
            const zone = nipple.parentElement;
            if (zone && !zones.includes(zone)) zones.push(zone);
        });

        zones.forEach((zone, index) => {
            const id = findId(zone.classList, `b_zone_${index}`);

            // Get dimensions from the nipple element
            const nipple = zone.querySelector(".nipple");
            const back = nipple ? nipple.querySelector(".back") : null;
            let rect;
            if (back && back.getBoundingClientRect().width > 0) {
                rect = back.getBoundingClientRect();
            } else if (nipple && nipple.getBoundingClientRect().width > 0) {
                rect = nipple.getBoundingClientRect();
            } else {
                const zoneRect = zone.getBoundingClientRect();
                rect = {
                    left: zoneRect.left + zoneRect.width / 2 - 50,
                    top: zoneRect.top + zoneRect.height / 2 - 50,
                    width: 100,
                    height: 100
                };
            }

            zone.style.position = "absolute";
            const defaults = this.emu.virtualGamepadDefaults[id];

            const overlayEl = new OverlayElement(this, zone, id, "zone", rect, parentRect, defaults);
            overlayEl.nippleElement = nipple;
            this.overlayContainer.appendChild(overlayEl.overlay);
            this.elements.push(overlayEl);
        });
    }

    clear() {
        // Capture current states of all elements
        const oldStates = this.elements.map(el => ({ element: el, state: el.captureState() }));
        
        // Check if any element has changed from start
        const hasChanges = this.elements.some(el => {
            const current = el.captureState();
            return Math.abs(current.left - el.overlay._startLeft) > 0.5 ||
                   Math.abs(current.top - el.overlay._startTop) > 0.5 ||
                   Math.abs(current.width - el.overlay._startWidth) > 0.5 ||
                   Math.abs(current.height - el.overlay._startHeight) > 0.5;
        });
        
        if (!hasChanges) return;
        
        // Reset all elements to start
        this.elements.forEach(el => el.resetToStart());
        
        // Capture new states (start states)
        const newStates = this.elements.map(el => ({ element: el, state: el.captureState() }));
        
        // Push single action to history
        this.history.push({
            undo: () => oldStates.forEach(({ element, state }) => element.setState(state)),
            redo: () => newStates.forEach(({ element, state }) => element.setState(state))
        });
    }

    reset() {
        // Capture current states of all elements
        const oldStates = this.elements.map(el => ({ element: el, state: el.captureState() }));
        
        // Check which elements will actually change
        const changes = [];
        this.elements.forEach((el) => {
            const result = el.resetToDefault();
            if (result) {
                changes.push({ element: el, oldState: result.oldState, newState: result.newState });
            }
        });
        
        if (changes.length === 0) return;
        
        // Push single action to history for ALL changes
        this.history.push({
            undo: () => changes.forEach(({ element, oldState }) => element.setState(oldState)),
            redo: () => changes.forEach(({ element, newState }) => element.setState(newState))
        });
    }

    exit(save) {
        if (!this.active) return;

        // Apply changes if saving
        if (save) {
            this.applyChangesToOriginals();
            this.emu.saveVirtualGamepadLayout(this.elements);
        }

        // Cleanup
        this.elements.forEach(el => el.cleanup());
        this.elements = [];
        this.history.clear();

        // Cleanup button event listeners
        this.buttonCleanups.forEach(cleanup => cleanup());
        this.buttonCleanups = [];

        if (this.container) {
            this.container.remove();
            this.container = null;
        }

        // Restore virtual gamepad state
        this.emu.virtualGamepad.classList.remove("ejs_virtualGamepad_edit_mode_faded");
        this.emu.virtualGamepad.classList.remove("ejs_virtualGamepad_edit_mode");

        // Show menu bar
        if (this.emu.elements.menu) {
            this.emu.elements.menu.style.display = "";
        }

        // Resume if wasn't paused before
        if (!this.wasPaused) {
            if (this.emu.gameManager) {
                this.emu.gameManager.toggleMainLoop(true);
            }
            this.emu.paused = false;
        }

        this.emu.virtualGamepadEditMode = false;
        this.active = false;
    }

    applyChangesToOriginals() {
        const parentRect = this.emu.elements.parent.getBoundingClientRect();

        this.elements.forEach(overlayEl => {
            const state = overlayEl.captureState();
            const overlay = overlayEl.overlay;
            const element = overlayEl.original;
            const id = overlayEl.id;

            // Get default positions
            const defaultLeft = overlay._defaultLeft || 0;
            const defaultTop = overlay._defaultTop || 0;
            const defaultWidth = overlay._defaultWidth || state.width;
            const defaultHeight = overlay._defaultHeight || state.height;

            // Check if at default position
            const isAtDefault = Math.abs(state.left - defaultLeft) < 1 &&
                               Math.abs(state.top - defaultTop) < 1 &&
                               Math.abs(state.width - defaultWidth) < 1 &&
                               Math.abs(state.height - defaultHeight) < 1;

            const defaults = this.emu.virtualGamepadDefaults[id];

            if (isAtDefault && defaults) {
                // Restore original CSS positioning
                if (overlayEl.type === "zone" && defaults.nippleManager && defaults.zoneConfig) {
                    this.restoreZoneToDefault(element, defaults);
                } else {
                    element.style.left = defaults.left;
                    element.style.top = defaults.top;
                    element.style.right = defaults.right;
                    element.style.transform = defaults.transform || "";
                    element.style.width = defaults.width || "";
                    element.style.height = defaults.height || "";
                }
                return;
            }

            // Calculate scale factor
            const scaleX = defaultWidth > 0 ? state.width / defaultWidth : 1;
            const scaleY = defaultHeight > 0 ? state.height / defaultHeight : 1;
            const scale = Math.max(0.1, Math.min(10, (scaleX + scaleY) / 2));

            if (overlayEl.type === "zone" && defaults && defaults.nippleManager && defaults.zoneConfig) {
                this.applyZonePosition(element, state, scale, defaults, parentRect);
                return;
            }

            // Calculate offset for dpad
            let offsetX = 0, offsetY = 0;
            if (overlayEl.type === "dpad") {
                const dpadMain = element.querySelector(".ejs_dpad_main");
                if (dpadMain) {
                    const containerRect = element.getBoundingClientRect();
                    const innerRect = dpadMain.getBoundingClientRect();
                    offsetX = innerRect.left - containerRect.left;
                    offsetY = innerRect.top - containerRect.top;
                }
            }

            // Calculate position relative to element's parent container
            const elementParent = element.parentElement;
            const elementParentRect = elementParent ? elementParent.getBoundingClientRect() : parentRect;
            const mainParentRect = this.emu.elements.parent.getBoundingClientRect();
            const containerOffsetX = elementParentRect.left - mainParentRect.left;
            const containerOffsetY = elementParentRect.top - mainParentRect.top;

            element.style.right = "";
            element.style.left = (state.left - offsetX - containerOffsetX) + "px";
            element.style.top = (state.top - offsetY - containerOffsetY) + "px";

            // Apply scale transform
            if (Math.abs(scale - 1) > 0.01) {
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = "top left";
            } else {
                element.style.transform = "";
            }
        });
    }

    recreateZone(element, defaults, position, size) {
        this.emu.unbindZoneEventHandlers(defaults.nippleManager);
        defaults.nippleManager.destroy();
        const zone = defaults.zoneConfig;
        const newZoneObj = nipplejs.create({
            "zone": element,
            "mode": "static",
            "position": position,
            "size": size,
            "color": zone.color || "red"
        });
        this.emu.bindZoneEventHandlers(newZoneObj, zone);
        defaults.nippleManager = newZoneObj;
        defaults.currentSize = size;
        defaults.nippleElement = element.querySelector(".nipple");
        const newBack = defaults.nippleElement ? defaults.nippleElement.querySelector(".back") : null;
        defaults.element = newBack || defaults.nippleElement;
    }

    restoreZoneToDefault(element, defaults) {
        const originalSize = defaults.originalSize || 100;
        
        // Calculate position relative to zone element using stored absolute defaults
        const elementRect = element.getBoundingClientRect();
        const mainParentRect = this.emu.elements.parent.getBoundingClientRect();
        
        // The default position stored is the top-left of the .back element
        // The center is at absoluteLeft + absoluteWidth/2
        const defaultCenterX = defaults.absoluteLeft + defaults.absoluteWidth / 2;
        const defaultCenterY = defaults.absoluteTop + defaults.absoluteHeight / 2;
        
        // Zone element's offset from main parent
        const zoneOffsetX = elementRect.left - mainParentRect.left;
        const zoneOffsetY = elementRect.top - mainParentRect.top;
        
        // Position relative to zone element
        const newLeftPx = defaultCenterX - zoneOffsetX;
        const newTopPx = defaultCenterY - zoneOffsetY;
        
        this.recreateZone(element, defaults, {
            "left": newLeftPx + "px",
            "top": newTopPx + "px"
        }, originalSize);
    }

    applyZonePosition(element, state, scale, defaults, parentRect) {
        // nipplejs positions relative to the zone element, not its parent
        const elementRect = element.getBoundingClientRect();
        const mainParentRect = this.emu.elements.parent.getBoundingClientRect();

        // Calculate zone element's offset from main parent
        const zoneOffsetX = elementRect.left - mainParentRect.left;
        const zoneOffsetY = elementRect.top - mainParentRect.top;

        // Overlay center position relative to main parent
        const overlayCenterX = state.left + state.width / 2;
        const overlayCenterY = state.top + state.height / 2;

        // Position relative to the zone element
        const newLeftPx = overlayCenterX - zoneOffsetX;
        const newTopPx = overlayCenterY - zoneOffsetY;
        const newSize = Math.round((defaults.originalSize || 100) * scale);

        this.recreateZone(element, defaults, {
            "left": newLeftPx + "px",
            "top": newTopPx + "px"
        }, newSize);
    }
}

window.VirtualGamepadEditor = VirtualGamepadEditor;

/**
 * Manages undo/redo using full layout snapshots.
 *
 * @class EJS_HistoryManager
 */
class EJS_HistoryManager {
    /**
     * @param {Function} onUpdate
     * @param {Function} applySnapshot
     */
    constructor(onUpdate, applySnapshot) {
        this.past = [];
        this.future = [];
        this.present = null;
        this.onUpdate = onUpdate;
        this.applySnapshot = applySnapshot;
    }

    cloneSnapshot(snapshot) {
        const clone = {};
        if (!snapshot) return clone;
        for (const id in snapshot) {
            const state = snapshot[id];
            clone[id] = {
                left: state.left,
                top: state.top,
                width: state.width,
                height: state.height
            };
        }
        return clone;
    }

    snapshotsEqual(a, b, epsilon = 0.5) {
        const keysA = Object.keys(a || {});
        const keysB = Object.keys(b || {});
        if (keysA.length !== keysB.length) return false;
        for (let i = 0; i < keysA.length; i++) {
            const id = keysA[i];
            const stateA = a[id];
            const stateB = b[id];
            if (!stateA || !stateB) return false;
            if (Math.abs(stateA.left - stateB.left) > epsilon) return false;
            if (Math.abs(stateA.top - stateB.top) > epsilon) return false;
            if (Math.abs(stateA.width - stateB.width) > epsilon) return false;
            if (Math.abs(stateA.height - stateB.height) > epsilon) return false;
        }
        return true;
    }

    setInitial(snapshot) {
        this.present = this.cloneSnapshot(snapshot);
        this.past = [];
        this.future = [];
        this.onUpdate();
    }

    push(snapshot) {
        const next = this.cloneSnapshot(snapshot);
        if (this.present && this.snapshotsEqual(this.present, next)) return;
        if (this.present) {
            this.past.push(this.cloneSnapshot(this.present));
        }
        this.present = next;
        this.future = [];
        this.onUpdate();
    }

    undo() {
        if (!this.canUndo()) return;
        const previous = this.past[this.past.length - 1];
        const current = this.cloneSnapshot(this.present);
        try {
            this.applySnapshot(previous);
            this.past.pop();
            this.future.push(current);
            this.present = this.cloneSnapshot(previous);
            this.onUpdate();
        } catch (e) {
            console.warn("Virtual gamepad undo failed", e);
        }
    }

    redo() {
        if (!this.canRedo()) return;
        const next = this.future[this.future.length - 1];
        const current = this.cloneSnapshot(this.present);
        try {
            this.applySnapshot(next);
            this.future.pop();
            this.past.push(current);
            this.present = this.cloneSnapshot(next);
            this.onUpdate();
        } catch (e) {
            console.warn("Virtual gamepad redo failed", e);
        }
    }

    clear() {
        this.past = [];
        this.future = [];
        this.present = null;
        this.onUpdate();
    }

    canUndo() { return this.past.length > 0; }
    canRedo() { return this.future.length > 0; }
}

/**
 * Represents an editable overlay for a virtual gamepad control element.
 * Creates a draggable/resizable overlay positioned over the original element,
 * handling position state and undo/redo integration.
 *
 * @class EJS_OverlayElement
 */
class EJS_OverlayElement {
    /**
     * Creates a new overlay element.
     * @param {EJS_VirtualGamepadEditor} editor - The parent editor instance
     * @param {HTMLElement} original - The original DOM element being edited
     * @param {string} id - Unique identifier for this element (e.g., "b_A", "b_dpad")
     * @param {string} type - Element type: "button", "dpad", or "zone"
     * @param {DOMRect} rect - Bounding rectangle of the original element
     * @param {DOMRect} parentRect - Bounding rectangle of the parent container
     * @param {Object} [defaults] - Default position/size values for reset functionality
     */
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

    /**
     * Creates the visual overlay element with styling and event handlers.
     * @param {DOMRect} rect - Bounding rectangle of the original element
     * @param {DOMRect} parentRect - Bounding rectangle of the parent container
     * @returns {HTMLElement} The created overlay element
     * @private
     */
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

        // Copy visual styles from original button
        if (this.type === "button") {
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

        // Render control-specific overlay previews for complex controls
        if (this.type === "dpad") {
            const dpadPreview = this.original.cloneNode(true);
            dpadPreview.classList.remove(
                "ejs_dpad_up_pressed",
                "ejs_dpad_down_pressed",
                "ejs_dpad_left_pressed",
                "ejs_dpad_right_pressed"
            );
            // The source d-pad may have saved inline layout styles (left/top/transform).
            // Reset them so the preview always fits the current overlay box.
            dpadPreview.style.left = "0";
            dpadPreview.style.top = "0";
            dpadPreview.style.right = "";
            dpadPreview.style.width = "100%";
            dpadPreview.style.height = "100%";
            dpadPreview.style.transform = "";
            dpadPreview.style.transformOrigin = "";
            dpadPreview.classList.add("ejs_edit_overlay_dpad_preview");
            overlay.appendChild(dpadPreview);
        } else if (this.type === "zone") {
            const nipple = this.original.querySelector(".nipple");
            const back = nipple ? nipple.querySelector(".back") : null;
            const front = nipple ? nipple.querySelector(".front") : null;

            const stickBase = emu.createElement("div");
            stickBase.classList.add("ejs_edit_overlay_stick_base");
            const stickKnob = emu.createElement("div");
            stickKnob.classList.add("ejs_edit_overlay_stick_knob");

            // Preserve the real joystick look (usually red) while editing.
            if (back) this.copyVisualStyle(back, stickBase);
            if (front) this.copyVisualStyle(front, stickKnob);

            // Match knob size ratio from the live joystick so preview shape stays faithful.
            if (back && front) {
                const backRect = back.getBoundingClientRect();
                const frontRect = front.getBoundingClientRect();
                const ratio = backRect.width > 0 ? (frontRect.width / backRect.width) : 0;
                const knobRatio = Math.max(0.2, Math.min(0.9, ratio || 0.44));
                const insetPct = (100 - (knobRatio * 100)) / 2;
                stickKnob.style.width = (knobRatio * 100) + "%";
                stickKnob.style.height = (knobRatio * 100) + "%";
                stickKnob.style.left = insetPct + "%";
                stickKnob.style.top = insetPct + "%";
            }

            overlay.appendChild(stickBase);
            overlay.appendChild(stickKnob);
        }

        // Add label for buttons only (complex controls use visual preview instead)
        const labelText = this.type === "button" ? (this.original.innerText || "") : "";
        if (labelText) {
            const label = emu.createElement("span");
            label.innerText = labelText;
            overlay.appendChild(label);
            this.buttonLabel = label;
            const buttonStyle = window.getComputedStyle(this.original);
            this.buttonBaseFontSize = parseFloat(buttonStyle.fontSize) || 16;
            // If the original button is already visually scaled (eg via transform: scale(...)),
            // include that factor so the edit preview matches what users currently see.
            const intrinsicWidth = parseFloat(buttonStyle.width) || rect.width;
            const intrinsicHeight = parseFloat(buttonStyle.height) || rect.height;
            const visualScaleX = intrinsicWidth > 0 ? rect.width / intrinsicWidth : 1;
            const visualScaleY = intrinsicHeight > 0 ? rect.height / intrinsicHeight : 1;
            this.buttonVisualScale = Math.max(0.25, Math.min(4, (visualScaleX + visualScaleY) / 2));
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

        this.updateButtonPreviewScale(overlay);

        this.setupDragHandlers(overlay);
        this.setupResizeHandle(overlay);

        return overlay;
    }

    /**
     * Sets up drag interaction handlers for moving the overlay.
     * @param {HTMLElement} overlay - The overlay element to make draggable
     * @private
     */
    setupDragHandlers(overlay) {
        let startLeft, startTop;

        const cleanup = this.editor.setupPointerInteraction(overlay, {
            onStart: ({ event }) => {
                if (event.target.classList.contains("ejs_virtualGamepad_resize_handle")) return false;
                startLeft = parseFloat(overlay.style.left) || 0;
                startTop = parseFloat(overlay.style.top) || 0;
                overlay.classList.add("ejs_dragging");
            },
            onMove: ({ deltaX, deltaY }) => {
                overlay.style.left = (startLeft + deltaX) + "px";
                overlay.style.top = (startTop + deltaY) + "px";
            },
            onEnd: () => {
                overlay.classList.remove("ejs_dragging");
                this.editor.commitSnapshot();
            }
        });
        if (cleanup) this.cleanupFns.push(cleanup);
    }

    /**
     * Creates and sets up a resize handle for the overlay.
     * @param {HTMLElement} overlay - The overlay element to add resize handle to
     * @private
     */
    setupResizeHandle(overlay) {
        const emu = this.editor.emu;
        const handle = emu.createElement("div");
        handle.classList.add("ejs_virtualGamepad_resize_handle", "ejs_resize_se");
        overlay.appendChild(handle);

        let startWidth, startHeight;

        const cleanup = this.editor.setupPointerInteraction(handle, {
            stopPropagation: true,
            onStart: () => {
                startWidth = parseFloat(overlay.style.width) || 50;
                startHeight = parseFloat(overlay.style.height) || 50;
            },
            onMove: ({ deltaX, deltaY }) => {
                const delta = (deltaX + deltaY) / 2;
                overlay.style.width = Math.max(20, startWidth + delta) + "px";
                overlay.style.height = Math.max(20, startHeight + delta) + "px";
                this.updateButtonPreviewScale();
            },
            onEnd: () => {
                this.editor.commitSnapshot();
            }
        });
        if (cleanup) this.cleanupFns.push(cleanup);
    }

    /**
     * Captures the current position and size state of the overlay.
     * @returns {{left: number, top: number, width: number, height: number}} Current state
     */
    captureState() {
        return {
            left: parseFloat(this.overlay.style.left) || 0,
            top: parseFloat(this.overlay.style.top) || 0,
            width: parseFloat(this.overlay.style.width) || 50,
            height: parseFloat(this.overlay.style.height) || 50
        };
    }

    /**
     * Keeps button label text scaled with the overlay size while editing.
     * @private
     */
    updateButtonPreviewScale(overlayElement) {
        if (this.type !== "button" || !this.buttonLabel) return;
        const targetOverlay = overlayElement || this.overlay;
        if (!targetOverlay) return;
        const baseWidth = targetOverlay._startWidth || 50;
        const baseHeight = targetOverlay._startHeight || 50;
        const currentWidth = parseFloat(targetOverlay.style.width) || 50;
        const currentHeight = parseFloat(targetOverlay.style.height) || 50;
        const scaleX = baseWidth > 0 ? currentWidth / baseWidth : 1;
        const scaleY = baseHeight > 0 ? currentHeight / baseHeight : 1;
        const scale = Math.max(0.25, Math.min(4, (scaleX + scaleY) / 2));
        const visualScale = this.buttonVisualScale || 1;
        this.buttonLabel.style.fontSize = (this.buttonBaseFontSize * visualScale * scale) + "px";
    }

    /**
     * Copies key visual styles from one element to another.
     * Used to keep overlay previews visually aligned with live controls.
     * @param {HTMLElement} sourceEl
     * @param {HTMLElement} targetEl
     * @private
     */
    copyVisualStyle(sourceEl, targetEl) {
        const style = window.getComputedStyle(sourceEl);
        targetEl.style.background = style.background;
        targetEl.style.backgroundColor = style.backgroundColor;
        targetEl.style.border = style.border;
        targetEl.style.borderRadius = style.borderRadius;
        targetEl.style.boxShadow = style.boxShadow;
        targetEl.style.opacity = style.opacity;
    }

    /**
     * Applies a position/size state to the overlay.
     * @param {{left?: number, top?: number, width?: number, height?: number}} state - State to apply
     */
    setState(state) {
        if (state.left !== undefined) this.overlay.style.left = state.left + "px";
        if (state.top !== undefined) this.overlay.style.top = state.top + "px";
        if (state.width !== undefined) this.overlay.style.width = state.width + "px";
        if (state.height !== undefined) this.overlay.style.height = state.height + "px";
        this.updateButtonPreviewScale();
    }

    /**
     * Sets the overlay dimensions.
     * @param {number} width - Width in pixels
     * @param {number} height - Height in pixels
     */
    setSize(width, height) {
        this.overlay.style.width = width + "px";
        this.overlay.style.height = height + "px";
        this.updateButtonPreviewScale();
    }

    /**
     * Resets the overlay to its position when the editor was opened.
     */
    resetToStart() {
        this.setState({
            left: this.overlay._startLeft,
            top: this.overlay._startTop,
            width: this.overlay._startWidth,
            height: this.overlay._startHeight
        });
    }

    /**
     * Resets the overlay to its default position from CSS/config.
     * @returns {{oldState: Object, newState: Object}|false} State change info, or false if unchanged
     */
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

    /**
     * Removes all event listeners and cleans up resources.
     */
    cleanup() {
        this.cleanupFns.forEach(fn => fn());
        this.cleanupFns = [];
    }
}

/**
 * Orchestrates the virtual gamepad edit mode.
 * Provides UI for repositioning and resizing virtual gamepad controls,
 * with undo/redo support and persistent storage of layouts.
 *
 * @class EJS_VirtualGamepadEditor
 */
class EJS_VirtualGamepadEditor {
    /**
     * Creates a new virtual gamepad editor.
     * @param {Object} emulator - The EmulatorJS instance
     */
    constructor(emulator) {
        this.emu = emulator;
        this.elements = [];
        this.history = new EJS_HistoryManager(
            () => this.updateToolbarState(),
            (snapshot) => this.applySnapshot(snapshot)
        );
        this.initialSnapshot = {};
        this.container = null;
        this.overlayContainer = null;
        this.toolbar = null;
        this.toolbarButtons = {};
        this.buttonCleanups = [];
        this.wasPaused = false;
        this.active = false;
    }

    /**
     * Whether edit mode is currently active.
     * @type {boolean}
     */
    get isActive() {
        return this.active;
    }

    /**
     * Sets up pointer interaction handlers (Pointer Events with a legacy fallback).
     * @param {HTMLElement} element - Element to attach handlers to
     * @param {Object} options - Handler options
     * @param {Function} options.onStart - Called on pointer down, receives {x, y, event}
     * @param {Function} options.onMove - Called on pointer move, receives {x, y, deltaX, deltaY, event}
     * @param {Function} options.onEnd - Called on pointer up, receives {event}
     * @param {boolean} [options.stopPropagation=false] - Stop event propagation
     * @returns {Function} Cleanup function to remove listeners
     */
    setupPointerInteraction(element, { onStart, onMove, onEnd, stopPropagation = false }) {
        if (window.PointerEvent) {
            let isActive = false;
            let startX = 0;
            let startY = 0;
            let pointerId = null;
            // Use document-level move/up for reliability (eg when dragging outside bounds).
            const moveEndTarget = document;

            const handleStart = (e) => {
                if (isActive) return;
                if (stopPropagation) e.stopPropagation();
                e.preventDefault();
                const result = onStart({ x: e.clientX, y: e.clientY, event: e });
                if (result === false) return;
                isActive = true;
                pointerId = e.pointerId;
                startX = e.clientX;
                startY = e.clientY;
                if (element.setPointerCapture) {
                    try {
                        element.setPointerCapture(pointerId);
                    } catch (err) {}
                }
            };

            const handleMove = (e) => {
                if (!isActive || e.pointerId !== pointerId) return;
                e.preventDefault();
                onMove({
                    x: e.clientX,
                    y: e.clientY,
                    deltaX: e.clientX - startX,
                    deltaY: e.clientY - startY,
                    event: e
                });
            };

            const handleEnd = (e) => {
                if (!isActive || e.pointerId !== pointerId) return;
                isActive = false;
                if (element.releasePointerCapture) {
                    try {
                        element.releasePointerCapture(pointerId);
                    } catch (err) {}
                }
                pointerId = null;
                onEnd({ event: e });
            };

            element.addEventListener("pointerdown", handleStart, { passive: false });
            moveEndTarget.addEventListener("pointermove", handleMove, { passive: false });
            moveEndTarget.addEventListener("pointerup", handleEnd);
            moveEndTarget.addEventListener("pointercancel", handleEnd);

            return () => {
                element.removeEventListener("pointerdown", handleStart);
                moveEndTarget.removeEventListener("pointermove", handleMove);
                moveEndTarget.removeEventListener("pointerup", handleEnd);
                moveEndTarget.removeEventListener("pointercancel", handleEnd);
            };
        }

        // Fallback for legacy browsers.
        let isActive = false;
        let startX = 0, startY = 0;

        const handleStart = (e) => {
            if (isActive) return;
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

        const moveEndTarget = document;
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

    /**
     * Enters edit mode, pausing the emulator and displaying the editor UI.
     */
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
        this.initialSnapshot = this.captureSnapshot();
        this.history.setInitial(this.initialSnapshot);

        // Dim original virtual gamepad
        this.emu.virtualGamepad.classList.add("ejs_virtualGamepad_edit_mode_faded");
    }

    /**
     * Creates the editor toolbar with undo/redo/reset/save buttons.
     * @returns {HTMLElement} The toolbar element
     * @private
     */
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
            { icon: UNDO_ICON, cls: "undo", title: "Undo", action: () => this.history.undo(), getDisabled: () => !this.history.canUndo() },
            { icon: REDO_ICON, cls: "redo", title: "Redo", action: () => this.history.redo(), getDisabled: () => !this.history.canRedo() },
            { icon: CLEAR_ICON, cls: "clear", title: "Clear", action: () => this.clear(), getDisabled: () => !this.hasChangesFromStart() },
            { icon: DEFAULT_ICON, cls: "default", title: "Reset to Default", action: () => this.reset() },
            { icon: SAVE_ICON, cls: "close", title: "Save & Close", action: () => this.exit(true) }
        ];

        buttonConfigs.forEach(cfg => {
            const btn = this.createButton(cfg);
            this.toolbarButtons[cfg.cls] = { element: btn, getDisabled: cfg.getDisabled };
            toolbar.appendChild(btn);
        });

        return toolbar;
    }

    /**
     * Creates a toolbar button from configuration.
     * @param {Object} cfg - Button configuration
     * @param {string} [cfg.icon] - SVG icon HTML
     * @param {string} [cfg.text] - Button text (localization key)
     * @param {string} cfg.cls - CSS class suffix
     * @param {string} [cfg.title] - Tooltip text (localization key)
     * @param {Function} cfg.action - Click handler
     * @param {Function} [cfg.getDisabled] - Returns whether button should be disabled
     * @returns {HTMLButtonElement} The button element
     * @private
     */
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

    captureSnapshot() {
        const snapshot = {};
        this.elements.forEach((el) => {
            snapshot[el.id] = el.captureState();
        });
        return snapshot;
    }

    applySnapshot(snapshot) {
        if (!snapshot) return;
        this.elements.forEach((el) => {
            const state = snapshot[el.id];
            if (state) el.setState(state);
        });
    }

    commitSnapshot() {
        this.history.push(this.captureSnapshot());
    }

    /**
     * Checks if any element has changed from its position when the editor opened.
     * @returns {boolean} True if any element has moved or resized
     */
    hasChangesFromStart() {
        return !this.history.snapshotsEqual(this.initialSnapshot, this.captureSnapshot());
    }

    /**
     * Updates toolbar button disabled states based on current conditions.
     * @private
     */
    updateToolbarState() {
        for (const key in this.toolbarButtons) {
            const { element, getDisabled } = this.toolbarButtons[key];
            if (getDisabled) element.disabled = getDisabled();
        }
    }

    /**
     * Creates overlay elements for all editable virtual gamepad controls.
     * @private
     */
    setupOverlayElements() {
        const parentRect = this.emu.elements.parent.getBoundingClientRect();
        const controls = this.emu.getVirtualGamepadControls ? this.emu.getVirtualGamepadControls() : [];

        controls.forEach((control) => {
            if (!control?.id || !control.element) return;
            const defaults = this.emu.virtualGamepadDefaults[control.id];

            let rect = null;
            if (control.type === "zone") {
                const zone = control.element;
                const nipple = zone.querySelector(".nipple");
                const back = nipple ? nipple.querySelector(".back") : null;
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
            } else {
                rect = control.element.getBoundingClientRect();
            }

            const overlayEl = new EJS_OverlayElement(
                this,
                control.element,
                control.id,
                control.type,
                rect,
                parentRect,
                defaults
            );
            this.overlayContainer.appendChild(overlayEl.overlay);
            this.elements.push(overlayEl);
        });
    }

    /**
     * Clears all changes made in the current session, reverting to session start state.
     */
    clear() {
        this.applySnapshot(this.initialSnapshot);
        this.commitSnapshot();
    }

    /**
     * Resets all elements to their default CSS/config positions.
     */
    reset() {
        this.elements.forEach((el) => el.resetToDefault());
        this.commitSnapshot();
    }

    /**
     * Exits edit mode, optionally saving changes.
     * @param {boolean} save - Whether to save changes before exiting
     */
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

    /**
     * Applies overlay positions to the original DOM elements.
     * @private
     */
    applyChangesToOriginals() {
        const parentRect = this.emu.elements.parent.getBoundingClientRect();

        this.elements.forEach(overlayEl => {
            const state = overlayEl.captureState();
            const overlay = overlayEl.overlay;
            const element = overlayEl.original;
            const id = overlayEl.id;
            const defaults = this.emu.virtualGamepadDefaults[id];
            const defaultLeft = overlay._defaultLeft ?? state.left;
            const defaultTop = overlay._defaultTop ?? state.top;
            const defaultWidth = overlay._defaultWidth ?? state.width;
            const defaultHeight = overlay._defaultHeight ?? state.height;
            const isAtDefault = Math.abs(state.left - defaultLeft) < 1 &&
                Math.abs(state.top - defaultTop) < 1 &&
                Math.abs(state.width - defaultWidth) < 1 &&
                Math.abs(state.height - defaultHeight) < 1;
            const scaleX = defaultWidth > 0 ? state.width / defaultWidth : 1;
            const scaleY = defaultHeight > 0 ? state.height / defaultHeight : 1;
            const scale = Math.max(0.1, Math.min(10, (scaleX + scaleY) / 2));

            if (overlayEl.type === "zone") {
                if (!defaults || !defaults.nippleManager || !defaults.zoneConfig) return;
                if (isAtDefault) {
                    this.restoreZoneToDefault(element, defaults);
                } else {
                    this.applyZonePosition(element, state, scale, defaults);
                }
                return;
            }

            if (isAtDefault && defaults) {
                element.style.left = defaults.left ?? "";
                element.style.top = defaults.top ?? "";
                element.style.right = defaults.right ?? "";
                element.style.transform = defaults.transform || "";
                element.style.width = defaults.width || "";
                element.style.height = defaults.height || "";
                return;
            }

            // Calculate position relative to the element's positioning context.
            // For absolutely positioned elements this is offsetParent (not always parentElement).
            const positioningParent = element.offsetParent || element.parentElement;
            const elementParentRect = positioningParent ? positioningParent.getBoundingClientRect() : parentRect;
            const containerOffsetX = elementParentRect.left - parentRect.left;
            const containerOffsetY = elementParentRect.top - parentRect.top;
            element.style.right = "";
            element.style.left = (state.left - containerOffsetX) + "px";
            element.style.top = (state.top - containerOffsetY) + "px";

            if (Math.abs(scale - 1) > 0.01) {
                element.style.transform = `scale(${scale})`;
                element.style.transformOrigin = "top left";
            } else {
                element.style.transform = "";
            }
        });
    }

    /**
     * Recreates a nipplejs zone with new position and size.
     * @param {HTMLElement} element - The zone container element
     * @param {Object} defaults - Default configuration for the zone
     * @param {{left: string, top: string}} position - New position (CSS values)
     * @param {number} size - New size in pixels
     * @private
     */
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

    /**
     * Restores a zone to its original default position and size.
     * @param {HTMLElement} element - The zone container element
     * @param {Object} defaults - Default configuration for the zone
     * @private
     */
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

    /**
     * Applies a new position and scale to a zone element.
     * @param {HTMLElement} element - The zone container element
     * @param {Object} state - Current overlay state {left, top, width, height}
     * @param {number} scale - Scale factor to apply
     * @param {Object} defaults - Default configuration for the zone
     * @private
     */
    applyZonePosition(element, state, scale, defaults) {
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

window.EJS_VirtualGamepadEditor = EJS_VirtualGamepadEditor;

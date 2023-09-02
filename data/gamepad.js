class GamepadHandler {
    gamepads;
    timeout;
    listeners;
    constructor() {
        this.buttonLabels = {
            0: 'BUTTON_1',
            1: 'BUTTON_2',
            2: 'BUTTON_3',
            3: 'BUTTON_4',
            4: 'LEFT_TOP_SHOULDER',
            5: 'RIGHT_TOP_SHOULDER',
            6: 'LEFT_BOTTOM_SHOULDER',
            7: 'RIGHT_BOTTOM_SHOULDER',
            8: 'SELECT',
            9: 'START',
            10: 'LEFT_STICK',
            11: 'RIGHT_STICK',
            12: 'DPAD_UP',
            13: 'DPAD_DOWN',
            14: 'DPAD_LEFT',
            15: 'DPAD_RIGHT',
        };
        this.gamepads = [];
        this.listeners = {};
        this.timeout = null;
        this.loop();
    }
    terminate() {
        window.clearTimeout(this.timeout);
    }
    getGamepads() {
        return navigator.getGamepads ? navigator.getGamepads() : (navigator.webkitGetGamepads ? navigator.webkitGetGamepads() : []);
    }
    loop() {
        this.updateGamepadState();
        this.timeout = setTimeout(this.loop.bind(this), 10);
    }
    updateGamepadState() {
        const gamepads = this.getGamepads();
        gamepads.forEach((gamepad, index) => {
            if (!gamepad) return;
            let hasGamepad = false;
            this.gamepads.forEach((oldGamepad, oldIndex) => {
                if (oldGamepad.index !== gamepad.index) return;
                const gamepadToSave = {
                    axes: [],
                    buttons: {},
                    index: oldGamepad.index,
                    id: oldGamepad.id
                }
                hasGamepad = true;
                
                oldGamepad.axes.forEach((axis, axisIndex) => {
                    const val = (axis < 0.01 && axis > -0.01) ? 0 : axis;
                    const newVal = (gamepad.axes[axisIndex] < 0.01 && gamepad.axes[axisIndex] > -0.01) ? 0 : gamepad.axes[axisIndex];
                    if (newVal !== val) {
                        const axis = ['LEFT_STICK_X', 'LEFT_STICK_Y', 'RIGHT_STICK_X', 'RIGHT_STICK_Y'][axisIndex];
                        if (!axis) return;
                        this.dispatchEvent('axischanged', {
                            axis: axis,
                            value: newVal,
                            index: gamepad.index,
                            label: this.getAxisLabel(axis, newVal),
                            gamepadIndex: gamepad.index,
                        });
                    }
                    gamepadToSave.axes[axisIndex] = newVal;
                })
                
                gamepad.buttons.forEach((button, buttonIndex) => {
                    let pressed = oldGamepad.buttons[buttonIndex] === 1.0;
                    if (typeof oldGamepad.buttons[buttonIndex] === "object") {
                        pressed = oldGamepad.buttons[buttonIndex].pressed;
                    }
                    let pressed2 = button === 1.0;
                    if (typeof button === "object") {
                        pressed2 = button.pressed;
                    }
                    gamepadToSave.buttons[buttonIndex] = {pressed:pressed2};
                    if (pressed !== pressed2) {
                        if (pressed2) {
                            this.dispatchEvent('buttondown', {index: buttonIndex, label: this.getButtonLabel(buttonIndex), gamepadIndex: gamepad.index});
                        } else {
                            this.dispatchEvent('buttonup', {index: buttonIndex, label:this.getButtonLabel(buttonIndex), gamepadIndex: gamepad.index});
                        }
                    }
                    
                })
                this.gamepads[oldIndex] = gamepadToSave;
            })
            if (!hasGamepad) {
                this.gamepads.push(gamepads[index]);
                this.dispatchEvent('connected', {gamepadIndex: gamepad.index});
            }
        });
        
        for (let j=0; j<this.gamepads.length; j++) {
            if (!this.gamepads[j]) continue;
            let has = false;
            for (let i=0; i<gamepads.length; i++) {
                if (!gamepads[i]) continue;
                if (this.gamepads[j].index === gamepads[i].index) {
                    has = true;
                    break;
                }
            }
            if (!has) {
                this.dispatchEvent('disconnected', {gamepadIndex: this.gamepads[j].index});
                this.gamepads.splice(j, 1);
                j--;
            }
        }
    }
    dispatchEvent(name, arg) {
        if (typeof this.listeners[name] !== 'function') return;
        if (!arg) arg={};
        arg.type = name;
        this.listeners[name](arg);
    }
    on(name, cb) {
        this.listeners[name.toLowerCase()] = cb;
    }

    getButtonLabel(index) {
        if (index === null || index === undefined) {
            return null;
        }
        if (this.buttonLabels[index] === undefined) {
            return `GAMEPAD_${index}`;
        }
        return this.buttonLabels[index];
    }
    getAxisLabel(axis, value) {
        let valueLabel = null;
        if (value > 0.5 || value < -0.5) {
            if (value > 0) {
                valueLabel = '+1';
            } else {
                valueLabel = '-1';
            }
        }
        if (!axis || !valueLabel) {
            return null;
        }
        return `${axis}:${valueLabel}`;
    }
}

window.GamepadHandler = GamepadHandler;

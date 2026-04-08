export interface GamepadEventBase {
    type: string;
    gamepadIndex: number;
}

export interface GamepadConnectedEvent extends GamepadEventBase {
    type: "connected";
}

export interface GamepadDisconnectedEvent extends GamepadEventBase {
    type: "disconnected";
}

export interface GamepadButtonEvent extends GamepadEventBase {
    type: "buttondown" | "buttonup";
    index: number;
    label: string | null;
}

export interface GamepadAxisChangedEvent extends GamepadEventBase {
    type: "axischanged";
    axis: string;
    value: number;
    oldValue: number;
    index: number;
    label: string | null;
}

export interface GamepadHandlerEventMap {
    connected: GamepadConnectedEvent;
    disconnected: GamepadDisconnectedEvent;
    buttondown: GamepadButtonEvent;
    buttonup: GamepadButtonEvent;
    axischanged: GamepadAxisChangedEvent;
}

export class GamepadHandler {
    constructor();

    terminate(): void;
    getGamepads(): readonly (Gamepad | null)[];
    loop(): void;
    updateGamepadState(): void;
    dispatchEvent<K extends keyof GamepadHandlerEventMap>(name: K, arg: Omit<GamepadHandlerEventMap[K], "type">): void;
    on<K extends keyof GamepadHandlerEventMap>(name: K, cb: (event: GamepadHandlerEventMap[K]) => void): void;
    on(name: string, cb: (event: GamepadEventBase & Record<string, unknown>) => void): void;
    getButtonLabel(index: number | null | undefined): string | null;
    getAxisLabel(axis: string | null | undefined, value: number): string | null;
}

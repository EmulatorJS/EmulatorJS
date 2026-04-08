import type { DownloadResponseType, EJS_Cache, EJS_CacheItem, EJS_Download } from "./cache.js";
import type { EmscriptenFileSystem, EmscriptenModuleLike, EJS_GameManager } from "./GameManager.js";
import type { GamepadHandler } from "./gamepad.js";
import type { ShaderDefinitionMap } from "./shaders.js";
import type { EJS_DUMMYSTORAGE, EJS_STORAGE } from "./storage.js";
import type { EJS_SETUP } from "./setup.js";

export type EmulatorJSBinaryData = ArrayBuffer | Uint8Array | Blob;
export type EmulatorJSDataSource = string | File | EmulatorJSBinaryData;
export type EmulatorJSFilePathMap = Record<string, string>;
export type EmulatorJSLanguageMap = Record<string, string>;
export type CheatEntry = [description: string, code: string];
export type ScreenshotSource = "canvas" | "retroarch";

export interface CacheConfig {
    enabled?: boolean;
    cacheMaxSizeMB?: number;
    cacheMaxAgeMins?: number;
}

export interface ScreenCapturePhotoConfig {
    source?: ScreenshotSource;
    format?: string;
    upscale?: number;
}

export interface ScreenCaptureVideoConfig {
    format?: string;
    upscale?: number;
    fps?: number;
    videoBitrate?: number;
    audioBitrate?: number;
}

export interface ScreenCaptureConfig {
    photo?: ScreenCapturePhotoConfig;
    video?: ScreenCaptureVideoConfig;
}

export interface DefaultControllerBinding {
    value?: string;
    value2?: string;
}

export type DefaultControllerMap = Record<number, Record<number, DefaultControllerBinding>>;

export interface VirtualGamepadBase {
    id: string | number;
    location: string;
    left?: number | string;
    right?: number | string;
    top?: number | string;
}

export interface VirtualGamepadButton extends VirtualGamepadBase {
    type: "button";
    text?: string;
    input_value: number;
    fontSize?: number;
    bold?: boolean;
    block?: boolean;
}

export interface VirtualGamepadDirectional extends VirtualGamepadBase {
    type: "dpad" | "zone";
    inputValues: number[];
    joystickInput?: boolean;
}

export type VirtualGamepadItem = VirtualGamepadButton | VirtualGamepadDirectional;

export interface ButtonOptionConfig {
    visible?: boolean;
    icon?: string;
    displayName?: string;
    callback?: () => void;
    custom?: boolean;
}

export interface CustomButtonOption extends ButtonOptionConfig {
    icon: string;
    displayName: string;
    callback: () => void;
    custom?: true;
}

export type ButtonOption = boolean | ButtonOptionConfig | CustomButtonOption;

export interface ButtonOptions {
    playPause?: ButtonOption;
    play?: ButtonOption;
    pause?: ButtonOption;
    restart?: ButtonOption;
    mute?: ButtonOption;
    unmute?: ButtonOption;
    settings?: ButtonOption;
    fullscreen?: ButtonOption;
    enterFullscreen?: ButtonOption;
    exitFullscreen?: ButtonOption;
    saveState?: ButtonOption;
    loadState?: ButtonOption;
    screenRecord?: ButtonOption;
    gamepad?: ButtonOption;
    cheat?: ButtonOption;
    volume?: ButtonOption;
    volumeSlider?: ButtonOption;
    saveSavFiles?: ButtonOption;
    loadSavFiles?: ButtonOption;
    quickSave?: ButtonOption;
    quickLoad?: ButtonOption;
    screenshot?: ButtonOption;
    cacheManager?: ButtonOption;
    exitEmulation?: ButtonOption;
    netplay?: ButtonOption;
    diskButton?: ButtonOption;
    contextMenu?: ButtonOption;
    rightClick?: ButtonOption;
    [key: string]: ButtonOption | undefined;
}

export interface DownloadRequestOptions {
    method?: string;
    responseType?: DownloadResponseType;
    type?: string;
}

export type DownloadStatusMessageCallback = (progressText: string) => void;

export interface DownloadFileResult<TData = unknown> {
    data?: TData;
    headers: Record<string, string | number>;
}

export interface SaveStateEvent {
    screenshot: Uint8Array;
    format: string;
    state: Uint8Array;
}

export interface SaveSaveEvent {
    screenshot: Uint8Array;
    format: string;
    save: Uint8Array | null;
}

export interface SaveUpdateEvent {
    hash: string;
    save: Uint8Array;
    screenshot: Uint8Array;
    format: string;
}

export interface TakeScreenshotResult {
    screenshot: Uint8Array;
    format: string;
}

export interface EmulatorJSEventMap {
    ready: void;
    start: void;
    exit: void;
    "start-clicked": void;
    loadState: void;
    loadSave: void;
    saveDatabaseLoaded: EmscriptenFileSystem;
    saveState: SaveStateEvent;
    saveSave: SaveSaveEvent;
    saveUpdate: SaveUpdateEvent;
}

export type EmulatorJSKnownEvent = keyof EmulatorJSEventMap;
export type EmulatorJSEventCallback<T> = T extends void ? () => void : (data: T) => void;
export type ScreenshotCallback = (blob: Blob, format: string) => void;

export interface EmulatorJSConfig {
    gameUrl: EmulatorJSDataSource;
    dataPath: string;
    system: string;
    biosUrl?: EmulatorJSDataSource;
    gameName?: string;
    color?: string;
    adUrl?: string;
    adMode?: number;
    adTimer?: number;
    adSize?: [string, string];
    alignStartButton?: string;
    VirtualGamepadSettings?: VirtualGamepadItem[];
    buttonOpts?: ButtonOptions;
    volume?: number;
    defaultControllers?: DefaultControllerMap;
    startOnLoad?: boolean;
    fullscreenOnLoad?: boolean;
    filePaths?: EmulatorJSFilePathMap;
    loadState?: EmulatorJSDataSource;
    cacheLimit?: number;
    cacheConfig?: CacheConfig;
    cheats?: CheatEntry[];
    cheatPath?: string;
    defaultOptions?: Record<string, string | number | boolean>;
    gamePatchUrl?: EmulatorJSDataSource;
    gameParentUrl?: EmulatorJSDataSource;
    netplayUrl?: string;
    netplayICEServers?: RTCIceServer[];
    gameId?: number | string;
    backgroundImg?: string;
    backgroundBlur?: boolean;
    backgroundColor?: string;
    controlScheme?: string;
    threads?: boolean;
    disableCue?: boolean;
    startBtnName?: string;
    softLoad?: number;
    capture?: ScreenCaptureConfig;
    externalFiles?: Record<string, string>;
    dontExtractRom?: boolean;
    dontExtractBIOS?: boolean;
    disableLocalStorage?: boolean;
    forceLegacyCores?: boolean;
    noAutoFocus?: boolean;
    videoRotation?: 0 | 1 | 2 | 3;
    hideSettings?: string[];
    browserMode?: 1 | 2 | "1" | "2" | "mobile" | "desktop";
    additionalShaders?: ShaderDefinitionMap;
    fixedSaveInterval?: number;
    disableAutoUnload?: boolean;
    disableBatchBootup?: boolean;
    language?: string;
    langJson?: EmulatorJSLanguageMap;
    settingsLanguage?: boolean;
    disableDatabases?: boolean;
}

export default class EmulatorJS {
    constructor(element: string, config: EmulatorJSConfig);

    ejs_version: string;
    config: EmulatorJSConfig;
    debug: boolean;
    started: boolean;
    paused: boolean;
    volume: number;
    canvas: HTMLCanvasElement;
    setup: EJS_SETUP;
    storage: {
        states?: EJS_STORAGE<Uint8Array> | EJS_DUMMYSTORAGE;
        [key: string]: unknown;
    };
    storageCache: EJS_Cache;
    downloader: EJS_Download;
    gameManager?: EJS_GameManager;
    gamepad?: GamepadHandler;
    Module?: EmscriptenModuleLike;

    getCores(): Record<string, string[]>;
    requiresThreads(core: string): boolean;
    requiresWebGL2(core: string): boolean;
    getCore(generic?: boolean): string;

    downloadFile(
        path: string | EmulatorJSBinaryData,
        type: string,
        progress?: DownloadStatusMessageCallback,
        notWithPath?: boolean,
        opts?: DownloadRequestOptions,
        forceExtract?: boolean,
        dontCache?: boolean,
    ): Promise<DownloadFileResult<EJS_CacheItem | Uint8Array | string | Record<string, unknown>> | -1>;

    toData(data: unknown, rv?: boolean): Promise<Uint8Array | void> | boolean | null;
    checkForUpdates(): void;
    versionAsInt(ver: string): number;
    adBlocked(url: string, del?: boolean): void;

    on<K extends keyof EmulatorJSEventMap>(event: K, func: EmulatorJSEventCallback<EmulatorJSEventMap[K]>): void;
    on(event: string, func: (data?: unknown) => void): void;

    callEvent<K extends keyof EmulatorJSEventMap>(
        event: K,
        ...args: EmulatorJSEventMap[K] extends void ? [] : [data: EmulatorJSEventMap[K]]
    ): number;
    callEvent(event: string, data?: unknown): number;

    play(dontUpdate?: boolean): void;
    pause(dontUpdate?: boolean): void;
    setVolume(volume: number): void;
    toggleFullscreen(fullscreen?: boolean): void;
    toggleVirtualGamepad(show: boolean): void;
    toggleVirtualGamepadLeftHanded(enabled: boolean): void;
    openNetplayMenu(): void;

    screenshot(callback: ScreenshotCallback, source?: ScreenshotSource, format?: string, upscale?: number): void;
    takeScreenshot(source?: ScreenshotSource, format?: string, upscale?: number): Promise<TakeScreenshotResult>;
    screenRecord(): MediaRecorder;
    enableSaveUpdateEvent(): void;
}

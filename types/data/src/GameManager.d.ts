import type EmulatorJS from "./emulator.js";

export type FileSystemWriteData = string | ArrayBuffer | Uint8Array;

export interface EmscriptenAnalyzePathResult {
    exists: boolean;
    [key: string]: unknown;
}

export interface EmscriptenFileSystemStat {
    mode: number;
    [key: string]: unknown;
}

export interface EmscriptenFileSystem {
    filesystems: {
        IDBFS: unknown;
        [key: string]: unknown;
    };
    analyzePath(path: string): EmscriptenAnalyzePathResult;
    isDir(mode: number): boolean;
    mkdir(path: string): void;
    mount(fileSystem: unknown, options: unknown, mountPoint: string): void;
    readdir(path: string): string[];
    readFile(path: string): Uint8Array;
    stat(path: string): EmscriptenFileSystemStat;
    syncfs(populate: boolean, callback: () => void): void;
    unlink(path: string): void;
    unmount(path: string): void;
    writeFile(path: string, data: FileSystemWriteData, options?: unknown, mode?: string): void;
}

export interface EmscriptenModuleLike {
    FS: EmscriptenFileSystem;
    callbacks: Record<string, unknown>;
    AL?: {
        currentCtx?: {
            audioCtx: AudioContext;
            sources: Array<{ gain: GainNode }> | Record<string, { gain: GainNode }>;
        };
    };
    abort(): void;
    callMain(args: string[]): void;
    cwrap(name: string, returnType: string | null, argTypes: string[]): (...args: any[]) => any;
    resumeMainLoop(): void;
    [key: string]: unknown;
}

export class EJS_GameManager {
    constructor(Module: EmscriptenModuleLike, EJS: EmulatorJS);

    EJS: EmulatorJS;
    Module: EmscriptenModuleLike;
    FS: EmscriptenFileSystem;
    functions: Record<string, (...args: any[]) => any>;

    setupPreLoadSettings(): void;
    mountFileSystems(): Promise<void>;
    writeConfigFile(): void;
    loadExternalFiles(): Promise<void>;
    writeFile(path: string, data: FileSystemWriteData): void;
    mkdir(path: string): void;
    getRetroArchCfg(): string;
    writeBootupBatchFile(): string;
    initShaders(): void;
    clearEJSResetTimer(): void;
    restart(): void;
    getState(): Uint8Array;
    loadState(state: Uint8Array): void;
    screenshot(): Promise<Uint8Array>;
    quickSave(slot?: number): boolean;
    quickLoad(slot?: number): void;
    simulateInput(player: number, index: number, value: number): void;
    getFileNames(): string[];
    createCueFile(fileNames: string[]): string | null;
    loadPpssppAssets(): Promise<void>;
    setVSync(enabled: boolean | number): void;
    toggleMainLoop(playing: boolean | number): void;
    getCoreOptions(): string;
    setVariable(option: string, value: string): void;
    setCheat(index: number, enabled: boolean | number, code: string): void;
    resetCheat(): void;
    toggleShader(active: boolean | number): void;
    getDiskCount(): number;
    getCurrentDisk(): number;
    setCurrentDisk(disk: number): void;
    getSaveFilePath(): string;
    saveSaveFiles(): void;
    supportsStates(): boolean;
    getSaveFile(save?: boolean): Uint8Array | null;
    loadSaveFiles(): void;
    setFastForwardRatio(ratio: number): void;
    toggleFastForward(active: boolean | number): void;
    setSlowMotionRatio(ratio: number): void;
    toggleSlowMotion(active: boolean | number): void;
    setRewindGranularity(value: number): void;
    getFrameNum(): number;
    setVideoRotation(rotation: number): void;
    getVideoDimensions(type: string): number | undefined;
    setKeyboardEnabled(enabled: boolean): void;
    setAltKeyEnabled(enabled: boolean): void;
    listDir(path: string, indent?: string): void;
}

import type EmulatorJS from "./src/emulator.js";
import type {
    ButtonOptions,
    CacheConfig,
    DefaultControllerMap,
    EmulatorJSDataSource,
    SaveSaveEvent,
    SaveStateEvent,
    SaveUpdateEvent,
    ScreenCaptureConfig,
    VirtualGamepadItem,
} from "./src/emulator.js";
import type { ShaderDefinitionMap } from "./src/shaders.js";

export interface RuntimeModuleOptions {
    noInitialRun?: boolean;
    onRuntimeInitialized?: (() => void) | null;
    arguments?: string[];
    preRun?: Array<() => void>;
    postRun?: Array<() => void>;
    canvas?: HTMLCanvasElement;
    callbacks?: Record<string, unknown>;
    parent?: Element | null;
    print?: (message: string) => void;
    printErr?: (message: string) => void;
    totalDependencies?: number;
    locateFile?: (fileName: string) => string | void;
    getSavExt?: () => string;
    [key: string]: unknown;
}

export type RuntimeFactory<TModule = unknown> = (options: RuntimeModuleOptions) => Promise<TModule>;

export interface LoaderGlobalConfig {
    EJS_player?: string;
    EJS_pathtodata?: string;
    EJS_pathToData?: string;
    EJS_DEBUG_XX?: boolean;
    EJS_gameUrl?: EmulatorJSDataSource;
    EJS_core?: string;
    EJS_biosUrl?: EmulatorJSDataSource;
    EJS_gameName?: string;
    EJS_color?: string;
    EJS_AdUrl?: string;
    EJS_AdMode?: number;
    EJS_AdTimer?: number;
    EJS_AdSize?: [string, string];
    EJS_alignStartButton?: string;
    EJS_VirtualGamepadSettings?: VirtualGamepadItem[];
    EJS_Buttons?: ButtonOptions;
    EJS_volume?: number;
    EJS_defaultControls?: DefaultControllerMap;
    EJS_startOnLoaded?: boolean;
    EJS_fullscreenOnLoaded?: boolean;
    EJS_paths?: Record<string, string>;
    EJS_loadStateURL?: EmulatorJSDataSource;
    EJS_CacheLimit?: number;
    EJS_cacheConfig?: CacheConfig;
    EJS_cheats?: Array<[string, string]>;
    EJS_cheatPath?: string;
    EJS_defaultOptions?: Record<string, string | number | boolean>;
    EJS_gamePatchUrl?: EmulatorJSDataSource;
    EJS_gameParentUrl?: EmulatorJSDataSource;
    EJS_netplayServer?: string;
    EJS_netplayUrl?: string;
    EJS_netplayICEServers?: RTCIceServer[];
    EJS_gameID?: number | string;
    EJS_backgroundImage?: string;
    EJS_backgroundBlur?: boolean;
    EJS_backgroundColor?: string;
    EJS_controlScheme?: string;
    EJS_threads?: boolean;
    EJS_disableCue?: boolean;
    EJS_startButtonName?: string;
    EJS_softLoad?: number;
    EJS_screenCapture?: ScreenCaptureConfig;
    EJS_externalFiles?: Record<string, string>;
    EJS_dontExtractRom?: boolean;
    EJS_dontExtractBIOS?: boolean;
    EJS_disableLocalStorage?: boolean;
    EJS_forceLegacyCores?: boolean;
    EJS_noAutoFocus?: boolean;
    EJS_videoRotation?: 0 | 1 | 2 | 3;
    EJS_hideSettings?: string[];
    EJS_browserMode?: 1 | 2 | "1" | "2" | "mobile" | "desktop";
    EJS_shaders?: ShaderDefinitionMap;
    EJS_fixedSaveInterval?: number;
    EJS_disableAutoUnload?: boolean;
    EJS_disableBatchBootup?: boolean;
    EJS_language?: string;
    EJS_disableAutoLang?: boolean;
    EJS_settingsLanguage?: boolean;
    EJS_Runtime?: RuntimeFactory;
}

export interface LoaderGlobalCallbacks {
    EJS_ready?: () => void;
    EJS_onGameStart?: () => void;
    EJS_onLoadState?: () => void;
    EJS_onSaveState?: (event: SaveStateEvent) => void;
    EJS_onLoadSave?: () => void;
    EJS_onSaveSave?: (event: SaveSaveEvent) => void;
    EJS_onSaveUpdate?: (event: SaveUpdateEvent) => void;
}

declare global {
    interface Window extends LoaderGlobalConfig, LoaderGlobalCallbacks {
        EJS_emulator?: EmulatorJS;
        EJS_adBlocked?: (url: string, del?: boolean) => void;
    }

    var EJS_player: LoaderGlobalConfig["EJS_player"];
    var EJS_pathtodata: LoaderGlobalConfig["EJS_pathtodata"];
    var EJS_pathToData: LoaderGlobalConfig["EJS_pathToData"];
    var EJS_DEBUG_XX: LoaderGlobalConfig["EJS_DEBUG_XX"];
    var EJS_gameUrl: LoaderGlobalConfig["EJS_gameUrl"];
    var EJS_core: LoaderGlobalConfig["EJS_core"];
    var EJS_biosUrl: LoaderGlobalConfig["EJS_biosUrl"];
    var EJS_gameName: LoaderGlobalConfig["EJS_gameName"];
    var EJS_color: LoaderGlobalConfig["EJS_color"];
    var EJS_AdUrl: LoaderGlobalConfig["EJS_AdUrl"];
    var EJS_AdMode: LoaderGlobalConfig["EJS_AdMode"];
    var EJS_AdTimer: LoaderGlobalConfig["EJS_AdTimer"];
    var EJS_AdSize: LoaderGlobalConfig["EJS_AdSize"];
    var EJS_alignStartButton: LoaderGlobalConfig["EJS_alignStartButton"];
    var EJS_VirtualGamepadSettings: LoaderGlobalConfig["EJS_VirtualGamepadSettings"];
    var EJS_Buttons: LoaderGlobalConfig["EJS_Buttons"];
    var EJS_volume: LoaderGlobalConfig["EJS_volume"];
    var EJS_defaultControls: LoaderGlobalConfig["EJS_defaultControls"];
    var EJS_startOnLoaded: LoaderGlobalConfig["EJS_startOnLoaded"];
    var EJS_fullscreenOnLoaded: LoaderGlobalConfig["EJS_fullscreenOnLoaded"];
    var EJS_paths: LoaderGlobalConfig["EJS_paths"];
    var EJS_loadStateURL: LoaderGlobalConfig["EJS_loadStateURL"];
    var EJS_CacheLimit: LoaderGlobalConfig["EJS_CacheLimit"];
    var EJS_cacheConfig: LoaderGlobalConfig["EJS_cacheConfig"];
    var EJS_cheats: LoaderGlobalConfig["EJS_cheats"];
    var EJS_cheatPath: LoaderGlobalConfig["EJS_cheatPath"];
    var EJS_defaultOptions: LoaderGlobalConfig["EJS_defaultOptions"];
    var EJS_gamePatchUrl: LoaderGlobalConfig["EJS_gamePatchUrl"];
    var EJS_gameParentUrl: LoaderGlobalConfig["EJS_gameParentUrl"];
    var EJS_netplayServer: LoaderGlobalConfig["EJS_netplayServer"];
    var EJS_netplayUrl: LoaderGlobalConfig["EJS_netplayUrl"];
    var EJS_netplayICEServers: LoaderGlobalConfig["EJS_netplayICEServers"];
    var EJS_gameID: LoaderGlobalConfig["EJS_gameID"];
    var EJS_backgroundImage: LoaderGlobalConfig["EJS_backgroundImage"];
    var EJS_backgroundBlur: LoaderGlobalConfig["EJS_backgroundBlur"];
    var EJS_backgroundColor: LoaderGlobalConfig["EJS_backgroundColor"];
    var EJS_controlScheme: LoaderGlobalConfig["EJS_controlScheme"];
    var EJS_threads: LoaderGlobalConfig["EJS_threads"];
    var EJS_disableCue: LoaderGlobalConfig["EJS_disableCue"];
    var EJS_startButtonName: LoaderGlobalConfig["EJS_startButtonName"];
    var EJS_softLoad: LoaderGlobalConfig["EJS_softLoad"];
    var EJS_screenCapture: LoaderGlobalConfig["EJS_screenCapture"];
    var EJS_externalFiles: LoaderGlobalConfig["EJS_externalFiles"];
    var EJS_dontExtractRom: LoaderGlobalConfig["EJS_dontExtractRom"];
    var EJS_dontExtractBIOS: LoaderGlobalConfig["EJS_dontExtractBIOS"];
    var EJS_disableLocalStorage: LoaderGlobalConfig["EJS_disableLocalStorage"];
    var EJS_forceLegacyCores: LoaderGlobalConfig["EJS_forceLegacyCores"];
    var EJS_noAutoFocus: LoaderGlobalConfig["EJS_noAutoFocus"];
    var EJS_videoRotation: LoaderGlobalConfig["EJS_videoRotation"];
    var EJS_hideSettings: LoaderGlobalConfig["EJS_hideSettings"];
    var EJS_browserMode: LoaderGlobalConfig["EJS_browserMode"];
    var EJS_shaders: LoaderGlobalConfig["EJS_shaders"];
    var EJS_fixedSaveInterval: LoaderGlobalConfig["EJS_fixedSaveInterval"];
    var EJS_disableAutoUnload: LoaderGlobalConfig["EJS_disableAutoUnload"];
    var EJS_disableBatchBootup: LoaderGlobalConfig["EJS_disableBatchBootup"];
    var EJS_language: LoaderGlobalConfig["EJS_language"];
    var EJS_disableAutoLang: LoaderGlobalConfig["EJS_disableAutoLang"];
    var EJS_settingsLanguage: LoaderGlobalConfig["EJS_settingsLanguage"];
    var EJS_Runtime: LoaderGlobalConfig["EJS_Runtime"];
    var EJS_ready: LoaderGlobalCallbacks["EJS_ready"];
    var EJS_onGameStart: LoaderGlobalCallbacks["EJS_onGameStart"];
    var EJS_onLoadState: LoaderGlobalCallbacks["EJS_onLoadState"];
    var EJS_onSaveState: LoaderGlobalCallbacks["EJS_onSaveState"];
    var EJS_onLoadSave: LoaderGlobalCallbacks["EJS_onLoadSave"];
    var EJS_onSaveSave: LoaderGlobalCallbacks["EJS_onSaveSave"];
    var EJS_onSaveUpdate: LoaderGlobalCallbacks["EJS_onSaveUpdate"];
    var EJS_emulator: EmulatorJS | undefined;
    var EJS_adBlocked: ((url: string, del?: boolean) => void) | undefined;
}

export {};

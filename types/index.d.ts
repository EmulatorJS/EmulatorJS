import "./data/loader.js";

export { default, default as EmulatorJS } from "./data/src/emulator.js";
export * from "./data/src/emulator.js";
export * from "./data/src/cache.js";
export * from "./data/src/compression.js";
export * from "./data/src/GameManager.js";
export * from "./data/src/gamepad.js";
export * from "./data/src/storage.js";
export * from "./data/src/consts.js";
export * from "./data/src/setup.js";
export * from "./data/src/shaders.js";
export * from "./data/src/license.js";
export * from "./data/src/utils.js";

export type {
    LoaderGlobalCallbacks,
    LoaderGlobalConfig,
    RuntimeFactory,
    RuntimeModuleOptions,
} from "./data/loader.js";

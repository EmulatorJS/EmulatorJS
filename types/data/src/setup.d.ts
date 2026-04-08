import type { EmulatorJSConfig } from "./emulator.js";
import type { ShaderDefinitionMap } from "./shaders.js";

export class EJS_SETUP {
    constructor(EJS: { debug?: boolean; config: EmulatorJSConfig; shaders?: ShaderDefinitionMap });

    EJS: { debug?: boolean; config: EmulatorJSConfig; shaders?: ShaderDefinitionMap };
    debug: boolean;

    log(...args: unknown[]): void;
    checkDeprecatedSettings(): void;
    cacheDefaults(): void;
    browserMode(): void;
    shaders(): void;
}

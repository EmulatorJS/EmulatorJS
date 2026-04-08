export type ShaderValueType = "text" | "base64";

export interface ShaderTextAsset {
    type: ShaderValueType;
    value: string;
}

export interface ShaderResource extends ShaderTextAsset {
    name: string;
}

export interface ShaderBundle {
    shader: ShaderTextAsset;
    resources?: ShaderResource[];
}

export type ShaderDefinition = string | ShaderBundle;
export type ShaderDefinitionMap = Record<string, ShaderDefinition>;

export const EJS_SHADERS: ShaderDefinitionMap;

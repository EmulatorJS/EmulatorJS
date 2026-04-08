export type CompressionMethod = "7z" | "zip" | "rar";
export type CompressionFileCallback = (filename: string, fileData: Uint8Array | ArrayBuffer) => void;
export type CompressionProgressCallback = (message: string, isProgress?: boolean) => void;

export class EJS_COMPRESSION {
    constructor(EJS: unknown);

    EJS: unknown;

    isCompressed(data: Uint8Array | ArrayBuffer): CompressionMethod | null;

    decompress(
        data: Uint8Array | ArrayBuffer,
        updateMsg?: CompressionProgressCallback,
        fileCbFunc?: CompressionFileCallback,
    ): Promise<Record<string, Uint8Array | ArrayBuffer | true>>;

    getWorkerFile(method: CompressionMethod): Promise<Blob>;

    decompressFile(
        method: CompressionMethod,
        data: Uint8Array | ArrayBuffer,
        updateMsg?: CompressionProgressCallback,
        fileCbFunc?: CompressionFileCallback,
    ): Promise<Record<string, Uint8Array | ArrayBuffer | true>>;
}

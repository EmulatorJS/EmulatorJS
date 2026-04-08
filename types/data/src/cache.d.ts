export type DownloadResponseType = "arraybuffer" | "blob" | "formData" | "json" | "text";
export type DownloadProgressStatus = "downloading" | "decompressing" | "complete";

export type DownloadProgressCallback = (
    status: DownloadProgressStatus,
    percentage: number,
    loaded: number,
    total: number,
) => void;

export type DownloadCompleteCallback = (
    success: boolean,
    result: EJS_CacheItem | string | unknown,
) => void;

export class EJS_Download {
    constructor(storageCache?: EJS_Cache | null, EJS?: unknown);

    storageCache: EJS_Cache | null;
    EJS: unknown;

    handleNonHttpUrl(
        url: string,
        type: string,
        method?: string,
        responseType?: DownloadResponseType,
    ): Promise<EJS_CacheItem | null>;

    downloadFile(
        url: string,
        type: string,
        method?: string,
        headers?: HeadersInit,
        body?: BodyInit | null,
        onProgress?: DownloadProgressCallback | null,
        onComplete?: DownloadCompleteCallback | null,
        timeout?: number,
        responseType?: DownloadResponseType,
        forceExtract?: boolean,
        dontCache?: boolean,
    ): Promise<EJS_CacheItem | null>;
}

export class EJS_Cache {
    constructor(
        enabled?: boolean,
        databaseName?: string,
        maxSizeMB?: number,
        maxAgeMins?: number,
        debug?: boolean,
    );

    enabled: boolean;
    databaseName: string | undefined;
    maxSizeMB: number;
    maxAgeMins: number;
    minAgeMins: number;
    debug: boolean;
    startupCleanupCompleted: boolean;

    createCacheDatabase(): Promise<void>;
    generateCacheKey(dataArray: Uint8Array): string;
    get(key: string, metadataOnly?: boolean, indexName?: string | null): Promise<EJS_CacheItem | null>;
    put(item: EJS_CacheItem): Promise<void>;
    delete(key: string): Promise<void>;
    clear(): Promise<void>;
    cleanup(): Promise<void>;
}

export class EJS_CacheItem {
    constructor(
        key: string,
        files: EJS_FileItem[],
        added: number,
        type?: string,
        responseType?: DownloadResponseType,
        filename?: string,
        url?: string,
        cacheExpiry?: number | null,
    );

    key: string;
    files: EJS_FileItem[];
    added: number;
    lastAccessed: number;
    type: string;
    responseType: DownloadResponseType | undefined;
    filename: string | undefined;
    url: string | undefined;
    cacheExpiry: number | null | undefined;
    fileSize?: number;
    source?: string;

    size(): number;
}

export class EJS_FileItem {
    constructor(filename: string, bytes: Uint8Array);

    filename: string;
    bytes: Uint8Array;
}

export class EJS_STORAGE<TValue = unknown> {
    constructor(dbName: string, storeName: string, indexes?: string[] | null);

    dbName: string;
    storeName: string;
    indexes: string[] | null;

    addFileToDB(key: string, add: boolean): void;
    getObjectStore(mode?: IDBTransactionMode): Promise<IDBObjectStore | undefined>;
    get<T = TValue>(key: IDBValidKey | unknown, indexName?: string | null): Promise<T | undefined>;
    put(key: IDBValidKey | unknown, data: TValue): Promise<void>;
    remove(key: IDBValidKey | unknown): Promise<void>;
    getSizes(): Promise<Record<string, number>>;
    getAll<T = TValue>(): Promise<T[]>;
    getKeys(): Promise<string[]>;
}

export class EJS_DUMMYSTORAGE {
    constructor();

    addFileToDB(key?: string, add?: boolean): Promise<void>;
    get<T = unknown>(key?: IDBValidKey | unknown, indexName?: string | null): Promise<T | undefined>;
    put(key?: IDBValidKey | unknown, data?: unknown): Promise<void>;
    remove(key?: IDBValidKey | unknown): Promise<void>;
    getSizes(): Promise<Record<string, number>>;
}

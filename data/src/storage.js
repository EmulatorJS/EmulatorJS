/**
 * Thin wrapper around a single IndexedDB object store.
 * Handles opening the database and provides get/put/remove/getAll helpers.
 * Each instance is scoped to one store name within a named database.
 */
class EJS_STORAGE {
    /**
     * @param {string} dbName - The IndexedDB database name to open.
     * @param {string} storeName - The object store name to use within that database.
     * @param {string[]?} indexes - Optional array of field names to create non-unique indexes on.
     */
    constructor(dbName, storeName, indexes = null) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.indexes = indexes;
    }
    /**
     * Tracks which primary keys have stored data by maintaining a `?EJS_KEYS!` index record.
     * Called internally after every put or remove. Skipped for the index record itself.
     * @param {string} key - The primary key that was added or removed.
     * @param {boolean} add - True to register the key, false to deregister it.
     */
    addFileToDB(key, add) {
        (async () => {
            if (key === "?EJS_KEYS!") return;
            let keys = await this.get("?EJS_KEYS!");
            if (!keys) keys = [];
            if (add) {
                if (!keys.includes(key)) keys.push(key);
            } else {
                const index = keys.indexOf(key);
                if (index !== -1) keys.splice(index, 1);
            }
            this.put("?EJS_KEYS!", keys);
        })();
    }
    /**
     * Opens the database and resolves with the named object store inside a new transaction.
     * Resolves with undefined instead of rejecting when IndexedDB is unavailable.
     * @param {IDBTransactionMode} [mode="readwrite"] - The transaction mode to use.
     * @returns {Promise<IDBObjectStore|undefined>} The opened object store, or undefined on failure.
     */
    getObjectStore(mode = "readwrite") {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) return resolve();
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => resolve();
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction(this.storeName, mode);
                let objectStore = transaction.objectStore(this.storeName);
                resolve(objectStore);
            };
            openRequest.onupgradeneeded = () => {
                let db = openRequest.result;
                let objectStore;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    objectStore = db.createObjectStore(this.storeName);
                } else {
                    objectStore = openRequest.transaction.objectStore(this.storeName);
                }
                // Create indexes if provided
                if (this.indexes && Array.isArray(this.indexes)) {
                    for (const idx of this.indexes) {
                        if (!objectStore.indexNames.contains(idx)) {
                            objectStore.createIndex(idx, idx, { unique: false });
                        }
                    }
                }
            };
        });
    }
    /**
     * Get a value by key or by index.
     * @param {string|any} key - The key or index value to search for
     * @param {string|null} indexName - Optional index name to search by
     * @returns {Promise<any>}
     */
    get(key, indexName = null) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.getObjectStore();
            if (!objectStore) return resolve();
            if (!indexName) {
                // Default: get by primary key
                let request = objectStore.get(key);
                request.onsuccess = () => resolve(request.result);
                request.onerror = () => resolve();
            } else {
                // Get by index
                try {
                    const index = objectStore.index(indexName);
                    let req = index.get(key);
                    req.onsuccess = () => resolve(req.result);
                    req.onerror = () => resolve();
                } catch (e) {
                    // Index not found
                    resolve();
                }
            }
        });
    }
    /**
     * Stores a value under the given primary key and registers the key in the index.
     * @param {string} key - The primary key to store the value under.
     * @param {*} data - The value to persist.
     * @returns {Promise<void>}
     */
    put(key, data) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.getObjectStore();
            if (!objectStore) return resolve();
            let request = objectStore.put(data, key);
            request.onerror = () => resolve();
            request.onsuccess = () => {
                this.addFileToDB(key, true);
                resolve();
            };
        });
    }
    /**
     * Deletes the record for the given key and removes it from the index.
     * @param {string} key - The primary key to delete.
     * @returns {Promise<void>}
     */
    remove(key) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.getObjectStore();
            if (!objectStore) return resolve();
            let request = objectStore.delete(key);
            this.addFileToDB(key, false);
            request.onsuccess = () => resolve();
            request.onerror = () => {};
        });
    }
    /**
     * Returns a map of primary key → byte length for every tracked record that has a `.data` ArrayBuffer.
     * @returns {Promise<Object.<string, number>>} Map of key to byte size.
     */
    getSizes() {
        return new Promise(async (resolve, reject) => {
            if (!window.indexedDB) resolve({});
            const keys = await this.get("?EJS_KEYS!");
            if (!keys) return resolve({});
            let rv = {};
            for (let i = 0; i < keys.length; i++) {
                const result = await this.get(keys[i]);
                if (!result || !result.data || typeof result.data.byteLength !== "number") continue;
                rv[keys[i]] = result.data.byteLength;
            }
            resolve(rv);
        })
    }
    /**
     * Retrieves every tracked record in the store as an array.
     * @returns {Promise<any[]>} Array of all stored values, excluding the key index record.
     */
    getAll() {
        return new Promise(async (resolve, reject) => {
            if (!window.indexedDB) return resolve([]);
            const keys = await this.get("?EJS_KEYS!");
            if (!keys) return resolve([]);
            let rv = [];
            for (let i = 0; i < keys.length; i++) {
                const result = await this.get(keys[i]);
                if (!result) continue;
                rv.push(result);
            }
            resolve(rv);
        });
    }
    /**
     * Returns all tracked primary keys in the store.
     * @returns {Promise<string[]>} Array of primary keys, excluding the internal index key.
     */
    getKeys() {
        return new Promise(async (resolve, reject) => {
            if (!window.indexedDB) return resolve([]);
            const keys = await this.get("?EJS_KEYS!");
            if (!keys) return resolve([]);
            resolve(keys);
        });
    }
}

/**
 * No-op storage class used as a drop-in replacement for EJS_STORAGE when IndexedDB
 * is disabled or unavailable. All methods resolve immediately with empty results.
 */
class EJS_DUMMYSTORAGE {
    constructor() {}
    /** @returns {Promise<void>} */
    addFileToDB() {
        return new Promise(resolve => resolve());
    }
    /** @returns {Promise<undefined>} */
    get() {
        return new Promise(resolve => resolve());
    }
    /** @returns {Promise<void>} */
    put() {
        return new Promise(resolve => resolve());
    }
    /** @returns {Promise<void>} */
    remove() {
        return new Promise(resolve => resolve());
    }
    /** @returns {Promise<{}>} */
    getSizes() {
        return new Promise(resolve => resolve({}));
    }
}

export { EJS_STORAGE, EJS_DUMMYSTORAGE };

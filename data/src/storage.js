class EJS_STORAGE {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
    }
    #addFileToDB(key, add) {
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
    #getObjectStore(mode = "readwrite") {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) return resolve();
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => resolve();
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], mode);
                let objectStore = transaction.objectStore(this.storeName);
                resolve(objectStore);
            };
            openRequest.onupgradeneeded = () => {
                let db = openRequest.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                }
            };
        });
    }
    get(key) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.#getObjectStore();
            if (!objectStore) return resolve();
            let request = objectStore.get(key);
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => resolve();
        });
    }
    put(key, data) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.#getObjectStore();
            if (!objectStore) return resolve();
            let request = objectStore.put(data, key);
            request.onerror = () => resolve();
            request.onsuccess = () => {
                this.#addFileToDB(key, true);
                resolve();
            };
        });
    }
    remove(key) {
        return new Promise(async (resolve, reject) => {
            const objectStore = await this.#getObjectStore();
            if (!objectStore) return resolve();
            let request = objectStore.delete(key);
            this.#addFileToDB(key, false);
            request.onsuccess = () => resolve();
            request.onerror = () => {};
        });
    }
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
    getKeys() {
        return new Promise(async (resolve, reject) => {
            if (!window.indexedDB) return resolve([]);
            const keys = await this.get("?EJS_KEYS!");
            if (!keys) return resolve([]);
            resolve(keys);
        });
    }
}

class EJS_DUMMYSTORAGE {
    constructor() {}
    #addFileToDB() {
        return new Promise(resolve => resolve());
    }
    get() {
        return new Promise(resolve => resolve());
    }
    put() {
        return new Promise(resolve => resolve());
    }
    remove() {
        return new Promise(resolve => resolve());
    }
    getSizes() {
        return new Promise(resolve => resolve({}));
    }
}

window.EJS_STORAGE = EJS_STORAGE;
window.EJS_DUMMYSTORAGE = EJS_DUMMYSTORAGE;

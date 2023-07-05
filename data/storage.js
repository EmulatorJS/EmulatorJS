class EJS_STORAGE {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
    }
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
    get(key) {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) return resolve();
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => resolve();
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request = objectStore.get(key);
                request.onsuccess = (e) => {
                    resolve(request.result);
                };
                request.onerror = () => resolve();
            };
            openRequest.onupgradeneeded = () => {
                let db = openRequest.result;
                if (! db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                };
            };
        });
    }
    put(key, data) {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) return resolve();
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => {};
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request = objectStore.put(data, key);
                request.onerror = () => resolve();
                request.onsuccess = () => {
                    this.addFileToDB(key, true);
                    resolve();
                }
            };
            openRequest.onupgradeneeded = () => {
                let db = openRequest.result;
                if (! db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                };
            };
        })
    }
    remove(key) {
        return new Promise((resolve, reject) => {
            if (!window.indexedDB) return resolve();
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => {};
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request2 = objectStore.delete(key);
                this.addFileToDB(key, false);
                request2.onsuccess = () => resolve();
                request2.onerror = () => {};
            };
            openRequest.onupgradeneeded = () => {
                let db = openRequest.result;
                if (! db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName);
                };
            };
        });
    }
    getSizes() {
        return new Promise(async (resolve, reject) => {
            if (!window.indexedDB) resolve({});
            const keys = await this.get("?EJS_KEYS!");
            if (!keys) return resolve({});
            let rv = {};
            for (let i=0; i<keys.length; i++) {
                const result = await this.get(keys[i]);
                if (!result || !result.data || typeof result.data.byteLength !== "number") continue;
                rv[keys[i]] = result.data.byteLength;
            }
            resolve(rv);
        })
    }
}
window.EJS_STORAGE = EJS_STORAGE;

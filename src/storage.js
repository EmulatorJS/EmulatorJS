class EJS_STORAGE {
    constructor(dbName, storeName) {
        this.dbName = dbName;
        this.storeName = storeName;
    }
    get(key) {
        return new Promise((resolve, reject) => {
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => {};
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request = objectStore.get(key);
                request.onsuccess = async (e) => {
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
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => {};
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request = objectStore.put(data, key);
                request.onerror = () => resolve();
                request.onsuccess = () => resolve();
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
            let openRequest = indexedDB.open(this.dbName, 1);
            openRequest.onerror = () => {};
            openRequest.onsuccess = () => {
                let db = openRequest.result;
                let transaction = db.transaction([this.storeName], "readwrite");
                let objectStore = transaction.objectStore(this.storeName);
                let request2 = objectStore.delete(key);
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
}
window.EJS_STORAGE = EJS_STORAGE;

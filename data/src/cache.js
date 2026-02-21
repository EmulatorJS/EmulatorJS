/**
 * EJS Download Manager
 * Downloads files from a given URL when a download is requested.
 * The file is checked against the cache to avoid re-downloading files unnecessarily.
 * The following rules are tested when checking for an update:
 * 1. The URL is checked against the cache - if it doesn't exist, download it
 * 2. The cacheExpiry property is checked - if it exists and is in the future, use the cached version. Note: the cacheExpiry property is sent by the server in the Cache-Control or Expires headers. If these headers are not present, the cacheExpiry property will be set to 5 days in the future by default.
 * 3. If the cacheExpiry property is in the past or doesn't exist, a HEAD request is made to check the Last-Modified header against the cached version's added date. Falling back to downloading if Last-Modified is not present.
 * 4. If the Last-Modified date is newer than the cached version's added date, download the new version.
 * 5. If none of the above conditions are met, use the cached version.
 */
class EJS_Download {
    /**
     * Creates an instance of EJS_Download.
     * @param {EJS_Cache} storageCache - The cache instance to use for storing downloaded files.
     * @param {Object} EJS - The main EmulatorJS instance.
     */
    constructor(storageCache = null, EJS = null) {
        this.storageCache = storageCache;
        this.EJS = EJS;
    }

    /**
     * Handles downloading non-http(s) URLs (blob:, data:, file:, etc.)
     * @param {string} url - The non-http(s) URL to fetch
     * @param {string} type - The type of the file
     * @param {string} method - The HTTP method (HEAD returns empty, others fetch)
     * @param {string} responseType - The response type ("arraybuffer" or "text")
     * @returns {Promise<EJS_CacheItem|null>} - The fetched data as a cache item, or null for HEAD requests
     */
    async handleNonHttpUrl(url, type, method = "GET", responseType = "arraybuffer") {
        console.log("[EJS Download] Handling non-http(s) URL:", url);
        
        if (method === "HEAD") {
            // HEAD requests just return empty for non-http URLs
            return null;
        }

        try {
            let res = await fetch(url);
            let data;
            
            if (responseType === "arraybuffer" || !responseType) {
                data = await res.arrayBuffer();
                data = new Uint8Array(data);
            } else {
                data = await res.text();
                // Try to parse as JSON if it looks like JSON
                try { data = JSON.parse(data) } catch(e) {}
            }
            
            // Clean up blob URLs to free memory
            if (url.startsWith("blob:")) {
                URL.revokeObjectURL(url);
            }
            
            // Create a cache item for consistency
            const filename = url.split("/").pop() || "downloaded.bin";
            const now = Date.now();
            
            // Ensure data is Uint8Array for file item
            let fileData;
            if (data instanceof Uint8Array) {
                fileData = data;
            } else if (typeof data === "string") {
                const encoder = new TextEncoder();
                fileData = encoder.encode(data);
            } else if (data instanceof ArrayBuffer) {
                fileData = new Uint8Array(data);
            } else {
                const encoder = new TextEncoder();
                fileData = encoder.encode(String(data));
            }
            
            const files = [new EJS_FileItem(filename, fileData)];
            const key = this.storageCache ? this.storageCache.generateCacheKey(fileData) : "temp-" + Date.now();
            
            // Don't cache non-http URLs (they're typically temporary or special)
            return new EJS_CacheItem(key, files, now, type, responseType, filename, url, null);
        } catch(e) {
            console.error("[EJS Download] Failed to fetch non-http URL:", url, e);
            throw new Error(`Failed to fetch non-http URL: ${e}`);
        }
    }

    /**
     * Downloads a file from the given URL with the specified options.
     * Automatically detects and handles both http(s) and non-http(s) URLs (blob:, data:, etc.)
     * @param {string} url - The URL to download the file from.
     * @param {string} type - The type of the file to download (e.g. "ROM", "CORE", "BIOS", etc).
     * @param {string} method - The HTTP method to use (default is "GET").
     * @param {Array} headers - An array of headers to include in the request.
     * @param {*} body - The body of the request (for POST/PUT requests).
     * @param {*} onProgress - Callback function for progress updates - returns status(downloading or decompressing), percentage, loaded bytes, total bytes.
     * @param {*} onComplete - Callback function when download is complete - returns success boolean, response data or error message.
     * @param {Number} timeout - Timeout in milliseconds (default is 30000ms).
     * @param {string} responseType - The response type (default is "arraybuffer").
     * @param {boolean} forceExtract - Whether to force extraction of compressed files regardless of extension (default is false).
     * @param {boolean} dontCache - If true, the downloaded file will not be cached (default is false).
     * @returns {Promise<EJS_CacheItem>} - The downloaded file as an EJS_CacheItem.
     */
    downloadFile(url, type, method = "GET", headers = {}, body = null, onProgress = null, onComplete = null, timeout = 30000, responseType = "arraybuffer", forceExtract = false, dontCache = false) {
        let cacheActiveText = " (cache usage requested)"
        if (dontCache) {
            cacheActiveText = "";
        }
        console.log("[EJS Download] Downloading " + responseType + " file: " + url + cacheActiveText);
        return new Promise(async (resolve, reject) => {
            try {
                // Check if this is a non-http(s) URL (blob:, data:, file:, etc.)
                let urlObj;
                try { urlObj = new URL(url) } catch(e) {};
                
                if (urlObj && !["http:", "https:"].includes(urlObj.protocol)) {
                    // Handle non-http(s) URLs directly
                    const result = await this.handleNonHttpUrl(url, type, method, responseType);
                    resolve(result);
                    return;
                }

                // Use the provided storageCache or create a temporary one
                if (!this.storageCache) {
                    console.warn("No storageCache provided to EJS_Download, downloads will not be cached");
                }

                let cached = null;
                if (this.storageCache) {
                    cached = await this.storageCache.get(url, false, "url");
                }
                const now = Date.now();
                if (cached) {
                    if (cached.cacheExpiry && cached.cacheExpiry > now) {
                        if (this.debug) console.log("Using cached version of", url);
                        resolve(cached);
                        return;
                    }
                    let lastModified = null;
                    try {
                        const headResp = await fetch(url, { method: "HEAD", headers });
                        lastModified = headResp.headers.get("Last-Modified");
                    } catch (e) { }
                    if (lastModified) {
                        const lastModTime = Date.parse(lastModified);
                        if (!isNaN(lastModTime) && lastModTime <= cached.added) {
                            if (this.debug) console.log("Using cached version of", url);
                            resolve(cached);
                            return;
                        }
                    } else {
                        if (this.debug) console.log("Using cached version of", url);
                        resolve(cached);
                        return;
                    }
                }

                if (onProgress) onProgress("downloading", 0, 0, 0);
                let controller = new AbortController();
                let timer = setTimeout(() => controller.abort(), timeout);
                let resp, data, filename = url.split("/").pop() || "downloaded.bin";
                let cacheExpiry = null;
                try {
                    resp = await fetch(url, {
                        method,
                        headers,
                        body,
                        signal: controller.signal
                    });
                    clearTimeout(timer);
                    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
                    const cd = resp.headers.get("Content-Disposition");
                    if (cd) {
                        const match = cd.match(/filename="?([^";]+)"?/);
                        if (match) filename = match[1];
                    }
                    const cacheControl = resp.headers.get("Cache-Control");
                    const expires = resp.headers.get("Expires");
                    if (cacheControl && /max-age=(\d+)/.test(cacheControl)) {
                        const maxAge = parseInt(cacheControl.match(/max-age=(\d+)/)[1]);
                        cacheExpiry = now + maxAge * 1000;
                    } else if (expires) {
                        const exp = Date.parse(expires);
                        if (!isNaN(exp)) cacheExpiry = exp;
                    } else {
                        // default to 5 days if no cache headers present
                        cacheExpiry = now + 5 * 24 * 60 * 60 * 1000;
                    }
                    if (responseType === "arraybuffer") {
                        let contentLength = 0;
                        if (resp.headers.get("Content-Length")) {
                            try {
                                const parsedContentLength = parseInt(resp.headers.get("Content-Length"));
                                if (!isNaN(parsedContentLength) && parsedContentLength > 0) {
                                    contentLength = parsedContentLength;
                                }
                            } catch (e) {
                                // swallow any errors parsing content length
                            }
                        }
                        const reader = resp.body.getReader();
                        let received = 0;
                        let chunks = [];
                        while (true) {
                            const { done, value } = await reader.read();
                            if (done) break;
                            chunks.push(value);
                            received += value.length;
                            if (onProgress && contentLength) {
                                onProgress("downloading", Math.floor(received / contentLength * 100), received, contentLength);
                            }
                        }
                        
                        const blob = new Blob(chunks);
                        const ab = await blob.arrayBuffer();
                        data = new Uint8Array(ab);
                    } else {
                        data = await resp[responseType]();
                    }
                } catch (err) {
                    clearTimeout(timer);
                    reject(`Download failed: ${err}`);
                    return;
                }

                let files = [];
                const ext = filename.toLowerCase().split('.').pop();
                if (responseType === "arraybuffer") {
                    if (["zip", "7z", "rar"].includes(ext) || forceExtract) {
                        if (onProgress) onProgress("decompressing", 0, 0, 0);
                        try {
                            const compression = new window.EJS_COMPRESSION(this.EJS);
                            await compression.decompress(data, (msg, isProgress) => {
                                if (onProgress && isProgress) {
                                    const percent = parseInt(msg);
                                    onProgress("decompressing", isNaN(percent) ? 0 : percent, 0, 0);
                                }
                            }, (fname, fileData) => {
                                files.push(new EJS_FileItem(fname, fileData instanceof Uint8Array ? fileData : new Uint8Array(fileData)));
                            });
                        } catch (e) {
                            reject(`Decompression failed: ${e}`);
                            return;
                        }
                    } else {
                        files = [new EJS_FileItem(filename, data instanceof Uint8Array ? data : new Uint8Array(data))];
                    }
                } else {
                    // for non-arraybuffer types, just store the raw data as a single file
                    files = [new EJS_FileItem(filename, data)];
                    if (typeof data === "string") {
                        // Encode string as UTF-8 Uint8Array
                        const encoder = new TextEncoder();
                        files = [new EJS_FileItem(filename, encoder.encode(data))];
                    } else if (data instanceof Uint8Array) {
                        files = [new EJS_FileItem(filename, data)];
                    } else if (data instanceof ArrayBuffer) {
                        files = [new EJS_FileItem(filename, new Uint8Array(data))];
                    } else {
                        // Fallback: try to convert to string then encode
                        const encoder = new TextEncoder();
                        files = [new EJS_FileItem(filename, encoder.encode(String(data)))];
                    }
                }

                if (onProgress) onProgress("complete", 100, data.byteLength || 0, data.byteLength || 0);

                // Store in cache if available
                if (this.storageCache) {
                    const key = this.storageCache.generateCacheKey(files[0].bytes);
                    const cacheItem = new EJS_CacheItem(key, files, now, type, responseType, filename, url, cacheExpiry);
                    if (dontCache === false) {
                        await this.storageCache.put(cacheItem);
                    }
                    resolve(cacheItem);
                } else {
                    // Return a temporary cache item if no cache available
                    const key = "temp-" + Date.now();
                    const cacheItem = new EJS_CacheItem(key, files, now, type, responseType, filename, url, cacheExpiry);
                    resolve(cacheItem);
                }
            } catch (err) {
                reject(err.toString());
            }
        });
    }
}

/**
 * EJS_Cache
 * Manages a cache of files using IndexedDB for storage.
 */
class EJS_Cache {
    /**
     * Creates an instance of EJS_Cache.
     * @param {boolean} enabled - Whether caching is enabled.
     * @param {string} databaseName - Name of the IndexedDB database to use for caching.
     * @param {number} maxSizeMB - Maximum size of the cache in megabytes.
     * @param {number} maxAgeMins - Maximum age of items (in minutes) before they are cleaned up.
     */
    constructor(enabled = true, databaseName, maxSizeMB = 4096, maxAgeMins = 7200, debug = false) {
        this.enabled = enabled;
        this.databaseName = databaseName;
        this.maxSizeMB = maxSizeMB;
        this.maxAgeMins = maxAgeMins;
        this.minAgeMins = Math.max(60, maxAgeMins * 0.1); // Minimum 1 hour, or 10% of max age
        this.debug = debug;

        this.utils = new EJS_UTILS();

        /**
        * Indicates whether the startup cleanup has been completed.
        */
        this.startupCleanupCompleted = false;

        if (this.debug) {
            console.log("Initialized EJS_Cache with settings:", {
                enabled: this.enabled,
                databaseName: this.databaseName,
                maxSizeMB: this.maxSizeMB,
                maxAgeMins: this.maxAgeMins,
                minAgeMins: this.minAgeMins
            });
        }
    }

    /**
     * Initializes the IndexedDB database and object stores.
     * @returns {Promise<void>}
     */
    async createCacheDatabase() {
        if (!this.enabled) return;

        if (this.storage && this.blobStorage) return;

        return new Promise((resolve, reject) => {
            const indexes = ["type", "url"];
            const request = window.indexedDB.open(this.databaseName, 1);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                // Create metadata stores
                const cacheStore = db.createObjectStore("cache");
                // Create indexes for cache store if indexes array is present
                if (Array.isArray(indexes)) {
                    for (const idx of indexes) {
                        if (!cacheStore.indexNames.contains(idx)) {
                            cacheStore.createIndex(idx, idx, { unique: false });
                        }
                    }
                }
                // Create blobs store
                db.createObjectStore("blobs");
            };

            request.onsuccess = (event) => {
                this.storage = new EJS_STORAGE(this.databaseName, "cache", indexes);
                this.blobStorage = new EJS_STORAGE(this.databaseName, "blobs");
                resolve();
            };

            request.onerror = (event) => {
                console.error("Error creating cache database:", event);
                reject(event);
            };
        });
    }

    /**
     * Generates a cache key for the given data array.
     * @param {Uint8Array} dataArray 
     * @returns {string} The generated cache key.
     */
    generateCacheKey(dataArray) {
        let hash = this.utils.simpleHash(dataArray);
        const compressionCacheKey = "Obj-" + hash + "-" + dataArray.length;
        return compressionCacheKey;
    }

    /**
     * Retrieves an item from the cache.
     * @param {*} key - The unique key identifying the cached item.
     * @param {boolean} [metadataOnly=false] - If true, only retrieves metadata without file data.
     * @param {string|null} indexName - Optional index name to search by (e.g., 'url') - leave null to search by primary key.
     * @returns {Promise<EJS_CacheItem|null>} - The cached item or null if not found.
     */
    async get(key, metadataOnly = false, indexName = null) {
        if (!this.enabled) return null;

        // ensure database is created
        await this.createCacheDatabase();

        // clean up cache on first get if not already done
        if (!this.startupCleanupCompleted) {
            await this.cleanup();
            this.startupCleanupCompleted = true;
        }

        const item = await this.storage.get(key, indexName);
        // if the item exists, update its lastAccessed time and return cache item
        if (item) {
            item.lastAccessed = Date.now();
            await this.storage.put(item.key, item);

            if (!metadataOnly) {
                // get the blob from cache-blobs
                item.files = await this.blobStorage.get(item.key);
            }
        }

        if (item) {
            const cacheItem = new EJS_CacheItem(item.key, item.files, item.added, item.type, item.responseType, item.filename, item.url, item.cacheExpiry, item.lastAccessed);
            cacheItem.source = "cache";
            return cacheItem;
        }
        return null;
    }

    /**
     * Stores an item in the cache.
     * @param {EJS_CacheItem} item - The cache item to store.
     */
    async put(item) {
        if (!this.enabled) return;

        // ensure database is created
        await this.createCacheDatabase();

        // before putting, ensure item is of type EJS_CacheItem
        if (!(item instanceof EJS_CacheItem)) {
            throw new Error("Item must be an instance of EJS_CacheItem");
        }

        // check if the item exists, if so remove the existing item
        const existingItem = await this.get(item.key);
        if (existingItem) {
            await this.delete(item.key);
        }

        // add file size attribute
        item.fileSize = item.size();

        // check that the size of item.files does not cause the cache to exceed maxSizeMB
        let currentSize = 0;
        const allItems = await this.storage.getAll();
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i]) {
                currentSize += allItems[i].fileSize || 0;
            }
        }
        if ((currentSize + item.fileSize) > (this.maxSizeMB * 1024 * 1024)) {
            // exceeded max size, keep removing oldest items until we are under maxSizeMB + the size of the new item
            const itemsToRemove = [];
            let sizeToFree = (currentSize + item.fileSize) - (this.maxSizeMB * 1024 * 1024);
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i]) {
                    itemsToRemove.push({ item: allItems[i], size: allItems[i].fileSize || 0 });
                }
            }
            itemsToRemove.sort((a, b) => a.item.lastAccessed - b.item.lastAccessed); // oldest first
            for (let i = 0; i < itemsToRemove.length; i++) {
                if (sizeToFree <= 0) break;
                await this.delete(itemsToRemove[i].item.key);
                sizeToFree -= itemsToRemove[i].size;
            }
        }

        // store the metadata in cache
        await this.storage.put(item.key, {
            key: item.key,
            fileSize: item.fileSize,
            added: item.added,
            lastAccessed: item.lastAccessed,
            type: item.type,
            responseType: item.responseType,
            filename: item.filename,
            url: item.url,
            cacheExpiry: item.cacheExpiry
        });

        // store the files in cache-blobs
        await this.blobStorage.put(item.key, item.files);
    }

    /**
     * Deletes an item from the cache.
     * @param {string} key - The unique key identifying the cached item to delete.
     */
    async delete(key) {
        // ensure database is created
        await this.createCacheDatabase();

        // fail silently if the key does not exist
        try {
            await this.storage.remove(key);
            await this.blobStorage.remove(key);
        } catch (e) {
            console.error("Failed to delete cache item:", e);
        }
    }

    /**
     * Clears all items from the cache.
     */
    async clear() {
        // ensure database is created
        await this.createCacheDatabase();

        const allItems = await this.storage.getAll();
        for (let i = 0; i < allItems.length; i++) {
            await this.delete(allItems[i].key);
        }
    }

    /**
     * Cleans up the cache by removing old or excess items based on size and age constraints.
     */
    async cleanup() {
        if (!this.enabled) return;

        // ensure database is created
        await this.createCacheDatabase();

        if (this.debug) console.log("[EJS Cache] Starting cache cleanup...");
        const cleanupStartTime = performance.now();

        // get all items
        const allItems = await this.storage.getAll();
        const now = Date.now();

        // sort items by lastAccessed (oldest first)
        allItems.sort((a, b) => a.lastAccessed - b.lastAccessed);

        let currentSize = 0;
        let totalItems = allItems.length;
        const itemsToRemove = [];

        // Calculate current total size
        for (let i = 0; i < allItems.length; i++) {
            const item = allItems[i];
            const itemSize = item.fileSize || 0;
            currentSize += itemSize;
            const ageMins = (now - item.lastAccessed) / (1000 * 60);

            // Remove if too old OR if cache is over size limit and item is old enough
            if (ageMins > this.maxAgeMins || (currentSize > this.maxSizeMB * 1024 * 1024 && ageMins > this.minAgeMins)) {
                itemsToRemove.push({ key: item.key, size: itemSize, age: ageMins });
                currentSize -= itemSize;
            }
        }

        // remove items from storage
        for (const item of itemsToRemove) {
            await this.delete(item.key);
        }

        // remove orphaned blobs in blobStorage - here as a failsafe in case of previous incomplete deletions
        const blobKeys = await this.blobStorage.getKeys();
        for (const blobKey of blobKeys) {
            const existsInStorage = allItems.find(item => item.key === blobKey);
            if (!existsInStorage) {
                await this.blobStorage.remove(blobKey);
            }
        }

        const cleanupTime = performance.now() - cleanupStartTime;
        const currentSizeMB = (currentSize / (1024 * 1024)).toFixed(2);
        const removedSizeMB = (itemsToRemove.reduce((sum, item) => sum + item.size, 0) / (1024 * 1024)).toFixed(2);

        if (this.debug) console.log("[EJS Cache] Cleanup complete in " + cleanupTime.toFixed(2) + "ms - Removed " + itemsToRemove.length + "/" + totalItems + " items (" + removedSizeMB + "MB), " + currentSizeMB + "MB remaining");
    }
}

/**
 * EJS_CacheItem
 * Represents a single cached item in the EJS_Cache system.
 * Contains metadata about the cached item. This class is an internal structure used by EJS_Cache.
 */
class EJS_CacheItem {
    /**
     * Creates an instance of EJS_CacheItem.
     * @param {string} key - Unique identifier for the cached item.
     * @param {EJS_FileItem[]} files - array of EJS_FileItem objects representing the files associated with this cache item.
     * @param {number} added - Timestamp (in milliseconds) when the item was added to the cache.
     * @param {string} type - The type of cached content (e.g., 'core', 'ROM', 'BIOS', 'decompressed').
     * @param {string} responseType - The response type used when downloading the content (e.g., 'arraybuffer', 'blob', 'text').
     * @param {string} filename - The original filename of the cached content.
     * @param {string} url - The URL from which the cached content was downloaded.
     * @param {number|null} cacheExpiry - Timestamp (in milliseconds) indicating when the cache item should expire.
     */
    constructor(key, files, added, type = "unknown", responseType, filename, url, cacheExpiry) {
        this.key = key;
        this.files = files;
        this.added = added;
        this.lastAccessed = added;
        this.type = type;
        this.responseType = responseType;
        this.filename = filename;
        this.url = url;
        this.cacheExpiry = cacheExpiry;
    }

    /**
     * Calculates the total size of all files in this cache item.
     * @returns {number} - Total size in bytes.
     */
    size() {
        let total = 0;
        for (let i = 0; i < this.files.length; i++) {
            if (this.files[i] && this.files[i].bytes && typeof this.files[i].bytes.byteLength === "number") {
                total += this.files[i].bytes.byteLength;
            }
        }
        return total;
    }
}

/**
 * EJS_FileItem
 * Represents a single file stored in the cache. This class is an internal structure used by EJS_CacheItem.
 */
class EJS_FileItem {
    /**
     * Creates an instance of EJS_FileItem.
     * @param {string} filename - Name of the file.
     * @param {Uint8Array} bytes - Byte array representing the file's data.
     */
    constructor(filename, bytes) {
        this.filename = filename;
        this.bytes = bytes;
    }
}

window.EJS_Cache = EJS_Cache;
window.EJS_CacheItem = EJS_CacheItem;
window.EJS_FileItem = EJS_FileItem;
window.EJS_Download = EJS_Download;

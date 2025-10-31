/**
 * EJS_Cache
 * Manages a cache of files using IndexedDB for storage.
 */
class EJS_Cache {
    /**
     * Creates an instance of EJS_Cache.
     * @param {boolean} enabled - Whether caching is enabled.
     * @param {EJS_STORAGE} storage - Instance of EJS_STORAGE for IndexedDB operations.
     * @param {number} maxSizeMB - Maximum size of the cache in megabytes.
     * @param {number} maxAgeMins - Maximum age of items (in minutes) before they are cleaned up.
     */
    constructor(enabled = true, storage, maxSizeMB = 4096, maxAgeMins = 7200) {
        this.enabled = enabled;
        this.storage = storage;
        this.maxSizeMB = maxSizeMB;
        this.maxAgeMins = maxAgeMins;
        this.minAgeMins = Math.max(60, maxAgeMins * 0.1); // Minimum 1 hour, or 10% of max age

        console.log('Initialized EJS_Cache with settings:', {
            enabled: this.enabled,
            storage: this.storage,
            enabledValue: enabled,
            maxSizeMB: this.maxSizeMB,
            maxAgeMins: this.maxAgeMins,
            minAgeMins: this.minAgeMins
        });
    }

    /**
     * Retrieves an item from the cache.
     * @param {*} key - The unique key identifying the cached item.
     * @returns {Promise<EJS_CacheItem|null>} - The cached item or null if not found.
     */
    async get(key) {
        if (!this.enabled) return null;

        const item = await this.storage.get(key);
        // if the item exists, update its lastAccessed time and return cache item
        if (item) {
            item.lastAccessed = Date.now();
            await this.storage.put(key, item);
        }

        return item ? new EJS_CacheItem(item.key, item.files, item.added, item.type, item.filename) : null;
    }

    /**
     * Stores an item in the cache.
     * @param {EJS_CacheItem} item - The cache item to store.
     */
    async put(item) {
        if (!this.enabled) return;

        // before putting, ensure item is of type EJS_CacheItem
        if (!(item instanceof EJS_CacheItem)) {
            throw new Error("Item must be an instance of EJS_CacheItem");
        }

        // check if the item exists, if so remove the existing item
        const existingItem = await this.get(item.key);
        if (existingItem) {
            await this.storage.remove(item.key);
        }

        // check that the size of item.files does not cause the cache to exceed maxSizeMB
        let currentSize = 0;
        const allItems = await this.storage.getAll();
        for (let i = 0; i < allItems.length; i++) {
            if (allItems[i] && allItems[i].files) {
                for (let j = 0; j < allItems[i].files.length; j++) {
                    if (allItems[i].files[j] && allItems[i].files[j].bytes && typeof allItems[i].files[j].bytes.byteLength === "number") {
                        currentSize += allItems[i].files[j].bytes.byteLength;
                    }
                }
            }
        }
        if ((currentSize + item.size()) > (this.maxSizeMB * 1024 * 1024)) {
            // exceeded max size, keep removing oldest items until we are under maxSizeMB + the size of the new item
            const itemsToRemove = [];
            let sizeToFree = (currentSize + item.size()) - (this.maxSizeMB * 1024 * 1024);
            for (let i = 0; i < allItems.length; i++) {
                if (allItems[i] && allItems[i].files) {
                    const itemSize = allItems[i].files.reduce((sum, file) => sum + (file.bytes ? file.bytes.byteLength : 0), 0);
                    itemsToRemove.push({ item: allItems[i], size: itemSize });
                }
            }
            itemsToRemove.sort((a, b) => a.item.lastAccessed - b.item.lastAccessed); // oldest first
            for (let i = 0; i < itemsToRemove.length; i++) {
                if (sizeToFree <= 0) break;
                await this.storage.remove(itemsToRemove[i].item.key);
                sizeToFree -= itemsToRemove[i].size;
            }
        }

        await this.storage.put(item.key, {
            key: item.key,
            files: item.files,
            added: item.added,
            lastAccessed: item.lastAccessed,
            type: item.type,
            filename: item.filename
        });
    }

    /**
     * Deletes an item from the cache.
     * @param {string} key - The unique key identifying the cached item to delete.
     */
    async delete(key) {
        // fail silently if the key does not exist
        try {
            await this.storage.remove(key);
        } catch (e) {
            console.error("Failed to delete cache item:", e);
        }
    }

    /**
     * Clears all items from the cache.
     */
    async clear() {
        const allItems = await this.storage.getAll();
        for (let i = 0; i < allItems.length; i++) {
            await this.storage.remove(allItems[i].key);
        }
    }

    /**
     * Cleans up the cache by removing old or excess items based on size and age constraints.
     */
    async cleanup() {
        if (!this.enabled) return;

        console.log('[EJS Cache] Starting cache cleanup...');
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
            const itemSize = item.files.reduce((sum, file) => sum + (file.bytes ? file.bytes.byteLength : 0), 0);
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
            await this.storage.remove(item.key);
        }
        
        const cleanupTime = performance.now() - cleanupStartTime;
        const currentSizeMB = (currentSize / (1024 * 1024)).toFixed(2);
        const removedSizeMB = (itemsToRemove.reduce((sum, item) => sum + item.size, 0) / (1024 * 1024)).toFixed(2);
        
        console.log(`[EJS Cache] Cleanup complete in ${cleanupTime.toFixed(2)}ms - Removed ${itemsToRemove.length}/${totalItems} items (${removedSizeMB}MB), ${currentSizeMB}MB remaining`);
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
     * @param {string} filename - The original filename of the cached content.
     */
    constructor(key, files, added, type = 'unknown', filename = null) {
        this.key = key;
        this.files = files;
        this.added = added;
        this.lastAccessed = added;
        this.type = type;
        this.filename = filename || key; // fallback to key if no filename provided
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

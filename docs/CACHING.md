# EmulatorJS Caching System

## Overview

EmulatorJS implements a sophisticated unified caching system designed to optimize performance by minimizing redundant downloads and decompression operations. The system uses IndexedDB-based storage with intelligent cache validation to provide fast loading times for emulator cores, ROMs, BIOS files, and other assets.

## High-Level Architecture

### Unified Caching Strategy

The caching system consists of two main components:

1. **EJS_Download Manager**
   - Handles file downloads with smart caching
   - Validates cached content using HTTP headers (Cache-Control, Expires, Last-Modified)
   - Automatically decompresses archives (ZIP, 7Z, RAR)
   - Provides progress callbacks for download and decompression operations

2. **EJS_Cache Storage**
   - Custom IndexedDB-based storage for cached content
   - Stores both metadata and file blobs in separate object stores
   - Implements LRU (Least Recently Used) eviction policy
   - Configurable size limits and age-based expiration

### Cache Flow

```
Download Request → URL-based Cache Check → Cache Expiry Valid?
                           ↓                        ↓ Yes
                    HEAD Request Check       Return Cached Content
                           ↓ Modified
                  Download File → Decompress (if needed) → Store in Cache
                                                     ↓
                                            Return Content to Application
```

## Detailed Implementation

### Download Manager (EJS_Download)

The `EJS_Download` class handles all file downloads with intelligent caching:

#### Cache Validation Strategy

1. **Check URL-based cache**: Downloads are cached by URL, enabling reuse across sessions
2. **Validate cache expiry**: 
   - Uses `Cache-Control: max-age` header from server
   - Falls back to `Expires` header if present
   - Defaults to 5 days if no cache headers provided
3. **Conditional validation**: If cache expired, performs HEAD request to check `Last-Modified`
4. **Smart fallback**: Uses cached version if HEAD request fails or file unchanged

#### Download Features

- **Progress tracking**: Real-time callbacks for download and decompression progress
- **Automatic decompression**: Detects and extracts ZIP, 7Z, and RAR archives
- **Flexible response types**: Supports arraybuffer, text, blob, and other response types
- **Timeout handling**: Configurable request timeouts with abort controller
- **Force extraction**: Optional parameter to force decompression regardless of file extension

### Cache Storage (EJS_Cache)

#### Storage Backend
- **Technology**: IndexedDB via custom `EJS_STORAGE` wrapper
- **Database**: Configurable database name (typically game-specific)
- **Object Stores**: 
  - `cache`: Stores metadata (key, fileSize, timestamps, type, filename, URL, expiry)
  - `blobs`: Stores actual file data separately for better performance
- **Indexes**: Type and URL indexes for efficient lookups
- **Key Structure**: `Obj-{hash}-{size}` format for content-based keys, or URL for download caching

#### Cache Key Generation
```javascript
// Hash calculation for cache key (content-based)
generateCacheKey(dataArray) {
    let hash = this.utils.simpleHash(dataArray);
    const compressionCacheKey = "Obj-" + hash + "-" + dataArray.length;
    return compressionCacheKey;
}
```

#### Cache Configuration
- **Default Size Limit**: 4GB (4096 MB)
- **Default Max Age**: 5 days (7200 minutes)
- **Min Age**: 1 hour or 10% of max age (whichever is greater)
- **Storage Location**: Browser's IndexedDB
- **Cleanup Policy**: 
  - LRU (Least Recently Used) eviction when size exceeded
  - Age-based removal for items older than maxAge
  - Automatic cleanup on first cache access per session
  - Orphaned blob cleanup as failsafe

#### Cache Item Structure
```javascript
class EJS_CacheItem {
    constructor(key, files, added, type, responseType, filename, url, cacheExpiry) {
        this.key = key;              // Unique identifier
        this.files = files;          // Array of EJS_FileItem objects
        this.added = added;          // Timestamp when added to cache
        this.lastAccessed = added;   // Timestamp of last access
        this.type = type;            // Type: 'core', 'ROM', 'BIOS', etc.
        this.responseType = responseType; // Original response type
        this.filename = filename;    // Original filename
        this.url = url;              // Source URL
        this.cacheExpiry = cacheExpiry; // Expiry timestamp (from HTTP headers)
    }
    
    size() {
        // Calculates total size of all files
    }
}

class EJS_FileItem {
    constructor(filename, bytes) {
        this.filename = filename;    // Filename (original or from archive)
        this.bytes = bytes;          // Uint8Array of file content
    }
}
```

### File Type Handling

#### All File Types
The unified caching system handles all file types through the same mechanism:

- **Download**: Managed by `EJS_Download` with URL-based caching
- **Cache validation**: Automatic expiry checking and conditional requests
- **Decompression**: Automatic extraction of .zip, .7z, and .rar files
- **Storage**: Metadata and blobs stored in separate IndexedDB object stores
- **Retrieval**: URL or content-hash based lookups with index support

#### Archive Handling
- **Automatic detection**: File extension (.zip, .7z, .rar) triggers decompression
- **Force extraction**: `forceExtract` parameter overrides extension check
- **Multiple files**: Each file in archive stored as separate `EJS_FileItem`
- **Progress tracking**: Real-time progress callbacks during extraction

#### Response Type Support
- **arraybuffer**: Default, used for binary files and archives
- **text**: Automatically encoded to UTF-8 Uint8Array for storage
- **blob**: Converted to Uint8Array for consistent storage
- **others**: Converted to string then encoded for storage

### Cache Operations

#### Download with Caching
The `downloadFile()` method handles the complete download and caching workflow:

```javascript
async downloadFile(url, type, options) {
    // 1. Check cache by URL
    const cached = await this.storageCache.get(url, false, "url");
    
    // 2. Validate cache expiry
    if (cached && cached.cacheExpiry > Date.now()) {
        return cached; // Cache valid
    }
    
    // 3. Perform conditional validation with HEAD request
    const headResp = await fetch(url, { method: "HEAD" });
    const lastModified = headResp.headers.get("Last-Modified");
    if (lastModified && Date.parse(lastModified) <= cached.added) {
        return cached; // File not modified
    }
    
    // 4. Download file with progress tracking
    const response = await fetch(url);
    const data = await readWithProgress(response);
    
    // 5. Extract cache expiry from headers
    const cacheExpiry = parseCacheHeaders(response.headers);
    
    // 6. Decompress if needed
    if (isArchive(filename)) {
        files = await decompress(data);
    }
    
    // 7. Store in cache
    const cacheItem = new EJS_CacheItem(key, files, Date.now(), 
                                        type, responseType, filename, url, cacheExpiry);
    await this.storageCache.put(cacheItem);
    
    return cacheItem;
}
```

#### Cache Management Operations

- **get(key, metadataOnly, indexName)**: Retrieve item by key or index (URL, type)
- **put(item)**: Store item with automatic size management and LRU eviction
- **delete(key)**: Remove item and its blobs from cache
- **clear()**: Remove all cached items
- **cleanup()**: Remove old/excess items based on age and size constraints
- **getKeys()**: List all cache keys
- **getSizes()**: Get size information for all cached items

### Performance Optimizations

#### Separate Metadata and Blob Storage
The cache uses two separate IndexedDB object stores:
- **Metadata store**: Small, fast lookups for cache hits/validation
- **Blob store**: Large file data loaded only when needed
- **Benefit**: Faster cache lookups without loading large blobs into memory

#### Progress Tracking
All long-running operations provide progress callbacks:
```javascript
downloadFile(url, type, { 
    onProgress: (status, percent, loaded, total) => {
        // status: "downloading" | "decompressing" | "complete"
        console.log(`${status}: ${percent}%`);
    }
});
```

#### Memory Management
- **Chunked downloads**: Large files downloaded in chunks with progress tracking
- **LRU eviction**: Oldest accessed items removed first when size limit exceeded
- **Automatic cleanup**: Runs on first cache access each session
- **Orphan removal**: Failsafe cleanup removes blobs without metadata
- **Size-based eviction**: Pre-emptive removal when adding new items would exceed limit

### Cache Validation and Invalidation

#### Multi-Level Validation Strategy
The system uses a tiered approach to validate cached content:

1. **Cache Expiry Check** (fastest)
   - Checks `cacheExpiry` timestamp from HTTP headers
   - Avoids network requests for valid cached items
   - Default: 5 days from server's Cache-Control/Expires headers

2. **Conditional HEAD Request** (medium)
   - Performed only if cache expired or no expiry set
   - Compares server's Last-Modified with cached item's `added` timestamp
   - Reuses cache if file unchanged on server

3. **Full Download** (slowest)
   - Only when file modified or validation fails
   - Replaces existing cache entry with new version

#### Client-Side Management
- **Automatic cleanup**: On first cache access per session
- **Manual clearing**: Via cache management UI
- **Selective removal**: Delete individual items by key
- **Index-based queries**: Find items by URL or type

### Error Handling

#### Network Failures
- **Graceful fallback**: Uses expired cache if server unavailable
- **Timeout handling**: Configurable request timeout with abort controller
- **Error propagation**: Clear error messages for debugging

#### Cache Failures
- **Silent degradation**: Cache disabled if IndexedDB unavailable
- **Orphan cleanup**: Removes blobs without metadata entries
- **Error recovery**: Falls back to fresh downloads when cache operations fail

#### Decompression Errors
- **Error propagation**: Clear error messages from decompression library
- **Fallback**: Returns original data if decompression fails
- **Progress updates**: Status callbacks during decompression

### Storage Architecture

#### Unified Database Design
The current implementation uses a unified approach:
- **Single database**: One IndexedDB database per game/instance
- **Two object stores**: 
  - `cache`: Metadata with indexed fields (type, url)
  - `blobs`: Large binary file data
- **Benefits**: 
  - Easier management and versioning
  - Atomic transactions across stores
  - Better performance than separate databases
  - Simpler cleanup and maintenance

#### Browser Compatibility
- **IndexedDB Required**: Core functionality depends on IndexedDB support
- **Fallback mode**: `EJS_DUMMYSTORAGE` for browsers without IndexedDB
- **Feature detection**: Automatic detection and graceful degradation

## Configuration Options

### EJS_Cache Constructor Parameters
```javascript
new EJS_Cache(enabled, databaseName, maxSizeMB, maxAgeMins, debug)
```
- `enabled`: Enable/disable caching (default: true)
- `databaseName`: IndexedDB database name (game-specific)
- `maxSizeMB`: Maximum cache size in megabytes (default: 4096)
- `maxAgeMins`: Maximum item age in minutes (default: 7200 = 5 days)
- `debug`: Enable debug logging (default: false)

### EJS_Download Constructor Parameters
```javascript
new EJS_Download(storageCache, EJS)
```
- `storageCache`: EJS_Cache instance for storage (null disables caching)
- `EJS`: Main EmulatorJS instance for integration

### downloadFile() Options
- `url`: Source URL (required)
- `type`: Content type (e.g., "ROM", "CORE", "BIOS")
- `method`: HTTP method (default: "GET")
- `headers`: Request headers object
- `body`: Request body for POST/PUT
- `onProgress`: Progress callback function
- `onComplete`: Completion callback function
- `timeout`: Request timeout in ms (default: 30000)
- `responseType`: Response type (default: "arraybuffer")
- `forceExtract`: Force decompression (default: false)
- `dontCache`: Skip caching for this download (default: false)

## Best Practices

### For Developers
1. **Set proper HTTP headers**: Use Cache-Control/Expires/Last-Modified on servers
2. **Monitor cache size**: Regular cleanup prevents storage quota issues
3. **Use progress callbacks**: Provide user feedback during long operations
4. **Handle failures gracefully**: Always provide fallback for cache failures
5. **Enable debug mode**: Use debug flag during development for detailed logging
6. **Test without cache**: Use `dontCache` option to verify download logic
7. **Optimize file delivery**: Smaller files and good compression improve cache efficiency

### For Server Configuration
1. **Cache-Control headers**: Set appropriate max-age for assets
2. **Last-Modified headers**: Enable conditional requests
3. **Compression**: Pre-compress large assets (gzip, brotli)
4. **CDN usage**: Leverage CDN caching alongside client-side cache

### For Users
1. **Monitor storage usage**: Check browser storage settings periodically
2. **Clear cache if needed**: Use cache management UI for cleanup
3. **Update browser**: Newer browsers have better IndexedDB performance

## Troubleshooting

### Common Issues

#### Cache Not Working
- Check IndexedDB support: `!!window.indexedDB`
- Verify storage quota: Check browser storage settings
- Enable debug mode: Set `debug: true` in EJS_Cache constructor
- Check console: Look for cache operation logs

#### Slow First Load
- Expected behavior: First load downloads and caches
- Subsequent loads: Should be much faster with cache hits
- Monitor progress: Use onProgress callback for user feedback

#### Storage Quota Exceeded
- Automatic cleanup: Cache runs cleanup on startup
- Manual cleanup: Use cache management UI
- Reduce maxSizeMB: Lower the cache size limit
- Clear other data: Free up browser storage space

#### Stale Content
- Check cache expiry: Default is 5 days
- Adjust maxAgeMins: Lower for more frequent updates
- Force refresh: Clear cache for specific items
- Server headers: Verify Cache-Control/Expires headers

### Debug Information

Enable debug mode for detailed logging:
```javascript
const cache = new EJS_Cache(true, "my-game", 4096, 7200, true);
```

Debug logs include:
- Cache initialization settings
- Startup cleanup results (items removed, size freed, time taken)
- Cache hit/miss information
- Download progress and timing
- Decompression progress
- Error details and stack traces

## Cache Manager UI

The Cache Manager provides a user interface for viewing and managing cached items. It displays information about cached content:

### Display Information
- **Filename**: Original filename of the cached content
- **Type**: Content type (ROM, CORE, BIOS, etc.)
- **Size**: Total size of all files in the cache item
- **URL**: Source URL where content was downloaded from
- **Last Accessed**: Timestamp of last access with relative time
- **Added**: Timestamp when item was first cached
- **Cache Expiry**: When the cache entry expires (from HTTP headers)

### Management Operations
- **View Details**: Inspect cache item metadata and file list
- **Delete Item**: Remove individual cache entries
- **Cleanup Now**: Run cleanup to remove old/excess items based on age and size
- **Clear All**: Remove all cached items from storage

### Cache Statistics
- **Total Items**: Number of cached items
- **Total Size**: Combined size of all cached content
- **Hit Rate**: Percentage of cache hits vs. misses (if tracked)
- **Oldest Item**: Age of least recently accessed item

## Summary

This unified caching system provides:
- **Intelligent cache validation** using HTTP headers (Cache-Control, Expires, Last-Modified)
- **Automatic decompression** and caching of extracted files
- **Efficient storage** with separate metadata and blob stores
- **LRU eviction** with configurable size and age limits
- **Progress tracking** for downloads and decompression
- **Graceful degradation** when cache unavailable
- **Debug logging** for troubleshooting

The system significantly improves EmulatorJS performance by eliminating redundant downloads and decompression operations while maintaining data freshness through smart validation.

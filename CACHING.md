# EmulatorJS Caching System

## Overview

EmulatorJS implements a sophisticated multi-layer caching system designed to optimize performance by minimizing redundant downloads and decompression operations. The system combines browser-native HTTP caching with a custom decompression cache to provide fast loading times for emulator cores, ROMs, BIOS files, and other assets.

## High-Level Architecture

### Two-Layer Caching Strategy

1. **Browser HTTP Cache (Layer 1)**
   - Handles file-level caching using standard HTTP cache headers
   - Caches compressed files (ZIP, 7Z, RAR) and uncompressed files
   - Managed automatically by the browser
   - Provides conditional requests (If-Modified-Since, ETag) for cache validation

2. **Decompression Cache (Layer 2)**
   - Custom IndexedDB-based cache for decompressed content
   - Stores the results of expensive decompression operations
   - Prevents re-decompression of previously processed archives
   - Configurable size limits and expiration policies

### Cache Flow

```
Download Request → Browser Cache Check → File Downloaded/Retrieved
                                     ↓
Decompression Required? → Decompression Cache Check → Content Extracted
                                                  ↓
                         File System Operations → Game Launch
```

## Detailed Implementation

### Browser Cache Integration

EmulatorJS leverages the browser's built-in HTTP caching mechanisms:

- **File Downloads**: All file downloads use standard HTTP requests that respect cache headers
- **Conditional Requests**: The system performs HEAD requests to validate cached files against server versions
- **Cache Invalidation**: Automatically detects updated files on the server through ETag/Last-Modified headers

### Decompression Cache (EJS_Cache)

#### Storage Backend
- **Technology**: IndexedDB via custom `EJS_STORAGE` wrapper
- **Database**: `EJS_decompression_cache`
- **Object Store**: `cache_items`
- **Key Structure**: `compression_{hash}_{size}` format

#### Cache Key Generation
```javascript
// Hash calculation for cache key
let hash = 0;
for (let i = 0; i < dataArray.length; i++) {
    hash = ((hash << 5) - hash + dataArray[i]) & 0xffffffff;
}
const cacheKey = `compression_${hash}_${dataArray.length}`;
```

#### Cache Configuration
- **Default Size Limit**: 4GB (4,294,967,296 bytes)
- **Default Expiration**: 5 days (432,000,000 milliseconds)
- **Storage Location**: Browser's IndexedDB
- **Cleanup Policy**: LRU (Least Recently Used) with size-based eviction

#### Cache Item Structure
```javascript
class EJS_CacheItem {
    constructor(key, files, timestamp, type = 'unknown', filename = null) {
        this.key = key;           // Unique identifier
        this.files = files;       // Array of EJS_FileItem objects
        this.timestamp = timestamp; // Creation/access time
        this.type = type;         // Type of cached content (core, ROM, BIOS, etc.)
        this.filename = filename; // Original filename
    }
}

class EJS_FileItem {
    constructor(filename, bytes) {
        this.filename = filename; // Original filename in archive
        this.bytes = bytes;       // Uint8Array of file content
    }
}
```

### File Type Handling

#### Core Files (.wasm, .js)
- **Download**: Browser cache handles file-level caching
- **Decompression**: Decompression cache stores extracted core files
- **Validation**: HEAD requests check for server updates
- **Storage**: No additional IndexedDB storage (removed in favor of browser cache)

#### ROM Files (.zip, .7z, .rar, .iso, .bin, etc.)
- **Download**: Browser cache for compressed archives
- **Decompression**: Callback-based extraction with cache storage
- **File Handling**: Multiple files extracted and cached individually
- **Game Selection**: Automatic selection of primary ROM file

#### BIOS Files
- **Download**: Browser cache for compressed/uncompressed files
- **Decompression**: Same cache mechanism as ROM files
- **Extraction**: Optional based on `dontExtractBIOS` configuration

### Cache Operations

#### checkCompression() Method
The core caching logic handles both Promise-based and callback-based decompression:

```javascript
checkCompression(data, msg, fileCbFunc) {
    // Generate cache key from data hash
    const cacheKey = `compression_${hash}_${dataArray.length}`;
    
    // Check cache first
    const cachedItem = await this.storageCache.get(cacheKey);
    if (cachedItem) {
        // Cache HIT: Return cached files
        return cached_files;
    }
    
    // Cache MISS: Decompress and store
    const decompressedFiles = await this.compression.decompress(data, updateMsg, callbackWrapper);
    
    // Store in cache for future use
    const cacheItem = new EJS_CacheItem(cacheKey, fileItems, Date.now(), 'decompressed', 'example-file.zip');
    await this.storageCache.put(cacheItem);
    
    return decompressedFiles;
}
```

#### Cache Management
- **Size Monitoring**: Tracks total cache size and evicts old items when limit exceeded
- **Expiration Handling**: Removes items older than configured expiration time
- **Manual Management**: UI provides cache inspection and clearing capabilities

### Performance Optimizations

#### Timing and Benchmarking
Every cache operation includes detailed timing metrics:

```javascript
// Cache HIT example
[EJS Cache] Cache HIT for 15.2MB data - Total: 23.45ms (hash: 12.1ms, cache lookup: 11.35ms)

// Cache MISS example  
[EJS Cache] Cache MISS for 15.2MB data - Starting decompression (hash: 12.1ms, cache lookup: 8.2ms)
[EJS Cache] Decompression complete for 15.2MB data - Total: 1847.3ms (decompression: 1789.2ms, cache store: 58.1ms)
```

#### Memory Management
- **Streaming**: Large files processed in chunks where possible
- **Worker Threads**: Decompression operations run in web workers to prevent UI blocking
- **Cleanup**: Manual cleanup available through UI, automatic cleanup on startup and during size-based eviction

### Cache Validation and Invalidation

#### Server-Side Changes
The system detects server-side file updates through:
1. **HEAD Requests**: Check ETag and Last-Modified headers
2. **Conditional Downloads**: Only download if file has changed
3. **Cache Invalidation**: Remove stale cache entries when source files update

#### Client-Side Management
- **Manual Clearing**: Users can clear cache through settings menu
- **Selective Removal**: Individual cache items can be removed
- **Diagnostic Tools**: Cache contents viewable through management UI

### Error Handling

#### Network Failures
- **Graceful Degradation**: Falls back to cached content when network unavailable
- **Retry Logic**: Implements retry mechanisms for transient failures
- **Error Reporting**: Detailed logging for debugging cache issues

#### Cache Corruption
- **Validation**: Verifies cache item integrity before use
- **Recovery**: Automatically rebuilds corrupted cache entries
- **Fallback**: Falls back to fresh downloads when cache fails

### Migration and Compatibility

#### Storage Migration
The current implementation removes legacy storage systems:
- **Removed**: Separate IndexedDB stores for cores, ROMs, and BIOS files
- **Unified**: Single decompression cache for all compressed content
- **Backward Compatibility**: Graceful handling of existing cache data

#### Browser Compatibility
- **IndexedDB Support**: Required for decompression cache
- **HTTP Cache**: Utilizes standard browser caching mechanisms
- **Fallback**: Degrades gracefully when storage unavailable

## Configuration Options

### EJS_Cache Parameters
- `maxSize`: Maximum cache size in bytes (default: 4GB)
- `maxAge`: Item expiration time in milliseconds (default: 5 days)
- `storageKey`: IndexedDB database name

### Runtime Configuration
- `dontExtractRom`: Skip ROM extraction for certain cores
- `dontExtractBIOS`: Skip BIOS extraction when not needed
- `disableCue`: Control CUE file generation for disc-based games

## Best Practices

### For Developers
1. **Monitor Cache Size**: Regular cleanup prevents storage quota issues
2. **Handle Cache Failures**: Always provide fallback mechanisms
3. **Optimize File Sizes**: Smaller files cache more efficiently
4. **Use Appropriate Headers**: Set proper cache headers on servers

### For Users
1. **Clear Cache Periodically**: Prevents storage quota issues
2. **Monitor Network Usage**: Cache reduces bandwidth consumption
3. **Report Performance Issues**: Cache metrics help identify problems

## Troubleshooting

### Common Issues
1. **Cache Not Working**: Check IndexedDB support and storage quota
2. **Slow Loading**: Monitor cache hit/miss ratios in console
3. **Storage Full**: Clear cache or increase browser storage quota
4. **Stale Content**: Check cache expiration settings

### Debug Information
All cache operations log detailed information to the browser console:
- Cache hit/miss status
- Timing breakdowns
- File sizes and counts
- Error conditions

## Cache Manager UI

The Cache Manager provides a user interface for viewing and managing cached items. It displays a table with the following columns:

- **Filename**: Original filename of the cached content
- **Type**: Content type (core, ROM, BIOS, asset, etc.)
- **Size**: Total size of cached files
- **Last Used**: Relative time since last access (e.g., "2h ago", "3d ago")
- **Action**: Remove button to delete individual cache entries

The interface includes options to:
- **Cleanup Now**: Remove old/excess items based on age and size constraints
- **Clear All**: Remove all cached items

This comprehensive caching system significantly improves EmulatorJS performance by eliminating redundant operations while maintaining data freshness and reliability.

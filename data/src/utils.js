/**
 * EJS Utility Functions
 */
class EJS_UTILS {
    /**
     * Computes a simple hash of the given data array.
     * @param {Uint8Array} dataArray 
     * @returns {number} The computed hash.
     */
    simpleHash(dataArray) {
        let hash = 0;
        for (let i = 0; i < dataArray.length; i++) {
            hash = ((hash << 5) - hash + dataArray[i]) & 0xffffffff;
        }
        return hash;
    }

    /**
     * Cyrb53 hash function adapted for buffers.
     * @param {*} charBuffer 
     * @param {*} seed 
     * @returns {string} Hexadecimal representation of the hash.
     */
    async cyrb53(charBuffer, seed = 0) {
        // https://stackoverflow.com/questions/7616461
        // Modified to accept a buffer instead of a string and return hex instead of an int
        let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
        for(let i = 0, ch; i < charBuffer.length; i++) {
            ch = charBuffer[i];
            h1 = Math.imul(h1 ^ ch, 2654435761);
            h2 = Math.imul(h2 ^ ch, 1597334677);
        }
        h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
        h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
        h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
        h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);

        // Cyrb53 is a 53-bit hash; we need 14 hex characters to represent it, and the first char will
        // always be 0 or 1 (since it is only 1 bit)
        return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(14, "0");
    };
}

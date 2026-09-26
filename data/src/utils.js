/**
 * EJS Utility Functions
 */


/**
 * Computes a simple hash of the given data array.
 * @param {Uint8Array} dataArray 
 * @returns {number} The computed hash.
 */
export function simpleHash(dataArray) {
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
export async function cyrb53(charBuffer, seed = 0) {
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
}
/**
 * Generate a random GUID string.
 * @returns {string} A GUID in the format xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx.
 */
export function guid() {
    const s4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
}
/**
 * Compute MD5 hash of string or buffer.
 * @param {Uint8Array|ArrayBuffer|string} data
 * @returns {string} Hexadecimal MD5 digest.
 */
export function md5(data) {
    if (typeof data === 'string') {
        data = new TextEncoder().encode(data);
    } else if (data instanceof ArrayBuffer) {
        data = new Uint8Array(data);
    }

    function safeAdd(x, y) {
        const lsw = (x & 0xffff) + (y & 0xffff);
        const msw = (x >> 16) + (y >> 16) + (lsw >> 16);
        return (msw << 16) | (lsw & 0xffff);
    }

    function bitRotateLeft(num, cnt) {
        return (num << cnt) | (num >>> (32 - cnt));
    }

    function md5cmn(q, a, b, x, s, t) {
        return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
    }
    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | ~d), a, b, x, s, t);
    }

    const n = data.length;
    const blocks = [];
    const blockCount = ((n + 8) >> 6) + 1;
    for (let i = 0; i < blockCount * 16; i++) {
        blocks[i] = 0;
    }
    for (let i = 0; i < n; i++) {
        blocks[i >> 2] |= data[i] << ((i % 4) * 8);
    }
    blocks[n >> 2] |= 0x80 << ((n % 4) * 8);
    blocks[(blockCount * 16) - 2] = n * 8;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < blocks.length; i += 16) {
        const olda = a;
        const oldb = b;
        const oldc = c;
        const oldd = d;

        a = md5ff(a, b, c, d, blocks[i], 7, -680876936);
        d = md5ff(d, a, b, c, blocks[i + 1], 12, -389564586);
        c = md5ff(c, d, a, b, blocks[i + 2], 17, 606105819);
        b = md5ff(b, c, d, a, blocks[i + 3], 22, -1044525330);
        a = md5ff(a, b, c, d, blocks[i + 4], 7, -176418897);
        d = md5ff(d, a, b, c, blocks[i + 5], 12, 1200080426);
        c = md5ff(c, d, a, b, blocks[i + 6], 17, -1473231341);
        b = md5ff(b, c, d, a, blocks[i + 7], 22, -45705983);
        a = md5ff(a, b, c, d, blocks[i + 8], 7, 1770035416);
        d = md5ff(d, a, b, c, blocks[i + 9], 12, -1958414417);
        c = md5ff(c, d, a, b, blocks[i + 10], 17, -42063);
        b = md5ff(b, c, d, a, blocks[i + 11], 22, -1990404162);
        a = md5ff(a, b, c, d, blocks[i + 12], 7, 1804603682);
        d = md5ff(d, a, b, c, blocks[i + 13], 12, -40341101);
        c = md5ff(c, d, a, b, blocks[i + 14], 17, -1502002290);
        b = md5ff(b, c, d, a, blocks[i + 15], 22, 1236535329);

        a = md5gg(a, b, c, d, blocks[i + 1], 5, -165796510);
        d = md5gg(d, a, b, c, blocks[i + 6], 9, -1069501632);
        c = md5gg(c, d, a, b, blocks[i + 11], 14, 643717713);
        b = md5gg(b, c, d, a, blocks[i], 20, -373897302);
        a = md5gg(a, b, c, d, blocks[i + 5], 5, -701558691);
        d = md5gg(d, a, b, c, blocks[i + 10], 9, 38016083);
        c = md5gg(c, d, a, b, blocks[i + 15], 14, -660478335);
        b = md5gg(b, c, d, a, blocks[i + 4], 20, -405537848);
        a = md5gg(a, b, c, d, blocks[i + 9], 5, 568446438);
        d = md5gg(d, a, b, c, blocks[i + 14], 9, -1019803690);
        c = md5gg(c, d, a, b, blocks[i + 3], 14, -187363961);
        b = md5gg(b, c, d, a, blocks[i + 8], 20, 1163531501);
        a = md5gg(a, b, c, d, blocks[i + 13], 5, -144468057);
        d = md5gg(d, a, b, c, blocks[i + 2], 9, -51403784);
        c = md5gg(c, d, a, b, blocks[i + 7], 14, 1735328473);
        b = md5gg(b, c, d, a, blocks[i + 12], 20, -1926607734);

        a = md5hh(a, b, c, d, blocks[i + 5], 4, -378558);
        d = md5hh(d, a, b, c, blocks[i + 8], 11, -2022574463);
        c = md5hh(c, d, a, b, blocks[i + 11], 16, 1839030562);
        b = md5hh(b, c, d, a, blocks[i + 14], 23, -35309556);
        a = md5hh(a, b, c, d, blocks[i + 1], 4, -1530992060);
        d = md5hh(d, a, b, c, blocks[i + 4], 11, 1272893353);
        c = md5hh(c, d, a, b, blocks[i + 7], 16, -155497632);
        b = md5hh(b, c, d, a, blocks[i + 10], 23, -1094730640);
        a = md5hh(a, b, c, d, blocks[i + 13], 4, 681279174);
        d = md5hh(d, a, b, c, blocks[i], 11, -358537222);
        c = md5hh(c, d, a, b, blocks[i + 3], 16, -722521979);
        b = md5hh(b, c, d, a, blocks[i + 6], 23, 76029189);
        a = md5hh(a, b, c, d, blocks[i + 9], 4, -640364409);
        d = md5hh(d, a, b, c, blocks[i + 12], 11, -1051523027);
        c = md5hh(c, d, a, b, blocks[i + 15], 16, 1830030562);
        b = md5hh(b, c, d, a, blocks[i + 2], 23, -30611744);

        a = md5ii(a, b, c, d, blocks[i], 6, -198630844);
        d = md5ii(d, a, b, c, blocks[i + 7], 10, 1126891415);
        c = md5ii(c, d, a, b, blocks[i + 14], 15, -1416354905);
        b = md5ii(b, c, d, a, blocks[i + 5], 21, -57434055);
        a = md5ii(a, b, c, d, blocks[i + 12], 6, 1700485571);
        d = md5ii(d, a, b, c, blocks[i + 3], 10, -1894980106);
        c = md5ii(c, d, a, b, blocks[i + 10], 15, -1051523);
        b = md5ii(b, c, d, a, blocks[i + 1], 21, -2054922799);
        a = md5ii(a, b, c, d, blocks[i + 8], 6, 1873313359);
        d = md5ii(d, a, b, c, blocks[i + 15], 10, -306117441);
        c = md5ii(c, d, a, b, blocks[i + 6], 15, -1560198380);
        b = md5ii(b, c, d, a, blocks[i + 13], 21, 1309151649);
        a = md5ii(a, b, c, d, blocks[i + 4], 6, -145523070);
        d = md5ii(d, a, b, c, blocks[i + 11], 10, -1120210379);
        c = md5ii(c, d, a, b, blocks[i + 2], 15, 718787259);
        b = md5ii(b, c, d, a, blocks[i + 9], 21, -343485551);

        a = safeAdd(a, olda);
        b = safeAdd(b, oldb);
        c = safeAdd(c, oldc);
        d = safeAdd(d, oldd);
    }

    const toHex = (val) => {
        let str = '';
        for (let i = 0; i < 4; i++) {
            str += ((val >> (i * 8)) & 0xff).toString(16).padStart(2, '0');
        }
        return str;
    };

    return (toHex(a) + toHex(b) + toHex(c) + toHex(d)).toLowerCase();
}

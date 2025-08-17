/**
 * Handles compression and decompression of various archive formats (ZIP, 7Z, RAR)
 * for the EmulatorJS system.
 *
 * This class provides functionality to detect compressed file formats and extract
 * their contents using web workers for better performance.
 */
class EJSCompression {
    /**
     * Creates a new compression handler instance.
     *
     * @param {Object} EJS - The main EmulatorJS instance
     */
    constructor(EJS) {
        this.EJS = EJS;
    }

    /**
     * Detects if the given data represents a compressed archive format.
     *
     * @param {Uint8Array|ArrayBuffer} data - The binary data to analyze
     * @returns {string|null} The detected compression format ('zip', '7z', 'rar') or null if not compressed
     *
     * @description
     * Checks the file signature (magic bytes) at the beginning of the data to identify
     * the compression format. Supports ZIP, 7Z, and RAR formats.
     *
     * @see {@link https://www.garykessler.net/library/file_sigs.html|File Signature Database}
     */
    isCompressed(data) {
            if ((data[0] === 0x50 && data[1] === 0x4B) && ((data[2] === 0x03 && data[3] === 0x04) || (data[2] === 0x05 && data[3] === 0x06) || (data[2] === 0x07 && data[3] === 0x08))) {
                return "zip";
            } else if (data[0] === 0x37 && data[1] === 0x7A && data[2] === 0xBC && data[3] === 0xAF && data[4] === 0x27 && data[5] === 0x1C) {
                return "7z";
            } else if ((data[0] === 0x52 && data[1] === 0x61 && data[2] === 0x72 && data[3] === 0x21 && data[4] === 0x1A && data[5] === 0x07) && ((data[6] === 0x00) || (data[6] === 0x01 && data[7] === 0x00))) {
                return "rar";
            }
            return null;
        }

    /**
     * Decompresses the given data and extracts all files.
     *
     * @param {Uint8Array|ArrayBuffer} data - The compressed data to extract
     * @param {Function} updateMsg - Callback function for progress updates (message, isProgress)
     * @param {Function} fileCbFunc - Callback function called for each extracted file (filename, fileData)
     * @returns {Promise<Object>} Promise that resolves to an object mapping filenames to file data
     *
     * @description
     * Automatically detects the compression format and delegates to the appropriate
     * decompression method. If the data is not compressed, returns it as-is.
     */
    decompress(data, updateMsg, fileCbFunc) {
        const compressed = this.isCompressed(data.slice(0, 10));
        if (compressed === null) {
            if (typeof fileCbFunc === "function") {
                fileCbFunc("!!notCompressedData", data);
            }
            return new Promise(resolve => resolve({ "!!notCompressedData": data }));
        }
        return this.decompressFile(compressed, data, updateMsg, fileCbFunc);
    }

    /**
     * Retrieves the appropriate worker script for the specified compression method.
     *
     * @param {string} method - The compression method ('7z', 'zip', or 'rar')
     * @returns {Promise<Blob>} Promise that resolves to a Blob containing the worker script
     *
     * @description
     * Downloads the necessary worker script and WASM files for the specified compression
     * method. For RAR files, also downloads the libunrar.wasm file and creates a custom
     * worker script with the WASM binary embedded.
     *
     * @throws {Error} When network errors occur during file downloads
     */
    getWorkerFile(method) {
        return new Promise(async (resolve, reject) => {
            let path, obj;
            if (method === "7z") {
                path = "compression/extract7z.js";
                obj = "sevenZip";
            } else if (method === "zip") {
                path = "compression/extractzip.js";
                obj = "zip";
            } else if (method === "rar") {
                path = "compression/libunrar.js";
                obj = "rar";
            }
            const res = await this.EJS.downloadFile(path, null, false, { responseType: "text", method: "GET" });
            if (res === -1) {
                this.EJS.startGameError(this.EJS.localization("Network Error"));
                return;
            }
            if (method === "rar") {
                const res2 = await this.EJS.downloadFile("compression/libunrar.wasm", null, false, { responseType: "arraybuffer", method: "GET" });
                if (res2 === -1) {
                    this.EJS.startGameError(this.EJS.localization("Network Error"));
                    return;
                }
                const path = URL.createObjectURL(new Blob([res2.data], { type: "application/wasm" }));
                let script = `
                    let dataToPass = [];
                    Module = {
                        monitorRunDependencies: function(left) {
                            if (left == 0) {
                                setTimeout(function() {
                                    unrar(dataToPass, null);
                                }, 100);
                            }
                        },
                        onRuntimeInitialized: function() {},
                        locateFile: function(file) {
                            console.log("locateFile");
                            return "` + path + `";
                        }
                    };
                    ` + res.data + `
                    let unrar = function(data, password) {
                        let cb = function(fileName, fileSize, progress) {
                            postMessage({ "t": 4, "current": progress, "total": fileSize, "name": fileName });
                        };
                        let rarContent = readRARContent(data.map(function(d) {
                            return {
                                name: d.name,
                                content: new Uint8Array(d.content)
                            }
                        }), password, cb)
                        let rec = function(entry) {
                            if (!entry) return;
                            if (entry.type === "file") {
                                postMessage({ "t": 2, "file": entry.fullFileName, "size": entry.fileSize, "data": entry.fileContent });
                            } else if (entry.type === "dir") {
                                Object.keys(entry.ls).forEach(function(k) {
                                    rec(entry.ls[k]);
                                });
                            } else {
                                throw "Unknown type";
                            }
                        }
                        rec(rarContent);
                        postMessage({ "t": 1 });
                        return rarContent;
                    };
                    onmessage = function(data) {
                        dataToPass.push({ name: "test.rar", content: data.data });
                    };
                `;
                const blob = new Blob([script], {
                    type: "application/javascript"
                })
                resolve(blob);
            } else {
                const blob = new Blob([res.data], {
                    type: "application/javascript"
                })
                resolve(blob);
            }
        })
    }

    /**
     * Decompresses a file using the specified compression method.
     *
     * @param {string} method - The compression method ('7z', 'zip', or 'rar')
     * @param {Uint8Array|ArrayBuffer} data - The compressed data to extract
     * @param {Function} updateMsg - Callback function for progress updates (message, isProgress)
     * @param {Function} fileCbFunc - Callback function called for each extracted file (filename, fileData)
     * @returns {Promise<Object>} Promise that resolves to an object mapping filenames to file data
     *
     * @description
     * Creates a web worker to handle the decompression process asynchronously.
     * The worker communicates progress updates and extracted files back to the main thread.
     *
     * @example
     * // Message types from worker:
     * // t: 4 - Progress update (current, total, name)
     * // t: 2 - File extracted (file, size, data)
     * // t: 1 - Extraction complete
     */
    decompressFile(method, data, updateMsg, fileCbFunc) {
        return new Promise(async callback => {
            const file = await this.getWorkerFile(method);
            const worker = new Worker(URL.createObjectURL(file));
            const files = {};
            worker.onmessage = (data) => {
                if (!data.data) return;
                //data.data.t/ 4=progress, 2 is file, 1 is zip done
                if (data.data.t === 4) {
                    const pg = data.data;
                    const num = Math.floor(pg.current / pg.total * 100);
                    if (isNaN(num)) return;
                    const progress = " " + num.toString() + "%";
                    updateMsg(progress, true);
                }
                if (data.data.t === 2) {
                    if (typeof fileCbFunc === "function") {
                        fileCbFunc(data.data.file, data.data.data);
                        files[data.data.file] = true;
                    } else {
                        files[data.data.file] = data.data.data;
                    }
                }
                if (data.data.t === 1) {
                    callback(files);
                }
            }
            worker.postMessage(data);
        });
    }
}

window.EJS_COMPRESSION = EJSCompression;

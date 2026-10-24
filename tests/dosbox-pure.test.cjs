const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { test } = require("node:test");
const vm = require("node:vm");

function loadClass(file, name, globals = {}) {
    const source = readFileSync(resolve(__dirname, "../data/src", file), "utf8")
        .replace(/^import .*;\r?\n/gm, "")
        .replace(/^export .*;?\r?$/gm, "");
    return vm.runInNewContext(source + `\n${name};`, {
        console: { log() {}, warn() {} },
        Uint8Array, ArrayBuffer, TextDecoder, Blob, URL, File,
        window: {}, ...globals
    });
}

const EmulatorJS = loadClass("emulator.js", "EmulatorJS");

for (const [name, config, core, expected] of [
    ["ROM", { dontExtractRom: true }, "dosbox_pure", true],
    ["BIOS", { dontExtractBIOS: true }, "dosbox_pure", true],
    ["ROM", {}, "dosbox_pure", false],
    ["BIOS", { dontExtractRom: true }, "dosbox_pure", false],
    ["ROM", { dontExtractRom: false }, "arcade", true]
]) {
    test(`${name} extraction: ${core} ${JSON.stringify(config)}`, async () => {
        const ejs = Object.create(EmulatorJS.prototype);
        let received;
        Object.assign(ejs, {
            config, compression: {}, getCore: () => core,
            toData: () => false,
            downloadFile: async (...args) => {
                received = args[7];
                return { data: { files: [] } };
            },
            gameManager: { FS: {} }
        });
        await ejs.download("https://example.test/game.zip", {
            name, dontExtractIfCore: ["arcade"]
        });
        assert.equal(received, expected);
    });
}

for (const suffix of [".worker.js", ".ww.js"]) {
    test(`core package keeps ${suffix} separate from its entry script`, () => {
        const ejs = Object.create(EmulatorJS.prototype);
        let received;
        Object.assign(ejs, {
            config: {}, frontend: { setLoadingText() {} },
            getCore: () => "dosbox_pure",
            requiresThreads: () => false, requiresWebGL2: () => false,
            downloadType: { reports: { name: "Reports" } },
            downloadFile: () => new Promise(() => {}),
            initGameCore: (...args) => { received = args; }
        });
        ejs.downloadGameCore();
        const js = new Uint8Array([1]);
        const wasm = new Uint8Array([2]);
        const worker = new Uint8Array([3]);
        ejs.processCore({ "core.js": js, "core.wasm": wasm, ["core" + suffix]: worker });
        assert.deepEqual(received, [js, wasm, worker]);
    });

    test(`runtime can resolve ${suffix} as a JavaScript blob`, async () => {
        let options;
        const Class = loadClass("emulator.js", "EmulatorJS", {
            window: { EJS_Runtime: value => {
                options = value;
                return new Promise(() => {});
            } }
        });
        const ejs = Object.create(Class.prototype);
        ejs.frontend = { canvas: {}, elements: { parent: {} } };
        ejs.initModule(new Uint8Array([0]), new TextEncoder().encode("worker code"));
        const url = options.locateFile("core" + suffix);
        try {
            const response = await fetch(url);
            assert.equal(response.headers.get("content-type"), "application/javascript");
            assert.equal(await response.text(), "worker code");
        } finally {
            URL.revokeObjectURL(url);
        }
    });
}

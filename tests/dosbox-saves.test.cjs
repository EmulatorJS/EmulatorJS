const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const vm = require("node:vm");

function load(file, name, globals = {}) {
    const source = readFileSync(require.resolve("../data/src/" + file), "utf8")
        .replace(/^import .*;\r?\n/gm, "").replace(/^export .*;?\r?$/gm, "");
    return vm.runInNewContext(source + "\n" + name, { Uint8Array, console, ...globals });
}
const Manager = load("GameManager.js", "EJS_GameManager");

function manager(core = "dosbox_pure") {
    const g = Object.create(Manager.prototype);
    g.EJS = { getCore: () => core };
    return g;
}

test("save reads retain the nominal SRAM bytes without packaging sibling files", () => {
    for (const core of ["dosbox_pure", "dos", "snes9x"]) {
        const g = manager(core);
        const path = "/data/saves/Example.srm";
        const bytes = new Uint8Array([1, 2, 3]);
        const files = new Map([[path, bytes], ["/data/saves/Example-CDRIVE.sav", new Uint8Array([4])]]);
        g.functions = { getSaveFilePath: () => path };
        g.FS = { analyzePath: p => ({ exists: files.has(p) }), readFile: p => files.get(p) };
        assert.equal(g.getSaveFile(false), bytes);
        files.delete(path);
        assert.equal(g.getSaveFile(false), null);
        assert.equal(typeof g.createZipSaveBundle, "undefined");
        assert.equal(typeof g.loadDosBoxPureSaveBundle, "undefined");
    }
});

test("DOSBox restores browser storage before external files; other cores retain their order", async () => {
    for (const dos of [true, false]) {
        const events = [];
        const Stub = class {
            isDosBoxPure() { return dos; }
            async mountFileSystems() { events.push("mount"); }
            async loadExternalFiles() { events.push("external"); }
        };
        const E = load("emulator.js", "EmulatorJS", { EJS_GameManager: Stub });
        const e = Object.assign(Object.create(E.prototype), {
            getCore: () => dos ? "dosbox_pure" : "snes9x",
            callEvent: () => events.push("loaded")
        });
        await e.initializeGameManager();
        assert.deepEqual(events, dos ? ["mount", "external", "loaded"] : ["external", "mount", "loaded"]);
    }
});

test("startup does not continue after browser storage restoration fails", async () => {
    const E = load("emulator.js", "EmulatorJS", {
        EJS_GameManager: class {
            isDosBoxPure() { return true; }
            async mountFileSystems() { throw Error("read failed"); }
            async loadExternalFiles() { assert.fail("storage restoration failed"); }
        }
    });
    const e = Object.assign(Object.create(E.prototype), { callEvent: () => assert.fail("startup failed") });
    await assert.rejects(e.initializeGameManager(), /read failed/);
});

test("periodic DOSBox saves request persistence even without a nominal SRAM file", async () => {
    const g = manager();
    const events = [];
    let sync;
    g.functions = { saveSaveFiles: () => events.push("core") };
    g.getSaveFile = save => { assert.equal(save, false); return null; };
    g.EJS.callEvent = (name, bytes) => { events.push(name); assert.equal(bytes, null); };
    g.syncSaveFileSystem = () => { events.push("persist"); return sync = Promise.resolve(); };
    g.saveSaveFiles();
    await sync;
    assert.deepEqual(events, ["core", "saveSaveFiles", "persist"]);
});

test("overlapping persistence requests flush again and report IDBFS failures", async () => {
    const g = manager(), callbacks = [];
    g.FS = { syncfs: (populate, done) => { assert.equal(populate, false); callbacks.push(done); } };
    const first = g.syncSaveFileSystem(), second = g.syncSaveFileSystem();
    assert.equal(first, second);
    assert.equal(callbacks.length, 1);
    callbacks.shift()(null);
    await Promise.resolve();
    assert.equal(callbacks.length, 1);
    callbacks.shift()(null);
    await first;
    const failed = g.syncSaveFileSystem();
    callbacks.shift()(Error("quota"));
    await assert.rejects(failed, /quota/);
    assert.equal(g.saveSyncPromise, null);
});

test("DOSBox exit waits for persistence before unmounting and never resets the running core", async () => {
    const events = [], callbacks = [];
    let onExit;
    const ExitManager = load("GameManager.js", "EJS_GameManager", {
        clearInterval() { events.push("clear interval"); }
    });
    class MinimalManager extends ExitManager {
        writeFile() {} getRetroArchCfg() {} writeConfigFile() {} initShaders() {} setupPreLoadSettings() {}
        saveSaveFiles() { events.push("save"); }
        toggleMainLoop() { events.push("pause"); }
    }
    new MinimalManager({
        cwrap: name => () => events.push(name),
        FS: { syncfs: (populate, done) => callbacks.push(done), unmount: () => events.push("unmount") },
        abort: () => events.push("abort")
    }, { getCore: () => "dosbox_pure", on: (name, callback) => { onExit = callback; } });
    const exiting = onExit();
    assert.deepEqual(events, ["clear interval", "save", "pause"]);
    await onExit();
    callbacks.shift()(null);
    await exiting;
    assert.deepEqual(events, ["clear interval", "save", "pause", "unmount", "abort"]);
});

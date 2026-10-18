const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const { readFileSync } = require('node:fs');
const { test } = require('node:test');
const vm = require('node:vm');
function load(file, name, globals = {}) {
    const source = readFileSync(require.resolve('../data/src/' + file), 'utf8')
        .replace(/^import .*;\r?\n/gm, '').replace(/^export .*;?\r?$/gm, '');
    return vm.runInNewContext(source + '\n' + name, { Uint8Array, TextEncoder, console, ...globals });
}
const Manager = load('GameManager.js', 'EJS_GameManager');
function unzip(bytes) {
    const json = execFileSync('python3', ['-c', 'import io,json,sys,zipfile\nz=zipfile.ZipFile(io.BytesIO(sys.stdin.buffer.read()))\nassert z.testzip() is None\nprint(json.dumps({n:list(z.read(n)) for n in z.namelist()}))'], { input: Buffer.from(bytes) });
    return Object.fromEntries(Object.entries(JSON.parse(json)).map(([n, b]) => [n, new Uint8Array(b)]));
}
function manager(core = 'dosbox_pure') {
    const files = new Map(), writes = [];
    const g = Object.create(Manager.prototype);
    g.EJS = { getCore: () => core, config: { gameUrl: '/game.zip' },
        compression: { decompress: async bytes => unzip(bytes) },
        downloadType: { support: { name: 'support' } } };
    const exists = p => files.has(p) || [...files.keys()].some(n => n.startsWith(p + '/'));
    g.FS = {
        analyzePath: p => ({ exists: exists(p) }), mkdir() {},
        stat: p => ({ mode: files.has(p) ? 1 : 2 }), isFile: m => m === 1,
        readdir: p => ['.', '..', ...new Set([...files.keys()].filter(n => n.startsWith(p + '/')).map(n => n.slice(p.length + 1).split('/')[0]))],
        readFile: p => files.get(p), writeFile: (p, b) => { writes.push(p); files.set(p, new Uint8Array(b)); },
        unlink: p => files.delete(p), syncfs: (populate, done) => { assert.equal(populate, false); done(null); }
    };
    g.functions = { getSaveFilePath: () => '/data/saves/DOSBox-pure/Example.srm' };
    return { g, files, writes, add: (n, b) => files.set('/data/saves/DOSBox-pure/' + n, new Uint8Array(b)) };
}
test('DOSBox ZIP preserves disk differences and nested ZIP bytes without including similarly named games', async () => {
    const { g, add } = manager();
    const inner = g.createZipSaveBundle([{ name: 'SAVE.DAT', bytes: new Uint8Array([7]) }]);
    add('Example.pure.zip', inner);
    for (const n of ['Example.srm', 'Example.sav', 'Example.sav.zip', 'Example-CDRIVE.sav', 'Example-DDRIVE.sav', 'Example-1234ABCD.sav']) add(n, [8]);
    for (const n of ['Example-other-CDRIVE.sav', 'Example.2.pure.zip', 'Example.zip', 'Another.pure.zip']) add(n, [9]);
    const bundle = g.getSaveFile(false), entries = unzip(bundle);
    assert.equal(Object.keys(entries).length, 7);
    assert.deepEqual(entries['DOSBox-pure/Example.pure.zip'], inner);
    assert.equal(g.getSaveFileName(), 'Example.zip');
    const target = manager();
    target.add('Example-CDRIVE.sav', [1]);
    await target.g.loadDosBoxPureSaveBundle(bundle);
    assert.deepEqual(target.files.get('/data/saves/DOSBox-pure/Example-CDRIVE.sav'), new Uint8Array([1]));
    await target.g.restorePendingDosBoxPureSave();
    assert.deepEqual(target.files.get('/data/saves/DOSBox-pure/Example-CDRIVE.sav'), new Uint8Array([8]));
    assert.deepEqual(target.files.get('/data/saves/DOSBox-pure/Example.pure.zip'), inner);
    assert.equal(target.files.has(target.g.getPendingDosBoxPureSavePath()), false);
});
test('ordinary SRAM export retains its filename and bytes', () => {
    const { g, add } = manager('snes9x'); add('Example.srm', [1, 2, 3]);
    assert.deepEqual([...g.getSaveFile(false)], [1, 2, 3]);
    assert.equal(g.getSaveFileName(), 'Example.srm');
    assert.equal(manager().g.getSaveFile(false), null);
});
test('invalid paths and collisions fail before any save is written', () => {
    for (const bad of ['../file', 'DOSBox-pure/../file', '/file', 'C:\\file', 'DOSBox-pure//file', 'DOSBox-pure/./file', 'DOSBox-pure/\0file', 'OtherCore/save', '.ejs-dosbox-imports/a']) {
        const { g, writes } = manager();
        assert.throws(() => g.writeDosBoxPureSaveFiles([{ filename: 'DOSBox-pure/Example.sav', bytes: [1] }, { filename: bad, bytes: [2] }]));
        assert.equal(writes.length, 0);
    }
    for (const paths of [['DOSBox-pure/a', 'DOSBox-pure\\a'], ['DOSBox-pure/a', 'DOSBox-pure/a/b']]) {
        const { g, writes } = manager();
        assert.throws(() => g.writeDosBoxPureSaveFiles(paths.map(filename => ({ filename, bytes: [1] }))));
        assert.equal(writes.length, 0);
    }
});
test('external save bundle is force-extracted even behind a .srm URL', async () => {
    const { g, files } = manager();
    g.EJS.config.externalFiles = { '/data/saves/': '/save.srm' };
    g.EJS.downloadFile = async (...args) => {
        assert.equal(args[5], true);
        return { data: { files: [{ filename: 'DOSBox-pure/Example-CDRIVE.sav', bytes: new Uint8Array([3]) }] } };
    };
    await g.loadExternalFiles();
    assert.deepEqual([...files.get('/data/saves/DOSBox-pure/Example-CDRIVE.sav')], [3]);
});
test('DOSBox initializes IDBFS before external and pending restores; other cores retain their order', async () => {
    for (const dos of [true, false]) {
        const events = [];
        const Stub = class {
            isDosBoxPure() { return dos; }
            async mountFileSystems() { events.push('mount'); }
            async loadExternalFiles() { events.push('external'); }
            async restorePendingDosBoxPureSave() { events.push('pending'); }
        };
        const E = load('emulator.js', 'EmulatorJS', {
            EJS_GameManager: Stub,
            EJS_COMPRESSION: class { constructor() { events.push('compression'); } }
        });
        const e = Object.assign(Object.create(E.prototype), { getCore: () => dos ? 'dosbox_pure' : 'snes9x', callEvent: () => events.push('loaded') });
        await e.initializeGameManager();
        assert.deepEqual(events, dos ? ['compression', 'mount', 'external', 'pending', 'loaded'] : ['external', 'mount', 'loaded']);
    }
});
test('overlapping persistence requests flush again and report IDBFS failures', async () => {
    const { g } = manager(), callbacks = [];
    g.FS.syncfs = (populate, done) => callbacks.push(done);
    const first = g.syncSaveFileSystem(), second = g.syncSaveFileSystem();
    assert.equal(first, second); assert.equal(callbacks.length, 1);
    callbacks.shift()(null); await Promise.resolve();
    assert.equal(callbacks.length, 1);
    callbacks.shift()(null); await first;
    const failed = g.syncSaveFileSystem();
    callbacks.shift()(new Error('quota')); await assert.rejects(failed, /quota/);
    assert.equal(g.saveSyncPromise, null);
});
test('failed imported-save flush retains staged data for retry', async () => {
    const { g, add, files } = manager(); add('Example-CDRIVE.sav', [1]);
    await g.loadDosBoxPureSaveBundle(g.getSaveFile(false));
    g.FS.syncfs = (populate, done) => done(new Error('disk full'));
    await assert.rejects(g.restorePendingDosBoxPureSave(), /disk full/);
    assert.equal(files.has(g.getPendingDosBoxPureSavePath()), true);
});
test('DOSBox exit waits for persistence before unmounting and never resets the running core', async () => {
    const events = [], callbacks = [];
    let onExit;
    const ExitManager = load('GameManager.js', 'EJS_GameManager', { clearInterval() { events.push('clear interval'); } });
    class MinimalManager extends ExitManager {
        writeFile() {} getRetroArchCfg() {} writeConfigFile() {} initShaders() {} setupPreLoadSettings() {}
        saveSaveFiles() { events.push('save'); }
        toggleMainLoop() { events.push('pause'); }
    }
    const g = new MinimalManager({
        cwrap: name => () => events.push(name),
        FS: { syncfs: (populate, done) => callbacks.push(done), unmount: () => events.push('unmount') },
        abort: () => events.push('abort')
    }, { getCore: () => 'dosbox_pure', on: (name, callback) => { onExit = callback; } });
    const exiting = onExit();
    assert.deepEqual(events, ['clear interval', 'save', 'pause']);
    await onExit();
    callbacks.shift()(null); await exiting;
    assert.deepEqual(events, ['clear interval', 'save', 'pause', 'unmount', 'abort']);
});

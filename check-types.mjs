import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.dirname(fileURLToPath(import.meta.url));
const tempRoot = await mkdtemp(path.join(tmpdir(), "emulatorjs-types-"));

const run = (command, args, cwd, output = "inherit") => {
    return execFileSync(command, args, {
        cwd,
        stdio: output,
        encoding: output === "pipe" ? "utf8" : undefined,
    });
};

try {
    const packOutput = run("npm", ["pack", "--json", "--pack-destination", tempRoot], repoRoot, "pipe");
    const [{ filename } = {}] = JSON.parse(packOutput);

    if (!filename) {
        throw new Error("npm pack did not return a tarball filename");
    }

    const consumerRoot = path.join(tempRoot, "consumer");
    const installedPackageRoot = path.join(consumerRoot, "node_modules", "@emulatorjs", "emulatorjs");
    const tsconfigPath = path.join(consumerRoot, "tsconfig.json");
    const smokeTestPath = path.join(consumerRoot, "smoke-test.ts");
    const tarballPath = path.join(tempRoot, filename);
    const tscPath = path.join(repoRoot, "node_modules", "typescript", "lib", "tsc.js");

    await mkdir(installedPackageRoot, { recursive: true });

    await writeFile(
        path.join(consumerRoot, "package.json"),
        `${JSON.stringify({
            name: "emulatorjs-types-smoke",
            private: true,
            type: "module",
        }, null, 2)}\n`,
    );

    run("tar", ["-xzf", tarballPath, "-C", installedPackageRoot, "--strip-components=1"], repoRoot);

    await writeFile(
        tsconfigPath,
        `${JSON.stringify({
            compilerOptions: {
                target: "ES2022",
                module: "NodeNext",
                moduleResolution: "NodeNext",
                lib: ["ES2022", "DOM", "DOM.Iterable"],
                noEmit: true,
                strict: true,
                skipLibCheck: false,
            },
            include: ["./smoke-test.ts"],
        }, null, 2)}\n`,
    );

    await writeFile(
        smokeTestPath,
        `import EmulatorJS, { type EmulatorJSConfig, version } from "@emulatorjs/emulatorjs";
import { EJS_Cache } from "@emulatorjs/emulatorjs/data/src/cache.js";
import "@emulatorjs/emulatorjs/data/loader.js";
import type { LoaderGlobalConfig, RuntimeFactory } from "@emulatorjs/emulatorjs/data/loader.js";

const config = {
    gameUrl: "/roms/mario.nes",
    system: "nes",
    dataPath: "https://cdn.emulatorjs.org/stable/data/",
} satisfies EmulatorJSConfig;

const emulator = new EmulatorJS("#game", config);

emulator.on("ready", () => {});
emulator.on("saveState", (event) => {
    const state: Uint8Array = event.state;
    const format: string = event.format;

    void state;
    void format;
});

const cache = new EJS_Cache(true);
const cacheKey: string = cache.generateCacheKey(new Uint8Array([version.length]));
const loaderConfig: LoaderGlobalConfig = {
    EJS_player: "#game",
    EJS_core: "nes",
    EJS_gameUrl: config.gameUrl,
    EJS_pathToData: config.dataPath,
};
const runtime: RuntimeFactory = async (options) => ({
    canvas: options.canvas,
});

window.EJS_player = loaderConfig.EJS_player;
window.EJS_gameUrl = loaderConfig.EJS_gameUrl;
window.EJS_core = loaderConfig.EJS_core;
window.EJS_pathToData = loaderConfig.EJS_pathToData;
window.EJS_Runtime = runtime;
window.EJS_emulator = emulator;
window.EJS_emulator?.on("saveState", (event) => {
    const screenshot: Uint8Array = event.screenshot;

    void screenshot;
});

void cacheKey;

// @ts-expect-error EJS_player must be a string selector
const invalidLoaderConfig: LoaderGlobalConfig = { EJS_player: 123 };

// @ts-expect-error EmulatorJSConfig requires a system string
const invalidConfig: EmulatorJSConfig = { gameUrl: "/roms/mario.nes", dataPath: "/data/" };

void invalidLoaderConfig;
void invalidConfig;
`,
    );

    run(process.execPath, [tscPath, "--project", tsconfigPath], repoRoot);
    console.log("Type definitions smoke test passed.");
} finally {
    await rm(tempRoot, { recursive: true, force: true });
}

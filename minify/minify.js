import path from "path";
import { promises as fs } from "fs";
import { fileURLToPath } from "url";

import { rollup } from "rollup";
import terser from "@rollup/plugin-terser";

import { minify } from "@node-minify/core";
import { cleanCss } from "@node-minify/clean-css";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootPath = path.resolve(__dirname, "../");

async function doMinify() {
    try {
        const bundle = await rollup({
            input: path.join(rootPath, "data/src/emulator.js"),
            context: "window",
            plugins: [terser()]
        });

        await bundle.write({
            file: path.join(rootPath, "data/emulator.min.js"),
            format: "es",
            sourcemap: true
        });
        console.log("Bundled and Minified JS");

        await minify({
            compressor: cleanCss,
            input: path.join(rootPath, "data/emulator.css"),
            output: path.join(rootPath, "data/emulator.min.css"),
        });
        console.log("Minified CSS");
    } catch(e) {
        console.error(e);
    }
}

console.log("Minifying");
(async () => {
    await doMinify();
    console.log("Minifying Done!");
})();

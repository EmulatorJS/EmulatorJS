import { defineConfig } from "vite";

export default defineConfig({
  // Serve from repo root; Vite will pick up index.html automatically.
  root: ".",

  server: {
    port: 5173,
    // PPSSPP core requires SharedArrayBuffer, which is gated behind
    // Cross-Origin Isolation (COOP + COEP). The dev server sets these
    // headers directly; for static production deployments the included
    // coi-serviceworker.js injects them at the service-worker level.
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  preview: {
    port: 4173,
    headers: {
      "Cross-Origin-Opener-Policy": "same-origin",
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },

  build: {
    outDir: "dist",
    emptyOutDir: true,
    // Keep the output readable; minification is fine for production
    rollupOptions: {
      input: "index.html",
    },
  },
});

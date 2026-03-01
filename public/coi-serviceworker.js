/**
 * coi-serviceworker — Cross-Origin Isolation via Service Worker
 *
 * The PSP/PPSSPP emulator core requires SharedArrayBuffer (for threading).
 * SharedArrayBuffer is only available in Cross-Origin Isolated contexts, which
 * need these HTTP response headers:
 *   Cross-Origin-Opener-Policy: same-origin
 *   Cross-Origin-Embedder-Policy: require-corp
 *
 * Static hosts (GitHub Pages, Netlify, etc.) do not let you set custom headers.
 * This service worker intercepts every fetch response and injects those headers,
 * then causes the page to reload once the worker is controlling the client.
 *
 * In development, Vite already sets the headers directly (see vite.config.ts),
 * so the worker registration is skipped (`window.crossOriginIsolated === true`).
 *
 * Adapted from https://github.com/gzuidhof/coi-serviceworker (MIT License).
 */

/* ── Service Worker context ────────────────────────────────────────────────── */
if (typeof window === "undefined") {
  self.addEventListener("install", () => {
    // Take control immediately instead of waiting for the old SW to expire.
    self.skipWaiting();
  });

  self.addEventListener("activate", (event) => {
    event.waitUntil(self.clients.claim());
  });

  self.addEventListener("fetch", (event) => {
    const req = event.request;

    // Skip non-http(s) requests (chrome-extension://, etc.)
    if (!req.url.startsWith("http")) return;

    // Avoid fetching with cache = "only-if-cached" on cross-origin requests,
    // which throws a TypeError in some browsers.
    if (req.cache === "only-if-cached" && req.mode !== "same-origin") return;

    event.respondWith(
      fetch(req)
        .then((response) => {
          // Opaque / error responses – pass through unchanged.
          if (response.status === 0 || !response.ok && response.type === "opaque") {
            return response;
          }

          const headers = new Headers(response.headers);
          // These three headers together satisfy Cross-Origin Isolation:
          //   COOP  – prevents cross-origin windows from sharing a browsing
          //            context group with this page.
          //   COEP  – prevents cross-origin resources from being loaded unless
          //            they explicitly opt in (CORP or CORS).
          //   CORP  – added to every resource so COEP: require-corp succeeds
          //            even for CDN assets that don't set the header themselves.
          headers.set("Cross-Origin-Opener-Policy", "same-origin");
          headers.set("Cross-Origin-Embedder-Policy", "require-corp");
          headers.set("Cross-Origin-Resource-Policy", "cross-origin");

          return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers,
          });
        })
        .catch(() => {
          // Network failure – let the browser surface its own error.
          return fetch(req);
        })
    );
  });

/* ── Window / main-thread context ──────────────────────────────────────────── */
} else {
  // If the page is already cross-origin isolated (e.g., dev server sets the
  // headers) we don't need the service worker at all.
  if (!self.crossOriginIsolated && "serviceWorker" in navigator) {
    (async () => {
      try {
        // Register this very script as a service worker.
        const swUrl = document.currentScript.src;
        const reg = await navigator.serviceWorker.register(swUrl, { scope: "/" });

        // If the SW is newly installed and there is no controller yet, wait for
        // controllerchange and then reload so the SW can intercept requests.
        if (!navigator.serviceWorker.controller) {
          await new Promise((resolve) => {
            navigator.serviceWorker.addEventListener("controllerchange", resolve, {
              once: true,
            });
          });
          // The reload activates the service worker for this client.
          window.location.reload();
        } else {
          // A controller exists; check if our SW is up-to-date.
          reg.addEventListener("updatefound", () => {
            const newWorker = reg.installing;
            if (!newWorker) return;
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "activated" &&
                navigator.serviceWorker.controller
              ) {
                window.location.reload();
              }
            });
          });
        }
      } catch (err) {
        // Service worker registration failed (e.g. file:// protocol).
        // The emulator will still load but SharedArrayBuffer may be absent;
        // the emulator wrapper will detect this and show an error.
        console.warn("[coi-sw] Service worker registration failed:", err);
      }
    })();
  }
}

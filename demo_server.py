#!/usr/bin/env python3
"""Demo server for EmulatorJS with the ps2web core.

Serves the EmulatorJS repo (data/ + a demo page) with:
  - Cross-Origin-Opener-Policy: same-origin
  - Cross-Origin-Embedder-Policy: require-corp
  - HTTP Range requests (the ps2web runtime streams the disc with them)
  - /disc.iso -> the game's disc image

usage: demo_server.py <repo root> <disc iso> [port]
open:  http://localhost:8621/ps2-demo.html
"""
import http.server
import os
import sys

ROOT = os.path.abspath(sys.argv[1])
DISC = os.path.abspath(sys.argv[2])
PORT = int(sys.argv[3]) if len(sys.argv) > 3 else 8621

TYPES = {
    '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript',
    '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm',
    '.data': 'application/octet-stream', '.iso': 'application/octet-stream',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2',
    '.glslp': 'text/plain', '.txt': 'text/plain',
}


class Handler(http.server.BaseHTTPRequestHandler):
    protocol_version = 'HTTP/1.1'

    def target(self):
        path = self.path.split('?', 1)[0]
        if path in ('/', '/index.html'):
            path = '/ps2-demo.html'
        if path == '/disc.iso':
            return DISC
        name = os.path.normpath(path.lstrip('/'))
        if name.startswith('..') or os.path.isabs(name):
            return None
        full = os.path.join(ROOT, name)
        return full if os.path.isfile(full) else None

    def send_common_headers(self, length):
        self.send_header('Accept-Ranges', 'bytes')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Resource-Policy', 'same-origin')
        self.send_header('Cache-Control', 'no-store')
        self.send_header('Content-Length', str(length))

    def do_HEAD(self):
        path = self.target()
        if not path:
            self.send_error(404)
            return
        self.send_response(200)
        self.send_header('Content-Type', TYPES.get(os.path.splitext(path)[1], 'application/octet-stream'))
        self.send_common_headers(os.path.getsize(path))
        self.end_headers()

    def do_GET(self):
        path = self.target()
        if not path:
            self.send_error(404)
            return
        size = os.path.getsize(path)
        start, end = 0, size - 1
        rng = self.headers.get('Range')
        status = 200
        if rng and rng.startswith('bytes='):
            spec = rng[6:].split('-', 1)
            try:
                if spec[0]:
                    start = int(spec[0])
                if len(spec) > 1 and spec[1]:
                    end = int(spec[1])
                if not spec[0] and len(spec) > 1 and spec[1]:
                    start = max(0, size - int(spec[1]))
                    end = size - 1
                end = min(end, size - 1)
                if start > end:
                    raise ValueError
                status = 206
            except ValueError:
                self.send_response(416)
                self.send_header('Content-Range', f'bytes */{size}')
                self.end_headers()
                return
        self.send_response(status)
        self.send_header('Content-Type', TYPES.get(os.path.splitext(path)[1], 'application/octet-stream'))
        length = end - start + 1
        self.send_common_headers(length)
        if status == 206:
            self.send_header('Content-Range', f'bytes {start}-{end}/{size}')
        self.end_headers()
        with open(path, 'rb') as f:
            f.seek(start)
            remaining = length
            while remaining > 0:
                chunk = f.read(min(1 << 20, remaining))
                if not chunk:
                    break
                try:
                    self.wfile.write(chunk)
                except (BrokenPipeError, ConnectionResetError):
                    return
                remaining -= len(chunk)

    def log_message(self, fmt, *args):
        pass


if __name__ == '__main__':
    print(f'serving {ROOT} with disc {DISC} on http://localhost:{PORT}/')
    http.server.ThreadingHTTPServer(('', PORT), Handler).serve_forever()

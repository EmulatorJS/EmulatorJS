#!/usr/bin/env python3
from http.server import HTTPServer, SimpleHTTPRequestHandler, test
import sys

class CORSRequestHandler (SimpleHTTPRequestHandler):
    def end_headers (self):
        self.send_header('Cross-Origin-Embedder-Policy', 'require-corp')
        self.send_header('Cross-Origin-Opener-Policy', 'same-origin')
        # Force EJS's IndexedDB cache to revalidate against Last-Modified on
        # every request instead of trusting the 5-day default expiry. Without
        # this the user keeps getting served the first-downloaded core after
        # we rebuild it.
        self.send_header('Cache-Control', 'max-age=0, must-revalidate')
        SimpleHTTPRequestHandler.end_headers(self)

def main():
    test(CORSRequestHandler, HTTPServer, port=int(sys.argv[1]) if len(sys.argv) > 1 else 8000)

if __name__ == '__main__':
    main()

export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            // 2025: top-level await (2022) and the import-attributes options
            // argument `import(url, { with: { type: "css" } })` in
            // data/src/webcomponent.js.
            ecmaVersion: 2025,
            sourceType: "module",
            globals: {
                console: "readonly",
                window: "readonly",
                document: "readonly",
                navigator: "readonly",
                fetch: "readonly",
                localStorage: "readonly",
                sessionStorage: "readonly"
            }
        },
        rules: {
            "no-var": "warn",
            "prefer-const": "warn",
            "prefer-arrow-callback": "warn"
        }
    }
];

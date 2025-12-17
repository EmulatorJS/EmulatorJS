export default [
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2020,
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

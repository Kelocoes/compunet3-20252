import { defineConfig } from "eslint/config";
import { FlatCompat } from "@eslint/eslintrc";
import eslintRecommended from "@eslint/js";

const compat = new FlatCompat({
    baseDirectory: import.meta.dirname || process.cwd(),
    recommendedConfig: eslintRecommended.configs.recommended,
});

export default defineConfig([
    ...compat.config({
        extends: ["plugin:react/recommended", "plugin:react-hooks/recommended", "plugin:@typescript-eslint/recommended", "eslint:recommended", "plugin:import/recommended", "plugin:import/typescript", "prettier"],
        env: {
            browser: true,
            node: true,
        },
        rules: {
            "react/prop-types": 0,
            "react/react-in-jsx-scope": "off",
            "max-len": ["error", { code: 250 }],
            quotes: ["error", "double"],
            "no-unused-vars": [
                "error",
                {
                    vars: "all",
                    args: "all",
                    argsIgnorePattern: "^_",
                },
            ],
            "import/order": [
                "error",
                {
                    groups: ["builtin", "external", "internal", "parent", "sibling", "index"],
                    "newlines-between": "always",
                },
            ],
            indent: ["error", 4],
            "no-multiple-empty-lines": ["error", { max: 1, maxEOF: 1 }],
            "block-spacing": "error",
            semi: ["error", "always"],
            camelcase: "off",
            "no-console": ["error", { allow: ["info", "warn", "error"] }],
        },
        ignorePatterns: ["dist", "build", "vite.config.ts", "eslint.config.js"],
        settings: {
            react: {
                version: "detect",
            },
        },
    }),
]);

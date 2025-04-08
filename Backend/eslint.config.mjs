import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";


/** @type {import('eslint').Linter.Config[]} */
export default [
  // 1. Match all JavaScript/TypeScript files
  {
    files: ["**/*.{js,cjs,mjs,ts,tsx,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // 2. Add parser for TypeScript
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json", // Optional, required for rules using type info
      },
    },
  },

  // 3. Enable JSX support
  {
    files: ["**/*.tsx"],
    languageOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  // 4. React plugin settings
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },

  // 5. Core ESLint + TypeScript + React rules
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  // 6. Custom rules (optional)
  {
    rules: {
      "react/react-in-jsx-scope": "off", // Not needed for React 17+
      "no-console": "warn",
      "no-debugger": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
];
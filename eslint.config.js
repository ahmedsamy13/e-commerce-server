import js from "@eslint/js";
import globals from "globals";
import prettier from "eslint-config-prettier";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/node_modules*/**",
      ".agents/skills/**",
      ".claude/skills/**",
      ".cursor/skills/**",
      ".devin/skills/**",
      "src/prisma/contract.d.ts",
      "migrations/**",
      "dist/**",
      "coverage/**",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    extends: [js.configs.recommended],
    languageOptions: { globals: globals.node },
  },
  prettier,
]);

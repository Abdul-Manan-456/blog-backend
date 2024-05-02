import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import { rules } from "eslint-config-prettier";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    rules: {
      // "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "warn",
    },
  },
];
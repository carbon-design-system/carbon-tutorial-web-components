import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';

export default [
  {
    languageOptions: {
      ecmaVersion: 2024,
      globals: {
        ...globals.es2024,
        ...globals.browser,
      },
    },
  },
  { ignores: ['node_modules', 'dist'] },
  js.configs.recommended,
  eslintConfigPrettier,
];

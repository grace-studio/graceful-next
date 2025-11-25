// import eslintConfigPrettier from 'eslint-config-prettier';
// import eslintPluginPrettier from 'eslint-plugin-prettier';
// import eslintPluginImport from 'eslint-plugin-import';
// import tseslint from 'typescript-eslint';

// export default [
//   {
//     ignores: [
//       '.next/**',
//       'node_modules/**',
//       'dist/**',
//       'build/**',
//       'dev/**',
//       '**/*.min.js',
//     ],
//   },
//   ...tseslint.configs.recommended,
//   {
//     files: ['lib/**/*.{js,jsx,ts,tsx}'],
//     languageOptions: {
//       parser: tseslint.parser,
//       parserOptions: {
//         ecmaVersion: 'latest',
//         sourceType: 'module',
//         ecmaFeatures: {
//           jsx: true,
//         },
//       },
//     },
//     plugins: {
//       prettier: eslintPluginPrettier,
//       import: eslintPluginImport,
//       '@typescript-eslint': tseslint.plugin,
//     },
//     rules: {
//       quotes: [1, 'single'],
//       'padding-line-between-statements': [
//         1,
//         { blankLine: 'always', prev: '*', next: 'return' },
//       ],
//     },
//   },
//   eslintConfigPrettier,
// ];

import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    'dev/**',
    'tests/**',
  ]),
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]);

export default eslintConfig;

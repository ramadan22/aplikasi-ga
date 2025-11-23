import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],

    languageOptions: {
      parser: (await import('@typescript-eslint/parser')).default,
      parserOptions: {
        project: './tsconfig.json',
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },

    plugins: {
      '@typescript-eslint': (await import('@typescript-eslint/eslint-plugin')).default,
      prettier: (await import('eslint-plugin-prettier')).default,
      react: (await import('eslint-plugin-react')).default,
      'react-hooks': (await import('eslint-plugin-react-hooks')).default,
      import: (await import('eslint-plugin-import')).default,
      'eslint-comments': (await import('eslint-plugin-eslint-comments')).default,
    },

    rules: {
      /** ============================
       *  🔥 Anti Disable Rules
       * ============================ */

      // Tidak boleh pakai /* eslint-disable */
      // 'eslint-comments/no-use': 'warn',

      // Tidak boleh pakai @ts-ignore
      '@typescript-eslint/ban-ts-comment': [
        'error',
        {
          'ts-ignore': true,
          'ts-nocheck': true,
          'ts-check': false,
          'ts-expect-error': true,
        },
      ],

      // Tidak boleh pakai any
      '@typescript-eslint/no-explicit-any': 'warn',

      "@typescript-eslint/no-unused-vars": [
        "error",
        { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }
      ],

      // Prevent unused eslint-disable
      'eslint-comments/no-unused-disable': 'error',


      /** ============================
       *  Existing Rules Kamu (Tidak Saya Ubah)
       * ============================ */

      'react-hooks/exhaustive-deps': 'off',
      'import/no-duplicates': 'error',
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'off',
      'react/jsx-props-no-spreading': 'off',
      'comma-dangle': 'off',
      'import/prefer-default-export': 'off',
      'react/jsx-key': 'off',
      'linebreak-style': 'off',
      'react/jsx-indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'eol-last': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],

      'react/jsx-wrap-multilines': [
        'error',
        { arrow: 'parens-new-line' },
      ],

      'react/jsx-one-expression-per-line': [
        'error',
        { allow: 'single-child' },
      ],

      'react/require-default-props': [
        'off',
        { ignoreFunctionalComponents: true },
      ],

      'import/extensions': [
        'error',
        'never',
        {
          jpeg: 'ignorePackages',
          svg: 'ignorePackages',
          json: 'ignorePackages',
          type: 'ignorePackages',
          png: 'ignorePackages',
          css: 'ignorePackages',
          scss: 'ignorePackages',
        },
      ],

      'react/jsx-filename-extension': [
        'error',
        { extensions: ['.tsx', '.ts'] },
      ],

      'react/function-component-definition': [
        'error',
        { namedComponents: 'arrow-function' },
      ],

      'import/no-extraneous-dependencies': [
        0,
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: false,
        },
      ],

      'array-element-newline': [
        'error',
        {
          ArrayExpression: 'consistent',
          ArrayPattern: 'consistent',
        },
      ],

      'no-console': [
        process.env.NODE_ENV === 'production' ? 'error' : 'warn',
        { allow: ['warn', 'error'] },
      ],

      // Prettier
      'prettier/prettier': ['error'],
    },

    settings: {
      react: { version: 'detect' },
    },
  },
];

export default eslintConfig;

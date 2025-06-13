import babelParser from '@babel/eslint-parser';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});

export default defineConfig([{
  extends: compat.extends('eslint:recommended'),

  languageOptions: {
    globals: {
      ...globals.node,
    },

    parser: babelParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }],
    // Regras para consistência de módulos
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
  },
}, {
  // Configuração específica para arquivos .cjs (migrações e seeders)
  files: ['**/*.cjs'],
  languageOptions: {
    sourceType: 'script',
    globals: {
      ...globals.node,
      module: 'readonly',
      exports: 'readonly',
      require: 'readonly',
    },
  },
  rules: {
    // Permitir require() em arquivos .cjs
    'prefer-const': 'error',
    'no-var': 'error',
  },
}]);
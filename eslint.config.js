import eslint from '@eslint/js';
import globals from 'globals';
import prettier from 'eslint-config-prettier';

export default [
  eslint.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: { ...globals.browser },
    },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'no-console': 'warn',
      'no-empty': ['error', { allowEmptyCatch: true }],
    },
  },
  prettier,
];

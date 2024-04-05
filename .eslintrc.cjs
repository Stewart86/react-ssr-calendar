/** @type {import("eslint").Linter.Config} */
const config = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    'isaacscript',
    'import',
    '@typescript-eslint',
    'autofix',
    'prettier',
  ],
  extends: [
    'next',
    'next/core-web-vitals',
    'prettier',
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  overrides: [],
  rules: {
    '@typescript-eslint/no-misused-promises': [
      'error',
      {
        checksVoidReturn: {
          attributes: false,
        },
      },
    ],
    '@typescript-eslint/ban-ts-comment': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-empty-function': 'warn',
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/restrict-template-expressions': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        fixStyle: 'inline-type-imports',
      },
    ],
    '@typescript-eslint/prefer-nullish-coalescing': [
      'error',
      { ignoreConditionalTests: true },
    ],
    '@next/next/no-img-element': 'error',
    '@next/next/no-html-link-for-pages': 'off',
    'import/consistent-type-specifier-style': ['error', 'prefer-inline'],
    'autofix/arrow-body-style': 'error',
    'autofix/arrow-spacing': 'error',
    'autofix/eqeqeq': 'error',
    'autofix/no-else-return': 'error',
    'autofix/no-var': 'error',
    'autofix/no-unused-vars': 'error',
    'autofix/no-unused-labels': 'error',
    'react/display-name': 'warn',
    'react/no-children-prop': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'isaacscript/complete-sentences-jsdoc': 'warn',
    'isaacscript/format-jsdoc-comments': 'warn',
  },
  ignorePatterns: [
    '**/*.config.js',
    '**/*.config.cjs',
    '**/*.config.mjs',
    'global.d.ts',
    'node_modules/',
  ],
  reportUnusedDisableDirectives: true,
}

module.exports = config

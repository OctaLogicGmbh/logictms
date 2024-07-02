module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  ignorePatterns: ['build', 'dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },

  plugins: ['react', 'react-refresh', '@typescript-eslint'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect',
    },
    'import/ignore': [/\.(css|scss|pcss)$/g],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  rules: {
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'import/no-unresolved': 'off',
    'sort-imports': ['error', { ignoreCase: true, ignoreDeclarationSort: true }],
    'import/order': [
      1,
      {
        groups: [
          ['external', 'builtin'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'object',
          'type',
          'unknown',
        ],

        'newlines-between': 'always',

        pathGroups: [
          {
            pattern: 'react(**|**/**)',
            group: 'external',
            position: 'before',
          },
          {
            pattern: '@**/**',
            group: 'external',
            position: 'after',
          },
          {
            pattern: '@/**',
            group: 'internal',
          },

          {
            pattern: '{.,..}/**/*.(css|scss|pcss)',
            group: 'sibling',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react'],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
};

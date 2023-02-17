module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  plugins: ['@typescript-eslint', 'align-import'],
  parser: '@typescript-eslint/parser',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  root: true,
  rules: {
    'no-multi-spaces': ['error', { exceptions: { ImportDeclaration: true } }],
    'function-paren-newline': ['error', 'never'],
    'function-call-argument-newline': ['error', 'never'],
    'padded-blocks': ['error', 'always', { allowSingleLineBlocks: true }],
    indent: ['error', 2],
    'align-import/align-import': 'error'
  }
}

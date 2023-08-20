module.exports = {
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: 'plugin:@typescript-eslint/recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
  },
  rules: {
    '@typescript-eslint/no-explicit-any': 'off', //FIXME: remove this
    'eol-last': 2,
    'no-multiple-empty-lines': [2, { max: 2, maxEOF: 1 }],
    'linebreak-style': ['error', 'unix'],
    quotes: [
      'error',
      'single',
      {
        avoidEscape: true,
      },
    ],
    semi: ['error', 'always'],
    'prettier/prettier': 'error',
  },
};

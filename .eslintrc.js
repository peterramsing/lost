module.exports = {
  env: {
    node: true,
  },
  plugins: ['prettier'],
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2022,
  },
  rules: {
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

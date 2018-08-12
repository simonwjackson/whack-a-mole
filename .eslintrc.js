module.exports = {
  "extends": "eslint:recommended",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "modules": true,
      "experimentalObjectRestSpread": true
    }
  },
  "env": {
    "es6": true,
    "browser": true,
    "node": true,
    "mocha": true
  },
  "rules": {
    'arrow-parens': ['error', 'as-needed'],
    quotes: ['error', 'single'],
    'indent': ['error', 2],
    'space-before-function-paren': ['error', 'always'],
    'arrow-spacing': [2, {
      'before': true,
      'after': true
    }],
    'no-unused-vars': 'error',
    semi: ['error', 'never']
  }
}
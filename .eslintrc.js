module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  parser: "vue-eslint-parser",
  env: {
    browser: true,
    node: true,
    es6: true
  },
  'extends': [
    'plugin:vue/essential',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-unused-vars': 'off',
    'no-mixed-spaces-and-tabs': 'error'
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    'standard-with-typescript'
  ],
  overrides: [
  ],
  parserOptions: {
    // ecmaVersion: 'latest',
    ecmaVersion: 13,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    // 关闭给vue组件命名，vue3会自动把文件名当作name
    'vue/multi-word-component-names': 'off',
    'space-before-function-paren': 'off',
    'func-call-spacing': 'off'
  }
}

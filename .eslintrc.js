module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:vue/essential',
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': "off",
    'no-multiple-template-roo': 'off',
    'vue/no-multiple-template-root': 'off',
    'no-unused-vars': 'off',
    'import/first': 'off',
    'vue/no-v-model-argument': 'off'
  }
}

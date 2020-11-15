module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/recommended',
    '@vue/standard'
  ],
  // eslint-plugin-vue 规则配置参考: https://eslint.vuejs.org/rules/
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'vue/html-closing-bracket-newline': 'off', // 标签右尖括号不换行
    'vue/singleline-html-element-content-newline': 'off', // 开始结束标签在一行,内容不换行
    'vue/require-default-prop': 'off', // 不强制给prop添加默认值
    'vue/no-v-html': 'off', // 可以使用v-html
    'vue/max-attributes-per-line': ['error', { // 标签属性大于2个的，要自动换行
      'singleline': 2,
      'multiline': {
        'max': 1,
        'allowFirstLine': false
      }
    }]

  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

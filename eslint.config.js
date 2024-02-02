const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  vue: {
    vueVersion: 2,
    sfcBlocks: true,
  },
  formatters: {
    css: true, // Not effective
    html: true, // Not effective
    markdown: 'prettier', // Not effective
  },
}, {
  rules: {
    curly: ['error', 'all'],
  },
})

const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  vue: {
    sfcBlocks: true,
    vueVersion: 2,
  },
})

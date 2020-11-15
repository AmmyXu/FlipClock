module.exports = {
  pages: {
    index: process.env.VUE_APP_ENTRY
  },
  productionSourceMap: process.env.NODE_ENV !== 'production',
  configureWebpack: {
    output: {
      filename: 'flip-clock.min.js',
      library: 'flip-clock',
      libraryTarget: 'umd',
      umdNamedDefine: true
    }
  }
}

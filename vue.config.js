const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  devServer: {
    disableHostCheck: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/production/' : '/',
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_l', resolve('src/libs'))
      .set('_c', resolve('src/components'))
      .set('@static', resolve('src/static'))
  },
  productionSourceMap: false
}
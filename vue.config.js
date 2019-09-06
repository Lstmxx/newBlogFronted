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
      .set('@lib', resolve('src/libs'))
      .set('@api', resolve('src/api/xbei'))
      .set('@static', resolve('src/static'))
  },
  productionSourceMap: false
}
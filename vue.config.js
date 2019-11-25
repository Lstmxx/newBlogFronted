const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production/' : '/',
  lintOnSave: true,
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_l', resolve('src/libs'))
      .set('_c', resolve('src/components'))
      .set('@static', resolve('src/static'))
      .set('@less', resolve('src/less'))
  },

  productionSourceMap: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/less/base/base.less')]
    }
  }
}
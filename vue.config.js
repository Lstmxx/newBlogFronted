const path = require('path')

const assetsDir = ''
function resolve (dir) {
  return path.join(__dirname, dir)
}
function getAssetPath (assetsDir, filePath) {
  return assetsDir
    ? path.posix.join(assetsDir, filePath)
    : filePath
}
const bundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
/* eslint-disable */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  lintOnSave: true,
  devServer: {
    disableHostCheck: true
  },
  css: {
    extract: process.env.NODE_ENV === 'production',
    sourceMap: false
  },
  configureWebpack: {
    externals: {
    },
    plugins: [
      new bundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerHost: '127.0.0.1',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        defaultSizes: 'parsed'
      })
    ],
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload')
    config.module
    .rule('node')
    .test(/\.node$/)
      .use('node-loader')
        .loader('node-loader')
        .end()
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_l', resolve('src/libs'))
      .set('_c', resolve('src/components'))
      .set('@static', resolve('src/static'))
      .set('@less', resolve('src/less'))
     const svgRule = config.module.rule('svg')
    // 清除已有的所有 loader。
    // 如果你不这样做，接下来的 loader 会附加在该规则现有的 loader 之后。
    svgRule.uses.clear()
    svgRule
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icon'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]'
      })
    const fileRule = config.module.rule('file')
    fileRule.uses.clear()
    fileRule
      .test(/\.svg$/)
      .exclude.add(resolve('src/assets/icon'))
      .end()
      .use('file-loader')
      .loader('file-loader')
      if (process.env.NODE_ENV === 'production') {
        const filename = getAssetPath(
          assetsDir,
          `js/[name].[contenthash:8].js`
        )
        config.mode('production').devtool(false).output.filename(filename).chunkFilename(filename)
      }
  },
  productionSourceMap: false,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, 'src/less/base/base.less')]
    }
  }
}

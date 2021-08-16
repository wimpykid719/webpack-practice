const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConf = require('./webpack.common')

const outputFile = '[name]'
const assetFile = '[name]'

module.exports = () => merge(commonConf({ outputFile, assetFile }),  {
  mode: 'development', //分割
  // これを使用するとchromeの検証でビルド前のファイルも確認できるのでデバックが取りやすくなる。
  devtool: 'source-map', // 分割
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    port: 8080,
    host: '0.0.0.0',
    watchOptions: {
      ignored: /node_modules/
    }
  },
 
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src', 'index.html'),
      inject: 'body' // 分割
    })
  ]
})
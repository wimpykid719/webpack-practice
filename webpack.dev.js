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
      inject: 'body', // 分割
      // app.jsを代入したい場合は下記を記述する。
      // app.jsはscssとjqueryに依存している。
      chunks: ['app']
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src', 'other.html'),
      filename: 'other.html',
      inject: 'body', // 分割
      // sub.jsはjqueryに依存している。
      chunks: ['sub']
    })
  ]
})
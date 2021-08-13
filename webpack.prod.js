const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const commonConf = require('./webpack.common')

const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const outputFile = '[name].[chunkhash]'
const assetFile = '[contenthash]'

module.exports = () => merge(commonConf({ outputFile, assetFile }),  {
  mode: 'production', //分割
  
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, '/src', 'index.html'),
      inject: 'body', // 分割
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true
      }
    })
  ],
  optimization: {
    minimizer: [
      (compiler) => {
        const TerserPlugin = require('terser-webpack-plugin')
        new TerserPlugin({
          terserOptions: {
                compress: {},
                mangle: true
            }
        }).apply(compiler)
    },
      new CssMinimizerPlugin(),
    ]
  }
})
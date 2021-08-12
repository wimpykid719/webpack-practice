const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // 作業ディレクトリがある場合はentryの書き方が変わる
  context: `${__dirname}/src`,
  // entry: './index.js',
  // joinを使用するとOSの環境に合わせてパスをいい感じに設定してくれる。
  entry: {
    app: path.join(__dirname, '/src', 'app.js'),
    sub: path.join(__dirname, '/src', 'sub.js')
  },

  // defaultの設定つまりあってもなくても一緒
  // ファイルの起点を設定する。
  // entry: './src/index.js',

  // ここは絶対パスで指定する必要がある。
  output: {
    // path: `${__dirname}/dist`,
    path: path.join(__dirname, '/dist'),
    filename: '[name].[chunkhash].js'
  },

  // useはしたから実行されていく。
  // sassをcssに変換 → cssをバンドル → htmlにstyleタグを使ってcssを記述する。順番で実行される。
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // // eslint導入方法
        // use:[
        //   // 'style-loader',
        //   'babel-loader',
        //   'eslint-loader'
        // ],
        loader: 'babel-loader'
      },
      {
        enforce: 'pre',
        test:/\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test:/\.scss$/,
        use:[
          // 'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css',
      // chunkFilename: '[name].[hash].css'
    })
  ]
}
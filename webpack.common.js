const path = require('path')
// jsファイルにバンドルされるはずのcssを分離できる。cssに変更がない場合はキャッシュを利用できるので商用環境では分離をオススメする。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')
// こうする事で個別でimport出来る。分割代入
const { ProvidePlugin } = require('webpack')


module.exports = ({ outputFile, assetFile }) => ({
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
    filename: `${outputFile}.js`,
    assetModuleFilename: `images/${assetFile}[ext]`, // 分割
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
        loader: 'eslint-loader',
        // eslintのfixオプションをonにするルールに基づいてコードを整形してくれる。
        options: {
          fix: true,
        }
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
      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: "asset/resource",   // <--- 'file-loader'
        // または
        // type: 'asset/inline',  // <--- 'url-loader'
      },
      {
        // htmlWebpackPluginと併用しないと動作しない
        test: /\.html$/,
        use: ['html-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${outputFile}.css`, // 分割
      // chunkFilename: '[name].[hash].css'
    }),
    // よく使用するモジュールをimportせずにグローバルにバンドルする事ができる。
    // これによってapp.js, sub.jsでjqueryが使用できる。
    new ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery'
    })
  ]
})
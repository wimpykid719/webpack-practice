const path = require('path')
// jsファイルにバンドルされるはずのcssを分離できる。cssに変更がない場合はキャッシュを利用できるので商用環境では分離をオススメする。
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const webpack = require('webpack')
// こうする事で個別でimport出来る。分割代入
const { ProvidePlugin } = require('webpack')


module.exports = ({ outputFile, assetFile }) => ({
  // 作業ディレクトリがある場合はentryの書き方が変わる
  context: `${__dirname}/src/js`,
  // entry: './index.js',
  // joinを使用するとOSの環境に合わせてパスをいい感じに設定してくれる。
  entry: {
    app: path.join(__dirname, '/src', '/js', 'app.js'),
    // これがないとsub.jsは出力されない。これは同期的な読み込みになる。
    sub: path.join(__dirname, '/src', '/js', 'sub.js')
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
    // これがsub_js.jsを出力してる。
    chunkFilename: `${outputFile}.js`
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
      $: 'jquery',
      // オリジナル関数をimportなしで使えるようにする。
      utils: [path.join(__dirname, 'src/js/utils'), 'default']
    })
  ],
  optimization: {
    splitChunks: {
      // chunksがasyncだとダイナックimportと呼ばれる非同期のimport方法のみに設定が適用される。
      // import('./app.scss')
      // allは普通のimportとダイナミックを分けずにimportする。
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        defaultVendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          // reuseExistingChunk: true,
        },
        // オリジナルの関数をキャッシュに追加する。
        utils: {
          name: 'utils',
          test: /src[\\/]js/,
          // これがasyncだとutilsファイルはindex.htmlに含まれなくなる。 utilsファイルも生成されなくなる。
          // app.js等にバンドルされるようになる。
          chunks: 'async' //ここを消すと非同期の読み込みでも同期的な読み込みに変わる。
        },
        default: false,
      }
    }
  },
  // ファイル等をimportする際にPathを入力しやすくするためにシュートカットを作成する。
  // 階層が複雑な際に使用すると便利です。
  resolve: {
    alias: {
      '@scss': path.join(__dirname, 'src/scss'),
      '@imgs': path.join(__dirname, 'src/images') 
    },
    // importする際の拡張子を省略できる。
    // import '@scss/app.scss' → '@scss/app'
    extensions: ['.js', '.scss'],
    // これを追加すると import jQuery from './node_modules/jquery'
    // みたいな書き方をしなくてよい。
    // これに自作のコードも追加する。すると import 'js/sub' でコードを読み込めるようになる。
    // 画像ファイルの読み込みにも適用される。 @を使用しなくてよくなる。
    modules: [path.join(__dirname, 'src'), 'node_modules']
  }
})
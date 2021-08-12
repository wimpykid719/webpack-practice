## 最初に

`react-create-app` を使用しないでReactを使用するためにwebpackが必要だと知ったのでまず、通常のJavaScriptでwebpackがどのように使用されるのか入門してみようと思う。node.js環境が必要なのでdockerで作成しておく。

## インストール

```bash
# package.jsonを作成する。
npm init -y 
npm i -D webpack webpack-cli
```

## JSファイルをバンドルする

その後、 `src` フォルダを作成してそこにJavaScriptファイルを `main.js` , `sub.js` 2つ作成する。

index.js

```js
import { test } from './sub'

test()
```

sub.js

```js
export function test() {
  alert('テスト実行')
}
```

作成したらルートディレクトリで `npx webpack` を実行するとjsファイルがビルドされる。
ただ警告として `Set 'mode' option to 'development' or 'production'` と出る。開発用か本番用に出力するファイルを選べと言われる。

本番用はminファイルと言われ改行がなく容量を最小にしている。
その代わりビルドに時間がかかる。

開発用はビルド時間を短くできる。

指定方法は `--mode` オプションを使用する。

```bash
# 開発用のビルド
webpack --mode development

# 本番用のビルド
webpack --mode production

```

いちいち指定するのは面倒なのでpackage.jsonにコマンドを登録する。

packkage.json

```json
// package.jsonの一部
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    // 下記が追加したコマンド
    "build": "webpack --mode development",
    "prod": "webpack --mode production"
  },
```

実行方法は

```bash
npm run build
npm run prod
```

## webpack.config.jsでwebpackの設定をする。

設定ファイルを作成してwebpackの設定をする。
ファイル名は `webpack.config.js` じゃなくても `webpack.dev.js` でも良いしかしその場合はオプション `--config` でファイルを指定する必要がある。

```js
const path = require('path')

module.exports = {
  // 作業ディレクトリがある場合はentryの書き方が変わる
  context: `${__dirname}/src`,
  // entry: './index.js',
  // joinを使用するとOSの環境に合わせてパスをいい感じに設定してくれる。
  entry: path.join(__dirname, '/src', 'index.js'),

  // defaultの設定つまりあってもなくても一緒
  // ファイルの起点を設定する。
  // entry: './src/index.js',

  // ここは絶対パスで指定する必要がある。
  output: {
    // path: `${__dirname}/dist`,
    path: path.join(__dirname, '/dist'),
    filename: 'main.js'
  }
}
```

その他設定オプション

- mode： あらかじめビルドを `development`, `production` を決めれる。
- output: { filename: }: ビルドして出力されるファイル名を設定できる。

## scssファイルにも対応させる。

```bash
npm i -D sass sass-loader
```

## postcssにも対応させる

ベンダープレフィックス（-web-kit-等ブラウザ毎の若干の差異）を付与してくれる。

```bash
npm i -D postcss-loader autoprefixer
```

新しく `postcss.config.js` ファイルを作成して

```js
// 古いブラウザにも対応出来るようにベンダープレフィックスを付ける。
module.exports = {
  plugins: (
    require)'autoprefixer')
  ]
}
```

webpack.config.jsには下記のように `postcss-loader` を追加する。

```
module: {
    rules: [
      {
        test:/\.scss$/,
        use:[
          'style-loader',
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
    ]
  }
```


## ファイルを読み込む

以前は `file-loader` をインストールして `webpack.config.js` に下記の追加設定が必要だったがwebpack5からインストール不要となったので設定せずにそのままバンドル可能。
画像のURLはデフォルトではハッシュ値になるので、buildして吐き出される画像の名前が元の奴とは異なるものになる。

```js
// webpackの設定
{
  test: /\.(jpe?g|gif|png|svg|woff2?|tff|eot)$/,
  use: [
    {
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: 'images',
        publicPath: 'images'
      }
    }
  ]
}

```

## main.jsにバンドルせずに複数のファイルに吐き出す

まず `entry` ポイントを複数設定する。そして `output` の `filename` に `'[name].main.js'` を追加すると `app.main.js, sub.main.js` という2つのファイルが出力されるようになる。

```js
// webpack.config.jsの一部
 entry: {
    app: path.join(__dirname, '/src', 'app.js'),
    sub: path.join(__dirname, '/src', 'sub.js')
  },

  output: {
    // path: `${__dirname}/dist`,
    path: path.join(__dirname, '/dist'),
    filename: '[name].main.js'
  },
```

## ハッシュ値について

![disk-cache](https://user-images.githubusercontent.com/23703281/129139957-ed0d6a71-38b6-4d5c-a6ec-6f52caa033b7.png)

chromeブラウザの検証 > ネットワークで画像がローカルにキャッシュとして残っているか確認できる。
disk cacheと書かれている場合はローカルのストレージにファイルが保存されており、高速化出来ている。

ブラウザにはキャッシュの機能があるので画像を更新してもファイル名が同じ場合キャッシュを読み込み変更が適用されないことがある。そのためwebpackではビルドするたびにハッシュ値を変更する設定がある。

その設定は複数あり上記の `'[name].main.js'` の `[name]` 部分を `[hash]` 等に変更する事で設定できる。

- `[hash]`： ビルドした時で同じハッシュ値がそれぞれのファイルに付けられる。しかしファイルに変更がない場合は同じハッシュ値のままになる。
- `[contenthash]`: 生成されたファイル毎にハッシュ値が付く。画像ファイルによく用いられる。
- `[chunkhash]`: import等で繋がりがあるファイル同士が同じハッシュ値になる。


### 参照
[【Webpack5】file-loaderを使った画像の読み込みがうまくいかない](https://teratail.com/questions/327351)

[Conflict: Multiple assets emit to the same filename](https://stackoverflow.com/questions/42148632/conflict-multiple-assets-emit-to-the-same-filename)
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
## 最初に

`react-create-app` を使用しないでReactを使用するためにwebpackが必要だと知ったのでまず、通常のJavaScriptでwebpackがどのように使用されるのか入門してみようと思う。node.js環境が必要なのでdockerで作成しておく。

## インストール

```bash
# package.jsonを作成する。
npm init -y 
npm i -D webpack webpack-cli
```

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
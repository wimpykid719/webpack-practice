import './app.scss'
// import { test } from './sub'


// ただ下記のimportを行うとビルドファイルが膨大になるので, babelの設定から必要な機能だけ含めるようにする。
// es6の構文をそれよりも低いバージョンで使用する。
// import 'core-js'
// async awaitの機能を古いバージョンのjsでも補ってくれる。
// import 'regenerator-runtime'

const init = async () => {
  console.log('hi')
  await asyncFn()
}

async function asyncFn() {
  console.log([1, 2, 3].includes(0))
}

init()
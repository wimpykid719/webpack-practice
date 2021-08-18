setTimeout(() => {
  import("@scss/app")
}, 2000)
// import utils from './utils'
// import 'regenerator-runtime'
// import 'core-js'


// ただ下記のimportを行うとビルドファイルが膨大になるので, babelの設定から必要な機能だけ含めるようにする。
// es6の構文をそれよりも低いバージョンで使用する。
// import 'core-js'
// async awaitの機能を古いバージョンのjsでも補ってくれる。
// import 'regenerator-runtime'

const heheheheheheheheheheheheh = 'pakemongetdaze'

const init = async () => {
  console.log(heheheheheheheheheheheheh)
  await asyncFn()
  utils.log('hello from app.js')
}

async function asyncFn() {
  console.log([1, 2, 3].includes(0))
}

init()
jQuery()



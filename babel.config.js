module.exports = api => {
  // キャッシュを追加する事でビルドの時間を短縮できる。
  api.cache(true)
  return {
    "presets": [
      ["@babel/preset-env", {
        targets: [
          "last 1 version",
          "> 1%",
          "maintained node versions",
          "not dead"
        ],
        useBuiltIns: "usage",
        corejs: 3
      }]
    ]
  }
}
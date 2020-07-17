const webpack = require('webpack')
const config = require('./webpack.prod.conf')
// 区分当前环境变量
// process.env.NODE_ENV = process.argv.splice(2)[0] == 'dev' ? 'develop' : 'production'

webpack(config, (err, stats) => {
  if (err) {
    // 在这里处理错误
    console.error(err)
    return
  }
  // 处理完成
  console.log(stats.toString({
    chunks: false,  // 使构建过程更静默无输出
    colors: true    // 在控制台展示颜色
  }))
})

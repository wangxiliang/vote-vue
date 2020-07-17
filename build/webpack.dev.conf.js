const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseConfig = require('./webpack.base.conf')

// 开发环境配置
module.exports = merge(baseConfig, {
  // mode 必须为 development
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      // 解析less语法
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, '../src/style/base.less')
            }
          }
        ]
      },
    ]
  },
  plugins: [
    // 使用热更新
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
    
  ],
  // devserver 开启调试环境端口 
  devServer: {
    port: 8080,
    inline:true,
    hot: true,
    compress: true,
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: {
      index: '/dist/index.html'
    },
    // 开启反向代理  如后端未配置cors 可解决跨域
    proxy : {
      '/*': {
        target: 'https://wkl.vcale.cn/app',
        changeOrigin : true
      }
    }
  }
})

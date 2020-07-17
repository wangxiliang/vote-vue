const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev'
const ENV = WEBPACK_ENV === 'dev'

// webpack 公共配置
module.exports = {
  // 入口
  entry: {
    app: path.resolve(__dirname, '../src/app.js')
  },
  // 打包后的出口
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: ENV ? '/' : '/addons/zyun_vote/template/mobile/',
    filename: ENV ? 'js/[name].js' : 'js/[name].[chunkhash:8].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      // 解析 vue文件
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          hotReload: true // 热重载
        }
      },
      // 解析 svg文件
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [
          path.resolve(__dirname, '../src/assets/icons')
        ],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      // 解析 图片文件
      {
        test: /\.(png|jpg|svg|gif)$/,
        exclude: [
          path.resolve(__dirname, '../src/assets/icons')
        ],
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash:7].[ext]',
              publicPath: ENV ? '/' : '/addons/zyun_vote/template/mobile/'
            }
          },
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true
            }
          }
        ]
      },
      // 解析字体文件
      {
        test: /\.(eot|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: 'fonts/[name].[hash:7].[ext]'
            }
          }
        ]
      },

      // 解析 音频文件
      {
        test: /\.(mp3|mp4)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
                limit: 5000,
                name: 'audio/[name].[hash:7].[ext]'
            }
          }
        ]
      },
    ]
  },
  // 别名 映射 
  resolve: {
    alias: {
      components: path.resolve(__dirname, '../src/components'),
      router: path.resolve(__dirname, '../src/router'),
      service: path.resolve(__dirname, '../src/service'),
      pages: path.resolve(__dirname, '../src/pages'),
      utils: path.resolve(__dirname, '../src/utils'),
      store: path.resolve(__dirname, '../src/store'),
      assets: path.resolve(__dirname, '../src/assets'),
      directives: path.resolve(__dirname, '../src/directive'),
      style: path.resolve(__dirname, '../src/style'),
      config: path.resolve(__dirname, '../src/config'),
      'vue$': ENV ? 'vue/dist/vue.esm.js' : 'vue/dist/vue.runtime.esm.js'
    },
    extensions: ['.js', '.vue']
  },
  // 第三方插件
  plugins: [
    // 解析html
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, ENV ? '../public/index-dev.html' : '../public/index.html'),
      filename: 'index.html',
      chunksSortMode: 'none',
      inject: true,
      hash: true,
      favicon: path.resolve(__dirname, '../public/sencha.ico'),
      // minify: {
      //   collapseWhitespace: true,
      //   removeComments: true
      // }
    }),
    // vueloader
    new VueLoaderPlugin()
  ]
}

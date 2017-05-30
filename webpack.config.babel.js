const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const VisualizerPlugin = require('webpack-visualizer-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const DashboardPlugin = require('webpack-dashboard/plugin')
const autoprefixer = require('autoprefixer')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'build'
process.env.BABEL_ENV = LAUNCH_COMMAND

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080
const PROXY = `http://${HOST}:${PORT}`

const PATHS = {
  app: path.join(__dirname, 'app'),
  build: path.join(__dirname, 'dist')
}

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

const browserSyncPlugin = new BrowserSyncPlugin({
  host: HOST,
  port: PORT,
  proxy: PROXY,
  open: false,
  ui: { port: 8080, weinre: { port: 9090 }}
}, { reload: false })

const postcssPlugin = new webpack.LoaderOptionsPlugin({
  options: {
    context: PATHS.app,
    postcss: [
      autoprefixer({ remove: false, browsers: ['last 2 versions'] })
    ]
  }
})

const statsWriterPlugin = new StatsWriterPlugin({
  filename: './webpack_stats.json',
  fields: null,
  stats: { chunkModules: true }
})

const visualizerPlugin = new VisualizerPlugin({
  filename: './webpack_stats.html'
})

const duplicatePackageCheckerPlugin = new DuplicatePackageCheckerPlugin({
  verbose: true
})

const extractTextPlugin = new ExtractTextPlugin({
  disable: !isProduction,
  filename: 'assets/css/app.css'
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const sharedPlugins = [
  htmlWebpackPlugin,
  postcssPlugin,
  extractTextPlugin,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
]

const base = {
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      isProduction ? {
        test: /\.s?css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                modules: true,
                minimize: true,
                localIdentName: '[name]__[local]___[hash:base64:5]',
                importLoaders: 1
              }
            },
            { loader: 'postcss-loader' },
            { loader: 'sass-loader' },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, './app/styles/_variables.scss')
              }
            }
          ]
        })
      } : {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              modules: true,
              minimize: true,
              localIdentName: '[name]__[local]___[hash:base64:5]',
              importLoaders: 1
            }
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
          {
            loader: 'sass-resources-loader',
            options: {
              resources: path.resolve(__dirname, './app/styles/_variables.scss')
            }
          }
        ]
      }
    ]
  },
  resolve: {
    modules: [ PATHS.app, 'node_modules' ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    PATHS.app
  ],
  devtool: 'cheap-module-inline-source-map',
  devServer: {
    contentBase: PATHS.build,
    publicPath: '/',
    hot: true,
    inline: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT
  },
  plugins: [
    ...sharedPlugins,
    browserSyncPlugin,
    duplicatePackageCheckerPlugin,
    new DashboardPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const productionConfig = {
  entry: [ PATHS.app ],
  devtool: 'cheap-module-source-map',
  plugins: [
    ...sharedPlugins,
    productionPlugin,
    statsWriterPlugin,
    visualizerPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = Object.assign({}, base, isProduction ? productionConfig : developmentConfig)

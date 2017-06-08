const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const VisualizerPlugin = require('webpack-visualizer-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const PostcssAssetsPlugin = require('postcss-assets-webpack-plugin')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const cssnano = require('cssnano')

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

const postcssAssetsPlugin = new PostcssAssetsPlugin({
  test: /\.css$/,
  log: false,
  plugins: [
    mqpacker({ sort: true }),
    cssnano
  ]
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
  filename: 'assets/css/app_[hash:6]_.css'
})

const compressionPlugin = new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.(js|css)$/,
  threshold: 1024,
  minRatio: 0.8
})

const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compress: { warnings: false, screw_ie8: true },
  comments: false,
  sourceMap: true,
  mangle: true,
  minimize: true,
  beautify: false
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
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const base = {
  output: {
    path: PATHS.build,
    filename: 'assets/js/bundle_[hash:6]_.js',
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
        test: /\.(scss)|(css)$/,
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
        test: /\.(scss)|(css)$/,
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
    compress: true,
    historyApiFallback: true,
    host: HOST,
    port: PORT,
    proxy: {
      '/api/**': {
        target: 'http://localhost:9090'
      }
    }
  },
  plugins: [
    ...sharedPlugins,
    browserSyncPlugin,
    duplicatePackageCheckerPlugin,
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
    compressionPlugin,
    uglifyJsPlugin,
    postcssAssetsPlugin,
    statsWriterPlugin,
    visualizerPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = Object.assign({}, base, isProduction ? productionConfig : developmentConfig)

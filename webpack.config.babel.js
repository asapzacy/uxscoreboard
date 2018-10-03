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
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
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
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'dist')
}

const globalVariables = new webpack.DefinePlugin({
  __DEV__: !isProduction
})

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

const browserSyncPlugin = new BrowserSyncPlugin(
  {
    host: HOST,
    port: PORT,
    proxy: PROXY,
    open: false,
    ui: { port: 8080, weinre: { port: 9090 } }
  },
  { reload: false }
)

const postcssPlugin = new webpack.LoaderOptionsPlugin({
  options: {
    context: PATHS.app,
    postcss: [autoprefixer({ remove: false, browsers: ['last 2 versions'] })]
  }
})

const postcssAssetsPlugin = new PostcssAssetsPlugin({
  test: /\.css$/,
  log: false,
  plugins: [mqpacker({ sort: true }), cssnano]
})

const statsWriterPlugin = new StatsWriterPlugin({
  filename: './stats/webpack_stats.json',
  fields: null,
  stats: { chunkModules: true }
})

const visualizerPlugin = new VisualizerPlugin({
  filename: './stats/webpack_stats.html'
})

const duplicatePackageCheckerPlugin = new DuplicatePackageCheckerPlugin({
  verbose: true
})

const extractTextPlugin = new ExtractTextPlugin({
  disable: !isProduction,
  filename: 'assets/build/css/bundle.[hash:12].css'
})

const compressionPlugin = new CompressionPlugin({
  asset: '[path].gz[query]',
  algorithm: 'gzip',
  test: /\.(js|css)$/,
  threshold: 1024,
  minRatio: 0.8
})

const uglifyJsPlugin = new UglifyJsPlugin({
  sourceMap: true,
  uglifyOptions: {
    ecma: 8,
    comments: false,
    mangle: true,
    minimize: true,
    beautify: false,
    compress: { warnings: false }
  }
})

const productionPlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production')
  }
})

const sharedPlugins = [
  globalVariables,
  htmlWebpackPlugin,
  extractTextPlugin,
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const sharedCssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: true,
      modules: true,
      minimize: true,
      localIdentName: '[name]_[local]___[hash:base64:5]',
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: isProduction
      ? {
          ident: 'postcss',
          plugins: () => [require('autoprefixer')]
        }
      : {}
  },
  { loader: 'sass-loader' },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [path.resolve(PATHS.app, './styles/_variables.scss')]
    }
  }
]

const base = {
  output: {
    path: PATHS.build,
    filename: isProduction
      ? 'assets/build/js/bundle.[hash:12].min.js'
      : 'assets/build/js/bundle.[hash:12].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      isProduction
        ? {
            test: /\.(scss)|(css)$/,
            use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: sharedCssLoaders
            })
          }
        : {
            test: /\.(scss)|(css)$/,
            use: [{ loader: 'style-loader' }, ...sharedCssLoaders]
          }
    ]
  },
  resolve: {
    modules: [PATHS.app, 'node_modules']
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
  entry: [PATHS.app],
  devtool: 'cheap-module-source-map',
  plugins: [
    ...sharedPlugins,
    productionPlugin,
    compressionPlugin,
    uglifyJsPlugin,
    postcssPlugin,
    postcssAssetsPlugin,
    statsWriterPlugin,
    visualizerPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = Object.assign(
  {},
  base,
  isProduction ? productionConfig : developmentConfig
)

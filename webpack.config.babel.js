const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const BrowserSyncPlugin = require('browser-sync-webpack-plugin')
const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
const VisualizerPlugin = require('webpack-visualizer-plugin')
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
const WWW_PORT = process.env.WWW_PORT || 8080
const API_PORT = process.env.API_PORT || 9090

const WWW_PROXY = `http://${HOST}:${WWW_PORT}`
const API_PROXY = `http://${HOST}:${API_PORT}`

const PATHS = {
  app: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

const globalVariables = new webpack.DefinePlugin({
  __DEV__: !isProduction
})

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html'
})

const browserSyncPlugin = new BrowserSyncPlugin(
  {
    host: HOST,
    port: WWW_PORT,
    proxy: WWW_PROXY,
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
  filename: './assets/build/stats/webpack_stats.json',
  fields: null,
  stats: { chunkModules: true }
})

const visualizerPlugin = new VisualizerPlugin({
  filename: './assets/build/stats/webpack_stats.html'
})

const duplicatePackageCheckerPlugin = new DuplicatePackageCheckerPlugin({
  verbose: true
})

const miniCssExtractPlugin = new MiniCssExtractPlugin({
  filename: './assets/build/styles.[contenthash:12].bundle.css'
})

const compressionPlugin = new CompressionPlugin({
  filename: '[path].gz[query]',
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
  miniCssExtractPlugin,
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
    path: PATHS.dist,
    filename: isProduction ? 'assets/build/app.[hash:12].js' : 'app.js',
    chunkFilename: isProduction
      ? 'assets/build/[name].[chunkhash:12].js'
      : '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(tsx?)|(js)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      isProduction
        ? {
            test: /\.(scss)|(css)$/,
            use: [MiniCssExtractPlugin.loader, ...sharedCssLoaders]
          }
        : {
            test: /\.(scss)|(css)$/,
            use: [{ loader: 'style-loader' }, ...sharedCssLoaders]
          }
    ]
  },
  resolve: {
    modules: [PATHS.app, 'node_modules'],
    extensions: ['.ts', '.tsx', '.js']
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  }
}

const devConfig = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?${WWW_PROXY}`,
    'webpack/hot/only-dev-server',
    PATHS.app
  ],
  devtool: 'cheap-module-inline-source-map',
  mode: 'development',
  devServer: {
    contentBase: PATHS.dist,
    publicPath: '/',
    hot: true,
    inline: true,
    compress: true,
    historyApiFallback: true,
    host: HOST,
    port: WWW_PORT,
    proxy: {
      '/api/**': {
        target: API_PROXY
      }
    }
  },
  plugins: [
    ...sharedPlugins,
    ...(process.env.BROWSER_SYNC ? browserSyncPlugin : []),
    duplicatePackageCheckerPlugin,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const prodConfig = {
  entry: [PATHS.app],
  devtool: 'cheap-module-source-map',
  mode: 'production',
  plugins: [
    ...sharedPlugins,
    productionPlugin,
    compressionPlugin,
    uglifyJsPlugin,
    postcssPlugin,
    postcssAssetsPlugin,
    ...(process.env.WEBPACK_STATS ? [statsWriterPlugin, visualizerPlugin] : []),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ]
}

module.exports = {
  ...base,
  ...(isProduction ? prodConfig : devConfig)
}

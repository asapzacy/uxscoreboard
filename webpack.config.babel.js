const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const PostcssAssetsPlugin = require('postcss-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const autoprefixer = require('autoprefixer')
const mqpacker = require('css-mqpacker')
const cssnano = require('cssnano')

const LAUNCH_COMMAND = process.env.npm_lifecycle_event
const isProduction = LAUNCH_COMMAND === 'build'
process.env.BABEL_ENV = LAUNCH_COMMAND

const HOST = process.env.HOST || 'localhost'
const DEV_PORT = process.env.DEV_PORT || 4444
const API_PORT = process.env.API_PORT || 4545

const PATHS = {
  app: path.join(__dirname, './src'),
  build: path.join(__dirname, './dist')
}

const globalVariables = new webpack.DefinePlugin({
  '__DEV__': !isProduction
})

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: PATHS.app + '/index.html',
  filename: 'index.html',
  inject: 'body'
})

const extractTextPlugin = new ExtractTextPlugin({
  disable: !isProduction,
  filename: 'assets/build/css/bundle.[hash:12].min.css'
})

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
  new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
]

const sharedCssLoaders = [
  {
    loader: 'css-loader',
    options: {
      sourceMap: !isProduction,
      modules: true,
      minimize: isProduction,
      localIdentName: '[name]_[local]___[hash:base64:5]',
      importLoaders: 1
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: isProduction
        ? () => [ require('autoprefixer') ]
        : () => [ require('postcss-composes') ]
    }
  },
  { loader: 'sass-loader' },
  {
    loader: 'sass-resources-loader',
    options: {
      resources: [
        path.resolve(PATHS.app, './styles/_variables.scss'),
        path.resolve(PATHS.app, './styles/_mixins.scss')
      ]
    }
  }
]

const base = {
  entry: [ PATHS.app ],
  output: {
    path: PATHS.build,
    filename: isProduction ? 'assets/build/js/bundle.[hash:12].min.js' : 'assets/build/js/bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        include: PATHS.app,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        }
      },
      isProduction ? {
        test: /\.(scss)|(css)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: sharedCssLoaders
        })
      } : {
        test: /\.(scss)|(css)$/,
        use: [
          { loader: 'style-loader' },
          ...sharedCssLoaders
        ]
      }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    console: true
  },
  resolve: {
    modules: [ PATHS.app, 'node_modules' ]
  }
}

const developmentConfig = {
  entry: [
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${DEV_PORT}/`,
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
    port: DEV_PORT,
    // disableHostCheck: true,
    // watchOptions: {
    //   ignored: /node_modules/,
    //   aggregateTimeout: 300,
    //   poll: 1000
    // },
    // headers: {
    //   'Access-Control-Allow-Origin': '*'
    // },
    // allowedHosts: [
    //   'localhost',
    //   '.'
    // ],
    proxy: {
      '/api/**': {
        target: `http://localhost:${API_PORT}`
      }
    }
  },
  plugins: [
    ...sharedPlugins,
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ]
}

const productionConfig = {
  plugins: [
    ...sharedPlugins,
    productionPlugin,
    productionPlugin,
    postcssPlugin,
    postcssAssetsPlugin,
    extractTextPlugin,
    uglifyJsPlugin,
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin()
  ]
}

/* uncomment these locally to get bundle.js stats */

// const VisualizerPlugin = require('webpack-visualizer-plugin')
// const StatsWriterPlugin = require('webpack-stats-plugin').StatsWriterPlugin
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const statsWriterPlugin = new StatsWriterPlugin({
//   filename: '../stats/bundle.json',
//   fields: null,
//   stats: { chunkModules: true }
// })
// const visualizerPlugin = new VisualizerPlugin({
//   filename: '../stats/bundle.html'
// })
// const bundleAnalyzerPlugin = new BundleAnalyzerPlugin()
// productionConfig.plugins.push(
//   statsWriterPlugin,
//   visualizerPlugin,
//   bundleAnalyzerPlugin
// )

const config = isProduction ? productionConfig : developmentConfig

module.exports = Object.assign({}, base, config)

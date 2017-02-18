const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const postcssCssNext = require('postcss-cssnext')
const postcssImport = require('postcss-import')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OfflinePlugin = require('offline-plugin')

const paths = require('./paths')

module.exports = {
  devtool: 'source-map',
  entry: { app: paths.app },
  output: {
    filename: '[name].[chunkhash].js',
    path: paths.output,
    publicPath: paths.public
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'standard-loader',
        include: paths.source
      },
      { test: /\.js$/, loader: 'babel-loader', include: paths.source },
      {
        test: /\.svg$/,
        loaders: [ 'babel-loader', 'react-svg-loader' ],
        include: paths.assets
      },
      {
        test: /\.css/,
        loaders: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&localIdentName=[hash:base64:5]!postcss-loader'
        }),
        include: paths.source
      },
      { test: /\.(woff|png|jpg|gif)$/, use: 'url-loader?limit=5000' }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: false,
      __PRODUCTION__: true,
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        context: __dirname,
        postcss: function (webpack) {
          return [
            postcssImport({ path: [ paths.source, paths.nodeModules ] }),
            postcssCssNext()
          ]
        }
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin({ filename: '[name].[chunkhash].css', allChunks: true }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { screw_ie8: true, warnings: false },
      mangle: { screw_ie8: true }
    }),
    new HtmlWebpackPlugin({
      title: 'An opinionated boilerplate',
      template: paths.template
    }),
    new OfflinePlugin({
      safeToUseOptionalCaches: true,
      caches: {
        main: [ 'app.*.js', 'app.*.css', 'index.html' ],
        optional: [ ':rest:' ]
      },
      ServiceWorker: { events: true },
      AppCache: { events: true }
    })
  ]
}

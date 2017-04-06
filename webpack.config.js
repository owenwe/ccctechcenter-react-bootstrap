const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const extractSass = new ExtractTextPlugin('bundle.css')

module.exports = {
  context: __dirname,
  entry: './js/App.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      bs4: path.resolve(__dirname, 'node_modules/bootstrap/js/src/')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {loader: 'eslint-loader'}
        ],
        enforce: 'pre',
        exclude: '/node_modules/',
        include: [
          path.resolve(__dirname, 'node_modules/lodash'),
          path.resolve(__dirname, 'node_modules/moment-timezone')
        ]
      },
      {
        test: [
          /\.js$/,
          /\.jsx$/
        ],
        use: [
          {loader: 'babel-loader'}
        ],
        exclude: '/node_modules/'
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: [
          /\.css$/,
          /\.scss$/],
        use: extractSass.extract({
          use: [
            {loader: 'css-loader'},
            {loader: 'sass-loader'}
          ],
          fallback: 'style-loader'
        })
      }
    ]
  },
  plugins: [
    extractSass,
    new webpack.ProvidePlugin({
      _: 'lodash',
      $: 'jquery',
      jQuery: 'jquery',
      moment: 'moment-timezone'
    })]
}

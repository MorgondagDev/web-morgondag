const webpack = require('webpack');
const nib = require('nib');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const reactRenderPlugin = require('react-render-webpack-plugin');

module.exports = {
  entry: [
    './src/index.jsx',
    './src/style/style.styl'
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'app.min.js'
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "react-hot!babel"
    }, {
      test: /\.styl?$/,
      loader: ExtractTextPlugin.extract('css-loader!stylus-loader')
    }, {
      test: /.*\.(gif|png|jpe?g|svg|ico)$/i,
      loaders: [
        'file?name=img/[name].[ext]',
        'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
      ]
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file?name=fonts/[name].[ext]'
    }]
  },

  stylus: {
    use: [nib()]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new ExtractTextPlugin('style.min.css'),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new reactRenderPlugin({
      'file': 'src/app.jsx',
      'parentClass': 'react-app'
    })
  ]
};

const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const path = require('path');
const packageJson = require('../package.json');

module.exports = function(env, __dirname) {
  return webpackMerge(commonConfig(env, __dirname), {
    entry: {
      vendor: [
        'react',
        'redux',
        'react-dom',
        'react-redux',
        'redux-logger',
      ],
      index: path.resolve('src', 'index.tsx')
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'vendors.js?v=' + packageJson.version
      }),
      // TODO https://webpack.js.org/plugins/commons-chunk-plugin/
      // TODO https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95
      // new ChunkManifestPlugin({
      //   filename: 'manifest.json',
      //   manifestVariable: 'webpackManifest'
      // }),
      new webpack.DefinePlugin({
        __DEV__: false
      }),
      // new UglifyJSPlugin({
      //   minimize: true,
      //   mangle: {
      //     except: ['exports', 'require']
      //   }
      // })
    ]
  })
};

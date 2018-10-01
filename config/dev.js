const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');

module.exports = function(env, __dirname) {
  return webpackMerge(commonConfig(env, __dirname), {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true
      })
    ]
  })
};

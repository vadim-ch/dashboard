const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./base.js');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');

// TODO можно будет приделать react-hot-loader https://gaearon.github.io/react-hot-loader/getstarted/
module.exports = function(env, __dirname) {
  return webpackMerge(commonConfig(env, __dirname), {
    mode: 'development',
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new HtmlWebpackHarddiskPlugin()
      // new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
      contentBase: path.join(__dirname, "public"),
      hot: true,
      host: '127.0.0.1',
      historyApiFallback: true,
      port: 8081,
      stats: {
        children: false
      }
    }
  })
};

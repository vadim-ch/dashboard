const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[next] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = function (env) {
  return {
    entry: path.resolve('src', 'server.tsx'),
    output: {
      path: path.resolve('server-build'),
      filename: 'index.js',
      publicPath: '/public/'
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    target: 'node',
    externals: [nodeExternals()],
    optimization: {
      minimizer: env === 'dev' ? [] : [new UglifyJsPlugin()]
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEV__: env === 'dev',
        __SERVER__: true,
        ...envKeys
      }),
    ],
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: path.resolve(__dirname, 'src'),
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        },

        {
          test: /\.*es.less/,
          exclude: '/node_modules',
          use: [
            'isomorphic-style-loader',
            {
              loader: 'css-loader',
              query: {
                import: false,
                url: false,
                modules: true,
                camelCase: true,
                minimize: true,
                localIdentName: env === 'dev' ? '[path][name]__[local]' : '[hash:base64]'
              }
            },
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        },
      ]
    }
  }
};

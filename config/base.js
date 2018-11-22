'use strict';
const path = require('path');
const packageJson = require('../package.json');
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const chalk = require('chalk');
const dotenv = require('dotenv');

const env = dotenv.config().parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[next] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = function (env, __dirname) {
  console.info(
      chalk.red('Build...'),
      chalk.cyan('Еnv:', env),
      chalk.green('Version:', packageJson.version)
  );

  return {
    entry: path.resolve('src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'public/dist/'),
      filename: `[name].js` + `?v=${packageJson.version}`,
      publicPath: '/dist/'
    },
    resolve: {
      extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        '@components': path.resolve(__dirname, 'src/view/components')
      }
    },
    stats: {
      children: false,
      // Examine all modules
      maxModules: Infinity,
      // Display bailout reasons
      optimizationBailout: true
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: [
            path.resolve(__dirname, 'node_modules'),
          ],
          include: path.resolve(__dirname, 'src'),
          enforce: 'pre',
          loader: 'tslint-loader',
          options: {
            emitErrors: true,
            transpileOnly: true,
            experimentalWatchApi: true,
            // fix: true
          }
        },
        {
          test: /\.ts(x?)$/,
          exclude: path.resolve(__dirname, 'node_modules'),
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: '../'
              }
            },
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
            // {
            //   loader: 'postcss-loader',
            //   options: { plugins: function() { return [ require('autoprefixer')() ]} }
            // }
          ]
        },
        {
          test: /\/global.less$/,
          exclude: '/node_modules',
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
                publicPath: '../'
              }
            },
            {
              loader: 'css-loader',
              query: {
                minimize: true
              }
            },
            // {
            //   loader: 'postcss-loader',
            //   options: { plugins: function() { return [ require('autoprefixer')() ]} }
            // }
            {
              loader: 'less-loader',
              options: {
                javascriptEnabled: true
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __VERSION__: JSON.stringify(packageJson.version),
        __SERVER__: false,
        ...envKeys
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "[name].css",
        chunkFilename: "[id].css"
      }),
      new HtmlWebpackPlugin({
        filename: '../index.html',
        hash: false,
        cache: false,
        inject: 'body',
        title: 'Title',
        template: 'src/template.html',
        minify: {},
        alwaysWriteToDisk: true
      })
    ]
  };
};

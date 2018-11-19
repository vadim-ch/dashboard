const path = require('path');
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    entry: path.resolve('src', 'server.tsx'),
    output: {
        path: path.resolve('server-build'),
        filename: 'index.js',
    },
    resolve: {
        extensions: ['.webpack.js', '.web.js', '.tsx', '.js', '.ts', '.css'],
        modules: [path.join(__dirname, 'src'), 'node_modules'],
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'ts-loader'
                }
            },

            {
                test: /\.*es.less/,
                exclude: '/node_modules',
                use: [
                    {
                        loader: 'css-loader',
                        query: {
                            import: false,
                            url: false,
                            modules: true,
                            camelCase: true,
                            minimize: true,
                            localIdentName: '[path][name]__[local]'
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
    }
};

const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, '../', 'dist'),
        filename: 'static/js/[name].js',
        publicPath: '/public/',
        chunkFilename: 'static/js/[name].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../', 'public/index.template.html'),
            filename: 'index.html',
            inject: true
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, '../', 'dist'),
        publicPath: '/public/',
        host: '0.0.0.0',
        port: 8080,
        open: true,
        historyApiFallback: {
            rewrites: [
                { from: /^\//, to: '/public/index.html' }
            ]
        },
        proxy: {}
    }
})
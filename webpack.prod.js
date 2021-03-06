var path = require('path');
var webpack = require('webpack');
var version = require('./package.json').version;
var UglifyJSPlugin  =  webpack.optimize.UglifyJsPlugin;
module.exports = {
    entry: './src/index',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'router.min.js',
        library: 'Router',
        libraryTarget: 'umd'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader"},
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            __VERSION__: JSON.stringify(version)
        })
    ]
};

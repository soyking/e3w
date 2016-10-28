var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

var plugins = [
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/index.html',
        inject: false,
    })
]

process.env.NODE_ENV === 'production' ? plugins.push(new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify("production")
    }
})) : null

module.exports = {
    devtool: process.env.NODE_ENV === 'production' ? '' : 'inline-source-map',
    entry: './src/entry.jsx',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [{
            test: /.jsx$/,
            loader: 'babel',
            exclude: /node_modules/,
            query: {
                presets: ['react', 'es2015'],
                plugins: ['antd']
            }
        }, {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }]
    },
    plugins: plugins
}
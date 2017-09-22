
const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const fs = require('fs-extra')

// const PORT = 3010

module.exports = {
    entry: {
        js: './app/client.js',
        vendor: [
            'react', 'classnames', 'react-router', 'react-dom',
        ],
    },
    output: {
        filename: '[name].[hash].js',
        path: path.join(__dirname, 'dist'),
        chunkFilename: '[name].[hash].js',
    },
    resolve: {
        extensions: ['', '.js', '.json'],
        alias: {
            components: path.join(__dirname, '/app/components'),
            actions: path.join(__dirname, '/app/actions'),
            api: path.join(__dirname, '/app/api'),
            reducers: path.join(__dirname, '/app/reducers'),
            utils: path.join(__dirname, '/app/utils'),
            constants: path.join(__dirname, '/app/constants'),
            controllers: path.join(__dirname, '/app/controllers'),
            style: path.join(__dirname, '/app/style'),
        },
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel',
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less',
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!less-loader'),
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=819200',
            },
            {
                test: /\.(woff|eot|ttf|svg|gif)$/,
                loader: 'file-loader?name=iconfont/[path][name].[ext]',
            },
        ],
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': 'production',
            IS_DEVELOPMETN: false,
        }),
        // 提取行内css到文件
        new ExtractTextPlugin('vendor.[hash].css'),
        new webpack.optimize.OccurrenceOrderPlugin(),
        // 提取重复代码，打包到单独文件中
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor.[hash]', // 入口文件名
            filename: 'vendor.[hash].bundle.js', // 打包后的文件名
        }),
        // 压缩优化代码
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'app/index.html'),
        }),
        // 分析代码
        // new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
    ],
}
fs.copy('./app/images', './dist/images')
fs.copy('./app/iconfont', './dist/iconfont')

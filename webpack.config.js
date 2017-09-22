const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const PORT = 3010

module.exports = {
    entry: {// webpack依赖分析并打包的入口配置
        js: path.join(__dirname, './app/client.js'),
        vendor: [
            'react', 'classnames', 'react-router', 'react-dom',
        ],
    },
    output: { // webpack执行的输出
        path: path.join(__dirname, 'dist'),
        filename: '[name].js', // [name]是webpack内置的根据入口文件自动生成的名字
        // publicPath: path.join(__dirname, 'dist'),
        chunkFilename: '[name].chunk.js',
    },
    resolve: {
        extensions: ['', '.js', '.json', 'jsx'], // 设置require或import的时候可以不需要带后缀，后缀自动补全
        alias: { // 设置别名，以便使用
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
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel',
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.less$/,
                loader: 'style!css!postcss!less',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader',
                    'css-loader?sourceMap=true!postcss-loader?sourceMap=true!less-loader?sourceMap=true'),
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader?limit=8192',
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
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 提取css样式到单独的文件
        new ExtractTextPlugin('vendor.[hash].css'),
        // 提取公共代码，打包到单独文件中
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor', // 入口文件名
        //     filename: 'vendor.bundle.js', // 打包后的文件名
        // }),
        // 压缩优化代码
        // new webpack.optimize.UglifyJsPlugin({minimize: true}),
        // 根据index.html模板生成index.html页面，会自动加载打包后的文件
        new HtmlWebpackPlugin({
            title: 'myapp',
            filename: 'index.html',
            // favicon: path.join(__dirname, 'app/icon.icon'),
            template: path.join(__dirname, 'app/index.html'),
            cache: false,
            inject: true,
            minify: {// 压缩html文件
                removeComments: true, // 移除html中的注释
                collapseWhitespace: false, // 移除html中的空行、空白符、换行符
            },
        }),
        // 构建完成后，自动在浏览器打开
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}/#/login`,
        }),
        // 分析代码
        new BundleAnalyzerPlugin({ analyzerPort: 8188 }),
    ],
    devtool: 'source-map', // 设置构建方式，不同的构建方式编译，打包的性能、结果不同
    devServer: { // 服务器配置相关，自动刷新
        contentBase: './app/', // 网站根目录
        historyApiFallback: true,
        hot: true,
        inline: true,
        host: '0.0.0.0',
        port: PORT,
    },
    // eslint: {
    //     configFile: './.eslintrc.json',
    // },
}

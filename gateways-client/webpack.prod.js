const path = require('path');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    mode: 'production',
    entry: "./src/index.tsx",
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, '../src/main/resources/static'),
        publicPath: path.join(''),
},
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.(scss|sass|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|jpeg|gif)$/,
                type: "asset/resource",
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                    }
                }
            },
            {
                test: /\.(svg|png)$/,
                use: ["url-loader"]
            }
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        modules: [
            path.join(__dirname, "node_modules"),
            path.join(__dirname, "src"),
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "template.html"),
            filename: "index.html",
            inject: "body",
            cache: false,
        }),
        // new CleanWebpackPlugin({
        //     cleanOnceBeforeBuildPatterns: [
        //         "!template.html", "!manifest.json", "!robots.txt", "!favicon-16x16.png"
        //     ],
        // }), // для очистки dict при новой сборки
    ],
    optimization: {
        concatenateModules: true,
        minimize: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: 'dependencies.bundle.js',
                    chunks: 'all'
                }
            },
        },
        minimizer: []
    },
};
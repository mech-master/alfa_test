const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./src/client/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "js/bundle.js",
        publicPath: "/"
    },
    devtool: "source-map",
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react"
                        ]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "dist")
        },
        hot: true,
        compress: true,
        port: 8080
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src", "client", "template.html"),
            filename: "index.html",
            inject: "body"
        })
    ]
}
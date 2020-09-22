const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = () => {
    return {
        entry: "./src/index.js",
        output: {
            path: path.join(__dirname, "/dist"),
            filename: "bundle.js",
            publicPath: "/"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        {
                            loader: 'style-loader'
                        }, {
                            loader: 'css-loader?modules=true'
                        }, {
                            loader: 'sass-loader'
                        }]
                },
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: 'svg-url-loader',
                            options: {
                                limit: 10000,
                            },
                        },
                    ],
                },
            ]
        },
        devServer: {
            historyApiFallback: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: "./src/index.html"
            })
        ],
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".css", ".scss"]
        }
    }
};
const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    context: path.resolve(__dirname, "src"), // Set the context to 'src'
    entry: "./index.js",
    output: {
        filename: "main.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./template.html",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.html$/i,
                use: ["html-loader"],
            },
            {
                test: /\.(jpg|png|jpeg|svg|gif|webm|ttf|otf|woff|woff2)$/i,
                type: "asset/resource",
                generator: {
                    // Specify the output folder and structure
                    filename: '[path][name][ext]'
                },
            },

        ],
    },

}
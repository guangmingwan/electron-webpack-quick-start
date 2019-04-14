const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: {
        renderer:"./src/renderer/index.ts",
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: "[name].js",
        
    },
    module: {
        rules: [
            
        ],
    },
    devtool: 'inline-source-map',
    mode: 'development',
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.ejs',
            appModules: process.env.NODE_ENV !== 'production'
              ? path.resolve(__dirname, 'node_modules')
              : false
          }),
    ]
};
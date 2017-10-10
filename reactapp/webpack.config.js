var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
module.exports = {
    entry: __dirname + "/app/index.js",
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: "babel-loader", exclude: /node_modules/ }
        ]
    },
    plugins: [HtmlWebpackPluginConfig]
};

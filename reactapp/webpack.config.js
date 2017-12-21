var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: __dirname + '/app/index.html',
    filename: 'index.html',
    inject: 'body'
});
module.exports = {
    entry: ['webpack-dev-server/client?http://0.0.0.0:8080',
           __dirname + "/app/index.jsx"],
    output: {
        path: __dirname + '/build',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "babel-loader", exclude: /node_modules/ },
        ]
    },
    plugins: [HtmlWebpackPluginConfig],
    externals: ['axios'],
    resolve: {
        extensions: ['.js', '.jsx'],
  }
};


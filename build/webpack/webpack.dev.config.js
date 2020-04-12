const path = require("path");
const paths = require("../../config/paths");
const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const chokidar = require("chokidar");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = merge(webpackBaseConfig, {
	mode: "development",
	output: {
		filename: "[name].js",
	},
	devServer: {
		before(app, server) {
			chokidar.watch(["./dist/**/*.html"]).on("all", function () {
				server.sockWrite(server.sockets, "content-changed");
			});
		},
		hot: true,
		overlay: true,
		contentBase: paths.dist,
		historyApiFallback: {
			rewrites: [{ from: /.*/g, to: "/index.html" }],
		},
		host: "localhost",
		port: 3000,
		open: false,
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new webpack.HotModuleReplacementPlugin(),
	],
});

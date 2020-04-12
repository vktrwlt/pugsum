const merge = require("webpack-merge");
const webpackBaseConfig = require("./webpack.base.config.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const cssnano = require("cssnano");

module.exports = merge(webpackBaseConfig, {
	mode: "production",
	output: {
		filename: "js/[name].[hash].js",
	},

	plugins: [
		new MiniCssExtractPlugin({
			filename: "css/[name].[chunkhash].css",
		}),
	],
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin(),
			new OptimizeCSSAssetsPlugin({
				cssProcessor: cssnano,
			}),
		],
	},
});

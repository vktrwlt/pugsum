const path = require("path");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const paths = require("../../config/paths");
const autoprefixer = require("autoprefixer");
const ImageminWebpackPlugin = require("imagemin-webpack-plugin").default;
const ImageminWebP = require("imagemin-webp");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const tailwind = require("tailwindcss")(
	path.resolve(paths.config, "tailwind.config.js")
);
const purgecss = require("@fullhuman/postcss-purgecss")({
	content: [
		path.resolve(paths.src, "**/*.pug"),
		path.resolve(paths.src, "**/*.js"),
		path.resolve(paths.src, "**/*.json"),
		path.resolve(paths.src, "**/*.svg"),
	],
	defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
});

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
	entry: {
		sw: path.resolve(paths.srcAssets, "js/sw.js"),
		main: path.resolve(paths.srcAssets, "js/main.js"),
		main: path.resolve(paths.srcAssets, "scss/main.scss"),
	},
	output: {
		path: path.resolve(paths.dist, "assets/"),
		filename: "js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["@babel/preset-env"],
					},
				},
			},
			{
				test: [/.css$|.scss$/],
				use: [
					MiniCssExtractPlugin.loader,
					{ loader: "css-loader", options: { importLoaders: 1 } },
					{
						loader: "postcss-loader",
						options: {
							ident: "postcss",
							parser: "postcss-scss",
							plugins: () => [
								tailwind,
								autoprefixer,
								...(isProduction ? [purgecss] : []),
							],
						},
					},
					{
						loader: "sass-loader",
					},
				],
			},
		],
	},
	plugins: [
		new WebpackAssetsManifest({
			output: path.resolve(paths.dist, "assets.json"),
			publicPath: "/assets/",
			writeToDisk: true,
			apply(manifest) {
				manifest.set("year", new Date().getFullYear());
			},
		}),
		new WebpackAssetsManifest({
			output: path.resolve(paths.src, "11ty/_data/assets.json"),
			publicPath: "/assets/",
			writeToDisk: true,
			apply(manifest) {
				manifest.set("year", new Date().getFullYear());
			},
		}),
		new CopyWebpackPlugin([
			{
				from: "./src/assets/images/**/*.{png,jpg,jpeg}",
				to: "./images/[name].webp",
			},
		]),
		new ImageminWebpackPlugin({
			plugins: [
				ImageminWebP({
					quality: 75,
				}),
			],
		}),
	],
};

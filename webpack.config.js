const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = function (env, argsObject) {
	return {
		entry: "./source/index.jsx",
		output: {
			path: path.resolve(__dirname, argsObject.mode || "build"),
			filename: "index.js"
		},
		target: ["web"],
		devServer: {
			static: {
				directory: "public"
			},
			port: 5000,
			open: true,
			historyApiFallback: true
		},
		resolve: {
			modules: ["source", "node_modules", "style"],
			extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass"],
			alias: {
				"@": path.resolve(__dirname)
			},
			extensionAlias: {
				".js": [".js", ".ts"]
			}
		},
		stats: {
			errorDetails: true
		},
		module: {
			rules: [
				{
					test: /\.([cm]?ts|tsx)$/,
					exclude: /node_modules/,
					use: ["ts-loader", "babel-loader"]
				},
				{
					test: /\.([cm]?js|jsx)$/,
					exclude: /node_modules/,
					use: ["babel-loader"]
				},
				{
					test: /\.(css|scss|sass)$/,
					use: ["style-loader", "css-loader"]
				},
				{
					test: /\.(png|jpeg|jpg|bmp|svg|gif)$/,
					use: ["file-loader"]
				}
			]
		},
		plugins: [
			new webpack.ProvidePlugin({
				React: "react"
			}),
			new HtmlWebpackPlugin({
				template: "public/index.html"
			})
		]
	};
};

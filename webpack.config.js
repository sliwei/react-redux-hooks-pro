const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	// 输出
	output: {
		filename: 'js/[name].[contenthash:8].js',
		path: path.resolve(__dirname, '../dist'),
		publicPath: './',
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		// 打包之前清除文件
		new CleanWebpackPlugin(['dist'], {
			root: path.resolve(__dirname, './'),
		}),
		// 模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
		}),
		// 解决vender后面的hash每次都改变
		new webpack.HashedModuleIdsPlugin(),
	],
	optimization: {
		// 分离chunks
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				react: {
					name: 'react',
					test: module => {
						return /react|react-dom|react-router-dom/.test(module.context);
					},
					priority: 9,
					chunks: 'all',
				},
				redux: {
					name: 'redux',
					test: module => {
						return /react-redux|redux/.test(module.context);
					},
					priority: 8,
					chunks: 'all',
				},
			},
		},
		minimizer: [
			// 压缩JS代码
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						warnings: false,
						drop_debugger: true,
						drop_console: true,
					},
				},
				cache: true,
				parallel: true,
				sourceMap: false, // set to true if you want JS source maps
			}),
		],
	},
};

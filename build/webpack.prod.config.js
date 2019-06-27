const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
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
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: { publicPath: '../' },
					},
					'css-loader',
					'postcss-loader',
					'sass-loader',
				],
			},
		]
	},
	plugins: [
		// 打包之前清除文件
		new CleanWebpackPlugin(),
		// 模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '../index.html'),
			filename: 'index.html',
			inject: true,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			},
			chunksSortMode: 'dependency'
		}),
		// 解决vender后面的hash每次都改变
		new webpack.HashedModuleIdsPlugin(),
		// 压缩CSS插件
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].css',
		}),
	],
	optimization: {
		// 分离chunks
		splitChunks: {
			chunks: 'all',
			cacheGroups: {
				react: {
					name: 'react',
					test: module => {
						return /\\react\\|\\react-dom\\|\\react-router-dom\\/.test(module.context);
					},
					chunks: 'all',
				},
				redux: {
					name: 'redux',
					test: module => {
						return /\\redux\\|\\react-redux\\|\\redux-thunk\\/.test(module.context);
					},
					chunks: 'all',
				},
				echarts: {
					name: 'echarts',
					test: /\\echarts\\/,
					chunks: 'all',
				},
				blueprint: {
					name: 'blueprint',
					test: module => {
						return /\\@blueprintjs\\/.test(module.context);
					},
					chunks: 'all',
				},
			},
		},
		minimizer: [
			// 压缩JS代码
			new UglifyJsPlugin({
				uglifyOptions: {
					compress: {
						// warnings: false,
						drop_debugger: true,
						drop_console: true,
					},
				},
				cache: true,
				parallel: true,
				sourceMap: false, // set to true if you want JS source maps
			}),
			// 压缩CSS代码
			new OptimizeCSSAssetsPlugin({
				assetNameRegExp: /\.css\.*(?!.*map)/g,  //注意不要写成 /\.css$/g
				cssProcessor: require('cssnano'),
				cssProcessorOptions: {
					discardComments: { removeAll: true },
					// 避免 cssnano 重新计算 z-index
					safe: true,
					// cssnano 集成了autoprefixer的功能
					// 会使用到autoprefixer进行无关前缀的清理
					// 关闭autoprefixer功能
					// 使用postcss的autoprefixer功能
					autoprefixer: false,
				},
				canPrint: true,
			}),
		],
	},
};

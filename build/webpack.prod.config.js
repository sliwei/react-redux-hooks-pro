const path = require('path');
const os = require('os');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js'],
		alias: {
			'src': path.resolve('src'),
		},
	},
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
				loader: 'happypack/loader?id=happyBabel',
				exclude: /node_modules/,
			},
			{
				test: /\.(sa|sc|c)ss$/,
				exclude: /node_modules/,
				use: [
					{loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}},
					{loader: 'css-loader', options: {modules: true}},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				include: /node_modules/,
				use: [
					{loader: MiniCssExtractPlugin.loader, options: {publicPath: '../'}},
					{loader: 'css-loader'},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'file-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[contenthash:8].[ext]',
				},
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
		// 多线程加速处理
		new HappyPack({
			// 用id来标识 happypack处理类文件
			id: 'happyBabel',
			// 如何处理 用法和loader 的配置一样
			loaders: [{loader: 'babel-loader?cacheDirectory=true'}],
			// 共享进程池
			threadPool: happyThreadPool,
			// 允许 HappyPack 输出日志
			verbose: true,
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
		// 性能视图
		// new BundleAnalyzerPlugin(),
	],
	optimization: {
		// 分离chunks
		splitChunks: {
			chunks: 'all',
			minSize: 300000,
			maxSize: 500000,
			minChunks: 1, // 模块使用次数 > minChunks进行代码分割
			maxAsyncRequests: 5, // 异步模块内部最大并行请求数
			maxInitialRequests: 3, // 入口并行加载的最大请求数(入口文件最多能拆分3个文件被http请求)
			automaticNameDelimiter: '~', // 文件名连接符
			name: true, // 自动生成文件名
			cacheGroups: { // 分割代码缓存组(同步代码分割有效)
				vendor: { // vendors组，入口文件：main.js
					test: /[\\/]node_modules[\\/]/, // 分割nodule_modules下的代码
					priority: -10, // 分割优先级(当模块符合多个组时，放在优先级高的组中)
				},
				default: { // default组，入口文件：main.js
					priority: -20,
					reuseExistingChunk: true, // 忽略已打包过的模块
				}
			}
		},

		runtimeChunk: {
			"name": "manifest"
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
					discardComments: {removeAll: true},
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

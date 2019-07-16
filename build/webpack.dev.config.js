const path = require('path');
const os = require('os');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const webpack = require('webpack');
const HappyPack = require('happypack');
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// https://juejin.im/post/5d089f0a6fb9a07eda0319b5#heading-58
const devWebpackConfig = {
	mode: 'development',
	devtool: '#cheap-module-eval-source-map',
	entry: './src/index.js',
	resolve: {
		extensions: ['.js'],
		alias: {
			'src': path.resolve('src'),
		},
	},
	output: {
		publicPath: '/'
	},
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {rewrites: {from: /.*/, to: '/index.html'}},
		hot: true,
		contentBase: path.join(__dirname, '..', 'dll'), // 静态文件根目录
		compress: true,
		host: '0.0.0.0',
		port: 8080,
		open: false,
		overlay: {warnings: false, errors: true},
		publicPath: '/',
		proxy: {},
		quiet: true,
		watchOptions: {poll: false},
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
					{loader: 'style-loader'},
					{loader: 'css-loader', options: {modules: true}},
					'postcss-loader',
					'sass-loader',
				],
			},
			{
				test: /\.(sa|sc|c)ss$/,
				include: /node_modules/,
				use: [
					{loader: 'style-loader'},
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
		// 模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, '..', 'index.html'),
			filename: 'index.html',
			react: './react.dll.js', // 与dll配置文件中output.fileName对齐
			redux: './redux.dll.js', // 与dll配置文件中output.fileName对齐
			echarts: './echarts.dll.js', // 与dll配置文件中output.fileName对齐
			blueprint: './blueprint.dll.js', // 与dll配置文件中output.fileName对齐
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
		// dll
		new webpack.DllReferencePlugin({
			manifest: require(path.join(__dirname, '..', 'dll', 'manifest.json')),
		}),
	],
};

module.exports = new Promise((resolve, reject) => {
	portfinder.basePort = 8080;
	portfinder.getPort((err, port) => {
		if (err) {
			reject(err);
		} else {
			// add port to devServer config
			devWebpackConfig.devServer.port = port;

			// Add FriendlyErrorsPlugin
			let host = devWebpackConfig.devServer.host;
			host = host === '0.0.0.0' ? 'localhost' : host;
			devWebpackConfig.plugins.push(
				new FriendlyErrorsPlugin({
					compilationSuccessInfo: {
						messages: [`Your application is running here: http://${host}:${port}`],
					},
					onErrors: (severity, errors) => {
						for (let error of errors) {
							console.error(error.webpackError);
						}
					},
				}),
			);
			resolve(devWebpackConfig);
		}
	});
});

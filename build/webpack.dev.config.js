const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');
const webpack = require('webpack');

const devWebpackConfig = {
	mode: 'development',
	devtool: '#cheap-module-eval-source-map',
	entry: './src/index.js',
	output: {
		publicPath: '/'
	},
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {rewrites: {from: /.*/, to: '/index.html'}},
		hot: true,
		contentBase: path.join(__dirname, '..', 'dll'), // 静态文件根目录
		compress: false,
		host: '0.0.0.0',
		port: 8080,
		open: false,
		overlay: true,
		publicPath: '/',
		proxy: {},
		quiet: true,
		watchOptions: {poll: false},
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{ loader: 'style-loader' },
					{ loader: 'css-loader', options: { sourceMap: true } },
					{ loader: 'postcss-loader' },
					{ loader: 'sass-loader', options: { sourceMap: true } },
				],
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
			hash: true, // 防止缓存
			minify: {
				removeAttributeQuotes: true // 压缩 去掉引号
			}
		}),
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

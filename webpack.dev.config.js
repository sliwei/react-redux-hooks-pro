const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const portfinder = require('portfinder');

const devWebpackConfig = {
	mode: 'development',
	devtool: '#cheap-module-eval-source-map',
	entry: './src/index.js',
	devServer: {
		clientLogLevel: 'warning',
		historyApiFallback: {rewrites: {from: /.*/, to: '/index.html'}},
		hot: true,
		contentBase: false,
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
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [
		// 模板
		new HtmlWebpackPlugin({
			template: path.resolve(__dirname, './index.html'),
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

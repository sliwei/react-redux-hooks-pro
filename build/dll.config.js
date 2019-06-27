const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
	mode: 'production',
	entry: {
		react: [
			'react',
			'react-dom',
			'react-router-dom'
		],
		redux: [
			'redux',
			'react-redux',
			'redux-thunk'
		],
		echarts: [
			'echarts',
		],
		blueprint: [
			'@blueprintjs/core',
			'@blueprintjs/datetime',
			'@blueprintjs/docs-theme',
			'@blueprintjs/icons',
			'@blueprintjs/select',
			'@blueprintjs/table',
		],
	},
	output: {
		path: path.join(__dirname, '../dll'),
		filename: '[name].dll.js',
		library: '_dll_[name]' // 全局变量名，其他模块会从此变量上获取里面模块
	},
	// manifest是描述文件
	plugins: [
		// 打包之前清除文件
		new CleanWebpackPlugin(),
		new webpack.DllPlugin({
			name: '_dll_[name]',
			path: path.join(__dirname, '../dll/manifest.json'),
		})
	],
	optimization: {
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
		],
	},
};


const path = require('path');

module.exports = {
	mode: 'development',
	target: 'node',
	entry: {
		main: path.resolve(__dirname, '../src/index.js')
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '../lib/js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	}
}

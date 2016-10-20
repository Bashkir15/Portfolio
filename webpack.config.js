var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: {
		main: './public/main.js',
		other: './public/scripts/pages/other.js'
	},

	output: {
		path: path.resolve(__dirname, './dist/'),
		publicPath: '/',
		filename: '[name].build.js'
	},

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
			}
		]
	}
}
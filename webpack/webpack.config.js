var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: '../public/main.js',

	output: {
		path: path.resolve(__dirname, '../dist/'),
		publicPath: '/',
		filename: 'bundle.js'
	},

	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin()
	],

	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				exclude: '/node_modules/'
			}
		]
	},
}
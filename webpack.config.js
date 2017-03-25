var webpack = require('webpack');
var path = require('path');

const PATHS = {
	main: path.join(__dirname, 'public/main'),
	dist: path.join(__dirname, 'dist')
};

module.exports = {

	devtool: 'cheap-module-source-map',

	entry: {
		main: PATHS.main
	},

	output: {
		path: path.join(PATHS.dist),
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
	},


	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin()

	]
}
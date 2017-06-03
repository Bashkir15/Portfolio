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
		filename: '[name].build.js',
		chunkFilename: '[name]-[chunkhash:8].js'
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: 'babel-loader',
			}
		]
	},


	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
			},

			output: {
				comments: false,
			},
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
		}),
	]
};

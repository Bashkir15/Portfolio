const webpack = require('webpack');
const { resolve, join } = require('path');
const { getHashDigest } = require('loader-utils');
const getRoot = require('app-root-dir').get;
const StatsPlugin = require('stats-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const SriPlugin = require('webpack-subresource-integrity');
const BabiliPlugin = require('babili-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const env = 'production';
const CACHE_HASH_TYPE = 'sha256';
const CACHE_DIGEST_TYPE = 'base62';
const CACHE_DIGEST_LENGTH = 4;
const ROOT = getRoot();
const PROJECT_CONFIG = require(resolve(ROOT, 'package.json'));
const CACHE_HASH = getHashDigest(JSON.stringify(PROJECT_CONFIG), CACHE_HASH_TYPE, CACHE_DIGEST_TYPE, CACHE_DIGEST_LENGTH)
const CACHE_LOADER_DIRECTORY = resolve(ROOT, `.cache/loader-${CACHE_HASH}`)
const PATHS = {
	public: resolve(process.cwd(), 'public'),
	scripts: resolve(process.cwd(), 'public/scripts/pages'),
	build: resolve(process.cwd(), 'build'),
};
const cacheLoader = {
	loader: 'cache-loader',
	options: {
		cacheDirectory: CACHE_LOADER_DIRECTORY,
	}
};
const extractSass = new ExtractTextPlugin({
	filename: '[name].css',
	disable: env === 'development'
});

module.exports = {
	devtool: 'cheap-module-source-map',
	context: ROOT,
	entry: {
		landing: resolve(PATHS.scripts, 'landing.js'),
		about: resolve(PATHS.scripts, 'about.js'),
		works: resolve(PATHS.scripts, 'works.js'),
		process: resolve(PATHS.scripts, 'process.js'),
		blog: resolve(PATHS.scripts, 'blog.js')
	},

	output: {
		path: PATHS.build,
		publicPath: '/',
		filename: '[name].js',
		chunkFilename: '[name].js',
		crossOriginLoading: 'anonymous'
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				use: [
					cacheLoader,
					{
						loader: 'babel-loader',
						options: {
							babelrc: false,
							presets: [
								['env', {
									modules: false,
									useBuiltIns: true,
								}],
								'babili'
							],
							plugins: [
								'transform-class-properties',
							]
						}
					}
				]
			},

			{
				test: /\.sass$/,
				include: [
					resolve(ROOT, 'public/static/sass'),
					resolve(ROOT, 'public/static/sass/views/displays'),
				],
				use: extractSass.extract({
					use: [{
						loader: 'css-loader'
					}, {
						loader: 'sass-loader'
					}],
					fallback: 'style-loader'
				})
			}
		]
	},
	resolve: {
		extensions: ['.js', '.css', '.svg'],
		alias: process.env.NODE_ENV === 'production' ? {
			scripts: './build/scripts',
			images: './build/images',
		} : {
			scripts: './public/scripts',
			styles: resolve(ROOT, 'public/static/styles'),
			sass: resolve(ROOT, 'public/static/sass'),
			images: './public/static/images'
		}
	},


	plugins: [
		new CaseSensitivePathsPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: resolve(PATHS.public, 'index.html'),
			chunks: ['landing'],
		}),
		new HtmlWebpackPlugin({
			filename: 'works.html',
			template: resolve(PATHS.public, 'views/pages/works.html'),
			chunks: ['works'],
		}),
		new HtmlWebpackPlugin({
			filename: 'about.html',
			template: resolve(PATHS.public, 'views/pages/about.html'),
			chunks: ['about'],
		}),
		new HtmlWebpackPlugin({
			filename: 'process.html',
			template: resolve(PATHS.public, 'views/pages/process.html'),
			chunks: ['process']
		}),
		new HtmlWebpackPlugin({
			filename: 'blog.html',
			template: resolve(PATHS.public, 'views/pages/blog.html'),
			chunks: ['blog']
		}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('production')
		}),
		extractSass,
	].concat(env === 'production' ? [
		new StatsPlugin('stats.json'),
		new BabiliPlugin({}, {
			comments: false,
		}),
		new webpack.HashedModuleIdsPlugin(),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
		}),
		new SriPlugin({
			hashFuncNames: ['sha256', 'sha512'],
			enabled: true
		}),
		new BundleAnalyzerPlugin.BundleAnalyzerPlugin({
			analyzerMode: 'static',
			defaultSize: 'gzip',
			loglevel: 'silent',
			openAnalyzer: true,
			reportFilename: 'report.html',
		}) 
	] : [
		new webpack.NamedModulesPlugin(),
		new webpack.NoEmitOnErrorsPlugin()
	])
};

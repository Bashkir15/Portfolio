import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import webpack from 'webpack';
import webpackConfig from '../../webpack/webpack.config.js';

module.exports = function () {
	let app = express();
	const compiler = webpack(webpackConfig);

	app.use(require('connect-history-api-fallback')(compiler, {
		publicPath: webpackConfig.output.publicPath,
		stats: {
			colors: true
		}
	}));

	app.use(require('webpack-hot-middleware')(compiler));

	app.get('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../../public/index.html'));
	});

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(morgan('dev'));
	app.use(compression());

	app.use(express.static(path.join(__dirname, '../../public')));
	app.use(express.static(path.join(__dirname, '../../node_modules')));
	app.use(express.static(path.join(__dirname, '../../dist')));

	return app;
}
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compression from 'compression';
import path from 'path';
import webpack from 'webpack';
import ejs from 'ejs';
import indexRoutes from '../routes/index.server.routes';

module.exports = function () {
	let app = express();

	app.set('views', path.join(__dirname, '../../public'));
	app.set('view engine', 'ejs');

	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(morgan('dev'));
	app.use(compression());

	app.use(express.static(path.join(__dirname, '../../public')));
	app.use(express.static(path.join(__dirname, '../../node_modules')));
	app.use(express.static(path.join(__dirname, '../../dist')));

	app.use('/', indexRoutes);

	return app;
}
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import browserSync from 'browser-sync';
import compression from 'compression';
import indexRoutes from './routes/index.server.routes';

var config = require('./config/env/' + (process.env.NODE_ENV || 'development'));
var WebServer = express();
var server = require('http').createServer(WebServer);

function listening() {
	browserSync({
		proxy: 'localhost:' + config.server.port,
		files: ['../public/**/**/.{js,css}']
	});
}

(function (app) {

		app.set('views', path.join(__dirname, '../public'));
		app.set('view engine', 'ejs');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(morgan('dev'));
		app.use(compression());
		app.use('/', indexRoutes);
		app.use(express.static(path.join(__dirname, '../public')));
		app.use(express.static(path.join(__dirname, '../dist')));

}(WebServer));

server.listen(config.server.port);
global.server = server;
import express from 'express';
import ejs from 'ejs';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import compression from 'compression';
import indexRoutes from './routes/index.server.routes';
import contactRoutes from './routes/contact.server.routes';

var config = require('./config/env/' + (process.env.NODE_ENV || 'development'));
var WebServer = express();
var server = require('http').createServer(WebServer);


(function (app) {

		app.set('views', path.join(__dirname, '../public'));
		app.set('view engine', 'ejs');

		app.use(bodyParser.json());
		app.use(bodyParser.urlencoded({extended: true}));
		app.use(morgan('dev'));
		app.use(compression());
		app.use('/', indexRoutes);
		app.use('/contact', contactRoutes);
		app.use(express.static(path.join(__dirname, '../public')));
		app.use(express.static(path.join(__dirname, '../dist')));

}(WebServer));

server.listen(config.server.port);
global.server = server;
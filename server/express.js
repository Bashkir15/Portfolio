'use strict';

const express = require('express');
const shrinkRay = require('shrink-ray');
const parameterProtection = require('hpp');
const helmet = require('helmet');
const PrettyError = require('pretty-error');
const bodyParser = require('body-parser');
const getRoot = require('app-root-dir').get;
const { resolve, join } = require('path');
const indexRoutes = require('./routes/index.server.routes');
const { env } = process;
const pretty = new PrettyError();

module.exports = () => {
	const ROOT = getRoot();
	const PATHS = {
		public: resolve(ROOT, 'public'),
		build: resolve(ROOT, 'build'),
		dist: resolve(ROOT, 'dist'),
		static: resolve(ROOT, 'public/static'),
	};
	const app = express();
	const enableCSP = false;
	const cspConfig = enableCSP ? {
		directives: {
			defaultSrc: ["'self'"],
			scriptSrc: [
				"'self'",
				"'unsafe-inline"
			].filter(value => value !== ''),
			styleSrc: ["'self'", "'unsafe-inline'", "blob:"],
			imgSrc: ["'self'", "data:", "https://d2rf2imq3sfix6.cloudfront.net"],
			fontSrc: ["'self'", "data:", "https://fonts.googleapis.com"],
			connectSrc: ["*"],
			childSrc: ["'self'"]
		}
	} : null;

	if (cspConfig) {
		app.use(helmet.contentSecurityPolicy(cspConfig));
	}
	app.disable('x-powered-by');
	app.use(parameterProtection());
	app.use(helmet.xssFilter());
	app.use(helmet.frameguard('deny'));
	app.use(helmet.ieNoOpen());
	app.use(helmet.noSniff());
	app.use(bodyParser.urlencoded({ extended: false }));
	app.use(bodyParser.json());
	app.use(shrinkRay());
	app.use(express.static(PATHS.public));
	app.use(express.static(PATHS.build));
	app.use(express.static(PATHS.dist));
	app.use(express.static(PATHS.static));
	app.use('/', indexRoutes);

	return app;
};

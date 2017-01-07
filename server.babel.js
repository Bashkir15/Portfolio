import http from 'http'
import mongoose from 'mongoose'

import Topic from './server/models/topics'
import Section from './server/models/sections'

if (process.env.NODE_ENV == 'undefined') {
	process.env.NODE_ENV == 'development';
}

const config = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));

const db = mongoose.connect(config.db.connection, () => {
	console.log(`The application has connected to the ${config.db.name} database`);
});

const app = require('./server/config/express')(db);
const env = app.get('env');
const server = require('http').Server(app);

server.listen(config.server.port, () => {
	console.log(`The application is up and running at ${config.server.host}${config.server.port} and the environment is currently set to ${env}`);
});

global.config = config;
global.server = server;

module.exports = app;





import http from 'http'
import mongoose from 'mongoose'
import appConfig from './server/config/express'

const environment = (process.env.NODE_ENV || 'development');
const config = require(`./server/config/env/${environment}`);
const app = appConfig();
const server = require('http').Server(app);

server.listen(config.server.port, () => {
	console.log(`The application is up and running at ${config.server.host}${config.server.port} and the environment is currently set to ${environment}`);
});

global.config = config;
global.server = server;

module.exports = app;





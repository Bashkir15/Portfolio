const http = require('http');
const expressConfig = require('./server/config/express');
const dotenv = require('dotenv');
const app = expressConfig();
const server = require('http').Server(app);

dotenv.load({path: '.env'});

const { env } = process;
const config = Object.assign({}, {
    SERVER_HOST: env.SERVER_HOST,
    SERVER_PORT: env.SERVER_PORT,
    MAILER_SERVICE: env.MAILER_SERVICE,
    MAILER_USER: env.MAILER_USER,
    MAILER_PASS: env.MAILER_PASS,
});

server.listen(config.SERVER_PORT, () => {
	console.log(`The application is up and running at ${config.SERVER_HOST}${config.SERVER_PORT} and the environment is currently set to ${process.env.NODE_ENV}`);
});

global.config = config;
global.server = server;

module.exports = app;

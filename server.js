const http = require('http');
const expressConfig = require('./server/express');
const dotenv = require('dotenv');
const getRoot = require('app-root-dir').get;
const ROOT = getRoot();

dotenv.load({path: '.env'});

const { env } = process;
const config = Object.assign({}, {
    SERVER_HOST: env.SERVER_HOST,
    SERVER_PORT: env.SERVER_PORT,
    MAILER_SERVICE: env.MAILER_SERVICE,
    MAILER_USER: env.MAILER_USER,
    MAILER_PASS: env.MAILER_PASS,
    MONGODB_URI: env.MONGODB_URI,
    ROOT,
});

global.config = config;


const app = expressConfig();
const server = require('http').Server(app);

server.listen(config.SERVER_PORT, () => {
	console.log(`The application is up and running at ${config.SERVER_HOST}${config.SERVER_PORT} and the environment is currently set to ${process.env.NODE_ENV}`);
});

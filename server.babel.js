var configFile = require('./server/config/env/' + (process.env.NODE_ENV || 'development'));
var app = require('./server/config/express')();

global.config = configFile;

app.listen(global.config.server.port, () => {
	console.log('Application is up and running on ' + global.config.server.host + global.config.server.port);
});



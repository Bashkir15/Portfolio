var modules = {
	webserver: require('./server/express')
};

global.configuration = {};
global.modules = modules;

(function (config) {
	console.log('The application has connected');
}(global.configuration));
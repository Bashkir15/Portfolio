module.exports = {
	server: {
		host: 'forrest-collins.herokuapp.com',
		port: process.env.PORT
	},
	mailer: {
		auth: {
			user: process.env.USER,
			pass: process.env.PASSWORD
		}
	}
};
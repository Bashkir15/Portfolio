module.exports = {
	server: {
		host: 'localhost',
		port: process.env.PORT
	},

	mailer: {
		service: 'Gmail',
		auth: {
			user: process.env.USER,
			pass: process.env.PASSWORD
		}
	}
};
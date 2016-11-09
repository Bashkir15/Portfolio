module.exports = {
	server: {
		host: 'forest-collins.herokuapp.com',
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
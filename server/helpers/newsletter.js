const nodemailer = require('nodemailer');
const fs = require('fs');
const { News } = require('../models/newsletter');
const json = require('../helpers/json');

module.exports = () => {
	const obj = {};

	obj.signup = (req, res) => {
		try {
			const newSignup = new News(req.body);
			newSignup.isSubscribed = true;
			const savedSignup = newSignup.save();
			const emailTemplate = fs.readFileSync('./server/templates/newsletter-signup.html', { encoding: 'utf-8' });
			const transporter = nodemailer.createTransport({
				service: global.config.MAILER_SERVICE,
				auth: {
					user: global.config.MAILER_USER,
					pass: global.config.MAILER_PASS,
				}
			});
			const messageOptions = {
				from: 'Forrest Collins',
				to: req.body,
				subject: 'Welcome to the newsletter!',
				html: emailTemplate
			};

			transporter.sendMail(messageOptions, (error, info) => {
				if (error) {
					json.bad(error, res);
				} else {
					json.good(info.response, res);
				}
			});
		catch (err) {
			json.bad(err, res);
		}
	};

	return obj;
};

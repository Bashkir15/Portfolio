const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const json = require('./json');

module.exports = () => {
	const obj = {};

	obj.contact = (req, res) => {
		const messageSender = req.body.email;

		const transporter = nodemailer.createTransport({
			service: global.config.MAILER_SERVICE,
			auth: {
				user: global.config.MAILER_USER,
				pass: global.config.MAILER_PASS,
			},
		});

		const mailOptions = {
			from: messageSender,
			to: global.config.MAILER_USER,
			subject: `New Contact From ${ messageSender }`,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {

				json.bad(error, res);
			} else {
				sendContactConfirm(messageSender, res);
				json.good({}, res);
			}
		});
	};


	function sendContactConfirm(sender) {
		const emailTemplate = fs.readFileSync('./server/templates/contact.html', {encoding: 'utf-8'});

		const transporter = nodemailer.createTransport({
			service: global.config.MAILER_SERVICE,
			auth: {
				user: global.config.MAILER_USER,
				pass: global.config.MAILER_PASS,
			}
		});

		const mailOptions = {
			from: 'Forrest Collins',
			to: sender,
			subject: 'I have received your message',
			html: emailTemplate
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				console.log(error);
			} else {
				return;
			}
		});
	}

	return obj;
};
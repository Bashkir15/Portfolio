import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import json from './json';

module.exports = () => {
	let obj = {};

	obj.contact = function (req, res) {
		const messageSender = req.body.email;

		const transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
			}
		});

		const mailOptions = {
			from: messageSender,
			to: global.config.mailer.auth.user,
			subject: `New Contact From ${req.body.email}`,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				json.bad(error, res);
			} else {
				sendContactConfirm(messageSender);
				json.good(info.response, res);
			}
		});
	};


	function sendContactConfirm(sender, res) {
		const emailTemplate = fs.readFileSync('./server/templates/contact.html', {encoding: 'utf-8'});

		const transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
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
				res.json(error, res);
			} else {
				json.good(info.response, );
			}
		});
	}

	return obj;
};
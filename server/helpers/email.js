import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import json from './json';

module.exports = () => {
	var obj = {};

	obj.contact = function (req, res) {
		console.log(req.body);
		var messageSender = req.body.email;

		var transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
			}
		});

		var mailOptions = {
			from: messageSender,
			to: global.config.mailer.auth.user,
			subject: 'New contact from ' + req.body.name,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				json.bad(error, res);
			} else {
				//sendContactConfirm(messageSender);
				json.good(info.response, res);
			}
		});
	};

	function sendContactConfirm(sender) {
		var transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
			}
		});

		var mailOptions = {
			from: 'Forrest Collins',
			to: sender,
			subject: 'I have received your message'
		};

		transporter.sendMail(mailOptions, (error, info) => {
			if (error) {
				res.json(error, res);
			} else {
				json.good(info.response, res);
			}
		});
	}

	return obj;
};
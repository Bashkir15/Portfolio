import nodemailer from 'nodemailer';
var config = require('../config/env/' + (process.env.NODE_ENV || 'development'));

module.exports = function() {
	var obj = {};

	obj.send = function (req, res) {
		var transporter = nodemailer.createTransport({
			service: 'Gmail',
			auth: {
				user: config.mailer.auth.user,
				pass: config.mailer.auth.password
			}
		});

		var mailOptions = {
			from: req.body.email,
			to: config.mailer.auth.user,
			subject: 'Message from ' + req.body.email,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, function (error, info) {
			if (error) {
				res.json({message: 'error'});
			} else {
				res.json({message: 'woot'});
			}
		});
	};

	return obj;
};
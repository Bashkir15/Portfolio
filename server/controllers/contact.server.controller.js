import nodemailer from 'nodemailer';

module.exports = function() {
	var obj = {};

	obj.message = function (req, res) {
		var transporter = nodemailer.createTransport({
			service: global.config.mailer.service,
			auth: {
				user: global.config.mailer.auth.user,
				pass: global.config.mailer.auth.pass
			}
		});

		var mailOptions = {
			from: req.body.email,
			to: global.config.mailer.auth.user,
			subject: req.body.subject,
			text: req.body.message
		};

		transporter.sendMail(mailOptions, (error, info) {
			if (err) {
				console.log(error);
				res.json({message: 'error'});
			} else {
				console.log('Message sent: ' + info.response);
			}
		});
	};

	return obj;
}
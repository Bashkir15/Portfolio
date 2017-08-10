'use strict';

const { Schema, model } = require('mongoose');
const NewsletterSchema = new Schema({
	created: {
		type: Date,
		default: Date.now,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	isSubscribed: {
		type: Boolean,
		default: true,
	},
	mailsReceived: {
		type: Number,
		default: 0
	},
});

const News = model('News', NewsletterSchema);
module.exports = {
	News,
};

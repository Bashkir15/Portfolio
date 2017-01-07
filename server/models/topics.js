import mongoose from 'mongoose'

var topicSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now
	},

	name: {
		type: String,
		required: true,
		unique: true
	},

	description: {
		type: String,
		required: true
	},

	iconClass: {
		type: String,
		required: true
	},

	sections: [{
		type: mongoose.Schema.ObjectId,
		required: false,
		ref: 'Section'
	}]
});

mongoose.model('Topic', topicSchema);
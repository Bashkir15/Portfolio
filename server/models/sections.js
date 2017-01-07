import mongoose from 'mongoose'

const sectionSchema = new mongoose.Schema({
	created: {
		type: Date,
		default: Date.now()
	},

	lastUpdated: {
		type: Date,
		default: Date.now()
	},

	title: {
		type: String,
		required: true
	},

	posts: [{
		type: mongoose.Schema.ObjectId,
		ref: 'Post',
		required: true
	}]
});

mongoose.model('Section', sectionSchema);
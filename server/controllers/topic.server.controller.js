import json from '../helpers/json'
import mongoose from 'mongoose'

var Topic = mongoose.model('Topic');

module.exports = () => {
	let obj = {};

	obj.create = (req, res) => {
		var topic = new Topic(req.body);
		topic.save((err) => {
			if (err) {
				return json.bad(err, res);
			}

			json.good({
				record: topic
			}, res);
		});
	};

	obj.list = (req, res) => {
		Topic.find({}, null, {sort: {name: 1}})
		.exec((err, topics) => {
			let noTopics;

			if (!topics.length) {
				noTopics = 'There are no topics here';
			}

			if (err) {
				return json.bad(err, res);
			}

			res.render('./blog/blog', {
				topics: topics,
				noTopics: noTopics
			});
		});
	};

	obj.single = (req, res) => {
		Topic.findOne({name: req.params.topicName})
		.populate('sections')
		.populate('sections.posts')
		.exec((err, topic) => {
			if (err) {
				return json.bad(err, res);
			}

			res.render('./blog/topics/topic', {
				topic: topic
			});
		});
	};

	return obj;

};
import express from 'express'
import topicController from '../controllers/topic.server.controller'

let router = express.Router();
let topics = topicController();

router.get('/', topics.list);
router.post('/', topics.create);
router.get('/:topicName', topics.single);

module.exports = router;
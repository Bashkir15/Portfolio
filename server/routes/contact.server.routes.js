import express from 'express';
var router = express.Router();
var contact = require('../controllers/contact.server.controller')();

router.get('/', function (req, res, next) {
	res.render('templates/contact/contact');
});
router.post('/', contact.send);

module.exports = router;
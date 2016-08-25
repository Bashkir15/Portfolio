import express from 'express';

var contact = require('../controllers/contact.server.controller')();
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

router.post('/contact', contact.message);

module.exports = router;
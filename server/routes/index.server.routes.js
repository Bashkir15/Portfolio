import express from 'express';

var contact = require('../controllers/contact.server.controller')();
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/about', (req, res) => {
	res.render('templates/about/about');
});

router.post('/contact', contact.message);

module.exports = router;
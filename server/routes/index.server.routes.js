import express from 'express';

var contact = require('../controllers/contact.server.controller')();
var router = express.Router();

router.get('/', (req, res, next) => {
	res.render('index');
});

router.get('/about', (req, res) => {
	res.render('templates/about/about');
});

router.get('/skills', (req, res) => {
	res.render('templates/skills/skills');
});

router.get('/works', (req, res) => {
	res.render('templates/works/works');
});

router.post('/contact', contact.message);

module.exports = router;
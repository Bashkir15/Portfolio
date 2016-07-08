import express from 'express';
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index');
});

router.get('/home', function (req, res, next) {
	res.render('templates/home');
});

module.exports = router;
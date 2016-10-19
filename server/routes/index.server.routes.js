import express from 'express';

var router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/skills', (req, res) => {
	res.render('./views/pages/skills');
});

router.get('/works', (req, res) => {
	res.render('./views/pages/works');
});

router.get('/about', (req, res) => {
	res.render('./views/pages/about');
});



module.exports = router;
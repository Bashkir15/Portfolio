import express from 'express';
import emailHelper from '../helpers/email';

var email = emailHelper();
var router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/works', (req, res) => {
	res.render('./views/pages/works');
});

router.get('/about', (req, res) => {
	res.render('./views/pages/about');
});


router.post('/contact', email.contact);



module.exports = router;
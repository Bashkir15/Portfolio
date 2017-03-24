import express from 'express';
import emailHelper from '../helpers/email';

const email = emailHelper();
const router = express.Router();

router.get('/', (req, res) => {
	res.render('index');
});

router.get('/works', (req, res) => {
	res.render('./views/pages/works');
});

router.get('/about', (req, res) => {
	res.render('./views/pages/about');
});

router.get('/work/opinion', (req, res) => {
	res.render('./views/pages/works/opinion')
});

router.get('/work/evolution', (req, res) => {
	res.render('./views/pages/works/evolution');
});

router.get('/work/softserve', (req, res) => {
	res.render('./views/pages/works/softserve');
});

router.get('/work/golondrina', (req, res) => {
	res.render('./views/pages/works/golondrina');
});

router.get('/work/blog', (req, res) => {
	res.render('./views/pages/works/blog');
});

router.get('/work/application-boilerplate', (req, res) => {
	res.render('./views/pages/works/applicationBoilerplate');
});

router.get('/work/math', (req, res) => {
	res.render('./views/pages/works/math');
});

router.post('/contact', email.contact);



module.exports = router;
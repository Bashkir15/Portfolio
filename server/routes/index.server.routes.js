const { Router } = require('express');
const { resolve } = require('path');
const emailHelper = require('../helpers/email');
const getRoot = require('app-root-dir').get;
const ROOT = getRoot();
const env = process.env.NODE_ENV;
const envPath = process.env.NODE_ENV === 'production' ?
	`${ROOT}/build` :
	`${ROOT}/public/views/pages`;
const email = emailHelper();
const router = Router();
console.log(env);
router.get('/', (req, res) => {
	res.sendFile(resolve(envPath, 'index.html'));
});
router.get('/works', (req, res) => {
	res.sendFile(resolve(envPath, 'works.html'));
});
router.get('/about', (req, res) => {
	res.sendFile(resolve(envPath, 'about.html'));
});
router.get('/process', (req, res) => {
	res.sendFile(resolve(envPath, 'process.html'));
});
router.get('/blog', (req, res) => {
	res.sendFile(resolve(envPath, 'blog.html'));
});
router.post('/contact', email.contact);
module.exports = router;
import Vue from 'vue';
import Router from 'vue-router';
import App from './app/App.vue';
import Home from './app/components/home/home.vue';
import sidenav from './app/components/sidenav/sidenav.vue';

Vue.use(Router);

var router = new Router();

router.map({
	'/': {
		component: Home
	}
});

router.beforeEach(() => {
	window.scrollTo(0,0);
});

router.redirect({
	'*': '/'
});

router.start(App, '#app');
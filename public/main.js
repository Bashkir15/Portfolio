import sidenav from './scripts/components/sidenav.js';
import scrollNav from './scripts/scroll.nav.js';
import routes from './scripts/routes.js';
import home from './scripts/home/home.js';
import about from './scripts/about/about.js';
import skills from './scripts/skills/skills.js';
import works from './scripts/works/works.js';

function init() {
	var sidenavTrigger = document.getElementById('open-sidenav');
	var sidenavMenu = document.getElementById('sidenav-container');

	if (sidenavTrigger) {
		var leftNav = new sidenav();

		sidenavTrigger.addEventListener('click', leftNav.open, false);
	}

	if (window.location.href.indexOf('skills') != -1) {
		skills.init();
	} else if (window.location.href.indexOf('about') != -1) {
		about.init();
	} else if (window.location.href.indexOf('works') != -1) {
		works.init();
	} else {
		home.init();
	}

	scrollNav.init();
	routes.init();
}

window.onload = function() {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}

init();
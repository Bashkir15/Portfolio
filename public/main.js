import sidenav from './scripts/components/sidenav.js';
import scrollNav from './scripts/scroll.nav.js';
import home from './scripts/home/home.js';
import about from './scripts/about/about.js';
import skills from './scripts/skills/skills.js';

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
	} else {
		home.init();
	}

	scrollNav.init();
}

init();
window.onload = function() {
	setTimeout(function() {
		document.body.classList.add('loaded');
	}, 1000);
};
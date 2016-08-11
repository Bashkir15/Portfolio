import sidenav from './scripts/sidenav.js';

var sidenavTrigger = document.getElementById('open-sidenav');

if (sidenavTrigger) {
	sidenavTrigger.addEventListener('click', sidenav.openNav);
}
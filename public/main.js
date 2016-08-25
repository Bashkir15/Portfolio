import sidenav from './scripts/components/sidenav.js';
import scrollNav from './scripts/scroll.nav.js';
import home from './scripts/home/home.js';

var sidenavTrigger = document.getElementById('open-sidenav');
var sidenavMenu = document.getElementById('sidenav-container');

if (sidenavTrigger) {
	var leftNav = new sidenav();

	sidenavTrigger.addEventListener('click', leftNav.open, false);
	//sidenavMenu.addEventListener('transitionend', sidenav.onTransitionEnd, false);
}


window.onload = scrollNav.init();
window.onload = home.init();
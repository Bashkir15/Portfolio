import navshrink from './scripts/utils/nav.shrink';
import scrollIn from './scripts/utils/scroll.in';

import landing from './scripts/pages/landing';

var scrollEntrance = new scrollIn();

function activeUrl() {
	var navLinks = document.querySelectorAll('.nav-link');

	Array.prototype.forEach.call(navLinks, (link) => {
		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	});
}


activeUrl();
navshrink();
landing();


window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollEntrance.viewPortChange);
window.addEventListener('resize', scrollEntrance.viewPortChange);
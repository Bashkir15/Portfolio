import navshrink from './scripts/utils/nav.shrink';
import scrollIn from './scripts/utils/scroll.in';
import mobileMenu from './scripts/components/mobile.menu';

import landing from './scripts/pages/landing';

var mobileTrigger = document.getElementById('nav-trigger');

var mobileNav = new mobileMenu();
var scrollEntrance = new scrollIn();

let scrollTimeout = false;

function activeUrl() {
	var navLinks = document.querySelectorAll('.nav-link');

	Array.prototype.forEach.call(navLinks, (link) => {
		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	});
}

function scrollThrottle() {
	if (!scrollTimeout) {
		window.requestAnimationFrame(() => {
			scrollEntrance.viewPortChange();
			scrollTimeout = false;
		});
	}

	scrollTimeout = true;
}

activeUrl();
navshrink();
landing();

HTMLDocument.prototype.ready = () => {
	return new Promise((resolve, reject) => {
		var startTime = console.time('start');
		var endTime;
		if (document.readyState === 'complete') {
			endTime = console.timeEnd('start');
			resolve(document, startTime, endTime);
		} else {
			document.addEventListener('DOMContentLoaded', () => {
				endTime = console.timeEnd('start');
				resolve(document, startTime, endTime);
			});
		}
	});
}

mobileTrigger.addEventListener('click', mobileNav.toggle);

document.ready().then((startTime, endTime) => {
	if (endTime - startTime > 300) {
		document.body.classList.add('loaded');
	} else {
		setTimeout(() => {
			document.body.classList.add('loaded');
		}, 1000);
	}
});


window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);
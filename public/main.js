import navshrink from './scripts/utils/nav.shrink';
import scrollIn from './scripts/utils/scroll.in';
import mobileMenu from './scripts/components/mobile.menu';

import landing from './scripts/pages/landing';
import about from './scripts/pages/about'

const mobileTrigger = document.getElementById('nav-trigger');
const navLinks = document.querySelectorAll('.nav-link');
const preLoader = document.querySelector('.preloader');
const mobileNav = new mobileMenu();
const scrollEntrance = new scrollIn();

let scrollTimeout = false;

function activeUrl() {
	let i;
	let len = navLinks.length;

	for (i = 0; i < len; i++) {
		let link = navLinks[i];

		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	}
}


if (window.location.pathname == '/about') {
	about();
} else if (window.location.pathname == '/works') {

} else {
	landing();
}

function scrollThrottle() {
	if (!scrollTimeout) {
		window.requestAnimationFrame(() => {
			scrollEntrance.viewPortChange();
			scrollTimeout = true;
		});
	}

	scrollTimeout = false;
}


HTMLDocument.prototype.ready = () => {
	return new Promise((resolve, reject) => {
		let startTime = console.time('start');
		let endTime;
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

document.ready().then((startTime, endTime) => {
	if (endTime - startTime > 300) {
		document.body.classList.add('loaded');
		preLoader.classList.add('finished')
	} else {
		setTimeout(() => {
			document.body.classList.add('loaded');
			preLoader.classList.add('finished');
		}, 1000);
	}
}); 

activeUrl();
navshrink();


mobileTrigger.addEventListener('click', mobileNav.toggle);
window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);
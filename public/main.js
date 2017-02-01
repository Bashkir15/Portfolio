import navshrink from './scripts/utils/nav.shrink';
import scrollIn from './scripts/utils/scroll.in';
import mobileMenu from './scripts/components/mobile.menu';

import landing from './scripts/pages/landing';

const mobileTrigger = document.getElementById('nav-trigger');
const preLoader = document.querySelector('.preloader');
const mobileNav = new mobileMenu();
const scrollEntrance = new scrollIn();

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
			scrollTimeout = true;
		});
	}

	scrollTimeout = false;
}


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
landing();


mobileTrigger.addEventListener('click', mobileNav.toggle);
window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);
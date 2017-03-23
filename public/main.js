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

function init() {
	let canvas = document.querySelector('.preloader-canvas'),
	context = canvas.getContext('2d'),
	t = 0,
	w,
	h;

	context.globalCompositeOperate = 'lighter';
	w = canvas.width = window.innerWidth;
	h = canvas.height = window.innerHeight;
	canvas.style.position = 'absolute';
	canvas.style.top = '0';
	canvas.style.left = '0';

	animate();

	function animate() {
		context.clearRect(0, 0, w, h);

		t += 1;

		for (let i = 0; i < 5000; i++) {
			let f = 0.05 + ((Math.sin(t * 0.00002) / Math.PI) * 0.2);
			let r = (Math.min(w, h)) * (Math.cos((t + i) * f) / Math.PI * 1.5);

			let x = Math.sin(i) * r + (canvas.width / 2);
			let y = Math.cos(i) * r + (canvas.height / 2);

			context.fillStyle = 'rgba(0, 255, 255, 0.5)';
			context.fillRect(x, y, 1.5, 1.5);

		}

		setTimeout(animate, 16);
	}

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
	let canvas = document.querySelector('.preloader-canvas');
	if (endTime - startTime > 300) {
		document.body.classList.add('loaded');
		canvas.parentElement.classList.add('finished');
		canvas.parentElement.removeChild(canvas)
	} else {
		setTimeout(() => {
			document.body.classList.add('loaded');
			canvas.parentElement.classList.add('finished');
			canvas.parentElement.removeChild(canvas);
		}, 1500);
	}
}); 

activeUrl();
navshrink();
init();


mobileTrigger.addEventListener('click', mobileNav.toggle);
window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);
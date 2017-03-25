
import scrollIn from './scripts/utils/scroll.in';

import preloader from './scripts/utils/preloader'
import landing from './scripts/pages/landing';
import about from './scripts/pages/about'

const scrollEntrance = new scrollIn();

preloader();

let scrollTimeout = false;

if (window.location.pathname == '/about') {
	about();
} else if (window.location.pathname == '/works') {

} else if (window.location.href.indexOf('/work') !== -1) {
	
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




window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);
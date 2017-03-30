import routes from './scripts/pages/routes'
import preloader from './scripts/utils/preloader'
import navUtil from './scripts/components/nav'
import scrollIn from './scripts/utils/scroll.in'

const scroller = new scrollIn();
let scrollTimeout;

routes();
preloader();
navUtil();

function scrollThrottle() {
	if (!scrollTimeout) {
		window.requestAnimationFrame(handleScroll);
	}

	scrollTimeout = false;
}

function handleScroll() {
	scroller.viewPortChange();
	scrollTimeout = true;
}



window.addEventListener('DOMContentLoaded', scroller.init);
window.addEventListener('scroll', scrollThrottle);
window.addEventListener('resize', scrollThrottle);	











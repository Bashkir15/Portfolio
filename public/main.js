import routes from './scripts/pages/routes'
import scrollIn from './scripts/utils/scroll.in'
import preloader from './scripts/utils/preloader'

init();

function init() {
	const scrollEntrance = new scrollIn();
	let scrollTimeout = false;

	routes();
	preloader();

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
}










import 'sass/views/pages/about.sass';
import Nav from '../utils/nav';

(() => {
	let scrolling;

	function timelineEffect() {
		const widgets = document.querySelectorAll('.about-content li');
		const { length } = widgets;
		let i;

		for (i = 0; i < length; i++) {
			if (isInView(widget)) {
				widget.classList.add('in-view');
			}
		}
	}

	function isInView(el) {
		let rect = el.getBoundingClientRect();

		return (
			rect.bottom > 0 &&
			rect.right > 0 &&
			rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
			rect.top < (window.innerHeight || document.documentElement.clientHeight)
		);
	}

	function scrollThrottle() {
		if (!scrolling) {
			window.requestAnimationFrame(() => {
				timelineEffect();
				scrolling = true;
			});
		}

		scrolling = false;
	}

	Nav();

	window.addEventListener('load', timelineEffect, false);
	window.addEventListener('scroll',scrollThrottle, false);
})();

export default function about() {
	const widgets = document.querySelectorAll('.about-content li');

	let scrolling;

	function timelineEffect() {
		let i;
		let len = widgets.length;

		for (i = 0; i < len; i++) {
			let widget = widgets[i];

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


	window.addEventListener('load', timelineEffect, false);
	window.addEventListener('scroll',scrollThrottle, false);
}
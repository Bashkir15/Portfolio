function navshrink() {
	const nav = document.querySelector('.nav');
	const landingHeader = document.querySelector('.landing-header') || {};
	let lastKnownScrollY = 0;
	let scrollTimeout = false;

	init();

	function getScrollY() {
		return window.pageYOffset || window.scrollTop;
	}

	function init() {
		window.addEventListener('scroll', scrollThrottle);
	}

	function scrollThrottle() {
		if (!scrollTimeout) {
			scrollTimeout = setTimeout(() => {
				scrollTimeout = false;
				checkPin();
			}, 250);
		}

		scrollTimeout = true;
	}

	function checkPin() {
		let currentScrollY = getScrollY();

		if (window.location.pathname == '') {
			if (currentScrollY >= landingHeader.scrollHeight) {

				if (currentScrollY < lastKnownScrollY) {
					pin();
				}

				if (currentScrollY > lastKnownScrollY) {
					unpin();
				}
			} else {
				pin();
			}

		} else {

			if (currentScrollY < lastKnownScrollY) {
				pin();
			}

			if (currentScrollY > lastKnownScrollY) {
				unpin();
			}
		}


		lastKnownScrollY = getScrollY();
	}

	function pin() {
		nav.style.willChange = 'transform';

		if (nav.classList.contains('nav-unpinned')) {
			nav.classList.remove('nav-unpinned');
			nav.classList.add('nav-pinned');
		} else {
			nav.classList.add('nav-pinned');
		}

		nav.style.willChange = 'auto';
	}

	function unpin() {

		nav.style.willChange = 'transform';

		if (nav.classList.contains('nav-pinned')) {
			nav.classList.remove('nav-pinned');
			nav.classList.add('nav-unpinned');
		} else {
			nav.classList.add('nav-unpinned');
		}

		nav.style.willChange = 'auto';
	}
}

export default navshrink
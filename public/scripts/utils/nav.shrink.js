function navshrink() {
	var lastKnownScrollY = 0;
	var nav = document.querySelector('.nav');

	init();

	function getScrollY() {
		return window.pageYOffset || window.scrollTop;
	}

	function init() {
		window.addEventListener('scroll', checkPin);
	}

	function checkPin() {
		var currentScrollY = getScrollY();

		if (currentScrollY < lastKnownScrollY) {
			pin();
		}

		if (currentScrollY > lastKnownScrollY) {
			unpin();
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
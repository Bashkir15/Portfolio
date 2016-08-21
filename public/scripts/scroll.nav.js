
function init() {
	window.addEventListener('scroll', function(e) {
		var distanceY = window.pageYOffset || document.documentElement.scrollTop;
		var nav = document.querySelector('nav');

		if (distanceY > 10) {
			nav.classList.add('nav--scrolled');
		} else {
			if (nav.classList.contains('nav--scrolled')) {
				nav.classList.remove('nav--scrolled');
			}
		}
	});
}

export default {
	init: init
}
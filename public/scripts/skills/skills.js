import scrollTo from '../utils/scrollTo';


function init() {
	var frontTrigger = document.getElementById('frontend-trigger');
	var backTrigger = document.getElementById('backend-trigger');
	var efficientTrigger = document.getElementById('efficiency-trigger');

	if (frontTrigger) {
		frontTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('skills-front-end').offsetTop);
		}, false);
	}

	if (backTrigger) {
		backTrigger.addEventListener('click', function() {
			scrollTo.smoothScroll(document.getElementById('skills-back-end').offsetTop);
		}, false);
	}

	if (efficientTrigger) {
		efficientTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('skills-efficiency').offsetTop);
		}, false);
	}

	function scrollWatch() {
		var distanceY = window.pageYOffset || document.documentElement.scrollTop;
		var navigation = document.getElementById('skills-page-nav');

		if (distanceY > 110) {
			navigation.classList.add('navigation-scrolled');
		} else {
			navigation.classList.remove('navigation-scrolled');
		}
	}

	window.addEventListener('scroll', scrollWatch);

	//backEndTrigger.addEventListener('click', scrollTo.smoothScroll(document.getElementById('skills-back-end').offsetTop));
}

export default {
	init: init
}	
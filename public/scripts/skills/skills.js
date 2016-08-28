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

	//backEndTrigger.addEventListener('click', scrollTo.smoothScroll(document.getElementById('skills-back-end').offsetTop));
}

export default {
	init: init
}	
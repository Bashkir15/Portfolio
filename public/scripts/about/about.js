import scrollTo from '../utils/scrollTo.js';

function init() {
	var earlyTrigger = document.getElementById('early-trigger');
	var collegeTrigger = document.getElementById('college-trigger');
	var nowTrigger = document.getElementById('now-trigger');
	var futureTrigger = document.getElementById('future-trigger');

	if (earlyTrigger) {
		earlyTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('about-early').offsetTop);
		}, false);
	}

	if (collegeTrigger) {
		collegeTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('about-college').offsetTop);
		}, false);
	}

	if (nowTrigger) {
		nowTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('about-now').offsetTop);
		}, false);
	}

	if (futureTrigger) {
		futureTrigger.addEventListener('click', () => {
			scrollTo.smoothScroll(document.getElementById('about-future').offsetTop);
		}, false);
	}
}

export default {
	init: init
}

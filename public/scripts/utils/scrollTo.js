var smoothScroll = (function() {
	var timer;
	var start;
	var factor;

	return function (target, duration) {
		var offset = window.pageYOffset;
		var delta = target - window.pageYOffset;
		var duration = duration || 1000;
		start = Date.now();
		factor = 0;

		if (timer) {
			clearInterval(timer);
		}

		function step() {
			var y;
			factor = (Date.now() - start) / duration;

			if (factor >= 1) {
				clearInterval(timer);
				factor = 1;
			}

			y = factor * delta + offset;
			window.scrollBy(0, y - window.pageYOffset);
		}

		timer = setInterval(step, 10);
		return timer;
	}
}());

export default {
	smoothScroll: smoothScroll
}
webpackHotUpdate(0,{

/***/ 2:
/***/ function(module, exports) {

	"use strict";

	var entrance = {};
	entrance.duration = "1000";
	entrance.distance = "200";
	entrance.heightOffset = 200;

	entrance.isElemInView = function () {
		var rect = elem.getBoundingClientRect();

		return rect.top + entrance.heightOffset >= 0 && rect.top + entrance.heightOffset <= window.innerHeight || rect.bottom + entrance.heightOffset >= 0 && rect.bottom + entrance.heightOffset <= window.innerHeight || rect.top + entrance.heightOffset < 0 && rect.bottom + entrance.heightOffset > window.innerHeight;
	};

	entrance.setInitialStyles = function (elem) {
		document.body.style.overflowX = "hidden";

		var anim = elem.getAttribute('data-entrace');
		var delay = elem.getAttribute("data-entrace-delay");

		elem.style.transition = "all " + entrance.duration / 1000 + "s ease";

		if (delay) {
			elem.style.transitionDelay = delay / 1000 + 's';
		}

		if (anim == "fade") {
			elem.style.opacity = "0";
		}

		if (anim == "from-bottom") {
			elem.style.opacity = "0";
			elem.style.transform = "translate(0, " + entrance.distance + "px)";
		}
	};

	entrance.enter = function (elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.className += " has-entered";
	};

	entrance.viewportChange = function () {
		Array.prototype.map.call(entrance.elements, function (item) {
			if (entrance.elements.isElemInView(item)) {
				var hasEntered = item.classList.contains('has-entered');
			}

			if (!hasEntered) {
				enter(item);
			}
		});
	};

	entrance.init = function () {
		entrance.elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(entrance.elements, function (item) {
			setInitialStyles(item);

			if (isElemInView(item)) {
				addEventListener('load', function () {
					enter(item);
				}, false);
			}
		});
	};

	module.exports = {
		entrance: entrance
	};

/***/ }

})
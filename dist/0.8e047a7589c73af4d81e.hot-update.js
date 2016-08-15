webpackHotUpdate(0,{

/***/ 2:
/***/ function(module, exports) {

	'use strict';

	function init() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			var anim = item.getAttribute('data-entrance');
			var delay = item.getAttribute("data-entrance-delay");

			item.style.transition = "all 1s ease";

			if (delay) {
				elem.style.transitionDelay = delay / 1000 + 's';
			}
			if (anim == "fade") {
				item.style.opacity = "0";
			}
		});
	}

	function enter(elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.className += " has-entered";
	}

	function viewportChange() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			var hasEntered = item.classList.contains("has-entered");

			if (!hasEntered) {
				enter(item);
			}
		});
	}

	module.exports = {
		init: init,
		enter: enter,
		viewportChange: viewportChange
	};
	/*entrance.isElemInView = function() {
	var rect = elem.getBoundingClientRect();
		return(
		((rect.top + entrance.heightOffset) >= 0 && (rect.top + entrance.heightOffset) <= window.innerHeight) ||
		((rect.bottom + entrance.heightOffset) >= 0 && (rect.bottom + entrance.heightOffset) <= window.innerHeight) ||
		((rect.top + entrance.heightOffset) < 0 && (rect.bottom + entrance.heightOffset) > window.innerHeight)
	);
	}


	entrance.setInitialStyles = function (elem) {
		document.body.style.overflowX = "hidden";
			var anim = elem.getAttribute('data-entrace');
		var delay = elem.getAttribute("data-entrace-delay");
			elem.style.transition = "all " + (entrance.duration / 1000) + "s ease";
			if (delay) {
			elem.style.transitionDelay = (delay/1000) + 's';
		}
			if (anim == "fade") {
			elem.style.opacity = "0";
		}
			if (anim == "from-bottom") {
			elem.style.opacity = "0";
			elem.style.transform = "translate(0, " + entrance.distance + "px)";
		}
	}
	entrance.enter = function (elem) {
	elem.style.visibility = "visible";
	elem.style.opacity = "1";
	elem.style.transform = "translate(0,0)";
	elem.className += " has-entered";
	}

	entrance.viewportChange = function() {
		Array.prototype.map.call(entrance.elements, (item) => {
			if (entrance.elements.isElemInView(item)) {
				var hasEntered = item.classList.contains('has-entered');
			}
				if (!hasEntered) {
				enter(item);
			}
		});
	}
	entrance.init =	function() {
		entrance.elements = document.querySelectorAll('[data-entrance]');
			Array.prototype.map.call(entrance.elements, (item) => {
			setInitialStyles(item);
				if (isElemInView(item)) {
				addEventListener('load', () => {
					enter(item);
				}, false);
			}
		});
	}

	module.exports = {
	entrance: entrance
	} */

/***/ }

})
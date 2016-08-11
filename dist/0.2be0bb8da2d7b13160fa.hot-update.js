webpackHotUpdate(0,{

/***/ 2:
/***/ function(module, exports) {

	"use strict";

	var scrollInPlugin = {};
	scrollInPlugin.duration = "1000";
	scrollInPlugin.distance = "200";
	scrollInPlugin.heightOffset = 200;

	function isElemInView() {
		var rect = elem.getBoundingClientRect();

		return rect.top + scrollInPlugin.heightOffset >= 0 && rect.top + scrollInPlugin.heightOffset <= window.innerHeight || rect.bottom + scrollInPlugin.heightOffset >= 0 && rect.bottom + scrollInPlugin.heightOffset <= window.innerHeight || rect.top + scrollInPlugin.heightOffset < 0 && rect.bottom + scrollInPlugin.heightOffset > window.innerHeight;
	}

	function setInitialStyles(elem) {
		document.body.style.overflowX = "hidden";

		var anim = elem.getAttribute('data-entrace');
		var delay = elem.getAttribute("data-entrace-delay");

		elem.style.transition = "all " + scrollInPlugin.duration / 1000 + "s ease";

		if (delay) {
			elem.style.transitionDelay = delay / 1000 + 's';
		}

		if (anim == "fade") {
			elem.style.opacity = "0";
		}

		if (anim == "from-bottom") {
			elem.style.opacity = "0";
			elem.style.transform = "translate(0, " + scrollInPlugin.distnace + "px)";
		}
	}

	function enter(elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0, 0)";
		elem.className += ' has-entered';
	}

	function viewportChange() {
		Array.prototype.map.call(scollInPlugin.elements, function (item) {
			if (scrollInPlugin.elements.isElemInView(item)) {
				var hasEntered = item.classList.contains('has-entered');
			}

			if (!hasEntered) {
				enter(item);
			}
		});
	}

	function init() {
		scrollInPlugin.elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(scrollInPlugin.elements, function (item) {
			setInitialStyles(item);

			if (isElemInView(item)) {
				addEventListener('load', function () {
					enter(item);
				}, false);
			}
		});
	}

	module.exports = {
		scrollInPlugin: scrollInPlugin,
		isElemInView: isElemInView,
		setInitialStyles: setInitialStyles,
		enter: enter,
		viewportChange: viewportChange,
		init: init
	};

/***/ }

})
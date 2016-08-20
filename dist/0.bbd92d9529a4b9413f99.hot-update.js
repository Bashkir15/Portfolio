webpackHotUpdate(0,{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getScrollbar = __webpack_require__(4);

	var _getScrollbar2 = _interopRequireDefault(_getScrollbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toggleSideNav() {
		var navContainer = document.getElementById('sidenav-container');
		var nav = document.getElementById('sidenav');

		nav.style.willChange = "transform";
		navContainer.classList.add("sidenav-container--animatable");

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			window.setTimeout(function () {
				document.body.style.background = "rgba(0,0,0,0.4)";
			}), 500;
		} else {
			navContainer.classList.remove("sidenav-container--visible");
			backdrop.classList.remove("backdrop--visible");
		}

		nav.style.willChange = 'auto';
		backdrop.style.willChange = 'auto';
	}

	function onTransitionEnd() {
		var navContainer = document.getElementById('sidenav-container');

		navContainer.classList.remove("sidenav-container--animatable");
	}

	function openNav() {
		var scrollBarWidth = (0, _getScrollbar2.default)();
		var backdrop = document.createElement('div');
		var closeSidenav = document.getElementById('close-sidenav');
		backdrop.className = "sidenav-backdrop";
		document.body.appendChild(backdrop);
		document.body.classList.add('modal-open');
		document.getElementById('sidenav').style.width = "250px";
		backdrop.style.opacity = "0.7";

		if (scrollBarWidth !== 0) {
			document.body.style.paddingRight = scrollBarWidth + 'px';
		}

		backdrop.addEventListener('click', closeNav);
		closeSidenav.addEventListener('click', closeNav);
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
		document.body.style.paddingRight = "0";
		var backdrop = document.querySelector('.sidenav-backdrop');
		document.body.removeChild(backdrop);
	}

	module.exports = {
		toggleSideNav: toggleSideNav,
		onTransitionEnd: onTransitionEnd
	};

/***/ }

})
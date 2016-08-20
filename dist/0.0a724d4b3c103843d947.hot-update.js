webpackHotUpdate(0,{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getScrollbar = __webpack_require__(4);

	var _getScrollbar2 = _interopRequireDefault(_getScrollbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
		openNav: openNav,
		closeNav: closeNav
	};

/***/ }

})
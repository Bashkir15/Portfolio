webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(3);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _scrollIn = __webpack_require__(2);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _dialog = __webpack_require__(5);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');
	var sidenavMenu = document.getElementById('sidenav-container');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		sidenavTrigger.addEventListener('click', _sidenav2.default.toggleSideNav, false);
		sidenavMenu.addEventListener('transitionend', _sidenav2.default.onTransitionEnd, false);
		//sidenavMenu.addEventListener('click', sidenav.toggleSideNav, false);
	}

	if (canvas) {
		canvas.addEventListener('mousemove', _canvas2.default.MouseMove, false);
		canvas.addEventListener('mouseout', _canvas2.default.MouseOut, false);
	}

	if (opinionDialogTrigger) {
		var opinionDialog = new _dialog2.default();

		opinionDialogTrigger.addEventListener('click', opinionDialog.open);
	}

	addEventListener('DOMContentLoaded', _scrollIn2.default.init, false);
	addEventListener('scroll', _scrollIn2.default.viewportChange, false);
	addEventListener('resize', _scrollIn2.default.viewportChange, false);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getScrollbar = __webpack_require__(4);

	var _getScrollbar2 = _interopRequireDefault(_getScrollbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function toggleSideNav() {
		var navContainer = document.getElementById('sidenav-container');
		var nav = document.getElementById('sidenav');
		var backdrop = document.getElementById('backdrop');

		nav.style.willChange = "transform";
		backdrop.style.willChange = "opacity";
		navContainer.classList.add("sidenav-container--animatable");

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			backdrop.classList.add('backdrop--visible');

			backdrop.addEventListener('click', function () {
				navContainer.classList.remove("sidenav-container--visible");
			}, false);
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
])
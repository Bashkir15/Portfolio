webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(4);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _scrollIn = __webpack_require__(3);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _dialog = __webpack_require__(2);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _scrollNav = __webpack_require__(5);

	var _scrollNav2 = _interopRequireDefault(_scrollNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');
	var sidenavMenu = document.getElementById('sidenav-container');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		var leftNav = new _sidenav2.default();

		sidenavTrigger.addEventListener('click', leftNav.open, false);
		//sidenavMenu.addEventListener('transitionend', sidenav.onTransitionEnd, false);
	}

	if (canvas) {
		canvas.addEventListener('mousemove', _canvas2.default.MouseMove, false);
		canvas.addEventListener('mouseout', _canvas2.default.MouseOut, false);
	}

	if (opinionDialogTrigger) {
		var opinionDialogContent = document.getElementById('opinionated-dialog');
		var opinionDialog = new _dialog2.default({
			content: opinionDialogContent
		});

		opinionDialogTrigger.addEventListener('click', opinionDialog.open);
	}

	addEventListener('DOMContentLoaded', _scrollIn2.default.init, false);
	addEventListener('scroll', _scrollIn2.default.viewportChange, false);
	addEventListener('resize', _scrollIn2.default.viewportChange, false);
	window.onload = _scrollNav2.default.init();

/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function init() {
		window.addEventListener('scroll', function (e) {
			var distanceY = window.pageYOffset || document.documentElement.scrollTop;
			var nav = document.querySelector('nav');

			if (distanceY > 10) {
				nav.classList.add('nav--scrolled');
			} else {
				if (nav.classList.contains('nav--scrolled')) {
					nav.classList.remove('nav--scrolled');
				}
			}
		});
	}

	exports.default = {
		init: init
	};

/***/ }

})
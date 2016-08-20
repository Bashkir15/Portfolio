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
	var sidenavMenu = document.getElementById('sidenav');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		sidenavTrigger.addEventListener('click', _sidenav2.default.toggleSidenav, false);
		sidenavMenu.addEventListener('transitionend', _sidenav2.default.onTransitionEnd, false);
		sidenavMenu.addEventListener('click', _sidenav2.default.toggleSidenav, false);
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

/***/ }
])
webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(14);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');

	if (sidenavTrigger) {
		var sidenavClose = document.getElementById('close-sidenav');
		sidenavTrigger.addEventListener('click', _sidenav2.default.openNav);
		sidenavClose.addEventListener('click', _sidenav2.default.closeNav);
	}

/***/ }
])
webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(14);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mySidenav = new _sidenav2.default();

	var openSidenavButton = document.getElementById('open-sidenav');

	if (openSidenavButton) {
		openSidenavButton.addEventListener('click', mySidenav.open);
	}

/***/ }
])
webpackHotUpdate(0,[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(5);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _App = __webpack_require__(11);

	var _App2 = _interopRequireDefault(_App);

	var _home = __webpack_require__(12);

	var _home2 = _interopRequireDefault(_home);

	var _sidenav = __webpack_require__(13);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_vue2.default.use(_vueRouter2.default);

	var router = new _vueRouter2.default();

	router.map({
		'/': {
			component: _home2.default
		}
	});

	router.beforeEach(function () {
		window.scrollTo(0, 0);
	});

	router.redirect({
		'*': '/'
	});

	router.start(_App2.default, '#app');

/***/ }
])
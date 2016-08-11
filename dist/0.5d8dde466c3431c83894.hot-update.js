webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _vue = __webpack_require__(1);

	var _vue2 = _interopRequireDefault(_vue);

	var _vueRouter = __webpack_require__(3);

	var _vueRouter2 = _interopRequireDefault(_vueRouter);

	var _App = __webpack_require__(6);

	var _App2 = _interopRequireDefault(_App);

	var _home = __webpack_require__(8);

	var _home2 = _interopRequireDefault(_home);

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

	router.start(_App2.default, '£app');

/***/ },

/***/ 7:
/***/ function(module, exports) {

	module.exports = "\n<div>\n\t<p>Home</p>\n</div>\n";

/***/ },

/***/ 8:
/***/ function(module, exports, __webpack_require__) {

	var __vue_script__, __vue_template__
	__vue_template__ = __webpack_require__(7)
	module.exports = __vue_script__ || {}
	if (module.exports.__esModule) module.exports = module.exports.default
	if (__vue_template__) {
	(typeof module.exports === "function" ? (module.exports.options || (module.exports.options = {})) : module.exports).template = __vue_template__
	}
	if (true) {(function () {  module.hot.accept()
	  var hotAPI = __webpack_require__(2)
	  hotAPI.install(__webpack_require__(1), false)
	  if (!hotAPI.compatible) return
	  var id = "_v-4bf53a0a/home.vue"
	  if (!module.hot.data) {
	    hotAPI.createRecord(id, module.exports)
	  } else {
	    hotAPI.update(id, module.exports, __vue_template__)
	  }
	})()}

/***/ }

})
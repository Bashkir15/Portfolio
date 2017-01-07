/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _mobile = __webpack_require__(3);

	var _mobile2 = _interopRequireDefault(_mobile);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var navTrigger = document.getElementById('nav-trigger');

	var mobileNav = new _mobile2.default();

	function activeUrl() {
		var navLinks = document.querySelectorAll('.nav-link');

		Array.prototype.forEach.call(navLinks, function (link) {
			if (link.getAttribute("href") == window.location.pathname || window.location.pathername == '') {
				link.classList.add('active');
			}
		});
	}

	activeUrl();

	navTrigger.addEventListener('click', mobileNav.toggle);

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var mobileMenu = function () {
		function mobileMenu() {
			_classCallCheck(this, mobileMenu);

			this.container = document.getElementById('mobile-menu-container');
			this.menu = document.getElementById("mobile-menu");
			this.toggle = this._toggle.bind(this);
			this.animatedClass = 'mobile-menu-container--animatable';
			this.openClass = 'mobile-menu-container--open';
			this.closeKeys = [27];
		}

		_createClass(mobileMenu, [{
			key: '_toggle',
			value: function _toggle() {
				this.menu.style.willChange = 'transform';
				this.container.classList.add(this.animatedClass);

				if (this.container.classList.contains(this.animatedClass) && !this.container.classList.contains(this.openClass)) {
					document.body.style.overflowY = 'hidden';
					this._addEvents();
					this.container.classList.add(this.openClass);
					this._updateNav();
				} else {
					document.body.style.overflowY = 'auto';
					this._addEvents();
					this.container.classList.remove(this.openClass);
					this._updateNav();
				}

				this.menu.style.willChange = 'auto';
			}
		}, {
			key: '_onTransitionEnd',
			value: function _onTransitionEnd() {
				this.container.classList.remove('mobile-menu-container--animatable');
			}
		}, {
			key: '_closeKeyHandler',
			value: function _closeKeyHandler(e) {
				if (this.closeKeys.indexOf(e.which) > -1) {
					e.preventDefault();
					this.toggle();
				}
			}
		}, {
			key: '_updateNav',
			value: function _updateNav() {
				var nav = document.getElementById('nav');

				if (this.container.classList.contains(this.openClass)) {
					nav.classList.add('nav-mobile--open');
				} else {
					nav.classList.remove('nav-mobile--open');
				}
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var _onTransitionEnd = this._onTransitionEnd.bind(this);

				this.container.addEventListener('transitionend', _onTransitionEnd);
			}
		}]);

		return mobileMenu;
	}();

	exports.default = mobileMenu;

/***/ }
/******/ ]);
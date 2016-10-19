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

	var _nav = __webpack_require__(1);

	var _nav2 = _interopRequireDefault(_nav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function activeUrl() {
		var navLinks = document.querySelectorAll('.nav-link');

		Array.prototype.forEach.call(navLinks, function (link) {
			if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
				link.classList.add('active');
			}
		});
	}

	activeUrl();

	(0, _nav2.default)();

	window.onload = function () {
		setTimeout(function () {
			document.body.classList.add('loaded');
		}, 1000);
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function navshrink() {
		var lastKnownScrollY = 0;
		var nav = document.querySelector('.nav');

		init();

		function getScrollY() {
			return window.pageYOffset || window.scrollTop;
		}

		function init() {
			window.addEventListener('scroll', checkPin);
		}

		function checkPin() {
			var currentScrollY = getScrollY();

			if (currentScrollY < lastKnownScrollY) {
				pin();
			}

			if (currentScrollY > lastKnownScrollY) {
				unpin();
			}

			lastKnownScrollY = getScrollY();
		}

		function pin() {
			nav.style.willChange = 'transform';

			if (nav.classList.contains('nav-unpinned')) {
				nav.classList.remove('nav-unpinned');
				nav.classList.add('nav-pinned');
			} else {
				nav.classList.add('nav-pinned');
			}

			nav.style.willChange = 'auto';
		}

		function unpin() {

			nav.style.willChange = 'transform';

			if (nav.classList.contains('nav-pinned')) {
				nav.classList.remove('nav-pinned');
				nav.classList.add('nav-unpinned');
			} else {
				nav.classList.add('nav-unpinned');
			}

			nav.style.willChange = 'auto';
		}
	}

	exports.default = navshrink;

/***/ }
/******/ ]);
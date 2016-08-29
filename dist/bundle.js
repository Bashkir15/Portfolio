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

	var _sidenav = __webpack_require__(3);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _scrollNav = __webpack_require__(7);

	var _scrollNav2 = _interopRequireDefault(_scrollNav);

	var _routes = __webpack_require__(11);

	var _routes2 = _interopRequireDefault(_routes);

	var _home = __webpack_require__(5);

	var _home2 = _interopRequireDefault(_home);

	var _about = __webpack_require__(10);

	var _about2 = _interopRequireDefault(_about);

	var _skills = __webpack_require__(8);

	var _skills2 = _interopRequireDefault(_skills);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init() {
		var sidenavTrigger = document.getElementById('open-sidenav');
		var sidenavMenu = document.getElementById('sidenav-container');

		if (sidenavTrigger) {
			var leftNav = new _sidenav2.default();

			sidenavTrigger.addEventListener('click', leftNav.open, false);
		}

		if (window.location.href.indexOf('skills') != -1) {
			_skills2.default.init();
		} else if (window.location.href.indexOf('about') != -1) {
			_about2.default.init();
		} else {
			_home2.default.init();
		}

		_scrollNav2.default.init();
		_routes2.default.init();
	}

	window.onload = function () {
		setTimeout(function () {
			document.body.classList.add('loaded');
		}, 1000);
	};

	init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var notify = function () {
		function notify(options) {
			_classCallCheck(this, notify);

			this.settings = {
				container: null,
				notification: null,
				timeout: 0,
				type: 'alert',
				content: "",
				posX: 'right',
				posY: 'bottom'
			};

			this.count = 0;
			this._applySettings(options);
			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(notify, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.settings[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_buildOut',
			value: function _buildOut() {
				var _container = document.createElement('div');
				var _contentHolder = document.createElement('div');
				var _content;

				_container.className = "notify-container";
				_contentHolder.className = "notify";
				this.settings.container = _container;
				this.settings.container.style.position = "fixed";
				if (this.settings.content === 'string') {
					_content = this.settings.content;
				} else {
					_content = this.settings.content.innerHTML;
				}

				_contentHolder.innerHTML = _content;

				if (this.settings.posX === 'right') {
					this.settings.container.style.right = 20 + "px";
				}

				if (this.settings.posX === 'left') {
					this.settings.continer.style.left = 20 + "px";
				}

				if (this.settings.posY === 'top') {
					this.settings.container.style.top = 20 + "px";
				}

				if (this.settings.posY === 'bottom') {
					this.settings.container.style.bottom = 20 + "px";
				}

				this.settings.container.appendChild(_contentHolder);
				document.body.appendChild(this.settings.container);
			}
		}, {
			key: '_open',
			value: function _open() {
				var _this = this;

				var notifyId = 'notify-' + this.count;
				this._buildOut.call(this);

				setTimeout(function () {
					_this.settings.container.classList.add('shown');
					_this.settings.container.setAttribute('id', notifyId);
				}, 100);

				if (this.settings.timeout > 0) {
					setTimeout(function () {
						_this.close(notifyId);
					}, this.settings.timeout);
				}

				this.count += 1;

				return notifyId;
			}
		}, {
			key: '_close',
			value: function _close(notificationId) {
				var notification = document.getElementById(notificationId);

				if (notification) {
					notification.classList.remove('shown');

					setTimeout(function () {
						notification.parentNode.removeChild(notification);
					}, 600);

					return true;
				} else {
					return false;
				}
			}
		}]);

		return notify;
	}();

	exports.default = notify;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var dialog = function () {
		function dialog(options) {
			_classCallCheck(this, dialog);

			this.modal = null;
			this.overlay = null;
			this.container = null;

			this.defaults = {
				className: 'fade-and-fall',
				content: "",
				overlay: true,
				closeKeys: [27]
			};

			this._applySettings(options);
			this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(dialog, [{
			key: '_applySettings',
			value: function _applySettings(options) {
				if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
					for (var i in options) {
						if (options.hasOwnProperty(i)) {
							this.defaults[i] = options[i];
						}
					}
				}
			}
		}, {
			key: '_open',
			value: function _open() {
				this._buildOut.call(this);

				window.getComputedStyle(this.modal).height;
				this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " modal-open modal-anchored" : " modal-open");
				this.overlay.className = this.overlay.className + " modal-open";
				this._attachEvents();
			}
		}, {
			key: '_close',
			value: function _close() {
				var self = this;

				this.modal.className = this.modal.className.replace(" modal-open", "");
				this.overlay.className = this.overlay.className.replace(" modal-open", "");

				this.modal.addEventListener('transitionend', function () {
					self.modal.parentNode.removeChild(self.modal);
				}, false);

				this.overlay.addEventListener('transitionend', function () {
					self.overlay.parentNode.removeChild(self.overlay);
				}, false);
			}
		}, {
			key: '_buildOut',
			value: function _buildOut() {
				var content;
				var contentHolder;
				this.container = document.createDocumentFragment();
				var overlayFrag;

				if (typeof this.defaults.content === 'string') {
					content = this.defaults.content;
				} else {
					content = this.defaults.content.innerHTML;
				}

				this.modal = document.createElement('div');
				this.modal.className = "modal " + this.defaults.className;
				this.modal.style.top = window.pageYOffset + window.innerHeight / 2 + "px";
				this.modal.style.left = (window.innerWidth - this.modal.offsetWidth) / 2 + "px";

				this.overlay = document.createElement('div');
				this.overlay.className = 'modal-overlay ' + this.defaults.className;

				contentHolder = document.createElement('div');
				contentHolder.className = "modal-content";
				contentHolder.innerHTML = content;
				this.modal.appendChild(contentHolder);

				this.container.appendChild(this.modal);
				this.container.appendChild(this.overlay);

				document.body.appendChild(this.container);
			}
		}, {
			key: '_closeKeyHandler',
			value: function _closeKeyHandler(e) {
				if (this.defaults.closeKeys.indexOf(e.which) > -1) {
					e.preventDefault();
					this.close();
				}
			}
		}, {
			key: '_attachEvents',
			value: function _attachEvents() {
				var _closeKeyHandler = this._closeKeyHandler.bind(this);

				this.overlay.addEventListener('click', this.close, false);
				document.body.addEventListener('keydown', _closeKeyHandler, false);
			}
		}]);

		return dialog;
	}();

	exports.default = dialog;

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var sideNav = function () {
		function sideNav() {
			_classCallCheck(this, sideNav);

			this.container = document.getElementById('sidenav-container');
			this.nav = document.getElementById('sidenav');
			this.clickOutside = true, this.closeKeys = [27], this.overlay = null, this.open = this._open.bind(this);
			this.close = this._close.bind(this);
		}

		_createClass(sideNav, [{
			key: '_open',
			value: function _open() {

				this.nav.style.willChange = "transform";
				this.container.classList.add('sidenav-container--animatable');

				if (!this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.add('sidenav-container--visible');
					this._buildOverlay.call(this);
					this.overlay.classList.add('overlay--visible');

					this._addEvents();
				}

				this.overlay.style.willChange = "auto";
				this.nav.style.willChange = "auto";
			}
		}, {
			key: '_close',
			value: function _close(event) {
				this.nav.style.willChange = "transform";
				this.container.classList.add('sidenav-container--animatable');
				this.overlay.style.willChange = "opacity";

				if (this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.remove("sidenav-container--visible");
					document.body.removeChild(this.overlay);
				}

				this.nav.style.willChange = "auto";
			}
		}, {
			key: '_onTransitionEnd',
			value: function _onTransitionEnd() {
				this.container.classList.remove('sidenav-container--animatable');
			}
		}, {
			key: '_buildOverlay',
			value: function _buildOverlay() {
				var docFrag = document.createDocumentFragment();
				this.overlay = document.createElement('div');
				this.overlay.className = "sidenav-overlay";
				this.overlay.style.willChange = "opacity";
				docFrag.appendChild(this.overlay);
				document.body.appendChild(docFrag);
			}
		}, {
			key: '_closeKeyHandler',
			value: function _closeKeyHandler(e) {
				if (this.closeKeys.indexOf(e.which) > -1) {
					e.preventDefault();
					this.close();
				}
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var _closeKeyHandler = this._closeKeyHandler.bind(this);
				var _onTransitionEnd = this._onTransitionEnd.bind(this);

				this.container.addEventListener('transitionend', _onTransitionEnd, false);
				this.container.addEventListener('click', this.close, false);
				document.body.addEventListener('keydown', _closeKeyHandler, false);
			}
		}]);

		return sideNav;
	}();

	exports.default = sideNav;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _notify = __webpack_require__(1);

	var _notify2 = _interopRequireDefault(_notify);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function message() {
		var data = {};
		data.name = document.getElementById('contact-name');
		data.email = document.getElementById('contact-email');
		data.subject = document.getElementById('contact-subject');
		data.message = document.getElementById('contact-message');

		var promise = new Promise(function (resolve, reject) {
			var req = new XMLHttpRequest();

			req.open('POST', '/contact', true);
			req.onload = function () {
				if (req.status == 200) {
					resolve(req.response);
				} else {
					reject(Error(req.statusText));
				}
			};

			req.onError = function () {
				reject(Error("Error"));
			};

			req.send();
		});

		promise.then(function (response) {
			var success = new Event('message-delivered');
			window.dispatchEvent(success);
		}, function (error) {
			console.log('Failed');
		});
	}

	exports.default = {
		message: message
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _contact = __webpack_require__(4);

	var _contact2 = _interopRequireDefault(_contact);

	var _dialog = __webpack_require__(2);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _notify = __webpack_require__(1);

	var _notify2 = _interopRequireDefault(_notify);

	var _scrollIn = __webpack_require__(6);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _scrollTo = __webpack_require__(9);

	var _scrollTo2 = _interopRequireDefault(_scrollTo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init() {

		// Home Header

		var contactScroll = document.getElementById('scrollToContact');

		contactScroll.addEventListener('click', function () {
			_scrollTo2.default.smoothScroll(document.getElementById('home-contact').offsetTop);
		});

		// Home Dialogs


		var opinionDialogTrigger = document.getElementById('open-opinionated');
		var opinionDialogContent = document.getElementById('opinionated-dialog');
		var opinionClose = document.getElementById('close-opinionated');

		var opinionDialog = new _dialog2.default({
			content: opinionDialogContent
		});

		opinionDialogTrigger.addEventListener('click', opinionDialog.open, false);
		opinionClose.addEventListener('click', opinionDialog.close, false);

		// Home Skills Scroll In
		var scrollEntrance = new _scrollIn2.default();

		window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
		window.addEventListener('scroll', scrollEntrance.viewPortChange);
		window.addEventListener('resize', scrollEntrance.viewPortChange);

		// Home Contact
		var contactSubmit = document.getElementById('contact-send');

		contactSubmit.addEventListener('click', _contact2.default.message);
		var successContent = document.getElementById('contact-success');
		var successNotify = new _notify2.default({
			content: successContent,
			timeout: 1000
		});

		window.addEventListener('message-delivered', successNotify.open);
	}

	exports.default = {
		init: init
	};

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var scrollIn = function () {
		function scrollIn() {
			_classCallCheck(this, scrollIn);

			this.elements = null;

			this.defaults = {
				duration: "1000",
				distance: "200",
				heightOffset: 200
			};

			this.enter = this._enter.bind(this);
			this.init = this._init.bind(this);
			this.viewPortChange = this._viewPortChange.bind(this);
		}

		_createClass(scrollIn, [{
			key: "_isInView",
			value: function _isInView(elem) {
				var rect = elem.getBoundingClientRect();

				return rect.top + this.defaults.heightOffset >= 0 && rect.top + this.defaults.heightOffset <= window.innerHeight || rect.bottom + this.defaults.heightOffset >= 0 && rect.bottom + this.defaults.heightOffset <= window.innerHeight || rect.top + this.defaults.heightOffset < 0 && rect.bottom + this.defaults.heightOffset > window.innerHeight;
			}
		}, {
			key: "_setInitialStyles",
			value: function _setInitialStyles(elem) {
				document.body.style.overflowX = "hidden";

				var anim = elem.getAttribute("data-entrance");
				var delay = elem.getAttribute("data-entrnace-delay");

				elem.style.transition = "all " + this.defaults.duration / 1000 + "s ease";

				if (delay) {
					elem.style.transitionDelay = delay / 1000 + 's';
				}

				if (anim == "fade") {
					elem.style.opacity = "0";
				}
			}
		}, {
			key: "_enter",
			value: function _enter(elem) {
				elem.style.visibility = "visible";
				elem.style.opacity = "1";
				elem.style.transform = "translate(0, 0)";
				elem.classList.add('has-entered');
			}
		}, {
			key: "_viewPortChange",
			value: function _viewPortChange() {
				var _this = this;

				Array.prototype.map.call(this.elements, function (item) {
					var isInView = _this._isInView(item);
					if (isInView) {
						var hasEntered = item.classList.contains("has-entered");

						if (!hasEntered) {
							_this._enter(item);
						}
					}
				});
			}
		}, {
			key: "_init",
			value: function _init() {
				var _this2 = this;

				this.elements = document.querySelectorAll('[data-entrance]');

				Array.prototype.map.call(this.elements, function (item) {
					_this2._setInitialStyles(item);

					if (_this2._isInView(item)) {
						window.addEventListener('load', function () {
							_this2.enter(item);
						}, false);
					}
				});
			}
		}]);

		return scrollIn;
	}();

	exports.default = scrollIn;

/***/ },
/* 7 */
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

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _scrollTo = __webpack_require__(9);

	var _scrollTo2 = _interopRequireDefault(_scrollTo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init() {
		var frontTrigger = document.getElementById('frontend-trigger');
		var backTrigger = document.getElementById('backend-trigger');
		var efficientTrigger = document.getElementById('efficiency-trigger');

		if (frontTrigger) {
			frontTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('skills-front-end').offsetTop);
			}, false);
		}

		if (backTrigger) {
			backTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('skills-back-end').offsetTop);
			}, false);
		}

		if (efficientTrigger) {
			efficientTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('skills-efficiency').offsetTop);
			}, false);
		}

		function scrollWatch() {
			var distanceY = window.pageYOffset || document.documentElement.scrollTop;
			var navigation = document.getElementById('skills-page-nav');

			if (distanceY > 110) {
				navigation.classList.add('navigation-scrolled');
			} else {
				navigation.classList.remove('navigation-scrolled');
			}
		}

		window.addEventListener('scroll', scrollWatch);

		//backEndTrigger.addEventListener('click', scrollTo.smoothScroll(document.getElementById('skills-back-end').offsetTop));
	}

	exports.default = {
		init: init
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	var smoothScroll = function () {
		var timer;
		var start;
		var factor;

		return function (target, duration) {
			var offset = window.pageYOffset;
			var delta = target - window.pageYOffset;
			var duration = duration || 1000;
			start = Date.now();
			factor = 0;

			if (timer) {
				clearInterval(timer);
			}

			function step() {
				var y;
				factor = (Date.now() - start) / duration;

				if (factor >= 1) {
					clearInterval(timer);
					factor = 1;
				}

				y = factor * delta + offset;
				window.scrollBy(0, y - window.pageYOffset);
			}

			timer = setInterval(step, 10);
			return timer;
		};
	}();

	exports.default = {
		smoothScroll: smoothScroll
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _scrollTo = __webpack_require__(9);

	var _scrollTo2 = _interopRequireDefault(_scrollTo);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function init() {
		var earlyTrigger = document.getElementById('early-trigger');
		var collegeTrigger = document.getElementById('college-trigger');
		var nowTrigger = document.getElementById('now-trigger');
		var futureTrigger = document.getElementById('future-trigger');

		if (earlyTrigger) {
			earlyTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('about-early').offsetTop);
			}, false);
		}

		if (collegeTrigger) {
			collegeTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('about-college').offsetTop);
			}, false);
		}

		if (nowTrigger) {
			nowTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('about-now').offsetTop);
			}, false);
		}

		if (futureTrigger) {
			futureTrigger.addEventListener('click', function () {
				_scrollTo2.default.smoothScroll(document.getElementById('about-future').offsetTop);
			}, false);
		}

		function scrollWatch() {
			var distanceY = window.pageYOffset || document.documentElement.scrollTop;
			var navigation = document.getElementById('about-page-navigation');

			if (distanceY > 110) {
				navigation.classList.add('navigation-scrolled');
			} else {
				navigation.classList.remove('navigation-scrolled');
			}
		}

		window.addEventListener('scroll', scrollWatch);
	}

	exports.default = {
		init: init
	};

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function init() {
		function goToSkills() {
			document.body.classList.add('route-changing');

			setTimeout(function () {
				window.location.href = '/skills';
				document.body.classList.remove('route-changing');
			}, 500);
		}

		function goToAbout() {
			document.body.classList.add('route-changing');

			setTimeout(function () {
				window.location.href = '/about';
				document.body.classList.remove('route-changing');
			}, 500);
		}

		function goToWork() {
			document.body.classList.add('route-changing');

			setTimeout(function () {
				window.location.href = '/works';
				document.body.classList.remove('route-changing');
			}, 500);
		}

		var skillLinks = document.getElementsByClassName('go-to-skills');
		var aboutLinks = document.getElementsByClassName('go-to-about');
		var workLinks = document.getElementsByClassName('go-to-works');

		if (skillLinks) {
			for (var i = 0; i < skillLinks.length; i++) {
				skillLinks[i].addEventListener('click', goToSkills);
			}
		}

		if (aboutLinks) {
			for (var i = 0; i < aboutLinks.length; i++) {
				aboutLinks[i].addEventListener('click', goToAbout);
			}
		}

		if (workLinks) {
			for (var i = 0; i < workLinks.length; i++) {
				workLinks[i].addEventListener('click', goToWork);
			}
		}
	}

	exports.default = {
		init: init
	};

/***/ }
/******/ ]);
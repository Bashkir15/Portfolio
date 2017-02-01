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

	var _scroll = __webpack_require__(2);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _mobile = __webpack_require__(3);

	var _mobile2 = _interopRequireDefault(_mobile);

	var _landing = __webpack_require__(4);

	var _landing2 = _interopRequireDefault(_landing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mobileTrigger = document.getElementById('nav-trigger');
	var preLoader = document.querySelector('.preloader');
	var mobileNav = new _mobile2.default();
	var scrollEntrance = new _scroll2.default();

	var scrollTimeout = false;

	function activeUrl() {
		var navLinks = document.querySelectorAll('.nav-link');

		Array.prototype.forEach.call(navLinks, function (link) {
			if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
				link.classList.add('active');
			}
		});
	}

	function scrollThrottle() {
		if (!scrollTimeout) {
			window.requestAnimationFrame(function () {
				scrollEntrance.viewPortChange();
				scrollTimeout = true;
			});
		}

		scrollTimeout = false;
	}

	HTMLDocument.prototype.ready = function () {
		return new Promise(function (resolve, reject) {
			var startTime = console.time('start');
			var endTime;
			if (document.readyState === 'complete') {
				endTime = console.timeEnd('start');
				resolve(document, startTime, endTime);
			} else {
				document.addEventListener('DOMContentLoaded', function () {
					endTime = console.timeEnd('start');
					resolve(document, startTime, endTime);
				});
			}
		});
	};

	document.ready().then(function (startTime, endTime) {
		if (endTime - startTime > 300) {
			document.body.classList.add('loaded');
			preLoader.classList.add('finished');
		} else {
			setTimeout(function () {
				document.body.classList.add('loaded');
				preLoader.classList.add('finished');
			}, 1000);
		}
	});

	activeUrl();
	(0, _nav2.default)();
	(0, _landing2.default)();

	mobileTrigger.addEventListener('click', mobileNav.toggle);
	window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
	window.addEventListener('scroll', scrollThrottle);
	window.addEventListener('resize', scrollThrottle);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	function navshrink() {
		var nav = document.querySelector('.nav');
		var landingHeader = document.querySelector('.landing-header');
		var lastKnownScrollY = 0;
		var scrollTimeout = false;

		init();

		function getScrollY() {
			return window.pageYOffset || window.scrollTop;
		}

		function init() {
			window.addEventListener('scroll', scrollThrottle);
		}

		function scrollThrottle() {
			if (!scrollTimeout) {
				scrollTimeout = setTimeout(function () {
					scrollTimeout = false;
					checkPin();
				}, 250);
			}

			scrollTimeout = true;
		}

		function checkPin() {
			var currentScrollY = getScrollY();

			if (window.location.pathname == '/') {
				if (currentScrollY >= landingHeader.scrollHeight) {

					if (currentScrollY < lastKnownScrollY) {
						pin();
					}

					if (currentScrollY > lastKnownScrollY) {
						unpin();
					}
				}
			} else {

				if (currentScrollY < lastKnownScrollY) {
					pin();
				}

				if (currentScrollY > lastKnownScrollY) {
					unpin();
				}
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

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var ScrollIn = function () {
		function ScrollIn() {
			_classCallCheck(this, ScrollIn);

			this.elements = null;

			this.defaults = {
				duration: '1000',
				distance: '200',
				heightOffset: 200
			};

			this.enter = this._enter.bind(this);
			this.init = this._init.bind(this);
			this.viewPortChange = this._viewPortChange.bind(this);
		}

		_createClass(ScrollIn, [{
			key: '_isInView',
			value: function _isInView(elem) {
				var rect = elem.getBoundingClientRect();

				return rect.top + this.defaults.heightOffset >= 0 && rect.top + this.defaults.heightOffset <= window.innerHeight || rect.bottom + this.defaults.heightOffset >= 0 && rect.bottom + this.defaults.heightOffset <= window.innerHeight || rect.top + this.defaults.heightOffset < 0 && rect.bottom + this.defaults.heightOffset > window.innerHeight;
			}
		}, {
			key: '_setInitialStyles',
			value: function _setInitialStyles(elem) {
				var anim = elem.getAttribute('data-entrance');
				var delay = elem.getAttribute('data-entrance-delay');

				elem.style.transition = "all " + this.defaults.duration / 1000 + "s ease-out";

				if (delay) {
					elem.style.transitionDelay = delay / 1000 + 's';
				}

				if (anim == 'fade') {
					elem.style.opacity = '0';
				}
			}
		}, {
			key: '_enter',
			value: function _enter(elem) {
				elem.style.visibility = "visible";
				elem.style.opacity = "1";
				elem.style.transform = "translate(0,0)";
				elem.classList.add('has-entered');
			}
		}, {
			key: '_viewPortChange',
			value: function _viewPortChange() {
				var _this = this;

				Array.prototype.map.call(this.elements, function (item) {
					var isInView = _this._isInView(item);

					if (isInView) {
						var hasEntered = item.classList.contains('has-entered');

						if (!hasEntered) {
							_this._enter(item);
						}
					}
				});
			}
		}, {
			key: '_init',
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

		return ScrollIn;
	}();

	exports.default = ScrollIn;

/***/ },
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

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _notifications = __webpack_require__(5);

	var _notifications2 = _interopRequireDefault(_notifications);

	var _scroll = __webpack_require__(6);

	var _scroll2 = _interopRequireDefault(_scroll);

	var _header = __webpack_require__(7);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function landing() {
		var contactScroller = document.getElementById('contact-scroller');
		var contactContainer = document.getElementById('contact-container');
		var formWrappers = document.querySelectorAll('.form-wrapper');
		var formInputs = document.querySelectorAll('.contact-input');
		var emailInput = document.getElementById('contact-email');
		var nameInput = document.getElementById('contact-name');
		var subjectInput = document.getElementById('contact-subject');
		var messageInput = document.getElementById('contact-message');
		var submitButton = document.getElementById('contact-send');
		var successContent = document.getElementById('contact-success');
		var failureContent = document.getElementById('contact-failure');
		var errorContent = document.getElementById('contact-error');

		var successNotify = new _notifications2.default({
			content: successContent,
			timeout: 2000,
			type: 'success'
		});

		var failureNotify = new _notifications2.default({
			content: failureContent,
			timeout: 2000,
			type: 'danger'
		});

		var errorNotify = new _notifications2.default({
			content: errorContent,
			timeout: 2000,
			type: 'warning'
		});

		function addEvents() {
			Array.prototype.forEach.call(formInputs, function (input) {
				input.addEventListener('focus', inputFocus);
				input.addEventListener('blur', inputBlur);
			});
		}

		function inputFocus() {
			if (!this.parentNode.classList.contains('focused')) {
				this.parentNode.classList.add('focused');
			} else {
				return;
			}
		}

		function inputBlur() {
			var formContent = this.value;

			if (this.parentNode.classList.contains('focused')) {
				this.parentNode.classList.remove('focused');
			}

			if (formContent == '') {
				this.parentNode.classList.add('blank');
			}

			if (this.parentNode.classList.contains('contact-email')) {
				validateEmail();
			}

			if (formContent != '' && !this.parentNode.classList.contains('contact-email')) {
				if (this.parentNode.classList.contains('blank')) {
					this.parentNode.classList.remove('blank');
				}

				this.parentNode.classList.add('valid');
			}

			checkValidForm();
		}

		function validateEmail() {
			var input = emailInput;
			var formValue = input.value;
			var atpos = formValue.indexOf('@');
			var dotpos = formValue.lastIndexOf('.');

			if (atpos < 1 || dotpos - atpos < 2) {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				if (formValue == '') {
					input.parentNode.classList.add('blank');
				}

				input.parentNode.classList.add('invalid');
			} else {
				if (input.parentNode.classList.contains('blank')) {
					input.parentNode.classList.remove('blank');
				}

				if (input.parentNode.classList.contains('invalid')) {
					input.parentNode.classList.remove('invalid');
				}

				input.parentNode.classList.add('valid');
			}
		}

		function checkValidForm() {
			var validForm = 0;

			Array.prototype.forEach.call(formWrappers, function (wrapper) {
				if (wrapper.classList.contains('valid')) {
					validForm++;
				}
			});

			if (validForm == 4) {
				submitButton.classList.add('form-valid');
			}
		}

		function clearInputs() {
			Array.prototype.forEach.call(formInputs, function (input) {
				input.value = '';
			});
		}

		function sendMessage() {
			if (submitButton.classList.contains('form-valid')) {
				(function () {
					submitButton.classList.add('contact-loading');

					var nameData = nameInput.value;
					var emailData = emailInput.value;
					var subjectData = subjectInput.value;
					var messageData = messageInput.value;

					var data = JSON.stringify({
						"name": nameData,
						"email": emailData,
						"subject": subjectData,
						"message": messageData
					});

					var promise = new Promise(function (resolve, reject) {
						var req = new XMLHttpRequest();

						req.open('POST', '/contact', true);
						req.setRequestHeader('content-type', 'application/json');

						req.onload = function () {
							if (req.status == 200) {
								resolve(req.response);
							} else {
								reject(Error(req.statusText));
							}
						};

						req.onError = function () {
							reject(Error('error'));
						};

						req.send(data);
					});

					promise.then(function (response) {
						setTimeout(function () {
							submitButton.classList.remove('contact-loading');
							var success = new Event('message-sent');
							window.dispatchEvent(success);

							//	clearInputs();
						}, 500);
					}, function (error) {
						setTimeout(function () {
							submitButton.classList.remove('contact-loading');
							var failure = new Event('message-failed');
							window.dispatchEvent(failure);
						});
					});
				})();
			} else {
				var error = new Event('message-error');
				window.dispatchEvent(error);
			}
		}

		addEvents();
		(0, _header.header)();

		contactScroller.addEventListener('click', function () {
			_scroll2.default.smoothScroll(contactContainer.offsetTop);
		});
		submitButton.addEventListener('click', sendMessage, false);
		window.addEventListener('message-sent', successNotify.open, false);
		window.addEventListener('message-failed', failureNotify.open, false);
		window.addEventListener('message-error', errorNotify.open, false);
	}

	exports.default = landing;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var notifications = function () {
		function notifications(options) {
			_classCallCheck(this, notifications);

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

		_createClass(notifications, [{
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

				_container.className = 'notification-container';
				_contentHolder.className = 'notification';

				this.settings.container = _container;
				this.settings.container.style.position = "fixed";

				if (this.settings.content === "string") {
					_content = this.settings.content;
				} else {
					_content = this.settings.content.innerHTML;
				}

				this._checkOptions(_contentHolder);

				_contentHolder.innerHTML = _content;
				this.settings.container.appendChild(_contentHolder);
				document.body.appendChild(this.settings.container);
			}
		}, {
			key: '_checkOptions',
			value: function _checkOptions(item) {
				switch (this.settings.type) {
					case "success":
						item.classList.add('success');
						break;
					case "danger":
						item.classList.add('danger');
						break;
					case "warning":
						item.classList.add('warning');
						break;
					default:
						item.classList.add('alert');
				}

				switch (this.settings.posX) {
					case "right":
						this.settings.container.style.right = 20 + "px";
						break;
					case "left":
						this.settings.container.style.left = 20 + "px";
						break;
					default:
						this.settings.container.style.right = 20 + "px";
				}

				switch (this.settings.posY) {
					case "top":
						this.settings.container.style.top = 20 + "px";
						break;
					case "bottom":
						this.settings.container.style.bottom = 20 + "px";
						break;
					default:
						this.settings.container.style.bottom = 20 + "px";
				}
			}
		}, {
			key: '_open',
			value: function _open() {
				var _this = this;

				var notifyId = "notification-" + this.count;
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

		return notifications;
	}();

	exports.default = notifications;

/***/ },
/* 6 */
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
			var duration = duration || 1800;
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
/* 7 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.header = header;
	function header() {
		var canvas = document.getElementById('landing-header');
		var headerSection = document.querySelector('.landing-header');
		var context = canvas.getContext('2d');
		var stars = [];
		var explosions = [];
		var miniStars = [];
		var backgroundGradient = context.createLinearGradient(0, 0, 0, canvas.height);

		var groundHeight = canvas.height * 0.15;
		var randomSpawnRate = Math.floor(Math.random() * 25 + 60);
		var timer = 0;
		var resizeTimeout = void 0;

		canvas.width = window.innerWidth;
		canvas.height = headerSection.scrollHeight;

		backgroundGradient.addColorStop(0, 'rgba(23, 30, 38, 0.7)');
		backgroundGradient.addColorStop(1, 'rgba(63, 88, 107, 0.7)');

		for (var i = 0; i < 150; i++) {
			miniStars.push(new miniStar());
		}

		function Star() {
			var _this = this;

			this.radius = Math.random() * 10 + 5;
			this.x = this.radius + (canvas.width - this.radius * 2) * Math.random();
			this.y = -10;
			this.dx = (Math.random() - 0.5) * 20;
			this.dy = 30;
			this.gravity = .5;
			this.friction = .54;

			this.update = function () {
				var len = void 0;

				if (_this.y + _this.radius + _this.dy >= canvas.height - groundHeight) {
					_this.dy = -_this.dy * _this.friction;
					_this.dx *= _this.friction;
					_this.radius -= 3;

					explosions.push(new Explosion(_this));
				} else {
					_this.dy += _this.gravity;
				}

				if (_this.x + _this.radius + _this.dx >= canvas.width || _this.x - _this.radius + _this.dx < 0) {
					_this.dx = -_this.dx;
					_this.dx *= _this.friction;
					explosions.push(new Explosion(_this));
				}

				_this.x += _this.dx;
				_this.y += _this.dy;

				_this.draw();

				len = explosions.length;

				for (var _i = 0; _i < len; _i++) {
					explosions[_i].update();
				}
			};

			this.draw = function () {
				context.save();
				context.beginPath();
				context.arc(_this.x, _this.y, Math.abs(_this.radius), 0, Math.PI * 2, false);

				context.shadowColor = '#e3eaef';
				context.shadowBlur = 20;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;

				context.fillStyle = '#e3eaef';
				context.fill();
				context.closePath();
				context.restore();
			};
		}

		function Particle(x, y, dx, dy) {
			var _this2 = this;

			this.x = x;
			this.y = y;
			this.dx = dx;
			this.dy = dy;
			this.gravity = .09;
			this.friction = 0.88;
			this.timeToLive = 3;
			this.opacity = 1;
			this.size = {
				width: 2,
				height: 2
			};

			this.update = function () {
				if (_this2.y + _this2.size.height + _this2.dy >= canvas.height - groundHeight) {
					_this2.dy = -_this2.dy * _this2.friction;
					_this2.dx *= _this2.friction;
				} else {
					_this2.dy += _this2.gravity;
				}

				if (_this2.x + _this2.size.width + _this2.dx >= canvas.width || _this2.x + _this2.dx < 0) {
					_this2.dx = -_this2.dx;
					_this2.dx *= _this2.friction;
				}

				_this2.x += _this2.dx;
				_this2.y += _this2.dy;

				_this2.draw();

				_this2.timeToLive -= 0.01;
				_this2.opacity -= 1 / (_this2.timeToLive / 0.01);
			};

			this.draw = function () {
				context.save();
				context.fillStyle = 'rgba(227, 234, 239, ' + _this2.opacity + ')';
				context.shadowColor = '#e3eaef';
				context.shadowBlur = 20;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;
				context.fillRect(_this2.x, _this2.y, _this2.size.width, _this2.size.height);
				context.restore();
			};

			this.isAlive = function () {
				return 0 <= _this2.timeToLive;
			};
		}

		function Explosion(star) {
			var _this3 = this;

			this.particles = [];

			this.init = function (parentStar) {
				for (var _i2 = 0; _i2 < 8; _i2++) {
					var velocity = {
						x: (Math.random() - 0.5) * 5,
						y: (Math.random() - 0.5) * 15
					};

					_this3.particles.push(new Particle(parentStar.x, parentStar.y, velocity.x, velocity.y));
				}
			};

			this.init(star);

			this.update = function () {
				for (var _i3 = 0; _i3 < _this3.particles.length; _i3++) {
					_this3.particles[_i3].update();

					if (_this3.particles[_i3].isAlive() == false) {
						_this3.particles.splice(_i3, 1);
					}
				}
			};
		}

		function miniStar() {
			var _this4 = this;

			this.x = Math.random() * canvas.width;
			this.y = Math.random() * canvas.height;
			this.radius = Math.random() * 3;

			this.draw = function () {
				context.save();
				context.beginPath();
				context.arc(_this4.x, _this4.y, _this4.radius, 0, Math.PI * 2, false);
				context.shadowColor = '#e3eaef';
				context.shadowBlur = Math.random() * 10 + 10;
				context.shadowOffsetX = 0;
				context.shadowOffsetY = 0;

				context.fillStyle = "white";
				context.fill();

				context.closePath();
				context.restore();
			};
		}

		function createMoutainRange(height, yPos, amount, color) {
			for (var _i4 = 0; _i4 < amount; _i4++) {
				var width = canvas.width / amount;

				// draw the moutainer
				context.beginPath();
				context.moveTo(_i4 * width, yPos);
				context.lineTo(_i4 * width + width + 325, yPos);

				// draw the peak
				context.lineTo(_i4 * width + width / 2, yPos - height / 2);
				context.lineTo(_i4 * width - 325, yPos);
				context.fillStyle = color;
				context.fill();
				context.closePath();
			}
		}

		function handleResize() {
			if (!resizeTimeout) {
				setTimeout(function () {
					canvas.width = window.innerWidth;
					canvas.height = headerSection.scrollHeight;
					resizeTimeout = true;
				}, 150);
			}

			resizeTimeout = false;
		}

		function animate() {
			var sLen = stars.length;
			var eLen = explosions.length;

			window.requestAnimationFrame(animate);
			context.fillStyle = backgroundGradient;
			context.fillRect(0, 0, canvas.width, canvas.height);

			for (var _i5 = 0; _i5 < miniStars.length; _i5++) {
				miniStars[_i5].draw();
			}

			createMoutainRange(canvas.height / .55, canvas.height, 1, '#384551');
			createMoutainRange(canvas.height / .7, canvas.height, 2, '#2b3843');
			createMoutainRange(canvas.height / 1.2, canvas.height, 3, '#26333e');

			context.fillStyle = "#182028";
			context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

			for (var _i6 = 0; _i6 < stars.length; _i6++) {
				stars[_i6].update();

				if (stars[_i6].radius <= 0) {
					stars.splice(_i6, 1);
				}
			}

			for (var _i7 = 0; _i7 < eLen; _i7++) {
				if (explosions[_i7].length <= 0) {
					explosions.splice(_i7, 1);
				}
			}

			timer++;

			if (timer % randomSpawnRate == 0) {
				stars.push(new Star());
				randomSpawnRate = Math.floor(Math.random() * 10 + 75);
			}
		}

		animate();

		window.addEventListener('resize', handleResize, false);
	}

/***/ }
/******/ ]);
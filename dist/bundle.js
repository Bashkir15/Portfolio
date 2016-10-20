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

	var _landing = __webpack_require__(3);

	var _landing2 = _interopRequireDefault(_landing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var scrollEntrance = new _scroll2.default();

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
	(0, _landing2.default)();

	window.onload = function () {
		setTimeout(function () {
			document.body.classList.add('loaded');
		}, 1000);
	};
	window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
	window.addEventListener('scroll', scrollEntrance.viewPortChange);
	window.addEventListener('resize', scrollEntrance.viewPortChange);

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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _notifications = __webpack_require__(4);

	var _notifications2 = _interopRequireDefault(_notifications);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function landing() {
		var formWrappers = document.querySelectorAll('.form-wrapper');
		var formInputs = document.querySelectorAll('.contact-input');
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
			var input = document.getElementById('contact-email');
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
				submitButton.classList.add('contact-loading');

				var nameData = document.getElementById('contact-name').value;
				var emailData = document.getElementById('contact-email').value;
				var subjectData = document.getElementById('contact-subject').value;
				var messageData = document.getElementById('contact-message').value;

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
			} else {
				var error = new Event('message-error');
				window.dispatchEvent(error);
			}
		}

		addEvents();

		submitButton.addEventListener('click', sendMessage);
		window.addEventListener('message-sent', successNotify.open);
		window.addEventListener('message-failed', failureNotify.open);
		window.addEventListener('message-error', errorNotify.open);
	}

	exports.default = landing;

/***/ },
/* 4 */
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

/***/ }
/******/ ]);
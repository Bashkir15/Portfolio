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

	var _sidenav = __webpack_require__(5);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _scrollIn = __webpack_require__(3);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _dialog = __webpack_require__(2);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _scrollNav = __webpack_require__(4);

	var _scrollNav2 = _interopRequireDefault(_scrollNav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');
	var sidenavMenu = document.getElementById('sidenav-container');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		var leftNav = new _sidenav2.default();

		sidenavTrigger.addEventListener('click', leftNav.open, false);
		//sidenavMenu.addEventListener('transitionend', sidenav.onTransitionEnd, false);
	}

	if (canvas) {
		canvas.addEventListener('mousemove', _canvas2.default.MouseMove, false);
		canvas.addEventListener('mouseout', _canvas2.default.MouseOut, false);
	}

	if (opinionDialogTrigger) {
		var opinionDialogContent = document.getElementById('opinionated-dialog');
		var opinionDialog = new _dialog2.default({
			content: opinionDialogContent
		});

		opinionDialogTrigger.addEventListener('click', opinionDialog.open);
	}

	addEventListener('DOMContentLoaded', _scrollIn2.default.init, false);
	addEventListener('scroll', _scrollIn2.default.viewportChange, false);
	addEventListener('resize', _scrollIn2.default.viewportChange, false);
	window.onload = _scrollNav2.default.init();

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	var keyword = "Forrest",
	    canvas,
	    context,
	    bgCanvas,
	    bgContext,
	    density = 13,
	    particles = [],
	    color = '#fff0a4',
	    mouse = { x: 0, y: 0 },
	    isDrawing = false,
	    canvasW,
	    canvasH;

	function initialize(canvas_id) {
		reload(canvas_id);

		window.onresize = function (event) {
			reload(canvas_id);
		};
	}

	function reload(canvas_id) {
		canvas = document.getElementById(canvas_id);

		if (!window.HTMLCanvasElement) {
			return false;
		}

		context = canvas.getContext('2d');
		canvasW = window.innerWidth;
		canvasH = 300;

		canvas.width = canvasW;
		canvas.height = canvasH;

		bgCanvas = document.createElement('canvas');
		bgContext = bgCanvas.getContext('2d');

		bgCanvas.width = canvasW;
		bgCanvas.height = canvasH;

		prepare();
		setupParticles();
		draw();
	}

	function prepare() {
		bgContext.font = "300px 'sans-serif'";
		bgContext.fillText(keyword, canvasW / 2 - Math.round(bgContext.measureText(keyword).width / 2), 260);
	}

	function setupParticles() {
		particles = [];

		var imageData,
		    image_Data,
		    pixel,
		    width = 0,
		    i = 0,
		    slide = false;

		imageData = bgContext.getImageData(0, 0, canvasW, canvasH);
		image_Data = imageData.data;

		for (var height = 0; height < canvasH; height += density) {
			++i;
			slide = (i & 2) == 0;
			width = 0;

			if (slide == true) {
				width += 6;
			}

			for (width; width < canvasW; width += density) {
				pixel = image_Data[(width + height * canvasW) * 4 - 1];

				if (pixel == 255) {
					particles.push({
						color: color,
						x: width,
						y: height
					});
				}
			}
		}
	}

	function draw() {
		context.clearRect(0, 0, canvasW, canvasH);

		var dx,
		    dy,
		    sqrDist,
		    scale = 1;

		for (var i = 0, len = particles.length; i < len; ++i) {
			context.beginPath();

			context.moveTo(x, y - height / 2);
			context.lineTo(x + width / 2, y - height / 4);
			context.lineTo(x + width / 2, y + height / 4);
			context.lineTo(x, y + height / 2);
			context.lineTo(x - width / 2, y + height / 4);
			context.lineTo(x - width / 2, y - height / 4);
			context.lineTo(x, y - height / 2);

			context.closePath();
			context.fill();
		}
	}

	var mouse = {
		x: 0,
		y: 0,
		o: false
	};

	function MouseMove(e) {
		mouse.x = e.offsetX || e.layerX - canvas.offsetLeft;
		mouse.y = e.offsetY || e.layerY - canvas.offsetTop;

		if (!isDrawing) {
			isDrawing = true;

			var drawTimeout = setTimeout(function () {
				draw();
				isDrawing = false;
			}, 60);
		}
	}

	function MouseOut(e) {
		isDrawing = false;
		clearTimeout(drawTimeout);
		draw();
	}

	module.exports = {
		MouseMove: MouseMove,
		MouseOut: MouseOut
	};

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

	function init() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			var anim = item.getAttribute('data-entrance');
			var delay = item.getAttribute("data-entrance-delay");

			item.style.transition = "all 1s ease";

			if (delay) {
				elem.style.transitionDelay = delay / 1000 + 's';
			}
			if (anim == "fade") {
				item.style.opacity = "0";
			}

			if (isInViewPort(item)) {
				addEventListener('load', function () {
					enter(item);
				}, false);
			}
		});
	}

	function isInViewPort(elem) {
		var rect = elem.getBoundingClientRect();

		return rect.top + 200 >= 0 && rect.top + 200 <= window.innerHeight || rect.bottom + 200 >= 0 && rect.bottom + 200 <= window.innerHeight || rect.top + 200 < 0 && rect.bottom + 200 > window.innerHeight;
	}

	function enter(elem) {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.className += " has-entered";
	}

	function viewportChange() {
		var elements = document.querySelectorAll('[data-entrance]');

		Array.prototype.map.call(elements, function (item) {
			if (isInViewPort(item)) {
				var hasEntered = item.classList.contains("has-entered");

				if (!hasEntered) {
					enter(item);
				}
			}
		});
	}

	module.exports = {
		init: init,
		isInViewPort: isInViewPort,
		enter: enter,
		viewportChange: viewportChange
	};
	/*entrance.isElemInView = function() {
	var rect = elem.getBoundingClientRect();
		return(
		((rect.top + entrance.heightOffset) >= 0 && (rect.top + entrance.heightOffset) <= window.innerHeight) ||
		((rect.bottom + entrance.heightOffset) >= 0 && (rect.bottom + entrance.heightOffset) <= window.innerHeight) ||
		((rect.top + entrance.heightOffset) < 0 && (rect.bottom + entrance.heightOffset) > window.innerHeight)
	);
	}


	entrance.setInitialStyles = function (elem) {
		document.body.style.overflowX = "hidden";
			var anim = elem.getAttribute('data-entrace');
		var delay = elem.getAttribute("data-entrace-delay");
			elem.style.transition = "all " + (entrance.duration / 1000) + "s ease";
			if (delay) {
			elem.style.transitionDelay = (delay/1000) + 's';
		}
			if (anim == "fade") {
			elem.style.opacity = "0";
		}
			if (anim == "from-bottom") {
			elem.style.opacity = "0";
			elem.style.transform = "translate(0, " + entrance.distance + "px)";
		}
	}
	entrance.enter = function (elem) {
	elem.style.visibility = "visible";
	elem.style.opacity = "1";
	elem.style.transform = "translate(0,0)";
	elem.className += " has-entered";
	}

	entrance.viewportChange = function() {
		Array.prototype.map.call(entrance.elements, (item) => {
			if (entrance.elements.isElemInView(item)) {
				var hasEntered = item.classList.contains('has-entered');
			}
				if (!hasEntered) {
				enter(item);
			}
		});
	}
	entrance.init =	function() {
		entrance.elements = document.querySelectorAll('[data-entrance]');
			Array.prototype.map.call(entrance.elements, (item) => {
			setInitialStyles(item);
				if (isElemInView(item)) {
				addEventListener('load', () => {
					enter(item);
				}, false);
			}
		});
	}

	module.exports = {
	entrance: entrance
	} */

/***/ },
/* 4 */
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
/* 5 */
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

	/*
	function openSideNav() {
		const navContainer = document.getElementById('sidenav-container');
		const nav = document.getElementById('sidenav');

		nav.style.willChange = "transform";
		navContainer.classList.add('sidenav-container--animatable');

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			overlay.classList.add("overlay--visible");
			docFrag.appendChild(overlay);
			document.body.appendChild(docFrag);
		}

		overlay.style.willChange = "auto";
		nav.style.willChange = "auto";
	}

	function toggleSideNav() {
		const navContainer = document.getElementById('sidenav-container');
		const nav = document.getElementById('sidenav');

		nav.style.willChange = "transform";
		navContainer.classList.add("sidenav-container--animatable");

		if (!navContainer.classList.contains("sidenav-container--visible")) {
			navContainer.classList.add("sidenav-container--visible");
			document.body.classList.add("backdrop--visible");
		} else {
			navContainer.classList.remove("sidenav-container--visible");
			document.body.classList.remove("backdrop--visible");
		}

		nav.style.willChange = 'auto';
	}



	function onTransitionEnd() {
		const navContainer = document.getElementById('sidenav-container');

		navContainer.classList.remove("sidenav-container--animatable");
	}

	function openNav() {
		const scrollBarWidth = getScrollBarWidth();
		const backdrop = document.createElement('div');
		const closeSidenav = document.getElementById('close-sidenav');
		backdrop.className = "sidenav-backdrop";
		document.body.appendChild(backdrop);
		document.body.classList.add('modal-open');
		document.getElementById('sidenav').style.width = "250px";
		backdrop.style.opacity = "0.7"

		if (scrollBarWidth !== 0) {
			document.body.style.paddingRight = scrollBarWidth + 'px';
		}

		backdrop.addEventListener('click', closeNav);
		closeSidenav.addEventListener('click', closeNav);
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
		document.body.style.paddingRight = "0";
		var backdrop = document.querySelector('.sidenav-backdrop');
		document.body.removeChild(backdrop);
	}

	module.exports = {
		openSideNav: openSideNav,
		onTransitionEnd: onTransitionEnd
	};

	*/


	exports.default = sideNav;

/***/ }
/******/ ]);
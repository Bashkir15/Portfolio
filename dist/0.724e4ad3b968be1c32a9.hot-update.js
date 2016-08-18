webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(3);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	var _canvas = __webpack_require__(1);

	var _canvas2 = _interopRequireDefault(_canvas);

	var _scrollIn = __webpack_require__(2);

	var _scrollIn2 = _interopRequireDefault(_scrollIn);

	var _dialog = __webpack_require__(5);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var sidenavTrigger = document.getElementById('open-sidenav');
	var canvas = document.getElementById('banner');
	var opinionDialogTrigger = document.getElementById('open-opinionated');

	if (sidenavTrigger) {
		sidenavTrigger.addEventListener('click', _sidenav2.default.openNav);
	}

	if (canvas) {
		canvas.addEventListener('mousemove', _canvas2.default.MouseMove, false);
		canvas.addEventListener('mouseout', _canvas2.default.MouseOut, false);
	}

	if (opinionDialogTrigger) {
		var opinionDialog = new _dialog2.default();

		opinionDialogTrigger.addEventListener('click', opinionDialog.open);
	}

	addEventListener('DOMContentLoaded', _scrollIn2.default.init, false);
	addEventListener('scroll', _scrollIn2.default.viewportChange, false);
	addEventListener('resize', _scrollIn2.default.viewportChange, false);

/***/ },

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Dialog = function () {
		function Dialog() {
			_classCallCheck(this, Dialog);

			this.closeButton = null;
			this.modal = null;
			this.overlay = null;

			this.defaults = {
				closeButton: true,
				content: "",
				overlay: true,
				clickOutside: true,
				closeKeys: [27],
				className: 'fade-and-drop',
				maxWidth: 600,
				minWidth: 280
			};

			if (arguments[0] && _typeof(arguments[0]) === 'object') {
				this.options = extendDefaults(this.defaults, arguments[0]);
			}
		}

		_createClass(Dialog, [{
			key: 'extendDefaults',
			value: function extendDefaults(source, properties) {
				var property;

				for (property in properties) {
					if (properties.hasOwnProperty(property)) {
						source[property] = properties[property];
					}
				}

				return source;
			}
		}, {
			key: 'buildOut',
			value: function buildOut() {
				var content;
				var contentHolder;
				var docFrag;

				if (typeof this.options.content === "string") {
					content = this.options.content;
				} else {
					content = this.options.content.innerHTML;
				}

				docFrag = document.createDocumentFragment();

				this.modal = document.createElement('div');
				this.modal.className = "modal " + this.options.className;
				this.modal.style.minWidth = this.options.minWidth + "px";
				this.modal.style.maxWidth = this.options.maxWidth + "px";

				if (this.options.overlay === true) {
					this.overlay = document.createElement("div");
					this.overlay.className = "modal-overlay " + this.options.className;
					docFrag.appendChild(this.overlay);
				}

				contentHolder = document.createElement("div");
				contentHolder.className = 'modal-content';
				contentHolder.innerHTML = content;

				docFrag.appendChild(this.modal);

				document.body.appendChild(docFrag);
			}
		}, {
			key: 'initializeEvents',
			value: function initializeEvents() {
				if (this.overlay) {
					this.overlay.addEventListener('click', this.close.bind(this));
				}

				if (Object.prototype.toString.call(this.defaults.closeKeys) === '[object Array]' || this.defults.closeKeys.length !== 0) {
					document.addEventListener('keydown', this.close.bind(this));
				}
			}
		}, {
			key: 'open',
			value: function open() {
				buildOut.call(this);

				initializeEvents.call(this);

				window.getComputedStyle(this.modal).height;

				this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " modal-open modal-anchored" : " modal open");
				this.overlay.className = this.overlay.className + ' modal-open';
			}
		}, {
			key: 'close',
			value: function close() {
				var _this = this;

				var self = this;

				this.modal.className = this.modal.className.replace(" modal-open", "");
				this.overlay.className = this.overlay.className.replace(" modal-open", "");

				this.modal.addEventListener(this.transitionEnd, function () {
					self.parentNode.removeChild(self.modal);
				});

				this.overlay.addEventListener(this.transitionEnd, function () {
					_this.overlay.className = _this.overlay.className.replace(" modal-open", "");
				});

				this.overlay.removeEventListener('click', false);
				document.removeEventListener('keydown', false);
			}
		}]);

		return Dialog;
	}();

	exports.default = Dialog;

/***/ }

})
webpackHotUpdate(0,{

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
				this.buildOut.bind(this);

				this.initializeEvents.bind(this);

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
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

	var dialog = function () {
		function dialog(options) {
			_classCallCheck(this, dialog);

			this.modal = null;
			this.overlay = null;

			this.defaults = {
				className: 'fade-and-fall',
				content: "",
				overlay: true
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
			}
		}, {
			key: '_close',
			value: function _close() {
				this.modal.className = this.modal.className.replace(" modal-open", "");
				this.overlay.className = this.overlay.className.replace(" modal-open", "");
				document.body.removeChild(this.overlay);
			}
		}, {
			key: '_buildOut',
			value: function _buildOut() {
				var content;
				var contentHolder;
				var docFrag = document.createDocumentFragment();

				if (typeof this.defaults.content === 'string') {
					content = this.defaults.content;
				} else {
					content = this.defaults.content.innerHTML;
				}

				docFrag = document.createDocumentFragment();

				this.modal = document.createElement('div');
				this.modal.className = "modal " + this.defaults.className;

				if (this.defaults.overlay === true) {
					this.overlay = document.createElement('div');
					this.overlay.className = '.modal-overlay ' + this.defaults.className;
				}

				contentHolder = document.createElement('div');
				contentHolder.className = ".modal-content";
				contentHolder.innerHTML = content;
				this.modal.appendChild(contentHolder);

				docFrag.appendChild(this.modal);

				document.body.appendChild(docFrag);
			}
		}]);

		return dialog;
	}();

	exports.default = dialog;

/***/ }

})
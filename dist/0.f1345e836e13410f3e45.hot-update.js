webpackHotUpdate(0,{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _sidenav = __webpack_require__(14);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var mySidenav = new _sidenav2.default();

/***/ },

/***/ 14:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Sidenav = function () {
		function Sidenav() {
			_classCallCheck(this, Sidenav);

			this._sidenav = document.getElementById('sidenav');
		}

		_createClass(Sidenav, [{
			key: 'open',
			value: function open() {
				this._sidenav.style.width = "250px";
				document.body.classList.add('modal-open');
			}
		}, {
			key: 'close',
			value: function close() {
				this.sidenav.style.width = "0px";
				document.body.classList.remove('modal-open');
			}
		}]);

		return Sidenav;
	}();

	exports.default = Sidenav;

/***/ }

})
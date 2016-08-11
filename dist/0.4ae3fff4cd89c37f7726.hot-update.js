webpackHotUpdate(0,{

/***/ 14:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/*function openNav() {
		document.getElementById('sidenav').style.width = "250px";
		document.body.classList.add('modal-open');
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
	}

	module.exports = {
		openNav: openNav,
		closeNav: closeNav
	};*/

	var sidenav = function () {
		function sidenav() {
			_classCallCheck(this, sidenav);

			this._menu = document.getElementById('sidenav');
		}

		_createClass(sidenav, [{
			key: 'openNav',
			value: function openNav() {
				this._menu.style.width = "250px";
				document.body.classList.add('modal-open');
			}
		}]);

		return sidenav;
	}();

	exports.default = sidenav;

/***/ }

})
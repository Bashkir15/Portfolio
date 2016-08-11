webpackHotUpdate(0,{

/***/ 14:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _getScrollbar = __webpack_require__(15);

	var _getScrollbar2 = _interopRequireDefault(_getScrollbar);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function openNav() {
		var scrollBarWidth = (0, _getScrollbar2.default)();
		var backdrop = document.createElement('div');
		backdrop.classNav = "sidenav-backdrop";
		document.body.appendChild(backdrop);
		document.body.classList.add('modal-open');
		document.getElementById('sidenav').style.width = "250px";

		if (scrollBarWidth !== 0) {
			body.style.paddingRight = scrollBarWidth + 'px';
		}

		backdrop.addEventListener('click', closeNav);
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
	}

	module.exports = {
		openNav: openNav,
		closeNav: closeNav
	};

/***/ },

/***/ 15:
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	exports.default = function () {
		if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
			return 0;
		}

		var inner = document.createElement('p');
		inner.style.width = "100%";
		inner.style.height = "200px";

		var outer = document.createElement('div');
		outer.style.position = "absolute";
		outer.style.top = "0px";
		outer.style.left = "0px";
		outer.style.visibility = "hidden";
		outer.style.width = "200px";
		outer.style.height = "150px";
		outer.style.overflow = "hidden";
		outer.appendChild(inner);

		document.body.appendChild(outer);

		var w1 = inner.offsetWidth;
		outer.style.overflow = 'scroll';
		var w2 = inner.offsetWidth;

		if (w1 === w2) {
			w2 = outer.clientWidth;
		}

		document.body.removeChild(outer);

		return w1 - w2;
	};

/***/ }

})
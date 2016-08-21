webpackHotUpdate(0,{

/***/ 3:
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
				var docFrag = document.createDocumentFragment();

				this.nav.style.willChange = "transform";
				this.container.classList.add('sidenav-container--animatable');
				this.overlay = document.createElement('div');
				this.overlay.className = "sidenav-overlay";
				this.overlay.style.willChange = "opacity";

				if (!this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.add('sidenav-container--visible');
					this.overlay.classList.add('overlay--visible');
					docFrag.appendChild(this.overlay);
					document.body.appendChild(docFrag);

					this._addEvents();
				}

				this.overlay.style.willChange = "auto";
				this.nav.style.willChange = "auto";
			}
		}, {
			key: '_close',
			value: function _close() {
				this.nav.style.willChange = "transform";
				this.overlay.style.willChange = "opacity";

				if (this.container.classList.contains("sidenav-container--visible")) {
					this.container.classList.remove("sidenav-container--visible");
					document.body.removeChild(this.overlay);
				}

				this.nav.style.willChange = "auto";
			}
		}, {
			key: '_outsideClickHandler',
			value: function _outsideClickHandler(e) {
				var node = e.target;

				if (node === this.nav) {
					return;
				}

				this.close();
			}
		}, {
			key: '_addEvents',
			value: function _addEvents() {
				var _outsideClickHandler = this._outsideClickHandler.bind(this);

				this.container.addEventListener('click', _outsideClickHandler, false);
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

})
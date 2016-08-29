
export default class sideNav {
	constructor () {
		this.container = document.getElementById('sidenav-container');
		this.nav = document.getElementById('sidenav');
		this.clickOutside = true,
		this.closeKeys = [27],
		this.overlay = null,
		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
	}

	_open() {

		this.nav.style.willChange = "transform";
		this.container.classList.add('sidenav-container--animatable');

		if (!this.container.classList.contains("sidenav-container--visible")) {
			this.container.classList.add('sidenav-container--visible');
			this._buildOverlay.call(this);
			this.overlay.classList.add('overlay--visible');
			document.body.style.overflowY = "hidden";

			this._addEvents();
		}

		this.overlay.style.willChange = "auto";
		this.nav.style.willChange = "auto";
	}

	_close(event) {
		this.nav.style.willChange = "transform";
		this.container.classList.add('sidenav-container--animatable');
		this.overlay.style.willChange = "opacity";

		if (this.container.classList.contains("sidenav-container--visible")) {
			this.container.classList.remove("sidenav-container--visible");
			document.body.removeChild(this.overlay);
			document.body.style.overflowY = "auto";
		}

		this.nav.style.willChange = "auto";
	}

	_onTransitionEnd() {
		this.container.classList.remove('sidenav-container--animatable');
	}

	_buildOverlay() {
		var docFrag = document.createDocumentFragment();
		this.overlay = document.createElement('div');
		this.overlay.className = "sidenav-overlay";
		this.overlay.style.willChange = "opacity";
		docFrag.appendChild(this.overlay);
		document.body.appendChild(docFrag); 
	}

	_closeKeyHandler(e) {
		if (this.closeKeys.indexOf(e.which) > -1) {
			e.preventDefault();
			this.close();
		}
	}


	_addEvents() {
		let _closeKeyHandler = this._closeKeyHandler.bind(this);
		let _onTransitionEnd = this._onTransitionEnd.bind(this);
		
		this.container.addEventListener('transitionend', _onTransitionEnd, false);
		this.container.addEventListener('click', this.close, false);
		document.body.addEventListener('keydown', _closeKeyHandler, false);
	}
}


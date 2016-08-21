
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

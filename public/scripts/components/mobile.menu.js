class mobileMenu {
	constructor() {
		this.container = document.getElementById('mobile-menu-container');
		this.menu = document.getElementById("mobile-menu");
		this.toggle = this._toggle.bind(this);
		this.animatedClass = 'mobile-menu-container--animatable';
		this.openClass = 'mobile-menu-container--open';
		this.closeKeys = [27];
	}

	_toggle() {
		this.menu.style.willChange = 'transform';
		this.container.classList.add(this.animatedClass);

		if (this.container.classList.contains(this.animatedClass) && !this.container.classList.contains(this.openClass)) {
			document.body.style.overflowY = 'hidden';
			this._addEvents();
			this.container.classList.add(this.openClass);
			this._updateNav();
		} else {
			document.body.overflowY = 'auto';
			this._addEvents();
			this.container.classList.remove(this.openClass);
			this._updateNav();
		}

		this.menu.style.willChange = 'auto';
	}


	_onTransitionEnd() {
		this.container.classList.remove('mobile-menu-container--animatable');
	}

	_closeKeyHandler(e) {
		if (this.closeKeys.indexOf(e.which) > -1) {
			e.preventDefault();
			this.toggle();
		}
	}

	_updateNav() {
		var nav = document.getElementById('nav');

		if (this.container.classList.contains(this.openClass)) {
			nav.classList.add('nav-mobile--open');
		} else {
			nav.classList.remove('nav-mobile--open');
		}
	}

	_addEvents() {
		let _onTransitionEnd = this._onTransitionEnd.bind(this);

		this.container.addEventListener('transitionend', _onTransitionEnd);
	}
}

export default mobileMenu
class mobileMenu {
	constructor() {
		this.container = document.getElementById('mobile-menu-container');
		this.menu = document.getElementById("mobile-menu");
		this.trigger = document.querySelector('.nav-trigger');
		this.nav = document.querySelector('.nav');
		this.animatedClass = '--animatable';
		this.openClass = '--open';
		this.closeKeys = [27];
	}

	toggle = () => {
		this.menu.style.willChange = 'opacity';
		this.container.classList.add(this.animatedClass);

		if (this.container.classList.contains(this.animatedClass) && !this.container.classList.contains(this.openClass)) {
			document.body.style.overflowY = 'hidden';
			this.addEvents();
			this.build();
		} else {
			this.close();
		}

		this.menu.style.willChange = 'auto';
	}

	close = () => {
		this.menu.style.willChange = 'opacity';
		this.container.classList.add(this.animatedClass);

		if (this.container.classList.contains(this.openClass)) {
			document.body.style.overflowY = 'visible';
			this.addEvents();
			this.remove();
			document.body.removeEventListener('keydown', this.closeKeyHandler);

		}
	}

	onTransitionEnd = () => {
		this.container.classList.remove(this.animatedClass);
	}

	closeKeyHandler = (e) => {
		if (this.closeKeys.includes(e.which)) {
			e.preventDefault();
			this.close();
		}
	}

	build = () => {
		this.trigger.classList.add('is-active');
		this.container.classList.add(this.openClass);
		this.nav.classList.add(this.openClass);
		document.body.addEventListener('keydown', this.closeKeyHandler);
	}

	remove = () => {
		this.trigger.classList.remove('is-active');
		this.container.classList.remove(this.openClass);
		this.nav.classList.remove(this.openClass);
		document.body.removeEventListener('keydown', this.closeKeyHandler);
	}

	addEvents = () => {
		this.container.addEventListener('transitionend', this.onTransitionEnd);
	}
}

export default mobileMenu
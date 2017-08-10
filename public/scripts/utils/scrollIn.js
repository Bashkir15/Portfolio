class ScrollIn {
	constructor() {
		this.elements = document.querySelectorAll('[data-entrance]');

		this.defaults = {
			duration: '1000',
			distance: '200',
			heightOffset: 200
		};
	}

	isInView = (elem) => {
		const rect = elem.getBoundingClientRect();

		return(
			((rect.top + this.defaults.heightOffset) >= 0 && (rect.top + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.bottom + this.defaults.heightOffset) >= 0 && (rect.bottom + this.defaults.heightOffset) <= window.innerHeight) ||
			((rect.top + this.defaults.heightOffset) < 0 && (rect.bottom + this.defaults.heightOffset) > window.innerHeight)
		);
	}

	setInitialStyles = (elem) => {
		const anim = elem.getAttribute('data-entrance');
		const delay = elem.getAttribute('data-entrance-delay');

		elem.style.transition = "all " + (this.defaults.duration / 1000) + "s ease-out";

		if (delay) {
			elem.style.transitionDelay = (delay / 1000) + 's';
		}

		if (anim == 'fade') {
			elem.style.opacity = '0';
		}
	}

	enter = (elem) => {
		elem.style.visibility = "visible";
		elem.style.opacity = "1";
		elem.style.transform = "translate(0,0)";
		elem.classList.add('has-entered');
	}

	viewPortChange = () => {
		Array.prototype.map.call(this.elements, (item) => {
			const isInView = this.isInView(item);

			if (isInView) {
				const hasEntered = item.classList.contains('has-entered');

				if (!hasEntered) {
					this.enter(item);
				}
			}
		});
	}

	init = () => {
		
		Array.prototype.map.call(this.elements, (item) => {
			this.setInitialStyles(item);

			if (this.isInView(item)) {
				window.addEventListener('load', () => {
					this.enter(item);
				}, false);
			}
		});
	}
}

export default ScrollIn

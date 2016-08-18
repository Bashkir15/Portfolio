export default class Dialog {
	constructor() {
		this.closeButton = null;
		this.modal = null;
		this.overlay = null;

		this.defaults = {
			closeButton: true,
			content: "",
			overlay: true,
			clickOutside: true,
			closeKeys: [27],
			className: 'fade-and-drop',
			maxWidth: 600,
			minWidth: 280
		}

		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = extendDefaults(this.defaults, arguments[0]);
		}
	}

	extendDefaults (source, properties) {
		var property;

		for (property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property]
			}
		}

		return source;
	}

	buildOut() {
		var content;
		var contentHolder;
		var docFrag;

		if (typeof this.options.content === "string") {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		docFrag = document.createDocumentFragment();

		this.modal = document.createElement('div');
		this.modal.className = "modal " + this.options.className;
		this.modal.style.minWidth = this.options.minWidth + "px";
		this.modal.style.maxWidth = this.options.maxWidth + "px";

		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "modal-overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		contentHolder = document.createElement("div");
		contentHolder.className = 'modal-content';
		contentHolder.innerHTML = content;

		docFrag.appendChild(this.modal);

		document.body.appendChild(docFrag);
	}

	initializeEvents() {
		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}

		if (Object.prototype.toString.call(this.defaults.closeKeys) === '[object Array]' || this.defults.closeKeys.length !== 0) {
			document.addEventListener('keydown', this.close.bind(this));
		}
	}

	open() {
		buildOut();

		this.initializeEvents.bind(this);

		window.getComputedStyle(this.modal).height;

		this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " modal-open modal-anchored" : " modal open");
		this.overlay.className = this.overlay.className + ' modal-open';
	}

	close() {
		var self = this;

		this.modal.className = this.modal.className.replace(" modal-open", "");
		this.overlay.className = this.overlay.className.replace(" modal-open", "");

		this.modal.addEventListener(this.transitionEnd, () => {
			self.parentNode.removeChild(self.modal);
		});

		this.overlay.addEventListener(this.transitionEnd, () => {
			this.overlay.className = this.overlay.className.replace(" modal-open", "");
		});

		this.overlay.removeEventListener('click', false);
		document.removeEventListener('keydown', false);
	}

}
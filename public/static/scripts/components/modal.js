(function() {
	this.Modal = function() {

		this.closeButton = null;
		this.modal = null;
		this.overlay = null;
		this.transitionEnd = transitionSelect();

		var defaults = {
			className: 'fade-in-drop',
			closeButton: true,
			content: "",
			maxWidth: 600,
			minWidth: 280,
			overlay: true
		};

		if (arguments[0] && typeof arguments[0] === 'object' ) {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	}

	Modal.prototype.open = function() {
		buildOut.call(this);
		initializeEvents.call(this);

		window.getComputedStyle(this.modal).height;

		this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " portfolio-modal-open portfolio-modal-anchored " : " portfolio-modal-open ");
		this.overlay.className = this.overlay.className + " portfolio-modal-open ";
	}

	Modal.prototype.close = function() {
		var self = this;

		this.modal.className = this.modal.className.replace(" portfolio-modal-open", "");
		this.overlay.className = this.overlay.className.replace(" portfolio-modal-open", "");

		this.modal.addEventListener(this.transitionEnd, function() {
			self.modal.parentNode.removeChild(self.modal);
		});

		this.overlay.addEventListener(this.transitionEnd, function() {
			if (self.overlay.parentNode) {
				self.overlay.parentNode.removeChild(self.overlay);
			}
		});
	}

	function extendDefaults (source, properties) {
		var property;
		for (var property in properties) {
			if (properties.hasOwnProperty(property)) {
				source[property] = properties[property];
			} 
		}

		return source;
	}

	function buildOut() {
		var content,
		contentHolder,
		docFrag;

		if (typeof this.options.content === 'string') {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		docFrag = document.createDocumentFragment();

		this.modal = document.createElement("div");
		this.modal.className = 'portfolio-modal ' + this.options.className;
		this.modal.maxWidth = this.options.maxWidth + "px";
		this.modal.minWidth = this.options.minWidth + "px";

		if (this.options.closeButton === true) {
			this.closeButton = document.createElement("button");
			this.closeButton.className = "portfolio-modal-close close-button";
			this.closeButton.innerHTML = "x";
			this.modal.appendChild(this.closeButton);
		}

		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "portfolio-modal-overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		contentHolder = document.createElement("div");
		contentHolder.className = "portfolio-modal-content";
		contentHolder.innerHtml = this.options.content.innerHTML;
		this.modal.appendChild(contentHolder);

		docFrag.appendChild(this.modal);

		document.body.appendChild(docFrag);
	}

	function initializeEvents() {
		if (this.closeButton) {
			this.closeButton.addEventListener('click', this.close.bind(this));
		}

		if (this.overlay) {
			this.overlay.addEventListener('click', this.close.bind(this));
		}
	}

	function transitionSelect() {
		var el = document.createElement("div");
		if (el.style.WebkitTransition) {
			return "webkitTransitionEnd";
		}

		if (el.style.OTransition) {
			return "oTransitionEnd";
		}

		return "transitionend";
	}
}());

/* var myContent = document.getElementById('portfolio-opinionated-content');
var myModal = new Modal({
	content: myContent
});
var triggerButton = document.getElementById('portfolio-opinionated-trigger');
triggerButton.addEventListener('click', function() {
	myModal.open();
}); */

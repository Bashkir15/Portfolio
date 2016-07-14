'use strict';

var portfolio = portfolio || {};

portfolio.Modal = (function() {

	// Constructor Function
	function Modal() {

		this.closeButton = null;
		this.modal = null;
		this.overlay = null;

		this.transitionEnd = transitionSelect();

		var defaults = {
			className: 'fade-in-from-above',
			closeButton: true,
			content: "",
			maxWidth: 800,
			minWidth: 280,
			overlay: true
		};

		if (arguments[0] && typeof arguments[0] === 'object') {
			this.options = extendDefaults(defaults, arguments[0]);
		}
	}

	// Public Fields

	Modal.prototype.close = function() {
		var self = this;

		this.modal.className = this.modal.className.replace(" modal-open", "");
		this.overlay.className = this.overlay.className.replace(" modal-open", "");

		this.modal.addEventListener(this.transitionEnd, function() {
			self.modal.parentNode.removeChild(self.modal);
		});
		this.overlay.addEventListener(this.transitionEnd, function() {
			self.overlay.parentNode.removeChild(self.overlay);
		});
	}

	Modal.prototype.open = function() {
		buildOut.call(this);
		initializeEvents.call(this);
		window.getComputedStyle(this.modal).height;
		this.modal.className = this.modal.className + (this.modal.offsetHeight > window.innerHeight ? " modal-open modal-anchored" : " modal-open");
		this.overlay.className = this.overlay.className + " modal-open";
	}

	// Private Fields

	function buildOut() {
		var content,
		contentHolder,
		docFrag;

		if (typeof this.content === 'string') {
			content = this.options.content;
		} else {
			content = this.options.content.innerHTML;
		}

		//var offset = window.pageYOffset ? window.pageYOffset || document.documentElement.scrollTop

		docFrag = document.createDocumentFragment();

		this.modal = document.createElement("div");
		this.modal.className = "profile-modal " + this.options.className;
		this.modal.style.minWidth = this.options.minWidth + "px";
		this.modal.style.maxWidth = this.options.maxWidth + "px";
		this.modal.style.top = window.pageYOffset + (window.innerHeight / 2) + "px";
		this.modal.style.left = (window.innerWidth - this.modal.offsetWidth) / 2 + "px";

		if (this.options.closeButton === true) {
			this.closeButton = document.createElement("button");
			this.closeButton.className = "modal-close close-button";
			this.closeButton.innerHTML = "x";
			this.modal.appendChild(this.closeButton);
		}

		if (this.options.overlay === true) {
			this.overlay = document.createElement("div");
			this.overlay.className = "modal-overlay " + this.options.className;
			docFrag.appendChild(this.overlay);
		}

		contentHolder = document.createElement("div");
		contentHolder.className = "modal-content";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		docFrag.appendChild(this.modal);
		document.body.appendChild(docFrag);
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
			return "WebkitTransitionEnd";
		}

		if (el.style.OTransition) {
			return "oTransitionEnd";
		}

		return "transitionend";
	}

	return {
		Modal: Modal
	};
}());

	
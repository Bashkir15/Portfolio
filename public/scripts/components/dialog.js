export default class dialog {
	constructor(options) {
		this.modal = null;
		this.overlay = null;
		this.container = null;
		this.closeButton = null;
		
		this.defaults = {
			className: 'fade-and-fall',
			content: "",
			overlay: true,
			closeKeys: [27],
			closeButton: true
		};

		this._applySettings(options);
		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
	}

	_applySettings(options) {
		if (typeof options === 'object') {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					this.defaults[i] = options[i];
				}
			}
		}
	}

	_open() {
		this._buildOut.call(this);

		window.getComputedStyle(this.modal).height;
		this.modal.className = this.modal.className + 
			(this.modal.offsetHeight > window.innerHeight ? 
				" modal-open modal-anchored" : " modal-open");
		this.overlay.className = this.overlay.className + " modal-open";
		this._attachEvents();
	}

	_close() {
		var self = this;

		this.modal.className = this.modal.className.replace(" modal-open", "");
		this.overlay.className = this.overlay.className.replace(" modal-open", "");

		this.modal.addEventListener('transitionend', function() {
			self.modal.parentNode.removeChild(self.modal);
		}, false);

		this.overlay.addEventListener('transitionend', function() {
			self.overlay.parentNode.removeChild(self.overlay);
		}, false);

		
		
	}

	_buildOut() {
		var content;
		var contentHolder;
		this.container = document.createDocumentFragment();
		var overlayFrag 

		if (typeof this.defaults.content === 'string') {
			content = this.defaults.content;
		} else {
			content = this.defaults.content.innerHTML;
		}

		this.modal = document.createElement('div');
		this.modal.className = "modal " + this.defaults.className;
		this.modal.style.top = window.pageYOffset + (window.innerHeight / 2) + "px";
		this.modal.style.left = (window.innerWidth - this.modal.offsetWidth) / 2 + "px";

		this.overlay = document.createElement('div');
		this.overlay.className = 'modal-overlay ' + this.defaults.className;

		if (this.defaults.closeButton == true) {
			this.closeButton = document.createElement('button');
			this.closeButton.innerHTML = "X";
			this.closeButton.classList.add('dialog-close-button');
			this.modal.appendChild(this.closeButton);
		}

		contentHolder = document.createElement('div');
		contentHolder.className = "modal-content";
		contentHolder.innerHTML = content;
		this.modal.appendChild(contentHolder);

		this.container.appendChild(this.modal);
		this.container.appendChild(this.overlay);

		document.body.appendChild(this.container);
	}

	_closeKeyHandler(e) {
		if (this.defaults.closeKeys.indexOf(e.which) > -1) {
			e.preventDefault();
			this.close();
		}
	}

	_attachEvents() {
		let _closeKeyHandler = this._closeKeyHandler.bind(this);

		this.overlay.addEventListener('click', this.close, false);
		this.closeButton.addEventListener('click', this.close, false);
		document.body.addEventListener('keydown', _closeKeyHandler, false);
	}


}
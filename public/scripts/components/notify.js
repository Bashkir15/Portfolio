export default class notify {
	constructor(options) {
		this.settings = {
			container: null,
			notification: null,
			timeout: 0,
			type: 'alert',
			content: ""
		}

		this._applySettings(options);
		this.open = this._open.bind(this);
		this.close = this._close.bind(this);
	}

	_applySettings(options) {
		if (typeof options === 'object') {
			for (var i in options) {
				if (options.hasOwnProperty(i)) {
					this.settings[i] = options[i]
				}
			}
		}
	}

	_buildOut() {
		var _container = document.createElement('div');
		var _contentHolder = document.createElement('div');
		var _content;

		_container.className = "notify-container";
		this.settings.container = _container;

		if (this.settings.content === 'string') {
			_content = this.settings.content;
		} else {
			_content = this.settings.content.innerHTML;
		}

		_contentHolder.innerHTML = _content;		
		this.settings.container.appendChild(_contentHolder);
		document.body.appendChild(this.settings.container);
	}

	_open() {
		this._buildOut.call(this);
		this.settings.container.classList.add('notify-shown');
	}

	_close() {
		var self = this;

		this.container.classList.remove('notify-shown');
		this.container.addEventListener('transitionend', function() {
			self.container.parentNode.removeChild(self.container);
		});
	}
}
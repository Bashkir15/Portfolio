export default class notify {
	constructor(options) {
		this.settings = {
			container: null,
			notification: null,
			timeout: 0,
			type: 'alert',
			content: "",
			posX: 'right',
			posY: 'bottom'
		}

		this.count = 0;
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
		_contentHolder.className = "notify";
		this.settings.container = _container;
		this.settings.container.style.position = "fixed";
		if (this.settings.content === 'string') {
			_content = this.settings.content;
		} else {
			_content = this.settings.content.innerHTML;
		}

		if (this.settings.type === 'danger') {
			_contentHolder.classList.add('danger');
		}

		if (this.settings.type === 'success') {
			_contentHolder.classList.add('success');
		}


		_contentHolder.innerHTML = _content;

		if (this.settings.posX === 'right') {
			this.settings.container.style.right = 20 + "px";
		}

		if (this.settings.posX === 'left') {
			this.settings.continer.style.left = 20 + "px";
		}

		if (this.settings.posY === 'top') {
			this.settings.container.style.top = 20 + "px";
		}	

		if (this.settings.posY === 'bottom') {
			this.settings.container.style.bottom = 20 + "px";
		}


		this.settings.container.appendChild(_contentHolder);
		document.body.appendChild(this.settings.container);
	}

	_open() {
		var notifyId = 'notify-' + this.count;
		this._buildOut.call(this);
		
		setTimeout(() => {
			this.settings.container.classList.add('shown');
			this.settings.container.setAttribute('id', notifyId);
		}, 100);

		if (this.settings.timeout > 0) {
			setTimeout(() => {
				this.close(notifyId);
			}, this.settings.timeout);
		}

		this.count += 1;

		return notifyId;
	}

	_close(notificationId) {
		var notification = document.getElementById(notificationId);

		if (notification) {
			notification.classList.remove('shown');

			setTimeout(() => {
				notification.parentNode.removeChild(notification);
			}, 600);

			return true;
		} else {
			return false;
		}
	}
}
class notifications {
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
		this.applySettings(options);
	}

	applySettings = (options) => {
		if (typeof options === 'object') {
			for (const i in options) {
				if (options.hasOwnProperty(i)) {
					this.settings[i] = options[i];
				}
			}
		}
	}

	buildOut = () => {
		const container = document.createElement('div');
		const contentHolder = document.createElement('div');
		let content;

		container.className = 'notification-container';
		contentHolder.className = 'notification';

		this.settings.container = container;
		this.settings.container.style.position = "fixed";

		if (this.settings.content === "string") {
			content = this.settings.content;
		} else {
			content = this.settings.content.innerHTML;
		}

		this.checkOptions(contentHolder);
		contentHolder.innerHTML = content;
		this.settings.container.appendChild(contentHolder);
		document.body.appendChild(this.settings.container);
	}

	checkOptions = (item) => {
		switch(this.settings.type) {
			case "success":
				item.classList.add('success');
				break;
			case "danger":
				item.classList.add('danger');
				break;
			case "warning":
				item.classList.add('warning');
				break;
			default:
				item.classList.add('alert');
		}

		switch(this.settings.posX) {
			case "right":
				this.settings.container.style.right = 20 + "px";
				break;
			case "left":
				this.settings.container.style.left = 20 + "px";
				break;
			default:
				this.settings.container.style.right = 20 + "px";
		}

		switch(this.settings.posY) {
				case "top":
					this.settings.container.style.top = 20 + "px";
					break;
				case "bottom":
					this.settings.container.style.bottom = 20 + "px";
					break;
				default:
					this.settings.container.style.bottom = 20 + "px";
		}
	}

	open = () => {
		const notifyId = "notification-" + this.count;
		this.buildOut();

		setTimeout(() => {
			this.settings.container.classList.add('shown');
			this.settings.container.setAttribute('id', notifyId);
		}, 100);

		if (this.settings.timeout > 0) {
			let notTimeout = window.setTimeout(() => {
				this.close(notifyId);
				window.clearTimeout(notTimeout);
			}, this.settings.timeout);
		}

		this.count += 1;

		return notifyId;
	}

	close = (notificationId) => {
		const notification = document.getElementById(notificationId);

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

export default notifications
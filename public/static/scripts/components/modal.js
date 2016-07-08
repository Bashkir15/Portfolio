(function() {

	var extend = function (to, from) {
		for (var p in from) {
			if (from.hasOwnProperty(p)) {
				to[p] = from[p];
			}
		}

		return p;
	}

	var winW = function() {
		return window.innerHeight || document.documentElement.clientWidth;
	}

	var winH = function() {
		return window.innerHeight || document.documentElement.clientHeight;
	}

	var scrollX = function() {
		return window.pageXOffset || document.documentElement.scrollLeft;
	}

	var scrollY = function() {
		return window.pageYOffset || document.documentElement.scrollTop;
	}

	var byClass = function (cls, el) {
		el = el || document;

		if (el.getElementsByClassName) {
			return el.getElementsByClassName(cls);
		} else {
			var ret = [];
			var re = new RegExp('^|\\s+' + cls + '\\s+|$');
			var tags = el.getElementByTagName('*');

			for (tag in tags) {
				if (re.test(tags[tag].className)) {
					ret.push(tags[tag]);
				}
			}

			return ret;
		}
	}

	var bind = function (el, type, listener) {
		if (el.addEventListener) {
			el.addEventListener(type, listener, false);
		} else {
			el.attachEvent('on' + type, listener);
		}
	}

	var defaults = {
		width: 500,
		height: 400,
		offsetX: 0,
		offsetY: 0,
		zIndex: 9999,
		closeButtonClass: 'popup-close'
	};

	function Modal(el, opts) {
		if (!(this instanceof Modal)) {
			return new Modal(el, opts);
		}

		this.opts = extend({}, extend(defaults, opts));
		this.el = el;
		this.init();
	}

	extend(Modal.prototype, {
		init: function() {
			var opts = this.opts;

			extend(this.el.style, {
				position: 'absolute',
				width: opts.width + 'px',
				height: opts.height + 'px',
				zIndex: opts.zIndex
			});

			this.bindEvent();
		},

		bindEvent: function() {
			var self = this;
			var closeBtn = byClass(this.opts.closeButtonClass)[0];

			bind(closeBtn, 'click', function() {
				self.close();
			});

			bind(document, 'keydown', function (e) {
				e = e || window.event;
				var keycode = e.which || e.keycode;

				if (keycode === 27) {
					self.close();
				}
			});

			bind(window, 'resize', function() {
				self.setPosition();
			});
		},

		open: function() {
			this.el.style.display = 'block';
			this.setPosition();
		},

		close: function() {
			this.el.style.display = 'none';
		},

		setPosition: function() {
			var opts = this.opts;

			var top = scrollY() + Math.max(0, (winH() - opts.height) / 2);
			var left = scrollX() + Math.max(0, (winW() - opts.width) / 2);

			extend(this.el.style, {
				top: top + opts.offsetY + 'px',
				left: left + opts.offsetX + 'px'
			});
		},
	});

	window.Modal = Modal;
	return Modal;
}());

	
(function() {
	var doc = window.document;
	var html = doc.documentElement;

	this.Sidenav = function (options) {
		this.extraPixels = options.extraPixels || 30
		this.width = options.width || 250;
		this.sidenavOpacity = options.sidenavOpacity || 0.5;
		this.isBusy = false;
		this.isOpened = false;
		this.currentOpacity = 0;
		this.currentWidth = 0;


		this.sidenav = options.sidenav;
		this.backdrop = options.backdrop;
		this.content = options.content;

		this.content.classList.add('sidenav-content');
		this.sidenav.classList.add('sidenav');
		setTransformX(this.sidenav, (-1 * this.width) - this.extraPixels);
		this.backdrop.classList.add('sidenav-backdrop');
	}

	Sidenav.prototype.open = function() {
		var self = this;

		if (self.isBusy) {
			return Promise.reject();
		}

		self.isBusy = true;
		html.classList.add('sidenav-visible');

		var promise = this.showHideSidenavBackdrop(true);
		return promise.then(function() {
			self.isBusy = false;
			self.isOpened = true;
		});
	};

	Sidenav.prototype.close = function() {
		var self = this;

		if (self.isBusy) {
			return Promise.reject();
		}

		self.isBusy = true;

		var promise = this.showHideSidenavBackdrop(false);
		return promise.then(function() {
			self.isBusy = false;
			self.isOpened = false;
			html.classList.remove('sidenav-visible');
		});
	};

	Sidenav.prototype.expandTo = function (px) {
		var self = this;

		px = Math.min(px, self.width);
		var opacity = self.sidenavOpacity * px / self.width;

		html.classList.add('sidenav-visible');

		setTransformX(self.sidenav, px - self.width);
		self.backdrop.style.opacity = opacity;
		self.currentOpacity = opacity;
		self.currentWidth = px;
	};

	Sidenav.prototype.showHideSidenavBackdrop = function (show) {
		var self = this;

		var promise = new Promise(function (resolve) {
			var duration = 300;
			var startTime = null;
			requestAnimationFrame(animate);

			function animate (time) {
				var timePassed = 0;
				if (startTime === null) {
					startTime = this;
				} else {
					timePassed = Math.min((time - startTime), duration);
				}

				var targetOpacity = null;
				var targetTransform = null;

				if (show) {
					targetOpacity = easeOutQuad(timePassed, self.currentOpacity, self.sidenavOpacity - self.currentOpacity, duration);
					targetTransform = easeOutQuad(timePassed, self.currentWidth + self.extraPixels, duration);
				}

				setTransformX(self.sidenav, (-1 * self.width) + targetTransform);
				self.backdrop.style.opacity = targetOpacity;

				if (timePassed < duration) {
					requestAnimationFrame(animate);
				} else {
					if (show) {
						self.currentOpacity = self.sidenavOpacity;
						self.currentWidth = self.width;
					} else {
						self.currentOpacity = 0;
						self.currentWidth = 0;
					}

					resolve();
				}
			}
		});

		return promise;
	};

	Sidenav.prototype.initEvents = function() {
		var self = this;
		var fingerId = null;
		var startX = null;
		var startY = null;
		var startWidth = null;
		var wasInSidenav = false;
		var horizontalLock = false;
		var previousX = null;
		var previousY = null;

		self.backdrop.addEventListener('click', function() {
			self.close();
		});

		doc.addEventListener('touchstart', touchstart);

		function touchstart (e) {
			if (self.isBusy) {
				return;
			}

			if (fingerId !== null) {
				return;
			}

			if (e.touches.length !== 1) {
				return;
			}

			if (!self.isOpened && e.touches[0].clientX > 10) {
				return;
			}

			fingerId = e.touches[0].identifier;
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
			startWidth = self.currentWidth;
			wasInSidenav = false;
			horizontalLock = false;
			previousX = -999;
			previousY = -999;

			doc.addEventListener('touchmove', touchmove);
			doc.addEventListener('touchcancel', touchfinish);
			doc.addEventListener('touched', touchfinish);

			function touchmove (e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					if (fingerId === e.changedTouches[i].identifier) {
						if (Math.abs(e.changedTouches[i].clientX - previousX) < 1 && Math.abs(e.changedTouches[i].clientY - previousY) < 1) {
							return;
						}

						previousX = e.changedTouches[i].clientX;
						previousY = e.changedTouches[i].clientY;

						if (self.isOpened) {
							if (!horizontalLock && Math.abs(startX - e.changedTouches[i].clientX) < Math.abs(startY - e.changedTouches[i].clientY)) {
								doTouchFinish(null);
								return;
							}

							horizontalLock = true;

							if (!wasInSidenav && e.changedTouches[i].clientX > self.currentWidth) {
								return;
							}
						}

						wasInSidenav = true;

						self.expandTo(startWidth + (e.changedTouches[i].clientX - Math.min(startX, self.width)));
						return;
						
					}
				}
			}

			function touchfinish (e) {
				for (var i = 0; i < e.changedTouches.length; i++) {
					if (fingerId === e.changedTouches[i].identifier) {
						doTouchFinish(wasInSidenav ? self.currentWidth > self.width / 2 : null);
					}
				}
			} 

			function doTouchFinish (shouldOpen) {
				if (shouldOpen === true) {
					self.open();
				} else if (shouldOpen === false) {
					self.close();
				}
			}

			doc.removeEventListener('touchmove', touchmove);
			doc.removeEventListener('touchcancel', touchfinish);
			doc.removeEventListener('touched', touchstart);
			fingerId = null;
		}
	};

	function setTransformX (domEl, px) {
		domEl.style.transform = "translate3d(" + px + "px, 0, 0)";
		domEl.style["-webkit-transform"] = "translate3d(" + px + "px, 0, 0)";
	}

	function easeOutQuad (t, b, c, d) {
		t /= d;
		return -c * t * (t - 2) + b;
	}
}());
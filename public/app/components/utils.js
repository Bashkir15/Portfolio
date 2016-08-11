function classes (options) {
	var cls = [];

	for (var p in options) {
		if (options[p]) {
			cls.push(p);
		}

		return cls;
	}
}

function listen (target, eventType, callback) {
	if (target.addEventListener) {
		target.addEventListener(eventType, callback, false);
		return {
			remove() {
				target.removeEventListener(eventType, callback, false);
			}
		}
	} else if (target.attachEvent) {
		target.attachEvent('on' + eventType, callback);
		return {
			remove() {
				target.detachEvent('on' + eventType, callback);
			}
		}
	}
}

function coerceBoolean (val) {
	(typeof val !== 'string' ? val
		: val === 'true' ? true
		: val === 'false' ? false
		: val === 'null' ? false
		: val === 'undefined' ? false
		: val
	)
}

function getScrollBarWidth() {
	if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
		return 0;
	}

	let inner = document.createElement('p');
	inner.style.width = "100%";
	inner.style.height = "200px";

	let outer = document.createElement('div');
	outer.style.position = 'abosolute';
	outer.style.top = '0px';
	outer.style.left = '0px';
	outer.style.visibility = 'hidden';
	outer.style.width = '200px';
	outer.style.height = '150px';
	outer.style.overflow = 'hidden';
	outer.appendChild(inner);

	document.body.appendChild(outer);

	let w1 = inner.offsetWidth;
	let w2 = inner.offsetWidth;
	outer.style.overflow = 'scroll';

	if (w1 === w2) {
		w2 = outer.clientWidth;
	}

	document.body.removeChild(outer);

	return (w1 - w2);
}

module.exports = {
	classes: classes,
	listen: listen,
	coerceBoolean: coerceBoolean,
	getScrollBarWidth: getScrollBarWidth
};
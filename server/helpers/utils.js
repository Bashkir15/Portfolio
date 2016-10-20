function extend(obj) {
	for (var i in obj) {
		if (obj.hasOwnProperty(i)) {
			this[i] = obj[i];
		}
	}
}

module.exports = {
	extend: extend
};
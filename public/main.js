function activeUrl() {
	var navLinks = document.querySelectorAll('.nav-link');

	Array.prototype.forEach.call(navLinks, (link) => {
		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	});
}


activeUrl();

window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
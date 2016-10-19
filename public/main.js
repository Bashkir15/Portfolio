import navshrink from './scripts/utils/nav.shrink';

function activeUrl() {
	var navLinks = document.querySelectorAll('.nav-link');

	Array.prototype.forEach.call(navLinks, (link) => {
		if (link.getAttribute("href") == window.location.pathname || window.location.pathname == '') {
			link.classList.add('active');
		}
	});
}


activeUrl();

navshrink();

window.onload = () => {
	setTimeout(() => {
		document.body.classList.add('loaded');
	}, 1000);
}
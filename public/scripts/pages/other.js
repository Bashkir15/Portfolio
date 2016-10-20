import mobileMenu from '../components/mobile.menu';

var navTrigger = document.getElementById('nav-trigger');

var mobileNav = new mobileMenu();

function activeUrl() {
	var navLinks = document.querySelectorAll('.nav-link');

	Array.prototype.forEach.call(navLinks, (link) => {
		if (link.getAttribute("href") == window.location.pathname || window.location.pathername == '') {
			link.classList.add('active');
		}
	});
}

activeUrl();

navTrigger.addEventListener('click', mobileNav.toggle);
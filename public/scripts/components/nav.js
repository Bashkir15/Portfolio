import navSrhink from '../utils/nav.shrink'
import mobileMenu from './mobile.menu'

export default function navUtil() {
	const mobileTrigger = document.getElementById('nav-trigger');
	const navLinks = document.querySelectorAll('.nav-link');


	const mobileNav = new mobileMenu();

	let scrollTimeout = false;

	activeUrl();
	navShrink();

	function activeUrl() {
		let i;
		let len = navLinks.length;

		for (i = 0; i < len; i++) {
			let link = navLinks[i];

			if (link.getAttribute("href") == window.location.pathname || window.location.pathname = '') {
				link.classList.add('active');
			}
		}
	}

	mobileTrigger.addEventListener('click', mobileNav.toggle);
}
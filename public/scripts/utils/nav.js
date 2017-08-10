import navShrink from './navShrink';
import mobileNav from '../components/mobileMenu';

function Nav() {
	const currentLocation  = window.location.pathname;
	const mobileMenuContainer = document.querySelector('.mobile-menu-container');
	const mobileMenu = document.querySelector('.mobile-menu');
	const mobileTrigger = document.querySelector('.nav-trigger');
	const desktopLinks = document.querySelectorAll('.desktop-link');
	const mobileLinks = document.querySelectorAll('.mobile-link');
	const themes = {
		'/': 'landing-theme',
		'/about': 'about-theme',
		'/works': 'works-theme',
		'/process': 'process-theme',
		'/blog': 'blog-theme',
	};
	const links = [...desktopLinks, ...mobileLinks];
	let resizing;

	mobileMenu.classList.add(themes[currentLocation]);
	links.forEach((link) => {
		if (link.href === currentLocation || link.getAttribute("href") === currentLocation) {
			link.classList.add('active');
		} else {
			if (link.classList.contains('active')) {
				link.classList.remove('active');
			}
			return;
		}
	});
		if (window.innerWidth || document.documentElement.clientWidth < 1100) {
			const mobile = new mobileNav();
			mobileTrigger.addEventListener('click', mobile.toggle);
		}

	navShrink();
}

export default Nav;

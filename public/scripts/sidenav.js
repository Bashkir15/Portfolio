import getScrollBarWidth from './utils/get.scrollbar.width';

function openNav() {
	const scrollBarWidth = getScrollBarWidth();
	const backdrop = document.createElement('div');
	const closeSidenav = document.getElementById('close-sidenav');
	backdrop.className = "sidenav-backdrop";
	document.body.appendChild(backdrop);
	document.body.classList.add('modal-open');
	document.getElementById('sidenav').style.width = "250px";
	backdrop.style.opacity = "0.5"

	if (scrollBarWidth !== 0) {
		document.body.style.paddingRight = scrollBarWidth + 'px';
	}

	backdrop.addEventListener('click', closeNav);
	closeSidenav.addEventListener('click', closeNav);
}

function closeNav() {
	document.getElementById('sidenav').style.width = "0px";
	document.body.classList.remove('modal-open');
	document.body.style.paddingRight = "0";
	var backdrop = document.querySelector('.sidenav-backdrop');
	document.body.removeChild(backdrop);
}

module.exports = {
	openNav: openNav,
	closeNav: closeNav
};

var menuToggleButton = document.getElementById('offside-toggle');
var menuCloseButton = document.getElementById('close-button');
var offsideBackdrop = document.getElementById('offside-backdrop');






var portfolio = portfolio || {};

menuToggleButton.addEventListener('click', openSideNav);

function openSideNav() {
	var sidenav = document.getElementById('offside-menu');
	sidenav.classList.add('open');
	offsideBackdrop.classList.add('open');

	menuCloseButton.addEventListener('click', closeSideNav);
}

function closeSideNav() {
	var sidenav = document.getElementById('offside-menu');
	sidenav.classList.remove('open');
	offsideBackdrop.classList.remove('open');
}

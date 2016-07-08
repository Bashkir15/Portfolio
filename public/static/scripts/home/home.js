var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
var menuToggleButton = document.getElementById('offside-toggle');
var menuCloseButton = document.getElementById('close-button');
var offsideBackdrop = document.getElementById('offside-backdrop');
var opinionContent = document.getElementById('opinionated-content');
var opinionTrigger = document.getElementById('open-opinionated');

var portfolio = portfolio || {};

var homePage = {
	setMaxHeight: setMaxHeight,
	alterNav: alterNav,
	openSideNav: openSideNav,
	closeSideNav: closeSideNav,
	myModal: myModal
};

menuToggleButton.addEventListener('click', openSideNav);

window.onresize = function() {
	setMaxHeight();
}
window.addEventListener('scroll', alterNav)
function setMaxHeight() {
	document.getElementById("home-header").style.height = viewportHeight - 2 + "px";
	document.getElementById("home-header").style.width = viewportWidth + "px";
}

opinionTrigger.addEventListener('click', function() {
	myModal.open();
});

function alterNav() {
	var offset = window.pageYOffset ? window.pageYOffset : document.documentElement.scrollTop
	var nav = document.getElementById('nav');


	nav.classList.add(offset > 10 ? 'scrolled' : '');

	if (offset < 10 && nav.classList.contains('scrolled')) {
		nav.classList.remove('scrolled');
	}

	if (offset < 300 && nav.classList.contains('final-scrolled')) {
		nav.classList.remove('final-scrolled')
	}

	if (offset > 300) {
		nav.classList.add('final-scrolled');
	}
}

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

var myModal = new portfolio.Modal.Modal({
	content: opinionContent,
});

setMaxHeight();

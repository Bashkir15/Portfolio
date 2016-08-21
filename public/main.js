import sidenav from './scripts/sidenav.js';
import canvasDraw from './scripts/canvas.js';
import entrance from './scripts/scroll.in.js';
import dialog from './scripts/dialog.js';
import scrollNav from './scripts/scroll.nav.js';

var sidenavTrigger = document.getElementById('open-sidenav');
var sidenavMenu = document.getElementById('sidenav-container');
var canvas = document.getElementById('banner');
var opinionDialogTrigger = document.getElementById('open-opinionated');

if (sidenavTrigger) {
	var leftNav = new sidenav();

	sidenavTrigger.addEventListener('click', leftNav.open, false);
	//sidenavMenu.addEventListener('transitionend', sidenav.onTransitionEnd, false);
}

if (canvas) {
	canvas.addEventListener('mousemove', canvasDraw.MouseMove, false);
	canvas.addEventListener('mouseout', canvasDraw.MouseOut, false);
}

if (opinionDialogTrigger) {
	var opinionDialogContent = document.getElementById('opinionated-dialog');
	var opinionDialog = new dialog({
		content: opinionDialogContent
	});

	opinionDialogTrigger.addEventListener('click', opinionDialog.open);
}

addEventListener('DOMContentLoaded', entrance.init, false);
addEventListener('scroll', entrance.viewportChange, false);
addEventListener('resize', entrance.viewportChange, false);
window.onload = scrollNav.init();
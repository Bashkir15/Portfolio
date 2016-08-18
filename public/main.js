import sidenav from './scripts/sidenav.js';
import canvasDraw from './scripts/canvas.js';
import entrance from './scripts/scroll.in.js';
import dialog from './scripts/dialog.js';

var sidenavTrigger = document.getElementById('open-sidenav');
var canvas = document.getElementById('banner');
var opinionDialogTrigger = document.getElementById('open-opinionated');

if (sidenavTrigger) {
	sidenavTrigger.addEventListener('click', sidenav.openNav);
}

if (canvas) {
	canvas.addEventListener('mousemove', canvasDraw.MouseMove, false);
	canvas.addEventListener('mouseout', canvasDraw.MouseOut, false);
}

if (opinionDialogTrigger) {
	var opinionDialog = new dialog();

	opinionDialogTrigger.addEventListener('click', opinionDialog.open);
}

addEventListener('DOMContentLoaded', entrance.init, false);
addEventListener('scroll', entrance.viewportChange, false);
addEventListener('resize', entrance.viewportChange, false);
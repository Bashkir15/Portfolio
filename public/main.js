import sidenav from './scripts/sidenav.js';
import canvasDraw from './scripts/canvas.js';
import entrance from './scripts/scroll.in.js';

var sidenavTrigger = document.getElementById('open-sidenav');
var canvas = document.getElementById('banner');

if (sidenavTrigger) {
	sidenavTrigger.addEventListener('click', sidenav.openNav);
}

if (canvas) {
	canvas.addEventListener('mousemove', canvasDraw.MouseMove, false);
	canvas.addEventListener('mouseout', canvasDraw.MouseOut, false);
}

addEventListener('DOMContentLoaded', entrance.init, false);
addEventListener('scroll', entrance.viewportChange, false);
addEventListener('resize', entrance.viewportChange, false);
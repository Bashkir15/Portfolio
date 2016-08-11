var keyword = "Forrest",
canvas,
context,
bgCanvas,
bgContext,
density = 13,
particles = [],
color = '#fff0a4',
mouse = { x:0, y:0 },
isDrawing = false,
canvasW,
canvasH;

this.initialize = function (canvas_id) {
	reload(canvas_id);

	window.onresize = function (event) {
		reload(canvas_id);
	}
}

var reload = function (canvas_id) {
	canvas = document.getElementById(canvas_id);

	if (!window.HTMLCanvasElement) {
		return false;
	}

	context = canvas.getContext('2d');
	canvasW = window.innerWidth;
	canvasH = 300;

	canvas.width = canvasW;
	canvas.height = canvasH;

	bgCanvas = document.createElement('canvas');
	bgContext = bgCanvas.getContext('2d');

	bgCanvas.width = canvasW;
	bgCanvas.height = canvasH;

	prepare();
	setupParticles();
	draw();
};

var prepare = function() {
	bgContext.font = "300px 'sans-serif'";
	bgContext.fillText(keyword, (canvasW/2) - (Math.round(bgContext.measureText(keyword).width/2)), 260);
};














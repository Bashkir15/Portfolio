webpackHotUpdate(0,{

/***/ 16:
/***/ function(module, exports) {

	'use strict';

	var keyword = "Forrest",
	    canvas,
	    context,
	    bgCanvas,
	    bgContext,
	    density = 13,
	    particles = [],
	    color = '#fff0a4',
	    mouse = { x: 0, y: 0 },
	    isDrawing = false,
	    canvasW,
	    canvasH;

	function initialize(canvas_id) {
		reload(canvas_id);

		window.onresize = function (event) {
			reload(canvas_id);
		};
	}

	function reload(canvas_id) {
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
	}

	function prepare() {
		bgContext.font = "300px 'sans-serif'";
		bgContext.fillText(keyword, canvasW / 2 - Math.round(bgContext.measureText(keyword).width / 2), 260);
	}

	function setupParticles() {
		particles = [];

		var imageData,
		    image_Data,
		    pixel,
		    width = 0,
		    i = 0,
		    slide = false;

		imageData = bgContext.getImageData(0, 0, canvasW, canvasH);
		image_Data = imageData.data;

		for (var height = 0; height < canvasH; height += density) {
			++i;
			slide = (i & 2) == 0;
			width = 0;

			if (slide == true) {
				width += 6;
			}

			for (width; width < canvasW; width += density) {
				pixel = image_Data[(width + height * canvasW) * 4 - 1];

				if (pixel == 255) {
					particles.push({
						color: color,
						x: width,
						y: height
					});
				}
			}
		}
	}

	function draw() {
		context.clearRect(0, 0, canvasW, canvasH);

		var dx,
		    dy,
		    sqrDist,
		    scale = 1;

		for (var i = 0, len = particles.length; i < len; ++i) {
			context.beginPath();

			context.moveTo(x, y - height / 2);
			context.lineTo(x + width / 2, y - height / 4);
			context.lineTo(x + width / 2, y + height / 4);
			context.lineTo(x, y + height / 2);
			context.lineTo(x - width / 2, y + height / 4);
			context.lineTo(x - width / 2, y - height / 4);
			context.lineTo(x, y - height / 2);

			context.closePath();
			context.fill();
		}
	}

	var mouse = {
		x: 0,
		y: 0,
		o: false
	};

	function MouseMove(e) {
		mouse.x = e.offsetX || e.layerX - canvas.offsetLeft;
		mouse.y = e.offsetY || e.layerY - canvas.offsetTop;

		if (!isDrawing) {
			isDrawing = true;

			var drawTimeout = setTimeout(function () {
				draw();
				isDrawing = false;
			}, 60);
		}
	}

	function MouseOut(e) {
		isDrawing = false;
		clearTimeout(drawTimeout);
		draw();
	}

	module.exports = {
		MouseMove: MouseMove,
		MouseOut: MouseOut
	};

/***/ }

})
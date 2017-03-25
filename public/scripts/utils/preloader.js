
export default function preloader() {
	let animation;

	init();

	function init() {
		let canvas = document.querySelector('.preloader-canvas');
		let t = 0;
		let w = canvas.width = window.innerWidth;
		let h = canvas.height = window.innerHeight;

		let context = canvas.getContext('2d');
		context.globalCompositeOperate = 'lighter';

		animate();

		function animate() {
			console.time('start');
			context.clearRect(0, 0, w, h);

			t += 1;

			for (let i = 0; i < 5000; i++) {
				let f = 0.05 + ((Math.sin(t * 0.00002) / Math.PI) * 0.2);
				let r = (Math.min(w, h)) * (Math.cos((t + i) * f) / Math.PI * 1.5);

				let x = 0.5 + (Math.sin(i) * r + (canvas.width / 2)) | 0;
				let y = 0.5 + (Math.cos(i) * r + (canvas.height / 2)) | 0;

				context.fillStyle = 'rgba(0, 255, 255, 0.5)';
				context.fillRect(x, y, 1.5, 1.5);

			}

			animation = setTimeout(animate, 16);

			console.timeEnd('start');
		}
	}

	function handleDoc() {
		setTimeout(finishLoad, 1500);
	}

	function finishLoad() {
		let canvas = document.querySelector('.preloader-canvas');

		document.body.classList.add('loaded');
		canvas.parentElement.classList.add('finished');
		canvas.parentElement.removeChild(canvas);
		clearTimeout(animation);

		document.removeEventListener('DOMContentLoaded', handleDoc);
	}

	document.addEventListener('DOMContentLoaded', handleDoc);

	/*HTMLDocument.prototype.ready = () => {
		return new Promise((resolve, reject) => {
			let startTime = console.time('start');
			let endTime;

			function renderDoc() {
				endTime = console.timeEnd('start');
				resolve(document, startTime, endTime);
			}

			if (document.readyState === 'complete') {
				endTime = console.timeEnd('start');
				resolve(document, startTime, endTime);
			} else {
				document.addEventListener('DOMContentLoaded', renderDoc);
			}
		});
	}

	document.ready().then((startTime, endTime) => {
		let canvas = document.querySelector('.preloader-canvas');


		if (endTime - startTime > 300) {
			document.body.classList.add('loaded');
			canvas.parentElement.classList.add('finished');
			canvas.parentElement.removeChild(canvas);
		} else {
			setTimeout(() => {
				document.body.classList.add('loaded');
				canvas.parentElement.classList.add('finished');
				canvas.parentElement.removeChild(canvas);
			}, 2000);
		}
	}); */

}
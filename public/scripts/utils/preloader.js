
export default function preloader() {
	const preLoader = document.querySelector('.preloader');

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
			//context.clearRect(0, 0, w, h);

			t += 1;

			for (let i = 0; i < 5000; i++) {
				let f = 0.05 + ((Math.sin(t * 0.00002) / Math.PI) * 0.2);
				let r = (Math.min(w, h)) * (Math.cos((t + i) * f) / Math.PI * 1.5);

				let x = Math.sin(i) * r + (canvas.width / 2);
				let y = Math.cos(i) * r + (canvas.height / 2);

				context.fillStyle = 'rgba(0, 255, 255, 0.5)';
				context.fillRect(x, y, 1.5, 1.5);

			}

			setTimeout(animate, 16);
		}
	}

	HTMLDocument.prototype.ready = () => {
		return new Promise((resolve, reject) => {
			let startTime = console.time('start');
			let endTime;

			if (document.readyState === 'complete') {
				endTime = console.timeEnd('start');
				resolve(document, startTime, endTime);
			} else {
				document.addEventListener('DOMContentLoaded', () => {
					endTime = console.timeEnd('start');
					resolve(document, startTime, endTime);
				});
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
	});

}
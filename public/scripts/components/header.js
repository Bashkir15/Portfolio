export function header() {
	const canvas = document.getElementById('landing-header');
	const headerSection = document.querySelector('.landing-header');
	const context = canvas.getContext('2d');


	canvas.width = window.innerWidth;
	canvas.height = headerSection.scrollHeight;
	const backgroundGradient = context.createLinearGradient(0,0,0, canvas.height);

	backgroundGradient.addColorStop(0, `rgba(23, 30, 38, 0.7)`);
	backgroundGradient.addColorStop(1, `rgba(63, 88, 107, 0.7)`);


	let groundHeight = canvas.height * 0.15;
	let resizeTimeout;

	function Star() {
		this.radius = (Math.random() * 10) + 5;
		this.x = this.radius + (canvas.width - this.radius * 2) * Math.random();
		this.y = -10;
		this.dx = (Math.random() - 0.5) * 20;
		this.dy = 30;
		this.gravity = .5;
		this.friction = .54;

		this.update = () => {
			if (this.y + this.radius + this.dy >= canvas.height - groundHeight) {
				this.dy = -this.dy * this.friction;
				this.dx *= this.friction;
				this.radius -= 3;

				// handle explosions
			}

			if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx < 0) {
				this.dx = -this.dx;
				this.dx *= this.friction;
				// handle explosions
			}
			
			this.x += this.dx;
			this.y += this.dy;

			this.draw();

			// draw particles
		}

		this.draw = () => {
			context.save();
			context.beginPath();
			context.arc(this.x, this.y, Math.abs(this.radius), 0, Math.PI * 2, false);

			context.shadowColor = `#e3eaef`;
			context.shadowBlur = 20;
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;

			context.fillStyle = '#e3eaef';
			context.fill();
			context.closePath();
			context.restore();

		}
	}

	function createMoutainRange(height, yPos, amount, color) {
		for (let i = 0; i < amount; i++) {
			let width = canvas.width / amount;

			// draw the moutainer
			context.beginPath();
			context.moveTo(i * width, yPos);
			context.lineTo(i * width + width + 325, yPos);

			// draw the peak
			context.lineTo(i * width + width / 2, yPos - height / 2);
			context.lineTo(i * width - 325, yPos);
			context.fillStyle = color;
			context.fill();
			context.closePath();
		}
	}

	function handleResize() {
		if (!resizeTimeout) {
			setTimeout(() => {
				canvas.width = window.innerWidth;
				canvas.height = headerSection.scrollHeight;
				resizeTimeout = true;
			}, 150);
		}

		resizeTimeout = false;
	}

	function animate() {
		window.requestAnimationFrame(animate);
		context.fillStyle = backgroundGradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		createMoutainRange(canvas.height / .55, canvas.height, 1, `#384551`);
		createMoutainRange(canvas.height / .7, canvas.height, 2, `#2b3843`);
		createMoutainRange(canvas.height / 1.2, canvas.height, 3, `#26333e`);

		context.fillStyle = "#182028";
		context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);
	}

	animate();

	window.addEventListener('resize', handleResize, false);
}
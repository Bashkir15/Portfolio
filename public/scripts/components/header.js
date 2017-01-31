export function header() {
	const canvas = document.getElementById('landing-header');
	const headerSection = document.querySelector('.landing-header');
	const context = canvas.getContext('2d');
	const stars = [];
	const explosions = [];
	const miniStars = [];
	const backgroundGradient = context.createLinearGradient(0,0,0, canvas.height);

	let groundHeight = canvas.height * 0.15;
	let randomSpawnRate = Math.floor((Math.random() * 25) + 60);
	let timer = 0;
	let resizeTimeout;


	canvas.width = window.innerWidth;
	canvas.height = headerSection.scrollHeight;

	backgroundGradient.addColorStop(0, `rgba(23, 30, 38, 0.7)`);
	backgroundGradient.addColorStop(1, `rgba(63, 88, 107, 0.7)`);


	function Star() {
		this.radius = (Math.random() * 10) + 5;
		this.x = this.radius + (canvas.width - this.radius * 2) * Math.random();
		this.y = -10;
		this.dx = (Math.random() - 0.5) * 20;
		this.dy = 30;
		this.gravity = .5;
		this.friction = .54;

		this.update = function() {
			let len;

			if (this.y + this.radius + this.dy >= canvas.height - groundHeight) {
				this.dy = -this.dy * this.friction;
				this.dx *= this.friction;
				this.radius -= 3;

				explosions.push(new Explosion(this));
			} else {
				this.dy += this.gravity;
			}

			if (this.x + this.radius + this.dx >= canvas.width || this.x - this.radius + this.dx < 0) {
				this.dx = -this.dx;
				this.dx *= this.friction;
				explosions.push(new Explosion(this));
			}
			
			this.x += this.dx;
			this.y += this.dy;

			this.draw();

			len = explosions.length;

			for (let i =0; i < len; i++) {
				explosions[i].update();
			}

			
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

	function Particle(x, y, dx, dy) {
		this.x = x;
		this.y = y;
		this.dx = dx;
		this.dy = dy;
		this.gravity = .09;
		this.friction = 0.88;
		this.timeToLive = 3;
		this.opacity = 1;
		this.size = {
			width: 2,
			height: 2
		};

		this.update = () => {
			if (this.y + this.size.height + this.dy >= canvas.height - groundHeight) {
				this.dy = -this.dy * this.friction;
				this.dx *= this.friction;
			} else {
				this.dy += this.gravity;
			}

			if (this.x + this.size.width + this.dx >= canvas.width || this.x + this.dx < 0) {
				this.dx = -this.dx;
				this.dx *= this.friction;
			}

			this.x += this.dx;
			this.y += this.dy;

			this.draw();

			this.timeToLive -= 0.01;
			this.opacity -= 1 / (this.timeToLive / 0.01);
		}

		this.draw = () => {
			context.save();
			context.fillStyle = `rgba(227, 234, 239, ${this.opacity})`;
			context.shadowColor = '#e3eaef';
			context.shadowBlur = 20;
			context.shadowOffsetX = 0;
			context.shadowOffsetY = 0;
			context.fillRect(this.x, this.y, this.size.width, this.size.height);
			context.restore();
		}

		this.isAlive = () => {
			return 0 <= this.timeToLive;
		}
	}

	function Explosion(star) {
		this.particles = [];

		this.init = (parentStar) => {
			for (let i = 0; i < 8; i++) {
				let velocity = {
					x: (Math.random() - 0.5) * 5,
					y: (Math.random() - 0.5) * 15
				};

				this.particles.push(new Particle(parentStar.x, parentStar.y, velocity.x, velocity.y));
			}
		}

		this.init(star);

		this.update = function() {
			for (let i = 0; i < this.particles.length; i++) {
				this.particles[i].update();

				if (this.particles[i].isAlive() == false) {
					this.particles.splice(i, 1);
				}
			}
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
		let sLen = stars.length;
		let eLen = explosions.length;

		window.requestAnimationFrame(animate);
		context.fillStyle = backgroundGradient;
		context.fillRect(0, 0, canvas.width, canvas.height);

		createMoutainRange(canvas.height / .55, canvas.height, 1, `#384551`);
		createMoutainRange(canvas.height / .7, canvas.height, 2, `#2b3843`);
		createMoutainRange(canvas.height / 1.2, canvas.height, 3, `#26333e`);

		context.fillStyle = "#182028";
		context.fillRect(0, canvas.height - groundHeight, canvas.width, groundHeight);

		for (let i = 0; i < stars.length; i++) {
			stars[i].update();

			if (stars[i].radius <= 0) {
				stars.splice(i, 1);
			}
		}

		for (let i = 0; i < eLen; i++) {
			if (explosions[i].length <= 0) {
				explosions.splice(i, 1);
			}
		}

		timer++;

		if (timer % randomSpawnRate == 0) {
			stars.push(new Star());
			randomSpawnRate = Math.floor((Math.random() * 10) + 75);
		}
	}

	animate();

	window.addEventListener('resize', handleResize, false);
}
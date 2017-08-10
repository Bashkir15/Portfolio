
function Carousel(descriptions) {
	const slides = document.querySelectorAll('.slide');
	const carousel = document.querySelector('.works-carousel');
	const carouselButtons = document.querySelectorAll('.carousel-button');
	const carouselInfo = document.querySelector('.works-carousel-info');
	const carouselTitle = document.querySelector('.works-title');
	const carouselDescription = document.querySelector('.works-description');
	const carouselContent = document.querySelector('.works-content');
	const carouselDots = document.querySelectorAll('.carousel-dot');

	let currentDegree = 0;
	let currentIndex = 0;
	let previousIndex;

	function switchActiveDot(previousIndex) {
		if (previousIndex && previousIndex !== 0) {
			carouselDots[previousIndex].classList.remove('active');
			carouselDots[currentIndex].classList.add('active');
		} else if (previousIndex === 0) {
			carouselDots[0].classList.remove('active');
			carouselDots[currentIndex].classList.add('active');
		} else {
			carouselDots[0].classList.add('active');
		}
	}

	function switchIndex(index) {
		previousIndex = currentIndex;
		if (index === 0) {
			currentDegree = 0;
		} else if (index > currentIndex) {
			currentDegree = currentDegree - index * 60;
		} else if (index < currentIndex) {
			currentDegree = currentDegree + index * 60;
		}
		currentIndex = index;
		carousel.style.transform = `rotateY(${currentDegree}deg)`;
		injectContent(descriptions[currentIndex], previousIndex);
	}

	function injectContent(description, previousIndex) {
		if (carouselInfo.classList.contains('shown')) {
			carouselInfo.classList.remove('shown');
		}
		switchActiveDot(previousIndex);
		const timeout = window.setTimeout(() => {
			carouselTitle.innerText = description.title;
			carouselDescription.innerText = description.content;
			carouselContent.innerText = description.content2;
			carouselInfo.classList.add('shown');
			window.clearTimeout(timeout);
		}, 400);
	}

	function rotate(e) {
		const { name } = e.target;
		const previousIndex = currentIndex;

		if (name === 'next') {
			currentDegree = currentDegree - 60;
			if (currentIndex === 5) {
				currentIndex = 0;
			} else {
				currentIndex = currentIndex + 1;
			}
		}
		if (name === 'prev') {
			currentDegree = currentDegree + 60;
			if (currentIndex === 0) {
				currentIndex = 5;
			} else {
				currentIndex = currentIndex - 1;
			}
		}

		carousel.style.transform = `rotateY(${currentDegree}deg)`;
		injectContent(descriptions[currentIndex], previousIndex);
	}

	for (let i = 0; i < carouselDots.length; i++) {
		carouselDots[i].addEventListener('click', () => {
			switchIndex(i);
		});
	}
	for (const button of carouselButtons) {
		button.addEventListener('click', rotate);
	}

	injectContent(descriptions[0]);
}

export default Carousel;


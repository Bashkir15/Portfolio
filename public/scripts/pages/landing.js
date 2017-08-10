import 'sass/views/pages/landing.sass';
import Contact from '../components/contact'
import Nav from '../utils/nav';

(() => {
	const slides = document.querySelectorAll('.slide');
    const carousel = document.querySelector('.works-carousel');
    const carouselButtons = document.querySelectorAll('.carousel-button');
    const carouselInfo = document.querySelector('.works-carousel-info');
    const carouselTitle = document.querySelector('.works-title');
    const carouselDescription = document.querySelector('.works-description');
    const carouselContent2 = document.querySelector('.works-content');
    const carouselDots = document.querySelectorAll('.carousel-dot');

    let currentDeg = 0;
    let currentIndex = 0;
    let prevIndex;
    let maxIndex = 5;

    const descriptions = {
        0: {
            title: 'Scripted Blog',
            content: `This is my personal blog where I write about code, science, and the things that interest me`,
            content2: `This blog is currently being integrate as part of this site. The blog is built with React, Redux, Node, GraphQL, Service works, and a whole other gamit of tools. It is designed to be a Progressive Web Application and respond well everywhere`
        },

        1: {
            title: 'Opinionable',
            content: 'Opinionable is a social sharing and news-aggregrate application original build with the MEAN stack',
            content2: `Users have access to a multitude of features to heighten their experience and let them interact with
                the world and receieve the information that they prioritize`,
        },

        2: {
            title: 'Driver',
            content: 'Driver is a task-management and efficiency optimization application',
            content2: 'With Driver project managers, and even household users, can create, organize, and delegate tasks to others; provide incentives; track completion and much more',
        },

        3: {
            title: 'Golondrina',
            content: 'Golondrina displays the works of local up and coming Denton artist Erika Tolbert',
            content2: `I want to make this project a focus not because of the application which is very simple, but because of her great
                mission and what she strives to accomplish. I'd highly reccomend checking out her work`,
        },

        4: {
            title: 'Wheelhouse',
            content: 'Ever wanted to start an application only to be overwhelmed by all the considerations of tech and features?',
            content2: `You aren't alone. This Node based boilerplate seeks to provide a secure, production ready means of deploying applications
             quickly by letting you pick and chose between a wide selection of pre-built features`,
        },

        5: {
            title: 'Softserve',
            content: 'Softserver is a Javascript UI library focused on modularity and extensibility',
            content2: `Build with the most modern best practices, Softserve wants to make developing beautiful, interactive UIs simple.
                Currently Softserve is a VanillaJS library but is being ported to React`,
        },
    };

    function switchActiveDot(prevIndex) {
        if (prevIndex && prevIndex !== 0) {
            carouselDots[prevIndex].classList.remove('active');
            carouselDots[currentIndex].classList.add('active');
        } else if (prevIndex === 0) {
            carouselDots[0].classList.remove('active');
            carouselDots[currentIndex].classList.add('active');
        } else {
            carouselDots[0].classList.add('active');
        }
    }

    function switchIndex(index) {
        prevIndex = currentIndex;
        console.log(currentIndex);
        if (index === 0) {
            currentDeg = 0;
        } else if (index > currentIndex) {
            currentDeg = currentDeg - index * 60;
        } else if (index < currentIndex) {
            currentDeg = currentDeg + index * 60;
        }
        currentIndex = index;
        console.log(currentIndex);
        carousel.style.transform = `rotateY(${currentDeg}deg)`;
        injectContent(descriptions[currentIndex], prevIndex);
    }

    function injectContent(description, prevIndex) {
        if (carouselInfo.classList.contains('shown')) {
            carouselInfo.classList.remove('shown');
        }
        switchActiveDot(prevIndex);
        const timeout = window.setTimeout(() => {
            carouselTitle.innerText = description.title;
            carouselDescription.innerText = description.content;
            carouselContent2.innerText = description.content2;
            carouselInfo.classList.add('shown');
            window.clearTimeout(timeout);
        }, 400);
    }

    function rotate(e) {
        const { name } = e.target;
        const prevIndex = currentIndex;

        if (name === 'next') {
            currentDeg = currentDeg - 60;
            if (currentIndex === 5) {
                currentIndex = 0;
            } else {
                currentIndex = currentIndex + 1;
            }
        }
        if (name === 'prev') {
            currentDeg = currentDeg + 60;
            if (currentIndex === 0) {
                currentIndex = 5;
            } else {
                currentIndex = currentIndex - 1;
            }
        }

        carousel.style.transform = `rotateY(${currentDeg}deg)`;
        injectContent(descriptions[currentIndex], prevIndex);
    }

    if (carouselDots) {
    for (let i = 0; i < carouselDots.length; i++) {
        const dot = carouselDots[i];
        dot.addEventListener('click', () => {
            switchIndex(i);
        });
    }
	}
    if (carouselButtons) {
	    for (const button of carouselButtons) {
	        button.addEventListener('click', rotate);
	    }
	}

    injectContent(descriptions[0]);

    Nav();
	Contact();
})();

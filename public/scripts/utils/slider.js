export default function slider(slides) {
    const length = slides.length;
    let activeSlide = 0;

    function start() {
        slides[0].classList.add('active');
        activeSlide += 1;
        setInterval(() => {
            if (activeSlide !== length) {
                slides[activeSlide].classList.add('active');
                setTimeout(() => {
                    slides[activeSlide - 1].classList.remove('active');
                    activeSlide += 1;
                }, 1000);
            } else {
                slides[0].classList.add('active');
                setTimeout(() => {
                    slides[activeSlide - 1].classList.remove('active');
                    activeSlide = 1;
                }, 1000);
            }
        }, 2500);
    }

    start();
}
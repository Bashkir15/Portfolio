import scrollIn from '../utils/scroll.in';

export default function works() {
    const scroller = new scrollIn();
    let scrollTimeout;

    function scrollThrottle() {
        if (!scrollTimeout) {
            window.requestAnimationFrame(handleScroll);
        }

        scrollTimeout = false;
    }

    function handleScroll() {
        scroller.viewPortChange();
        scrollTimeout = true;
    }

    window.addEventListener('DOMContentLoaded', scroller.init);
    window.addEventListener('scroll', scrollThrottle);
    window.addEventListener('resize', scrollThrottle);
}
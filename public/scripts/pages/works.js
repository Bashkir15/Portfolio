import 'sass/views/pages/works.sass';
import scrollIn from '../utils/scrollIn';
import Nav from '../utils/nav';
(() => {
    const scroller = new scrollIn();
    let scrollTimeout;

    function scrollThrottle() {
        if (!scrollTimeout) {
            scrollTimeout = window.setTimeout(() => {
                scrollTimeout = false;
                scroller.viewPortChange();
            }, 300);
            scrollTimeout = true;
        }
    }

    Nav();
    window.addEventListener('DOMContentLoaded', scroller.init);
    window.addEventListener('scroll', scrollThrottle);
    window.addEventListener('resize', scrollThrottle);
})();

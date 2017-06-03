import routes from './scripts/pages/routes';
import mobileMenu from './scripts/components/mobile.menu';

function start() {
    const mobileTrigger = document.querySelector('.nav-trigger');

    if (window.innerWidth || document.documentElement.clientWidth < 1100) {
        const mobile = new mobileMenu();
        mobileTrigger.addEventListener('click', mobile.toggle);
    }

    routes();
}

start();












import landing from './landing'
import works from './works';

export default function routes() {
    if (window.location.pathname == '/works') {
        works();
    } else if (window.location.pathname == '/about') { 

    } else if (window.location.pathname.includes('/work')) {

    } else {
        landing();
    }
}
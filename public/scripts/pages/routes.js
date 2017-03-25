import landing from './landing'
import about from './about'

export default function routes() {
	if (window.location.pathname == '/about') {
		about();
	} else if (window.location.pathname == '/works') {

	} else if (window.location.href.includes('/work')) {

	} else {
		landing();
	}
}
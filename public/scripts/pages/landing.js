import contact from '../components/contact'
import slider from '../utils/slider';

function landing() {
    const slides = document.querySelectorAll('.slide');

    slider(slides);
	contact();
}

export default landing
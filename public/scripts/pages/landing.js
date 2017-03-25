import contact from '../components/contact'
import scrollTo from '../utils/scroll.to';
import heading from '../components/heading'

function landing() {
	const contactScroller = document.getElementById('contact-scroller');
	const contactContainer = document.getElementById('contact-container');


	heading();
	contact();

	contactScroller.addEventListener('click', () => {
		scrollTo.smoothScroll(contactContainer.offsetTop);
	});

}

export default landing
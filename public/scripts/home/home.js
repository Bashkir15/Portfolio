import contact from './contact.js';

function init() {
	var sendMessage = document.getElementById('contact-send');


	sendMessage.addEventListener('click', contact.message);
}

export default {
	init: init
}
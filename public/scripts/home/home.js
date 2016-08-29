import contact from './contact.js';
import dialog from '../components/dialog.js';
import notify from '../components/notify.js';
import scrollIn from '../scroll.in.js';
import scrollTo from '../utils/scrollTo.js';

function init() {

	// Home Header

	var contactScroll = document.getElementById('scrollToContact');

	contactScroll.addEventListener('click', function() {
		scrollTo.smoothScroll(document.getElementById('home-contact').offsetTop);
	});

	// Home Dialogs


	var opinionDialogTrigger = document.getElementById('open-opinionated');
	var opinionDialogContent = document.getElementById('opinionated-dialog');
	var opinionClose = document.getElementById('close-opinionated');


	var opinionDialog = new dialog({
		content: opinionDialogContent
	});


	opinionDialogTrigger.addEventListener('click', opinionDialog.open, false);
	opinionClose.addEventListener('click', opinionDialog.close, false);


	// Home Skills Scroll In
	var scrollEntrance = new scrollIn();

	window.addEventListener('DOMContentLoaded', scrollEntrance.init, false);
	window.addEventListener('scroll', scrollEntrance.viewPortChange);
	window.addEventListener('resize', scrollEntrance.viewPortChange);

	// Home Contact
	var contactSubmit = document.getElementById('contact-send');

	contactSubmit.addEventListener('click', contact.message);
		var successContent = document.getElementById('contact-success');
		var successNotify = new notify({
			content: successContent,
			timeout: 1000
		});

	window.addEventListener('message-delivered', successNotify.open);
}

export default {
	init: init
}
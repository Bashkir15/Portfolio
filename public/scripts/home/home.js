import contact from './contact.js';
import dialog from '../components/dialog.js';
import notify from '../components/notify.js';
import scrollIn from '../scroll.in.js';

function init() {

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

	var sendMessage = document.getElementById('contact-send');

	sendMessage.addEventListener('click', contact.message);


	// Home notifications

	var contactTrigger = document.getElementById('contact-trigger');
	var contactSuccessContent = document.getElementById('contact-success');
	var contactSuccess = new notify({
		content: contactSuccessContent,
		posY: 'bottom',
		posX: 'right',
		timeout: 100
	});

	contactTrigger.addEventListener('click', contactSuccess.open);


}

export default {
	init: init
}
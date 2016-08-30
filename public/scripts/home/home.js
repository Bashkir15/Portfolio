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


	var opinionDialogTrigger = document.getElementById('open-opinionated-button');
	var opinionDialogContent = document.getElementById('opinionated-dialog');
	var applicationBoilerDialogTrigger = document.getElementById('open-application-boiler-button');
	var applicationBoilerDialogContent = document.getElementById('application-boiler-dialog');

	var opinionDialog = new dialog({
		content: opinionDialogContent
	});

	var applicationBoilerDialog = new dialog({
		content: applicationBoilerDialogContent
	});


	opinionDialogTrigger.addEventListener('click', opinionDialog.open, false);
	applicationBoilerDialogTrigger.addEventListener('click', applicationBoilerDialog.open, false);

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
			timeout: 1000,
			type: 'success'
		});

		var failureContent = document.getElementById('contact-failure');
		var failureNotify = new notify({
			content: failureContent,
			timeout: 1000,
			type: 'danger'
		});

	window.addEventListener('message-delivered', successNotify.open);
	window.addEventListener('message-failed', failureNotify.open);
}

export default {
	init: init
}
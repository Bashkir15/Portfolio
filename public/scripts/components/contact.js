import { onBlur, removeBlur } from '../utils/validator'
import notifications from './notifications'
import axios from 'axios'

export default function contact() {
	const formWrapper = document.querySelectorAll('.form-wrapper');
	const formInputs = document.querySelectorAll('.contact-input');
	const emailInput = document.getElementById('contact-email');
	const nameInput = document.getElementById('contact-name');
	const subjectInput = document.getElementById('contact-subject');
	const messageInput = document.getElementById('contact-message');
	const submitButton = document.getElementById('contact-send');
	const successContent = document.getElementById('contact-success');
	const failureContent = document.getElementById('contact-failure');
	const errorContent = document.getElementById('contact-error');

	const successNotify = new notifications({
		content: successContent,
		timeout: 2000,
		type: 'success'
	});

	const failureNotify = new notifications({
		content: failureContent,
		timeout: 2000,
		type: 'danger'
	});

	const errorNotify = new notifications({
		content: errorContent,
		timeout: 2000,
		type: 'warning'
	});

	onBlur(formInputs);

	function sendMessage() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('contact-loading');
		

			axios.post('/contact', {
				name: nameInput.value,
				email: emailInput.value,
				subject: subjectInput.value,
				message: messageInput.value,

				headers: {
					'Content-Type': 'Application/Json'
				}
			})
			.then((response) => {
				if (response.data.success) {
					resetForm();

					submitButton.classList.remove('form-loading');
					submitButton.classList.add('form-success');

					let success = new Event('message-sent');

					window.dispatchEvent(success);
				} else {
					submitButton.classList.remove('contact-loading');

					let failure = new Event('message-failed');

					window.dispatchEvent(failure);
				}
			})
		} else {
			let error = new Event('message-error');
			window.dispatchEvent(error);
		}
	}

	function resetForm() {
		let length = formInputs.length;

		for (i = 0; i < length; i++) {
			formInputs[i].value = '';
		}
	}

	submitButton.addEventListener('click', sendMessage, false);
	window.addEventListener('message-sent', successNotify.open, false);
	window.addEventListener('message-failed', failureNotify.open, false);
	window.addEventListener('message-error', errorNotify.open, false);

}
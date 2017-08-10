import { onBlur } from '../utils/validator'
import notifications from './notifications'

export default function contact() {
	const formWrapper = document.querySelectorAll('.field');
	const formInputs = document.querySelectorAll('.contact-input');
	const submitButton = document.querySelector('.contact-submit');
	const successContent = document.getElementById('contact-success');
	const failureContent = document.getElementById('contact-failure');
	const errorContent = document.getElementById('contact-error');
	const contactState = {
		name: '',
		email: '',
		phone: '',
		message: '',
	};

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

	function updateState(node) {
		const value = node.value;

		contactState[node.name] = value;
	}

	onBlur(formInputs, updateState);

	function sendMessage() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('contact-loading');
			const headers = new Headers({
				'Content-Type': 'Application/Json',
			});
			console.log(contactState);
			const message = fetch('/contact', {
				method : 'POST',
				body   : JSON.stringify(contactState),
				headers,
			})
			.then((response) => {
				console.log(response);
				return response.json()
			})
			.then((response) => {
				console.log(response);
				if (response.success) {
					resetForm();
					submitButton.classList.remove('contact-loading');
					submitButton.classList.add('form-success');
					const success = new Event('message-sent');
					window.dispatchEvent(success);
				} else {
					submitButton.classList.remove('contact-loading');
					const failure = new Event('message-failed');
					window.dispatchEvent(failure);
				}
			})
			.catch(err => {
				console.log(err);
				submitButton.classList.remove('contact-loading');
				const failure = new Event('message-failed');
				window.dispatchEvent(failure);
			})
		} else {
			const error = new Event('message-error');
			window.dispatchEvent(error);
		}
	}

	function resetForm() {
		for (let input of formInputs) {
			input.value = '';
			input.classList.remove('valid');
		}
	}

	submitButton.addEventListener('click', sendMessage, false);
	window.addEventListener('message-sent', successNotify.open, false);
	window.addEventListener('message-failed', failureNotify.open, false);
	window.addEventListener('message-error', errorNotify.open, false);

}
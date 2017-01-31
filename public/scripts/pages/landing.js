import notifications from '../components/notifications';
import scrollTo from '../utils/scroll.to';
import { header } from '../components/header'

function landing() {
	const contactScroller = document.getElementById('contact-scroller');
	const contactContainer = doucument.getElementById('contact-container');
	const formWrappers = document.querySelectorAll('.form-wrapper');
	const formInputs = document.querySelectorAll('.contact-input');
	const emailInput = document.getElementById('contact-email');
	const nameInput = document.getElementById('contact-name');
	const subjectInput = document.getElementById('contact-subject');
	const messageInput = document.getElementById('contact-message')
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

	header();


	function addEvents() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.addEventListener('focus', inputFocus);
			input.addEventListener('blur', inputBlur);
		});
	}

	function inputFocus() {
		if (!this.parentNode.classList.contains('focused')) {
			this.parentNode.classList.add('focused');
		} else {
			return;
		}
	}

	function inputBlur() {
		let formContent = this.value;

		if (this.parentNode.classList.contains('focused')) {
			this.parentNode.classList.remove('focused');
		}

		if (formContent == '') {
			this.parentNode.classList.add('blank');
		}

		if (this.parentNode.classList.contains('contact-email')) {
			validateEmail();
		}

		if (formContent != '' && !this.parentNode.classList.contains('contact-email')) {
			if (this.parentNode.classList.contains('blank')) {
				this.parentNode.classList.remove('blank');
			}

			this.parentNode.classList.add('valid');
		}

		checkValidForm();
	}

	function validateEmail() {
		let input = emailInput;
		let formValue = input.value;
		let atpos = formValue.indexOf('@');
		let dotpos = formValue.lastIndexOf('.');


		if (atpos < 1 || (dotpos - atpos < 2)) {
			if (input.parentNode.classList.contains('blank')) {
				input.parentNode.classList.remove('blank');
			}

			if (formValue == '') {
				input.parentNode.classList.add('blank');
			}

			input.parentNode.classList.add('invalid');
		} else {
			if (input.parentNode.classList.contains('blank')) {
				input.parentNode.classList.remove('blank');
			}

			if (input.parentNode.classList.contains('invalid')) {
				input.parentNode.classList.remove('invalid');
			}

			input.parentNode.classList.add('valid');
		}
	}

	function checkValidForm() {
		let validForm = 0;

		Array.prototype.forEach.call(formWrappers, (wrapper) => {
			if (wrapper.classList.contains('valid')) {
				validForm++;
			}
		});

		if (validForm == 4) {
			submitButton.classList.add('form-valid');
		}
	}

	function clearInputs() {
		Array.prototype.forEach.call(formInputs, (input) => {
			input.value = '';
		});
	}

	function sendMessage() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('contact-loading');
		
			
			let nameData = nameInput.value;
			let emailData  = emailInput.value;
			let subjectData = subjectInput.value;
			let messageData = messageInput.value;

			let data = JSON.stringify({
				"name": nameData,
				"email": emailData,
				"subject": subjectData,
				"message": messageData
			}); 

			let promise = new Promise((resolve, reject) => {
				let req = new XMLHttpRequest();

				req.open('POST', '/contact', true);
				req.setRequestHeader('content-type', 'application/json');

				req.onload = () => {
					if (req.status == 200) {
						resolve(req.response);
					} else {
						reject(Error(req.statusText));
					}
				};

				req.onError = () => {
					reject(Error('error'));
				};

				req.send(data);
			});

			promise.then((response) => {
				setTimeout(() => {
					submitButton.classList.remove('contact-loading');
					var success = new Event('message-sent');
					window.dispatchEvent(success);

				//	clearInputs();
				}, 500);
			}, (error) => {
				setTimeout(() => {
					submitButton.classList.remove('contact-loading');
					var failure = new Event('message-failed');
					window.dispatchEvent(failure);
				});
			});

		} else {
			var error = new Event('message-error');
			window.dispatchEvent(error);
		}
	}

	addEvents();

	contactScroller.addEventListener('click', () => {
		scrollTo.smoothScroll(contactContainer.offsetTop);
	});
	submitButton.addEventListener('click', sendMessage, false);
	window.addEventListener('message-sent', successNotify.open, false);
	window.addEventListener('message-failed', failureNotify.open, false);
	window.addEventListener('message-error', errorNotify.open, false);

}

export default landing
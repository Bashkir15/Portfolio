import notifications from '../components/notifications';

function landing() {
	var formWrappers = document.querySelectorAll('.form-wrapper');
	var formInputs = document.querySelectorAll('.contact-input');
	var submitButton = document.getElementById('contact-send');
	var successContent = document.getElementById('contact-success');
	var failureContent = document.getElementById('contact-failure');
	var errorContent = document.getElementById('contact-error');

	var successNotify = new notifications({
		content: successContent,
		timeout: 2000,
		type: 'success'
	});

	var failureNotify = new notifications({
		content: failureContent,
		timeout: 2000,
		type: 'danger'
	});

	var errorNotify = new notifications({
		content: errorContent,
		timeout: 2000,
		type: 'warning'
	});


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
		var formContent = this.value;

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
		var input = document.getElementById('contact-email');
		var formValue = input.value;
		var atpos = formValue.indexOf('@');
		var dotpos = formValue.lastIndexOf('.');


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
		var validForm = 0;

		Array.prototype.forEach.call(formWrappers, (wrapper) => {
			if (wrapper.classList.contains('valid')) {
				validForm++;
			}
		});

		if (validForm == 4) {
			submitButton.classList.add('form-valid');
		}
	}

	function sendMessage() {
		if (submitButton.classList.contains('form-valid')) {
			submitButton.classList.add('contact-loading');
		

			var data = {};
			data.name = document.getElementById('contact-name');
			data.email = document.getElementById('contact-email');
			data.subject = document.getElementById('contact-subject');
			data.message = document.getElementById('contact-message');

			var promise = new Promise((resolve, reject) => {
				var req = new XMLHttpRequest();

				req.open('POST', '/contact', true);

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

				req.send();
			});

			promise.then((response) => {
				if (response.success) {
					setTimeout(() => {
						submitButton.classList.remove('contact-loading');

						Array.prototype.forEach.call(formInputs, (input) => {
							input.value = "";
						});

						var success = new Event('message-sent');
						window.dispatchEvent(success);
					}, 500);
				} else {
					setTimeout(() => {
						submitButton.classList.remove('contact-loading');
						var failure = new Event('message-failed');
						window.dispatchEvent(failure);
					}, 500);
				}
			}, (error) => {
				var failure = new Event('message-failed');
				window.dispatchEvent(failure);
			});
		} else {
			var error = new Event('message-error');
			window.dispatchEvent(error);
		}
	}

	addEvents();

	submitButton.addEventListener('click', sendMessage);
	window.addEventListener('message-sent', successNotify.open);
	window.addEventListener('message-failed', failureNotify.open);
	window.addEventListener('message-error', errorNotify.open);

}

export default landing
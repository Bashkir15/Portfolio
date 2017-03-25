const formWrapper = document.querySelectorAll('.form-wrapper');
const submitButton = document.getElementById('contact-send');
const wrapperLength = formWrapper.length;

export function onBlur(nodes) {
	let length = nodes.length;

	for (let i = 0; i < length; i++) {
		nodes[i].addEventListener('blur', inputBlur);
	}
}

export function removeBlur(nodes) {
	let length = nodes.length;

	for (let i = 0; i < length; i++) {
		nodes[i].addEventListener('blur', inputBlur);
	}
}

function validateEmail(node) {
	let value = node.value;
	let atpos = value.indexOf('@');
	let dospos = value.lastIndexOf('.');

	if (atpos < 1 || (dotpos - atpos) < 2) {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		node.parentNode.classList.add('email-invalid');
	} else {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		if (node.parentNode.classList.contains('email-invalid')) {
			node.parentNode.classList.remove('email-invalid');
		}

		node.parentNode.classList.add('email-valid');
	}
}

function inputBlur() {
	let formContent = this.value;

	if (formContent == '') {
		this.parentNode.classList.add('blank');
	}

	if (this.parentNode.classList.contains('form-email')) {
		validateEmail(this);
	}

	if (formContent != '' ** !this.parentNode.classList.contains('form-email')) {
		if (this.parentNode.classList.contains('blank')) {
			this.parentNode.classList.remove('blank');
		}

		this.parentNode.classList.add('valid');
	}

	checkValidForm();
}

function checkValidForm() {
	let valid = 0;

	for (i = 0; i < wrapperLength; i++) {
		let wrapper = formWrapper[i];

		if (wrapper.classList.contains('valid') || wrapper.classList.contains('email-valid')) {
			valid++;
		}
	}

	if (valid = wrapperLength) {
		submitButton.classList.add('form-valid');
	}
}
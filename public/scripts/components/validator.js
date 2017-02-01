export function inputBlur() {
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


function validateEmail(node) {
	let formValue = node.value;
	let atpos = formValue.indexOf('@');
	let dotpos = formValue.lastIndexOf('.');


	if (atpos < 1 || (dotpos - atpos < 2)) {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		if (formValue == '') {
			node.parentNode.classList.add('blank');
		}

		node.parentNode.classList.add('invalid');
	} else {
		if (node.parentNode.classList.contains('blank')) {
			node.parentNode.classList.remove('blank');
		}

		if (node.parentNode.classList.contains('invalid')) {
			node.parentNode.classList.remove('invalid');
		}

		node.parentNode.classList.add('valid');
	}
}
import { validateEmail } from '../utils/validator';

function newsletter() {
	const input = document.querySelector('.newsletter-input');
	const submitButton = document.querySelector('.newsletter-submit');
	const formState = {
		email: '',
	};

	function handleBlur() {
		validateEmail(input);

		if (input.parentNode.classList.contains('valid')) {
			formState[email] = input.value;
			submitButton.classList.add('form-valid');
		}
	}

	
}
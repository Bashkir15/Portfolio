import notify from '../components/notify.js';

function message() {
	var data = {};
	data.name = document.getElementById('contact-name');
	data.email = document.getElementById('contact-email');
	data.subject = document.getElementById('contact-subject');
	data.message = document.getElementById('contact-message');

	var promise = new Promise((resolve, reject) => {
		var req = new XMLHttpRequest();

		req.open('POST', '/contact', true);
		req.onload = function() {
			if (req.status == 200) {
				resolve(req.response);
			} else {
				reject(Error(req.statusText));
			}
		};

		req.onError = function() {
			reject(Error("Error"));
		};

		req.send();
	});

	promise.then((response) => {
		var success = new Event('message-delivered');
		window.dispatchEvent(success);
	}, function (error) {
		console.log('Failed');
	});
}

export default {
	message: message
}
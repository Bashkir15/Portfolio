function setActiveLink() {
	var pageUrl = window.location.href;
	var link = document.getElementsByClassName('nav-link');

	Array.prototype.forEach.call(link, function (item) {
		if (item.href == pageUrl) {
			item.className = 'nav-link-active';
		}
	});
}

$(document).ready(function() {

	$("#contact-submit").click(function() {
		var name = $("#contact-name").val();
		var email = $("#contact-email").val();
		var message = $('#contact-message').val();
		$.post('http://localhost:8000/contact', {name: name, email: email, message: message}, function (data) {
			if (data == "sent") {
				$("message").empty().html("Email has been sent :)");
			}
		});
	});
});

window.onload = setActiveLink;
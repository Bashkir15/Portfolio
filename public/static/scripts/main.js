
function StateTransition() {
	var section = document.getElementById('intro');
	section.classList.add('transition-start');
	setTimeout(function() {
		window.location.href = '/home'
	}, 500);
}

var button = document.getElementById('home-button');
button.addEventListener('click', StateTransition);
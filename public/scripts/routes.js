function init() {
	function goToSkills() {
		document.body.classList.add('route-changing');

		setTimeout(() => {
			window.location.href = '/skills';
			document.body.classList.remove('route-changing');
		}, 500);
	}

	function goToAbout() {
		document.body.classList.add('route-changing');

		setTimeout(() => {
			window.location.href = '/about';
			document.body.classList.remove('route-changing');
		}, 500);
	}

	function goToWork() {
		document.body.classList.add('route-changing');

		setTimeout(() => {
			window.location.href = '/works';
			document.body.classList.remove('route-changing');
		}, 500);
	}

	var skillLinks = document.getElementsByClassName('go-to-skills');
	var aboutLinks = document.getElementsByClassName('go-to-about');
	var workLinks = document.getElementsByClassName('go-to-works');

	if (skillLinks) {
		for (var i = 0; i < skillLinks.length; i++) {
			skillLinks[i].addEventListener('click', goToSkills);
		}
	}

	if (aboutLinks) {
		for (var i = 0; i < aboutLinks.length; i++) {
			aboutLinks[i].addEventListener('click', goToAbout);
		}
	}

	if (workLinks) {
		for (var i = 0; i < workLinks.length; i++) {
			workLinks[i].addEventListener('click', goToWork);
		}
	} 
}

export default {
	init: init
}
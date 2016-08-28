function init() {
	function goToSkills() {
		document.body.classList.add('route-changing');

		setTimeout(() => {
			window.location.href = '/skills';
			document.body.classList.replace('route-changing', 'route-changed');
			setTimeout(() => {
				document.body.classList.remove('route-changed');
			}, 500);
		}, 500);
	}

	var skillLinks = document.getElementsByClassName('go-to-skills');

	if (skillLinks) {
		for (var i = 0; i < skillLinks.length; i++) {
			skillLinks[i].addEventListener('click', goToSkills);
		}
	} 
}

export default {
	init: init
}
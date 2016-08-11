webpackHotUpdate(0,{

/***/ 14:
/***/ function(module, exports) {

	'use strict';

	function openNav() {
		document.getElementById('sidenav').style.width = "250px";
		document.body.classList.add('modal-open');
	}

	function closeNav() {
		document.getElementById('sidenav').style.width = "0px";
		document.body.classList.remove('modal-open');
	}

	module.exports = {
		openNav: openNav,
		closeNav: closeNav
	};

/***/ }

})
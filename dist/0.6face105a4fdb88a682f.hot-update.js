webpackHotUpdate(0,{

/***/ 3:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _sidenav = __webpack_require__(13);

	var _sidenav2 = _interopRequireDefault(_sidenav);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		components: { 'sidenav': _sidenav2.default },
		data: function data() {
			return {
				showRight: false
			};
		}

	};
	// </script>
	// <template>
	// 	<div id='wrapper'>
	// 		<nav class='main-nav'>
	// 			<div class='nav-left'>
	// 				<div class='nav-item'>
	// 					<h3>Forrest Collins</h3>
	// 				</div>
	// 			</div>
	//
	// 			<div class='nav-right'>
	// 				<div class='nav-item'>
	// 					<button v-on:click="showRight = true">
	// 						Menu
	// 					</button>
	// 				</div>
	// 			</div>
	// 		</nav>
	//
	// 		<sidenav :show.sync="showRight" placement='right' :width="350">
	// 			<p>Hello!</p>
	// 		</sidenav>
	// 	</div>
	//
	// 	<div>
	// 		<router-view></router-view>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = "\n<div id='wrapper'>\n\t<nav class='main-nav'>\n\t\t<div class='nav-left'>\n\t\t\t<div class='nav-item'>\n\t\t\t\t<h3>Forrest Collins</h3>\n\t\t\t</div>\n\t\t</div>\n\n\t\t<div class='nav-right'>\n\t\t\t<div class='nav-item'>\n\t\t\t\t<button v-on:click=\"showRight = true\">\n\t\t\t\t\tMenu\n\t\t\t\t</button>\n\t\t\t</div>\n\t\t</div>\n\t</nav>\n\n\t<sidenav :show.sync=\"showRight\" placement='right' :width=\"350\">\n\t\t<p>Hello!</p>\n\t</sidenav>\n</div>\n\n<div>\n\t<router-view></router-view>\n</div>\n";

/***/ }

})
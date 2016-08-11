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
				showRight: showRight
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
	// 					<button @click="showRight = true">
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

/***/ }

})
webpackHotUpdate(0,{

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(6);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		name: 'sidenav',

		props: {
			visible: Boolean
		},

		methods: {
			show: function show() {
				this.visible = true;
			},
			hide: function hide() {
				this.visible = false;
			},
			toggle: function toggle() {
				this.visible ? this.hide() : this.show();
			}
		}
	};

	// </script>
	// <template>
	// 	<div class='sidenav'>
	// 		<div class='sidenav-content' v-if="visible">
	// 			<div class='sidenav-header'>
	// 				<button @click="close">
	// 					<span>X</span>
	// 				</button>
	//
	// 				<p>Something</p>
	// 			</div>
	//
	// 			<div class='sidenav-body'>
	// 				<p>Body!</p>
	// 			</div>
	// 		</div>
	//
	// 		<div class='overlay' v-if="visible"></div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = "\n<div class='sidenav'>\n\t<div class='sidenav-content' v-if=\"visible\">\n\t\t<div class='sidenav-header'>\n\t\t\t<button @click=\"close\">\n\t\t\t\t<span>X</span>\n\t\t\t</button>\n\n\t\t\t<p>Something</p>\n\t\t</div>\n\n\t\t<div class='sidenav-body'>\n\t\t\t<p>Body!</p>\n\t\t</div>\n\t</div>\n\n\t<div class='overlay' v-if=\"visible\"></div>\n</div>\n";

/***/ }

})
webpackHotUpdate(0,{

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _utils = __webpack_require__(6);

	var _utils2 = _interopRequireDefault(_utils);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = {
		props: {
			show: {
				type: Boolean,
				coerce: _utils2.default.coerceBoolean,
				require: true,
				twoWay: true
			},

			placement: {
				type: String,
				default: 'right'
			},

			width: {
				type: Number,
				default: '320'
			}
		},

		watch: {
			show: function show(val) {
				var body = document.body;
				var scrollBarWidth = _utils2.default.getScrollBarWidth();

				var backdrop = document.createElement('div');
				backdrop.className = 'sidenav-backdrop';

				if (val) {
					body.appendChild(backdrop);
					body.classList.add('modal-open');

					if (scrollBarWidth !== 0) {
						body.style.paddingRight = scrollBarWidth + 'px';
					}

					backdrop.className += ' in';
					this._clickEvent = _utils2.default.listen(backdrop, 'click', this.close);
				} else {
					if (this._clickEvent) {
						this.clickEvent.remove();
					}

					backdrop = document.querySelect('.sidenav-backdrop');

					try {
						backdrop.className = 'sidenav-backdrop';
						body.classList.remove('modal-open');
						body.style.paddingRight = '0';
						body.removeChild(backdrop);
					} catch (e) {}
				}
			}
		},

		methods: {
			close: function close() {
				this.show = false;
			}
		}
	};

	// </script>
	// <template>
	// 	<div class='sidenav'
	// 		v-bind:style="{width:width + 'px'}"
	// 		v-bind:class="{
	// 			left:placement === 'left',
	// 			right:placement === 'right'
	// 		}"
	// 		v-show="show"
	// 		:transition="(this.placement === 'left') ? 'slideLeft' : 'slideRight'">
	// 		<div class='sidenav-container'>
	// 			<div class='sidenav-content'>
	// 				<div class='sidenav-header'>
	// 					<button type='button' class='close' @click='close'>
	// 						<span>x</span>
	// 					</button>
	// 					<p>Something</p>
	// 				</div>
	//
	// 				<div class='sidenav-body'>
	// 					<p>Something</p>
	// 				</div>
	// 			</div>
	// 		</div>
	// 	</div>
	// </template>
	//
	// <script>

/***/ },

/***/ 10:
/***/ function(module, exports) {

	module.exports = "\n<div class='sidenav'\n\tv-bind:style=\"{width:width + 'px'}\"\n\tv-bind:class=\"{\n\t\tleft:placement === 'left',\n\t\tright:placement === 'right'\n\t}\"\n\tv-show=\"show\"\n\t:transition=\"(this.placement === 'left') ? 'slideLeft' : 'slideRight'\">\n\t<div class='sidenav-container'>\n\t\t<div class='sidenav-content'>\n\t\t\t<div class='sidenav-header'>\n\t\t\t\t<button type='button' class='close' @click='close'>\n\t\t\t\t\t<span>x</span>\n\t\t\t\t</button>\n\t\t\t\t<p>Something</p>\n\t\t\t</div>\n\n\t\t\t<div class='sidenav-body'>\n\t\t\t\t<p>Something</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n";

/***/ }

})
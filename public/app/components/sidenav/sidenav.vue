<template>
	<div class='sidenav'>
		<div class='sidenav-content' v-if="visible">
			<div class='sidenav-header'>
				<button @click="hide">
					<span>X</span>
				</button>

				<p>Something</p>
			</div>

			<div class='sidenav-body'>
				<p>Body!</p>
			</div>
		</div>

		<div class='overlay' v-if="visible"></div>
	</div>
</template>

<script>
import utils from "../utils";

export default {
	name: 'sidenav',

	props: {
		visible: Boolean
	},

	methods: {
		show () {
			this.visible = true;
		},

		hide () {
			this.visible = false;
		},

		toggle() {
			this.visible ? this.hide() : this.show()
		}
	}
}

</script>
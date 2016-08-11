<template>
	<div id='wrapper'>
		<nav class='main-nav'>
			<div class='nav-left'>
				<div class='nav-item'>
					<h3>Forrest Collins</h3>
				</div>
			</div>

			<div class='nav-right'>
				<div class='nav-item'>
					<button @click="$refs.sidenav.show">
						Menu
					</button>
				</div>
			</div>
		</nav>

		<sidenav v-ref:sidenav=''>
			<p>Hello!</p>
		</sidenav>
	</div>

	<div>
		<router-view></router-view>
	</div>
</template>

<script>
	import sidenav from './components/sidenav/sidenav.vue';

	export default {
		components: {
			sidenav
		}
	}
</script>
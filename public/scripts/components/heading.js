export default function heading() {
	const header = document.querySelector('.landing-header');
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / header.scrollHeight, 1, 1000);
	const renderer = new THREE.WebGLRenderer({
		antialias: true, 
		alpha: true
	});

	const particle = new THREE.Object3D();
	const circle = new THREE.Object3D();
	const skelet = new THREE.Object3D();
	const scene = new THREE.Scene();

	let composer;

	init();
	animate();

	function init() {

		renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
		renderer.setSize(window.innerWidth, header.scrollHeight);
		renderer.autoClear = false;
		renderer.setClearColor(0x000000, 0.0);

		camera.position.z = 400; 

		header.appendChild(renderer.domElement);

		scene.add(camera);

		scene.add(circle);
		scene.add(skelet);
		scene.add(particle);

		let geometry = new THREE.TetrahedronGeometry(2, 0);
		let geom = new THREE.IcosahedronGeometry(7, 1);
		let geom2 = new THREE.IcosahedronGeometry(15, 1);

		let material = new THREE.MeshPhongMaterial({
				color: "rgb(233, 248, 183)",
				shading: THREE.FlatShading
		});

		for (let i = 0; i < 1000; i++) {
			let mesh = new THREE.Mesh(geometry, material);

			mesh.position.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
			mesh.position.multiplyScalar(90 + (Math.random() * 700));
			mesh.rotation.set(Math.random() * 2, Math.random() * 2, Math.random() * 2);

			particle.add(mesh)
		}

		let mat = new THREE.MeshPhongMaterial({
			//color: 0x429e97,
			color: 0x2a6d62,
			shading: THREE.FlatShading
		});

		let mat2 = new THREE.MeshPhongMaterial({
			color: 0x8cd1c4,
			wireframe: true,
			side: THREE.DoubleSide
		});

		let planet = new THREE.Mesh(geom, mat);
		planet.scale.x = planet.scale.y = planet.scale.z = 16;

		circle.add(planet);

		let planet2 = new THREE.Mesh(geom2, mat2);
		planet2.scale.x = planet2.scale.y = planet2.scale.z = 10;

		skelet.add(planet2);

		let ambientLight = new THREE.AmbientLight(0x999999);

		scene.add(ambientLight);

		let lights = [];
		lights[0] = new THREE.DirectionalLight(0xaaa, 1);
		lights[0].position.set(1, 0, 0);
		lights[1] = new THREE.DirectionalLight(0xe9f8b7, 1);
		lights[1].position.set(0.75, 1, 0.5);

		lights[2] = new THREE.DirectionalLight(0x429e97, 1);
		lights[2].position.set(-0.75, -1, 0.5);

		scene.add(lights[0]);
		scene.add(lights[1]);
		scene.add(lights[2]);

		window.addEventListener('resize', handleResize, false);
	}

	function handleResize() {
		camera.aspect = window.innerWidth / header.scrollHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, header.scrollHeight);
	}

	function animate() {
		requestAnimationFrame(animate);

		particle.rotation.x += 0.0000;
		particle.rotation.y -= 0.0040;

		circle.rotation.x -= 0.0020;
		circle.rotation.y -= 0.0030;

		skelet.rotation.x -= 0.0010;
		skelet.rotation.y += 0.0020;

		renderer.clear();

		renderer.render(scene, camera);

	}
}
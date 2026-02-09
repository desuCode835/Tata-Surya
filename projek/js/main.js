import * as THREE from 'three';
import { initScene } from './scene.js';
import { createPlanet, createSun } from './planet.js';
import { planetData } from './data.js';

// Init Scene
const { scene, camera, renderer, controls } = initScene();

// Objects
const planets = [];
const sun = createSun(scene);

planetData.forEach(data => {
    if (data.name !== 'Sun') { // Sun is already created special
        const planet = createPlanet(scene, data);
        planets.push(planet);
    }
});

// Raycaster for interactions
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Check intersections with planets (meshes are inside objects in planets array)
    // We need to traverse the scene or check specific meshes
    const planetMeshes = planets.map(p => p.mesh);
    planetMeshes.push(sun); // Add sun to clickable objects

    const intersects = raycaster.intersectObjects(planetMeshes);

    if (intersects.length > 0) {
        const object = intersects[0].object;
        showInfo(object.userData);
    }
}
window.addEventListener('click', onMouseClick);

// UI Logic
const infoPanel = document.getElementById('info-panel');
const closeInfoBtn = document.getElementById('close-info');
const speedSlider = document.getElementById('speed-slider');
const toggleBtn = document.getElementById('toggle-animation');

let speedFactor = 1;
let isAnimating = true;

closeInfoBtn.addEventListener('click', () => {
    infoPanel.classList.add('hidden');
});

speedSlider.addEventListener('input', (e) => {
    speedFactor = parseFloat(e.target.value);
});

toggleBtn.addEventListener('click', () => {
    isAnimating = !isAnimating;
    toggleBtn.textContent = isAnimating ? "Pause" : "Play";
});

function showInfo(data) {
    if (!data) return;
    document.getElementById('planet-name').textContent = data.name;
    document.getElementById('planet-type').textContent = "Planet"; // Simplified
    document.getElementById('planet-radius').textContent = data.radius * 1000; // Fake scale
    document.getElementById('planet-distance').textContent = data.distance;
    document.getElementById('planet-period').textContent = Math.round(365 / (data.speed * 100)); // Rough calc
    document.getElementById('planet-description').textContent = data.description;

    infoPanel.classList.remove('hidden');
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);

    if (isAnimating) {
        planets.forEach(planet => {
            planet.update(speedFactor);
        });
        // Sun rotation
        sun.rotation.y += 0.002;
    }

    controls.update();
    renderer.render(scene, camera);
}

animate();

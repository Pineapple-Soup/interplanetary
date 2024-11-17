
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { createNoise2D } from 'simplex-noise';

const noise = new createNoise2D();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8a8a8a);

const loader = new THREE.TextureLoader();
// loader.load("./assets/mizu5.jpg", function(texture){ scene.background = texture;});
//^ change this to whatever background
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls( camera, renderer.domElement );

const radius = 5;


const geometry = new THREE.SphereGeometry(radius, 64, 64); //the land
const material = new THREE.MeshStandardMaterial({color: 0x90b270});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

const geometry2 = new THREE.SphereGeometry(radius + 0.01, 64, 64); //the sea
const material2 = new THREE.MeshStandardMaterial({color: 0x0088ff });
const sphere2 = new THREE.Mesh(geometry2, material2);
scene.add(sphere2);

const geometry3 = new THREE.SphereGeometry(radius + 0.03, 64, 64); //the atmosphere
const material3 = new THREE.MeshStandardMaterial({color: 0x0000ff, transparent:true, opacity: 0.1});
const sphere3 = new THREE.Mesh(geometry3, material3);
scene.add(sphere3);
//THIS IS SUPPOSED TO BE ATMOSPHERE BUT WE GOT SHADOWS INSTEAD

const islandPosLat = Math.PI/4;
const islandPosLon = Math.PI/2;
const islandRadius = 2;

function addIsland(sphere, islandPosLat, islandPosLon, islandRadius, falloffMultiplier, noiseMultiplier){
	const positionAttribute = sphere.geometry.attributes.position;
	for(let i = 0; i < positionAttribute.count; i++){
		const x = positionAttribute.getX(i);
		const y = positionAttribute.getY(i);
		const z = positionAttribute.getZ(i);

		const x2 = radius * Math.cos(islandPosLat) * Math.cos(islandPosLon);
		const y2 = radius * Math.cos(islandPosLat) * Math.sin(islandPosLon);
		const z2 = radius * Math.sin(islandPosLat);
		
		//calc dist from each point to island center 
		const distance = Math.sqrt((x2-x)**2 + (y2-y)**2 + (z2-z)**2);
		// const distance = Math.sqrt(x * x + y * y + z * z);
		
		const spherical = new THREE.Spherical();
		spherical.setFromCartesianCoords(x, y, z);
		
		const lat = spherical.phi; 
		const lon = spherical.theta; 
		
		// const latDiff = lat - islandPosLat;
		// const lonDiff = lon - islandPosLon;
		// const sphericalDistance = Math.sqrt(latDiff ** 2 + lonDiff ** 2);

	
		if (distance < islandRadius) {
			const noiseValue = noise(lon * 10, lat * 10);
	
			const falloff = Math.cos((distance / islandRadius) * Math.PI / 2);
			const height = falloffMultiplier * falloff + noiseValue * noiseMultiplier;
			// const height = 0.05 * falloff;
	
			const newLength = radius + height;

			const normalized = new THREE.Vector3(x, y, z).normalize();
			const displaced = normalized.multiplyScalar(newLength);
			
			positionAttribute.setXYZ(i, displaced.x, displaced.y, displaced.z);	
		}
	}
	geometry.attributes.position.needsUpdate = true;
	sphere.geometry.computeVertexNormals();
}

//radius 1 addIslands
// addIsland(sphere,islandPosLat,islandPosLon,islandRadius, 0.035, 0.02);
// addIsland(sphere,0.5 * islandPosLat, 0.5 * islandPosLon,0.5 * islandRadius, 0.1, 0.025);

//radius 5
addIsland(sphere,islandPosLat,islandPosLon,islandRadius, 0.35, 0.1);
addIsland(sphere,0.5 * islandPosLat, 0.5 * islandPosLon,0.5 * islandRadius, 0.5, 0.075);



const geometry4 = new THREE.SphereGeometry(radius + 1, 64, 64); //the atmosphere
const material4 = new THREE.MeshBasicMaterial({color: 0xdb2727, transparent:true, opacity: 0.2});
const sphere4 = new THREE.Mesh(geometry4, material4);
scene.add(sphere4);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add( light );

camera.position.z = 10;
camera.lookAt(0, 0, 0)

function animate() {
	
	// sphere.rotation.x += 0.005;
	// sphere.rotation.y += 0.005;
	// sphere.rotation.z += 0.005;
	
	renderer.render(scene, camera);
	
}

renderer.setAnimationLoop(animate);

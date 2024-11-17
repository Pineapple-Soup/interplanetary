import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { createNoise2D } from "simplex-noise";

// Function to add islands
function addIsland(geometry, radius, islandPosLat, islandPosLon, islandRadius, falloffMultiplier, noiseMultiplier) {
  const noise = createNoise2D();
  const positionAttribute = geometry.attributes.position;

  for (let i = 0; i < positionAttribute.count; i++) {
    const x = positionAttribute.getX(i);
    const y = positionAttribute.getY(i);
    const z = positionAttribute.getZ(i);

    const x2 = radius * Math.cos(islandPosLat) * Math.cos(islandPosLon);
    const y2 = radius * Math.cos(islandPosLat) * Math.sin(islandPosLon);
    const z2 = radius * Math.sin(islandPosLat);

    const distance = Math.sqrt((x2 - x) ** 2 + (y2 - y) ** 2 + (z2 - z) ** 2);

    if (distance < islandRadius) {
      const noiseValue = noise(x * 0.5, z * 0.5);
      const falloff = Math.cos((distance / islandRadius) * Math.PI / 2);
      const height = falloffMultiplier * falloff + noiseValue * noiseMultiplier;
      const newLength = radius + height;

      const normalized = new THREE.Vector3(x, y, z).normalize();
      const displaced = normalized.multiplyScalar(newLength);

      positionAttribute.setXYZ(i, displaced.x, displaced.y, displaced.z);
    }
  }

  positionAttribute.needsUpdate = true;
  geometry.computeVertexNormals();
}

// Land Sphere Component

// LandSphere.js
// import React from 'react';

const LandSphere = ({ radius }) => (
  <mesh>
    <sphereGeometry args={[radius, 64, 64]} />
    <meshStandardMaterial color={0x8B4513} />
  </mesh>
);


// SeaSphere.js
// import React from 'react';

const SeaSphere = ({ radius }) => (
  <mesh>
    <sphereGeometry args={[radius, 64, 64]} />
    <meshStandardMaterial color={0x1E90FF} />
  </mesh>
);


// Atmosphere.js
// import React from 'react';

const Atmosphere = ({ radius }) => (
  <mesh>
    <sphereGeometry args={[radius + 0.1, 64, 64]} />
    <meshBasicMaterial color={0x87CEEB} transparent opacity={0.5} />
  </mesh>
);

// Outer Glow Component
const Glow = ({ radius }) => (
  <mesh>
    <sphereGeometry args={[radius + 1, 64, 64]} />
    <meshBasicMaterial color={0xdb2727} transparent opacity={0.15} />
  </mesh>
);

// Main Scene Component
const Planet = ({type, temperature, radius, luminosity}) => {
    radius = Math.log10(radius) - 3;

  return (
    <Canvas camera={{ position: [0, 0, 12], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />
      <OrbitControls />

      {/* Add layers */}
      <LandSphere radius={radius} />
      <SeaSphere radius={radius} />
      <Atmosphere radius={radius} />
      <Glow radius={radius} />
    </Canvas>
  );
};

export default Planet;
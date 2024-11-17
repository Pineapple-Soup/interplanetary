import React, { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';

const Planet = () => {
    const sphereRef = useRef();
    const seaRef = useRef();
    const atmosphereRef = useRef();

    useEffect(() => {
        const radius = 5;

        // Add island function
        const addIsland = (sphere, islandPosLat, islandPosLon, islandRadius, falloffMultiplier, noiseMultiplier) => {
            const positionAttribute = sphere.geometry.attributes.position;
            for (let i = 0; i < positionAttribute.count; i++) {
                const x = positionAttribute.getX(i);
                const y = positionAttribute.getY(i);
                const z = positionAttribute.getZ(i);

                const x2 = radius * Math.cos(islandPosLat) * Math.cos(islandPosLon);
                const y2 = radius * Math.cos(islandPosLat) * Math.sin(islandPosLon);
                const z2 = radius * Math.sin(islandPosLat);

                // Calculate distance from each point to island center
                const distance = Math.sqrt((x2 - x) ** 2 + (y2 - y) ** 2 + (z2 - z) ** 2);

                const spherical = new THREE.Spherical();
                spherical.setFromCartesianCoords(x, y, z);

                const lat = spherical.phi;
                const lon = spherical.theta;

                // Modify the position based on distance and other parameters
                if (distance < islandRadius) {
                    const falloff = Math.exp(-distance * falloffMultiplier);
                    const noise = Math.random() * noiseMultiplier;
                    positionAttribute.setXYZ(i, x + falloff + noise, y + falloff + noise, z + falloff + noise);
                }
            }
            positionAttribute.needsUpdate = true;
        };

        // Add island to the sphere
        if (sphereRef.current) {
            addIsland(sphereRef.current, Math.PI / 4, Math.PI / 2, 2, 0.1, 0.1);
        }
    }, []);

    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            {/* <axesHelper args={[10]} />
            <gridHelper args={[10, 10]} /> */}
            <mesh ref={sphereRef}>
                <sphereGeometry args={[5, 64, 64]} />
                <meshStandardMaterial color={0x00ff00} />
            </mesh>
            <mesh ref={seaRef}>
                <sphereGeometry args={[5.01, 64, 64]} />
                <meshStandardMaterial color={0x0088ff} />
            </mesh>
            <mesh ref={atmosphereRef}>
                <sphereGeometry args={[5.03, 64, 64]} />
                <meshStandardMaterial color={0x0000ff} transparent opacity={0.1} />
            </mesh>
        </Canvas>
    );
};

export default Planet;
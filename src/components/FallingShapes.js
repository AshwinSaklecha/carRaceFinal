import React, { useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody } from '@react-three/rapier';
import * as THREE from 'three';

const shapes = [
  { geometry: new THREE.BoxGeometry(), name: 'cube' },
  { geometry: new THREE.SphereGeometry(), name: 'sphere' },
  { geometry: new THREE.ConeGeometry(), name: 'pyramid' }
];

const getRandomShape = () => shapes[Math.floor(Math.random() * shapes.length)];

const getRandomColor = () => new THREE.Color(Math.random(), Math.random(), Math.random());

export default function FallingShapes() {
  const [shapes, setShapes] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const { geometry, name } = getRandomShape();
      const color = getRandomColor();
      const position = [Math.random() * 20 - 10, 20, Math.random() * 20 - 10];
      const scale = Math.random() * 0.5 + 0.5;
      const mass = scale * 2;

      setShapes(prevShapes => [
        ...prevShapes,
        { geometry, name, color, position, scale, mass }
      ]);
    }, 1000); // Create a new shape every second

    return () => clearInterval(interval);
  }, []);

  useFrame(() => {
    setShapes(prevShapes => prevShapes.filter(shape => shape.position[1] > -10));
  });

  return shapes.map((shape, index) => (
    <RigidBody key={index} colliders="hull" mass={shape.mass}>
      <mesh
        geometry={shape.geometry}
        position={shape.position}
        scale={[shape.scale, shape.scale, shape.scale]}
      >
        <meshStandardMaterial color={shape.color} />
      </mesh>
    </RigidBody>
  ));
}
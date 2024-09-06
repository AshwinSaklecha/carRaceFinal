import React from 'react';
import { RigidBody } from '@react-three/rapier';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function Ground() {
  const texture = useTexture('/textures/ground.jpg', (texture) => {
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(10, 10); // Adjust these values to change the texture repetition
  });

  return (
    <RigidBody type="fixed" colliders="trimesh">
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          map={texture} 
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
    </RigidBody>
  );
}
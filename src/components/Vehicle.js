import React, { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, useRapier } from '@react-three/rapier';
import * as THREE from 'three';
import useControls from '../hooks/useControls';
import useGameState from '../hooks/useGameState';

export default function Vehicle() {
  const vehicle = useRef();
  const { world } = useRapier();
  const controls = useControls();
  const { setVehicleRef, endGame } = useGameState();

  useEffect(() => {
    if (vehicle.current) {
      setVehicleRef(vehicle.current);
    }
  }, [setVehicleRef]);

  useFrame((state) => {
    if (!vehicle.current) return;

    const { forward, backward, left, right } = controls;
    const impulse = { x: 0, y: 0, z: 0 };
    const torque = { x: 0, y: 0, z: 0 };

    const impulseStrength = 0.5;
    const torqueStrength = 0.2;

    const rotation = vehicle.current.rotation();
    const forwardDir = new THREE.Vector3(0, 0, 1).applyQuaternion(rotation);

    if (forward) {
      impulse.x -= forwardDir.x * impulseStrength;
      impulse.z -= forwardDir.z * impulseStrength;
    }
    if (backward) {
      impulse.x += forwardDir.x * impulseStrength;
      impulse.z += forwardDir.z * impulseStrength;
    }
    if (left) {
      torque.y += torqueStrength;
    }
    if (right) {
      torque.y -= torqueStrength;
    }

    vehicle.current.applyImpulse(impulse);
    vehicle.current.applyTorqueImpulse(torque);

    // Update camera position to follow the vehicle
    const vehiclePosition = vehicle.current.translation();
    state.camera.position.x = vehiclePosition.x;
    state.camera.position.z = vehiclePosition.z + 5;
    state.camera.position.y = vehiclePosition.y + 3;
    state.camera.lookAt(vehiclePosition.x, vehiclePosition.y, vehiclePosition.z);

    // Collision detection
    world.bodies.forEach((body) => {
      if (body.userData?.type === 'fallingShape') {
        const shapePosition = body.translation();
        const distance = Math.sqrt(
          Math.pow(vehiclePosition.x - shapePosition.x, 2) +
          Math.pow(vehiclePosition.z - shapePosition.z, 2)
        );
        if (distance < 1) {
          endGame();
        }
      }
    });
  });

  return (
    <RigidBody ref={vehicle} colliders="hull" mass={1} type="dynamic" position={[0, 1, 0]}>
      <mesh castShadow>
        <boxGeometry args={[2, 0.5, 3]} />
        <meshStandardMaterial color="blue" />
      </mesh>
      <mesh castShadow position={[0, -0.25, 1.5]}>
        <sphereGeometry args={[0.4]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[-0.8, -0.25, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
      <mesh castShadow position={[0.8, -0.25, -1.5]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2]} />
        <meshStandardMaterial color="black" />
      </mesh>
    </RigidBody>
  );
}
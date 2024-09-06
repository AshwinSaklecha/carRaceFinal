import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { OrbitControls } from '@react-three/drei';
import Vehicle from './Vehicle';
import Ground from './Ground';
import FallingShapes from './FallingShapes';
import ScoreBoard from './ScoreBoard';
import useGameState from '../hooks/useGameState';

export default function Game() {
  const { score, gameOver, restartGame } = useGameState();

  return (
    <div className="w-full h-screen">
      <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 10]} intensity={1} castShadow />
          <Physics>
            <Vehicle />
            <Ground />
            <FallingShapes />
          </Physics>
          <OrbitControls />
        </Suspense>
      </Canvas>
      <ScoreBoard score={score} gameOver={gameOver} restartGame={restartGame} />
    </div>
  );
}
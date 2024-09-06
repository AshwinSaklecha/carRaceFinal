import { useState, useEffect, useCallback, useRef } from 'react';

export default function useGameState() {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const vehicleRef = useRef();

  const incrementScore = useCallback(() => {
    setScore(prevScore => prevScore + 1);
  }, []);

  const endGame = useCallback(async () => {
    setGameOver(true);
    try {
      const response = await fetch('/api/save-score', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ score }),
      });
      
      if (!response.ok) throw new Error('Failed to save score');
      
      const data = await response.json();
      console.log('Score saved:', data);
    } catch (error) {
      console.error('Error saving score:', error);
    }
  }, [score]);

  const restartGame = useCallback(() => {
    setScore(0);
    setGameOver(false);
    // Reset vehicle position
    if (vehicleRef.current) {
      const position = { x: 0, y: 1, z: 0 };
      const rotation = { x: 0, y: 0, z: 0 };
      vehicleRef.current.setTranslation(position);
      vehicleRef.current.setRotation(rotation);
    }
  }, []);

  const setVehicleRef = useCallback((ref) => {
    vehicleRef.current = ref;
  }, []);

  useEffect(() => {
    const scoreInterval = setInterval(() => {
      if (!gameOver) {
        incrementScore();
      }
    }, 1000); // Increment score every second

    return () => clearInterval(scoreInterval);
  }, [gameOver, incrementScore]);

  return { 
    score, 
    gameOver, 
    incrementScore, 
    endGame, 
    restartGame, 
    setVehicleRef,
    vehicleRef
  };
}
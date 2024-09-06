import React from 'react';

export default function ScoreBoard({ score, gameOver, restartGame }) {
  return (
    <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-center bg-black bg-opacity-50 text-white">
      <div className="text-2xl font-bold">Score: {score}</div>
      {gameOver && (
        <div className="flex items-center">
          <div className="text-2xl font-bold mr-4">Game Over!</div>
          <button
            onClick={restartGame}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Restart
          </button>
        </div>
      )}
    </div>
  );
}
import { useState, useEffect } from 'react';

export default function useControls() {
  const [controls, setControls] = useState({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key.toLowerCase()) {
        case 'w': setControls((controls) => ({ ...controls, forward: true })); break;
        case 's': setControls((controls) => ({ ...controls, backward: true })); break;
        case 'a': setControls((controls) => ({ ...controls, left: true })); break;
        case 'd': setControls((controls) => ({ ...controls, right: true })); break;
      }
    };

    const handleKeyUp = (event) => {
      switch (event.key.toLowerCase()) {
        case 'w': setControls((controls) => ({ ...controls, forward: false })); break;
        case 's': setControls((controls) => ({ ...controls, backward: false })); break;
        case 'a': setControls((controls) => ({ ...controls, left: false })); break;
        case 'd': setControls((controls) => ({ ...controls, right: false })); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return controls;
}
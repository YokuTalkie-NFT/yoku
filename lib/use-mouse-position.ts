import { useState, useEffect } from 'react';
import { throttle } from 'lodash';

const useMousePosition = (wait: number = 100) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = throttle((e) => {
      const x = e.clientX;
      const y = e.clientY;
      setPosition({ x, y });
    }, wait);

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [wait]);

  return position;
};

export default useMousePosition;

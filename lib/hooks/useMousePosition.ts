import React, { useEffect, useRef, useState } from 'react';

type MouseCoordinate = {
  x: number;
  y: number;
};

export const useMousePosition = () => {
  const ref = useRef<MouseCoordinate>({ x: NaN, y: NaN });
  const [state, setState] = useState<MouseCoordinate>({
    x: NaN,
    y: NaN,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setState({ x: ev.clientX, y: ev.clientY });
      ref.current.x = ev.clientX;
      ref.current.y = ev.clientY;
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  return { state, ref };
};

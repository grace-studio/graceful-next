import { useState, useEffect, useRef } from 'react';

const useScrollDirection = () => {
  const [scrollData, setScrollData] = useState({
    scrollPosition: {
      x: 0,
      y: 0,
    },
    direction: null as 'up' | 'down' | 'left' | 'right' | null,
  });

  const lastScrollY = useRef(0);
  const lastScrollX = useRef(0);
  const requestRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // Ensure we are in the browser

    lastScrollY.current = window.scrollY;
    lastScrollX.current = window.scrollX;

    const handleScroll = () => {
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }

      requestRef.current = requestAnimationFrame(() => {
        const currentX = window.scrollX;
        const currentY = window.scrollY;
        let direction: 'up' | 'down' | 'left' | 'right' | null = null;

        if (currentY > lastScrollY.current) direction = 'down';
        else if (currentY < lastScrollY.current) direction = 'up';
        else if (currentX > lastScrollX.current) direction = 'right';
        else if (currentX < lastScrollX.current) direction = 'left';

        setScrollData({
          scrollPosition: { x: currentX, y: currentY },
          direction,
        });

        lastScrollY.current = currentY;
        lastScrollX.current = currentX;
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return scrollData;
};

export default useScrollDirection;

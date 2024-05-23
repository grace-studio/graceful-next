import { useCallback, useEffect } from 'react';

/**
 * Sets a class name on a selected element when the user presses 'tab' and removes the class when the user clicks anywhere.
 */
export const useSetClassOnTab = (
  className: string,
  element: string | HTMLElement | SVGElement | null,
) => {
  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return;
  }

  const getElem = useCallback((): Element | SVGElement | null => {
    if (typeof element === 'string') {
      return document.querySelector(element);
    } else {
      return element;
    }
  }, [element]);

  useEffect(() => {
    const elem = getElem();

    if (!elem) {
      return;
    }

    const addClass = (event: KeyboardEvent) => {
      if (event.key?.toLowerCase() === 'tab') {
        if (!elem.classList.contains(className)) {
          elem.classList.add(className);
        }
      }
    };

    const removeClass = () => {
      if (elem.classList.contains(className)) {
        elem.classList.remove(className);
      }
    };

    window.addEventListener('keydown', addClass);
    window.addEventListener('mousedown', removeClass);

    return () => {
      window.removeEventListener('keydown', addClass);
      window.removeEventListener('mousedown', removeClass);
    };
  }, []);
};

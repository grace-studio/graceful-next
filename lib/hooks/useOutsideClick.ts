import { MutableRefObject, useEffect, useRef } from 'react';

export const useOutsideClick = <T extends Element>(
  callback: () => void,
): MutableRefObject<T | null> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleClick = (event: any) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('click', handleClick, true);

    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [callback, ref]);

  return ref;
};

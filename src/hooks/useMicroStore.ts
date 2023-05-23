import { useCallback, useEffect, useRef, useState } from 'react';

export const useMicroStore = <T extends object>(
  initialState: T
): [T, typeof dispatch] => {
  const [state, setState] = useState<T>(initialState);
  const fastState = useRef<{ micro: object }>({ micro: {} });

  useEffect(() => {
    console.log({ state });
  }, [state]);

  const dispatch = useCallback(
    (partialState: Partial<T>) => {
      const oldState = JSON.stringify(fastState.current.micro);
      const newState = {
        ...(state && state),
        ...fastState.current.micro,
        ...(partialState ? partialState : {}),
      };

      if (oldState === JSON.stringify(newState)) {
        return;
      }

      fastState.current.micro = { ...newState };
      setState(newState);
    },
    [state]
  );

  return [state, dispatch];
};

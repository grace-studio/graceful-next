import { useEffect, useState } from 'react';

export const usePreventBodyScroll = (isBodyScrollPrevented: boolean) => {
  if (typeof document === 'undefined') {
    return;
  }

  const [oldOverflowValue, setOldOverflowValue] = useState(
    document.body.style.overflow
  );

  useEffect(() => {
    const setOverflowPropertyToBody = (value: string) => {
      document.body.style.overflow = value;
    };

    if (isBodyScrollPrevented) {
      setOldOverflowValue(document.body.style.overflow);
      setOverflowPropertyToBody('hidden');
    } else {
      setOverflowPropertyToBody(oldOverflowValue);
    }

    return () => setOverflowPropertyToBody(oldOverflowValue);
  }, [isBodyScrollPrevented]);
};

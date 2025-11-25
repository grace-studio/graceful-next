'use client';
import { useEffect, useState } from 'react';

export const usePreventBodyScroll = (isBodyScrollPrevented: boolean) => {
  const [oldOverflowValue, setOldOverflowValue] = useState(
    typeof document === 'undefined' ? '' : document?.body.style.overflow,
  );

  useEffect(() => {
    if (typeof document === 'undefined') {
      return;
    }

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

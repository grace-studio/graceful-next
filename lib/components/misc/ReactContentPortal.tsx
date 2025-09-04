'use client';
import { createPortal } from 'react-dom';
import { FC, useEffect, useState } from 'react';

type ReactContentPortalProps = {
  portalQuerySelector: string;
  children: React.ReactNode;
};

const ReactContentPortal: FC<ReactContentPortalProps> = ({
  children,
  portalQuerySelector,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return (
    mounted
      ? createPortal(
          children as any, // Temporary fix for error in Next 13.4.0?
          document.querySelector(portalQuerySelector) as Element,
        )
      : null
  ) as React.ReactElement;
};

export default ReactContentPortal;

import { createPortal } from 'react-dom';
import { FC, PropsWithChildren, useEffect, useState } from 'react';
import React from 'react';

type ReactPortalProps = PropsWithChildren<{
  portalQuerySelector: string;
}>;

const ReactPortal: FC<ReactPortalProps> = ({
  children,
  portalQuerySelector,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  return mounted ? (
    createPortal(
      children,
      document.querySelector(portalQuerySelector) as Element
    )
  ) : (
    <></>
  );
};

export default ReactPortal;

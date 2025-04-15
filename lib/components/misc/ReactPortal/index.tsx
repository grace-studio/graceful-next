'use client';
import { createPortal } from 'react-dom';
import { FC, PropsWithChildren, useEffect, useState } from 'react';

type ReactPortalProps = PropsWithChildren<{
  portalQuerySelector?: string;
}>;

const ReactPortal: FC<ReactPortalProps> = ({
  children,
  portalQuerySelector = 'body',
}) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return mounted
    ? createPortal(
        children,
        document.querySelector(portalQuerySelector) as Element,
      )
    : null;
};

export default ReactPortal;
export type { ReactPortalProps };

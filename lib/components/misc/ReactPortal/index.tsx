'use client';
import { createPortal } from 'react-dom';
import { FC } from 'react';
import { useIsClient } from '../../../hooks/useIsClient';

type ReactPortalProps = {
  portalQuerySelector: string;
  children: React.ReactNode;
};

const ReactPortal: FC<ReactPortalProps> = ({
  children,
  portalQuerySelector,
}) => {
  const isClient = useIsClient();

  return isClient
    ? (createPortal(
        children as any, // Temporary fix for error in Next 13.4.0?
        document.querySelector(portalQuerySelector) as Element,
      ) as React.ReactElement)
    : null;
};

export default ReactPortal;

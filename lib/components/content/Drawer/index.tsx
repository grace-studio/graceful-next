'use client';
import classNames from 'classnames';
import { ReactPortal } from '../..';
import React, { FC, PropsWithChildren, useCallback } from 'react';
import { usePreventBodyScroll } from '../../../hooks';
import { useHotkeys } from 'react-hotkeys-hook';

type Position = 'left' | 'right' | 'top' | 'bottom' | 'center';
type Transition = 'fade' | 'slide';

type DrawerProps = PropsWithChildren<{
  disableFocusTrap?: boolean;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
  backdropClassName?: string;
  position?: Position;
  transition?: Transition;
  disableBackdrop?: boolean;
  disableBackdropClick?: boolean;
  transitionDuration?: number;
}>;

const positionClasses: Record<Position, string[]> = {
  left: ['inset-y-0 left-0 '],
  right: ['inset-y-0 right-0'],
  top: ['inset-x-0 top-0'],
  bottom: ['inset-x-0 bottom-0'],
  center: ['left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'],
};

const transitionSlideClasses: Record<
  'open' | 'closed',
  Record<Position, string[]>
> = {
  open: {
    left: ['translate-x-0 translate-y-0'],
    right: ['translate-x-0 translate-y-0'],
    top: ['translate-x-0 translate-y-0'],
    bottom: ['translate-x-0 translate-y-0'],
    center: [
      'opacity-100 pointer-events-auto -translate-x-1/2 -translate-y-1/2',
    ],
  },
  closed: {
    left: ['-translate-x-full'],
    right: ['translate-x-full'],
    top: ['-translate-y-full'],
    bottom: ['translate-y-full'],
    center: ['opacity-0 pointer-events-none -translate-x-1/2 -translate-y-1/4'],
  },
};

const transitionFadeClasses: Record<'open' | 'closed', string[]> = {
  open: ['opacity-100 pointer-events-auto'],
  closed: ['opacity-0 pointer-events-none'],
};

const Drawer: FC<DrawerProps> = (props) => {
  const {
    isOpen = false,
    onClose,
    children,
    className,
    backdropClassName,
    position = 'left',
    transition = 'slide',
    transitionDuration = 500,
    disableBackdrop,
    disableBackdropClick,
  } = props;

  const handleOnClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);
  useHotkeys('esc', handleOnClose, { enabled: isOpen });
  usePreventBodyScroll(isOpen);

  const getTransitionClasses = () => {
    if (transition === 'slide') {
      return isOpen
        ? transitionSlideClasses.open[position]
        : transitionSlideClasses.closed[position];
    }

    return isOpen ? transitionFadeClasses.open : transitionFadeClasses.closed;
  };

  const drawerClasses = classNames(
    'fixed transition-all ease-bounce transform-gpu',
    ...positionClasses[position],
    ...getTransitionClasses(),
    className,
  );

  const backdropClasses = classNames(
    'fixed inset-0 transition-opacity',
    backdropClassName,
    isOpen ? 'pointer-events-auto' : '!pointer-events-none !opacity-0',
    disableBackdropClick ? 'cursor-default' : 'cursor-pointer',
  );

  return (
    <>
      <ReactPortal portalQuerySelector="body">
        {!disableBackdrop && (
          <div
            style={{ transitionDuration: `${transitionDuration}ms` }}
            className={backdropClasses}
            onClick={() => !disableBackdropClick && handleOnClose()}
            role="button"
            aria-label="Close"
            tabIndex={-1}
          />
        )}
        <div
          style={{ transitionDuration: `${transitionDuration}ms` }}
          className={drawerClasses}
        >
          {children}
        </div>
      </ReactPortal>
    </>
  );
};

export default Drawer;
export type { DrawerProps, Position, Transition };

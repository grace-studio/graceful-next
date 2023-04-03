import classNames from 'classnames';
import ReactPortal from './ReactPortal';
import { FC, PropsWithChildren, useCallback } from 'react';
import { usePreventBodyScroll } from '../hooks';
import React from 'react';

type Position = 'left' | 'right' | 'top' | 'bottom' | 'center';
type Transition = 'fade' | 'slide';
type Speed = 'fast' | 'medium' | 'slow';

type DrawerProps = PropsWithChildren<{
  isOpen?: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  className?: string;
  backdropClassName?: string;
  position?: Position;
  transition?: Transition;
  disableBackdrop?: boolean;
  speed?: Speed;
  hotKey?: string;
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
    center: ['opacity-100 pointer-events-auto'],
  },
  closed: {
    left: ['-translate-x-full'],
    right: ['translate-x-full'],
    top: ['-translate-y-full'],
    bottom: ['translate-y-full'],
    center: ['opacity-0 pointer-events-none !translate-y-0'],
  },
};

const transitionFadeClasses: Record<'open' | 'closed', string[]> = {
  open: ['opacity-100 pointer-events-auto'],
  closed: ['opacity-0 pointer-events-none'],
};

const speedClasses: Record<Speed, string> = {
  fast: 'duration-300',
  medium: 'duration-500',
  slow: 'duration-700',
};

const Drawer: FC<DrawerProps> = (props) => {
  const {
    isOpen = false,
    onClose,
    onOpen,
    children,
    className,
    backdropClassName,
    position = 'left',
    transition = 'slide',
    speed = 'medium',
    disableBackdrop,
    hotKey,
  } = props;

  const handleOnClose = useCallback(() => {
    onClose && onClose();
  }, [onClose]);

  const handleKeyDown: React.KeyboardEventHandler = useCallback(
    (event) => {
      const key = event.key.toUpperCase();
      if (hotKey && hotKey.toUpperCase() === key) {
        if (isOpen) {
          onClose && onClose();
        } else {
          onOpen && onOpen();
        }
      }
    },
    [hotKey, isOpen, onClose, onOpen]
  );

  // useHotkeys([
  //   {
  //     name: 'drawer',
  //     keys: 'esc',
  //     callback: handleKeyDown,
  //   },
  // ]);
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
    speedClasses[speed],
    className
  );

  const backdropClasses = classNames(
    'fixed inset-0 transition-opacity',
    speedClasses[speed],
    backdropClassName,
    isOpen ? 'pointer-events-auto' : '!pointer-events-none !opacity-0'
  );

  return (
    <>
      <ReactPortal portalQuerySelector="body">
        {!disableBackdrop && (
          <div
            className={backdropClasses}
            onClick={() => handleOnClose()}
            role="button"
            aria-label="Close"
            tabIndex={0}
          />
        )}
        <div className={drawerClasses} onKeyDown={handleKeyDown}>
          {children}
        </div>
      </ReactPortal>
    </>
  );
};

export default Drawer;

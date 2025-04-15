'use client';
import classNames from 'classnames';
import React, { FC, PropsWithChildren, ReactNode } from 'react';

type Position = 'top' | 'bottom' | 'left' | 'right';

type BaseTooltipProps = PropsWithChildren<{
  content: ReactNode;
  position?: Position;
  arrow?: boolean;
  className?: string;
  wrapperClassName?: string;
  arrowClassName?: string;
}>;

const positionClasses: Record<Position, string> = {
  top: 'absolute top-0 left-1/2 -translate-y-full -translate-x-1/2',
  bottom: 'absolute bottom-0 left-1/2 translate-y-full -translate-x-1/2',
  left: 'absolute top-1/2 left-0 -translate-y-1/2 -translate-x-full',
  right: 'absolute top-1/2 right-0 -translate-y-1/2 translate-x-full',
};

const arrowPositionClasses: Record<Position, string> = {
  top: 'absolute bottom-0 left-1/2 translate-y-1/2 -translate-x-1/2',
  bottom: 'absolute top-0 left-1/2 -translate-y-1/2 -translate-x-1/2',
  left: 'absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2',
  right: 'absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2',
};

const BaseTooltip: FC<BaseTooltipProps> = ({
  children,
  content,
  arrow,
  position = 'top',
  className = 'bg-gray-900 p-2 text-white',
  wrapperClassName = 'p-2 transition-opacity duration-300 delay-0 group-hover:delay-300',
  arrowClassName = 'w-2 h-2 bg-gray-900 rotate-45 z-[-1]',
}) => {
  return (
    <>
      <div className="relative w-fit h-fit group">
        {children}
        <div
          className={classNames(
            'opacity-0 group-hover:opacity-100',
            'pointer-events-none',
            positionClasses[position],
            wrapperClassName,
          )}
        >
          <div className={classNames('relative', className)}>
            {arrow && (
              <div
                className={classNames(
                  arrowPositionClasses[position],
                  arrowClassName,
                )}
              />
            )}
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default BaseTooltip;
export type { BaseTooltipProps, Position };

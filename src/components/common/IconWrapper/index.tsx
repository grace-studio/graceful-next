import classNames from 'classnames';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export type IconProps = {
  className?: string;
};

export type IconWrapperProps = PropsWithChildren<
  IconProps & {
    width?: number;
    height?: number;
    viewBoxWidth?: number;
    viewBoxHeight?: number;
  }
>;

const DEFAULT_SIZE = 24;

export const IconWrapper: FC<IconWrapperProps> = (props) => {
  const {
    children,
    width = DEFAULT_SIZE,
    height = width,
    viewBoxWidth = width,
    viewBoxHeight = height,
    className,
  } = props;
  const classes = classNames(
    'inline-block',
    !(className?.includes('h-') || className?.includes('w-')) && 'h-[1em]',
    className
  );

  return (
    <div className={classes}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
        className="w-full h-full fill-current"
      >
        {children}
      </svg>
    </div>
  );
};

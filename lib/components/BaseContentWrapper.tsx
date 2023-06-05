import classNames from 'classnames';
import React from 'react';
import { FC, PropsWithChildren } from 'react';

export type MarginAfter = 'none' | 'small' | 'medium' | 'large';

export type ContentWidth = 'narrow' | 'normal' | 'wide' | 'full';

const marginAfterClasses: Record<MarginAfter, string[]> = {
  none: ['mb-0'],
  small: ['mb-6'],
  medium: ['mb-20'],
  large: ['mb-40'],
};

const contentWidthClasses: Record<ContentWidth, string[]> = {
  narrow: ['max-w-[1200px]'],
  normal: ['max-w-[1488px]'],
  wide: ['max-w-[1800px]'],
  full: ['max-w-full'],
};

export type BaseContentWrapperProps = PropsWithChildren<{
  id?: string;
  elementType?: string;
  className?: string;
  marginAfter?: MarginAfter;
  contentWidth?: ContentWidth;
  sidePaddingClassName?: string;
}>;

const BaseContentWrapper: FC<
  BaseContentWrapperProps & {
    contentWidthDefinition?: Record<ContentWidth, string[]>;
    marginAfterDefinition?: Record<MarginAfter, string[]>;
  }
> = (props) => {
  const {
    children,
    id,
    elementType = 'div',
    marginAfter = 'medium',
    contentWidth = 'normal',
    marginAfterDefinition = marginAfterClasses,
    contentWidthDefinition = contentWidthClasses,
    sidePaddingClassName = 'px-3 tablet:px-30',
    className,
  } = props;
  const classes = classNames(
    'mx-auto',
    'w-full',
    sidePaddingClassName,
    ...marginAfterDefinition[marginAfter],
    ...contentWidthDefinition[contentWidth],
    className
  );

  const Elem = elementType as keyof JSX.IntrinsicElements;

  return (
    <Elem id={id} className={classes}>
      {children}
    </Elem>
  );
};

export default BaseContentWrapper;

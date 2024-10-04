'use client';
import Link from 'next/link';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { canElementReceiveFocus } from '../../utils';

export type BaseButtonProps = PropsWithChildren<{
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  target?: '_self' | '_blank';
  href?: string;
  hotKey?: string;
  submit?: boolean;
  id?: string;
}>;

const BaseButton: FC<BaseButtonProps> = (props) => {
  const {
    id,
    ariaLabel,
    children,
    className = 'h-16 px-10 bg-gray-900 disabled:bg-gray-700 disabled:text-gray-300 text-gray-100 \
    hover:bg-links-hover whitespace-nowrap text-lg flex items-center justify-center \
    outline outline-4 outline-offset-2 outline-transparent focus-within:outline-fuchsia-600',
    disabled,
    onClick,
    target,
    href,
    submit,
    hotKey = '',
  } = props;

  const ref = useRef<HTMLButtonElement>(null);

  useHotkeys(
    hotKey,
    () => {
      if (onClick && ref.current && canElementReceiveFocus(ref.current)) {
        onClick();
      }
    },
    { enabled: !!hotKey },
  );

  const buttonProps = {
    'aria-label': ariaLabel,
    'data-testid': 'base-button',
    className,
    disabled,
    id,
  };

  if (disabled) {
    return <button {...buttonProps}>{children}</button>;
  }

  if (submit) {
    return (
      <button type="submit" {...buttonProps}>
        {children}
      </button>
    );
  }

  return href ? (
    <Link href={href} onClick={onClick} target={target} {...buttonProps}>
      {children}
    </Link>
  ) : (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick && onClick();
      }}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

export default BaseButton;

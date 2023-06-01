import Link from 'next/link';
import React, { FC, PropsWithChildren } from 'react';

export type BaseButtonProps = PropsWithChildren<{
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  target?: '_self' | '_blank';
  href?: string;
  submit?: boolean;
  id?: string;
}>;

const BaseButton: FC<BaseButtonProps> = (props) => {
  const {
    id,
    ariaLabel,
    children,
    className = 'h-14 px-10 bg-primary-dark text-primary-light\
     hover:bg-links-hover whitespace-nowrap flex items-center justify-center',
    disabled,
    onClick,
    target,
    href,
    submit,
  } = props;

  const buttonProps = {
    'aria-label': ariaLabel,
    'data-testid': 'base-button',
    className,
    disabled,
  };

  if (disabled) {
    return (
      <button id={id} {...buttonProps}>
        {children}
      </button>
    );
  }

  if (submit) {
    return (
      <button id={id} type="submit" {...buttonProps}>
        {children}
      </button>
    );
  }

  return href ? (
    <Link
      id={id}
      href={href}
      onClick={onClick}
      target={target}
      {...buttonProps}
    >
      {children}
    </Link>
  ) : (
    <button
      id={id}
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

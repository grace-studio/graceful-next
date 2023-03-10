import Link from 'next/link';
import React, { FC, PropsWithChildren, useCallback, useEffect } from 'react';

export type BaseButtonProps = PropsWithChildren<{
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  target?: '_self' | '_blank';
  href?: string;
  submit?: boolean;
}>;

const BaseButton: FC<BaseButtonProps> = (props) => {
  const {
    ariaLabel,
    children,
    className = 'h-14 px-10 bg-primary-dark text-primary-light\
     hover:bg-links-hover whitespace-nowrap',
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
    <button onClick={onClick} {...buttonProps}>
      {children}
    </button>
  );
};

export default BaseButton;

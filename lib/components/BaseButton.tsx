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
    className = 'h-16 px-10 bg-gray-900 text-gray-100 \
    hover:bg-links-hover whitespace-nowrap text-lg flex items-center justify-center',
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

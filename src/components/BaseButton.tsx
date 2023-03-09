import Link from 'next/link';
import React, {
  FC,
  PropsWithChildren,
  useCallback,
  useEffect
  } from 'react';

export type BaseButtonProps = PropsWithChildren<{
  ariaLabel?: string;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  target?: '_self' | '_blank';
  url?: string;
  hotKey?: string;
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
    url,
    hotKey,
    submit,
  } = props;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const combo = event.metaKey || event.ctrlKey || event.altKey;
      const key = event.key.toUpperCase();
      if (!combo && hotKey?.toUpperCase() === key) {
        onClick && onClick();
      }
    },
    [hotKey, onClick]
  );

  useEffect(() => {
    if (hotKey) {
      document.body.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (hotKey) {
        document.body.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [handleKeyDown, hotKey]);

  if (disabled) {
    return (
      <button disabled className={className} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  if (submit) {
    return (
      <button type="submit" className={className} aria-label={ariaLabel}>
        {children}
      </button>
    );
  }

  return url ? (
    <Link href={url} className={className} onClick={onClick} target={target}>
      {children}
    </Link>
  ) : (
    <button className={className} onClick={onClick} aria-label={ariaLabel}>
      {children}
    </button>
  );
};

export default BaseButton;

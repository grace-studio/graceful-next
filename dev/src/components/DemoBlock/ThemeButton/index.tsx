import {
  BaseButton,
  BaseButtonProps,
} from '@grace-studio/graceful-next/components';
import classNames from 'classnames';
import React, { FC } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'tertiary';

const commonClasses = [
  'flex items-center justify-center gap-sm rounded-sm',
  'transition-all',
  'outline-none focus-active whitespace-nowrap',
];

const variantClasses: Record<Variant, string[]> = {
  primary: [
    'font-label',
    'bg-button-primary-bg text-button-primary-text',
    'hover:bg-button-primary-bg--hover hover:text-button-primary-text--hover',
    'disabled:bg-button-primary-bg--disabled disabled:text-button-primary-text--disabled',
  ],
  secondary: [
    'font-label',
    'border-2 border-button-secondary-text',
    'bg-button-secondary-bg text-button-secondary-text',
    'hover:bg-button-secondary-bg--hover hover:text-button-secondary-text--hover',
    'disabled:bg-button-secondary-bg--disabled disabled:text-button-secondary-text--disabled',
  ],
  tertiary: [
    'font-label',
    'bg-button-tertiary-bg text-button-tertiary-text',
    'hover:bg-button-tertiary-bg--hover hover:text-button-tertiary-text--hover',
    'disabled:bg-button-tertiary-bg--disabled disabled:text-button-tertiary-text--disabled',
  ],
  ghost: [
    'disabled:text-cloud hover:text-plum underline',
    'underline-offset-4',
  ],
};

type ButtonProps = BaseButtonProps & {
  variant?: Variant;
  iconOnly?: boolean;
  slim?: boolean;
  loading?: boolean;
};

const Button: FC<ButtonProps> = (props) => {
  const getIconClasses = () => {
    if (iconOnly) {
      return slim ? 'text-2xl' : 'text-2xl w-12 h-12';
    } else if (variant !== 'ghost') {
      return slim ? 'h-min' : 'h-12 px-6';
    }
  };

  const {
    children,
    className,
    variant = 'primary',
    iconOnly,
    slim,
    loading,
    ...rest
  } = props;
  const classes = classNames(
    ...commonClasses,
    ...variantClasses[variant],
    getIconClasses(),
    className,
  );

  return (
    <BaseButton className={classes} {...rest}>
      {loading ? (
        <div className="relative h-6 w-6 rounded-full border-2 border-r-transparent animate-spin border-current opacity-80"></div>
      ) : (
        children
      )}
    </BaseButton>
  );
};

export default Button;

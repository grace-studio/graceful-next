import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react';
import { FocusEvent, useEffect } from 'react';
import { FieldError, useFormContext, useWatch } from 'react-hook-form';
import { useMicroStore } from '../hooks/useMicroStore';

export type CheckboxState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  checked: boolean;
};

const initialState: CheckboxState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  checked: false,
};

export type BaseCheckboxProps = {
  name: string;
  label?: ReactNode;
  disabled?: boolean;
  onStateChange?: (state: CheckboxState) => void;
};

export type BaseCheckboxRef = {
  setChecked: (checked: boolean) => void;
};

type InternalProps = {
  wrapperClassName?: string;
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseCheckbox = forwardRef<
  BaseCheckboxRef,
  BaseCheckboxProps & InternalProps
>(function BaseCheckbox(
  {
    label,
    wrapperClassName = 'flex items-center justify-between',
    className = 'border-4 outline-none border-black bg-white h-10 w-full px-4 text-black disabled:bg-gray-200 disabled:text-gray-400',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
    ...props
  },
  ref
) {
  const {
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useFormContext();
  const [state, dispatch] = useMicroStore(initialState);

  useImperativeHandle(ref, () => ({
    setChecked: (checked: boolean) => setValue(name, checked),
  }));

  const currentValue = useWatch({ name });

  useEffect(() => {
    const newState = {
      ...state,
      checked: currentValue,
    };
    onStateChange && onStateChange(newState);
    dispatch(newState);
  }, [currentValue]);

  useEffect(() => {
    isSubmitting && dispatch({ isTouched: true });
  }, [isSubmitting, dispatch]);

  useEffect(() => {
    const error = errors && (errors[name] as FieldError);
    state.isTouched && dispatch({ errorMessage: error?.message || '' });
  }, [errors, name, dispatch, state]);

  useEffect(() => {
    onStateChange && onStateChange(state);
  }, [onStateChange, state]);

  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    const hasFocus = event.type === 'focus';
    dispatch({ hasFocus });
    hasFocus && dispatch({ isTouched: true });
  };

  const handleOnClick = () => {
    setValue(name, !state.checked);
    dispatch({ checked: !state.checked });
  };

  return (
    <>
      <div className="relative">
        <div className={wrapperClassName}>
          {label && (
            <label className={labelClassName} htmlFor={name}>
              {label}
            </label>
          )}
          <input
            {...register(name)}
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
            onClick={handleOnClick}
            id={name}
            className={className}
            type="checkbox"
            {...props}
          />
        </div>
        {state.errorMessage && !props.disabled && (
          <div className={errorClassName}>{state.errorMessage}</div>
        )}
      </div>
    </>
  );
});

export default BaseCheckbox;

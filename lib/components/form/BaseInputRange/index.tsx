'use client';
import React, {
  ChangeEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  FocusEvent,
  useEffect,
  useContext,
} from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { useMicroStore } from '../../../hooks';
import { FormOptionsContext } from '../Form';

export type InputState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  value: string | number;
};

const initialState: InputState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  value: '',
};

export type BaseInputRangeProps = {
  name: string;
  label?: ReactNode;
  disabled?: boolean;
  defaultValue?: any;
  max?: number;
  min?: number;
  step?: number;
  onStateChange?: (state: InputState) => void;
  onMaxValue?: () => void;
  onMinValue?: () => void;
};

export type BaseInputRangeRef = {
  setValue: (value: string) => void;
  setFocus: () => void;
};

type InternalProps = {
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseInputRange = forwardRef<
  BaseInputRangeRef,
  BaseInputRangeProps & InternalProps
>(function BaseInputRange(
  {
    label,
    wrapperClassName = '',
    className = 'appearance-none outline-none bg-gray-100 h-4 w-full border-4 border-gray-900 disabled:bg-gray-200 \
    [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:bg-red-400 [&::-webkit-slider-thumb]:h-8 [&::-webkit-slider-thumb]:w-8 [&::-webkit-slider-thumb]:rounded-full',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
    defaultValue,
    ...props
  },
  ref,
) {
  const {
    register,
    setValue,
    formState: { errors },
    setFocus,
  } = useFormContext();
  useContext(FormOptionsContext);
  const [state, dispatch] = useMicroStore({
    ...initialState,
    value: defaultValue ?? '',
  });

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setValue(name, value);
      dispatch({ value });
    },
    setFocus: () => {
      setFocus(name);
    },
  }));

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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    let newValue: string | number = event.target.value;

    setValue(name, newValue);
    dispatch({ value: newValue });
  };

  return (
    <>
      <div className="relative">
        {label && (
          <label className={labelClassName} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={wrapperClassName}>
          <input
            {...register(name, {
              value: defaultValue,
            })}
            id={name}
            type="range"
            className={className}
            onFocus={handleOnFocus}
            onChange={handleOnChange}
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

export default BaseInputRange;

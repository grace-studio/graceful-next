import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useImperativeHandle,
} from 'react';
import { FocusEvent, useEffect } from 'react';
import { FieldError, useFormContext, useWatch } from 'react-hook-form';
import { useMicroStore } from '../hooks/useMicroStore';

export type RadioButtonState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  value: string;
  checked: boolean;
};

const initialState: RadioButtonState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  value: '',
  checked: false,
};

export type BaseRadioButtonProps = {
  name: string;
  value: string;
  label?: ReactNode;
  disabled?: boolean;
  onStateChange?: (state: RadioButtonState) => void;
};

export type BaseRadioButtonRef = {
  setValue: (value: string) => void;
};

type InternalProps = {
  className?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseRadioButton = forwardRef<
  BaseRadioButtonRef,
  BaseRadioButtonProps & InternalProps
>(function BaseRadioButton(
  {
    label,
    className = 'border-4 outline-none border-black bg-white h-10 w-full px-4 text-black disabled:bg-gray-200 disabled:text-gray-400',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
    value,
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
    setValue: (value: string) => setValue(name, value),
  }));

  const currentValue = useWatch({ name });

  useEffect(() => {
    const newState = {
      ...state,
      checked: String(currentValue) === String(value),
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

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.value);
    dispatch({ value: event.target.value });
  };

  return (
    <>
      <div className="relative">
        <input
          {...register(name)}
          onFocus={handleOnFocus}
          onBlur={handleOnFocus}
          onChange={handleOnChange}
          id={`${name}-${value}`}
          className={className}
          value={value}
          type="radio"
          {...props}
        />
        {label && (
          <label className={labelClassName} htmlFor={`${name}-${value}`}>
            {label}
          </label>
        )}
        {state.errorMessage && !props.disabled && (
          <div className={errorClassName}>{state.errorMessage}</div>
        )}
      </div>
    </>
  );
});

export default BaseRadioButton;

import React, {
  ChangeEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FocusEvent, useEffect } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { useMicroStore } from '../hooks/useMicroStore';
import './input.css';

export type InputState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  value: string;
};

const initialState: InputState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  value: '',
};

type BaseInputFieldAny = {
  type: 'email' | 'text';
};

type BaseInputFieldNumber = {
  type: 'number';
  step?: string;
  min?: string;
  max?: string;
};

type InputMode =
  | 'text'
  | 'search'
  | 'tel'
  | 'url'
  | 'email'
  | 'numeric'
  | 'decimal'
  | 'none';

export type BaseInputFieldProps = {
  name: string;
  label?: ReactNode;
  note?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  onStateChange?: (state: InputState) => void;
  inputMode?: InputMode;
} & (BaseInputFieldAny | BaseInputFieldNumber);

export type BaseInputFieldRef = {
  setValue: (value: string) => void;
};

type InternalProps = {
  className?: string;
  wrapperClasssName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseInputField = forwardRef<
  BaseInputFieldRef,
  BaseInputFieldProps & InternalProps
>(function BaseInputField(
  {
    label,
    note,
    wrapperClasssName = '',
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
    formState: { errors },
  } = useFormContext();
  const [state, dispatch] = useMicroStore(initialState);

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => setValue(name, value),
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
    setValue(name, event.target.value);
    dispatch({ value: event.target.value });
  };

  return (
    <>
      <div className="relative">
        {label && (
          <label className={labelClassName} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={wrapperClasssName}>
          <input
            {...register(name)}
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
            onChange={handleOnChange}
            id={name}
            className={className}
            {...(props.type === 'number' &&
              props.step === '1' && {
                onKeyDown: (event) => {
                  const isAllowed = [
                    ...'0123456789',
                    'Backspace',
                    'Tab',
                    'Enter',
                  ].includes(event.key);

                  if (!isAllowed) {
                    event.preventDefault();
                  }
                },
              })}
            {...props}
          />
          {note}
        </div>
        {state.errorMessage && !props.disabled && (
          <div className={errorClassName}>{state.errorMessage}</div>
        )}
      </div>
    </>
  );
});

export default BaseInputField;

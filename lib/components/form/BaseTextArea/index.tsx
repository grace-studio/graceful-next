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

export type TextAreaState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  value: string | number;
};

const initialState: TextAreaState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  value: '',
};

export type BaseTextAreaProps = {
  name: string;
  label?: ReactNode;
  note?: ReactNode;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  resize?: boolean;
  onStateChange?: (state: TextAreaState) => void;
};

export type BaseTextAreaRef = {
  setValue: (value: string) => void;
  setFocus: () => void;
};

type InternalProps = {
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseTextArea = forwardRef<
  BaseTextAreaRef,
  BaseTextAreaProps & InternalProps
>(function BaseTextArea(
  {
    label,
    note,
    wrapperClassName = '',
    className = 'border-4 outline-none border-black bg-white h-10 w-full px-4 text-black disabled:bg-gray-200 disabled:text-gray-400',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
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
  const [state, dispatch] = useMicroStore(initialState);

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

  const handleOnFocus = (event: FocusEvent<HTMLTextAreaElement>) => {
    const hasFocus = event.type === 'focus';
    dispatch({ hasFocus });
    hasFocus && dispatch({ isTouched: true });
  };

  const handleOnChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
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
          <textarea
            {...register(name)}
            onFocus={handleOnFocus}
            onBlur={handleOnFocus}
            onChange={handleOnChange}
            id={name}
            className={className}
            onInput={(event) => {
              const elem = event.target as any;
              if ((elem.maxLength || 0) > 0) {
                elem.value = elem.value.slice(0, elem.maxLength);
              }
            }}
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
export default BaseTextArea;

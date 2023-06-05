import React, {
  ChangeEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { FocusEvent, useEffect } from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { useMicroStore } from '../hooks/useMicroStore';

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

type BaseInputFieldAny = {
  type: 'email' | 'text' | 'search';
};

type BaseInputFieldNumber = {
  type: 'number';
  decimalPoint?: ',' | '.';
  max?: number;
  min?: number;
  integer?: boolean;
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
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onStateChange?: (state: InputState) => void;
  inputMode?: InputMode;
  pattern?: string;
} & (BaseInputFieldAny | BaseInputFieldNumber);

export type BaseInputFieldRef = {
  setValue: (value: string) => void;
  setFocus: () => void;
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
    className = 'border-4 outline-none border-gray-900 bg-gray-100 h-16 text-lg w-full \
    px-6 text-black disabled:bg-gray-200 disabled:text-gray-400 focus:border-fuchsia-600',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
    inputMode: _inputMode,
    ...props
  },
  ref
) {
  const {
    register,
    setValue,
    formState: { errors },
    setFocus,
  } = useFormContext();
  const [state, dispatch] = useMicroStore(initialState);

  let inputMode = _inputMode;
  if (!inputMode) {
    if (props.type === 'number' && props.integer) {
      inputMode = 'numeric';
    }

    if (props.type === 'number' && !props.integer) {
      inputMode = 'decimal';
    }
  }

  const decimalPoint = props.type === 'number' ? props.decimalPoint : '.';
  const integer = props.type === 'number' ? props.integer : false;
  const max = props.type === 'number' ? props.max : undefined;
  const min = props.type === 'number' ? props.min : undefined;
  if (props.type === 'number') {
    delete props.decimalPoint;
    delete props.integer;
    delete props.max;
    delete props.min;
  }

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

  const handleNumberInput = (value: string) => {
    let returnValue = value;
    // Strip unwanted characters
    returnValue = returnValue.replace(/[^\d\,\.]/g, '');

    // Replace decimal point with dot
    const dPoint = decimalPoint || '.';
    returnValue = returnValue.replace(/[\.\,]+/g, '.');

    // Allow max one dot
    const [first, ...parts] = returnValue.split('.');
    if (parts.length) {
      returnValue = `${first || '0'}.${parts.join('')}`;
    }

    // Check if valid number
    if (isNaN(Number(returnValue))) {
      returnValue = '';
    }

    // Round if integer
    if (integer) {
      returnValue = Math.round(Number(returnValue)).toString();
    }

    // Handle number max value
    if (max && Number(returnValue) > max) {
      returnValue = max.toString();
    }

    // Replace decimal point with preferred one
    returnValue = returnValue.replace(/[\.\,]+/g, dPoint);

    return returnValue;
  };

  const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
    const elem = event.target as any;

    if (min && Number(elem.value) < min) {
      elem.value = min.toString();
    }

    handleOnFocus(event);
  };

  const handleOnInput = (event: any) => {
    const elem = event.target as any;
    if ((elem.maxLength || 0) > 0) {
      elem.value = elem.value.slice(0, elem.maxLength);
    }

    if (props.type === 'number') {
      elem.value = handleNumberInput(elem.value);
    }
  };

  const handleOnKeyDown = (event: any) => {
    const { metaKey, ctrlKey, altKey } = event;

    if (metaKey || ctrlKey || altKey) {
      return;
    }

    if (props.type === 'number') {
      const isAllowed = [
        ...'0123456789,.',
        'ArrowUp',
        'ArrowDown',
        'ArrowLeft',
        'ArrowRight',
        'Backspace',
        'Tab',
        'Enter',
      ].includes(event.key);

      if (!isAllowed) {
        event.preventDefault();
        return;
      }
    }
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
            id={name}
            className={className}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            onChange={handleOnChange}
            onInput={handleOnInput}
            onKeyDown={handleOnKeyDown}
            inputMode={inputMode}
            {...props}
            type={props.type === 'number' ? 'text' : props.type}
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

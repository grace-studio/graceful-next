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


export type BaseSelectProps = {
  name: string;
  label?: ReactNode;
  note?: ReactNode;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  onStateChange?: (state: InputState) => void;
  pattern?: string;
  options: {label:string,value:string}[];
  defaultValue?:string;
} ;

export type BaseSelectRef = {
  setValue: (value: string) => void;
  setFocus: () => void;
};

type InternalProps = {
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseSelect = forwardRef<
  BaseSelectRef,
  BaseSelectProps & InternalProps
>(function BaseSelect(
  {
    label,
    note = <div className="absolute my-[auto] pointer-events-none right-0 mr-6 flex-none flex flex-fow justify-center items-center"><span>▼</span></div>,
    // wrapperClassName = '',
    // className = 'border-4 outline-none border-gray-900 bg-gray-100 h-16 text-lg w-full \
    // px-6 text-black disabled:bg-gray-200 disabled:text-gray-400 focus:border-fuchsia-600 appearance-none',
    className = 'appearance-none flex-1 h-full px-6',
    wrapperClassName = 'flex flex-row justify-center items-center border-4 outline-none border-gray-900 bg-gray-100 h-16 text-lg  \
    text-black disabled:bg-gray-200 disabled:text-gray-400 focus:border-fuchsia-600 content-center',
    labelClassName = 'block',
    errorClassName = 'text-red-500',
    onStateChange,
    defaultValue,
    options,
    name,
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
          <select
            {...register(name)}
            id={name}
            className={className}
            onFocus={handleOnFocus}
            onChange={handleOnChange}
            defaultValue={defaultValue}
            {...props}
          >
            {options?.map((option)=>(
              <option value={option.value}>{option.label}</option>
            ))}

          </select>
          {note}
          
        </div>
        {state.errorMessage && !props.disabled && (
          <div className={errorClassName}>{state.errorMessage}</div>
        )}
      </div>
    </>
  );
});

export default BaseSelect;

import React, {
  ChangeEvent,
  forwardRef,
  ReactNode,
  useImperativeHandle,
  FocusEvent,
  useEffect,
} from 'react';
import { FieldError, useFormContext, useWatch } from 'react-hook-form';
import { useMicroStore } from '../../hooks/useMicroStore';

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
  wrapperClassName?: string;
  labelClassName?: string;
  errorClassName?: string;
};

const BaseRadioButton = forwardRef<
  BaseRadioButtonRef,
  BaseRadioButtonProps & InternalProps
>(function BaseRadioButton(
  {
    label,
    wrapperClassName = 'grid grid-cols-[1fr_auto] items-center \
    outline outline-4 outline-offset-2 outline-transparent focus-within:outline-fuchsia-600',
    className = 'block appearance-none border-4 rounded-full \
    outline-none border-gray-900 bg-gray-100 h-8 w-8 checked:bg-red-400',
    labelClassName = 'block text-lg',
    errorClassName = 'text-red-500',
    onStateChange,
    name,
    value,
    ...props
  },
  ref,
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
      value,
      checked: String(currentValue) === String(value),
    };
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
        <div className={wrapperClassName}>
          {label && (
            <label className={labelClassName} htmlFor={`${name}-${value}`}>
              {label}
            </label>
          )}
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
        </div>
        {state.errorMessage && !props.disabled && (
          <div className={errorClassName}>{state.errorMessage}</div>
        )}
      </div>
    </>
  );
});

export default BaseRadioButton;

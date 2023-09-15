import React, {
  forwardRef,
  ReactNode,
  useImperativeHandle,
  FocusEvent,
  useEffect,
} from 'react';
import { FieldError, useFormContext, useWatch } from 'react-hook-form';
import { useMicroStore } from '../../hooks/useMicroStore';

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
    wrapperClassName = 'grid grid-cols-[1fr_auto] items-center \
    outline outline-4 outline-offset-2 outline-transparent focus-within:outline-fuchsia-600',
    className = 'block appearance-none border-4 outline-none \
    border-gray-900 bg-gray-100 h-8 w-8 checked:bg-red-400',
    labelClassName = 'block text-lg',
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

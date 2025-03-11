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
import { useMicroStore } from '../../hooks/useMicroStore';
import { FormOptionsContext } from './Form';

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
    // className = 'border-4 outline-none border-gray-900 bg-gray-100 h-16 text-lg w-full \
    // px-6 text-black disabled:bg-gray-200 disabled:text-gray-400 focus:border-fuchsia-600',
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
    watch,
  } = useFormContext();
  const [state, dispatch] = useMicroStore({
    ...initialState,
    value: defaultValue ?? '',
  });
  const formOptions = useContext(FormOptionsContext);
  const currentValue = watch();

  // Set variables for number props, and delete from 'props'
  // const decimalPoint = props.type === 'number' ? props.decimalPoint : '.';
  // const integer = props.type === 'number' ? props.integer : false;
  // const decimals = props.type === 'number' ? props.decimals : undefined;
  // const max = props.type === 'number' ? props.max : undefined;
  // const min = props.type === 'number' ? props.min : undefined;
  // const valueTransform =
  //   props.type === 'number' ? props.valueTransform : undefined;
  // const onMaxValue = props.type === 'number' ? props.onMaxValue : undefined;
  // const onMinValue = props.type === 'number' ? props.onMinValue : undefined;
  // if (props.type === 'number') {
  //   delete props.decimalPoint;
  //   delete props.integer;
  //   delete props.decimals;
  //   delete props.max;
  //   delete props.min;
  //   delete props.valueTransform;
  //   delete props.onMaxValue;
  //   delete props.onMinValue;
  // }

  // const formatNumberValue = (value: string) => {
  //   let returnValue = String(value);
  //   // Strip unwanted characters
  //   returnValue = returnValue.replace(/[^\d\,\.\-]/g, '');

  //   // Replace decimal point with dot
  //   const dPoint = decimalPoint || '.';
  //   returnValue = returnValue.replace(/[\.\,]+/g, '.');

  //   // Allow max one dot
  //   const [first, ...parts] = returnValue.split('.');
  //   if (parts.length) {
  //     returnValue = `${first || '0'}.${parts.join('')}`;
  //   }

  //   // Add leading zero for negative values
  //   if (returnValue === '-.') {
  //     returnValue = '-0.';
  //   }

  //   // Check if valid number
  //   if (returnValue && returnValue !== '-' && isNaN(Number(returnValue))) {
  //     returnValue = '';
  //   }

  //   // Round if integer
  //   if (returnValue && returnValue !== '-' && integer) {
  //     returnValue = Math.round(Number(returnValue)).toString();
  //   }

  //   // Handle number max value, max > 0
  //   if (max && max > 0 && Number(returnValue) > max) {
  //     returnValue = max.toString();
  //     onMaxValue && onMaxValue();
  //   }

  //   // Handle decimals
  //   if (
  //     decimals &&
  //     returnValue &&
  //     returnValue !== '-' &&
  //     !returnValue.endsWith('.') &&
  //     decimals > 0
  //   ) {
  //     const [first, rest = ''] = returnValue.split('.');
  //     returnValue = Number(`${first}.${rest.slice(0, decimals)}`).toString();
  //   }

  //   // Replace decimal point with preferred one
  //   returnValue = returnValue.replace(/[\.\,]+/g, dPoint);

  //   return returnValue;
  // };

  // const formatValue = (value: string) => {
  //   let newValue = value;
  //   if ((props.maxLength || 0) > 0) {
  //     newValue = newValue.slice(0, props.maxLength);
  //   }

  //   if (props.type === 'number') {
  //     newValue = formatNumberValue(newValue);
  //   }

  //   return newValue;
  // };

  useImperativeHandle(ref, () => ({
    setValue: (value: string) => {
      setValue(name, value);
      dispatch({ value });
    },
    setFocus: () => {
      setFocus(name);
    },
  }));

  // useEffect(() => {
  //   const value = currentValue[name];
  //   const stateValue = state.value;
  //   if (value && value !== stateValue) {
  //     const newValue = formatValue(value);
  //     setValue(name, newValue);
  //     dispatch({ value: newValue });
  //   } else if (stateValue && value !== stateValue) {
  //     const newValue = formatValue(stateValue);
  //     setValue(name, newValue);
  //     dispatch({ value: newValue });
  //   }
  // }, [currentValue]);

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

  // const handleOnBlur = (event: FocusEvent<HTMLInputElement>) => {
  //   const elem = event.target as any;

  //   if (props.type === 'number') {
  //     if (elem.value === '-') {
  //       elem.value = '';
  //     }

  //     // Handle min value
  //     if (elem.value && typeof min === 'number' && Number(elem.value) < min) {
  //       elem.value = min.toString();
  //       onMinValue && onMinValue();
  //     }

  //     // Handle max value, max < 0
  //     if (elem.value && max && max <= 0 && Number(elem.value) >= max) {
  //       elem.value = max.toString();
  //       onMaxValue && onMaxValue();
  //     }

  //     if (valueTransform && elem.value) {
  //       elem.value = valueTransform(Number(elem.value)).toString();
  //     }
  //   }

  //   handleOnFocus(event);
  //   setValue(name, elem.value);
  // };

  // const handleOnInput = (event: any) => {
  //   const elem = event.target;
  //   elem.value = formatValue(elem.value);
  // };

  // const handleOnKeyDown = (event: any) => {
  //   const elem = event.target as any;
  //   const { metaKey, ctrlKey, altKey } = event;

  //   if (metaKey || ctrlKey || altKey) {
  //     return;
  //   }

  //   if (event.key === 'Enter') {
  //     onEnter && onEnter();

  //     if (formOptions.preventSubmitOnEnter) {
  //       event.preventDefault();
  //       return;
  //     }
  //   }

  //   if (event.key === 'ArrowUp' && onArrowUp) {
  //     onArrowUp();
  //     event.preventDefault();
  //     return;
  //   }

  //   if (event.key === 'ArrowDown' && onArrowDown) {
  //     onArrowDown();
  //     event.preventDefault();
  //     return;
  //   }

  //   if (props.type === 'number') {
  //     let isAllowed = [
  //       'Enter',
  //       '0',
  //       '1',
  //       '2',
  //       '3',
  //       '4',
  //       '5',
  //       '6',
  //       '7',
  //       '8',
  //       '9',
  //       ',',
  //       '.',
  //       '-',
  //       'ArrowUp',
  //       'ArrowDown',
  //       'ArrowLeft',
  //       'ArrowRight',
  //       'Backspace',
  //       'Tab',
  //     ].includes(event.key);

  //     if (elem.value.length > 0 && elem.selectionStart && event.key === '-') {
  //       isAllowed = false;
  //     }

  //     if (typeof min === 'number' && min >= 0 && event.key === '-') {
  //       isAllowed = false;
  //     }

  //     if (!isAllowed) {
  //       event.preventDefault();
  //       return;
  //     }
  //   }
  // };

  return (
    <>
      <div className="relative">
        {label && (
          <label className={labelClassName} htmlFor={name}>
            {label}
          </label>
        )}
        <div className={wrapperClassName}>
          {/* <input type="range" min="1" max="100" value="50" class="slider" id="myRange" /> */}
          <input
            {...register(name, {
              value: defaultValue,
            })}
            id={name}
            type="range"
            className={className}
            onFocus={handleOnFocus}
            // onBlur={handleOnBlur}
            onChange={handleOnChange}
            // onInput={handleOnInput}
            // onKeyDown={handleOnKeyDown}
            // inputMode={inputMode}
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

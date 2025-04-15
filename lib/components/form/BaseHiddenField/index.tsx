'use client';
import React, { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMicroStore } from '../../../hooks';

export type InputState = {
  value: string | number;
};

const initialState: InputState = {
  value: '',
};

export type BaseHiddenFieldProps = {
  name: string;
  defaultValue?: any;
  onStateChange?: (state: InputState) => void;
};

export type BaseHiddenFieldRef = {
  setValue: (value: string) => void;
};

const BaseHiddenField = forwardRef<BaseHiddenFieldRef, BaseHiddenFieldProps>(
  function BaseHiddenField({ defaultValue, name, onStateChange }, ref) {
    const { register, setValue, watch } = useFormContext();
    const currentValue = watch();
    const [state, dispatch] = useMicroStore({
      ...initialState,
      value: defaultValue ?? '',
    });

    useImperativeHandle(ref, () => ({
      setValue: (value: string) => {
        setValue(name, value);
        dispatch({ value });
      },
    }));

    useEffect(() => {
      onStateChange && onStateChange(state);
    }, [onStateChange, state]);

    useEffect(() => {
      const value = currentValue[name];
      const stateValue = state.value;
      if (value && value !== stateValue) {
        setValue(name, value);
        dispatch({ value });
      } else if (stateValue && value !== stateValue) {
        setValue(name, stateValue);
        dispatch({ value: stateValue });
      }
    }, [currentValue]);

    return (
      <input
        {...register(name, {
          value: defaultValue,
        })}
        id={name}
        type="hidden"
      />
    );
  },
);

export default BaseHiddenField;

'use client';
import React, {
  ChangeEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from 'react';
import { FieldError, useFormContext } from 'react-hook-form';
import { useMicroStore } from '../../hooks/useMicroStore';

export type FileInputState = {
  hasFocus: boolean;
  isTouched: boolean;
  errorMessage: string;
  value: FileList | null;
  fileNames: string[];
};

const initialState: FileInputState = {
  hasFocus: false,
  isTouched: false,
  errorMessage: '',
  value: null,
  fileNames: [],
};

export type BaseInputFileProps = {
  name: string;
  label?: ReactNode;
  uploadLabel?: ReactNode;
  note?: ReactNode;
  autoComplete?: string;
  placeholder?: string;
  disabled?: boolean;
  maxLength?: number;
  accept?: string;
  multiple?: boolean;
  onFilesChange?: (files: FileList | null) => void;
  onStateChange?: (state: FileInputState) => void;
};

export type BaseInputFileRef = {};

type InternalProps = {
  className?: string;
  wrapperClassName?: string;
  labelClassName?: string;
  labelWrapperClassName?: string;
  filesCountClassName?: string;
  fileNamesClassName?: string;
  errorClassName?: string;
};

const BaseInputFile = forwardRef<
  BaseInputFileRef,
  BaseInputFileProps & InternalProps
>(function BaseInputFile(
  {
    label,
    note = '⬆️',
    uploadLabel,
    className = 'opacity-0 h-0 w-0 absolute pointer-events-none',
    wrapperClassName = 'border-4 outline-none border-gray-900 bg-gray-100 h-16 text-lg w-full \
    px-6 text-black disabled:bg-gray-200 disabled:text-gray-400 focus:border-fuchsia-600 grid grid-cols-[1fr_auto] content-center',
    labelClassName = 'flex items-center',
    labelWrapperClassName = 'flex items-center cursor-pointer',
    filesCountClassName = '',
    fileNamesClassName = '',
    errorClassName = 'text-red-500',
    onStateChange,
    onFilesChange,
    name,
    ...props
  },
  ref,
) {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  const [state, dispatch] = useMicroStore(initialState);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const fileList = e.target?.files;

    onFilesChange && onFilesChange(fileList);

    if (fileList) {
      const files = Array.from(fileList).map((file) => file.name);
      dispatch({ fileNames: files });
    } else {
      dispatch({ fileNames: [] });
    }
  }

  useImperativeHandle(ref, () => ({}));

  useEffect(() => {
    const error = errors && (errors[name] as FieldError);
    state.isTouched && dispatch({ errorMessage: error?.message || '' });
  }, [errors, name, dispatch, state]);

  useEffect(() => {
    onStateChange && onStateChange(state);
  }, [onStateChange, state]);

  return (
    <>
      <div className="relative ">
        {label && <div className={labelClassName}>{label}</div>}

        <div className={wrapperClassName}>
          <label className={labelWrapperClassName + ' relative'} htmlFor={name}>
            {uploadLabel}
            {state.fileNames.length > 0 && (
              <>
                <div className={filesCountClassName}>
                  ({state.fileNames.length})
                </div>
                <div className={fileNamesClassName}>
                  {state.fileNames.join(',')}
                </div>
              </>
            )}
          </label>
          <input
            {...register(name)}
            type="file"
            id={name}
            className={className}
            onChange={handleChange}
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
export default BaseInputFile;

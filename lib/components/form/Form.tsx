'use client';
import React, {
  createContext,
  forwardRef,
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  FieldValues,
  FormProvider,
  useForm,
  UseFormProps,
  UseFormReturn,
} from 'react-hook-form';
import { ObjectSchema } from 'yup';
import classNames from 'classnames';

type FormOptionsContextType = {
  disabled?: boolean;
  preventSubmitOnEnter?: boolean;
};

export const FormOptionsContext = createContext<FormOptionsContextType>({});

type FormProps = PropsWithChildren<
  FormOptionsContextType & {
    onSubmit: (values: Record<string, string>) => void;
    onValuesChange?: (values: Record<string, string>) => void;
    validationSchema?: ObjectSchema<any>;
    defaultValues?: any;
    formProps?: UseFormProps;
    className?: string;
  }
>;

export type FormRef = UseFormReturn;

const Form = forwardRef<FormRef, FormProps>(function Form(
  {
    onSubmit,
    onValuesChange,
    validationSchema,
    children,
    defaultValues,
    className,
    formProps = {},
    ...formOptions
  },
  ref,
) {
  const methods = useForm({
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
    defaultValues,
    shouldUnregister: true,
    ...formProps,
  });
  const watch = methods.watch();
  const formState = useRef<{ values: Record<string, string> }>({ values: {} });
  const fieldsetRef = useRef<HTMLFieldSetElement>(null);

  useEffect(() => {
    if (formOptions.disabled) {
      fieldsetRef.current?.setAttribute('disabled', 'true');
    } else {
      fieldsetRef.current?.removeAttribute('disabled');
    }
  }, [formOptions.disabled]);

  useEffect(() => {
    const currentValues = JSON.stringify(formState.current.values);
    const newValues = JSON.stringify(watch);

    if (currentValues !== newValues) {
      formState.current.values = JSON.parse(newValues);
      onValuesChange && onValuesChange(JSON.parse(newValues));
    }
  }, [watch]);

  useImperativeHandle(ref, () => methods);
  const handleOnSubmit = (data: FieldValues) => onSubmit && onSubmit(data);
  const classes = classNames('block h-full', className);

  return (
    <FormOptionsContext.Provider value={formOptions}>
      <FormProvider {...methods}>
        <form
          className={classes}
          onSubmit={methods.handleSubmit(handleOnSubmit)}
        >
          <fieldset ref={fieldsetRef}>{children}</fieldset>
        </form>
      </FormProvider>
    </FormOptionsContext.Provider>
  );
});

export default Form;

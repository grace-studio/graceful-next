import React, {
  forwardRef,
  PropsWithChildren,
  useImperativeHandle,
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

type FormProps = PropsWithChildren<{
  onSubmit: (values: any) => void;
  validationSchema?: ObjectSchema<any>;
  defaultValues?: any;
  formProps?: UseFormProps;
  className?: string;
}>;

export type FormRef = UseFormReturn;

const Form = forwardRef<FormRef, FormProps>(function Form(
  {
    onSubmit,
    validationSchema,
    children,
    defaultValues,
    className,
    formProps = {},
  },
  ref
) {
  const methods = useForm({
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
    defaultValues,
    ...formProps,
  });

  useImperativeHandle(ref, () => methods);
  const handleOnSubmit = (data: FieldValues) => onSubmit && onSubmit(data);
  const classes = classNames('block h-full', className);

  return (
    <FormProvider {...methods}>
      <form className={classes} onSubmit={methods.handleSubmit(handleOnSubmit)}>
        {children}
      </form>
    </FormProvider>
  );
});

export default Form;

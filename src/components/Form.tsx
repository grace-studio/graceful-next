import React, {
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

type FormProps = PropsWithChildren<{
  onSubmit: (values: Record<string, string>) => void;
  onValuesChange?: (values: Record<string, string>) => void;
  validationSchema?: ObjectSchema<any>;
  defaultValues?: any;
  formProps?: UseFormProps;
  className?: string;
}>;

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
  },
  ref
) {
  const methods = useForm({
    ...(validationSchema && { resolver: yupResolver(validationSchema) }),
    defaultValues,
    shouldUnregister: true,
    ...formProps,
  });
  const watch = methods.watch();
  const formState = useRef<{values: Record<string, string>}>({values: {}});

  useEffect(() => {
    const currentValues = JSON.stringify(formState.current.values);

    if (currentValues !== JSON.stringify(watch)) {
      formState.current.values = {...watch};
      onValuesChange && onValuesChange(watch);
    }
  }, [watch]);

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

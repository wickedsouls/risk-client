import React from 'react';
import { TextInput as Input } from '../common/TextInput';
import { useField, FieldHookConfig } from 'formik';

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const TextInput: React.FC<FieldHookConfig<string> & Props> = ({
  ...props
}) => {
  const [field, meta] = useField(props);
  return <Input error={meta.error} {...props} {...field} />;
};

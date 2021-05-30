import * as React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  type?: string;
} & TextFieldProps;

const InputField: React.FC<InputFieldProps> = ({
  name,
  label,
  type = 'text',
  ...props
}) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const { ref, ...registerProps } = register(name);
  return (
    <TextField
      {...props}
      {...registerProps}
      inputRef={ref}
      error={!!errors[name] && !!touchedFields[name]}
      helperText={
        !!errors[name] && !!touchedFields[name]
          ? errors[name].message
          : undefined
      }
      label={label}
      type={type}
      variant="outlined"
    />
  );
};

export default InputField;

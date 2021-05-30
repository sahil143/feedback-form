import * as React from 'react';
import {
  Checkbox,
  CheckboxProps,
  FormControlLabel,
  FormGroup,
  FormHelperText,
} from '@material-ui/core';
import { useFormContext } from 'react-hook-form';

type CheckboxFieldProps = {
  name: string;
  label: string;
} & CheckboxProps;

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  name,
  label,
  ...props
}) => {
  const {
    register,
    formState: { errors, touchedFields },
  } = useFormContext();
  const { ref, ...registerProps } = register(name);
  return (
    <>
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              {...props}
              {...registerProps}
              inputRef={ref}
              color="primary"
            />
          }
          label={label}
        />
      </FormGroup>
      {!!errors[name] && !!touchedFields[name] ? (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      ) : undefined}
    </>
  );
};

export default CheckboxField;

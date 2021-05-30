import * as React from 'react';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import { REQUIRED } from '../../const';
import { FormStateContext } from '../../hooks';
import InputField from '../inputs/InputField';
import FormWrapper from '../FormWrapper';

const passwordValidationSchema = yup.object({
  password: yup.string().required(REQUIRED),
  password_repeat: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
});

const Password: React.FC = () => {
  const { setFormState } = React.useContext(FormStateContext);
  return (
    <FormWrapper
      onSubmit={(data) => {
        if (data) {
          delete data['password_repeat'];
          setFormState?.((prevState) => ({ ...prevState, ...data }));
        }
      }}
      defaultValues={{ password: '', password_repeat: '' }}
      validationSchema={passwordValidationSchema}
      submitLabel="Next"
      cancelLabel="Back"
      stepperForm
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <InputField
            name="password"
            label="Password"
            type="password"
            fullWidth
          />
        </Grid>
        <Grid item>
          <InputField
            name="password_repeat"
            label="Reenter Password"
            type="password"
            fullWidth
          />
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default Password;

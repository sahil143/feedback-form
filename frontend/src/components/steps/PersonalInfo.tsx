import * as React from 'react';
import * as yup from 'yup';
import { Grid } from '@material-ui/core';
import { REQUIRED } from '../../const';
import { FormStateContext } from '../../hooks';
import FormWrapper from '../FormWrapper';
import InputField from '../inputs/InputField';

const personalInfoValidationSchema = yup.object({
  name: yup.string().max(50, 'Cannot exceed 50 character').required(REQUIRED),
  email: yup.string().email().required(REQUIRED),
  phone_number: yup
    .number()
    .positive('Can only be +ve digits')
    .integer('Has to be an integer'),
});

const PersonalInfo: React.FC = () => {
  const { formState, setFormState } = React.useContext(FormStateContext);
  return (
    <FormWrapper
      onSubmit={(data) => {
        if (data) {
          setFormState?.((prevState) => ({ ...prevState, ...data }));
        }
      }}
      defaultValues={{ ...formState }}
      validationSchema={personalInfoValidationSchema}
      submitLabel="Next"
      stepperForm
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <InputField name="name" label="Name" fullWidth />
        </Grid>
        <Grid item>
          <InputField name="email" label="Email" fullWidth />
        </Grid>
        <Grid item>
          <InputField name="phone_number" label="Phone number" fullWidth />
        </Grid>
      </Grid>
    </FormWrapper>
  );
};

export default PersonalInfo;

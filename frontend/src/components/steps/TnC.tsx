import * as React from 'react';
import * as yup from 'yup';
import { useHistory } from 'react-router-dom';
import { FormStateContext } from '../../hooks';
import { REQUIRED } from '../../const';
import { submitForm } from '../../utils';
import FormWrapper from '../FormWrapper';
import CheckboxField from '../inputs/CheckboxField';

const tncValidationSchema = yup.object({
  tnc: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(REQUIRED),
});

const TnC: React.FC = () => {
  const { formState } = React.useContext(FormStateContext);
  const history = useHistory();
  return (
    <FormWrapper
      onSubmit={(data) => {
        submitForm(formState).then(() => {
          history.push(`/feedbacks`);
        });
      }}
      defaultValues={{ tnc: false }}
      validationSchema={tncValidationSchema}
      submitLabel="Submit"
      cancelLabel="Back"
      stepperForm
    >
      <CheckboxField name="tnc" label="I agree to Terms and conditions" />
    </FormWrapper>
  );
};

export default TnC;

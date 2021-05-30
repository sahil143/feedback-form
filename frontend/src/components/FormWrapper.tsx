import * as React from 'react';

import { Button, Grid } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import { StepperContext } from './Stepper';
import { useYupValidationResolver } from '../hooks';
import { FormDefaultValueType } from '../type';

type FormWrapperProps = {
  /**
   * label to show on submit button
   * @default 'Submit'
   */
  submitLabel?: string;
  /**
   * label to show on cancel button
   * @default 'Cancel
   */
  cancelLabel?: string;
  /**
   * submit button callback
   */
  onSubmit: (data: { [key: string]: string | number | boolean }) => void;
  /**
   * cancel button callback
   */
  onCancel?: () => void;
  /**
   * yup validation schema for the form, will be resolved using hook `useYupValidationResolver`
   */
  validationSchema: any;
  /**
   * default values for form
   */
  defaultValues?: FormDefaultValueType;
  /**
   * should be set to true when Form is being wrapper by Stepper component and individual step is a form
   * @default false
   */
  stepperForm?: boolean;
};

const FormWrapper: React.FC<FormWrapperProps> = ({
  children,
  onSubmit,
  onCancel,
  defaultValues,
  validationSchema,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  stepperForm = false,
}) => {
  const resolver = useYupValidationResolver(validationSchema);
  const methods = useForm({ resolver, defaultValues });
  const { isInitialStep, isFinalStep, nextStep, prevStep } =
    React.useContext(StepperContext);
  const handleSubmit = React.useCallback(
    (data) => {
      onSubmit?.(data);
      stepperForm && !isFinalStep && nextStep?.();
    },
    [onSubmit, nextStep, isFinalStep, stepperForm],
  );
  const handleCancel = React.useCallback(() => {
    onCancel?.();
    stepperForm && prevStep?.();
  }, [onCancel, stepperForm, prevStep]);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(handleSubmit)}>
        <Grid container direction="column" alignItems="stretch" spacing={5}>
          <Grid item>{children}</Grid>
          <Grid container item justify="flex-end" spacing={2}>
            {((stepperForm && !isInitialStep) || onCancel) && (
              <Grid item>
                <Button
                  color="default"
                  variant="outlined"
                  onClick={handleCancel}
                >
                  {cancelLabel}
                </Button>
              </Grid>
            )}
            <Grid item>
              <Button color="primary" variant="contained" type="submit">
                {submitLabel}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FormWrapper;

import * as React from 'react';
import { FormStateContext, useFormStateContextValues } from '../hooks';
import { Password, PersonalInfo, TnC, VideoForm } from './steps';
import Stepper from './Stepper';

const Form: React.FC = () => {
  const values = useFormStateContextValues();
  return (
    <FormStateContext.Provider value={values}>
      <Stepper controlled>
        <PersonalInfo />
        <VideoForm />
        <Password />
        <TnC />
      </Stepper>
    </FormStateContext.Provider>
  );
};

export default Form;

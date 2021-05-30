import * as React from 'react';
import { FormState } from '../type';

type FormStateContextType = {
  formState: FormState;
  setFormState?: React.Dispatch<React.SetStateAction<FormState>>;
};

const initialState: FormState = {
  name: '',
  email: '',
  phone_number: null,
  video: '',
  password: '',
};

export const FormStateContext = React.createContext<FormStateContextType>({
  formState: initialState,
  setFormState: () => {},
});

export const useFormStateContextValues = (): FormStateContextType => {
  const [formState, setFormState] = React.useState<FormState>(initialState);
  return { formState, setFormState };
};

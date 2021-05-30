import * as React from 'react';

export type FormState = {
  name: string;
  email: string;
  phone_number: number | null;
  video: string;
  password: string;
};

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

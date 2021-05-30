import { SchemaOf } from "yup";

export type FormState = PersonalInfoType &
  VideoType &
  Omit<PasswordType, keyof { password_repeat: string }>;

export type Feedback = { id: number } & FormState;

export type FormDefaultValueType = Partial<PersonalInfoType> &
  Partial<PasswordType> &
  Partial<VideoType> &
  Partial<TnCType>;

export type PersonalInfoType = {
  name: string;
  email: string;
  phone_number: number | null;
};

export type VideoType = {
  video: string;
};

export type PasswordType = {
  password: string;
  password_repeat: string;
};

export type TnCType = {
  tnc: boolean;
};

export interface Form {
  id: string;
  username: string;
  password: string;
  email: string;
  description: string;
  checked?: boolean;
  birthday: Date;
}

export interface FormState {
  form: Form;
}

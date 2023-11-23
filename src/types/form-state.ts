export type FormFieldValue =
  | string
  | number
  | boolean
  | Date
  | undefined
  | null;

export type FormInitState = Record<string, FormFieldValue>;

export type FormFieldState = {
  touched: boolean;
};

export type FormFields<S extends FormInitState> = {
  [key in keyof S]: FormFieldState;
};

export type FormState<S extends FormInitState> = {
  values: S;
  fields: FormFields<S>;
};

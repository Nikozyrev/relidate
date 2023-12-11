import { FormFieldValue, FormInitState } from './form-state';

export type ValidationErrorMessage = string;

export type Validator<T extends FormFieldValue, S extends FormInitState> = (
  value: T,
  state: S
) => boolean | ValidationErrorMessage;

export type FieldValidators<
  S extends FormInitState,
  T extends FormFieldValue
> = {
  [k: string]: Validator<T, S>;
};

export type FormValidators<S extends FormInitState> = {
  [key in keyof S]?: FieldValidators<S, S[key]>;
};

export type ValidationError = {
  message: ValidationErrorMessage;
  validator: string;
};

export type ValidatedField = {
  isValid: boolean;
  errors: ValidationError[];
};

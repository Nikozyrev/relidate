import { FormFieldValue, FormInitState } from './form-state';

export type ValidationErrorMessage = string;

export type Validator<T extends FormFieldValue, S extends FormInitState> = (
  value: T,
  state: S
) => boolean | ValidationErrorMessage;

export type FormValidators<S extends FormInitState> = {
  [key in keyof S]?: Validator<S[key], S>[];
};

export type ValidatedField = {
  isValid: boolean;
  errors: string[];
};

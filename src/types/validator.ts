import { FormFieldValue, FormState } from './form-state';

export type Validator<T extends FormFieldValue, S extends FormState> = (
  value: T,
  state: S
) => boolean;

export type FormValidators<S extends FormState> = {
  [key in keyof S]?: Validator<S[key], S>[];
};

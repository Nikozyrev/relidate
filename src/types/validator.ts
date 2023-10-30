import { FormFieldValue, FormInitState } from './form-state';

export type Validator<T extends FormFieldValue, S extends FormInitState> = (
  value: T,
  state: S
) => boolean;

export type FormValidators<S extends FormInitState> = {
  [key in keyof S]?: Validator<S[key], S>[];
};

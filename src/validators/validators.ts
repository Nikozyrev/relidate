import { FormFieldValue, FormInitState } from '../types/form-state';
import { Validator } from '../types/validator';

export const required = (v: unknown) => !!v || 'Required';

export const minLength = (length: number) => (v: string) =>
  v.length >= length || `Min length is ${length}`;

export const maxLength = (length: number) => (v: string) =>
  v.length <= length || `Max length is ${length}`;

export const notNaN = (v: unknown) => !isNaN(Number(v)) || 'Should be number';

const withMessage =
  <T extends FormFieldValue, S extends FormInitState>(
    msg: string,
    f: Validator<T, S>
  ): Validator<T, S> =>
  (v: T, s: S) =>
    f(v, s) === true ? true : msg;

export const helpers = {
  withMessage,
};

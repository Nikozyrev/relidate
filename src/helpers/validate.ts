import { FormFieldValue, FormState } from '../types/form-state';
import { Validator } from '../types/validator';

export const validateField = <T extends FormFieldValue, S extends FormState>(
  validators: Validator<T, S>[] | undefined,
  value: T,
  state: S
) => (validators ? validators.every((f) => f(value, state)) : true);

import { FormFieldValue, FormInitState, FormState } from '../types/form-state';
import { Validator } from '../types/validator';

export const validateField = <
  T extends FormFieldValue,
  S extends FormInitState
>(
  validators: Validator<T, S>[] | undefined,
  value: T,
  state: S
) => (validators ? validators.every((f) => f(value, state)) : true);

export const validateForm = <IS extends FormInitState, S extends FormState<IS>>(
  state: S
) => Object.keys(state.fields).every((key) => state.fields[key].isValid);

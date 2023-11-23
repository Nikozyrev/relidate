import { FormFieldValue, FormInitState } from '../types/form-state';
import { FormValidators, Validator } from '../types/validator';

export const validateField = <
  T extends FormFieldValue,
  S extends FormInitState
>(
  validators: Validator<T, S>[] | undefined,
  value: T,
  state: S
) => (validators ? validators.every((f) => f(value, state)) : true);

export const validateForm = <IS extends FormInitState>(
  state: IS,
  validators?: FormValidators<IS>
) => {
  const entries = Object.entries(state) as [keyof IS, IS[keyof IS]][];
  const validated = entries.map(
    ([k, v]) =>
      [k, validateField(validators && validators[k], v, state)] as const
  );
  const validatedState = Object.fromEntries(validated) as {
    [key in keyof IS]: boolean;
  };
  const isValid = validated.every(([_, isValid]) => isValid);

  return { validatedState, isValid };
};

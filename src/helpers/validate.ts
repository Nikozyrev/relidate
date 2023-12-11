import { FormFieldValue, FormInitState } from '../types/form-state';
import {
  FieldValidators,
  FormValidators,
  ValidatedField,
  Validator,
} from '../types/validator';

const DEFAULT_MSG = 'Invalid';

export const validateField = <
  T extends FormFieldValue,
  S extends FormInitState
>(
  validators: FieldValidators<S, T> | undefined,
  value: T,
  state: S
) => {
  const init: ValidatedField = {
    isValid: true,
    errors: [],
  };

  if (!validators) return init;

  return Object.entries(validators).reduce<ValidatedField>(
    (acc, [validator, validatorFunc]) => {
      const res = validatorFunc(value, state);
      const isValid = res === true;
      const message = typeof res === 'string' ? res : DEFAULT_MSG;
      return {
        isValid: acc.isValid && isValid,
        errors: isValid
          ? [...acc.errors]
          : [...acc.errors, { message, validator }],
      };
    },
    init
  );
};

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
    [key in keyof IS]: ValidatedField;
  };
  const isValid = validated.every(([_, field]) => field.isValid);

  return { validatedState, isValid };
};

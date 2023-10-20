import { FormFieldValue, FormState } from '../types/form-state';
import { FormValidators, Validator } from '../types/validator';

export const validateField = <T extends FormFieldValue, S extends FormState>(
  validators: Validator<T, S>[] | undefined,
  value: T,
  state: S
) => (validators ? validators.every((f) => f(value, state)) : true);

export const validateForm = <S extends FormState>(
  state: S,
  validators?: FormValidators<S>
) => {
  const validatedStateEntries = (
    Object.entries(state) as [keyof S, S[keyof S]][]
  ).map(
    ([key, value]) =>
      [
        key,
        {
          value,
          isValid: validateField(validators && validators[key], value, state),
        },
      ] as const
  );

  const validatedState = Object.fromEntries(validatedStateEntries) as {
    [k in keyof S]: {
      value: S[k];
      isValid: boolean;
    };
  };

  const isValid = validatedStateEntries.every((field) => field[1].isValid);

  return { validatedState, isValid };
};

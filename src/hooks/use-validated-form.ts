import { validateField } from '../helpers/validate';
import { FormState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { useFormState } from './use-form-state';

export function useValidatedForm<S extends FormState>({
  initialState,
  validators,
}: {
  initialState: S;
  validators?: FormValidators<S>;
}) {
  const formState = useFormState({ initialState });

  const validatedStateEntries = (
    Object.entries(formState.state) as [keyof S, S[keyof S]][]
  ).map(
    ([key, value]) =>
      [
        key,
        {
          value,
          isValid: validateField(
            validators && validators[key], // || [] : []
            value,
            formState.state
          ),
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

  return {
    getState: () => formState.state,
    fields: validatedState,
    isValid,
    update: formState.update,
    reset: formState.reset,
  };
}

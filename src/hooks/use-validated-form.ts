import { validateForm } from '../helpers/validate';
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

  const { validatedState, isValid } = validateForm(formState.state, validators);

  return {
    getState: () => formState.state,
    fields: validatedState,
    isValid,
    update: formState.update,
    reset: formState.reset,
  };
}

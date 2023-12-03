import { FormInitState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { combineFormState } from '../helpers/form-state';
import { validateForm } from '../helpers/validate';
import { useFormValues } from './use-form-values';
import { createRegister } from '../helpers/register';

export function useForm<IS extends FormInitState>({
  initialState,
  validators,
}: {
  initialState: IS;
  validators?: FormValidators<IS>;
}) {
  const { state, getState, reset, touch, update } = useFormValues(initialState);

  const { validatedState, isValid } = validateForm(state.values, validators);

  const fields = combineFormState<IS, typeof state>(state, validatedState);

  const register = createRegister(initialState, state.values, update, touch);

  return {
    fields,
    isValid,
    getState,
    register,
    update,
    reset,
    touch,
  };
}

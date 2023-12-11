import { useCallback } from 'react';
import { FormInitState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { combineFormState } from '../helpers/form-state';
import { validateForm } from '../helpers/validate';
import { useFormValues } from './use-form-values';
import { createRegister } from '../helpers/register';
import { useFormFields } from './use-form-fields';

export function useForm<IS extends FormInitState>({
  initialState,
  validators,
}: {
  initialState: IS;
  validators?: FormValidators<IS>;
}) {
  const { values, getState, update, resetValues } = useFormValues(initialState);
  const { fieldsStatus, touch, resetFields } = useFormFields(initialState);

  const { validatedState, isValid } = validateForm(values, validators);

  const fields = combineFormState(values, fieldsStatus, validatedState);

  const register = createRegister(initialState, values, update, touch);

  const reset = useCallback(() => {
    resetValues();
    resetFields();
  }, [resetValues, resetFields]);

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

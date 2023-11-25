import { useCallback, useReducer } from 'react';
import { FormInitState, RegisterObj, ValueKey } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { ActionTypes } from '../types/form-actions';
import { createReducer } from '../helpers/form-reducer';
import { combineFormState, prepareFormState } from '../helpers/form-state';
import { validateForm } from '../helpers/validate';
import { convertValue } from '../helpers/value';

export function useForm<IS extends FormInitState>({
  initialState,
  validators,
}: {
  initialState: IS;
  validators?: FormValidators<IS>;
}) {
  const formState = prepareFormState(initialState);

  const reducer = createReducer(formState);

  const [state, dispatch] = useReducer(reducer, formState);

  const { validatedState, isValid } = validateForm(state.values, validators);

  const fields = combineFormState<IS, typeof state>(state, validatedState);

  const update = useCallback(
    <T extends keyof IS>(field: T, value: IS[T]) =>
      dispatch({
        type: ActionTypes.UPDATE,
        payload: {
          field,
          value,
        },
      }),
    []
  );

  const touch = useCallback(
    <T extends keyof IS>(field: T) =>
      dispatch({
        type: ActionTypes.TOUCHED,
        payload: {
          field,
        },
      }),
    []
  );

  const reset = useCallback(
    () =>
      dispatch({
        type: ActionTypes.RESET,
      }),
    []
  );

  const getState = () => state.values;

  const register = <
    T extends keyof IS,
    K extends ValueKey | undefined = undefined
  >(
    field: T,
    options?: { valueKey?: K }
  ): RegisterObj<T, IS, K> => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      update(field, convertValue(initialState, field, e.target));
    const onBlur = () => touch(field);
    const value = state.values[field];
    const key = options?.valueKey || 'value';
    if (key === 'checked') {
      return { checked: value, onChange, onBlur } as RegisterObj<T, IS, K>;
    } else {
      return { value, onChange, onBlur } as RegisterObj<T, IS, K>;
    }
  };

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

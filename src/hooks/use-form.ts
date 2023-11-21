import { useCallback, useReducer } from 'react';
import { FormInitState } from '../types/form-state';
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
  const formState = prepareFormState(initialState, validators);

  const reducer = createReducer(formState, validators);

  const [state, dispatch] = useReducer(reducer, formState);

  const isValid = validateForm(state);

  const fields = combineFormState<IS, typeof state>(state);

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

  const register = <T extends keyof IS>(field: T) => ({
    onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
      update(field, convertValue(initialState, field, e.target.value)),
    onBlur: () => touch(field),
    value: state.values[field],
  });

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

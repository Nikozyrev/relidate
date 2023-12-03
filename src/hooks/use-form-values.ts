import { useCallback, useReducer } from 'react';
import { createReducer } from '../helpers/form-reducer';
import { prepareFormState } from '../helpers/form-state';
import { FormInitState } from '../types/form-state';
import { ActionTypes } from '../types/form-actions';

export function useFormValues<IS extends FormInitState>(initialState: IS) {
  const formState = prepareFormState(initialState);

  const reducer = createReducer(formState);

  const [state, dispatch] = useReducer(reducer, formState);

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

  return {
    state,
    getState,
    update,
    reset,
    touch,
  };
}

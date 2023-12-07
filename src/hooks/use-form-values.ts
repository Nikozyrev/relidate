import { useCallback, useReducer } from 'react';
import { FormInitState } from '../types/form-state';
import { ActionTypes } from '../types/form-actions';
import { createValuesReducer } from '../helpers/form-values-reducer';

export function useFormValues<IS extends FormInitState>(initialState: IS) {
  const reducer = createValuesReducer(initialState);

  const [values, dispatch] = useReducer(reducer, initialState);

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

  const reset = useCallback(
    () =>
      dispatch({
        type: ActionTypes.RESET,
      }),
    []
  );

  const getState = () => values;

  return {
    values,
    getState,
    update,
    reset,
  };
}

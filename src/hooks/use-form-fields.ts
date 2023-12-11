import { useCallback, useReducer } from 'react';
import { createFieldsReducer } from '../helpers/form-fields-reducer';
import { prepareFormFields } from '../helpers/form-state';
import { FormInitState } from '../types/form-state';
import { ActionTypes } from '../types/form-actions';

export function useFormFields<IS extends FormInitState>(initialState: IS) {
  const formFields = prepareFormFields(initialState);

  const reducer = createFieldsReducer<IS>();

  const [fieldsStatus, dispatch] = useReducer(reducer, formFields);

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

  const resetFields = useCallback(
    () =>
      dispatch({
        type: ActionTypes.RESET,
      }),
    []
  );

  return {
    fieldsStatus,
    touch,
    resetFields,
  };
}

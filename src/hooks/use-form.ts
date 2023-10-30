import { useReducer } from 'react';
import { ActionTypes, FormInitState } from '../types/form-state';
import { createReducer } from '../helpers/form-reducer';
import { prepareFormState } from '../helpers/prepare-form-state';
import { FormValidators } from '../types/validator';

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

  const isValid = Object.keys(state.fields).every(
    (key) => state.fields[key].isValid
  );

  const update = <T extends keyof IS>(field: T, value: IS[T]) => {
    dispatch({
      type: ActionTypes.UPDATE,
      payload: {
        field,
        value,
      },
    });
  };

  const touch = <T extends keyof IS>(field: T) => {
    dispatch({
      type: ActionTypes.TOUCHED,
      payload: {
        field,
      },
    });
  };

  const reset = () => {
    dispatch({
      type: ActionTypes.RESET,
    });
  };

  return {
    ...state,
    isValid,
    update,
    reset,
    touch,
  };
}

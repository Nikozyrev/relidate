import { useReducer } from 'react';
import { ActionTypes, FormInitState, FormState } from '../types/form-state';
import { createReducer } from '../helpers/form-reducer';
import {
  prepareFormState,
  reduceFormState,
} from '../helpers/prepare-form-state';
import { FormValidators } from '../types/validator';

export function useForm<IS extends FormInitState, S extends FormState<IS>>({
  initialState,
  validators,
}: {
  initialState: IS;
  validators?: FormValidators<IS>;
}) {
  const formState = prepareFormState<IS, S>(initialState, validators);

  const reducer = createReducer(formState, validators);

  const [state, dispatch] = useReducer(reducer, formState);

  const isValid = Object.keys(state).every((key) => state[key].isValid);

  const update = <T extends keyof IS>(inputName: T, value: IS[T]) => {
    dispatch({
      type: ActionTypes.UPDATE,
      payload: {
        inputName,
        value,
      },
    });
  };

  const reset = () => {
    dispatch({
      type: ActionTypes.RESET,
    });
  };

  return {
    getState: () => reduceFormState<IS, S>(state),
    fields: state,
    isValid,
    update,
    reset,
  };
}

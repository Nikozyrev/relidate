import { Reducer, useReducer } from 'react';
import { ActionTypes, FormAction, FormState } from '../types/form-state';

const createReducer =
  <S extends FormState>(initialState: S): Reducer<S, FormAction<S>> =>
  (state, action) => {
    switch (action.type) {
      case ActionTypes.UPDATE:
        if (!action.payload) return state;
        return {
          ...state,
          [action.payload.inputName]: action.payload.value,
        };
      case ActionTypes.RESET:
        return {
          ...initialState,
        };
      default:
        return state;
    }
  };

export function useFormState<S extends FormState>({
  initialState,
}: {
  initialState: S;
}) {
  const reducer = createReducer(initialState);

  const [state, dispatch] = useReducer(reducer, initialState);

  const update = <T extends keyof S>(inputName: T, value: S[T]) => {
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

  return { state, update, reset };
}

import { Reducer, useCallback, useReducer } from 'react';
import { ActionTypes, FormState } from '../types/form-state';

export function useFormState<S extends FormState>({
  initialState,
}: {
  initialState: S;
}) {
  const reducer: Reducer<
    typeof initialState,
    {
      type: ActionTypes;
      payload?: {
        inputName: keyof S;
        value: S[keyof S];
      };
    }
  > = useCallback(
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
    },
    [initialState]
  );

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

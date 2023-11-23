import { Reducer } from 'react';
import { FormState, FormInitState } from '../types/form-state';
import { FormAction, ActionTypes } from '../types/form-actions';

export function createReducer<IS extends FormInitState>(
  initialState: FormState<IS>
): Reducer<FormState<IS>, FormAction<IS>> {
  return (state, action) => {
    switch (action.type) {
      case ActionTypes.UPDATE:
        const { field, value } = action.payload;
        if (!field) return state;

        return {
          ...state,
          values: {
            ...state.values,
            [field]: value,
          },
        };

      case ActionTypes.TOUCHED:
        const { field: f } = action.payload;
        if (!f) return state;
        if (state.fields[f].touched) return state;

        return {
          ...state,
          fields: {
            ...state.fields,
            [f]: {
              ...state.fields[f],
              touched: true,
            },
          },
        };

      case ActionTypes.RESET:
        return {
          ...initialState,
        };

      default:
        return state;
    }
  };
}

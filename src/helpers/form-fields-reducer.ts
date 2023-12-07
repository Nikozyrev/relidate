import { Reducer } from 'react';
import { FormFields, FormInitState } from '../types/form-state';
import { ActionTypes, FormAction } from '../types/form-actions';

export function createFieldsReducer<IS extends FormInitState>(): Reducer<
  FormFields<IS>,
  FormAction<IS>
> {
  return (state, action) => {
    switch (action.type) {
      case ActionTypes.TOUCHED:
        const { field } = action.payload;
        if (!field) return state;
        if (state[field].touched) return state;

        return {
          ...state,
          [field]: {
            ...state[field],
            touched: true,
          },
        };

      default:
        return state;
    }
  };
}

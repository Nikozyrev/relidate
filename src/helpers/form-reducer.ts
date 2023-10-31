import { Reducer } from 'react';
import { FormState, FormInitState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { FormAction, ActionTypes } from '../types/form-actions';
import { validateField } from './validate';

export function createReducer<IS extends FormInitState>(
  initialState: FormState<IS>,
  validators: FormValidators<IS> | undefined
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
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
              isValid: validateField(
                validators && validators[field],
                value,
                state.values
              ),
            },
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

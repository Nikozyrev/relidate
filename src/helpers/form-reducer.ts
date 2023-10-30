import { Reducer } from 'react';
import {
  FormState,
  FormAction,
  ActionTypes,
  FormInitState,
} from '../types/form-state';
import { FormValidators } from '../types/validator';
import { validateField } from './validate';

export function createReducer<IS extends FormInitState>(
  initialState: FormState<IS>,
  validators: FormValidators<IS> | undefined
): Reducer<FormState<IS>, FormAction<IS>> {
  return (state, action) => {
    const field = action.payload?.field;
    const value = action.payload?.value;

    switch (action.type) {
      case ActionTypes.UPDATE:
        if (!(field && value)) return state;

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
        if (!field) return state;

        return {
          ...state,
          fields: {
            ...state.fields,
            [field]: {
              ...state.fields[field],
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

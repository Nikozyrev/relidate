import { Reducer } from 'react';
import { FormInitState } from '../types/form-state';
import { FormAction, ActionTypes } from '../types/form-actions';

export function createValuesReducer<IS extends FormInitState>(
  initialState: IS
): Reducer<IS, FormAction<IS>> {
  return (state, action) => {
    switch (action.type) {
      case ActionTypes.UPDATE:
        const { field, value } = action.payload;
        if (!field) return state;

        return {
          ...state,
          [field]: value,
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

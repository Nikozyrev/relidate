import { Reducer } from 'react';
import {
  FormState,
  FormAction,
  ActionTypes,
  FormInitState,
} from '../types/form-state';
import { FormValidators } from '../types/validator';
import { validateField } from './validate';
import { reduceFormState } from './prepare-form-state';

export const createReducer =
  <IS extends FormInitState, S extends FormState<IS>>(
    initialState: S,
    validators: FormValidators<IS> | undefined
  ): Reducer<S, FormAction<IS>> =>
  (state, action) => {
    switch (action.type) {
      case ActionTypes.UPDATE:
        if (!action.payload) return state;
        const { inputName, value } = action.payload;

        return {
          ...state,
          [inputName]: {
            ...state[inputName],
            value: value,
            isValid: validateField(
              validators && validators[inputName],
              value,
              reduceFormState(state)
            ),
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

import { Reducer } from 'react';
import { FormFieldState, FormFields, FormInitState } from '../types/form-state';
import {
  ActionTypes,
  FormActionTouched,
  FormFieldsAction,
} from '../types/form-actions';

const makeFieldTouched = <IS extends FormInitState>(
  state: FormFields<IS>,
  action: FormActionTouched<IS>
): FormFields<IS> => {
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
};

const makeFieldsUntouched = <IS extends FormInitState>(
  state: FormFields<IS>
): FormFields<IS> => {
  const res = Object.entries(state).map(
    ([key, field]): [keyof IS, FormFieldState] => [
      key,
      { ...field, touched: false },
    ]
  );
  const obj: FormFields<IS> = Object.fromEntries(res) as {
    [key in keyof IS]: FormFieldState;
  };
  return obj;
};

export function createFieldsReducer<IS extends FormInitState>(): Reducer<
  FormFields<IS>,
  FormFieldsAction<IS>
> {
  return (state, action) => {
    switch (action.type) {
      case ActionTypes.TOUCHED:
        return makeFieldTouched(state, action);

      case ActionTypes.RESET:
        return makeFieldsUntouched(state);

      default:
        return state;
    }
  };
}

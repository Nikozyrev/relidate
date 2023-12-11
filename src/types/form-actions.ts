import { FormInitState } from './form-state';

export enum ActionTypes {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
  TOUCHED = 'TOUCHED',
}

export type FormValuesAction<S extends FormInitState> =
  | FormActionUpdate<S>
  | FormActionReset;

export type FormFieldsAction<S extends FormInitState> =
  | FormActionTouched<S>
  | FormActionReset;

export type FormActionUpdate<S extends FormInitState> = {
  type: ActionTypes.UPDATE;
  payload: {
    field: keyof S;
    value: S[keyof S];
  };
};

export type FormActionTouched<S extends FormInitState> = {
  type: ActionTypes.TOUCHED;
  payload: {
    field: keyof S;
  };
};

export type FormActionReset = {
  type: ActionTypes.RESET;
};

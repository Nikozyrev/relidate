import { FormInitState } from './form-state';

export enum ActionTypes {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
  TOUCHED = 'TOUCHED',
}

export type FormAction<S extends FormInitState> =
  | FormActionUpdate<S>
  | FormActionTouched<S>
  | FormActionReset;

type FormActionUpdate<S extends FormInitState> = {
  type: ActionTypes.UPDATE;
  payload: {
    field: keyof S;
    value: S[keyof S];
  };
};

type FormActionTouched<S extends FormInitState> = {
  type: ActionTypes.TOUCHED;
  payload: {
    field: keyof S;
  };
};

type FormActionReset = {
  type: ActionTypes.RESET;
};

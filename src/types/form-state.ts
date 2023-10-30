export type FormFieldValue = string | number | Date | undefined | null;

export type FormInitState = Record<string, FormFieldValue>;

export type FormFieldState = {
  touched: boolean;
  isValid: boolean;
};

export type FormFields<S extends FormInitState> = {
  [key in keyof S]: FormFieldState;
};

export type FormState<S extends FormInitState> = {
  values: S;
  fields: FormFields<S>;
};

export enum ActionTypes {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
  TOUCHED = 'TOUCHED',
}

export type FormAction<S extends FormInitState> = {
  type: ActionTypes;
  payload?: {
    field?: keyof S;
    value?: S[keyof S];
  };
};

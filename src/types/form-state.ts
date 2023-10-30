export type FormFieldValue = string | number | Date | undefined | null;

export type FormInitState = Record<string, FormFieldValue>;

export type FormFieldState<S extends FormInitState, K extends keyof S> = {
  value: S[K];
  touched: boolean;
  isValid: boolean;
};

export type FormState<S extends FormInitState> = {
  [key in keyof S]: FormFieldState<S, key>;
};

export enum ActionTypes {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

export type FormAction<S extends FormInitState> = {
  type: ActionTypes;
  payload?: {
    inputName: keyof S;
    value: S[keyof S];
  };
};

export type FormFieldValue = string | number | Date | undefined | null;

export type FormState = Record<string, FormFieldValue>;

export enum ActionTypes {
  UPDATE = 'UPDATE',
  RESET = 'RESET',
}

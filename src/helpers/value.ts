import { FormInitState, FormFieldValue } from '../types/form-state';

export const convertValue = <T extends keyof IS, IS extends FormInitState>(
  initialState: IS,
  field: T,
  value: string
): IS[T] => {
  const val = initialState[field];
  let transformer: (v: string) => FormFieldValue = () => undefined;
  if (typeof val === 'string') {
    transformer = String;
  }
  if (typeof val === 'number') {
    transformer = Number;
  }
  if (val instanceof Date) {
    transformer = (v: string) => new Date(v);
  }
  if (val === null) {
    transformer = () => null;
  }
  return transformer(value) as IS[T];
};

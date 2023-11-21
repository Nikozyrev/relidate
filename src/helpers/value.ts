import { FormInitState, FormFieldValue } from '../types/form-state';

export const convertValue = <T extends keyof IS, IS extends FormInitState>(
  initialState: IS,
  field: T,
  target: HTMLInputElement
): IS[T] => {
  const value = target.type === 'checkbox' ? target.checked : target.value;

  const val = initialState[field];

  let transformer: (v: string | boolean) => FormFieldValue = () => undefined;

  if (typeof val === 'string') {
    transformer = String;
  }
  if (typeof val === 'number') {
    transformer = Number;
  }
  if (typeof val === 'boolean') {
    transformer = Boolean;
  }
  if (val instanceof Date) {
    transformer = (v: string | boolean) =>
      typeof v == 'boolean' ? new Date() : new Date(v);
  }
  if (val === null) {
    transformer = () => null;
  }
  return transformer(value) as IS[T];
};

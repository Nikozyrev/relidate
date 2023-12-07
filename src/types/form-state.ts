export type FormFieldValue =
  | string
  | number
  | boolean
  | Date
  | undefined
  | null;

export type FormInitState = Record<string, FormFieldValue>;

export type FormFieldState = {
  touched: boolean;
};

export type FormFields<S extends FormInitState> = {
  [key in keyof S]: FormFieldState;
};

export type RegisterObjBase = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
};

export type RegisterObjValue<T extends keyof IS, IS extends FormInitState> = {
  value: IS[T];
};

export type RegisterObjChecked<T extends keyof IS, IS extends FormInitState> = {
  checked: IS[T];
};

export type RegisterObj<
  T extends keyof IS,
  IS extends FormInitState,
  K extends ValueKey | undefined
> = K extends undefined
  ? RegisterObjValue<T, IS> & RegisterObjBase
  : K extends 'checked'
  ? RegisterObjChecked<T, IS> & RegisterObjBase
  : RegisterObjValue<T, IS> & RegisterObjBase;

export type ValueKey = 'value' | 'checked';

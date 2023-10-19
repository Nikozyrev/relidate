export type Validator<T> = (v: T) => boolean;

export type FormValidators<S extends object> = {
  [key in keyof S]?: Validator<S[key]>[];
};

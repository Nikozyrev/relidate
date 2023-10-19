import { Validator } from '../types/validator';

export const validateField = <T>(validators: Validator<T>[], value: T) =>
  validators.every((f) => f(value));

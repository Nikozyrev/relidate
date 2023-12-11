import { FormFields, FormInitState } from '../types/form-state';
import { ValidatedField, ValidationError } from '../types/validator';

export const prepareFormFields = <IS extends FormInitState>(
  state: IS
): FormFields<IS> => {
  return (Object.keys(state) as (keyof IS)[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        touched: false,
      },
    }),
    {} as FormFields<IS>
  );
};

export const combineFormState = <
  IS extends FormInitState,
  S extends FormFields<IS>
>(
  values: IS,
  fields: S,
  validated: { [key in keyof IS]: ValidatedField }
) =>
  Object.keys(fields).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: values[key],
        touched: fields[key].touched,
        isValid: validated[key].isValid,
        errors: validated[key].errors,
      },
    }),
    {} as {
      [key in keyof IS]: {
        value: IS[key];
        touched: boolean;
        isValid: boolean;
        errors: ValidationError[];
      };
    }
  );

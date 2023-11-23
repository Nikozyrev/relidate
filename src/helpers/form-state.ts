import { FormFields, FormInitState, FormState } from '../types/form-state';

export const prepareFormState = <IS extends FormInitState>(
  state: IS
): FormState<IS> => {
  const fields = (Object.keys(state) as (keyof IS)[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        touched: false,
      },
    }),
    {} as FormFields<IS>
  );

  return { values: state, fields };
};

export const combineFormState = <
  IS extends FormInitState,
  S extends FormState<IS>
>(
  state: S,
  validated: { [key in keyof IS]: boolean }
) =>
  Object.keys(state.fields).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        value: state.values[key],
        touched: state.fields[key].touched,
        isValid: validated[key],
      },
    }),
    {} as {
      [key in keyof IS]: { value: IS[key]; touched: boolean; isValid: boolean };
    }
  );

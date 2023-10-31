import { FormFields, FormInitState, FormState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { validateField } from './validate';

export const prepareFormState = <IS extends FormInitState>(
  state: IS,
  validators?: FormValidators<IS>
): FormState<IS> => {
  const fields = (Object.keys(state) as (keyof IS)[]).reduce(
    (acc, key) => ({
      ...acc,
      [key]: {
        touched: false,
        isValid: validateField(
          validators && validators[key],
          state[key],
          state
        ),
      },
    }),
    {} as FormFields<IS>
  );

  return { values: state, fields };
};

import { FormInitState, FormState } from '../types/form-state';
import { FormValidators } from '../types/validator';
import { validateField } from './validate';

export const prepareFormState = <
  IS extends FormInitState,
  S extends FormState<IS>
>(
  state: IS,
  validators?: FormValidators<IS>
): S =>
  (Object.keys(state) as (keyof IS)[]).reduce(
    (acc, key) => ({
      ...acc,
      key: {
        value: state[key],
        touched: false,
        isValid: validateField(
          validators && validators[key],
          state[key],
          state
        ),
      },
    }),
    {} as S
  );

export const reduceFormState = <
  IS extends FormInitState,
  S extends FormState<IS>
>(
  state: S
): IS =>
  (Object.keys(state) as (keyof S)[]).reduce(
    (acc, key) => ({ ...acc, key: state[key].value }),
    {} as IS
  );

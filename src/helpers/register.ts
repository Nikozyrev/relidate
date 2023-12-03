import { FormInitState, RegisterObj, ValueKey } from '../types/form-state';
import { convertValue } from './value';

export const createRegister =
  <IS extends FormInitState>(
    initialState: IS,
    state: IS,
    update: <T extends keyof IS>(field: T, value: IS[T]) => void,
    touch: <T extends keyof IS>(field: T) => void
  ) =>
  <T extends keyof IS, K extends ValueKey | undefined = undefined>(
    field: T,
    options?: { valueKey?: K }
  ): RegisterObj<T, IS, K> => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
      update(field, convertValue(initialState, field, e.target));
    const onBlur = () => touch(field);
    const value = state[field];
    const key = options?.valueKey || 'value';
    if (key === 'checked') {
      return { checked: value, onChange, onBlur } as RegisterObj<T, IS, K>;
    } else {
      return { value, onChange, onBlur } as RegisterObj<T, IS, K>;
    }
  };

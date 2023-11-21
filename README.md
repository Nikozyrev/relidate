# relidate

Form validation library for React.

### Quickstart

```jsx
import { useForm } from 'relidate';
import { minLength, required } from 'relidate/validators';

export function SignUpForm() {
  const {
    fields: { email, password, confirmPassword },
    register,
    update,
    touch,
    isValid,
  } = useForm({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      email: [required],
      password: [required, minLength(8)],
      confirmPassword: [required, (value, state) => value === state.password],
    },
  });

  return (
    <form>
      <h3>Sign Up</h3>
      <input
        type="email"
        placeholder="Email"
        // Returns value, onChange, onBlur
        {...register('email')}
      />
      <input
        type="password"
        placeholder="Password"
        // Or you can register those fields manually
        value={password.value}
        onChange={(e) => update('password', e.target.value)}
        onBlur={() => touch('password')}
      />
      <input
        type="password"
        placeholder="Confirm password"
        {...register('confirmPassword')}
        // Add conditional classes
        className={confirmPassword.isValid ? 'valid' : ''}
      />
      <button type="submit" disabled={!isValid}>
        Sign Up
      </button>
    </form>
  );
}
```

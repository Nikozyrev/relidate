# relidate

Form validation library for React.

### Quickstart

```jsx
import { useForm } from 'relidate';
import { minLength, required } from 'relidate/validators';

export function SignUpForm() {
  const {
    fields: { email, password, confirmPassword },
    update,
    isValid,
  } = useForm({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      email: [required],
      password: [required, minLength(4)],
      confirmPassword: [required, (value, state) => value === state.password],
    },
  });

  return (
    <form>
      <h3>Sign Up</h3>
      <input
        type="text"
        placeholder="Email"
        value={email.value}
        onChange={(e) => update('email', e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password.value}
        onChange={(e) => update('password', e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={confirmPassword.value}
        onChange={(e) => update('confirmPassword', e.target.value)}
      />
      <button type="submit" disabled={!isValid}>
        Sign Up
      </button>
    </form>
  );
}
```

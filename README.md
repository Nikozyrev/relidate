# relidate

Form validation library for React.

### Quickstart

```jsx
import { useValidatedForm } from 'relidate';
import { minLength, required } from 'relidate/validators';

export function SignUpForm() {
  const { fields, update, isValid } = useValidatedForm({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      email: [required],
      password: [required, minLength(4)],
      confirmPassword: [required, (v, s) => v === s.password],
    },
  });

  return (
    <form>
      <h3>Sign Up</h3>
      <input
        type="text"
        placeholder="Email"
        value={fields.email.value}
        onChange={(e) => update('email', e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={fields.password.value}
        onChange={(e) => update('password', e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm password"
        value={fields.confirmPassword.value}
        onChange={(e) => update('confirmPassword', e.target.value)}
      />
      <button type="submit" disabled={!isValid}>
        Sign Up
      </button>
    </form>
  );
}
```

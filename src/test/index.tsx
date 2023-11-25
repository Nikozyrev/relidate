import React from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from '../hooks/use-form';
import { required, minLength, helpers } from '../validators/validators';

const { withMessage } = helpers;

type state = {
  email: string;
  password: string;
  confirmPassword: string;
};

const arePasswordsEqual = (v: string, s: state) =>
  v === s.password || 'Not equal';

function SignUpForm() {
  console.time('hook');
  const { fields, register, update, touch, isValid } = useForm({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    validators: {
      email: [withMessage('Надо', required)],
      password: [required, minLength(8)],
      confirmPassword: [required, withMessage('eq', arePasswordsEqual)],
    },
  });
  const { email, password, confirmPassword } = fields;
  console.timeEnd('hook');
  console.log(fields);

  return (
    <form style={styles.form}>
      <h3>Sign Up</h3>
      <input
        type="email"
        placeholder="Email"
        // Returns value, onChange, onBlur
        {...register('email')}
      />
      {email.touched && email.errors[0]}
      <input
        type="password"
        placeholder="Password"
        // Or you can register those fields manually
        value={password.value}
        onChange={(e) => update('password', e.target.value)}
        onBlur={() => touch('password')}
      />
      {password.touched && password.errors[0]}
      <input
        type="password"
        placeholder="Confirm password"
        {...register('confirmPassword')}
        // Add conditional classes
        className={confirmPassword.isValid ? 'valid' : ''}
      />
      {confirmPassword.touched && <p>{confirmPassword.errors[0]}</p>}

      <input type="checkbox" {...register('agree', { valueKey: 'checked' })} />

      <button type="submit" disabled={!isValid}>
        Sign Up
      </button>
    </form>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<SignUpForm />);

const styles: Record<string, React.CSSProperties> = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    maxWidth: '500px',
    padding: '15px',
    border: '1px solid black',
  },
};

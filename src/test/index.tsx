import React from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from '../hooks/use-form';
import { required as req, minLength, helpers } from '../validators/validators';

type state = {
  email: string;
  password: string;
  confirmPassword: string;
  agree: boolean;
};

const required = helpers.withMessage('Надо', req);

const arePasswordsEqual = helpers.withMessage(
  'Not equal',
  (v: string, s: state) => v === s.password
);

function SignUpForm() {
  console.time('hook');
  const { fields, register, update, touch, isValid, reset } = useForm<state>({
    initialState: {
      email: '',
      password: '',
      confirmPassword: '',
      agree: false,
    },
    validators: {
      email: { required },
      password: { required, minLength: minLength(8) },
      confirmPassword: { required, arePasswordsEqual },
    },
  });
  const { email, password, confirmPassword, agree } = fields;
  console.timeEnd('hook');
  console.log(fields);

  return (
    <form
      style={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        reset();
      }}
    >
      <h3>Sign Up</h3>
      <input
        type="email"
        placeholder="Email"
        // Returns value, onChange, onBlur
        {...register('email')}
      />
      {email.touched && email.errors[0]?.message}
      <input
        type="password"
        placeholder="Password"
        // Or you can register those fields manually
        value={password.value}
        onChange={(e) => update('password', e.target.value)}
        onBlur={() => touch('password')}
      />
      {password.touched && password.errors[0]?.message}
      <input
        type="password"
        placeholder="Confirm password"
        className={confirmPassword.isValid ? 'valid' : ''}
        {...register('confirmPassword')}
      />
      {confirmPassword.touched && <p>{confirmPassword.errors[0]?.message}</p>}

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

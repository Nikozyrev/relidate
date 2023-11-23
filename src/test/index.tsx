import React from 'react';
import ReactDOM from 'react-dom/client';
import { useForm } from '../hooks/use-form';
import { required, minLength } from '../validators/validators';

function SignUpForm() {
  console.time('hook');
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
  console.timeEnd('hook');

  return (
    <form style={styles.form}>
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

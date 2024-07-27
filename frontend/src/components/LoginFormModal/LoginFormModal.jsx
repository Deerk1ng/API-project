
import { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          } else if (data){
            setErrors(data)
          }
      });
  };

  const DemoSignIn = (e) => {
    setCredential("Demo-lition")
    setPassword("password")
    .then(handleSubmit(e))
  }

  return (
    <div >
      <h1>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        {errors.credential && (
          <p className='error-login'>{errors.credential}</p>
        )}
        {errors.credential && (
          <p className='error-login'>{errors.password}</p>
        )}
        {errors.message && (
          <p className='error-login'>{errors.message}</p>
        )}
        <label>
          Username or Email
          <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
        <div className='demo-user-signup' onClick={DemoSignIn}>Demo User</div>
      </form>
    </div>
  );
}

export default LoginFormModal;

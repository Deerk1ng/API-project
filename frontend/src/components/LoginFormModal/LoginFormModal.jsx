
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

  const DemoSignIn = () => {
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
  }

  return (
    <div className='modal'>
      <h1 className='login-title'>Log In</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        {errors.credential && (
          <p className='error-login'>{errors.credential}</p>
        )}
        {errors.credential && (
          <p className='error-login'>{errors.password}</p>
        )}
        {errors.message && (
          <p className='error-login'>The provided credentials were invalid</p>
        )}
          <input
            className='inputs'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            placeholder='Username or Email'
            required
            />
          <input
            className='inputs'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
            />
        <button className='submit-button' type="submit" disabled={credential.length < 4 || password.length < 6}>Log In</button>
        <div className='demo-user-signup' onClick={DemoSignIn}>Log in as Demo User</div>
      </form>
    </div>
  );
}

export default LoginFormModal;

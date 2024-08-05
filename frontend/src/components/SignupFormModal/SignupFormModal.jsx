import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import * as sessionActions from '../../store/session';
import './SignupForm.css';

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data?.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <div className='modal'>
      <h1 className='login-title'>Sign Up</h1>
      <form className='login-form' onSubmit={handleSubmit}>
        {errors.email && <p className='error-login' >{errors.email}</p>}
        {errors.username && <p className='error-login' >{errors.username}</p>}
        <input
          className='inputs'
            type="text"
            minLength={1}
            maxLength={30}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder='First Name'
            required
          />

          <input
          className='inputs'
            type="text"
            minLength={1}
            maxLength={30}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder='Last Name'
            required
          />

          <input
          className='inputs'
            type="text"
            minLength={1}
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
            required
          />



          <input
          className='inputs'
            type="text"
            minLength={1}
            maxLength={30}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
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

        {errors.password && <p className='error-login'>{errors.password}</p>}

          <input
          className='inputs'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder='Confirm Password'
            required
          />

        {errors.confirmPassword && (
          <p className='error-login'>{errors.confirmPassword}</p>
        )}
        <button className='login-button' type="submit"
          disabled={
            username.length < 4 ||
            password.length < 6 ||
            !email ||
            !firstName ||
            !lastName ||
            confirmPassword.length < 6
          }
        >Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;

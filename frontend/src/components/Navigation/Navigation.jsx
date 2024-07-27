import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  return (
    <div className='header'>
      <div>
        <NavLink to="/"><img className='home-button' src='https://i.imgur.com/FYvPdjc.png' alt="Airbnb logo" /></NavLink>
      </div>
      {isLoaded && (
        <div className='parent'>
          <ProfileButton user={sessionUser} />
        </div>
      )}
    </div>
  );
}

export default Navigation;

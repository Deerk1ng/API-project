import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaAlignJustify } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router-dom';
import * as sessionActions from '../../store/session';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
import OpenModalMenuItem from '../OpenModalMenuItem/OpenModalMenuItem';
import './Navigation.css'


function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const navigate = useNavigate()

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    // if (!showMenu) setShowMenu(true);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      {user ? <NavLink className='newspot-nav' to="/spots/new">Create a New Spot</NavLink> : <></>}
      <button className='user-button' onClick={toggleMenu}>
        <FaAlignJustify />  <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        { user ? (
          <>
            <li>Hello, {user.username}</li>
            <li>{user.email}</li>
            <li className='manage-spots' onClick={() => navigate('/spots/current')}>Manage Spots</li>
            <li>
              <button  className='logout-button' onClick={logout}>Log Out</button>
            </li>
          </>
          ) : (
            <>
              <li>
                <OpenModalMenuItem
                  itemText="Log In"
                  onItemClick={closeMenu}
                  modalComponent={<LoginFormModal />}
                />
              </li>
              <li>
                <OpenModalMenuItem
                  itemText="Sign Up"
                  onItemClick={closeMenu}
                  modalComponent={<SignupFormModal />}
                />
              </li>
            </>
          )}
      </ul>
    </>
  );
}

export default ProfileButton;

import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import Logo from '../Logo/Logo';
import Button from '../Button/Button';
import BurgerMenuButton from '../BurgerMenuOpenButton/BurgerMenuOpenButton';
import { CurrentUserContext } from '../../context/CurrentUserContext';

const Header = ({
  // loggedIn,
  handleOpenBurgerMenu,
  theme
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  // const [loggedIn, setLoggedIn] = React.useState(false);

  // React.useState(() => {
  //   if (currentUser.email) {
  //     setLoggedIn(true)
  //   }
  // }, [CurrentUserContext])

  return (
    <header className={`header ${theme ? `header_theme_${theme}` : ``}`}>
      <Logo />

      {currentUser.email ? (
        <>
          <nav className='header__nav'>
            <ul className='header__nav-list'>
              <li>
                <NavLink to='/movies' className='header__link header__nav-item'>Фильмы</NavLink>
              </li>
              <li>
                <NavLink to='/saved-movies' className='header__link header__nav-item'>Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </nav>
          <div className='header__profile-container header__profile-container_type_logged-user'>
            <Link to='/profile' className='header__link header__auth-email'>{currentUser.email}</Link>
            <Link to='/profile' className='header__link header__auth-profile button button_placed_profile-container'></Link>
          </div>
          <BurgerMenuButton handleOpenBurgerMenu={handleOpenBurgerMenu} />
        </>
      ) : (
        <div className='header__auth-container'>
          <Link to='/signup' className='header__link header__auth-signup' >Регистрация</Link>
          <Link to='/signin' className='header__link header__auth-signin button button_placed_auth-container'>Войти</Link>
        </div>
      )}

    </header>
  );
};

export default Header;
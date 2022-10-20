import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.css';
import logo from '../../images/logo/logo.svg';
import Button from '../Button/Button';
import BurgerMenuButton from '../BurgerMenuButton/BurgerMenuButton';

// import Button from '../Button/Button';

const Header = ({
  loggedIn,
  handleOpenBurgerMenu,
  theme
}) => {

  // const paths = ['movies', 'saved-movies']

  return (
    <header className={`header ${theme && `header_theme_${theme}`}`}>
      <Link to="/"><img className="header__logo" src={logo} alt="logo" /></Link>

      {loggedIn ? (
        <>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li>
                <NavLink to="/movies" className="header__nav-item">Фильмы</NavLink>
              </li>
              <li>
                <NavLink to="/saved-movies" className="header__nav-item">Сохранённые фильмы</NavLink>
              </li>
            </ul>
          </nav>
          <div className="header__profile-container header__profile-container_type_logged-user">
            <Link to='/profile' className="header__auth-email">Аккаунт</Link>
            <Link to='/profile' className="header__auth-profile button button_placed_profile-container"></Link>
          </div>
          <BurgerMenuButton handleOpenBurgerMenu={handleOpenBurgerMenu} />
        </>
      ) : (
        <div className="header__auth-container">
          <Link to='/signup' className="header__auth-signup" >Регистрация</Link>
          <Link to='/signin' className="header__auth-signin button button_placed_auth-container">Войти</Link>
        </div>
      )}

    </header>
  );
};

export default Header;
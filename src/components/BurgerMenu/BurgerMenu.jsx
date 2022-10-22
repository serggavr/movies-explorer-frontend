import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './BurgerMenu.css'
import BurgerMenuOpenButton from '../BurgerMenuButton/BurgerMenuButton';

const BurgerMenu = ({
  burgerMenuOpen,
  handleOpenBurgerMenu
}) => {
  return (
    <div className={`burger-menu ${burgerMenuOpen && `burger-menu_visible`}`}>
        <div className='burger-menu__wrapper'>
          <BurgerMenuOpenButton 
            visible={true}
            handleOpenBurgerMenu={handleOpenBurgerMenu}
            className='burger-menu-button_type_close'
            />
          <nav className='header__nav_placed_burger-menu'>
            <ul className='header__nav-list_placed_burger-menu' >
              <li>
                <NavLink to='/' end className='header__nav-item' onClick={handleOpenBurgerMenu}>Главная</NavLink>
              </li>
              <li>
                <NavLink to='/movies' className='header__nav-item' onClick={handleOpenBurgerMenu}>Фильмы</NavLink>
              </li>
              <li>
                <NavLink to='/saved-movies' className='header__nav-item' onClick={handleOpenBurgerMenu}>Сохранённые фильмы</NavLink>
              </li>
            </ul>
            <div className='header__profile-container header__profile-container_placed_burger-menu' >
              <Link to='/profile' className='header__auth-email' onClick={handleOpenBurgerMenu}>Аккаунт</Link>
              <Link to='/profile' className='header__auth-profile button button_placed_profile-container' onClick={handleOpenBurgerMenu}></Link>
            </div>
          </nav>
        </div>
      </div>
  );
};

export default BurgerMenu;
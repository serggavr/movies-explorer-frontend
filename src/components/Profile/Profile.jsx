import React from 'react';

import './Profile.css'
import Header from '../Header/Header';
import Section from '../Section/Section';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Profile = ({
  handleOpenBurgerMenu
}) => {
  return (
    <>
      <Header loggedIn={true} theme='dark' handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <Section theme='dark' sectionName='profile'>
        <h1 className='profile__greetings'>Привет, Виталий!</h1>
        <form action='#' className='profile__form' name='profile'>
          <div className='profile-input-wrapper'>

            <Input 
              inputName='Имя'
              classNameType='name'
              classNamePlaced='profile'
              inputPlaceholder='Виталий'
              inputType='text'
              required={true}
              inputError={false}
            />
            <Input 
              inputName='E-mail'
              classNameType='email'
              classNamePlaced='profile'
              inputPlaceholder='pochta@yandex.ru'
              inputType='email'
              required={true}
              inputError={true}
            />
            <FormErrorMessage 
              errorMessage='Ошибка'
            />
            
          </div>
          <input type='submit' className='profile__button profile__button_type_edit' value='Редактировать' />
        </form>
        <button className='profile__button profile__button_type_logout'>Выйти из аккаунта</button>
      </Section>
    </>
  );
};

export default Profile;
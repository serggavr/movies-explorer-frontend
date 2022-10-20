import React from 'react';
import { Link } from 'react-router-dom';

import './PageWithForm.css'
import logo from '../../images/logo/logo.svg'
import Section from '../Section/Section';

const PageWithForm = ({
  children,
  name,
  greeting
}) => {
  return (
    <Section theme='dark' sectionName='page-with-form'>
      <div className="page-with-form__wrapper">
        <Link to="/" className="page-with-form__logo"><img src={logo} alt="logo" /></Link>
        <h1 className="page-with-form__greetings">{greeting}</h1>

        {children}

        {name === 'login' && (
          <p className="page-with-form__footer-text">
            Ещё не зарегистрированы?
            <Link to="/signup" className="page-with-form__footer-link">Регистрация</Link>
          </p>
        )}

        {name === 'register' && (
          <p className="page-with-form__footer-text">
            Уже зарегистрированы?
            <Link to="/signin" className="page-with-form__footer-link">Войти</Link>
          </p>
        )}
      </div>
    </Section>
  );
};

export default PageWithForm;
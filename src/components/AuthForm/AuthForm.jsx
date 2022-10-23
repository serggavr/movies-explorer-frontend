import React from 'react';

import './AuthForm.css'
import Button from '../Button/Button';

const AuthForm = ({
  children,
  SubmitButtonText
}) => {
  return (
    <form action='#' className='auth__form'>
      <div className='auth__form-wrapper'>
        
        {children}

      </div>
      <Button className='button button_placed_auth-form' type='submit'>{SubmitButtonText}</Button>
    </form>
  );
};

export default AuthForm;
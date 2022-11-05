import React from 'react';

import './AuthForm.css'
import Button from '../Button/Button';

const AuthForm = ({
  children,
  authFormClassName,
  submitButtonText,
  submitButtonClassName,
  isFormValid,
  onSubmit
}) => {
  return (
    <form 
      action='#'
      className={authFormClassName ? `auth__form ${authFormClassName}` : `auth__form`}
    >
      <div className='auth__form-wrapper'>
        
        {children}

      </div>
      <Button 
        className={submitButtonClassName ? `button ${submitButtonClassName}` : `button button_placed_auth-form`}
        type='submit'
        isDisabled={isFormValid}
        onClick={onSubmit}
      >{submitButtonText}
      </Button>
    </form>
  );
};

export default AuthForm;
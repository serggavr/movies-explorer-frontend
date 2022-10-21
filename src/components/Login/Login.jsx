import React from 'react';

import './Login.css'
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Login = () => {
  return (
    <>
      <Input 
        inputName='Email'
        classNameType='email'
        classNamePlaced='auth-form'
        inputPlaceholder='Email'
        inputType='email'
        required={true}
        inputError={false}
      />
      <Input 
        inputName='Пароль'
        classNameType='password'
        classNamePlaced='auth-form'
        inputPlaceholder='Пароль'
        inputType='password'
        required={true}
        inputError={true}
      />
      <FormErrorMessage 
        errorMessage='Ошибка'
      />
    </>
  );
};

export default Login;
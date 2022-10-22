import React from 'react';

import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';

const Register = () => {
  return (
    <>
      <Input 
        inputName='Имя'
        classNameType='name'
        classNamePlaced='auth-form'
        inputPlaceholder='Имя'
        inputType='text'
        required={true}
        inputError={false}
      />
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
        errorMessage='Что-то пошло не так...'
      />
    </>
  );
};

export default Register;
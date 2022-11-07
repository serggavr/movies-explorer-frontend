import React from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import { useCustomInputValidation } from '../../hooks/useCustomInputValidation';

const Register = ({
  onSignUp,
  isApiErrorMessage
}) => {
  const [formValid, setFormValid] = React.useState(false)
  const [submitButtonText, setSubmitButtonText] = React.useState("Зарегистрироваться")
  const [apiErrorMessage, setApiErrorMessage] = React.useState('')

  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName, resetError: resetNameError } = useCustomInputValidation({})
  const {validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail , resetError: resetEmailError} = useCustomInputValidation({})
  const {validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword, resetError: resetPasswordError } = useCustomInputValidation({})

  function changeName(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setName(e.target.value);
    validateName(e)
  }

  function changeEmail(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setEmail(e.target.value);
    validateEmail(e)
  }
  
  function changePassword(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setPassword(e.target.value);
    validatePassword(e)
  }

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitButtonText("Регистрация...")
    onSignUp({
      name: name,
      email: email,
      password: password
    })
    .finally(() => {
      setApiErrorMessage('')
      setSubmitButtonText("Зарегистрироваться")
      setName('')
      setEmail('')
      setPassword('')
    })
  }

  React.useEffect(() => {
      nameValid && name !== '' && emailValid && email !== '' && passwordValid && password !== '' ? setFormValid(false) : setFormValid(true);
  }, [nameValid, emailValid, passwordValid, name, email, password])

  React.useEffect(() => {
    setApiErrorMessage(isApiErrorMessage)
  }, [isApiErrorMessage])

  React.useEffect(() => {
    setApiErrorMessage('')
  }, [])

  return (
    <PageWithForm 
      name='register'
      greeting='Добро пожаловать!'
    >
      <AuthForm
        isFormValid={formValid}
        submitButtonText={submitButtonText}
        onSubmit={handleSubmit}
      >
        <Input 
          inputName='Имя'
          classNameType='name'
          classNamePlaced='auth-form'
          inputPlaceholder='Имя'
          inputType='text'

          // minLength="2"
          // maxLength="30"
          required={true}

          inputError={nameValid}
          onChange={changeName}
          value={name}
        />
        <Input 
          inputName='Email'
          classNameType='email'
          classNamePlaced='auth-form'
          inputPlaceholder='Email'

          inputType='email'
          required={true}

          inputError={emailValid}
          onChange={changeEmail}
          value={email}
        />
        <Input 
          inputName='Пароль'
          classNameType='password'
          classNamePlaced='auth-form'
          inputPlaceholder='Пароль'
          inputType='password'

          required={true}
          minLength="5"
          maxLength="30"

          inputError={passwordValid}
          onChange={changePassword}
          value={password}
        />
        {apiErrorMessage && <FormErrorMessage
          inputWithErrorName='Ошибка'
          errorMessage={apiErrorMessage}
        />}
        {nameErrorMessage && <FormErrorMessage
          inputWithErrorName='Имя'
          errorMessage={nameErrorMessage}
        />}
        {emailErrorMessage && <FormErrorMessage
          inputWithErrorName='Email'
          errorMessage={emailErrorMessage}
        />}
        {passwordErrorMessage && <FormErrorMessage
          inputWithErrorName='Пароль'
          errorMessage={passwordErrorMessage}
        />}
      </AuthForm>
    </PageWithForm>
  );
};

export default Register;
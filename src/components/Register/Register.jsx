import React from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import { useCustomInputValidation } from '../../hooks/useCustomInputValidation';

const Register = ({
  onSignUp,
  onApiError
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
    setName(e.target.value);
    validateName(e)
  }

  function changeEmail(e) {
    setEmail(e.target.value);
    validateEmail(e)
  }
  
  function changePassword(e) {
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
      setSubmitButtonText("Зарегистрироваться")
      setApiErrorMessage('')
    })
  }

  React.useEffect(() => {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
      nameValid && name !== '' && emailValid && email !== '' && passwordValid && password !== '' ? setFormValid(false) : setFormValid(true);
      apiErrorMessage ?? setApiErrorMessage('')
  }, [nameValid, emailValid, passwordValid, name, email, password])

  React.useEffect(() => {
    if (onApiError) {
      if (onApiError.message === 'Failed to fetch') {
        setApiErrorMessage('Что-то пошло не так...')
      }
      if (onApiError.status === 409) {
        setApiErrorMessage('Пользователь с таким email уже зарегистрирован')
      }
      if (onApiError.status && onApiError.status !== 409) {
        setApiErrorMessage(onApiError.statusText)
      }
    }
  }, [onApiError])

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
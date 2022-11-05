import React from 'react';

import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import { useCustomInputValidation } from '../../hooks/useCustomInputValidation';

const Login = ({
  onSignIn,
  onApiError
}) => {
  const [formValid, setFormValid] = React.useState(false)
  const [submitButtonText, setSubmitButtonText] = React.useState("Войти")
  const [apiErrorMessage, setApiErrorMessage] = React.useState('')

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const { validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail, resetError: resetEmailError } = useCustomInputValidation({})
  const { validationMessage: passwordErrorMessage, isValid: passwordValid, onChange: validatePassword, resetError: resetPasswordError } = useCustomInputValidation({})

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
    setSubmitButtonText("Вхожу...")
    onSignIn({
      email: email,
      password: password
    })
      .finally(() => {
        setSubmitButtonText("Войти")
        setApiErrorMessage('')
      })
  }

  React.useEffect(() => {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    emailValid && email !== '' && passwordValid && password !== '' ? setFormValid(false) : setFormValid(true);
    apiErrorMessage ?? setApiErrorMessage('')
  }, [emailValid, passwordValid, email, password])

  React.useEffect(() => {  ///Дописать обработчик ошибок
    if (onApiError) {
      console.log(onApiError)
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
      name='login'
      greeting='Рады видеть!'
    >
      <AuthForm
        isFormValid={formValid}
        submitButtonText={submitButtonText}
        onSubmit={handleSubmit}
      >
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
          // minLength="5"
          // maxLength="30"

          inputError={passwordValid}
          onChange={changePassword}
          value={password}
        />
        {apiErrorMessage && <FormErrorMessage
          inputWithErrorName='Ошибка'
          errorMessage={apiErrorMessage}
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

export default Login;
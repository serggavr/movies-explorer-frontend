import React from 'react';

import './Profile.css'
import Header from '../Header/Header';
import Section from '../Section/Section';
import Input from '../Input/Input';
import FormErrorMessage from '../FormErrorMessage/FormErrorMessage';
import AuthForm from '../AuthForm/AuthForm';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useCustomInputValidation } from '../../hooks/useCustomInputValidation';

const Profile = ({
  handleOpenBurgerMenu,
  onChangeUserData,
  onApiError
}) => {
  const currentUser = React.useContext(CurrentUserContext);
  const [formValid, setFormValid] = React.useState(false)
  const [newName, setNewName] = React.useState('')
  const [newEmail, setNewEmail] = React.useState('')
  const [submitButtonText, setSubmitButtonText] = React.useState('Редактировать')
  const [apiErrorMessage, setApiErrorMessage] = React.useState('')

  const {validationMessage: nameErrorMessage, isValid: nameValid, onChange: validateName, resetError: resetNameError } = useCustomInputValidation({})
  const {validationMessage: emailErrorMessage, isValid: emailValid, onChange: validateEmail , resetError: resetEmailError} = useCustomInputValidation({})

  function handleChangeName(e) {
    setNewName(e.target.value);
    validateName(e)
  }

  function handleChangeEmail(e) {
    setNewEmail(e.target.value);
    validateEmail(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitButtonText('Сохранение...')
    if (newName === currentUser.name && newEmail === currentUser.email) {
      console.log('тожесамое')
    }
    onChangeUserData(newName, newEmail)
    .finally(() => {
      setSubmitButtonText('Редактировать')
      setApiErrorMessage('')
      setNewName('')
      setNewEmail('')
    })
  }

  // const handleFocus = (e) => {
  //   e.target.value = e.target.placeholder
  // }

  const handleFocusNewNameInput = () => {
    if (newName === '') {
      setNewName(currentUser.name)
    }
  }

  const handleFocusNewEmailInput = () => {
    if (newEmail === '') {
      setNewEmail(currentUser.email)
    }
  }

  React.useEffect(() => {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
      nameValid && newName !== '' && emailValid && newEmail !== '' && !(newName === currentUser.name && newEmail === currentUser.email) ? setFormValid(false) : setFormValid(true);
      apiErrorMessage ?? setApiErrorMessage('');
  }, [nameValid, emailValid, newName, newEmail, handleFocusNewNameInput, handleFocusNewEmailInput])

  React.useEffect(() => {
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
    // setNewName(currentUser.name)
    // setNewEmail(currentUser.email)
    setApiErrorMessage('')
  }, [])
  

  return (
    <>
      <Header loggedIn={true} theme='dark' handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <Section theme='dark' sectionName='profile'>
        <h1 className='profile__greetings'>Привет, {currentUser.name}!</h1>
        {/* <form 
          action='#'
          className='profile__form'
          name='profile'
          onSubmit={handleSubmit}
        > */}
          <AuthForm
            isFormValid={formValid}
            submitButtonText={submitButtonText}
            onSubmit={handleSubmit}
            submitButtonClassName='button_placed_profile'
            authFormClassName='auth__form_placed_profile'
          >
          <div className='profile-input-wrapper'>

            <Input 
              inputName='Имя'
              classNameType='name'
              classNamePlaced='profile'
              // inputPlaceholder=''
              inputPlaceholder={currentUser.name}
              inputType='text'
              required={true}
              inputError={nameValid}
              onChange={handleChangeName}
              value={newName}
              onFocus={handleFocusNewNameInput}
            />
            <Input 
              inputName='E-mail'
              classNameType='email'
              classNamePlaced='profile'
              // inputPlaceholder=''
              inputPlaceholder={currentUser.email}
              inputType='email'
              required={true}
              inputError={emailValid}
              onChange={handleChangeEmail}
              value={newEmail}
              onFocus={handleFocusNewEmailInput}
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
            
          </div>
          {/* <input type='submit' className='profile__button profile__button_type_edit' value={submitButtonText} /> */}
        {/* </form> */}
        </AuthForm>
        <button className='profile__button profile__button_type_logout'>Выйти из аккаунта</button>
      </Section>
    </>
  );
};

export default Profile;
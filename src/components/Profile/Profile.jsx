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
  onLogout,
  onApiError,
  isApiErrorMessage
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
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setNewName(e.target.value);
    validateName(e)
  }

  function handleChangeEmail(e) {
    if (apiErrorMessage) {
      setApiErrorMessage('')
    }
    setNewEmail(e.target.value);
    validateEmail(e)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitButtonText('Сохранение...')
    onChangeUserData(newName === '' ? currentUser.name : newName, newEmail === '' ? currentUser.email : newEmail)
    .finally(() => {
      setSubmitButtonText('Редактировать')
      setNewName('')
      setNewEmail('')
    })
  }

  const handleFocusNewNameInput = () => {
    if (newName === '') {
      setNewName(currentUser.name)
      setNewEmail(currentUser.email)
    }
  }

  const handleFocusNewEmailInput = () => {
    if (newEmail === '') {
      setNewName(currentUser.name)
      setNewEmail(currentUser.email)
    }
  }

  React.useEffect(() => {
    nameValid && emailValid && (newName !== '' || newEmail !== '') ? setFormValid(true) : setFormValid(false);

    if (newName === currentUser.name && newEmail === currentUser.email) {
      setFormValid(false)
    }
  }, [nameValid, emailValid, newName, newEmail])

  React.useEffect(() => {
    setApiErrorMessage(isApiErrorMessage)
  }, [isApiErrorMessage])

  React.useEffect(() => {
    setApiErrorMessage('')
  }, [])
  

  return (
    <>
      <Header loggedIn={true} theme='dark' handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <Section theme='dark' sectionName='profile'>
        <h1 className='profile__greetings'>Привет, {currentUser.name}!</h1>

          <AuthForm
            isFormValid={!formValid}
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
            {/* {isApiErrorMessage && <FormErrorMessage
              inputWithErrorName='Ошибка'
              errorMessage={isApiErrorMessage}
            />} */}
            {nameErrorMessage && <FormErrorMessage
              inputWithErrorName='Имя'
              errorMessage={nameErrorMessage}
            />}
            {emailErrorMessage && <FormErrorMessage
              inputWithErrorName='Email'
              errorMessage={emailErrorMessage}
            />}
            
          </div>
        </AuthForm>
        <button 
          className='profile__button profile__button_type_logout'
          onClick={onLogout}
        >Выйти из аккаунта</button>
      </Section>
    </>
  );
};

export default Profile;
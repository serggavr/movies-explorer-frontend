import React from 'react';
import { Routes, Route, Navigate} from 'react-router-dom'

import './App.css';
import Main from '../Main/Main';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import Profile from '../Profile/Profile'
import Login from '../Login/Login'
import Register from '../Register/Register'
import NotFound from '../NotFound/NotFound'
import BurgerMenu from '../BurgerMenu/BurgerMenu'
import PageWithForm from '../PageWithForm/PageWithForm';
import AuthForm from '../AuthForm/AuthForm';

function App() {

const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false)

 const handleOpenBurgerMenu = () => {
  setIsBurgerMenuOpen(!isBurgerMenuOpen)
 }

 const closeAllPopups = () => {
  setIsBurgerMenuOpen(false)
 }

 const handleCloseWithPushEscButton = React.useCallback((event) => {
  if (event.key === 'Escape') {
    closeAllPopups()
  }
}, [])

const handleCloseWithClickOnOverlay = React.useCallback((event) => {
  if (event.target.className.includes('burger-menu_visible')) {
    closeAllPopups()
  }
}, [])

 React.useEffect(() => {
  if (isBurgerMenuOpen) {
    document.addEventListener('keydown', handleCloseWithPushEscButton)
    document.addEventListener('click', handleCloseWithClickOnOverlay)
    return () => {
      document.removeEventListener('keydown', handleCloseWithPushEscButton)
      document.removeEventListener('click', handleCloseWithClickOnOverlay)
    }
  }
 }, [handleCloseWithClickOnOverlay, handleCloseWithPushEscButton, isBurgerMenuOpen])
  
  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={
            <Main 
              handleOpenBurgerMenu={handleOpenBurgerMenu}
            />
        } />
        <Route path='/movies' element={
          <ProtectedRoute loggedIn={true}>
            <Movies 
              handleOpenBurgerMenu={handleOpenBurgerMenu}
            />
          </ProtectedRoute>
        } />
        <Route path='/saved-movies' element={
          <ProtectedRoute loggedIn={true}>
            <SavedMovies 
              handleOpenBurgerMenu={handleOpenBurgerMenu}
            />
          </ProtectedRoute>
        } />
        <Route path='/profile' element={
          <ProtectedRoute loggedIn={true}>
            <Profile 
              handleOpenBurgerMenu={handleOpenBurgerMenu}
            />
          </ProtectedRoute>
        } />

        <Route path='/signin' element={
          <PageWithForm name='login' greeting='Рады видеть!'>
            <AuthForm 
              SubmitButtonText='Войти'>
              <Login />
            </AuthForm>
          </PageWithForm>
        } />
        
        <Route path='/signup' element={
          <PageWithForm name='register' greeting='Добро пожаловать!'>
            <AuthForm
              SubmitButtonText='Зарегистрироваться'>
              <Register />
            </AuthForm>
          </PageWithForm>
        } />

        <Route path='/404' element={<NotFound />} />
        <Route path='/*' element={<Navigate to={'/404'} />} />
      </Routes>

      <BurgerMenu 
        burgerMenuOpen={isBurgerMenuOpen}
        handleOpenBurgerMenu={handleOpenBurgerMenu}
      />
    </div>
  );
}

export default App;

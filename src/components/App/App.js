import React from 'react';
import { Routes, Route, Navigate, useNavigate} from 'react-router-dom'

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

import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false)
  // const [apiErrorMessage, setApiErrorMessage] = React.useState('')
  const [isApiError, setIsApiError] = React.useState('')

  const [isLogged, setIsLogged] = useLocalStorage(false, 'isLogged');
  const [currentUser, setCurrentUser] = useLocalStorage('', 'currentUser');
  
  // const [email, setEmail] = React.useState('')
  // const [currentUser, setCurrentUser] = React.useState({})
  // const [loggedIn, setLoggedIn] = React.useState(false)
  const navigate = useNavigate()

  //////////// Api //////////////
  // function getDataFromApi() {
  //   mainApi.getUser()
  //     .then((user) => {
  //       setCurrentUser(user)
  //   })
  //   .catch(err => {
  //     setIsApiError(err)
  //     console.log(err)
  //   })
  // }

  const handleChangeUserData = (name, email) => {
    return new Promise((resolve) => {
      mainApi.changeUserData(name, email)
      .then(user => {
        setCurrentUser(user)
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  const handleAuthWithToken = () => {
    mainApi.authWithToken()
    .then((data) => {
      setIsLogged(true)
      setCurrentUser(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  const handleSignUp = ({name, email, password}) => {
    return new Promise((resolve) => {
      mainApi.signUp({name, email, password})
      .then(res => {
          setIsApiError('')
          navigate('/signin', { push: true })
      })
      .catch((err) => {
          setIsApiError(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  const handleSignIn = ({email, password}) => {
    return new Promise((resolve) => {
      mainApi.signIn({email, password})
      .then((res) => {
        setIsLogged(true)
        setCurrentUser(res.data)
      })
      .then(() => {
        navigate('/movies', { push: true })
      })
      .catch(err => {
        setIsApiError(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  function handleMovieLike(movie) {
    console.log(movie)
    mainApi.addMovieToSavedMovieList(movie)
    .then(res => {
      //     setCards((state) => state.map((c) => c._id === card._id ? res: c))
      console.log(res)
        })
    // const isLiked = card.likes.some(like => like === currentUser._id);
    // if (isLiked) {
    //   Api.dislikeCard(card._id)
    //   .then(res => {
    //     setCards((state) => state.map((c) => c._id === card._id ? res: c))
    //   })
    //   .catch(err => console.log(err))
    // } else {
    //   Api.likeCard(card._id)
    //   .then(res => {
    //     setCards((state) => state.map((c) => c._id === card._id ? res: c))
    //   })
      .catch(err => console.log(err))
    // }
  }

  function handleRemoveMovieFromSavedList(movie) {
    return new Promise((resolve) => {
    console.log(movie)
    mainApi.deleteMovieFromSavedList(movie._id)
    .then(res => {
      console.log(res)
    })
    .catch(err => console.log(err))
    .finally(() => {
      resolve()
    })
  })
  }

  //////////////////////////////

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

  // React.useEffect(() => {
  //   if (isApiError) {
  //     console.log(isApiError)
  //     if (isApiError.message === 'Failed to fetch') {
  //       setApiErrorMessage('Что-то пошло не так...')
  //     }
  //     if (isApiError.status === 409) {
  //       setApiErrorMessage('Пользователь с таким email уже зарегистрирован')
  //     }
  //     if (isApiError.status && isApiError.status !== 409) {
  //       setApiErrorMessage(isApiError.statusText)
  //     }
  //   }
  // }, [isApiError])

  React.useEffect(() =>{
      if (!isLogged) {
        console.log('авторизация по токену')
        handleAuthWithToken()
      }
  }, [])

  // React.useEffect(() =>{
  //   if (!currentUser.email) {
  //     setLoggedIn(false)
  //     console.log('not user')
  //   }
  //   if (currentUser.email) {
  //     setLoggedIn(true)
      
      
  //     console.log('yes user')
  //   }
  // }, [currentUser])
  
  return (
    
    <div className='app'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={
              <Main 
                handleOpenBurgerMenu={handleOpenBurgerMenu}
              />
          } />
          <Route path='/movies' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <Movies 
                handleOpenBurgerMenu={handleOpenBurgerMenu}
                onMovieLike={handleMovieLike}
              />
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <SavedMovies 
                handleOpenBurgerMenu={handleOpenBurgerMenu}
                onMovieRemove={handleRemoveMovieFromSavedList}
              />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <Profile 
                handleOpenBurgerMenu={handleOpenBurgerMenu}
                onChangeUserData={handleChangeUserData}
                onApiError={isApiError}
              />
            </ProtectedRoute>
          } />

          <Route path='/signin' element={
            <Login 
            onSignIn={handleSignIn}
            onApiError={isApiError}
            />
          } />
          
          
          <Route path='/signup' element={ 
            <Register
            onSignUp={handleSignUp}
            onApiError={isApiError}
            /> 
          } />

          <Route path='/404' element={ <NotFound /> } />
          <Route path='/*' element={ <Navigate to={'/404'} /> } />
        </Routes>

        <BurgerMenu 
          burgerMenuOpen={isBurgerMenuOpen}
          handleOpenBurgerMenu={handleOpenBurgerMenu}
        />

      </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;

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
import ErrorPopup from '../ErrorPopup/ErrorPopup';

import { mainApi } from '../../utils/MainApi';
import { CurrentUserContext } from '../../context/CurrentUserContext';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import {
  widthMax,
  widthRegular,
  widthTablet,
  widthMobile,
  movieLoadErrorMessage,
} from '../../utils/constants';

function App() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = React.useState(false);
  const [isErrorPopupOpen , setIsErrorPopupOpen] = React.useState(false);
  const [apiErrorMessage, setApiErrorMessage] = React.useState('');
  const [isApiError, setIsApiError] = React.useState('');

  const [isLogged, setIsLogged] = useLocalStorage(false, 'isLogged');
  const [currentUser, setCurrentUser] = useLocalStorage('', 'currentUser');
  const [savedMoviesList, setSavedMoviesList] = useLocalStorage([], 'SavedMoviesList');

  const [loadMoreMoviesButtonVisible, setLoadMoreMoviesButtonVisible] = React.useState(false);

  const [initialAmountCards, setInitialAmountCards] = React.useState(12);
  const [amountCardsForLoad, setAmountCardsForLoad] = React.useState(3);

  const navigate = useNavigate();

  const apiErrorHandler = (err) => {
    if (err.status === 400) { // CastError
      setIsApiError('CastError');
    }
    if (err.status === 403) { // ForbiddenError
      setIsApiError('ForbiddenError');
    }
    if (err.status === 409) { // ConflictError
      setIsApiError('ConflictError');
    }
    if (err.status === 401) { // UnauthorizedError
      setIsApiError('Нет доступа');
    }
    if (err.status === 500) { // ServerError
      setIsApiError('Ошибка сервера');
    }
    if (err.status === 404) { // NotFoundError
      setIsApiError('Не найдено');
    }
    if (!err.status) { 
      setIsApiError('Ошибка сервера'); // Filed to Fetch
    }
    handleOpenErrorPopup();
  }

  const searchErrorHandler = () => {
    setIsApiError('Нужно ввести ключевое слово');
    handleOpenErrorPopup()
  }

  const handleChangeUserData = (name, email) => {
    return new Promise((resolve) => {
      mainApi.changeUserData(name, email)
      .then(user => {
        setCurrentUser(user)
      })
      .catch((err) => {
        apiErrorHandler(err)
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
      if (err.status !== 401) {
        apiErrorHandler(err)
      }
    })
  }

  const handleSignUp = ({name, email, password}) => {
    return new Promise((resolve) => {
      mainApi.signUp({name, email, password})
      .then((res) => {
        setIsApiError('')
        mainApi.signIn({email, password})
        .then((res) => {
          setIsLogged(true)
          setCurrentUser(res.data)
          navigate('/movies', { push: true })
        })
      })
      .catch((err) => {
        console.log(err)
          setIsApiError(err.statusText)
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
        if (res.data)
        // console.log(res)
        setIsLogged(true)
        setCurrentUser(res.data)
        navigate('/movies', { push: true })
      })
      .catch(err => {
        setIsApiError(err.statusText)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  function handleMovieLike(movie) {
    return new Promise((resolve) => {
      mainApi.addMovieToSavedMoviesList(movie)
      .then(res => {
        setSavedMoviesList([...savedMoviesList, res])
      })
      .catch(err => {
        apiErrorHandler(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  function handleMovieDislike(movie) {
    return new Promise((resolve) => {
      const [dislikedSavedMovie] = savedMoviesList.filter(savedMovie => savedMovie.movieId === movie.id)
      mainApi.deleteMovieFromSavedList(dislikedSavedMovie._id)
      .catch(err => {
        apiErrorHandler(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  function handleRemoveMovieFromSavedList(movie) {
    return new Promise((resolve) => {
      mainApi.deleteMovieFromSavedList(movie._id)
      .catch(err => {
      apiErrorHandler(err)
      })
      .finally(() => {
        resolve()
      })
    })
  }

  const handleLogout = () => {
    mainApi.logout()
    .then((res) => {
      setIsLogged(false)
      setCurrentUser({})
      localStorage.setItem('FilterQuery', JSON.stringify(''))
      localStorage.setItem('SavedMoviesFilterQuery', JSON.stringify(''))
      navigate('/', { push: true })
    })
    .catch(err => {
      apiErrorHandler(err)
    })
  }

  //////////////////////////////

  const handleOpenBurgerMenu = () => {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  const handleOpenErrorPopup = () => {
    setIsErrorPopupOpen(!isErrorPopupOpen);
  }

  const closeBurgerMenu = () => {
    setIsBurgerMenuOpen(false);
  }

  const closeErrorPopup = () => {
    setIsErrorPopupOpen(false);
  }

  const handleCloseWithPushEscButton = React.useCallback((event) => {
    if (event.key === 'Escape') {
      closeBurgerMenu();
      closeErrorPopup();
    }
  }, []);

  const handleCloseWithClickOnOverlay = React.useCallback((event) => {
    if (event.target.className.includes('burger-menu_visible')) {
      closeBurgerMenu();
    }
    if (event.target.className.includes('error-popup_visible')) {
      closeBurgerMenu();
    }
  }, []);

  React.useEffect(() => {
    if (isBurgerMenuOpen) {
      document.addEventListener('keydown', handleCloseWithPushEscButton);
      document.addEventListener('click', handleCloseWithClickOnOverlay);
      return () => {
        document.removeEventListener('keydown', handleCloseWithPushEscButton);
        document.removeEventListener('click', handleCloseWithClickOnOverlay);
      }
    }
  }, [handleCloseWithClickOnOverlay, handleCloseWithPushEscButton, isBurgerMenuOpen]);

  React.useEffect(() =>{
    setApiErrorMessage('');
      if (!isLogged) {
        handleAuthWithToken();
      }
  }, []);

  function handleChangeAmountOfCardVisible(windowWidth) {
    if(windowWidth <= widthMobile.maxDisplayWidth) {
      setInitialAmountCards(widthMobile.initialAmountCards);
      setAmountCardsForLoad(widthMobile.amountCardsForLoad);
    }
    if(windowWidth <= widthTablet.maxDisplayWidth & windowWidth > widthMobile.maxDisplayWidth) {
      setInitialAmountCards(widthTablet.initialAmountCards);
      setAmountCardsForLoad(widthTablet.amountCardsForLoad);
    }
    if(windowWidth <= widthRegular.maxDisplayWidth & windowWidth > widthTablet.maxDisplayWidth) {
      setInitialAmountCards(widthRegular.initialAmountCards);
      setAmountCardsForLoad(widthRegular.amountCardsForLoad);
    }
    if(windowWidth > widthMax.maxDisplayWidth) {
      setInitialAmountCards(widthMax.initialAmountCards);
      setAmountCardsForLoad(widthMax.amountCardsForLoad);
    }
  }

  function handleFilterMovieCards(cardsList, filterQuery, filterCheckbox) {
    let filteredArray = [];
    let filterDuration = 40;
    if (filterQuery) {
      filteredArray = cardsList.filter(item => item.nameRU.toLowerCase().includes(filterQuery.toLowerCase()));
      if (filterCheckbox) {
        return filteredArray.filter(item => item.duration <= filterDuration);
      }
    } 
    return filteredArray;
  }

  function handleFilterSavedMovieCards(cardsList, filterQuery, filterCheckbox) {
    let filteredArray = [];
    let filterDuration = 40;
    if (filterQuery) {
      filteredArray = cardsList.filter(item => item.nameRU.toLowerCase().includes(filterQuery.toLowerCase()));
      if (filterCheckbox) {
        return filteredArray.filter(item => item.duration <= filterDuration);
      }
      return filteredArray
    }
    if (filterCheckbox) {
      return cardsList.filter(item => item.duration <= filterDuration);
    }
    return cardsList.filter(item => item.duration >= filterDuration);
  }

  function handleLoadingPartialCards(arrayCardsForLoad, cardsMustBeLoaded) {
    if (arrayCardsForLoad.length <= cardsMustBeLoaded) {
      return arrayCardsForLoad;
    } else {
      const arrayCardsMustBeLoaded = arrayCardsForLoad.slice(0, cardsMustBeLoaded)
      return arrayCardsMustBeLoaded;
    }
  }

  function handleChangeMoreButtonVisible(filteredMovies, returnedCards, initialAmountCards) {
    if (filteredMovies.length >= initialAmountCards) {
      setLoadMoreMoviesButtonVisible(true);
    }
    if (filteredMovies.length <= returnedCards.length) {
      setLoadMoreMoviesButtonVisible(false);
    }
  }

  const getSavedMoviesFromMoviesApi = () => {
    mainApi.getSavedMoviesList()
      .then(movies => {
        setApiErrorMessage('')
        setSavedMoviesList(movies)
      })
      .catch(err => {
        setApiErrorMessage(movieLoadErrorMessage)
      })
  }

  const handleSavedMovieRemove = (movie) => {
    handleRemoveMovieFromSavedList(movie)
    .finally(() => {
      const moviesList = savedMoviesList.filter((el) => el._id !== movie._id)
      setSavedMoviesList(moviesList)
    })
  }

  React.useEffect (() => {
      if (isLogged) {
        getSavedMoviesFromMoviesApi();
      }
  }, [isLogged]);
  
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
                onMovieDislike={handleMovieDislike}
                onMovieLike={handleMovieLike}
                onChangeWindowWidth={handleChangeAmountOfCardVisible}
                onFilterMovieCards={handleFilterMovieCards}
                onLoadingPartialCards={handleLoadingPartialCards}
                onChangeButtonVisible={handleChangeMoreButtonVisible}
                loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
                savedMoviesList={savedMoviesList}
                initialAmountCards={initialAmountCards}
                amountCardsForLoad={amountCardsForLoad}
                searchErrorHandler={searchErrorHandler}
              />
            </ProtectedRoute>
          } />
          <Route path='/saved-movies' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <SavedMovies
                handleOpenBurgerMenu={handleOpenBurgerMenu}
                onMovieRemove={handleRemoveMovieFromSavedList}
                onChangeWindowWidth={handleChangeAmountOfCardVisible}
                onFilterMovieCards={handleFilterSavedMovieCards}
                onLoadingPartialCards={handleLoadingPartialCards}
                onChangeButtonVisible={handleChangeMoreButtonVisible}
                loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
                getSavedMoviesFromMoviesApi={getSavedMoviesFromMoviesApi}
                savedMoviesList={savedMoviesList}
                apiErrorMessage={apiErrorMessage}
                onSavedMovieRemove={handleSavedMovieRemove}
                initialAmountCards={initialAmountCards}
                amountCardsForLoad={amountCardsForLoad}
                searchErrorHandler={searchErrorHandler}
              />
            </ProtectedRoute>
          } />
          <Route path='/profile' element={
            <ProtectedRoute isLoggedIn={isLogged}>
              <Profile 
                handleOpenBurgerMenu={handleOpenBurgerMenu}
                onChangeUserData={handleChangeUserData}
                onApiError={isApiError}
                onLogout={handleLogout}
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

        <ErrorPopup
          isErrorPopupOpen={isErrorPopupOpen}
          errorMessage={isApiError}
          handleOpenErrorPopup={handleOpenErrorPopup}
        />

      </CurrentUserContext.Provider>
    </div>
    
  );
}

export default App;

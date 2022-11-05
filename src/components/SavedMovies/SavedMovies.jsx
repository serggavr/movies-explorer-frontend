import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { mainApi } from '../../utils/MainApi';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/useWindowWidth';

import {
  widthMax,
  widthRegular,
  widthTablet,
  widthMobile,
  movieNotFoundMessage,
  movieLoadErrorMessage,
} from '../../utils/constants';

const SavedMovies = ({
  handleOpenBurgerMenu,
  onMovieRemove
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [savedMoviesList, setSavedMoviesList] = useLocalStorage([], 'SavedMoviesList');
  const [savedShortMovieCheckbox, setSavedShortMovieCheckbox] = useLocalStorage(false, 'SavedShortMovieCheckbox');
  const [savedMoviesFilterQuery, setSavedMoviesFilterQuery] = useLocalStorage('', 'SavedMoviesFilterQuery');
  const [filteredSavedMovies, setFilteredSavedMovies] = useLocalStorage([], 'SavedFilteredMovies');

  const [returnedCards, setReturnedCards] = React.useState([]);
  const [loadMoreButtonVisible, setLoadMoreButtonVisible] = React.useState(false);
  const [moviesMessageVisible, setMoviesMessageVisible] = React.useState(false);
  const [moviesMessage, setMoviesMessage] = React.useState('');

  const [initialAmountCards, setInitialAmountCards] = React.useState(12);
  const [amountCardsForLoad, setAmountCardsForLoad] = React.useState(3);

  const windowWidth = useWindowWidth();

  const handleSavedMovieRemove = (movie) => {
    onMovieRemove(movie)
    .finally(() => {
      const moviesList = savedMoviesList.filter((el) => el._id !== movie._id)
      console.log(moviesList)
      setSavedMoviesList(moviesList)
    })
    // console.log(movie)
  }

  function changeAmountOfCardVisible() {
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

const handleFilterQueryChange = (query) => {
  setSavedMoviesFilterQuery(query);
  if (!savedMoviesFilterQuery && savedMoviesList.length === 0) {
    getSavedMoviesFromMoviesApi();
  }
}

const handleFilterDurationChange = () => {
  setSavedShortMovieCheckbox(!savedShortMovieCheckbox);
}

  function changeButtonVisible() {
    if (filteredSavedMovies.length >= initialAmountCards) {
      setLoadMoreButtonVisible(true);
    }
    if (filteredSavedMovies.length <= returnedCards.length) {
      setLoadMoreButtonVisible(false);
    }
  }

  function onLoadMoreCards() {
    setReturnedCards( loadingPartialCards(filteredSavedMovies, returnedCards.length + amountCardsForLoad) );
  }

  function loadingPartialCards(arrayCardsForLoad, cardsMustBeLoaded) {
    if (arrayCardsForLoad.length <= cardsMustBeLoaded) {
      return arrayCardsForLoad;
    } else {
      const arrayCardsMustBeLoaded = arrayCardsForLoad.slice(0, cardsMustBeLoaded)
      return arrayCardsMustBeLoaded;
    }
  }

  function filterMovieCards(cardsList, filterQuery, filterCheckbox) {
    // console.log(cardsList, filterQuery, filterCheckbox)
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

  const getSavedMoviesFromMoviesApi = () => {
    setIsLoading(true);
    mainApi.getSavedMoviesList()
      .then((movies) => {
        if (movies.length > 0) {
          setSavedMoviesList(movies);
        } else {
          console.log('пустой список фильмов')
          setIsLoading(false);
          setMoviesMessage(movieNotFoundMessage);
          setMoviesMessageVisible(true);
        }
        
      })
      .catch(err => {
        console.log('error get saved Movie')
        savedMoviesFilterQuery('');
        setIsLoading(false);
        setMoviesMessage(movieLoadErrorMessage);
        setMoviesMessageVisible(true);
      })
  }

  React.useEffect(() => {
    setMoviesMessageVisible(true);
  }, [moviesMessage])

  React.useEffect (() => {
    if(filteredSavedMovies.length !== 0) {
      getSavedMoviesFromMoviesApi();
    } else {
      setIsLoading(false);
    }
}, []);

React.useEffect(() => {
  if (savedMoviesList.length > 0) {
    setFilteredSavedMovies( filterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox) );
  } else {
    setMoviesMessage(movieNotFoundMessage);
    setMoviesMessageVisible(true);
  }
  setIsLoading(false)
}, [savedMoviesList]);

React.useEffect(() => {
  if (savedMoviesFilterQuery !== '') {
    setFilteredSavedMovies( filterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox) );
  }
}, [savedMoviesFilterQuery]);

React.useEffect(() => {
  if (savedMoviesFilterQuery !== '') {
    setFilteredSavedMovies( filterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox) );
  }
}, [savedShortMovieCheckbox]);

React.useEffect(() => {
  setMoviesMessageVisible(false);
if (filteredSavedMovies.length === 0 & savedMoviesFilterQuery !== '') {
  setMoviesMessage(movieNotFoundMessage);
  setMoviesMessageVisible(true);
}
// if (filteredSavedMovies.length === 0 & savedMoviesList.length === 0) {
//   // setMoviesMessageVisible(false);
// }
setReturnedCards( loadingPartialCards(filteredSavedMovies, initialAmountCards) );
}, [filteredSavedMovies]);

React.useEffect(() => {
  changeButtonVisible();
}, [returnedCards]);

React.useEffect(() => {
  changeAmountOfCardVisible();
}, [windowWidth]);

React.useEffect(() => {
  if (initialAmountCards > returnedCards.length) { /// Чтобы уже загруженные фильмы оставались на экране при смене разрешения
    setReturnedCards( loadingPartialCards(filteredSavedMovies, initialAmountCards) );
  }

}, [initialAmountCards]);


  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='dark' />
      <SearchForm
        onFilterQueryChange={handleFilterQueryChange}
        filterQueryValue={savedMoviesFilterQuery}
        isLoading={isLoading}
        onMovieCheckboxChange={handleFilterDurationChange}
        shortMovieCheckboxChecked={savedShortMovieCheckbox}
      />
      { isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          onSavedMoviesPage={true}
          onLoadMoreButtonClick={onLoadMoreCards}
          loadMoreButtonVisible={loadMoreButtonVisible}
          moviesMessageVisible={moviesMessageVisible}
          moviesMessage={moviesMessage}
        >
          {returnedCards.map((movie, index) => {
            // console.log(movie)
            return (
              <MoviesCard
                movie={movie}
                onMovieRemove={handleSavedMovieRemove}
                key={`${index}`}
                saved={true}
              />
            )
          })}
        </MoviesCardList>
        )
      }    
      <Footer />
    </>
  );
};

export default SavedMovies;
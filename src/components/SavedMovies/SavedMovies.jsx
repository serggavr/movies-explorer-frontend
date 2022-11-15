import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import Preloader from '../Preloader/Preloader';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { movieNotFoundMessage } from '../../utils/constants';

const SavedMovies = ({
  handleOpenBurgerMenu,
  onChangeWindowWidth,
  onFilterMovieCards,
  onLoadingPartialCards,
  onChangeButtonVisible,
  loadMoreMoviesButtonVisible,
  savedMoviesList,
  onSavedMovieRemove,
  getSavedMoviesFromMoviesApi,
  apiErrorMessage,
  initialAmountCards,
  amountCardsForLoad,
  infoMessageHandler
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [savedShortMovieCheckbox, setSavedShortMovieCheckbox] = useLocalStorage(false, 'SavedShortMovieCheckbox');
  const [savedMoviesFilterQuery, setSavedMoviesFilterQuery] = useLocalStorage('', 'SavedMoviesFilterQuery');
  const [filteredSavedMovies, setFilteredSavedMovies] = useLocalStorage([], 'SavedFilteredMovies');
  const [returnedCards, setReturnedCards] = React.useState([]);
  const [moviesMessageVisible, setMoviesMessageVisible] = React.useState(false);
  const [moviesNotFoundMessage, setMoviesNotFoundMessage] = React.useState('');
  const windowWidth = useWindowWidth();

  const handleFilterQueryChange = (query) => {
    setSavedMoviesFilterQuery(query);
    if (query === '') {
      infoMessageHandler('Нужно ввести ключевое слово')
    } else {
      if (!savedMoviesFilterQuery && savedMoviesList.length === 0) {
        getSavedMoviesFromMoviesApi();
      }
    }
  }

  const handleFilterDurationChange = () => {
    setSavedShortMovieCheckbox(!savedShortMovieCheckbox);
  }

  function onLoadMoreCards() {
    setReturnedCards( onLoadingPartialCards(filteredSavedMovies, returnedCards.length + amountCardsForLoad) );
  }

  React.useEffect(() => {
    setMoviesMessageVisible(true);
  }, [moviesNotFoundMessage, apiErrorMessage])

  React.useEffect (() => {
    if(filteredSavedMovies.length !== 0) {
      setSavedShortMovieCheckbox(false)
      setSavedMoviesFilterQuery('')
      getSavedMoviesFromMoviesApi();
    } else {
      setIsLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (savedMoviesList.length > 0) {
      setFilteredSavedMovies( savedMoviesList );
    } else {
      setMoviesNotFoundMessage(movieNotFoundMessage);
      setMoviesMessageVisible(true);
    }
    setIsLoading(false);
  }, [savedMoviesList]);

  React.useEffect(() => {
    if (savedMoviesFilterQuery !== '') {
      setFilteredSavedMovies( onFilterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox) );
    }
      
  }, [savedMoviesFilterQuery]);

  React.useEffect(() => {
      setFilteredSavedMovies( onFilterMovieCards(savedMoviesList, savedMoviesFilterQuery, savedShortMovieCheckbox) );
  }, [savedShortMovieCheckbox]);

  React.useEffect(() => {
    setMoviesMessageVisible(false);
  if (filteredSavedMovies.length === 0 & savedMoviesFilterQuery !== '') {
    setMoviesNotFoundMessage(movieNotFoundMessage);
    setMoviesMessageVisible(true);
  }
  setReturnedCards( onLoadingPartialCards(filteredSavedMovies, initialAmountCards) );
  }, [filteredSavedMovies]);

  React.useEffect(() => {
    onChangeButtonVisible(filteredSavedMovies, returnedCards, initialAmountCards);
  }, [returnedCards]);

  React.useEffect(() => {
    onChangeWindowWidth(windowWidth);
  }, [windowWidth]);

  React.useEffect(() => {
    if (initialAmountCards > returnedCards.length) { /// Чтобы уже загруженные фильмы оставались на экране при смене разрешения
      setReturnedCards( onLoadingPartialCards(filteredSavedMovies, initialAmountCards) );
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
            loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
            moviesMessageVisible={moviesMessageVisible}
            moviesMessage={moviesNotFoundMessage}
            apiErrorMessage={apiErrorMessage}
          >
            {returnedCards.map((movie) => {
              return (
                <MoviesCard
                  movie={movie}
                  onMovieRemove={onSavedMovieRemove}
                  key={`${movie._id}`}
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
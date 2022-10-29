import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import moviesApi from '../../utils/MoviesApi';
import {
  widthMax,
  widthRegular,
  widthTablet,
  widthMobile,
  movieNotFoundMessage,
  movieLoadErrorMessage,
} from '../../utils/constants';

const Movies = ({
  handleOpenBurgerMenu,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);
  const [shortMovieCheckbox, setShortMovieCheckbox] = useLocalStorage(false, 'ShortMovieCheckbox');
  const [filterQuery, setFilterQuery] = useLocalStorage('', 'FilterQuery');
  const [moviesList, setMoviesList] = useLocalStorage([], 'Movie');
  const [filteredMovies, setFilteredMovie] = useLocalStorage([], 'FilteredMovie');
  const [returnedCards, setReturnedCards] = React.useState([]);
  const [loadMoreButtonVisible, setLoadMoreButtonVisible] = React.useState(false);
  const [moviesMessageVisible, setMoviesMessageVisible] = React.useState(false);
  const [moviesMessage, setMoviesMessage] = React.useState(movieNotFoundMessage);
  const windowWidth = useWindowWidth();
  const [initialAmountCards, setInitialAmountCards] = React.useState(12);
  const [amountCardsForLoad, setAmountCardsForLoad] = React.useState(3);

  function filterCards(cardsList, filterQuery, filterCheckbox) {
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

  function loadingPartialCards(arrayCardsForLoad, cardsMustBeLoaded) {
    if (arrayCardsForLoad.length <= cardsMustBeLoaded) {
      return arrayCardsForLoad;
    } else {
      const arrayCardsMustBeLoaded = arrayCardsForLoad.slice(0, cardsMustBeLoaded)
      return arrayCardsMustBeLoaded;
    }
  }

  function changeButtonVisible() {
    if (filteredMovies.length >= initialAmountCards) {
      setLoadMoreButtonVisible(true);
    }
    if (filteredMovies.length <= returnedCards.length) {
      setLoadMoreButtonVisible(false);
    }
  }

  function onLoadMoreCards() {
    setReturnedCards( loadingPartialCards(filteredMovies, returnedCards.length + amountCardsForLoad) );
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
    setFilterQuery(query);
    if (!filterQuery && moviesList.length === 0) {
      getMoviesFromMoviesApi();
    }
  }

  const handleFilterDurationChange = () => {
    setShortMovieCheckbox(!shortMovieCheckbox);
  }

  const getMoviesFromMoviesApi = () => {
    setIsLoading(true);
    moviesApi.getMovies()
      .then((movies) => {
          setMoviesList(movies);
      })
      .catch(err => {
        setFilterQuery('');
        setIsLoading(false);
        setMoviesMessage(movieLoadErrorMessage);
        setMoviesMessageVisible(true);
      })
  }

  React.useEffect (() => {
      if(filteredMovies.length !== 0) {
        getMoviesFromMoviesApi();
      } else {
        setIsLoading(false);
      }
  }, []);

  React.useEffect(() => {
    if (moviesList.length > 0) {
      setFilteredMovie( filterCards(moviesList, filterQuery, shortMovieCheckbox) );
      setIsLoading(false);
    }
  }, [moviesList]);

  React.useEffect(() => {
    if (filterQuery !== '') {
      setFilteredMovie( filterCards(moviesList, filterQuery, shortMovieCheckbox) );
    }
  }, [filterQuery]);

  React.useEffect(() => {
    if (filterQuery !== '') {
      setFilteredMovie( filterCards(moviesList, filterQuery, shortMovieCheckbox) );
    }
  }, [shortMovieCheckbox]);

  React.useEffect(() => {
      setMoviesMessageVisible(false);
    if (filteredMovies.length === 0) {
      setMoviesMessage(movieNotFoundMessage);
      setMoviesMessageVisible(true);
    }
    if (filteredMovies.length === 0 & moviesList.length === 0) {
      setMoviesMessageVisible(false);
    }
    setReturnedCards( loadingPartialCards(filteredMovies, initialAmountCards) );
  }, [filteredMovies]);

  React.useEffect(() => {
    changeButtonVisible();
  }, [returnedCards]);

  React.useEffect(() => {
      changeAmountOfCardVisible();
  }, [windowWidth]);

  React.useEffect(() => {
    if (initialAmountCards > returnedCards.length) { /// Чтобы уже загруженные фильмы оставались на экране при смене разрешения
      setReturnedCards( loadingPartialCards(filteredMovies, initialAmountCards) );
    }

  }, [initialAmountCards]);

  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='dark' />
      <SearchForm
        onFilterQueryChange={handleFilterQueryChange}
        filterQueryValue={filterQuery}
        isLoading={isLoading}
        onMovieCheckboxChange={handleFilterDurationChange}
        shortMovieCheckboxChecked={shortMovieCheckbox}
      />
      { isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList 
          onLoadMoreButtonClick={onLoadMoreCards}
          loadMoreButtonVisible={loadMoreButtonVisible}
          moviesMessageVisible={moviesMessageVisible}
          moviesMessage={moviesMessage}
        >
          {returnedCards.map((movie) => {
            return (
              <MoviesCard
                key={movie.id}
                nameRU={movie.nameRU}
                image={movie.image}
                trailerLink={movie.trailerLink}
                duration={movie.duration}
                {...movie}
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

export default Movies;
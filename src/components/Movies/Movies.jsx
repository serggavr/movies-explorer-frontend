import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { useWindowWidth } from '../../hooks/useWindowWidth';
import { moviesApi } from '../../utils/MoviesApi';
import {
  movieNotFoundMessage,
  movieLoadErrorMessage,
} from '../../utils/constants';

const Movies = ({
  handleOpenBurgerMenu,
  onMovieLike,
  onMovieDislike,
  onChangeWindowWidth,
  onFilterMovieCards,
  onLoadingPartialCards,
  onChangeButtonVisible,
  loadMoreMoviesButtonVisible,
  savedMoviesList,
  initialAmountCards,
  amountCardsForLoad,
}) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [shortMovieCheckbox, setShortMovieCheckbox] = useLocalStorage(false, 'ShortMovieCheckbox');
  const [filterQuery, setFilterQuery] = useLocalStorage('', 'FilterQuery');
  const [moviesList, setMoviesList] = useLocalStorage([], 'MoviesList');
  const [filteredMovies, setFilteredMovie] = useLocalStorage([], 'FilteredMovies'); 

  const [returnedCards, setReturnedCards] = React.useState([]);
  const [moviesMessageVisible, setMoviesMessageVisible] = React.useState(false);
  const [moviesMessage, setMoviesMessage] = React.useState(movieNotFoundMessage);
  const windowWidth = useWindowWidth();

  function onLoadMoreCards() {
    setReturnedCards( onLoadingPartialCards(filteredMovies, returnedCards.length + amountCardsForLoad) );
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
      setFilteredMovie( onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox) );
      setIsLoading(false);
    }
  }, [moviesList]);

  React.useEffect(() => {
    if (filterQuery !== '') {
      setFilteredMovie( onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox) );
    }
  }, [filterQuery]);

  React.useEffect(() => {
    if (filterQuery !== '') {
      setFilteredMovie( onFilterMovieCards(moviesList, filterQuery, shortMovieCheckbox) );
    }
  }, [shortMovieCheckbox]);

  React.useEffect(() => {
      setMoviesMessageVisible(false);
    if (filteredMovies.length === 0 & filterQuery !== '') {
      setMoviesMessage(movieNotFoundMessage);
      setMoviesMessageVisible(true);
    }
    if (filteredMovies.length === 0 & moviesList.length === 0) {
      setMoviesMessageVisible(false);
    }
    setReturnedCards( onLoadingPartialCards(filteredMovies, initialAmountCards) );
  }, [filteredMovies]);

  React.useEffect(() => {
    onChangeButtonVisible(filteredMovies, returnedCards, initialAmountCards);
  }, [returnedCards]);

  React.useEffect(() => {
    onChangeWindowWidth(windowWidth);
  }, [windowWidth]);

  React.useEffect(() => {
    if (initialAmountCards > returnedCards.length) { /// Чтобы уже загруженные фильмы оставались на экране при смене разрешения
      setReturnedCards( onLoadingPartialCards(filteredMovies, initialAmountCards) );
    }

  }, [initialAmountCards]);

  return (
    <>
      <Header 
        handleOpenBurgerMenu={handleOpenBurgerMenu} 
        theme='dark'
      />
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
          loadMoreMoviesButtonVisible={loadMoreMoviesButtonVisible}
          moviesMessageVisible={moviesMessageVisible}
          moviesMessage={moviesMessage}
        >
          {returnedCards.map((movie, index) => {
            let liked = false
            if (savedMoviesList.filter(savedMovie => savedMovie.movieId === movie.id).length !== 0) {
              liked = true
            } 
            return (
              <MoviesCard
                movie={movie}
                onMovieLike={onMovieLike}
                onMovieDislike={onMovieDislike}
                key={`${movie.id}`}
                liked={liked}
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
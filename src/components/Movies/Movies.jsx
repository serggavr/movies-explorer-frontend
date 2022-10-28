import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { useMoviesFilter } from '../../hooks/useMoviesFilter';
import { useLocalStorage } from '../../hooks/useLocalStorage';

import moviesApi from '../../utils/MoviesApi';

const Movies = ({
  handleOpenBurgerMenu,
}) => {
  const [isLoading, setIsLoading] = React.useState(true)
  const [shortMovieCheckbox, setShortMovieCheckbox] = useLocalStorage(false, 'ShortMovieCheckbox')
  const [filterQuery, setFilterQuery] = useLocalStorage('', 'FilterQuery')
  const [moviesList, setMoviesList] = useLocalStorage([], 'Movie')
  const [filteredMovies, setFilteredMovie] = useLocalStorage([], 'FilteredMovie')
  const [returnedCards, setReturnedCards] = React.useState([])
  const [loadMoreButtonVisible, setLoadMoreButtonVisible] = React.useState(false)
  // const [filteredArray, setArrayForFiltering, setFilteredQueryField, setFilterQueryValue, setFilterDurationValue, setFilteredDurationField] = useMoviesFilter()
  const initialAmountCards = 12
  const amountCardsForLoad = 3

  /////////перенести

  function filterCards(cardsList, filterQuery, filterCheckbox) {
    let filteredArray = []
    let filterDuration = 40
    if (filterQuery) {
      filteredArray = cardsList.filter(item => item.nameRU.toLowerCase().includes(filterQuery.toLowerCase()))
      if (filterCheckbox) {
        return filteredArray.filter(item => item.duration <= filterDuration)
      }
    }
    return filteredArray
  }

  function loadingPartialCards(arrayCardsForLoad, cardsMustBeLoaded) {
    if (arrayCardsForLoad.length <= cardsMustBeLoaded) {
      return arrayCardsForLoad
    } else {
      const arrayCardsMustBeLoaded = arrayCardsForLoad.slice(0, cardsMustBeLoaded)
      return arrayCardsMustBeLoaded
    }
  }

  function changeButtonVisible() {
    console.log(filteredMovies.length)
    if (filteredMovies.length >= initialAmountCards) {
      console.log('LoadMoreButtonVisible set true')
      setLoadMoreButtonVisible(true)
    }
    if (filteredMovies.length <= returnedCards.length) {
      console.log('LoadMoreButtonVisible set false', filteredMovies.length,  returnedCards.length)
      setLoadMoreButtonVisible(false)
    }
  }

  function onLoadMoreCards() {
    setReturnedCards(loadingPartialCards(filteredMovies, returnedCards.length + amountCardsForLoad))
  }

  /////////

  const getMoviesFromMoviesApi = () => {
    setIsLoading(true)
    moviesApi.getMovies()
      .then((movies) => {
        console.log('load from Api')
        setMoviesList(movies)
        console.log('set MoviesList')
      })
      .catch(err => console.log(err))
  }

  React.useEffect (() => {
      if(filteredMovies.length !== 0) {
        getMoviesFromMoviesApi()
      } else {
        setIsLoading(false)
      }
  }, [])

  React.useEffect(() => {
    if (moviesList.length > 0) {
      setFilteredMovie(filterCards(moviesList, filterQuery, shortMovieCheckbox))
      console.log('set FilteredMovie')
      setIsLoading(false)
    }
  }, [moviesList])

  React.useEffect(() => {
    if (filteredMovies.length !== 0) {
      setReturnedCards(loadingPartialCards(filteredMovies, initialAmountCards))
      console.log('set Returned Cards with partialCardLoading')
    }
  }, [filteredMovies])

  React.useEffect(() => {
    if (filterQuery !== '') {
      console.log('change filterQuery')
      setFilteredMovie(filterCards(moviesList, filterQuery, shortMovieCheckbox))
      setReturnedCards(loadingPartialCards(filteredMovies, initialAmountCards))
    }
  }, [filterQuery])

  React.useEffect(() => {
    if (filterQuery !== '') {
      console.log('change filterQuery')
      setFilteredMovie(filterCards(moviesList, filterQuery, shortMovieCheckbox))
      setReturnedCards(loadingPartialCards(filteredMovies, initialAmountCards))
    }
  }, [shortMovieCheckbox])

  React.useEffect(() => {
    changeButtonVisible()
  }, [returnedCards])


/////////////////////////////////////////////////////////////////



// const usePartialCardLoading = (cardsArrayForLoad, cardsMustBeLoaded, counter) => {
//   const [arrayOfCards, setArrayOfCards] = React.useState(cardsArrayForLoad)
//   const [returnedArrayOfCard, setReturnedArrayOfCard] = React.useState([])
//   const [counterOfReturnedCard, setCounterOfReturnedCard] = React.useState(counter)

//   const cardHandling = () => {
//     if (arrayOfCards.length <= cardsMustBeLoaded) {
//       setCounterOfReturnedCard(arrayOfCards.length)
//       setReturnedArrayOfCard(arrayOfCards)
//     } else {
//       setReturnedArrayOfCard(arrayOfCards.slice(counterOfReturnedCard, counterOfReturnedCard + cardsMustBeLoaded))
//       setCounterOfReturnedCard(cardsMustBeLoaded)
//     }
//   }

//   React.useEffect(() => {
//     cardHandling()
//   }, [arrayOfCards, counterOfReturnedCard])

//   return [returnedArrayOfCard, setArrayOfCards, setCounterOfReturnedCard]
// }



// const usePartialCardLoading = (cardsArrayForLoad, cardsMustBeLoaded) => {
//   const [arrayOfCards, setArrayOfCards] = React.useState(cardsArrayForLoad)
//   const [counterOfReturnedCard, setCounterOfReturnedCard] = React.useState(cardsMustBeLoaded)
//   const [returnedArrayOfCard, setReturnedArrayOfCard] = React.useState([])
  
//   const cardHandling = () => {
//     if (arrayOfCards.length <= counterOfReturnedCard) {
//       // setCounterOfReturnedCard(arrayOfCards.length)
//       setReturnedArrayOfCard(arrayOfCards)
//     } else {
//       setReturnedArrayOfCard(arrayOfCards.slice(0, counterOfReturnedCard))
//       // setCounterOfReturnedCard(cardsMustBeLoaded)
//     }
//   }

//   React.useEffect(() => {
//     cardHandling()
//   }, [arrayOfCards, counterOfReturnedCard])

//   return [returnedArrayOfCard, setCounterOfReturnedCard, setArrayOfCards]
// }

// const [returnedArrayOfCard, setCounterOfReturnedCard, setArrayOfCards] = usePartialCardLoading(filteredMovies, initialAmountCards)



/////////////////////////////////////////////////////////////////

  

  const handleFilterQueryChange = (query) => {
    setFilterQuery(query)
    if (!filterQuery && moviesList.length === 0) {
      getMoviesFromMoviesApi()
    }
  }

  const handleFilterDurationChange = () => {
    setShortMovieCheckbox(!shortMovieCheckbox)
  }

  

  // const handleLoadMoreButtonClick = () => {
  //   console.log('click')
  //   setCounterOfReturnedCard(returnedArrayOfCard.length + amountCardsForLoad)
  // }
  
  // const onLoadMoreButtonVisible = () => {
  //   // console.log(filteredMovies.length > initialAmountCards)
  //   console.log(loadMoreButtonVisible)
  //   if (filteredMovies.length > initialAmountCards) {
  //     setLoadMoreButtonVisible(true)
  //   }
  //   if (filteredMovies.length <= returnedArrayOfCard) {
  //     setLoadMoreButtonVisible(false)
  //   }
  // }

  

  

  // React.useEffect(() => {
  //   if (filterQuery) {
  //     setFilteredMovie(filterMovies(moviesList, filterQuery, shortMovieCheckbox))
  //     // onLoadMoreButtonVisible()
  //   }
  // }, [filterQuery, shortMovieCheckbox])

  

/////////////////////////////////////////////////////////////////



  /////////////////////////////////////////////////////////////////

  // React.useEffect(() => {
  //   setArrayForFiltering(moviesList)
  // }, [moviesList])

  // React.useEffect(() => {
  //   setFilteredMovie(filteredArray)
  // }, [filteredArray])

  // React.useEffect(() => {
  //   setFilteredQueryField('nameRU')
  //   setFilteredDurationField('duration')
  //   setFilterQueryValue(filterQuery)
  //   if (moviesList.length === 0 & filterQuery !== '') {
  //     getMoviesFromMoviesApi()
  //   }
  // }, [filterQuery])

  // React.useEffect(() => {
  //   if (shortMovieCheckbox) {
  //     setFilterDurationValue(40)
  //   } else {
  //     setFilterDurationValue(0)
  //   }
  // }, [shortMovieCheckbox])


  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='dark' />
      <SearchForm
        onFilterQueryChange={handleFilterQueryChange}
        // onFilterQueryChange={setFilterQuery}
        filterQueryValue={filterQuery}
        isLoading={isLoading}
        onMovieCheckboxChange={handleFilterDurationChange}
        // onMovieCheckboxChange={setShortMovieCheckbox}
        shortMovieCheckboxChecked={shortMovieCheckbox}
      />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList 
          onLoadMoreButtonClick={onLoadMoreCards}
          loadMoreButtonVisible={loadMoreButtonVisible}
        >
          {/* {returnedArrayOfCard && returnedArrayOfCard.map((movie) => { */}
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
      {/* {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList isLoading={isLoading}>
          {filteredMovies && filteredMovies.map((movie) => {
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
      } */}
      
      <Footer />
    </>
  );
};

export default Movies;
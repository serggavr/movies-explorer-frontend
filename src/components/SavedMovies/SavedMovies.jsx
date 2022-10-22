import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const SavedMovies = ({
  handleOpenBurgerMenu
}) => {
  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='dark' />
      <SearchForm />
      <MoviesCardList onSavedMoviesPage={true}>
        <MoviesCard saved={true} onSavedMoviesPage={true} />
        <MoviesCard saved={true} onSavedMoviesPage={true} />
        {/* <MoviesCard saved={true} onSavedMoviesPage={true} /> */}
      </MoviesCardList>
      <Footer />
    </>
  );
};

export default SavedMovies;
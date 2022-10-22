import React from 'react';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';

const Movies = ({
  handleOpenBurgerMenu
}) => {
  return (
    <>
      <Header loggedIn={true} handleOpenBurgerMenu={handleOpenBurgerMenu} theme='dark' />
      <SearchForm />
      <MoviesCardList>
        <MoviesCard saved={true} nameRU='33 слова о дизайне'/>
        <MoviesCard saved={true} />
        <MoviesCard saved={true} />
        <MoviesCard />
        <MoviesCard saved={true} nameRU='Gimme Danger: История Игги и The Stooges'/>
      </MoviesCardList>
      <Footer />
    </>
  );
};

export default Movies;
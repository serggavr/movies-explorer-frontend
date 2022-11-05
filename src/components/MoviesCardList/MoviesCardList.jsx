import React from 'react';

import './MoviesCardList.css'
import Section from '../Section/Section';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const MoviesCardList = ({
  children,
  // onSavedMoviesPage,
  onLoadMoreButtonClick,
  loadMoreButtonVisible,
  moviesMessageVisible,
  moviesMessage
}) => {

  return (
    <Section theme='dark' sectionName='card-list'>
      {moviesMessageVisible ? (
        <p className='card-list__no-found'>{moviesMessage}</p>
      ) : (
        <ul className='card-list__film-list'>
        {children}
        {/* <Preloader /> */}
      </ul>
      )}
      
        {loadMoreButtonVisible ? (
        /* {!onSavedMoviesPage ? ( */
        <div className='card-list__footer card-list__footer_with_button'>
          <Button 
            className='button button_placed_card-list' 
            onClick={onLoadMoreButtonClick}
          >Ещё</Button>
        </div>
        ) : (
        <div className='card-list__footer'>
        </div>
        )}
      
    </Section>
  );
};

export default MoviesCardList;
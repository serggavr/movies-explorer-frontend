import React from 'react';

import './MoviesCardList.css'
import Section from '../Section/Section';
import Button from '../Button/Button';

const MoviesCardList = ({
  children,
  onLoadMoreButtonClick,
  loadMoreMoviesButtonVisible,
  moviesMessageVisible,
  moviesMessage,
  apiErrorMessage
}) => {

  return (
    <Section theme='dark' sectionName='card-list'>
      
      {moviesMessageVisible ? (
          <p className='card-list__no-found'>{apiErrorMessage ? apiErrorMessage : moviesMessage}</p>
        ) : (
          <ul className='card-list__film-list'>
          {children}
      </ul>
      )}
      
      {loadMoreMoviesButtonVisible ? (
        <div className='card-list__footer card-list__footer_with_button'>
          <Button 
            className='button button_placed_card-list' 
            onClick={onLoadMoreButtonClick}
          >Ещё</Button>
        </div>
          ) : (
        <div className='card-list__footer' />
      )}
      
    </Section>
  );
};

export default MoviesCardList;
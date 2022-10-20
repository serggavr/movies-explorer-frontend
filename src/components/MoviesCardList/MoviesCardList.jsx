import React from 'react';

import './MoviesCardList.css'
import MoviesCard from '../MoviesCard/MoviesCard';
import Section from '../Section/Section';
import Button from '../Button/Button';

const MoviesCardList = ({
  children,
  onSavedMoviesPage
}) => {

  return (
    <Section theme='dark' sectionName='card-list'>
      <ul className="card-list__film-list">
        {children}
      </ul>
      
        {!onSavedMoviesPage ? (
        <div className="card-list__footer card-list__footer_with_button">
          <Button className="button button_placed_card-list">Ещё</Button>
        </div>
        ) : (
        <div className="card-list__footer">
        </div>
        )}
      
    </Section>
  );
};

export default MoviesCardList;
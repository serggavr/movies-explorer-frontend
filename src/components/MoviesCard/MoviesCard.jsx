import React from 'react';

import './MoviesCard.css'
import Button from '../Button/Button';

const MoviesCard = ({
  onSavedMoviesPage,
  nameRU = 'Роллинг Стоунз» в изгнании',
  duration = 61,
  image = {
    url: 'https://api.nomoreparties.co/uploads/small_stones_in_exile_b2f1b8f4b7.jpeg',
    name: 'stones-in-exile',
  },
  trailerLink = 'https://www.youtube.com/watch?v=UXcqcdYABFw',
  saved
}) => {

  return (
    <li>
      <div className="card">
        <img src={image.url} alt={image.name} className="card__image" onClick={() => console.log(`link to ${trailerLink}`)} />
        <div className="card__title-wrapper">
          <h3 className="card__title">{nameRU}</h3>
          {onSavedMoviesPage ? (
            <Button className={`button button_type_like ${saved && `button_type_like-delete`}`} />
          ) : (
            <Button className={`button button_type_like ${saved && `button_type_like-active`}`} />
          )
          }
          {/* <Button className={`button button_type_like `} /> */}
        </div>
        <p className="card__duration">{`${Math.floor(duration / 60)}ч ${duration % 60}м`}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
import React from 'react';

import './MoviesCard.css'
import { moviesBaseUrl } from '../../utils/constants';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const MoviesCard = ({
  onMovieLike,
  onMovieRemove,
  movie,
  saved = false
}) => {
  const [loaded, setLoaded] = React.useState(false);

    function handleMovieLike() {
      onMovieLike(movie)
    }

    function handleRemoveMovie() {
      onMovieRemove(movie)
    }

  return (
    <li>
      <div className='card'>
        {loaded ? null : ( <Preloader /> ) }
        <img 
          src={`${saved ? movie.image: `${moviesBaseUrl}${movie.image.url}`}`} 
          alt={movie.nameRU}
          className='card__image'
          onClick={() => console.log(`link to ${movie.trailerLink}`)}

          style={loaded ? {} : {display: 'none'}}
          onLoad={() => setLoaded(true)}
        />
        <div className='card__title-wrapper'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          {saved ? (
            <Button
              onClick={handleRemoveMovie}
              className={`button button_type_like ${saved && `button_type_like-delete`}`} 
            />
          ) : (
            <Button
              onClick={handleMovieLike}
              className={`button button_type_like ${saved && `button_type_like-active`}`} 
            />
          )
          }
        </div>
        <p className='card__duration'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
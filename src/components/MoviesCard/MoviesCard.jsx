import React from 'react';

import './MoviesCard.css'
import { moviesBaseUrl } from '../../utils/constants';
import Button from '../Button/Button';
import Preloader from '../Preloader/Preloader';

const MoviesCard = ({
  onMovieLike,
  onMovieDislike,
  onMovieRemove,
  movie,
  saved = false,
  liked = false,
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const [isLiked, setIsLiked] = React.useState(liked)

    function handleMovieLike() {
      onMovieLike(movie)
      .finally(() => {
        setIsLiked(true)
      })
    }

    function handleRemoveMovie() {
      onMovieRemove(movie)
    }

    function handleMovieDislike() {
      onMovieDislike(movie)
      .finally(() => {
        setIsLiked(false)
      })
    }

  return (
    <li>
      <div className='card'>
        {loaded ? null : ( <Preloader /> ) }
        <a 
          href={movie.trailerLink}
          className='card__link'
          target='_blank'
          rel='noreferrer'
        >
          <img 
            src={`${saved ? movie.image: `${moviesBaseUrl}${movie.image.url}`}`} 
            alt={movie.nameRU}
            className='card__image'
            style={loaded ? {} : {display: 'none'}}
            onLoad={() => setLoaded(true)}
          />
        </a>
        <div className='card__title-wrapper'>
          <h3 className='card__title'>{movie.nameRU}</h3>
          {saved ? (
            <Button
              onClick={handleRemoveMovie}
              className={`button button_type_like ${saved && `button_type_like-delete`}`} 
            />
          ) : ( isLiked ? (
              <Button
                onClick={handleMovieDislike}
                className={`button button_type_like ${isLiked && `button_type_like-active`}`}
              />
            ) : (
              <Button
                onClick={handleMovieLike}
                className={`button button_type_like ${isLiked && `button_type_like-active`}`}
              />
            )
            
          )
          }
        </div>
        <p className='card__duration'>{`${Math.floor(movie.duration / 60)}ч ${movie.duration % 60}м`}</p>
      </div>
    </li>
  );
};

export default MoviesCard;
import React from 'react';
import { Route, Switch } from 'react-router';
import disabled from '../../images/disabledflag.svg';
import greenflag from '../../images/grenflag.svg';
import closeButton from '../../images/close-button.svg';

function MoviesCard(props) {

  function handleLike(e) {
    props.onLike(props.movieId, props.mongoId, props.likeStatus)
  }

  function createRightDuration() {
    if (props.duration < 60) {
      return props.duration + ' мин'
    } else if (props.duration % 60 === 0) {
      const newTime = props.duration / 60 + " ч"
      return newTime
    } else {
      const newTime = Math.floor(props.duration / 60) + " ч " + props.duration % 60 + ' мин '
      return newTime
    }
  }
  return (

    <div className='movies__card'>
      <div className='movies__above-picture'>
        <div className='movies__above-picture_text'>
          <h5 className='movies__card-title'>{props.nameRU}</h5>
          <p className='movies__card-duration'>{createRightDuration()}</p>
        </div>
        <button className='movies__above-picture_button' onClick={handleLike}>
          <Switch>
            <Route exact path='/movies'>
              <img alt='Кнопка для сохранения фильма' src={`${props.likeStatus ? greenflag : disabled}`}></img>
            </Route>
            <Route path='/saved-movies'>
              <img alt='Кнопка для удаления фильма фильма' src={closeButton}></img>
            </Route>
          </Switch>

        </button>
      </div>
      <div className='movies__card-picture'>
      <a href={props.trailerLink} target='blank'>
        <img src={props.imageUrl} className='movies__card-picture_image' alt='Картинка фильма'></img>
      </a>
      </div>


    </div>

  )
}
export default MoviesCard;
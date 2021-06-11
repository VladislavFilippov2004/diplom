import React from 'react';
import { Route, Switch } from 'react-router';
import film from '../../images/film.png';
import disabled from '../../images/disabledflag.svg';
import greenflag from '../../images/grenflag.svg';
import closeButton from '../../images/close-button.svg';
import constants from '../../utils/constants.js';

function MoviesCard(props) {

  return (

    <div className='movies__card'>
      <div className='movies__above-picture'>
        <div className='movies__above-picture_text'>
          <h5 className='movies__card-title'>{props.nameRU}</h5>
          <p className='movies__card-duration'>{props.duration}</p>
        </div>
        <button className='movies__above-picture_button' onClick={props.handleLike}>
          <Switch>
            <Route exact path='/movies'>
              <img alt='Кнопка для сохранения фильма' src={`${props.isLiked ? greenflag : disabled}`}></img>
            </Route>
            <Route path='/saved-movies'>
              <img alt='Кнопка для удаления фильма фильма' src={closeButton}></img>
            </Route>
          </Switch>

        </button>
      </div>
      <a href={props.trailerLink} target='blank'>
        <img src={props.imageUrl} className='movies__card-picture' alt='Картинка фильма'></img>
      </a>

    </div>

  )
}
export default MoviesCard;
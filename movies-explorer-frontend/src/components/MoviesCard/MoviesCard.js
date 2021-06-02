import React from 'react';
import { Route, Switch } from 'react-router';
import film from '../../images/film.png';
import disabled from '../../images/disabledflag.svg';
import greenflag from '../../images/grenflag.svg';
import closeButton from '../../images/close-button.svg';
function MoviesCard(props) {
    const [isClicked, setFlagFilm] = React.useState(false);
    function handleFlag() {
        setFlagFilm(!isClicked)
    }
    return (
        <div className='movies__card'>
            <div className='movies__above-picture'>
                <div className='movies__above-picture_text'>
                    <h5 className='movies__card-title'>{props.card.nameRU}</h5>
                    <p className='movies__card-duration'>{props.card.duration}</p>
                </div>
                <button className='movies__above-picture_button' onClick={handleFlag}>
                    <Switch>
                        <Route exact path='/movies'>
                            <img alt='Кнопка для сохранения фильма' src={`${isClicked ? greenflag : disabled}`}></img>
                        </Route>
                        <Route path='/saved-movies'>
                            <img alt='Кнопка для удаления фильма фильма' src={closeButton}></img>
                        </Route>
                    </Switch>

                </button>
            </div>
            <img src={film} className='movies__card-picture' alt='Картинка фильма'></img>

            {/* <Route path='/saved-movies'>
                    <div className='movies__above-picture'>
                        <div className='movies__above-picture_text'>
                            <h5 className='movies__card-title'>{props.savedCard.nameRU}</h5>
                            <p className='movies__card-duration'>{props.savedCard.duration}</p>
                        </div>
                        <button className='movies__above-picture_button'>
                            <img alt='Кнопка для сохранения фильма' src={closeButton}></img>
                        </button>
                    </div>
                    <img src={savedFilm} className='movies__card-picture' alt='Картинка фильма'></img>
                </Route> */}

        </div>

    )
}
export default MoviesCard;
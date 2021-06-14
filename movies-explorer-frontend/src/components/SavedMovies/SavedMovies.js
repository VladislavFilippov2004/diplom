import React, { useEffect } from 'react';
import constants from '../../utils/constants.js';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import Header from '../Header/Header.js';

function SavedMovies(props) {
  const [savedCardsToShow, setSavedCardsToShow] = React.useState([]);

React.useEffect(() => {
  setSavedCardsToShow(props.savedMovies)
}, [props.savedMovies.length])

  function handleSearchInSavedMovies(req, shortSwitchStatus) {
    if (req === '') {
      console.log('if in handleSearch')
    }


    const query = req.toLowerCase();
    let allSavedMovies = [];
    if (props.savedMovies.length !== 0) {
      allSavedMovies = Array.from(props.savedMovies);
      setSavedCardsToShow(props.searchMovies(query, allSavedMovies, shortSwitchStatus))
    }
    else {
      console.log('после удаления прихожу в else')
    }
  };

  return (
    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} BurgerMenu={props.openBurgerMenu}></Header>
      <SearchForm onSearch={handleSearchInSavedMovies}></SearchForm>

      <section id='movies-grid' className={`movies__cards_base-settings movies__cards ${savedCardsToShow.length === 0 ? 'movies__cards_hidden' : ''}`}>
        {savedCardsToShow.map((item) =>
          <MoviesCard key={item._id}
            likeStatus={true}
            onLike={props.onLike}
            handleLike={props.handleLike}
            movieId={item.movieId}
            mongoId={item._id}
            nameRU={item.nameRU}
            duration={item.duration}
            trailerLink={item.trailerLink}
            imageUrl={`${constants.movieImageUrl}${item.image}`} />)}
      </section>
    </div>
  )
}

export default SavedMovies;
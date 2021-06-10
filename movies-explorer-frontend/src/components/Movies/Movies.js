import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCard from '../MoviesCard/MoviesCard.js'
import InitialMovies from '../../utils/movies.js'
import constants from '../../utils/constants.js';

function Movies(props) {

  // const [cards, setCards] = React.useState([]);

  //   React.useEffect(() => {
  //     setCards(InitialMovies);
  //   }, [])

  return (
    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} BurgerMenu={props.openBurgerMenu}></Header>
      <SearchForm></SearchForm>

      <section className='movies__cards'>
        {props.allMovies.map((item) => {
          try {
            return <MoviesCard nameRU={item.nameRU} duration={item.duration} trailerLink={item.trailerLink}
              imageUrl={`${constants.movieImageUrl}${item.image.url}`} />
          }
          catch { return console.log('Сработал catch в Movies.js') }
        })}
      </section>

      <button className='movies__continue-button'>
        Ещё
        </button>
        <Footer></Footer>
    </div>
  )

}
export default Movies;
import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCard from '../MoviesCard/MoviesCard.js'
import InitialMovies from '../../utils/movies.js'
function Movies(props) {
    const [cards, setCards] = React.useState([]);
    React.useEffect(() => {
      setCards(InitialMovies);
    }, [])
    return (
        <div className='movies'>
            <SearchForm></SearchForm>
        <section className='movies__cards'>
        {cards.map((item) =><MoviesCard key={item._id} card={item}/>)} 
        </section>
        <button className='movies__continue-button'>
            Ещё
        </button>
        </div>
    )
}
export default Movies;
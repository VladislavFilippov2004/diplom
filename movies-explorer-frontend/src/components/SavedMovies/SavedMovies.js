import React, { useEffect } from 'react';
import SearchForm from '../SearchForm/SearchForm.js';
import MoviesCard from '../MoviesCard/MoviesCard.js';
import savedInitialCards from '../../utils/savedmovies.js';
function SavedMovies(props) {
    const [savedCards, setCards] = React.useState([]);
    React.useEffect(() => {
        setCards(savedInitialCards);
        console.log(savedInitialCards)
        console.log(savedCards)
      }, [])
    return (
        <div className='movies'>
            <SearchForm></SearchForm>
            <section className='movies__cards'>
        {savedCards.map((item) =><MoviesCard card={item}/>)} 
        </section>
        </div>
    )
}
export default SavedMovies;
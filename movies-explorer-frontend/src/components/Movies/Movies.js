import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCard from '../MoviesCard/MoviesCard.js'
import InitialMovies from '../../utils/movies.js'
import constants from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';
import moviesApiInstance from '../../utils/MoviesApi';

function Movies(props) {

  const [gridStyle, setGridStyle] = React.useState();
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [preloaderState, setPreloaderState] = React.useState(false);

  function defineGridStyle(width) {
    const widthItem = constants.widthModes.find(item => (width >= item.minWidth) && (width < item.maxWidth));
    setGridStyle(widthItem.cssClassName);
  }

  React.useEffect(() => { //определяем необходимый первоначальный стиль css при загрузке страницы
    defineGridStyle(window.innerWidth);
  }, [])

  function callWidthQualifier(evt) {
    const screenWidth = { width: evt.target.innerWidth, time: Date.now() };
    setTimeout(determineWidth, 1500, screenWidth);
  };

  function determineWidth(screenWidth) {
    const timeDif = Date.now() - screenWidth.time;
    if (timeDif > 1000 && screenWidth.width === window.innerWidth) {
      defineGridStyle(screenWidth.width);
    }
  };

  function handleMoviesSearch(req) {

    const query = req.toLowerCase();
    let allMovies = [];

    if (localStorage.getItem('allMovies') !== null) {
      allMovies = Array.from(JSON.parse(localStorage.getItem('allMovies')));
    }

    if (allMovies.length === 0) {
      moviesApiInstance.getMovies()
        .then((res) => {
          localStorage.setItem('allMovies', JSON.stringify(res) )
          filterMovies(query, res)
        })
        .catch((err) => console.log(err))
    } else {
      filterMovies(query, allMovies)
    }
  };

  function filterMovies(query, array) {
    let searchResults = array.filter((item) => {
      try {
        return item.nameRU.toLowerCase().includes(query) || item.nameEN.toLowerCase().includes(query)
      }
      catch {
        return false;
      }
    })
    setCardsToShow(searchResults);
  };

  React.useEffect(() => {
    window.addEventListener('resize', callWidthQualifier); //слушатель на resize с целью получить ширину экрана
    return () => {
      window.removeEventListener('resize', callWidthQualifier);
    }
  });

  return (
    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} BurgerMenu={props.openBurgerMenu}></Header>
      <SearchForm onSearch={handleMoviesSearch}></SearchForm>

      <section id='movies-grid' className={`movies__cards_base-settings ${gridStyle} ${cardsToShow.length === 0 ? 'movies__cards_hidden' : ''}`} >
        {cardsToShow.map((item) => {
          try {
            return <MoviesCard onLike={props.onLike} handleLike={props.handleLike} key={item.id} nameRU={item.nameRU} duration={item.duration} trailerLink={item.trailerLink}
              imageUrl={`${constants.movieImageUrl}${item.image.url}`} />
          }
          catch { }
        })}
      </section>
        {props.isLoading ? <Preloader /> : ''}
      <button className='movies__continue-button'>
        Ещё
        </button>
        <Footer></Footer>
    </div>
  )

}
export default Movies;
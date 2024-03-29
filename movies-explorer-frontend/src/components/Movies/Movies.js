import React from 'react';
import SearchForm from '../SearchForm/SearchForm.js'
import MoviesCard from '../MoviesCard/MoviesCard.js'
import InitialMovies from '../../utils/movies.js'
import constants from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';

function Movies(props) {

  const [gridStyle, setGridStyle] = React.useState();
  const [cardsToShow, setCardsToShow] = React.useState([]);
  let allMovies = [];

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

  React.useEffect(() => {
    window.addEventListener('resize', callWidthQualifier); //слушатель на resize с целью получить ширину экрана
    return () => {
      window.removeEventListener('resize', callWidthQualifier);
    }
  });

  return (
    <div className='movies'>
      <SearchForm cardsToShow={cardsToShow} />
      <Preloader className={`${cardsToShow.length === 0 ? 'preloader_hidden' : ''}`} />

      <section id='movies-grid' className={`movies__cards_base-settings ${gridStyle} ${cardsToShow.length === 0 ? 'movies__cards_hidden' : ''}`} >
        {cardsToShow.map((item) => {
          try {
            return <MoviesCard nameRU={item.nameRU} duration={item.duration} trailerLink={item.trailerLink}
              imageUrl={`${constants.movieImageUrl}${item.image.url}`} />
          }
          catch { }
        })}
      </section>

      <button className='movies__continue-button'>
        Ещё
        </button>
    </div>
  )

}
export default Movies;
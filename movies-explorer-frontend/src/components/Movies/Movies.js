import React from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import SearchForm from '../SearchForm/SearchForm.js'
import Header from '../Header/Header.js';
import Footer from '../Footer/Footer.js';
import MoviesCard from '../MoviesCard/MoviesCard.js'
import constants from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';
import moviesApiInstance from '../../utils/MoviesApi';

function Movies(props) {
  const currentUser = React.useContext(CurrentUserContext)
  const [cardsToShow, setCardsToShow] = React.useState([]);
  const [preloaderState, setPreloaderState] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState([]);
  const [moreButtonState, setMoreButtonState] = React.useState(null)
  const [widthMode, setWidthMode] = React.useState(constants.widthModes[0]);
  const buttonCounter = React.useRef(0);

  function defineGridStyle(width) {
    const windowWidth = constants.widthModes.find(item => (width >= item.minWidth) && (width < item.maxWidth))
    setWidthMode(windowWidth);
  }

  React.useEffect(() => { //определяем необходимый первоначальный стиль css при загрузке страницы
    defineGridStyle(window.innerWidth);
  }, [])

  React.useEffect(() => {
    createCardsToShow(searchResult, widthMode, buttonCounter.current)
  }, [searchResult])

  function callWidthQualifier(evt) {
    const screenWidth = { width: evt.target.innerWidth, time: Date.now() };
    setTimeout(determineWidth, 1500, screenWidth); // встроенная js функция, которая запускает функцию determineWidth через 1500мс с арг screenWidth
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

  function checkInitialArray(arr) {
    let checkedArr = arr.filter((obj) => {
      return constants.keysToCheck.every((key) => {
        return (obj[key] !== '') && (obj[key] !== null) && (obj[key] !== undefined)
      })
    })
    return checkedArr
  }

  function handleMoviesSearch(req, shortSwitchStatus) {
    if (req === '') {
      return
    }

    buttonCounter.current = 0;
    const query = req.toLowerCase();
    let allMovies = [];

    if (localStorage.getItem('allMovies') !== null) {
      allMovies = Array.from(JSON.parse(localStorage.getItem('allMovies')));
      setSearchResult(props.searchMovies(query, allMovies, shortSwitchStatus))
      createCardsToShow(searchResult, widthMode, 0)
    } else {
      moviesApiInstance.getMovies()
      setPreloaderState(true)
        .then((res) => {
          const checkedArr = checkInitialArray(res)
          localStorage.setItem('allMovies', JSON.stringify(checkedArr))
          setSearchResult(props.searchMovies(query, checkedArr, shortSwitchStatus))
          createCardsToShow(searchResult, widthMode, 0)
        })
        .catch((err) => console.log(err))
        .finally(() => {
          setPreloaderState(false)
        })
    }
  };

  function createCardsToShow(searchResultArr, widthModeStatus, counter) {
    const numberOfCards = widthModeStatus.cardsInRow * widthModeStatus.numberOfRows +
    counter * widthModeStatus.addCards;
    const sliceResultArr = searchResultArr.slice(0, numberOfCards)
    setCardsToShow(sliceResultArr)
    setMoreButtonState(numberOfCards < searchResultArr.length ? true : false)
  }

  function handleCounter() {
    buttonCounter.current++
    createCardsToShow(searchResult, widthMode, buttonCounter.current)
  }

  return (

    <div className='movies'>
      <Header isLoggedIn={props.isLoggedIn} BurgerMenu={props.openBurgerMenu}></Header>
      <SearchForm onSearch={handleMoviesSearch}></SearchForm>

      <section id='movies-grid' className={`movies__cards_base-settings ${widthMode.cssClassName} ${cardsToShow.length === 0 ? 'movies__cards_hidden' : ''}`} >
        {cardsToShow.map((item) => {
          const likeStatus = props.savedMovies.some((obj) => {
            return `${obj.movieId}${obj.owner}` === `${item.id}${currentUser._id}`
          })

          let objWithMongoId = {}

          if (props.savedMovies.length === 0) {
            objWithMongoId = {
              _id: '',
            }
          } else {
            objWithMongoId = props.savedMovies.find((obj) => obj.movieId === item.id)
            if (objWithMongoId === undefined) {
              objWithMongoId = { _id: ''}
            }
          }

          try {
            return  <MoviesCard
              key={item.id}
              likeStatus={likeStatus}
              onLike={props.onLike}
              handleLike={props.handleLike}
              movieId={item.id}
              mongoId={objWithMongoId._id}
              nameRU={item.nameRU}
              duration={item.duration}
              trailerLink={item.trailerLink}
              country = {item.country}
              imageUrl={`${constants.movieImageUrl}${item.image.url}`} />
          }
          catch (err) { console.log(err)}
        })}
      </section>
      {preloaderState ? <Preloader /> : ''}
      <button className={`movies__continue-button ${moreButtonState ? '' : 'movies__continue-button_hidden'}`} onClick={handleCounter}>
        Ещё
      </button>
      <Footer></Footer>
    </div>
  )

}
export default Movies;
import React from 'react';
import checkbox from '../../images/smalltumb.svg'
import disabledbox from '../../images/short-film-off.svg'
import magnifier from '../../images/magnifier.svg'
import moviesApiInstance from '../../utils/MoviesApi';

function SearchForm(props) {

  const [findButtonWasClicked, setFindButtonWasClicked] = React.useState(false);
  const [shortSwitchState, setShortSwitchState] = React.useState(false);
  const [allMovies, setAllMovies] = React.useState([]);
  const inputRef = React.useRef('');

    function reverseShortSwitchState() {
        setShortSwitchState(!shortSwitchState)
    }

  function handleMoviesSearch(evt) {
    evt.preventDefault();
    setFindButtonWasClicked(true);
    console.log('findButtonWasClicked', findButtonWasClicked)
    console.log('inputRef', inputRef.current.value)
    const query = inputRef.current.value.toLowerCase();
    console.log('query', query);

    if (!findButtonWasClicked) {
      moviesApiInstance.getMovies()
        .then((res) => {
          setAllMovies(Array.from(res));
          console.log(allMovies);
        })
        .then(() => filterMovies(query))
        .catch ((err) => console.log(err))
        .finally(() => console.log('allMovies в finally', allMovies));
    } else {
      filterMovies(query)
    }
  };

  function filterMovies(query) {
    let searchResults = allMovies.filter((item) => {
      try {
        return item.nameRU.toLowerCase().includes(query) || item.nameEN.toLowerCase().includes(query)
      }
      catch {
        return false;
      }
    })
    console.log('searchResults', searchResults);
  };

    return (
        <form className='search-form'>
            <div className='search-form__content'>
                <button className='search-form__button-magnifier'>
                    <img src={magnifier} alt='кнопка поиска'></img>
                </button>
          <input name='searchReqField' className='search-form__input' placeholder='Фильм' ref={inputRef}></input>
                <button className='search-form__button-find' onClick={handleMoviesSearch} >Найти</button>
            </div>
            <div className='search-form__checkbox'>
                <button className='search-form__checkbox_button' onClick={reverseShortSwitchState}><img className='search-form__checkbox_picture' src={`${shortSwitchState ? checkbox : disabledbox}`} alt='Картинка для регулирования поиска'></img></button>
                <p className='search-form__checkbox_text'>Короткометражки</p>
            </div>
        </form>

    )
}
export default SearchForm;
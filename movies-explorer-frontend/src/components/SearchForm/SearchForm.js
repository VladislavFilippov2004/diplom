import React from 'react';
import checkbox from '../../images/smalltumb.svg'
import disabledbox from '../../images/short-film-off.svg'
import magnifier from '../../images/magnifier.svg'

function SearchForm(props) {

  const [shortSwitchState, setShortSwitchState] = React.useState(false);
  const inputRef = React.useRef('');

  function handleShortSwitchClick(evt) {
    evt.preventDefault();
    setShortSwitchState(!shortSwitchState)
    props.onSearch(inputRef.current.value, shortSwitchState)
  }

  function handleSearch(evt) {
    evt.preventDefault();
    props.onSearch(inputRef.current.value, shortSwitchState);
  }
  // React.useEffect(() => {
  //   props.onSearch(inputRef.current.value, shortSwitchState)
  // }, [shortSwitchState])

  return (
    <form className='search-form'>
      <div className='search-form__content'>
        <button className='search-form__button-magnifier'>
          <img src={magnifier} alt='кнопка поиска'></img>
        </button>
        <input name='searchReqField' className='search-form__input' placeholder='Фильм' ref={inputRef}></input>
        <button className='search-form__button-find' onClick={handleSearch} >Найти</button>
      </div>
      <div className='search-form__checkbox'>
        <button className='search-form__checkbox_button' onClick={handleShortSwitchClick}><img className='search-form__checkbox_picture' src={`${shortSwitchState ? checkbox : disabledbox}`} alt='Картинка для регулирования поиска'></img></button>
        <p className='search-form__checkbox_text'>Короткометражки</p>
      </div>
    </form>

  )
}
export default SearchForm;
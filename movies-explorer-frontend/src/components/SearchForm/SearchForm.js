import React from 'react';
import checkbox from '../../images/smalltumb.svg'
import disabledbox from '../../images/short-film-off.svg'
import magnifier from '../../images/magnifier.svg'

    
function SearchForm() {
    const [isClicked, setCheckbox] = React.useState(false);
    function handleCheckbox() {
        setCheckbox(!isClicked)
    }
    return (
        <form className='search-form'>
            <div className='search-form__content'>
                <button className='search-form__button-magnifier'>
                    <img src={magnifier} alt='кнопка поиска'></img>
                </button>
                <input className='search-form__input' placeholder='Фильм' required></input>
                <button className='search-form__button-find'>Найти</button>
            </div>
            <div className='search-form__checkbox'>
                <button className='search-form__checkbox_button' onClick={handleCheckbox}><img className='search-form__checkbox_picture' src={`${isClicked ? checkbox : disabledbox}`} alt='Картинка для регулирования поиска'></img></button>
                <p className='search-form__checkbox_text'>Короткометражки</p>
            </div>
        </form>
        
    )
}
export default SearchForm;
import closeButton from '../../images/close-burger.svg'
import account from '../../images/icon.svg';
import { NavLink } from 'react-router-dom';
function BurgerMenu(props) {
    return (
        <div className={`burger-menu ${props.isOpen ? 'burger-menu_open' : ''}`}>
            <div className='burger-menu__content'>
                <button className='burger-menu__close-button' onClick={props.onClose}>
                    <img alt='Кнопка закрыть' src={closeButton}></img>
                </button>
                <nav className='burger-menu__links'>
                    <NavLink exact to='/' className='burger-menu__link' activeClassName='burger-menu__link_active'>Главная</NavLink>
                    <NavLink to='/movies' className='burger-menu__link' activeClassName='burger-menu__link_active'>Фильмы</NavLink>
                    <NavLink to='/saved-movies' className='burger-menu__link' activeClassName='burger-menu__link_active'>Сохранённые фильмы</NavLink>
                    <div className='header__profile-links_account burger-menu__account'>
                        <NavLink className='header__link_films burger-menu__account-text' to='/profile'>Аккаунт</NavLink>
                        <NavLink className='header__link_picture' to='/profile'><img src={account} alt='Картинка аккаунта'></img></NavLink>
                    </div>
                </nav>
            </div>
        </div>
    )
}
export default BurgerMenu;
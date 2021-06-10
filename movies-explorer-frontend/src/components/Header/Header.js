import { Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import logo from '../../images/logo.svg';
import account from '../../images/icon.svg';
import options from '../../images/options.svg'
function Header(props) {

  if (props.isLoggedIn) {
    return (
      <header className='header'>
        <a href='/' className='header__logo'>
          <img className='header__logo' src={logo} alt='Плохое соединение с интернетом' />
        </a>
        <nav className='header__links'>
          <div className='header__profile-links'>
            <NavLink className='header__link_films' to='/movies'>Фильмы</NavLink>
            <NavLink className='header__link_films' to='/saved-movies'>Сохранённые фильмы</NavLink>
            <div className='header__profile-links_account'>
              <NavLink className='header__link_films' to='/profile'>Аккаунт</NavLink>
              <NavLink className='header__link_picture' to='/profile'><img src={account} alt='Картинка аккаунта'></img></NavLink>
            </div>
            <button className='header__profile-links_options' onClick={props.BurgerMenu}>
              <img className='header__profile-links_options-picture' src={options} alt='меню опций'></img>
            </button>
          </div>
        </nav>
      </header>
    )
  }
  return (
    <header className='header'>
      <a href='/' className='header__logo'>
        <img className='header__logo' src={logo} alt='Плохое соединение с интернетом' />
      </a>
      <nav className='header__links'>
        <>
          <NavLink className='header__link' to='/signup'>Регистрация</NavLink>
          <div className='header__green-box'>
            <NavLink className='header__link' to='/signin'>Войти</NavLink>
          </div>
        </>
      </nav>
    </header>
  )
}
export default Header;

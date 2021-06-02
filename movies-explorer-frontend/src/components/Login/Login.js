import logo from '../../images/logo.svg';
function Login() {
    return (
        <div className='reg-log'>
            <div className='reg-log__content'>
            <div className='reg-log__top'>
                <img className='header__logo' src={logo} alt='Плохое соединение с интернетом' />
                <h2 className='reg-log__title'>Рады видеть!</h2>
            </div>
            <form className='reg-log__form'>
                <p className='reg-log__form_subtitle'>E-mail</p>
                <input className='reg-log__form_input'></input>
                <p className='reg-log__form_subtitle'>Пароль</p>
                <input className='reg-log__form_input' type='password'></input>
                <button className='reg-log__button'>Войти</button>
                <div className='reg-log__navigation'>
                    <p className='reg-log__text'>Ещё не зарегистрированы?</p>
                    <a href='/signup' className='reg-log__link'>Регистрация</a>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Login;
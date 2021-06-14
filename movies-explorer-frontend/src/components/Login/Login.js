import React from 'react';
import { NavLink} from 'react-router-dom';
import useForm from '../../utils/useForm.js';
import logo from '../../images/logo.svg';

function Login(props) {

    const {values, handleChange, errors, isValid} = useForm();
    function handleSubmit(e) {
      e.preventDefault()
      props.onLogin(values.email, values.password)
  }
    return (
        <div className='reg-log'>
            <div className='reg-log__content'>
            <div className='reg-log__top'>
                <img className='header__logo' src={logo} alt='Плохое соединение с интернетом' />
                <h2 className='reg-log__title'>Рады видеть!</h2>
            </div>
            <form className='reg-log__form' onSubmit={handleSubmit}>
                <p className='reg-log__form_subtitle'>E-mail</p>
                <input name='email' value={values.email || ''} onChange={handleChange} className='reg-log__form_input' pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" required ></input>
                <p className='reg-log__validation-text'>{errors.email}</p>
                <p className='reg-log__form_subtitle'>Пароль</p>
                <input name='password' value={values.password || ''} onChange={handleChange} className='reg-log__form_input' type='password' required></input>
                <p className='reg-log__validation-text'>{errors.password}</p>
                <button disabled={!isValid} className={`${isValid ? 'reg-log__button' : 'reg-log__button_disabled'}`} >Войти</button>
                {props.isSuccess ? <p className='reg-log__validation-text'>Проверьте правильность введённых данных. Авторизация провалена.</p> : ''}
                <div className='reg-log__navigation'>
                    <p className='reg-log__text'>Ещё не зарегистрированы?</p>
                    <NavLink className='reg-log__link' to='/signup'>Регистрация</NavLink>
                </div>
            </form>
            </div>
        </div>
    )
}
export default Login;
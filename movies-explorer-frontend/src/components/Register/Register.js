import React from 'react';
import {NavLink} from 'react-router-dom';
import useForm from '../../utils/useForm.js';
import logo from '../../images/logo.svg';
function Register(props) {
  const {values, handleChange, errors, isValid} = useForm();

    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(values.emailRegister, values.passwordRegister, values.name)
    }

    return (
        <div className='reg-log'>
        <div className='reg-log__content'>
            <div className='reg-log__top'>
                <img className='header__logo' src={logo} alt='Плохое соединение с интернетом' />
                <h2 className='reg-log__title'>Добро пожаловать!</h2>
            </div>
            <form className='reg-log__form' onSubmit={handleSubmit}>
                <p className='reg-log__form_subtitle'>Имя</p>
                <input name='name' value={values.name || ''} onChange={handleChange} className='reg-log__form_input' type='text' required pattern="[^0-9]+"></input>
                <p className='reg-log__validation-text'>{errors.name}</p>
                <p className='reg-log__form_subtitle'>E-mail</p>
                <input name='emailRegister' className='reg-log__form_input' pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$" value={values.emailRegister || ''} onChange={handleChange}  required></input>
                <p className='reg-log__validation-text'>{errors.emailRegister}</p>
                <p className='reg-log__form_subtitle'>Пароль</p>
                <input name='passwordRegister' className='reg-log__form_input' value={values.passwordRegister || ''}  onChange={handleChange} type='password' required></input>
                <p className='reg-log__validation-text'>{errors.passwordRegister}</p>
                <button disabled={!isValid} className={`${isValid ? 'reg-log__button' : 'reg-log__button_disabled'}`}>Зарегистрироваться</button>
                <div className='reg-log__navigation'>
                    <p className='reg-log__text'>Уже зарегистрированы?</p>
                    <NavLink className='reg-log__link' to='/signin'>Войти</NavLink>
                </div>
            </form>
        </div>
    </div>
    )

}
export default Register;
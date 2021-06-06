import React from 'react';
import logo from '../../images/logo.svg';
function Register(props) {
    const [email, setEmail] = React.useState();
    const [password, setPassword] = React.useState();
    const [name, setName] = React.useState()

    function onEmailChange(e) {
        setEmail(e.target.value)
    }

    function onPasswordChange(e) {
        setPassword(e.target.value)
    }
    function onNameChange(e) {
        setName(e.target.value)
    }
    function handleSubmit(e) {
        e.preventDefault();
        props.onRegister(email, password, name)
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
                <input value={name || ''} onChange={onNameChange} className='reg-log__form_input'></input>
                <p className='reg-log__form_subtitle'>E-mail</p>
                <input className='reg-log__form_input' onChange={onEmailChange}></input>
                <p className='reg-log__form_subtitle'>Пароль</p>
                <input className='reg-log__form_input' onChange={onPasswordChange}></input>
                <button className='reg-log__button'>Зарегистрироваться</button>
                <div className='reg-log__navigation'>
                    <p className='reg-log__text'>Уже зарегистрированы?</p>
                    <a href='/signin' className='reg-log__link'>Войти</a>
                </div>
            </form>
        </div>
    </div>
    )

}
export default Register;
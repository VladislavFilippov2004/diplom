import React from 'react'
import useForm from '../../utils/useForm.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js'
import Header from '../Header/Header.js';

function Profile(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const {values, handleChange, errors, isValid, setValues} = useForm();
  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
        name: values.name,
        email: values.email
      });
}
React.useEffect(() => {// хук, который задаёт значения полям с помощью контекста
  setValues({name: currentUser.name,
  email: currentUser.email})
}, [currentUser]);

  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} BurgerMenu={props.openBurgerMenu}></Header>
    <div className='profile'>
      <h2 className='profile__title'>{`Привет, ${currentUser.name}!`}</h2>
      <form className='profile__form' onSubmit={handleSubmit}>
        <div className='profile__form_box'>
          <p className='profile__form_subtitle'>Имя </p>
          <input name="name" value={values.name || '' } onChange={handleChange} className='profile__form_input' required pattern="[^0-9]+"></input>
        </div>
          <p className='reg-log__validation-text'>{errors.name}</p>
        <div className='profile__form_box'>
          <p className='profile__form_subtitle'>Почта </p>
          <input name="email" value={values.email || ''} onChange={handleChange} className='profile__form_input' required pattern="^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$"></input>
        </div>
          <p className='reg-log__validation-text'>{errors.email}</p>
      </form>
      <button disabled={!isValid} onClick={handleSubmit} className='profile__edit-button' >
        Редактировать
                </button>
      <button className='profile__exit-button' onClick={props.signOut}>
        Выйти из аккаунта
                </button>
    </div>
</>
  )
}
export default Profile;
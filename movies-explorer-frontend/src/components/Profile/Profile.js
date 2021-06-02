function Profile() {
    return (
        <div className='profile'>
            <h2 className='profile__title'>Привет, Виталий!</h2>
            <form className='profile__form'>
                <div className='profile__form_box'>
                    <p className='profile__form_subtitle'>Имя </p>
                    <input className='profile__form_input'></input>
                </div>
                <div className='profile__form_box'>
                    <p className='profile__form_subtitle'>Почта </p>
                    <input type="email" className='profile__form_input'></input>
                </div>
            </form>
            <button className='profile__edit-button'>
                Редактировать
                </button>
            <button className='profile__exit-button'>
                Выйти из аккаунта
                </button>
        </div>

    )
}
export default Profile;
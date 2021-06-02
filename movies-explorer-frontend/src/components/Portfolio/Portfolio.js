import selphie from '../../images/selphie.png';
import arrow from '../../images/arrow.svg';
function Portfolio() {
    return (
        <div className='portfolio'>
            <div className='main__subtitle' id='student'>
                Студент
            </div>
            <div className='portfolio__personal-info'>
                <div className='portfolio__personal-info_text-content'>
                    <h3 className='portfolio__personal-info_name'>Владислав Филиппов</h3>
                    <h5 className='portfolio__personal-info_age'>Фронтенд-разработчик, 16 лет</h5>
                    <p className='main__description-text portfolio__personal-info_hobbies'>Я родился и живу в Москве, учусь в 10 классе школы 1234.  Я люблю играть в футбол и компьютерные игры, а ещё люблю смотреть кино. Недавно начал кодить.После окончания курса хотел бы найти работу в сфере web-разработки.</p>
                    <div className='portfolio__personal-info_social-network'>
                        <a href='https://instagram.com/vvfwf?utm_medium=copy_link' target="_blank" className='main__description-text'>Instagram</a>
                        <a href='https://github.com/VladislavFilippov2004' target="_blank" className='main__description-text'>Github</a>
                    </div>
                </div>
                <img className='portfolio__personal-info_picture' alt='Фото создателя сайта' src={selphie}></img>
            </div>
            <div className='portfolio__works'>
                <h4 className='portfolio__works_title'>Портфолио</h4>
                <div className='main__subtitle portfolio__works_example'>
                  Статичный сайт
                <a href='https://github.com/yandex-praktikum/how-to-learn.git' className='portfolio__works_link' target='__blank'><img src={arrow} alt='Ссылка на проект'></img></a>
                </div>
                <div className='main__subtitle portfolio__works_example'>
                Адаптивный сайт
                <a href='https://github.com/VladislavFilippov2004/russian-travel.git' className='portfolio__works_link' target='__blank'><img src={arrow} alt='Ссылка на проект'></img></a>
                </div>
                <div className='main__subtitle portfolio__works_example'>
                Одностраничное приложение
                <a href='https://mesto-vf.nomoredomains.icu/' className='portfolio__works_link' target='__blank'><img src={arrow} alt='Ссылка на проект'></img></a>
                </div>
            </div>

        </div>
    )
}
export default Portfolio;
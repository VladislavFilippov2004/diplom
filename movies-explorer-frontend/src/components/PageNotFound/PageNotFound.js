import {useHistory} from 'react-router-dom'
function PageNotFound() {
    const history = useHistory();
    return (
        <div className='page-not-found'>
            <h2 className='page-not-found__title'>404</h2>
            <h4 className='page-not-found__subtitle'>Страница не найдена</h4>
            <button className="page-not-found__button" onClick={() => history.goBack()}>Назад</button>
        </div>
    )
}
export default PageNotFound;
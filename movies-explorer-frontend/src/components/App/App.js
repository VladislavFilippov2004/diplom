import React from 'react';
import { useHistory } from 'react-router-dom'
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import './App.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import Login from '../Login/Login.js';
import Register from '../Register/Register.js';
import Profile from '../Profile/Profile.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import BurgerMenu from '../BurgerMenu/BurgerMenu.js';
import PageNotFound from '../PageNotFound/PageNotFound.js';
import InfoToolTip from '../InfoToolTip/InfoToolTip.js';
import auth from '../../utils/auth.js';
import mainApiInstance from '../../utils/MainApi.js';
import '../../index.css';
import { Route, Switch } from 'react-router';
import constants from '../../utils/constants.js';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isBurgerMenuOpen, setBurgerMenu] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [loginFailed, setLoginFailed] = React.useState(false)
  const [preloaderState, setPreloaderState] = React.useState(false)
  const [isLoadingError, setIsLoadingError] = React.useState('')
 const [savedMoviesArr, setSavedMoviesArr] = React.useState([]);

 React.useEffect(() => {
   checkToken()
 }, [])

  React.useEffect(() => {
    setPreloaderState(true)
    if (isLoggedIn === true) {
      mainApiInstance.getUserInformation()
        .then((res) => {
          setCurrentUser(res)
        })
        .catch((err) => {
          setIsLoadingError(err)
        })
        .finally(() => {
          setPreloaderState(false)
        })
    } else {
      console.log('isLogged is false App.js')
    }

  }, [isLoggedIn])


  React.useEffect(() => {
    if (currentUser._id !== null){
      mainApiInstance.getSavedMovies()
      .then((res) => {
        const initSavedMovies = res.filter((item) =>
           item.owner === currentUser._id
        );
        setSavedMoviesArr(initSavedMovies)
      })
    } else {
      console.log('currentUser не прошёл проверку')
    }
  }, [currentUser])


  function handleBurgerMenu() {
    setBurgerMenu(true)
  }

  function checkToken() {
    const token = localStorage.getItem('token')
    auth.checkToken(token)
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
          history.push('/movies')
        } else {
          setLoggedIn(false)
          setLoginFailed(true)
        }
      })
  }

  function handleRegister(email, password, name) {
    auth.register(email, password, name)
      .then((res) => {
        try {
          if (res.status === 200) {
            handleLogin(email, password)
          }
          else {
            setIsLoadingError('При регистрации произошла ошибка. Попробуйте ещё раз')
          }
        } catch (err) {
          setIsLoadingError(err)
        }
      })
  }

  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        try {
          if (res.status === 200) {
            setLoginFailed(false)
            return res.json()
          } else {
            setLoginFailed(true)
            return res.json()
          }
        } catch (err) {
          setIsLoadingError(err)
        }
      })
      .then((res) => {
        localStorage.setItem('token', res.token);
        checkToken()
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateUser(data) {
    mainApiInstance.changeUserInformation(data)
      .then((res) => {
        setCurrentUser(res)
        setIsSuccess(true)
        setInfoTooltipPopup(true)
      })
      .catch((err) => {
        setIsSuccess(false)
        setInfoTooltipPopup(true)
      })
  }

  function handleLike(movieId, mongoId, likeStatus) {
    const allMovies = Array.from(JSON.parse(localStorage.getItem('allMovies')));
    const movie = allMovies.find((item) => item.id === movieId)

    if (!likeStatus) {
    mainApiInstance.saveFilm(movie)
      .then((res) => {
        setSavedMoviesArr([res, ...savedMoviesArr])
      })
      .catch((err) => console.log('Ошибка в handleLike',err))
    } else {
      mainApiInstance.deleteFilm(mongoId)
      .then((res) => {
        let array = savedMoviesArr.slice();
       const index = array.findIndex((obj) => {
         return obj._id === mongoId
       })
       array.splice(index, 1)
       setSavedMoviesArr(array)
      })
      .catch((err) => console.log('ошибка в handleDelete',err, 'Пришло в deleteFilm (catch)', mongoId))
    }

  }

  function searchMovies(query, array, shortSwitchStatus, ifSaveToLocalStorage) {
    let searchResults = array.filter((item) => {
      try {
        if (query !== '') {
          return (item.nameRU.toLowerCase().includes(query) || item.nameEN.toLowerCase().includes(query)) &&
          (shortSwitchStatus ? item.duration <= constants.ShortFilmDuration : true);
        } else {
          return shortSwitchStatus ? item.duration <= constants.ShortFilmDuration : true
        }
      }
      catch {
        return false;
      }
    })
    if (ifSaveToLocalStorage === true) {
      localStorage.setItem('savedSearchResult', JSON.stringify(searchResults))
      return searchResults
    } else {
      return searchResults
    }

  };

  function handleSignOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('savedSearchResult')
    setLoggedIn(false)
    history.push('/')
  }

  function closeAllPopups() {
    setBurgerMenu(false);
    setInfoTooltipPopup(false)
  }


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Switch>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn}></Header>
            <Main></Main>
            <Footer></Footer>
          </Route>
          <Route path='/signin'>
            <Login onLogin={handleLogin} isSuccess={loginFailed}></Login>
          </Route>
          <Route path='/signup'>
            <Register onRegister={handleRegister}></Register>
          </Route>
          <ProtectedRoute path='/profile' loggedIn={isLoggedIn} component={Profile}
            onUpdateUser={handleUpdateUser} signOut={handleSignOut} isLoggedIn={true}
          ></ProtectedRoute>
          <ProtectedRoute exact path='/movies' loggedIn={isLoggedIn} component={Movies}
            openBurgerMenu={handleBurgerMenu} searchMovies={searchMovies} isLoggedIn={true} isLoading={preloaderState} onLike={handleLike} savedMovies={savedMoviesArr}>

          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={isLoggedIn} component={SavedMovies}
            openBurgerMenu={handleBurgerMenu} searchMovies={searchMovies} isLoggedIn={true} savedMoviesArr={savedMoviesArr} onLike={handleLike}
          ></ProtectedRoute>

          <Route path='*'>
            <PageNotFound></PageNotFound>
          </Route>

        </Switch>
        <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closeAllPopups}></BurgerMenu>
        <InfoToolTip isOpen={isInfoTooltipPopupOpen} onClose={closeAllPopups} isSuccess={isSuccess} ></InfoToolTip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

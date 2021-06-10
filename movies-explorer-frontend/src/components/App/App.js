import React, { useEffect } from 'react';
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
import api from '../../utils/MainApi.js';
import '../../index.css';
import { Route, Switch } from 'react-router';
import constants from '../../utils/constants';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isBurgerMenuOpen, setBurgerMenu] = React.useState(false);
  const [isLoggedIn, setLoggedIn] = React.useState(false);
  const [isInfoTooltipPopupOpen, setInfoTooltipPopup] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [isSuccessAuth, setIsSuccessAuth] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)
  const [isLoadingError, setIsLoadingError] = React.useState('')

  React.useEffect(() => {
    setIsLoading(true)
    if (isLoggedIn === true) {
      api.getUserInformation()
      .then((res) => {
        setCurrentUser(res)
        console.log(res)
      })
      .catch((err) => {
        console.log('Попало в catch(getUserInfo', err);
        setIsLoadingError(err)
      })
      .finally(() => {
        setIsLoading(false)
      })
    } else {
      console.log('isLogged false App.js')
    }

  }, [isLoggedIn])

  React.useEffect(() => {
    checkToken()
}, [])

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
          setIsSuccessAuth(true)
        }
      })
  }

  function handleRegister(email, password, name) {
    auth.register(email, password, name)
    .then((res) => {
        try {
          console.log(res, 'handleLogin')
          if (res.status === 200) {
            handleLogin(email, password)
          }
          else {
            setIsLoadingError('При регистрации произошла ошибка. Попробуйте ещё раз')
            console.log('Не получилось зарегать', res)
          }
        } catch (err) {
          console.log('Всё прям плохо', err)
          setIsLoadingError(err)
        }
      })
  }
  function handleLogin(email, password) {
    auth.authorize(email, password)
      .then((res) => {
        try {
          if (res.status === 200) {
            console.log('всё хорошо', res)
            setIsSuccessAuth(false)
            return res.json()
          } else {
            setIsSuccessAuth(true)
            return res.json()
          }
        } catch (err) {
          console.log('всё прям плохо', err)
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
    api.changeUserInformation(data)
      .then((res) => {
        setCurrentUser(res)
        setIsSuccess(true)
        setInfoTooltipPopup(true)
      })
      .catch((err) => {
        console.log(err)
        setIsSuccess(false)
        setInfoTooltipPopup(true)
      })
  }
  function handleSignOut() {
    localStorage.removeItem('token');
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
            <Login onLogin={handleLogin} isSuccess={isSuccessAuth}></Login>
          </Route>
          <Route path='/signup'>
            <Register onRegister={handleRegister}></Register>
          </Route>
          <ProtectedRoute path='/profile' loggedIn={isLoggedIn} component={Profile}
          onUpdateUser={handleUpdateUser} signOut={handleSignOut} isLoggedIn={true}
          ></ProtectedRoute>
          <ProtectedRoute exact path='/movies' loggedIn={isLoggedIn} component={Movies}
            openBurgerMenu={handleBurgerMenu} isLoggedIn={true} isLoading={isLoading}>

          </ProtectedRoute>
          <ProtectedRoute path='/saved-movies' loggedIn={isLoggedIn} component={SavedMovies}
          openBurgerMenu={handleBurgerMenu} isLoggedIn={true}
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

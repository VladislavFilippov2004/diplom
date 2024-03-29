import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom'
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
import auth from '../../utils/auth.js';
import '../../index.css';
import { Route, Switch } from 'react-router';
import constants from '../../utils/constants';

function App() {
  const history = useHistory();
  const [currentUser, setCurrentUser] = React.useState({});
  const [isBurgerMenuOpen, setBurgerMenu] = React.useState(false);

  function handleBurgerMenu() {
    setBurgerMenu(true)
  }

  function closeBurgerMenu() {
    setBurgerMenu(false)
  }
  function handleRegister(email, password, name) {
    auth.register(email, password, name )
    .then((res) => {
      try {
        if (res.staus === 200) {
          history.push('/movies')
        }
        else {
          console.log('Не получилось зарегать')
        }
      } catch(err) {
        console.log('Всё прям плохо', err)
      }
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='root'>
        <Switch>
          <Route exact path='/'>
            <Header></Header>
            <Main></Main>
            <Footer></Footer>
          </Route>
          <Route path='/signin'>
            <Login></Login>
          </Route>
          <Route path='/signup'>
            <Register onRegister={handleRegister}></Register>
          </Route>
          <Route path='/profile'>
            <Header></Header>
            <Profile></Profile>
          </Route>
          <Route path='/movies'>
            <Header BurgerMenu={handleBurgerMenu}></Header>
            <Movies />
            <Footer></Footer>
          </Route>

          <Route path='/saved-movies'>
            <Header></Header>
            <SavedMovies></SavedMovies>
            <Footer></Footer>
          </Route>
          <Route path='*'>
            <PageNotFound></PageNotFound>
          </Route>

        </Switch>
        <BurgerMenu isOpen={isBurgerMenuOpen} onClose={closeBurgerMenu}></BurgerMenu>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

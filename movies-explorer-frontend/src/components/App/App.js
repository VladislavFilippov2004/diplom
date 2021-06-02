import React, { useEffect } from 'react';
import './App.css';
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
import '../../index.css';
import { Route, Switch } from 'react-router';

function App() {
  const [isBurgerMenuOpen, setBurgerMenu] = React.useState(false);
  function handleBurgerMenu() {
    setBurgerMenu(true)
  }
  function closeBurgerMenu() {
    setBurgerMenu(false)
  }

  return (
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
         <Register></Register>
        </Route>
        <Route path='/profile'>
        <Header></Header>
        <Profile></Profile>
        </Route>
        <Route path='/movies'>
          <Header BurgerMenu={handleBurgerMenu}></Header>
          <Movies></Movies>
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
  );
}

export default App;

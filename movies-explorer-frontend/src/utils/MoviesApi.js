import constants from './constants.js';

class MoviesApi {
  constructor(moviesUrl) {
    this._moviesUrl = moviesUrl;
  }

  getMovies() {

    return fetch(this._moviesUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Не удалось получить фильмы с сервера: ${res.status}`);
      });
  }
}


const moviesApiInstance = new MoviesApi(constants.moviesUrl);

export default moviesApiInstance;

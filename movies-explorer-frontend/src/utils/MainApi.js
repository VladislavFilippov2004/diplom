import constants from './constants.js';

class MainApi {
  constructor(baseUrl) {
    this._baseUrl = baseUrl
  }
  getUserInformation() {
    return fetch(`${this._baseUrl}/api/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();

        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch((err) => {
        console.log('get into catch ', err)
      })
  }
  changeUserInformation(data) {
    return fetch(`${this._baseUrl}/api/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      'body': JSON.stringify({
        name: data.name,
        email: data.email
      })
    })
      .then(res => {
        console.log(res, 'от changeUserApi')
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err)
      })
  }
  saveFilm(data) {
    return fetch(`${this._baseUrl}/api/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      'body': JSON.stringify({
        country: data.country,
        director: data.director,
        year: data.year,
        duration: data.duration,
        description: data.description,
        image: data.image.url,
        trailer: data.trailerLink,
        thumbnail: data.image.formats.thumbnail.url,
        movieId: data.id,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
      })
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }
  deleteFilm(data) {
    return fetch(`${this._baseUrl}/api/movies/${data}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch(err => {
      console.log(err);
    })
  }
  getSavedMovies() {
    return fetch(`${this._baseUrl}/api/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    })
    .then(res => {
      if (res.status === 200) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    })
    .catch(err => {
      console.log(err)
    })
  }

}

const mainApiInstance = new MainApi(`${constants.BaseUrl}`)
export default mainApiInstance;
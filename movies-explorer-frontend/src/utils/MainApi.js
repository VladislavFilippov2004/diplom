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
        // console.log(res.ok)
        if (res.ok) {
          // console.log(res)
          // console.log(res.json())
          // console.log('попал в if')
          return res.json();

        }
        // console.log('сейчас выдам reject')
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
        console.log(res,'от changeUserApi')
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .catch(err => {
        console.log(err)
      })

  }

}
const api = new MainApi (`${constants.baseUrl}`)
export default api;
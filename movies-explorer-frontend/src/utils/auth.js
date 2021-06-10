import constants from './constants.js';

class Auth {
  constructor(base_Url) {
    this._base_Url = base_Url
  }
  register = (email, password, name) => {
    return fetch(`${this._base_Url}/api/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
        name: name
      })
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  authorize = (email, password) => {
    return fetch(`${this._base_Url}/api/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
      .then((res) => {
        return res
      })
      .catch((err) => {
        return err
      })
  }
  checkToken(token) {
    return fetch(`${this._base_Url}/api/users/me`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
    })
      .then((res) => {
        console.log('checkToken auth response', res)
        return res
      })
      .catch((err) => console.log('Ошибка.', err))
  }
}
const auth = new Auth(`${constants.baseUrl}`)
export default auth;
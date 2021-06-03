import constants from './constants.js';

class Auth {
    constructor(base_Url) {
        this._base_Url = base_Url
    }
    register = (email, password, name) => {
        return fetch (`${this._base_Url}/signup`, {
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
}
const auth = new Auth(`${constants.baseUrl}`)
export default auth;
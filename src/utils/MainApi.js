// https://nomore.nomoredomains.icu/api/ 

import { mainApiUrl } from './constants'
import { moviesBaseUrl } from './constants';

class nomoredomainsApi {
  constructor({
    moviesBaseUrl,
    baseUrl,
    headers
  }) {
    this._headers = headers
    this._baseUrl = baseUrl
    this._moviesBaseUrl = moviesBaseUrl
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  signUp({
    name,
    email,
    password
  }) {
    return fetch(`${this._baseUrl}/signup`, {
      credentials: 'include',
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "name": name,
          "password": password,
          "email": email
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  signIn({
    email,
    password
  }) {
    return fetch(`${this._baseUrl}/signin`, {
        credentials: 'include',
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          "password": password,
          "email": email
        })
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  getUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  authWithToken() {
    return fetch(`${this._baseUrl}/users/me`, {
        credentials: 'include',
        method: 'GET',
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  addMovieToSavedMoviesList({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    id,
    nameRU,
    nameEN,
  }) {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
          country: country,
          director: director,
          duration: duration,
          year: year,
          description: description,
          image: `${this._moviesBaseUrl}${image.url}`,
          trailerLink: trailerLink,
          thumbnail: `${this._moviesBaseUrl}${image.url}`,
          movieId: id,
          nameRU: nameRU,
          nameEN: nameEN
      })
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  getSavedMoviesList() {
    return fetch(`${this._baseUrl}/movies`, {
      credentials: 'include',
      method: 'GET',
      headers: this._headers
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  deleteMovieFromSavedList(movieId) {
    return fetch(`${this._baseUrl}/movies/${movieId}`, {
      credentials: 'include',
      method: 'DELETE',
      headers: this._headers,
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  changeUserData(
    newName,
    newEmail
  ) {
    return fetch(`${this._baseUrl}/users/me`, {
      credentials: 'include',
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        email: newEmail
      })
    }).then(res => {
      return this._getResponseData(res)
    })
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
        credentials: 'include',
        method: 'POST',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }
}

export const mainApi = new nomoredomainsApi({
  baseUrl: `${mainApiUrl}`,
  moviesBaseUrl: `${moviesBaseUrl}`,
  headers: {
    // authorization: token,
    'Content-Type': 'application/json'
  }
});
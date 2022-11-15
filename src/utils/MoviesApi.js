// https://api.nomoreparties.co/beatfilm-movies 

import { moviesApiUrl } from './constants';

class nomorepartiesApi {
  constructor({
    baseUrl,
    headers
  }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(`${this._baseUrl}`, {
        // credentials: 'include',
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res);
      })
  }
}

export const moviesApi = new nomorepartiesApi({
  baseUrl: `${moviesApiUrl}`,
  headers: {
    'Content-Type': 'application/json'
  }
});
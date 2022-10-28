// https://api.nomoreparties.co/beatfilm-movies 

import { moviesApiUrl } from './constants'

class Api {
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
        method: 'GET',
        headers: this._headers
      })
      .then(res => {
        return this._getResponseData(res)
      })
  }

  // getCards() {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     credentials: 'include',
  //     method: 'GET',
  //     headers: this._headers
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // setUser({
  //   newName,
  //   newAbout
  // }) {
  //   return fetch(`${this._baseUrl}/users/me`, {
  //     credentials: 'include',
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: newName,
  //       about: newAbout
  //     })
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // setCard({
  //   cardName,
  //   cardLink
  // }) {
  //   return fetch(`${this._baseUrl}/cards`, {
  //     credentials: 'include',
  //     method: 'POST',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       name: cardName,
  //       link: cardLink
  //     })
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // deleteCard(cardId) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}`, {
  //     credentials: 'include',
  //     method: 'DELETE',
  //     headers: this._headers,
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // likeCard(
  //   cardId,
  // ) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     credentials: 'include',
  //     method: 'PUT',
  //     headers: this._headers
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // dislikeCard(
  //   cardId
  // ) {
  //   return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
  //     credentials: 'include',      
  //     method: 'DELETE',
  //     headers: this._headers
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // setUserAvatar(avatarSrc) {
  //   return fetch(`${this._baseUrl}/users/me/avatar`, {
  //     credentials: 'include',
  //     method: 'PATCH',
  //     headers: this._headers,
  //     body: JSON.stringify({
  //       avatar: avatarSrc,
  //     })
  //   }).then(res => {
  //     return this._getResponseData(res)
  //   })
  // }

  // logout() {
  //   return fetch(`${this._baseUrl}/logout`, {
  //       credentials: 'include',
  //       method: 'GET',
  //       headers: this._headers
  //     })
  //     .then(res => {
  //       return this._getResponseData(res)
  //     })
  // }
}

const moviesApi = new Api({
  baseUrl: `${moviesApiUrl}`,
  headers: {
    'Content-Type': 'application/json'
  }
})

export default moviesApi
export const moviesApiUrl = 'https://api.nomoreparties.co/beatfilm-movies';

export const moviesBaseUrl ='https://api.nomoreparties.co';
// export const mainApiUrl = 'https://nomore.nomoredomains.icu/api';
export const mainApiUrl = 'http://localhost:3000';

export const portfolio = [
  {
    title: "Статичный сайт",
    url: "https://yandex.ru",
  },
  {
    title: "Адаптивный сайт",
    url: "https://yandex.ru",
  },
  {
    title: "Одностраничное приложение",
    url: "https://yandex.ru",
  },
];

export const techs = [
  {
    name: "HTML",
  },
  {
    name: "CSS",
  },
  {
    name: "JS",
  },
  {
    name: "React",
  },
  {
    name: "Git",
  },
  {
    name: "Express.js",
  },
  {
    name: "mongoDB",
  },
];

export const widthMax = {maxDisplayWidth: 1280, initialAmountCards: 16, amountCardsForLoad: 4}
export const widthRegular = {maxDisplayWidth: 1280, initialAmountCards: 12, amountCardsForLoad: 3}
export const widthTablet = {maxDisplayWidth: 992, initialAmountCards: 8, amountCardsForLoad: 2} // 768
export const widthMobile = {maxDisplayWidth: 631, initialAmountCards: 5, amountCardsForLoad: 1} // 320

export const movieNotFoundMessage = 'Ничего не найдено';
export const movieLoadErrorMessage = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';
export const inputEmailCustomError = 'Не верный формат адреса электронной почты';
export const inputNameCustomError = 'Должен содержать только латиницу, кириллицу, пробел или дефис';

export const nameValidator = (name) => {
  const reg = /^[а-яА-ЯёЁa-zA-Z][а-яА-ЯёЁa-zA-Z\s|-]{0,28}[а-яА-ЯёЁa-zA-Z]$/;
  return reg.test(name);
}
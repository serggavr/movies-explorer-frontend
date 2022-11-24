# Проект "movies-explorer" frontend часть
---
### Создан в рамках обучения в [Яндекс Практикум](https://praktikum.yandex.ru/), курс Web-разработчик
---

#### Репозиторий с Backend приложения "movies-explorer" - [movies-explorer-api](https://github.com/serggavr/movies-explorer-api)

Movies-explorer - Веб приложение позволяющее пользователю просматривать список фильмов из стороннего сервиса [beatfilm-movies](https://api.nomoreparties.co/beatfilm-movies) и сохранять понравившиеся фильмы в личном кабинете, в приложении. Реализован поиск фильмов по ключевым словам.

Фронтенд был сверстан по [Макету в Figma](https://disk.yandex.ru/d/rFmn7fjNt24-Fw )

Запуск: 
``` 
npm install
npm run start
```

Зависимости:
```
"dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "core-js": "^3.23.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-email-validator": "^1.0.2",
    "react-router-dom": "^6.3.0",
    "react-scripts": "^5.0.1",
    "web-vitals": "^2.1.4"
  },
  "devDependencies": {
    "@babel/core": "^7.18.6",
    "@babel/preset-env": "^7.18.6",
    "autoprefixer": "^10.4.7",
    "babel-loader": "^8.2.5",
    "clean-webpack-plugin": "^4.0.0",
    "css-loader": "^6.7.1",
    "cssnano": "^5.1.12",
    "eslint": "^8.23.1",
    "eslint-plugin-react": "^7.31.8",
    "html-webpack-plugin": "^5.5.0",
    "mini-css-extract-plugin": "^2.6.1",
    "postcss-loader": "^7.0.0",
    "webpack": "^5.73.0",
    "webpack-cli": "^4.10.0",
    "webpack-dev-server": "^4.9.2"
  }
```

##### При создании приложения использовались технологии:
Backend:
- Node.js
- Express.js
- JS
- MongoDB
- JWT аутентификация


Frontend:
- HTML5
- CSS
- BEM
- JS
- React
- JWT аутентификация
- Хранение данных в LocalStorage
import React from 'react';
import Section from '../Section/Section';

import './SearchForm.css'
import Button from '../Button/Button';

const SearchForm = () => {
  return (
    <Section theme='dark' sectionName='search-form' >
      <form className="search-form__search-bar-wrapper">
        <div className="search-form__search-bar">
          <input type="text" className="search-form__input" placeholder="Фильм" />
          <Button type="submit" className="button button button_placed_search-bar">Поиск</Button>
        </div>
        <div className="search-form__switcher-wrapper">
          <label className="search-form__switcher">
            <input type="checkbox" className="search-form__toggle" />
            <span className="search-form__toggle-slider"></span>
          </label>
          <label className="search-form__switcher-label" htmlFor="search-form__toggle">Короткометражки</label>
        </div>
      </form>
    </Section>
  );
};

export default SearchForm;
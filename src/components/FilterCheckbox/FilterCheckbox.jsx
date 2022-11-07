import React from 'react';

import './FilterCheckbox.css'

const FilterCheckbox = ({
  shortMovieCheckboxChecked,
  onMovieCheckboxChange,
  isLoading
}) => {

  return (
    <div className='filter-checkbox'>
      <label className={`filter-checkbox__switcher ${isLoading ? `filter-checkbox__switcher_disabled` : ''}`} >
        <input 
          type='checkbox' 
          className='filter-checkbox__toggle'
          onChange={() => onMovieCheckboxChange(!shortMovieCheckboxChecked)}
          disabled={isLoading}
          checked={shortMovieCheckboxChecked}
        />
        <span className={`filter-checkbox__toggle-slider ${isLoading ? `filter-checkbox__toggle-slider_disabled` : ''}`}></span>
      </label>
      <label className={`filter-checkbox__switcher-label ${isLoading ? `filter-checkbox__switcher-label_disabled` : ''}`} htmlFor='filter-checkbox__toggle'>Короткометражки</label>
    </div>
  );
};

export default FilterCheckbox;
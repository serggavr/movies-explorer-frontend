import React from 'react';

import './FilterCheckbox.css'

const FilterCheckbox = () => {
  return (
    <div className='filter-checkbox'>
      <label className='filter-checkbox__switcher'>
        <input type='checkbox' className='filter-checkbox__toggle' />
        <span className='filter-checkbox__toggle-slider'></span>
      </label>
      <label className='filter-checkbox__switcher-label' htmlFor='filter-checkbox__toggle'>Короткометражки</label>
    </div>
  );
};

export default FilterCheckbox;
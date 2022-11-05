import React from 'react';
import Section from '../Section/Section';

import './SearchForm.css';
import Button from '../Button/Button';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';

const SearchForm = ({
  onFilterQueryChange,
  filterQueryValue,
  isLoading,
  onMovieCheckboxChange,
  shortMovieCheckboxChecked,
}) => {

  const [query, setQuery] = React.useState(filterQueryValue)

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilterQueryChange(query);
  }

  const handleChangeFilterQuery = (e) => {
    setQuery(e.target.value);
  }

  return (
    <Section theme='dark' sectionName='search-form' >
      <form 
        className='search-form__search-bar-wrapper'
        onSubmit={handleSubmit}
        
      >
        <div className='search-form__search-bar'>
          <input 
            type='text'
            className='search-form__input' 
            placeholder='Фильм' 
            required={true}
            onChange={handleChangeFilterQuery}
            value={query ?? ''}
            disabled={isLoading}
          />
          <Button 
            type='submit'
            className='button button button_placed_search-bar'
            isDisabled={isLoading}
          >Поиск</Button>
        </div>
        <FilterCheckbox 
          shortMovieCheckboxChecked={shortMovieCheckboxChecked}
          onMovieCheckboxChange={onMovieCheckboxChange}
          isLoading={isLoading}
        />
      </form>
    </Section>
  );
};

export default SearchForm;
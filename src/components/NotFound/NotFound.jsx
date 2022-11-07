import React from 'react';
import { Link } from 'react-router-dom'

import './NotFound.css'
import Section from '../Section/Section';

const NotFound = () => {
  return (
    <Section theme='dark' sectionName='not-found'>
      <div className='not-found__wrapper'>
        <div className='not-found__text-block'>
          <h1 className='not-found__title'>404</h1>
          <p className='not-found__subtitle'>Страница не найдена</p>
        </div>
          <Link
            to='/' 
            className='not-found__link'
          >Назад</Link>
      </div>
    </Section>
  );
};

export default NotFound;
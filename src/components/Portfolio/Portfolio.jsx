import React from 'react';
import { Link } from 'react-router-dom'

import './Portfolio.css'
import Section from '../Section/Section';

const Portfolio = () => {
  return (
    <Section theme='dark' sectionName='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <Link to='/' className='portfolio__link-wrapper' target='_blank'>
            <p className='portfolio__link'>Статичный сайт</p>
            <span className='portfolio__link'>↗</span>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link to='/' className='portfolio__link-wrapper' target='_blank'>
            <p className='portfolio__link'>Адаптивный сайт</p>
            <span className='portfolio__link'>↗</span>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link to='/' className='portfolio__link-wrapper' target='_blank'>
            <p className='portfolio__link'>Одностраничное приложение</p>
            <span className='portfolio__link'>↗</span>
          </Link>
        </li>
      </ul>
    </Section>
  );
};

export default Portfolio;
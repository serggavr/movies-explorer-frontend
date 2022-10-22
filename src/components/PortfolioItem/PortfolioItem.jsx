import React from 'react';

import './PortfolioItem.css'

const PortfolioItem = ({
  name,
  link
}) => {
  return (
    <li className='portfolio-item__item'>
      <a href={link} className='portfolio-item__link-wrapper' rel="noreferrer" target='_blank'>
        <p className='portfolio-item__link'>{name}</p>
        <span className='portfolio-item__link'>↗</span>
      </a>
    </li>
  );
};

export default PortfolioItem;
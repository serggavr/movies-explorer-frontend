import React from 'react';

import './Portfolio.css'
import Section from '../Section/Section';
import PortfolioItem from '../PortfolioItem/PortfolioItem';

const Portfolio = ({
  projectsList
}) => {
  return (
    <Section theme='dark' sectionName='portfolio'>
      <h3 className='portfolio__title'>Портфолио</h3>
      <ul className='portfolio__list'>

        {projectsList.map((project, index) => {
          return (
            <PortfolioItem name={project.title} link={project.url} key={index}/>
          )
        })}
        
      </ul>
    </Section>
  );
};

export default Portfolio;
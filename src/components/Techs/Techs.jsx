import React from 'react';

import './Techs.css'
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';
import TechsItem from '../TechsItem/TechsItem';

const Techs = ({
  techsList
}) => {
  return (
    <Section sectionName='techs'>
      <SectionTitle title='Технологии' />
        <div className='techs__text-block'>
          <h3 className='techs__text-block-title'>7 технологий</h3>
          <p className='techs__text-block-text'>На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className='techs__technology-list'>
          {techsList.map((tech, index) => {
            return (
              <TechsItem name={tech.name} key={index}/>
            )
          })}
        </ul>
    </Section>
  );
};

export default Techs;
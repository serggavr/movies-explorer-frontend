import React from 'react';

import './Techs.css'
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';

const Techs = () => {
  return (
    <Section sectionName='techs'>
      <SectionTitle title='Технологии' />
        <div className="techs__text-block">
          <h3 className="techs__text-block-title">7 технологий</h3>
          <p className="techs__text-block-text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        </div>
        <ul className="techs__technology-list">
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              HTML
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              CSS
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              JS
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              React
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              Git
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              Express.js
            </span>
          </li>
          <li className="techs__list-item">
            <span className="techs__list-item-name">
              mongoDB
            </span>
          </li>
        </ul>
      {/* </section> */}
    </Section>
  );
};

export default Techs;
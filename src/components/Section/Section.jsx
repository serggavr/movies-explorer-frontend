import React from 'react';

import './Section.css'

const Section = ({
  children,
  theme,
  sectionName
}) => {
  return (
    <section className={`section ${theme ? `section_theme_${theme}` : ``} ${sectionName && `${sectionName}`}`}>
      {children}
    </section>
  );
};

export default Section;
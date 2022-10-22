import React from 'react';

import './TechsItem.css'

const TechsItem = ({
  name = ''
}) => {
  return (
    <li className="techs-item">
      <span className="techs-item__name">
        {name}
      </span>
    </li>
  );
};

export default TechsItem;
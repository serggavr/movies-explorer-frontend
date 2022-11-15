import React from 'react';
import { Link } from 'react-router-dom';

import './Logo.css'
import logoImage from '../../images/logo/logo.svg'

const Logo = ({
  placedTo
}) => {
  return (
    <Link to='/' className={`logo ${placedTo ? `logo_placed_${placedTo}` : ``}`}><img src={logoImage} alt='logo' /></Link>
  );
};

export default Logo;
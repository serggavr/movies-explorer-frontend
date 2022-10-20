import React from 'react';

import './Promo.css'
import promoLogo from '../../images/promo/promo-logo.svg'
// import Section from '../Section/Section';

const Promo = () => {
  return (
    <section className='promo'>
        <h1 className='promo__title'>Учебный проект студента факультета Веб-разработки.</h1>
        <img className='promo__image' src={promoLogo} alt='promo-logo'/>
    </section>
)};

export default Promo;
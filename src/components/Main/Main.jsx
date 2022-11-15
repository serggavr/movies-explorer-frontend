import React from 'react';

import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import { portfolio, techs } from '../../utils/constants';

const Main = ({
  handleOpenBurgerMenu
}) => {

  return (
    <>
      <Header handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <Promo />
      <AboutProject />
      <Techs techsList={techs} />
      <AboutMe />
      <Portfolio projectsList={portfolio} />
      <Footer />
    </>
  );
};

export default Main;
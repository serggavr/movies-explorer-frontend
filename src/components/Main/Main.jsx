import React from 'react';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';

const Main = ({
  handleOpenBurgerMenu
}) => {
  return (
    <>
      <Header loggedIn={false} handleOpenBurgerMenu={handleOpenBurgerMenu} />
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      <Footer />

    </>
  );
};

export default Main;
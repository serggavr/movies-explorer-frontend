import React from 'react';
import Header from '../Header/Header';
import Footer from "../Footer/Footer";
import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';

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
      <Footer />

    </>
  );
};

export default Main;
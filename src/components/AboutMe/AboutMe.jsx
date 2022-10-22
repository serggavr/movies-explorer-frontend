import React from 'react';


import './AboutMe.css'
import studentPhoto from '../../images/about-me/avatar.jpg'
import Section from '../Section/Section';
import SectionTitle from '../SectionTitle/SectionTitle';

const AboutMe = () => {
  return (
    <Section theme='dark' sectionName='about-me'>
      <SectionTitle title='Студент'/>
        <div className='about-me__info'>
          <div className='about-me__text-block'>
            <h3 className='about-me__name'>Виталий</h3>
            <p className='about-me__speciality'>Фронтенд-разработчик, 30 лет</p>
            <p className='about-me__about-me'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена 
              и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.</p>
              <a className='about-me__github-link' href='https://github.com/serggavr'>Github</a>
          </div>
          <img className='about-me__photo' src={studentPhoto} alt='student'/>
        </div>
    </Section>
  );
};

export default AboutMe;
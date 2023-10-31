import React, {Fragment, useContext, useState} from "react";
import {useNavigate, createSearchParams} from 'react-router-dom';
import {useTranslation} from "react-i18next";
import Header from "../../components/header";
import Hero from "../../components/hero";
import FindCar from "../../components/findcar";
import About from "../../components/About";
import Service from "../../components/Service";
import Promo from "../../components/Promo";
import HotOffers from "../../components/HotOffers";
import Testimonial from "../../components/Testimonial";
import Team from "../../components/Team";
import Help from "../../components/Help";
import Blog from "../../components/Blog";
import Footer from "../../components/Footer";

const HomePage = (props) => {
   const {t} = useTranslation();

   return (
      <Fragment>
         {/*<h1 onClick={() => setShow(true)}>Click</h1>*/}
         <Header/>
         <FindCar t={t} navigate={useNavigate()} createSearchParams={createSearchParams}/>
         {/*<Hero/>*/}
         {/*<Service />*/}
         {/*<Promo/>*/}
         <HotOffers t={t} navigate={useNavigate()}/>
         {/*<Testimonial/>*/}
         {/*<Team/>*/}
         {/*<Help/>*/}
         {/*<Blog/>*/}
         <About/>
         <Footer/>
      </Fragment>
   );
};
export default HomePage;

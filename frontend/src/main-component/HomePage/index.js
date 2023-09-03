import React, {Fragment} from "react";
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

const HomePage = () => {
   const {t} = useTranslation();
   return (
      <Fragment>
         <Header/>
         <FindCar t={t} navigate={useNavigate()} createSearchParams={createSearchParams}/>
         <Hero/>
         <About/>
         {/*<Service />*/}
         {/*<Promo/>*/}
         <HotOffers t={t} navigate={useNavigate()}/>
         <Testimonial/>
         {/*<Team/>*/}
         {/*<Help/>*/}
         {/*<Blog/>*/}
         <Footer/>
      </Fragment>
   );
};
export default HomePage;

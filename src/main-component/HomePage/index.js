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
import PhoneCallBack from "../../components/PhoneCallBack";
import {AppContext} from "../../components/AppContext";

const HomePage = () => {
   const {t} = useTranslation();
   const app_context = useContext(AppContext);

   return (
      <Fragment>
         <Header/>
         <FindCar
            t={t}
            navigate={useNavigate()}
            createSearchParams={createSearchParams}
            app_context = {app_context}
         />
         {/*<Hero/>*/}
         {/*<Service />*/}
         {/*<Promo/>*/}
         <HotOffers
            t={t}
            navigate={useNavigate()}
            app_context = {app_context}
         />
         {/*<Testimonial/>*/}
         {/*<Team/>*/}
         {/*<Help/>*/}
         {/*<Blog/>*/}
         <About/>
         <PhoneCallBack/>
         <Footer/>
      </Fragment>
   );
};
export default HomePage;

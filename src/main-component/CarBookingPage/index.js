import React, {Fragment, useContext} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from 'react-router-dom';

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import CarBooking from "../../components/CarBooking";
import Footer from "../../components/Footer";
import {AppContext} from "../../components/AppContext";

const CarBookingPage = () => {
   const {t} = useTranslation();
   const app_context = useContext(AppContext);

   return (
      <Fragment>
         <Header/>
         <PageTitle
            pageTitle={t("header-navigation.car_booking")}
            pagesub={t("header-navigation.car_booking")}
         />
         <CarBooking
            t={t}
            navigate={useNavigate()}
            useParams={useParams()}
            app_context = {app_context}
         />
         <Footer/>
      </Fragment>
   );
};
export default CarBookingPage;

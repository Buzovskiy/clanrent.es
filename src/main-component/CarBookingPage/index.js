import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from 'react-router-dom';

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import CarBooking from "../../components/CarBooking";
import Footer from "../../components/Footer";

const CarBookingPage = () => {
   const {t} = useTranslation();

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
         />
         <Footer/>
      </Fragment>
   );
};
export default CarBookingPage;
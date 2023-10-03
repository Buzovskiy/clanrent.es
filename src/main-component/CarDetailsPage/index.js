import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from 'react-router-dom';

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import Footer from "../../components/Footer";
import CarDetails from "../../components/CarDetails";

const CarDetailsPage = () => {
   const {t} = useTranslation();

   return (
      <Fragment>
         <Header/>
         <PageTitle
            pageTitle={t("header-navigation.car_details")}
            pagesub={t("header-navigation.car_details")}
         />
         <CarDetails
            t={t}
            navigate={useNavigate()}
            useParams={useParams()}
         />
         <Footer/>
      </Fragment>
   );
};
export default CarDetailsPage;

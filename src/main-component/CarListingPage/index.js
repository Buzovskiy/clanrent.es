import React, {Fragment, useContext} from "react";
import {useTranslation} from "react-i18next";
import {useNavigate, createSearchParams, useSearchParams, useParams} from 'react-router-dom';

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import CarList from "../../components/CarList";
import Footer from "../../components/Footer";
import {AppContext} from "../../components/AppContext";

const CarListingPage = () => {
   const {t} = useTranslation();
   const app_context = useContext(AppContext);

   return (
      <Fragment>
         <Header/>
         <PageTitle
            pageTitle={t("header-navigation.car_listing")}
            pagesub={t("header-navigation.car_listing")}
         />
         <CarList
            t={t}
            navigate={useNavigate()}
            createSearchParams={createSearchParams}
            searchParams={useSearchParams()}
            useParams={useParams()}
            app_context = {app_context}
         />
         <Footer/>
      </Fragment>
   );
};
export default CarListingPage;

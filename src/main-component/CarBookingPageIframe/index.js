import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import CarBookingIframe from "../../components/CarBookingIframe";
import Footer from "../../components/Footer";

const CarBookingPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Header />
      <PageTitle
        pageTitle={t("header-navigation.car_booking")}
        pagesub={t("header-navigation.car_booking")}
      />
      <CarBookingIframe />
      <Footer />
    </Fragment>
  );
};
export default CarBookingPage;

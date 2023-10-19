import React, {Fragment} from "react";
import {useTranslation} from "react-i18next";

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import FinishBooking from "../../components/FinishBooking";
import Footer from "../../components/Footer";

const FinishBookingPage = () => {
   const {t} = useTranslation();

   return (
      <Fragment>
         <Header/>
         <PageTitle
            pageTitle={t("finish_booking")}
            pagesub={t("finish_booking")}
         />
         <FinishBooking/>
         <Footer/>
      </Fragment>
   );
};
export default FinishBookingPage;

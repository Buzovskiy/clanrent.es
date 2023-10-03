import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Privacy from "../../components/Pages/privacy";
import TermsAndConditions from "../../components/Pages/termsAndConditions";

const TermsAndConditionsPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Header />
      <PageTitle
        pageTitle={t("terms-and-conditions")}
        pagesub={t("terms-and-conditions")}
      />
      <TermsAndConditions />
      <Footer />
    </Fragment>
  );
};
export default TermsAndConditionsPage;

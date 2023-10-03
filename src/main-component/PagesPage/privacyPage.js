import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../components/header";
import PageTitle from "../../components/PageTitle";
import Contact from "../../components/Contact";
import Footer from "../../components/Footer";
import Privacy from "../../components/Pages/privacy";

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <Fragment>
      <Header />
      <PageTitle
        pageTitle={t("privacy-policy")}
        pagesub={t("privacy-policy")}
      />
      <Privacy />
      <Footer />
    </Fragment>
  );
};
export default PrivacyPage;

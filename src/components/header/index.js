import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from "react-bootstrap";
import {
   FaPhoneAlt,
   FaWhatsapp
} from "react-icons/fa";
import {
   MdSchedule,
   MdLanguage,
} from "react-icons/md"

import MobileMenu from "../../components/MobileMenu";
// import {CartHeader} from "./cartHeader";
// import {CartContext} from "../Cart/CartContext";

import Logo from "../../img/logo.png";
import "flag-icon-css/css/flag-icons.min.css";

const languages = [
   {
      code: "fr",
      name: "Français",
      country_code: "fr",
   },
   {
      code: "en",
      name: "English",
      country_code: "gb",
   },
   {
      code: "pt",
      name: "Português",
      country_code: "pt",
   },
];

const Header = () => {
   const SubmitHandler = (e) => {
      e.preventDefault();
   };

   const onClick = (e) => {
      e.preventDefault();
   };

   const {t} = useTranslation();

   return (
      <Fragment>
         <section className="gauto-header-top-area">
            <Container>
               <Row>
                  <Col md={6}>
                     <div className="header-top-left">
                        <p className='phones-wrapper'>
                           <div>{t("need_help")} <FaPhoneAlt className='phone'/> {t("call")}:</div>
                           <div className='phones-container'>
                              <div>+34 621 621 652 (English)</div>
                              <div>+34 670 244 611 (Spanish) <FaWhatsapp className='whatsapp' title='WhatsApp'/></div>
                           </div>
                        </p>
                     </div>

                  </Col>
                  <Col md={6}>
                     <div className="mainmenu">
                        <nav>
                           <ul id="gauto_navigation">
                              <li>
                                 <Link to="/">{t("header-navigation.home")}</Link>
                              </li>
                              {/*<li>*/}
                              {/*   <Link to='/'>*/}
                              {/*      /!*<CartContext.Provider value={11}>*!/*/}
                              {/*      /!*   <CartHeader/>*!/*/}
                              {/*      /!*</CartContext.Provider>*!/*/}
                              {/*      {color}*/}
                              {/*      <CartHeader color={color} setColor={setColor}/>*/}
                              {/*   </Link>*/}
                              {/*</li>*/}
                              {/*<li>*/}
                              {/*   <Link to="/about">{t("header-navigation.about")}</Link>*/}
                              {/*</li>*/}
                              {/*<li>*/}
                              {/*   <Link to="/" onClick={onClick}>*/}
                              {/*      {t("header-navigation.cars")}*/}
                              {/*   </Link>*/}
                              {/*</li>*/}
                              {/*<li>*/}
                              {/*   <Link to="/gallery">*/}
                              {/*      {t("header-navigation.gallery")}*/}
                              {/*   </Link>*/}
                              {/*</li>*/}
                              {/*<li>*/}
                              {/*   <Link to="/contact">*/}
                              {/*      {t("header-navigation.contact")}*/}
                              {/*   </Link>*/}
                              {/*</li>*/}
                           </ul>
                        </nav>
                     </div>
                  </Col>
                  {/*<Col md={6}>*/}
                  {/*  <div className="header-top-right">*/}
                  {/*    <Link to="/login">*/}
                  {/*      <FaSignInAlt />*/}
                  {/*      {t("login")}*/}
                  {/*    </Link>*/}
                  {/*    <Link to="/register">*/}
                  {/*      <FaUserAlt />*/}
                  {/*      {t("register")}*/}
                  {/*    </Link>*/}
                  {/*    <Dropdown>*/}
                  {/*      <Dropdown.Toggle variant="success" id="dropdown-basic">*/}
                  {/*        <FaGlobe /> {t("language")}*/}
                  {/*      </Dropdown.Toggle>*/}

                  {/*      <Dropdown.Menu>*/}
                  {/*        {languages.map(({ code, name, country_code }) => (*/}
                  {/*          <Dropdown.Item*/}
                  {/*            eventKey={name}*/}
                  {/*            key={country_code}*/}
                  {/*            to="/"*/}
                  {/*            onClick={() => i18next.changeLanguage(code)}*/}
                  {/*          >*/}
                  {/*            <span*/}
                  {/*              className={`flag-icon flag-icon-${country_code}`}*/}
                  {/*            ></span>{" "}*/}
                  {/*            {name}*/}
                  {/*          </Dropdown.Item>*/}
                  {/*        ))}*/}
                  {/*      </Dropdown.Menu>*/}
                  {/*    </Dropdown>*/}
                  {/*  </div>*/}
                  {/*</Col>*/}
               </Row>
            </Container>
         </section>
         <header className="gauto-main-header-area">
            <Container>
               <Row>
                  <Col md={4}>
                     <div className="site-logo">
                        <a href="/">
                           <img src={Logo} alt="gauto"/>
                        </a>
                     </div>
                  </Col>
                  <Col md={4} sm={9} className="header-promo single-header-promo">
                     <div className="header-promo-icon">
                        <MdLanguage className='header-icon globe'/>
                     </div>
                     <div className="header-promo-info">
                        <h3>Alicante, Spain</h3>
                        <p>C. Juan de Villanueva, 8, Elche</p>
                     </div>
                  </Col>
                  <Col md={4} sm={9} className="header-promo single-header-promo">
                     <div className="header-promo-icon">
                        <MdSchedule className='header-icon schedule'/>
                     </div>
                     <div className="header-promo-info">
                        <h3>Monday to Friday</h3>
                        <p>9:00am - 6:00pm</p>
                     </div>
                  </Col>
               </Row>
            </Container>
         </header>
         <section className="gauto-mainmenu-area">
            <Container>
               <Row>
                  <Col lg={9}>
                     {/*<div className="mainmenu">*/}
                     {/*   <nav>*/}
                     {/*      <ul id="gauto_navigation">*/}
                     {/*         <li>*/}
                     {/*            <Link to="/">{t("header-navigation.home")}</Link>*/}
                     {/*         </li>*/}
                     {/*         <li>*/}
                     {/*            <Link to="/about">{t("header-navigation.about")}</Link>*/}
                     {/*         </li>*/}
                     {/*         <li>*/}
                     {/*            <Link to="/" onClick={onClick}>*/}
                     {/*               {t("header-navigation.cars")}*/}
                     {/*            </Link>*/}
                     {/*         </li>*/}
                     {/*         <li>*/}
                     {/*            <Link to="/gallery">*/}
                     {/*               {t("header-navigation.gallery")}*/}
                     {/*            </Link>*/}
                     {/*         </li>*/}
                     {/*         <li>*/}
                     {/*            <Link to="/contact">*/}
                     {/*               {t("header-navigation.contact")}*/}
                     {/*            </Link>*/}
                     {/*         </li>*/}
                     {/*      </ul>*/}
                     {/*   </nav>*/}
                     {/*</div>*/}
                  </Col>
                  <Col lg={3} sm={12}>
                     <div className="main-search-right">
                        <MobileMenu/>
                        {/*<div className="header-cart-box">*/}
                        {/*  <div className="login dropdown">*/}
                        {/*    <Link to="/cart" className="cart-icon" id="dropdownMenu1">*/}
                        {/*      <span>2</span>*/}
                        {/*    </Link>*/}
                        {/*  </div>*/}
                        {/*</div>*/}
                        <div className="header-logo-box">
                           <a href="/">
                              <img src={Logo} alt="gauto"/>
                           </a>
                        </div>
                        {/*<div className="search-box">*/}
                        {/*   <form onSubmit={SubmitHandler}>*/}
                        {/*      <input type="search" placeholder="Search9"/>*/}
                        {/*      <button type="submit">*/}
                        {/*         <FaSearch/>*/}
                        {/*      </button>*/}
                        {/*   </form>*/}
                        {/*</div>*/}
                     </div>
                  </Col>
               </Row>
            </Container>
         </section>
      </Fragment>
   );
};

export default Header;
